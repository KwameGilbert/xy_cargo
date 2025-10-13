## XY Cargo API Specification (v1)

This document defines the REST API contract for the XY Cargo platform across Client, Warehouse, and Admin surfaces. It mirrors the current database schema in `server/schema.sql` and mock data under `public/data`.

### Conventions
- Base URL: `/api/v1`
- Auth: Bearer JWT via `Authorization: Bearer <token>`
- Content-Type: `application/json`
- Pagination: `?page=1&limit=20` → responses include `pagination`
- Sorting: `?sort=-created_at,name` (comma-separated fields; `-` desc)
- Filtering: common fields as query params (e.g., `?status=IN_TRANSIT&customer_id=10`)
- Error format:
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Field 'email' is invalid",
    "details": [ {"field": "email", "message": "Invalid format"} ]
  }
}
```

### RBAC Overview
- customer (client): access to own parcels, invoices, payments, addresses, notifications, support, consolidations.
- warehouse_staff: manage parcels intake, packaging, shipments, tracking, limited to assigned warehouse(s).
- admin: full access; manage users/roles, staff, agents, warehouses, pricing, reports, security.

---

## Auth & Session

### POST /auth/login
- Roles: public
- Request
```json
{ "email": "user@example.com", "password": "secret" }
```
- 200 OK
```json
{ "token": "jwt...", "user": { "id": 1, "email": "user@example.com", "full_name": "Demo User", "roles": ["customer"] } }
```
- 401 Unauthorized: invalid credentials

### POST /auth/signup
- Roles: public (creates customer)
- Request
```json
{ "full_name": "John Smith", "email": "john@example.com", "password": "secret", "phone": "+1 555-0000", "account_type": "Individual" }
```
- 201 Created
```json
{ "id": 1, "customer_code": "CUST-000001" }
```

### POST /auth/refresh
- Roles: authenticated
- 200 OK
```json
{ "token": "new-jwt" }
```

### POST /auth/2fa/setup
- Roles: authenticated
- 200 OK
```json
{ "type": "totp", "secret": "BASE32...", "qr": "data:image/png;base64,..." }
```

### POST /auth/2fa/verify
- Request
```json
{ "code": "123456" }
```
- 200 OK: `{ "enabled": true }`

### POST /auth/logout
- 204 No Content

---

## Users & Profiles

### GET /me
- Roles: authenticated
- 200 OK
```json
{ "id": 1, "email": "demo@xycargo.com", "full_name": "Demo User", "roles": ["customer"], "preferred_language": "en" }
```

### PATCH /me
- Request (any subset)
```json
{ "full_name": "New Name", "phone": "+1 555-1111", "preferred_language": "en" }
```
- 200 OK: updated user

### GET /users/:id
- Roles: admin
- 200 OK: user with roles

### POST /users/:id/roles
- Roles: admin
- Request
```json
{ "roles": ["warehouse_staff", "admin"] }
```
- 200 OK

---

## Customers
(Backed by `customers`)

### GET /customers
- Roles: admin
- Query: `account_type`, `verification_status`, `q`, pagination
- 200 OK
```json
{ "items": [ { "id": 10, "customer_code": "CUST-001", "account_type": "Business", "verification_status": "Verified" } ], "pagination": { "page": 1, "limit": 20, "total": 123 } }
```

### POST /customers
- Roles: admin, agent
- Request: basic profile + contact
- 201 Created: customer

### GET /customers/:id
- Roles: admin; agent (own customers); customer (self)
- 200 OK: customer + summary stats

### PATCH /customers/:id
- Roles: admin
- 200 OK

### GET /customers/:id/parcels
- Roles: admin, owner, agent (if linked)
- 200 OK: list of parcels

---

## Addresses
(Backed by `addresses`, `customer_warehouse_addresses`)

### GET /addresses
- Roles: customer (own)
- 200 OK
```json
{ "items": [ { "id": 1, "recipient_name": "John", "company": "Tech Inc", "line1": "123 Main", "city": "New York", "is_default": true } ] }
```

### POST /addresses
- Roles: customer
- Request
```json
{ "label": "Home", "recipient_name": "John", "company": "Tech Inc", "line1": "123 Main", "line2": "Suite 456", "city_id": 10, "postal_code": "10001", "country_id": 1, "phone": "+1 555-123", "email": "john@ex.com", "is_default": true }
```
- 201 Created

### PATCH /addresses/:id
- Roles: customer (owner)
- 200 OK

### DELETE /addresses/:id
- Roles: customer (owner)
- 204 No Content

### GET /customers/:id/warehouse-addresses
- Roles: customer (owner), admin
- 200 OK: list of `customer_warehouse_addresses`

---

## Warehouses
(Backed by `warehouses`, `warehouse_settings`)

### GET /warehouses
- Roles: admin
- 200 OK: list

### POST /warehouses
- Roles: admin
- 201 Created

### GET /warehouses/:id/settings
- Roles: admin
- 200 OK
```json
{ "items": [ { "key": "opening_hours", "value": { "mon_fri": "8-18" } } ] }
```

### PUT /warehouses/:id/settings/:key
- Roles: admin
- Request: `{ "value": {"...": "..."} }`
- 200 OK

---

## Staff
(Backed by `staff`)

### GET /staff
- Roles: admin
- 200 OK

### POST /staff
- Roles: admin
- Request: user fields + staff linkage
- 201 Created

### PATCH /staff/:id
- Roles: admin
- 200 OK

---

## Agents
(Backed by `agents`)

### GET /agents
- Roles: admin
- 200 OK (includes `agent_type`, `status`, `commission_pct`)

### POST /agents
- Roles: admin
- 201 Created

### PATCH /agents/:id
- Roles: admin
- 200 OK

---

## Parcels
(Backed by `parcels`, `parcel_items`, `parcel_statuses`, `files`)

### GET /parcels
- Roles: admin (all), customer (own), warehouse_staff (by warehouse)
- Query: `status`, `customer_id`, `warehouse_id`, `tracking_number`, pagination
- 200 OK
```json
{ "items": [ { "id": 1001, "parcel_code": "PAR-2025-0001", "tracking_number": "TR001", "status": "IN_TRANSIT", "declared_value": 950, "weight_kg": 3.5 } ], "pagination": { "page": 1, "limit": 20, "total": 245 } }
```

### POST /parcels
- Roles: warehouse_staff, admin
- Request
```json
{
  "customer_id": 10,
  "warehouse_id": 3,
  "declared_value": 950,
  "weight_kg": 3.5,
  "dimensions": { "length_cm": 45, "width_cm": 30, "height_cm": 20 },
  "items": [ { "sku": "item-001", "description": "MacBook Pro", "quantity": 1, "unit_price": 800, "hs_code": "847130" } ],
  "metadata": { "isFragile": true, "specialTags": ["Fragile", "High Value"] }
}
```
- 201 Created
```json
{ "id": 1001, "parcel_code": "PAR-2025-0001", "status": "RECEIVED" }
```

### GET /parcels/:id
- Roles: as above
- 200 OK: parcel with items and latest tracking

### PATCH /parcels/:id
- Roles: warehouse_staff, admin
- Request: subset of fields
- 200 OK

### DELETE /parcels/:id
- Roles: admin
- 204 No Content

### POST /parcels/:id/items
- Roles: warehouse_staff, admin
- 201 Created item

### PATCH /parcel-items/:itemId
- 200 OK

### DELETE /parcel-items/:itemId
- 204 No Content

### POST /parcels/:id/assign-to-shipment
- Roles: warehouse_staff, admin
- Request: `{ "shipment_id": 501 }`
- 200 OK

### POST /parcels/:id/value-services
- Roles: warehouse_staff, admin
- Request: `{ "service_type": "INSURANCE", "price": 10.0 }`
- 201 Created

---

## Packaging
(Backed by `packaging_options`, `packaging_requests`, `packaging_request_history`)

### GET /packaging/options
- Roles: customer, warehouse_staff, admin
- 200 OK: list of options

### POST /parcels/:id/packaging/requests
- Roles: customer, warehouse_staff
- Request
```json
{ "option_id": 2, "is_fragile": true, "special_instructions": "Use bubble wrap" }
```
- 201 Created
```json
{ "id": 9001, "status": "requested", "quoted_price": 35.00 }
```

### PATCH /packaging/requests/:id
- Roles: warehouse_staff
- Request: `{ "status": "completed", "final_price": 35.00 }`
- 200 OK

### GET /parcels/:id/packaging/requests
- Roles: customer (owner), warehouse_staff, admin
- 200 OK: list with history

---

## Shipments
(Backed by `shipments`, `shipment_parcels`, `shipment_statuses`)

### GET /shipments
- Roles: warehouse_staff, admin
- Query: `status`, `type`, `origin_warehouse_id`, `destination_warehouse_id`
- 200 OK

### POST /shipments
- Roles: warehouse_staff, admin
- Request
```json
{ "shipment_code": "SHIP-AIR-2025-0001", "type": "AIR", "carrier_id": 2, "origin_warehouse_id": 1, "destination_warehouse_id": 5, "scheduled_departure": "2025-01-15T10:00:00Z" }
```
- 201 Created

### GET /shipments/:id
- 200 OK: shipment with parcels

### PATCH /shipments/:id
- Roles: warehouse_staff, admin
- 200 OK

### POST /shipments/:id/parcels
- Roles: warehouse_staff, admin
- Request: `{ "parcel_ids": [1001, 1002, 1003] }`
- 200 OK

---

## Tracking
(Backed by `tracking_events`)

### GET /tracking/:trackingNumber
- Roles: public
- 200 OK
```json
{ "tracking_number": "TR001234567", "status": "IN_TRANSIT", "current_location": "Atlanta, GA", "estimated_delivery": "2024-01-18", "history": [ { "event_code": "DEPARTED", "description": "Departed facility", "location": "Jacksonville, FL", "occurred_at": "2024-01-15T23:45:00Z" } ] }
```

### POST /parcels/:id/tracking
- Roles: warehouse_staff, admin
- Request
```json
{ "event_code": "ARRIVED", "description": "Arrived at sorting facility", "location": "Jacksonville, FL", "occurred_at": "2024-01-15T18:20:00Z" }
```
- 201 Created

---

## Consolidation
(Backed by `consolidations`, `consolidation_parcels`)

### POST /consolidations
- Roles: customer, admin
- Request: `{ "customer_id": 10, "notes": "Consolidate small parcels" }`
- 201 Created

### POST /consolidations/:id/parcels
- Roles: customer (owner), admin
- Request: `{ "parcel_ids": [100, 101] }`
- 200 OK

---

## Invoices & Payments
(Backed by `invoices`, `invoice_lines`, `payments`, `transactions`, `parcel_payments`)

### GET /invoices
- Roles: customer (own), admin
- Query: `status`, `customer_id`, `q`
- 200 OK
```json
{ "items": [ { "id": 3001, "invoice_number": "INV-2024-001", "status": "PENDING", "total_amount": 245.5, "due_at": "2024-01-20" } ] }
```

### POST /invoices
- Roles: warehouse_staff, admin
- Request
```json
{ "customer_id": 10, "lines": [ { "description": "International Shipping", "amount": 125.5, "reference_type": "parcel", "reference_id": 1001 }, { "description": "Insurance", "amount": 20.0 } ] }
```
- 201 Created (totals computed)

### GET /invoices/:id
- 200 OK: invoice with lines and outstanding

### PATCH /invoices/:id
- Roles: warehouse_staff, admin
- 200 OK

### POST /payments
- Roles: customer (own), admin
- Request
```json
{ "invoice_id": 3001, "amount": 125.5, "method": "card", "metadata": { "card_last4": "4242" } }
```
- 201 Created
```json
{ "id": 7001, "status": "completed", "recorded_by": 1 }
```

### GET /payments
- Roles: admin; customer (own); warehouse_staff (by invoice/customer scope)
- Query: `invoice_id`, `customer_id`, `status`, pagination
- 200 OK: list

### GET /payments/:id
- 200 OK

### POST /parcels/:id/payments
- Roles: customer (owner), admin
- Request: `{ "payment_id": 7001, "amount": 125.5 }`
- 201 Created (parcel_payments)

---

## Claims
(Backed by `claims`, `claim_documents`)

### POST /parcels/:id/claims
- Roles: customer (owner), admin
- Request
```json
{ "claim_amount": 300.00, "reason": "Damage", "description": "Broken glass" }
```
- 201 Created: returns `claim_code`

### GET /claims
- Roles: admin
- Query: `status`, `parcel_id`, `customer_id`
- 200 OK: list

### PATCH /claims/:id
- Roles: admin
- Request: `{ "status": "approved", "resolution_notes": "Partial refund" }`
- 200 OK

---

## Files
(Backed by `files`)

### POST /files
- Roles: authenticated
- Flow: multipart upload or signed URL
- 201 Created: file record with `related_type` and `related_id`

### GET /files
- Roles: authenticated (scoped)
- Query: `related_type`, `related_id`
- 200 OK: list

---

## Notifications & Preferences
(Backed by `notifications`, `notification_preferences`)

### GET /notifications
- Roles: customer (own), staff (own), admin (own)
- Query: `is_read`, `priority`, pagination
- 200 OK
```json
{ "items": [ { "id": 1, "type": "Shipment Update", "icon": "package", "priority": "high", "title": "Arrived", "body": "...", "created_at": "..." } ] }
```

### PATCH /notifications/:id/read
- Roles: owner
- 200 OK: `{ "is_read": true }`

### GET /preferences/notifications
- Roles: owner
- 200 OK: notification preferences

### PUT /preferences/notifications
- Roles: owner
- Request
```json
{ "email_enabled": true, "sms_enabled": false, "in_app_enabled": true, "channels": { "shipmentUpdates": ["email", "in_app"] } }
```
- 200 OK

---

## Support
(Backed by `support_tickets`, `support_ticket_messages`)

### POST /support/tickets
- Roles: customer
- Request: `{ "subject": "Where is my parcel?", "body": "Tracking TR001234567 shows delay." }`
- 201 Created: `{ "id": 8001, "status": "open" }`

### GET /support/tickets
- Roles: customer (own), admin (all)
- 200 OK: list

### POST /support/tickets/:id/messages
- Roles: ticket participants, admin
- Request: `{ "message": "Any update?" }`
- 201 Created

### PATCH /support/tickets/:id
- Roles: admin
- Request: `{ "status": "resolved", "assigned_staff_id": 55 }`
- 200 OK

---

## Pricing & Quoting
(Backed by `pricing_rate_cards`, `pricing_rate_rules`)

### GET /pricing/rate-cards
- Roles: admin
- 200 OK

### POST /pricing/rate-cards
- Roles: admin
- Request: `{ "code": "AIR-2025", "currency": "USD", "effective_from": "2025-01-01", "base_rate_per_kg": 12 }`
- 201 Created

### GET /pricing/rate-rules
- Roles: admin
- Query: `rate_card_id`
- 200 OK

### POST /pricing/rate-rules
- Roles: admin
- Request
```json
{ "rate_card_id": 1, "shipment_type_id": 1, "origin_country_id": 156, "destination_country_id": 894, "weight_from_kg": 0, "weight_to_kg": 20, "price_per_kg": 12.5 }
```
- 201 Created

### POST /pricing/quote
- Roles: public, customer
- Request
```json
{ "from_country_id": 156, "to_country_id": 894, "shipment_type": "AIR", "weight_kg": 3.5, "dimensions": { "l": 45, "w": 30, "h": 20 }, "category": "normal" }
```
- 200 OK
```json
{ "currency": "USD", "price": 125.50, "breakdown": [ { "label": "Base charge", "amount": 120.50 }, { "label": "Insurance", "amount": 5.00 } ] }
```

---

## Reports (Admin)

### GET /reports/finance
- Query: date range
- 200 OK: aggregates

### GET /reports/customers
- 200 OK: top customers, churn, LTV

### GET /reports/agents
- 200 OK: performance metrics

### GET /reports/logs
- 200 OK: recent audit logs

---

## Security & Audit

### GET /security/access-logs
- Roles: admin
- Query: `user_id`, date range
- 200 OK

### GET /security/audit-logs
- Roles: admin
- 200 OK

---

## Dashboards

### GET /dashboards/admin
- Roles: admin
- 200 OK
```json
{ "metrics": { "parcels_in_transit": 120, "pending_payments": 32, "revenue_month": 12450.75 }, "recent_activity": [] }
```

### GET /dashboards/warehouse
- Roles: warehouse_staff
- 200 OK: intake, packaging queue, outgoing shipments

### GET /dashboards/client
- Roles: customer
- 200 OK: incoming parcels, unpaid invoices, recent shipments

---

## Standard HTTP Responses
- 200 OK: resource/list returned
- 201 Created: resource created
- 204 No Content: success without body
- 400 Bad Request: validation or parse error
- 401 Unauthorized: no/invalid auth
- 403 Forbidden: insufficient role or scope
- 404 Not Found: missing resource
- 409 Conflict: duplication or state conflict
- 422 Unprocessable Entity: business rule failed
- 500 Internal Server Error

---

## Notes
- All IDs are numeric unless otherwise noted. Human-friendly codes (e.g., `customer_code`, `shipment_code`, `parcel_code`) are returned as read-only where available.
- Timestamps are ISO-8601 with timezone (timestamptz). Amounts are decimal types.
- Many endpoints support metadata objects for forward-compatible extensions.


