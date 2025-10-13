-- Postgres schema for Logistics & Shipping Platform
-- Assumes PostgreSQL >= 9.4 for jsonb

-- ---------------------------
-- 1. Lookup & reference tables
-- ---------------------------

CREATE TABLE roles (
  id              bigserial PRIMARY KEY,
  name            text NOT NULL UNIQUE,       -- e.g., customer, admin, warehouse_staff, destination_staff, agent
  description     text
);

CREATE TABLE permissions (
  id          bigserial PRIMARY KEY,
  code        text NOT NULL UNIQUE,           -- e.g., shipments.read, shipments.update, invoices.create
  description text
);

CREATE TABLE role_permissions (
  role_id      bigint NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
  permission_id bigint NOT NULL REFERENCES permissions(id) ON DELETE CASCADE,
  PRIMARY KEY (role_id, permission_id)
);

CREATE TABLE carrier_providers (
  id          bigserial PRIMARY KEY,
  name        text NOT NULL,
  code        text UNIQUE,
  contact     jsonb,
  metadata    jsonb
);

CREATE TABLE shipment_types (
  id   smallint PRIMARY KEY,
  code text NOT NULL UNIQUE,  -- 'AIR','SEA','EXPRESS'
  label text NOT NULL
);

CREATE TABLE parcel_statuses (
  id   smallint PRIMARY KEY,
  code text NOT NULL UNIQUE,  -- 'RECEIVED','AWAITING_PAYMENT','ASSIGNED','IN_TRANSIT','ARRIVED','OUT_FOR_DELIVERY','DELIVERED','PROBLEM','CLAIMED'
  label text NOT NULL
);

CREATE TABLE shipment_statuses (
  id   smallint PRIMARY KEY,
  code text NOT NULL UNIQUE,  -- 'CREATED','SCHEDULED','IN_TRANSIT','AT_DESTINATION','CLEARED_CUSTOMS','DELIVERED','CANCELLED'
  label text NOT NULL
);

CREATE TABLE value_service_types (
  id   bigserial PRIMARY KEY,
  code text NOT NULL UNIQUE,   -- 'INSURANCE','FRAGILE_PACK','PHOTOGRAPHY', etc
  label text NOT NULL
);

-- ---------------------------
-- 2. Core users & accounts
-- ---------------------------

CREATE TABLE users (
  id            bigserial PRIMARY KEY,
  email         text UNIQUE,
  phone         text,
  password_hash text,           -- hashed password
  full_name     text,
  preferred_language text DEFAULT 'en',
  is_active     boolean DEFAULT true,
  created_at    timestamptz DEFAULT now(),
  updated_at    timestamptz DEFAULT now(),
  metadata      jsonb
);

CREATE TABLE user_roles (
  user_id bigint NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role_id bigint NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
  PRIMARY KEY (user_id, role_id)
);

-- Customer is a specialization of user; keep as separate table for customer-specific fields
CREATE TABLE customers (
  id            bigserial PRIMARY KEY,
  user_id       bigint NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  customer_code text NOT NULL UNIQUE,  -- e.g., CUST-000123 (visible to user)
  business_name text,
  kyc_status    text DEFAULT 'pending',
  account_type  text,                   -- 'Individual','Business'
  loyalty_points integer DEFAULT 0,
  preferred_payment_method text,        -- 'Credit Card','Bank Transfer','Mobile Money', etc
  verification_status text,             -- 'Verified','Pending','Suspended'
  profile_image text,
  created_at    timestamptz DEFAULT now(),
  metadata      jsonb
);

-- Agents (optional)
CREATE TABLE agents (
  id           bigserial PRIMARY KEY,
  user_id      bigint UNIQUE REFERENCES users(id) ON DELETE SET NULL,
  code         text UNIQUE,
  company_name text,
  commission_pct numeric(5,2) DEFAULT 0,
  active       boolean DEFAULT true,
  agent_type   text,                    -- 'Individual','Business'
  status       text,                    -- 'Active','Inactive','Suspended'
  metadata     jsonb
);

-- Staff table to capture warehouse/admin staff
CREATE TABLE staff (
  id         bigserial PRIMARY KEY,
  user_id    bigint UNIQUE REFERENCES users(id) ON DELETE SET NULL,
  role_id    bigint REFERENCES roles(id) ON DELETE SET NULL,
  employee_code text UNIQUE,
  warehouse_id bigint, -- FK added after warehouses table is created
  metadata   jsonb
);

-- ---------------------------
-- 3. Locations, Warehouses & Addresses
-- ---------------------------

CREATE TABLE countries (
  id bigserial PRIMARY KEY,
  iso_code char(2) UNIQUE,
  name text NOT NULL
);

CREATE TABLE cities (
  id bigserial PRIMARY KEY,
  country_id bigint REFERENCES countries(id) ON DELETE SET NULL,
  name text NOT NULL
);

CREATE TABLE warehouses (
  id bigserial PRIMARY KEY,
  code text UNIQUE,                 -- e.g., WH-ACC-01
  name text NOT NULL,
  address text,
  city_id bigint REFERENCES cities(id),
  country_id bigint REFERENCES countries(id),
  phone text,
  email text,
  type text,                        -- 'origin','destination','hub' etc
  metadata jsonb
);

-- Add FK now that warehouses exists
ALTER TABLE staff
  ADD CONSTRAINT staff_warehouse_fk
  FOREIGN KEY (warehouse_id) REFERENCES warehouses(id) ON DELETE SET NULL;

-- Each customer can be assigned one or many unique warehouse addresses (their personal receiving address archetype)
CREATE TABLE customer_warehouse_addresses (
  id bigserial PRIMARY KEY,
  customer_id bigint NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  warehouse_id bigint NOT NULL REFERENCES warehouses(id) ON DELETE CASCADE,
  address_label text,               -- 'Air - US Warehouse' etc
  unique_address text NOT NULL,     -- the unique address string provided to supplier (could embed customer code)
  address_details jsonb,            -- structured address parts
  shipping_type_id smallint REFERENCES shipment_types(id),
  created_at timestamptz DEFAULT now()
);

-- Generic address book for customers (senders/receivers)
CREATE TABLE addresses (
  id bigserial PRIMARY KEY,
  customer_id bigint REFERENCES customers(id) ON DELETE SET NULL,
  label text,
  recipient_name text,
  company text,
  line1 text,
  line2 text,
  city_id bigint REFERENCES cities(id),
  postal_code text,
  country_id bigint REFERENCES countries(id),
  phone text,
  email text,
  is_default boolean DEFAULT false,
  metadata jsonb
);

-- ---------------------------
-- 4. Parcels, Items, Warehouse Receipts
-- ---------------------------

CREATE TABLE parcels (
  id bigserial PRIMARY KEY,
  parcel_code text UNIQUE,       -- e.g., PAR-20250825-0001
  customer_id bigint REFERENCES customers(id) ON DELETE SET NULL,
  warehouse_id bigint REFERENCES warehouses(id) ON DELETE SET NULL,  -- where parcel was received
  warehouse_receipt_id bigint REFERENCES warehouse_receipts(id) ON DELETE SET NULL,
  declared_value numeric(12,2) DEFAULT 0,
  weight_kg numeric(10,3) DEFAULT 0,
  length_cm numeric(8,2),
  width_cm numeric(8,2),
  height_cm numeric(8,2),
  volume_m3 numeric(12,6),
  status_id smallint REFERENCES parcel_statuses(id) DEFAULT 1,
  tracking_number text UNIQUE,   -- optional separate tracking number
  received_at timestamptz,
  logged_by bigint REFERENCES users(id),
  metadata jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE parcel_items (
  id bigserial PRIMARY KEY,
  parcel_id bigint NOT NULL REFERENCES parcels(id) ON DELETE CASCADE,
  sku text,
  description text,
  quantity integer DEFAULT 1,
  unit_price numeric(12,2),
  hs_code text,
  metadata jsonb
);

CREATE TABLE warehouse_receipts (
  id bigserial PRIMARY KEY,
  receipt_number text UNIQUE,
  warehouse_id bigint REFERENCES warehouses(id),
  received_by bigint REFERENCES users(id),
  received_at timestamptz DEFAULT now(),
  notes text,
  metadata jsonb
);

-- Link shipments (bulk export shipments) to parcels via a join table:
CREATE TABLE shipments (
  id bigserial PRIMARY KEY,
  shipment_code text UNIQUE,     -- e.g., SHIP-AIR-20250825-001
  type_id smallint REFERENCES shipment_types(id),
  carrier_id bigint REFERENCES carrier_providers(id),
  origin_warehouse_id bigint REFERENCES warehouses(id),
  destination_warehouse_id bigint REFERENCES warehouses(id),
  scheduled_departure timestamptz,
  actual_departure timestamptz,
  scheduled_arrival timestamptz,
  actual_arrival timestamptz,
  status_id smallint REFERENCES shipment_statuses(id) DEFAULT 1,
  manifest_document jsonb,
  created_by bigint REFERENCES users(id),
  created_at timestamptz DEFAULT now(),
  metadata jsonb
);

CREATE TABLE shipment_parcels (
  id bigserial PRIMARY KEY,
  shipment_id bigint NOT NULL REFERENCES shipments(id) ON DELETE CASCADE,
  parcel_id bigint NOT NULL REFERENCES parcels(id) ON DELETE CASCADE,
  assigned_at timestamptz DEFAULT now(),
  assigned_by bigint REFERENCES users(id)
);

-- ---------------------------
-- 5. Tracking & Events
-- ---------------------------

CREATE TABLE tracking_events (
  id bigserial PRIMARY KEY,
  parcel_id bigint REFERENCES parcels(id) ON DELETE CASCADE,
  shipment_id bigint REFERENCES shipments(id) ON DELETE SET NULL,
  event_code text,        -- e.g., 'RECEIVED','SCANNED','LOADED','DEPARTED','ARRIVED','CLEARED_CUSTOMS','OUT_FOR_DELIVERY','DELIVERED'
  description text,
  location text,
  geolocation point,      -- optional lat/long
  occurred_at timestamptz DEFAULT now(),
  created_by bigint REFERENCES users(id),
  metadata jsonb
);

-- ---------------------------
-- 6. Invoices, Payments & Transactions
-- ---------------------------

CREATE TABLE invoices (
  id bigserial PRIMARY KEY,
  invoice_number text UNIQUE,
  customer_id bigint REFERENCES customers(id) ON DELETE SET NULL,
  issued_at timestamptz DEFAULT now(),
  due_at timestamptz,
  total_amount numeric(14,2) DEFAULT 0,
  outstanding_amount numeric(14,2) DEFAULT 0,
  status text DEFAULT 'unpaid',   -- 'unpaid','partially_paid','paid','cancelled'
  metadata jsonb
);

CREATE TABLE invoice_lines (
  id bigserial PRIMARY KEY,
  invoice_id bigint NOT NULL REFERENCES invoices(id) ON DELETE CASCADE,
  description text,
  amount numeric(14,2),
  reference_type text,  -- e.g., 'parcel','shipment'
  reference_id bigint
);

CREATE TABLE payments (
  id bigserial PRIMARY KEY,
  payment_ref text UNIQUE,
  customer_id bigint REFERENCES customers(id) ON DELETE SET NULL,
  invoice_id bigint REFERENCES invoices(id) ON DELETE SET NULL,
  amount numeric(14,2) NOT NULL,
  method text,       -- 'card','paypal','mobile_money','cash','bank_transfer'
  status text,       -- 'pending','completed','failed','refunded'
  recorded_by bigint REFERENCES users(id) ON DELETE SET NULL,
  transacted_at timestamptz DEFAULT now(),
  gateway_response jsonb,
  metadata jsonb
);

CREATE TABLE transactions (
  id bigserial PRIMARY KEY,
  payment_id bigint REFERENCES payments(id) ON DELETE SET NULL,
  amount numeric(14,2),
  type text,        -- 'payment','refund','fee'
  created_at timestamptz DEFAULT now(),
  metadata jsonb
);

-- Payments can be linked to parcels (pay freight on behalf)
CREATE TABLE parcel_payments (
  id bigserial PRIMARY KEY,
  parcel_id bigint REFERENCES parcels(id) ON DELETE CASCADE,
  payment_id bigint REFERENCES payments(id) ON DELETE SET NULL,
  amount numeric(14,2),
  created_at timestamptz DEFAULT now()
);

-- ---------------------------
-- 7. Claims & Problem Management
-- ---------------------------

CREATE TABLE claims (
  id bigserial PRIMARY KEY,
  claim_code text UNIQUE,
  parcel_id bigint REFERENCES parcels(id) ON DELETE SET NULL,
  filed_by bigint REFERENCES users(id),
  filed_at timestamptz DEFAULT now(),
  status text DEFAULT 'open', -- 'open','in_review','approved','rejected','settled'
  claim_amount numeric(14,2),
  resolution_notes text,
  metadata jsonb
);

CREATE TABLE claim_documents (
  id bigserial PRIMARY KEY,
  claim_id bigint REFERENCES claims(id) ON DELETE CASCADE,
  uploaded_by bigint REFERENCES users(id),
  file_path text,
  file_meta jsonb,
  uploaded_at timestamptz DEFAULT now()
);

-- ---------------------------
-- 8. Value Added Services & Consolidation
-- ---------------------------

CREATE TABLE parcel_value_services (
  id bigserial PRIMARY KEY,
  parcel_id bigint NOT NULL REFERENCES parcels(id) ON DELETE CASCADE,
  service_type_id bigint REFERENCES value_service_types(id),
  price numeric(12,2),
  applied_at timestamptz DEFAULT now(),
  metadata jsonb
);

CREATE TABLE consolidations (
  id bigserial PRIMARY KEY,
  consolidation_code text UNIQUE,
  customer_id bigint REFERENCES customers(id),
  created_at timestamptz DEFAULT now(),
  created_by bigint REFERENCES users(id),
  notes text,
  metadata jsonb
);

CREATE TABLE consolidation_parcels (
  id bigserial PRIMARY KEY,
  consolidation_id bigint REFERENCES consolidations(id) ON DELETE CASCADE,
  parcel_id bigint REFERENCES parcels(id) ON DELETE CASCADE
);

-- ---------------------------
-- 9. Customs & Clearance
-- ---------------------------

CREATE TABLE customs_records (
  id bigserial PRIMARY KEY,
  parcel_id bigint REFERENCES parcels(id),
  shipment_id bigint REFERENCES shipments(id),
  customs_agent jsonb,
  declared_value numeric(14,2),
  duties numeric(12,2),
  taxes numeric(12,2),
  clearance_status text,
  cleared_at timestamptz,
  documents jsonb
);

-- ---------------------------
-- 10. Notifications, Audit & Logs
-- ---------------------------

CREATE TABLE notifications (
  id bigserial PRIMARY KEY,
  user_id bigint REFERENCES users(id) ON DELETE CASCADE,
  title text,
  body text,
  type text,
  icon text,
  priority text,        -- 'low','medium','high'
  link text,
  is_read boolean DEFAULT false,
  channel text,       -- 'email','sms','in_app'
  created_at timestamptz DEFAULT now(),
  metadata jsonb
);

CREATE TABLE audit_logs (
  id bigserial PRIMARY KEY,
  actor_user_id bigint REFERENCES users(id),
  action text,
  entity_type text,
  entity_id bigint,
  payload jsonb,
  created_at timestamptz DEFAULT now()
);

-- ---------------------------
-- 11. Files/Photos
-- ---------------------------

CREATE TABLE files (
  id bigserial PRIMARY KEY,
  owner_user_id bigint REFERENCES users(id),
  related_type text,   -- 'parcel','claim','invoice','shipment'
  related_id bigint,
  path text NOT NULL,
  file_name text,
  file_meta jsonb,
  uploaded_at timestamptz DEFAULT now()
);

-- ---------------------------
-- 12. Packaging Requests & History
-- ---------------------------

CREATE TABLE packaging_options (
  id bigserial PRIMARY KEY,
  code text UNIQUE,
  label text NOT NULL,
  description text,
  price numeric(12,2) DEFAULT 0,
  metadata jsonb
);

CREATE TABLE packaging_requests (
  id bigserial PRIMARY KEY,
  parcel_id bigint NOT NULL REFERENCES parcels(id) ON DELETE CASCADE,
  requested_by bigint REFERENCES users(id) ON DELETE SET NULL,
  option_id bigint REFERENCES packaging_options(id) ON DELETE SET NULL,
  is_fragile boolean DEFAULT false,
  special_instructions text,
  status text DEFAULT 'requested', -- 'requested','in_progress','completed','rejected'
  quoted_price numeric(12,2),
  final_price numeric(12,2),
  processed_by bigint REFERENCES users(id) ON DELETE SET NULL,
  processed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  metadata jsonb
);

CREATE INDEX idx_packaging_requests_parcel ON packaging_requests (parcel_id);
CREATE INDEX idx_packaging_requests_status ON packaging_requests (status);

CREATE TABLE packaging_request_history (
  id bigserial PRIMARY KEY,
  request_id bigint NOT NULL REFERENCES packaging_requests(id) ON DELETE CASCADE,
  status text NOT NULL,
  comment text,
  actor_user_id bigint REFERENCES users(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now()
);

-- ---------------------------
-- 13. Support Tickets
-- ---------------------------

CREATE TABLE support_tickets (
  id bigserial PRIMARY KEY,
  customer_id bigint REFERENCES customers(id) ON DELETE SET NULL,
  subject text NOT NULL,
  body text,
  status text DEFAULT 'open',   -- 'open','pending','resolved','closed'
  priority text DEFAULT 'normal', -- 'low','normal','high','urgent'
  assigned_staff_id bigint REFERENCES staff(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  closed_at timestamptz,
  metadata jsonb
);

CREATE INDEX idx_support_tickets_status_priority ON support_tickets (status, priority);

CREATE TABLE support_ticket_messages (
  id bigserial PRIMARY KEY,
  ticket_id bigint NOT NULL REFERENCES support_tickets(id) ON DELETE CASCADE,
  sender_user_id bigint REFERENCES users(id) ON DELETE SET NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- ---------------------------
-- 14. Notification Preferences
-- ---------------------------

CREATE TABLE notification_preferences (
  id bigserial PRIMARY KEY,
  user_id bigint UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  email_enabled boolean DEFAULT true,
  sms_enabled boolean DEFAULT false,
  in_app_enabled boolean DEFAULT true,
  channels jsonb, -- per-event channel preferences
  quiet_hours jsonb,
  updated_at timestamptz DEFAULT now()
);

-- ---------------------------
-- 15. Pricing & Rates
-- ---------------------------

CREATE TABLE pricing_rate_cards (
  id bigserial PRIMARY KEY,
  code text UNIQUE,
  name text NOT NULL,
  currency char(3) DEFAULT 'USD',
  effective_from date NOT NULL,
  effective_to date,
  base_rate_per_kg numeric(12,4) DEFAULT 0,
  volumetric_divisor numeric(12,4),
  min_charge numeric(12,2) DEFAULT 0,
  metadata jsonb
);

CREATE TABLE pricing_rate_rules (
  id bigserial PRIMARY KEY,
  rate_card_id bigint NOT NULL REFERENCES pricing_rate_cards(id) ON DELETE CASCADE,
  origin_country_id bigint REFERENCES countries(id),
  destination_country_id bigint REFERENCES countries(id),
  shipment_type_id smallint REFERENCES shipment_types(id),
  weight_from_kg numeric(10,3) DEFAULT 0,
  weight_to_kg numeric(10,3),
  price_per_kg numeric(12,4),
  fixed_fee numeric(12,2),
  surcharge_pct numeric(6,3),
  metadata jsonb
);

CREATE INDEX idx_rate_rules_lookup ON pricing_rate_rules (rate_card_id, shipment_type_id);

-- ---------------------------
-- 16. Security: 2FA & Access Logs
-- ---------------------------

CREATE TABLE user_two_factor (
  user_id bigint PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  type text DEFAULT 'totp', -- 'totp','sms','email'
  secret text,
  enabled boolean DEFAULT false,
  backup_codes jsonb,
  last_verified_at timestamptz
);

CREATE TABLE access_logs (
  id bigserial PRIMARY KEY,
  user_id bigint REFERENCES users(id) ON DELETE SET NULL,
  ip_address inet,
  user_agent text,
  action text,
  created_at timestamptz DEFAULT now(),
  metadata jsonb
);

CREATE INDEX idx_access_logs_user_time ON access_logs (user_id, created_at DESC);

-- ---------------------------
-- 17. Warehouse Settings
-- ---------------------------

CREATE TABLE warehouse_settings (
  id bigserial PRIMARY KEY,
  warehouse_id bigint NOT NULL REFERENCES warehouses(id) ON DELETE CASCADE,
  key text NOT NULL,
  value jsonb,
  updated_at timestamptz DEFAULT now(),
  UNIQUE (warehouse_id, key)
);

-- ---------------------------
-- 12. Indexes & Useful constraints
-- ---------------------------

CREATE INDEX idx_parcels_customer_status ON parcels (customer_id, status_id);
CREATE INDEX idx_shipment_parcels_shipment ON shipment_parcels (shipment_id);
CREATE INDEX idx_tracking_parcel_occurred ON tracking_events (parcel_id, occurred_at);
CREATE INDEX idx_invoices_customer_status ON invoices (customer_id, status);
CREATE INDEX idx_parcel_tracking_number ON parcels (tracking_number);
CREATE INDEX idx_payments_invoice_status ON payments (invoice_id, status);

-- ---------------------------
-- 13. Example seeds for lookup tables (small)
-- ---------------------------

INSERT INTO shipment_types (id, code, label) VALUES
 (1,'AIR','Air Cargo'),
 (2,'SEA','Sea Freight'),
 (3,'EXPRESS','Express / Courier');

INSERT INTO parcel_statuses (id, code, label) VALUES
 (1,'RECEIVED','Received in Warehouse'),
 (2,'AWAITING_PAYMENT','Awaiting Payment'),
 (3,'ASSIGNED','Assigned to Shipment'),
 (4,'IN_TRANSIT','In Transit'),
 (5,'ARRIVED','Arrived at Destination'),
 (6,'OUT_FOR_DELIVERY','Out for Delivery'),
 (7,'DELIVERED','Delivered'),
 (8,'PROBLEM','Problem / Hold'),
 (9,'CLAIMED','Claimed / Under Resolution');

INSERT INTO shipment_statuses (id, code, label) VALUES
 (1,'CREATED','Created'),
 (2,'SCHEDULED','Scheduled'),
 (3,'IN_TRANSIT','In Transit'),
 (4,'AT_DESTINATION','At Destination'),
 (5,'CLEARED_CUSTOMS','Cleared Customs'),
 (6,'DELIVERED','Delivered'),
 (7,'CANCELLED','Cancelled');

-- ---------------------------
-- End of schema
-- ---------------------------
