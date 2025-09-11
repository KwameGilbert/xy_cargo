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
  metadata     jsonb
);

-- Staff table to capture warehouse/admin staff
CREATE TABLE staff (
  id         bigserial PRIMARY KEY,
  user_id    bigint UNIQUE REFERENCES users(id) ON DELETE SET NULL,
  role_id    bigint REFERENCES roles(id) ON DELETE SET NULL,
  employee_code text UNIQUE,
  warehouse_id bigint REFERENCES warehouses(id), -- forward reference (created later)
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
  line1 text,
  line2 text,
  city_id bigint REFERENCES cities(id),
  postal_code text,
  country_id bigint REFERENCES countries(id),
  phone text,
  email text,
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
-- 12. Indexes & Useful constraints
-- ---------------------------

CREATE INDEX idx_parcels_customer_status ON parcels (customer_id, status_id);
CREATE INDEX idx_shipment_parcels_shipment ON shipment_parcels (shipment_id);
CREATE INDEX idx_tracking_parcel_occurred ON tracking_events (parcel_id, occurred_at);
CREATE INDEX idx_invoices_customer_status ON invoices (customer_id, status);

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
