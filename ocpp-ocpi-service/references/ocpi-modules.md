# OCPI 2.2.1 Module Reference

Complete reference for all OCPI 2.2.1 modules, their endpoints, data structures, and implementation patterns.

## Table of Contents

1. [Protocol Basics](#1-protocol-basics)
2. [Credentials Module](#2-credentials-module)
3. [Locations Module](#3-locations-module)
4. [Sessions Module](#4-sessions-module)
5. [CDRs Module](#5-cdrs-module)
6. [Tariffs Module](#6-tariffs-module)
7. [Tokens Module](#7-tokens-module)
8. [Commands Module](#8-commands-module)
9. [Charging Profiles Module](#9-charging-profiles-module)
10. [Hub Client Info Module](#10-hub-client-info-module)
11. [Implementation Patterns](#11-implementation-patterns)

---

## 1. Protocol Basics

### Roles

| Role | Full Name | Description |
|------|-----------|-------------|
| CPO | Charge Point Operator | Owns/operates charging stations |
| eMSP | e-Mobility Service Provider | Provides charging access to drivers |
| HUB | Roaming Hub | Intermediary connecting CPOs and eMSPs |
| NSP | Navigation Service Provider | Provides location/availability data |
| SCSP | Smart Charging Service Provider | Provides smart charging optimization |

### Communication Model

OCPI uses REST/HTTP with two patterns:
- **Pull**: Receiver periodically fetches data (GET with date_from/date_to pagination)
- **Push**: Sender pushes updates in real-time (PUT/PATCH to receiver's endpoint)

Both patterns are used simultaneously for reliability.

### URL Structure

```
https://{base_url}/ocpi/{role}/2.2.1/{module}
```

Examples:
```
CPO endpoints (called by eMSP):
  GET  https://cpo.example.com/ocpi/cpo/2.2.1/locations
  GET  https://cpo.example.com/ocpi/cpo/2.2.1/sessions
  GET  https://cpo.example.com/ocpi/cpo/2.2.1/cdrs
  POST https://cpo.example.com/ocpi/cpo/2.2.1/commands/START_SESSION

eMSP endpoints (called by CPO):
  PUT   https://emsp.example.com/ocpi/emsp/2.2.1/locations/{country}/{party}/{id}
  PUT   https://emsp.example.com/ocpi/emsp/2.2.1/sessions/{country}/{party}/{id}
  POST  https://emsp.example.com/ocpi/emsp/2.2.1/cdrs
  GET   https://emsp.example.com/ocpi/emsp/2.2.1/tokens
  POST  https://emsp.example.com/ocpi/emsp/2.2.1/tokens/{token_uid}/authorize
```

### Authentication

Every OCPI request includes:
```
Authorization: Token <BASE64_ENCODED_TOKEN>
```

Plus routing headers (for hub communication):
```
OCPI-from-country-code: NL
OCPI-from-party-id: TNM
OCPI-to-country-code: DE
OCPI-to-party-id: ABC
```

### Response Format

All OCPI responses follow this envelope:
```json
{
  "status_code": 1000,
  "status_message": "Success",
  "timestamp": "2026-03-19T10:00:00Z",
  "data": { ... }
}
```

Status codes: 1xxx = success, 2xxx = client error, 3xxx = server error, 4xxx = hub error.

---

## 2. Credentials Module

Handles registration and authentication between OCPI parties.

### Registration Flow

```
Step 1: Out-of-band token exchange
  Party A gives TOKEN_A to Party B (email, dashboard, etc.)

Step 2: Party B registers
  POST {Party_A_base}/ocpi/2.2.1/credentials
  Authorization: Token TOKEN_A
  Body: {
    token: "TOKEN_B",
    url: "https://partyb.example.com/ocpi/versions",
    roles: [{role: "EMSP", country_code: "DE", party_id: "ABC", business_details: {...}}]
  }

Step 3: Party A responds
  Response: {
    token: "TOKEN_C",  // New token for Party B to use
    url: "https://partya.example.com/ocpi/versions",
    roles: [{role: "CPO", country_code: "NL", party_id: "TNM", business_details: {...}}]
  }

Step 4: Both parties store credentials
  Party A uses TOKEN_B to call Party B
  Party B uses TOKEN_C to call Party A
```

### Endpoints

| Method | URL | Description |
|--------|-----|-------------|
| GET | /ocpi/2.2.1/credentials | Get current credentials |
| POST | /ocpi/2.2.1/credentials | Register new party |
| PUT | /ocpi/2.2.1/credentials | Update credentials |
| DELETE | /ocpi/2.2.1/credentials | Unregister |

---

## 3. Locations Module

Shares charge point location, EVSE, and connector data.

### Data Hierarchy

```
Location
├── name, address, coordinates, opening_times, facilities
├── EVSEs[]
│   ├── uid, status, capabilities, connectors[]
│   │   └── Connector
│   │       ├── id, standard, format, power_type
│   │       └── max_voltage, max_amperage, max_electric_power
│   └── parking_restrictions, physical_reference
└── energy_mix, operator, suboperator
```

### EVSE Status Values

| Status | Description |
|--------|-------------|
| AVAILABLE | Ready for charging |
| BLOCKED | Not accessible (physical barrier) |
| CHARGING | In use, charging active |
| INOPERATIVE | Out of order |
| OUTOFORDER | Known broken |
| PLANNED | Not yet active |
| REMOVED | Permanently removed |
| RESERVED | Reserved |
| UNKNOWN | Status unknown |

### CPO Endpoints (eMSP pulls from CPO)

| Method | URL | Description |
|--------|-----|-------------|
| GET | /ocpi/cpo/2.2.1/locations | List locations (paginated, filtered by date_from/date_to) |
| GET | /ocpi/cpo/2.2.1/locations/{id} | Single location |
| GET | /ocpi/cpo/2.2.1/locations/{id}/{evse_uid} | Single EVSE |
| GET | /ocpi/cpo/2.2.1/locations/{id}/{evse_uid}/{connector_id} | Single connector |

### eMSP Endpoints (CPO pushes to eMSP)

| Method | URL | Description |
|--------|-----|-------------|
| GET | /ocpi/emsp/2.2.1/locations/{country}/{party}/{id} | Get pushed location |
| PUT | /ocpi/emsp/2.2.1/locations/{country}/{party}/{id} | Full location update |
| PATCH | /ocpi/emsp/2.2.1/locations/{country}/{party}/{id} | Partial update |
| PUT | /ocpi/emsp/2.2.1/locations/{country}/{party}/{id}/{evse_uid} | EVSE update |
| PATCH | /ocpi/emsp/2.2.1/locations/{country}/{party}/{id}/{evse_uid} | Partial EVSE update |
| PUT | /ocpi/emsp/2.2.1/locations/{country}/{party}/{id}/{evse_uid}/{connector_id} | Connector update |

---

## 4. Sessions Module

Real-time charging session data shared between CPO and eMSP during active charging.

### Session Object

```json
{
  "country_code": "NL",
  "party_id": "TNM",
  "id": "session-uuid-123",
  "start_date_time": "2026-03-19T10:00:00Z",
  "end_date_time": null,
  "kwh": 15.230,
  "cdr_token": {
    "uid": "ABCD1234",
    "type": "RFID",
    "contract_id": "NL-TNM-C12345678-X"
  },
  "auth_method": "AUTH_REQUEST",
  "authorization_reference": "auth-ref-456",
  "location_id": "loc-001",
  "evse_uid": "evse-001",
  "connector_id": "1",
  "meter_id": "meter-001",
  "currency": "EUR",
  "charging_periods": [
    {
      "start_date_time": "2026-03-19T10:00:00Z",
      "dimensions": [
        {"type": "ENERGY", "volume": 15.230},
        {"type": "TIME", "volume": 0.5}
      ]
    }
  ],
  "total_cost": {"excl_vat": 4.57, "incl_vat": 5.53},
  "status": "ACTIVE",
  "last_updated": "2026-03-19T10:30:00Z"
}
```

### Session Status Values

| Status | Description |
|--------|-------------|
| ACTIVE | Charging in progress |
| COMPLETED | Charging completed, CDR not yet sent |
| INVALID | Session invalidated (error, auth revoked) |
| PENDING | Session authorized but not yet started |
| RESERVATION | Reserved, not yet active |

### Auth Methods

| Method | Description |
|--------|-------------|
| AUTH_REQUEST | Real-time authorization via Authorize endpoint |
| COMMAND | Started via Commands module (remote start) |
| WHITELIST | Token was on local whitelist |

### Endpoints

CPO side (eMSP pulls):
| Method | URL | Description |
|--------|-----|-------------|
| GET | /ocpi/cpo/2.2.1/sessions | List sessions (paginated) |
| PUT | /ocpi/cpo/2.2.1/sessions/{session_id}/charging_preferences | Set driver preferences |

eMSP side (CPO pushes):
| Method | URL | Description |
|--------|-----|-------------|
| GET | /ocpi/emsp/2.2.1/sessions/{country}/{party}/{id} | Get session |
| PUT | /ocpi/emsp/2.2.1/sessions/{country}/{party}/{id} | Create/full update |
| PATCH | /ocpi/emsp/2.2.1/sessions/{country}/{party}/{id} | Partial update |

### Push Frequency

CPO should push session updates to eMSP:
- On session start (PUT with status ACTIVE)
- Every 60 seconds during charging (PATCH with updated kwh, cost)
- On session end (PATCH with status COMPLETED)
- When CDR is ready, send CDR separately

---

## 5. CDRs Module

Charge Detail Records for billing. Sent after session completion.

### CDR Object

```json
{
  "country_code": "NL",
  "party_id": "TNM",
  "id": "cdr-uuid-789",
  "start_date_time": "2026-03-19T10:00:00Z",
  "end_date_time": "2026-03-19T10:45:00Z",
  "session_id": "session-uuid-123",
  "cdr_token": {
    "uid": "ABCD1234",
    "type": "RFID",
    "contract_id": "NL-TNM-C12345678-X"
  },
  "auth_method": "AUTH_REQUEST",
  "authorization_reference": "auth-ref-456",
  "cdr_location": {
    "id": "loc-001",
    "name": "City Parking",
    "address": "Main Street 1",
    "city": "Amsterdam",
    "country": "NLD",
    "coordinates": {"latitude": "52.3676", "longitude": "4.9041"},
    "evse_uid": "evse-001",
    "evse_id": "NL*TNM*E001",
    "connector_id": "1",
    "connector_standard": "IEC_62196_T2",
    "connector_format": "CABLE",
    "connector_power_type": "AC_3_PHASE"
  },
  "meter_id": "meter-001",
  "currency": "EUR",
  "tariffs": [{"tariff_id": "tariff-001"}],
  "charging_periods": [
    {
      "start_date_time": "2026-03-19T10:00:00Z",
      "dimensions": [
        {"type": "ENERGY", "volume": 35.420},
        {"type": "TIME", "volume": 0.75},
        {"type": "PARKING_TIME", "volume": 0.0}
      ],
      "tariff_id": "tariff-001"
    }
  ],
  "signed_data": null,
  "total_cost": {"excl_vat": 10.63, "incl_vat": 12.86},
  "total_fixed_cost": {"excl_vat": 0.50},
  "total_energy": 35.420,
  "total_energy_cost": {"excl_vat": 8.85},
  "total_time": 0.75,
  "total_time_cost": {"excl_vat": 1.28},
  "total_parking_time": 0.0,
  "total_parking_cost": {"excl_vat": 0.0},
  "total_reservation_cost": null,
  "remark": null,
  "invoice_reference_id": null,
  "credit": false,
  "credit_reference_id": null,
  "last_updated": "2026-03-19T10:46:00Z"
}
```

### Dimension Types

| Type | Unit | Description |
|------|------|-------------|
| CURRENT | A | Average current during period |
| ENERGY | kWh | Energy consumed |
| ENERGY_EXPORT | kWh | Energy exported (V2G) |
| ENERGY_IMPORT | kWh | Energy imported |
| MAX_CURRENT | A | Peak current |
| MIN_CURRENT | A | Minimum current |
| MAX_POWER | kW | Peak power |
| MIN_POWER | kW | Minimum power |
| PARKING_TIME | hours | Time connected but not charging |
| POWER | kW | Average power |
| STATE_OF_CHARGE | % | SoC at start of period |
| TIME | hours | Duration of period |

### Endpoints

CPO side (eMSP pulls):
| Method | URL | Description |
|--------|-----|-------------|
| GET | /ocpi/cpo/2.2.1/cdrs | List CDRs (paginated) |

eMSP side (CPO pushes):
| Method | URL | Description |
|--------|-----|-------------|
| GET | /ocpi/emsp/2.2.1/cdrs/{id} | Get specific CDR |
| POST | /ocpi/emsp/2.2.1/cdrs | Push new CDR |

---

## 6. Tariffs Module

Pricing structures shared between CPO and eMSP.

### Tariff Structure

```json
{
  "country_code": "NL",
  "party_id": "TNM",
  "id": "tariff-001",
  "currency": "EUR",
  "type": "REGULAR",
  "tariff_alt_text": [{"language": "en", "text": "€0.25/kWh + €0.02/min"}],
  "tariff_alt_url": "https://example.com/tariffs",
  "min_price": {"excl_vat": 1.00},
  "max_price": {"excl_vat": 50.00},
  "elements": [
    {
      "price_components": [
        {"type": "ENERGY", "price": 0.25, "vat": 21.0, "step_size": 1},
        {"type": "TIME", "price": 0.02, "vat": 21.0, "step_size": 60},
        {"type": "FLAT", "price": 0.50, "vat": 21.0}
      ],
      "restrictions": {
        "start_time": "08:00",
        "end_time": "20:00",
        "day_of_week": ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"]
      }
    },
    {
      "price_components": [
        {"type": "ENERGY", "price": 0.20, "vat": 21.0, "step_size": 1},
        {"type": "FLAT", "price": 0.25, "vat": 21.0}
      ],
      "restrictions": {
        "start_time": "20:00",
        "end_time": "08:00"
      }
    }
  ],
  "last_updated": "2026-01-01T00:00:00Z"
}
```

### Price Component Types

| Type | Unit | Description |
|------|------|-------------|
| ENERGY | per kWh | Cost per unit of energy |
| FLAT | per session | Fixed session fee |
| PARKING_TIME | per hour | Cost for time connected but not charging |
| TIME | per hour | Cost per time unit while charging |

---

## 7. Tokens Module

Authorization tokens shared between eMSP (owner) and CPO (consumer).

### Token Object

```json
{
  "country_code": "DE",
  "party_id": "ABC",
  "uid": "ABCD1234",
  "type": "RFID",
  "contract_id": "DE-ABC-C12345678-X",
  "visual_number": "1234-5678",
  "issuer": "ABC Mobility",
  "group_id": "family-group-001",
  "valid": true,
  "whitelist": "ALLOWED",
  "language": "de",
  "default_profile_type": "CHEAP",
  "energy_contract": null,
  "last_updated": "2026-03-01T00:00:00Z"
}
```

### Token Types

| Type | Description |
|------|-------------|
| AD_HOC_USER | One-time use token (QR code, SMS) |
| APP_USER | Mobile app user |
| OTHER | Other token type |
| RFID | Physical RFID card |

### Whitelist Types

| Type | Description |
|------|-------------|
| ALWAYS | Always allowed without real-time auth check |
| ALLOWED | Allowed, but real-time auth recommended |
| ALLOWED_OFFLINE | Allowed only when CSMS is offline |
| NEVER | Never allowed from whitelist, always requires real-time auth |

### Real-Time Authorization

When a CPO receives a token not in its cache:

```
POST /ocpi/emsp/2.2.1/tokens/{token_uid}/authorize
Body: {
  "token": {"uid": "ABCD1234", "type": "RFID", "contract_id": "..."},
  "location_references": {
    "location_id": "loc-001",
    "evse_uids": ["evse-001"]
  }
}

Response: {
  "allowed": "ALLOWED",
  "token": { ... },
  "location": null,
  "authorization_reference": "auth-ref-456",
  "display_text": [{"language": "en", "text": "Welcome, John!"}]
}
```

### Allowed Values

| Value | Description |
|-------|-------------|
| ALLOWED | Token valid, proceed |
| BLOCKED | Token blocked |
| EXPIRED | Token expired |
| NO_CREDIT | Insufficient funds |
| NOT_ALLOWED | Not allowed at this location/time |

---

## 8. Commands Module

Remote operations initiated by eMSP, executed by CPO.

### Available Commands

| Command | Description | Key Fields |
|---------|-------------|------------|
| START_SESSION | Remote start charging | `token`, `location_id`, `evse_uid`, `authorization_reference`, `connector_id` |
| STOP_SESSION | Remote stop charging | `session_id` |
| RESERVE_NOW | Make a reservation | `token`, `location_id`, `evse_uid`, `authorization_reference`, `expiry_date` |
| CANCEL_RESERVATION | Cancel reservation | `reservation_id` |
| UNLOCK_CONNECTOR | Unlock a connector | `location_id`, `evse_uid`, `connector_id` |

### Async Command Flow

```
1. eMSP → CPO:  POST /ocpi/cpo/2.2.1/commands/START_SESSION
                Body: {token, location_id, evse_uid, response_url, ...}
   CPO responds: 200 {result: "ACCEPTED"}  // command received, not yet executed

2. CPO sends OCPP RemoteStartTransaction to charger
3. Charger responds Accepted/Rejected

4. CPO → eMSP:  POST {response_url}  // callback
                Body: {result: "ACCEPTED" | "REJECTED" | "TIMEOUT" | ...}
```

### Command Result Values

| Result | Description |
|--------|-------------|
| ACCEPTED | Command accepted and executed |
| CANCELED_RESERVATION | Reservation canceled |
| EVSE_OCCUPIED | EVSE already in use |
| EVSE_INOPERATIVE | EVSE not working |
| FAILED | Command failed |
| NOT_SUPPORTED | Command not supported |
| REJECTED | Command rejected by charger |
| TIMEOUT | No response from charger |
| UNKNOWN_RESERVATION | Reservation ID not found |

---

## 9. Charging Profiles Module

Smart charging communication between parties (e.g., grid operator → CPO via eMSP).

### Endpoints

| Method | URL | Direction | Description |
|--------|-----|-----------|-------------|
| PUT | /ocpi/cpo/2.2.1/chargingprofiles/{session_id} | eMSP → CPO | Set charging profile for active session |
| GET | /ocpi/cpo/2.2.1/chargingprofiles/{session_id} | eMSP → CPO | Get active profile |
| DELETE | /ocpi/cpo/2.2.1/chargingprofiles/{session_id} | eMSP → CPO | Clear profile |
| PUT | /ocpi/emsp/2.2.1/chargingprofiles/{session_id} | CPO → eMSP | Report active profile to eMSP |

### ActiveChargingProfile Object

```json
{
  "start_date_time": "2026-03-19T10:00:00Z",
  "charging_profile": {
    "start_date_time": "2026-03-19T10:00:00Z",
    "duration": 3600,
    "charging_rate_unit": "W",
    "min_charging_rate": 0,
    "charging_profile_period": [
      {"start_period": 0, "limit": 22000},
      {"start_period": 1800, "limit": 11000}
    ]
  }
}
```

---

## 10. Hub Client Info Module

Information about parties connected via a roaming hub.

### ClientInfo Object

```json
{
  "party_id": "ABC",
  "country_code": "DE",
  "role": "EMSP",
  "status": "CONNECTED",
  "last_updated": "2026-03-19T00:00:00Z"
}
```

### Status Values

| Status | Description |
|--------|-------------|
| CONNECTED | Party is active and connected |
| OFFLINE | Party is registered but currently offline |
| PLANNED | Party is planned but not yet connected |
| SUSPENDED | Party access is suspended |

---

## 11. Implementation Patterns

### OCPP ↔ OCPI Bridge

The CSMS acts as a bridge between OCPP (charger communication) and OCPI (roaming):

```
OCPP Event                → OCPI Action
────────────────────────────────────────────────────
StatusNotification         → PATCH Location (EVSE status)
Authorize (unknown token)  → POST Token authorize (real-time auth)
StartTransaction           → PUT Session (create ACTIVE session)
MeterValues (periodic)     → PATCH Session (update kwh, cost)
StopTransaction            → PATCH Session (COMPLETED) + POST CDR
RemoteStart from eMSP      → Commands.START_SESSION → OCPP RemoteStart
```

### Sync Strategy

For reliability, implement both pull and push:

**Push (real-time)**:
- Status changes → immediate push
- Session updates → every 60 seconds during charging
- CDRs → push immediately on creation

**Pull (reconciliation)**:
- Locations: full sync daily, incremental every 15 minutes
- Sessions: reconciliation pull every 5 minutes
- CDRs: reconciliation pull every hour
- Tokens: full sync daily, incremental every 30 minutes

### Pagination

All OCPI GET list endpoints support pagination:
```
GET /ocpi/cpo/2.2.1/locations?date_from=2026-03-18T00:00:00Z&date_to=2026-03-19T00:00:00Z&offset=0&limit=50

Response Headers:
  X-Total-Count: 150
  X-Limit: 50
  Link: </ocpi/cpo/2.2.1/locations?offset=50&limit=50>; rel="next"
```
