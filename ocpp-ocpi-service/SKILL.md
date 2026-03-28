---
name: ocpp-ocpi-service
description: "Build a production-grade EV Charging Station Management System (CSMS) backend service supporting OCPP 1.6J and OCPP 2.0.1 protocols for charger communication, plus OCPI 2.2.1 for roaming/interoperability. Covers real-time authorization (RFID, EMAID, credit card, Plug & Charge, remote start from app), session lifecycle management, meter values, status notifications, transaction handling, CDR generation, tariff management, and smart charging. Use this skill whenever the user mentions OCPP, OCPI, EV charging backend, CSMS, charging station management, charger integration, roaming, CPO, eMSP, EVSE management, or any EV charging protocol work."
---

# OCPP/OCPI EV Charging Service — Comprehensive Build Guide

This skill provides everything needed to build a production-grade Charging Station Management System (CSMS) backend that communicates with EV chargers via OCPP and with roaming partners via OCPI.

## Table of Contents

1. [Protocol Overview](#1-protocol-overview)
2. [Architecture](#2-architecture)
3. [Database Design](#3-database-design)
4. [OCPP Implementation](#4-ocpp-implementation)
5. [OCPI Implementation](#5-ocpi-implementation)
6. [Authorization Flows](#6-authorization-flows)
7. [Session Management](#7-session-management)
8. [Meter Values & Billing](#8-meter-values--billing)
9. [Smart Charging](#9-smart-charging)
10. [Security](#10-security)

For detailed database schemas, read `references/database-schema.md`.
For detailed OCPP message reference, read `references/ocpp-messages.md`.
For detailed OCPI module reference, read `references/ocpi-modules.md`.

---

## 1. Protocol Overview

### OCPP (Open Charge Point Protocol)

OCPP handles communication between **Charging Stations** (CS) and the **CSMS** (backend). It uses JSON over WebSocket for persistent bidirectional connections.

**OCPP 1.6J** (most widely deployed):
- Uses flat `idTag` string for authorization (typically 20-char RFID UID)
- Messages: `Authorize`, `StartTransaction`, `StopTransaction`, `MeterValues`, `StatusNotification`, `BootNotification`, `Heartbeat`, `RemoteStartTransaction`, `RemoteStopTransaction`, `Reset`, `ChangeConfiguration`, `GetConfiguration`, `SetChargingProfile`, `ClearChargingProfile`, `TriggerMessage`, `SendLocalList`, `GetLocalListVersion`, `FirmwareUpdate`, `GetDiagnostics`, `DataTransfer`
- Feature profiles: Core, FirmwareManagement, LocalAuthListManagement, Reservation, SmartCharging, RemoteTrigger

**OCPP 2.0.1** (new standard, required for US NEVI funding):
- 3-tier device model: ChargingStation > EVSE > Connector
- Replaces `StartTransaction`/`StopTransaction` with unified `TransactionEvent`
- Rich `IdToken` with types: `Central`, `eMAID`, `ISO14443`, `ISO15693`, `KeyCode`, `Local`, `MacAddress`, `NoAuthorization`
- Native ISO 15118 Plug & Charge support with certificate management
- Security profiles (0-3) with TLS mutual authentication
- Messages restructured into functional blocks: Authorization, Availability, DataTransfer, Diagnostics, DisplayMessage, FirmwareManagement, ISO15118CertificateManagement, LocalAuthorizationListManagement, MeterValues, Provisioning, Reservation, Security, SmartCharging, Tariffs, Transactions

### OCPI (Open Charge Point Interface)

OCPI handles communication between **CPO** (Charge Point Operator) and **eMSP** (e-Mobility Service Provider) for roaming. Uses REST/HTTP with pull and push mechanisms.

**OCPI 2.2.1 Modules:**
- **Credentials** — Registration and authentication between parties
- **Locations** — Charge point information (coordinates, EVSEs, connectors, status)
- **Sessions** — Real-time charging session data
- **CDRs** — Charge Detail Records for billing
- **Tariffs** — Pricing structures
- **Tokens** — Authorization tokens (RFID, app, eMAID)
- **Commands** — Remote operations (StartSession, StopSession, ReserveNow, UnlockConnector, CancelReservation)
- **ChargingProfiles** — Smart charging between parties
- **HubClientInfo** — Information about parties connected via a hub

---

## 2. Architecture

### Recommended Tech Stack

```
┌─────────────────────────────────────────────────────────────────┐
│                        API Gateway / Load Balancer               │
├──────────────────┬──────────────────┬───────────────────────────┤
│  OCPP WebSocket  │   OCPI REST API  │   Driver/Admin REST API   │
│  Server (ws://)  │  (https://)      │   (https://)              │
├──────────────────┴──────────────────┴───────────────────────────┤
│                    Application Layer                             │
│  ┌──────────┐ ┌───────────┐ ┌──────────┐ ┌──────────────────┐  │
│  │ Auth     │ │ Session   │ │ Billing  │ │ Smart Charging   │  │
│  │ Service  │ │ Manager   │ │ Engine   │ │ Manager          │  │
│  ├──────────┤ ├───────────┤ ├──────────┤ ├──────────────────┤  │
│  │ OCPP     │ │ OCPI      │ │ Tariff   │ │ Firmware         │  │
│  │ Handler  │ │ Handler   │ │ Engine   │ │ Manager          │  │
│  └──────────┘ └───────────┘ └──────────┘ └──────────────────┘  │
├─────────────────────────────────────────────────────────────────┤
│                    Message Bus (Redis / RabbitMQ / Kafka)        │
├──────────────────┬──────────────────┬───────────────────────────┤
│  PostgreSQL      │  Redis           │  TimescaleDB / InfluxDB   │
│  (core data)     │  (cache/pubsub)  │  (meter time-series)      │
└──────────────────┴──────────────────┴───────────────────────────┘
```

### Key Design Decisions

- **WebSocket per charger**: Each charger maintains a persistent WebSocket connection. The CSMS must support thousands of concurrent connections.
- **Dual protocol support**: Support both OCPP 1.6J and 2.0.1 simultaneously — detect version from the WebSocket subprotocol header (`ocpp1.6` vs `ocpp2.0.1`).
- **Event-driven architecture**: Use an event bus for decoupling. When a charger sends `StatusNotification`, publish an event that session manager, OCPI sync, and monitoring all consume independently.
- **Idempotency**: OCPP messages have a unique `messageId` — use it for deduplication.
- **Offline resilience**: Cache authorization decisions locally on the charger via `LocalAuthList` and `AuthorizationCache`.

---

## 3. Database Design

The full schema is in `references/database-schema.md`. Here is the entity overview:

### Core Entities

```
organizations          — CPO or eMSP organizations
├── locations          — Physical sites (parking garages, stations)
│   └── evses          — Individual charging units (EVSE)
│       └── connectors — Physical plugs (Type2, CCS, CHAdeMO)
├── charging_stations  — OCPP-registered devices (maps to EVSE)
├── id_tokens          — RFID cards, eMAIDs, app tokens
├── drivers            — End users / EV drivers
├── vehicles           — Registered EVs
└── tariffs            — Pricing plans

charging_sessions      — The central entity tying everything together
├── meter_values       — Time-series energy readings (kWh, W, V, A, SoC)
├── transaction_events — OCPP 2.0.1 TransactionEvent log
├── status_changes     — Connector status history
└── cdrs               — Charge Detail Records for billing

ocpi_tokens            — Tokens received from roaming partners
ocpi_credentials       — Registered OCPI peer connections
ocpp_messages_log      — Raw OCPP message audit trail
```

### Critical Relationships

- A `charging_station` has 1+ `evses`, each with 1+ `connectors`
- A `charging_session` belongs to one `connector`, one `id_token`, optionally one `driver`
- `meter_values` are time-series rows linked to a `charging_session`
- A `cdr` is generated from a completed `charging_session`
- `ocpi_tokens` map to `id_tokens` via the `uid` field

---

## 4. OCPP Implementation

### 4.1 WebSocket Connection Management

```
Charger connects → ws://csms.example.com/ocpp/{chargePointId}
                   wss://csms.example.com/ocpp/{chargePointId}  (TLS)
```

The WebSocket subprotocol negotiation determines the OCPP version:
- `Sec-WebSocket-Protocol: ocpp1.6` → OCPP 1.6J handler
- `Sec-WebSocket-Protocol: ocpp2.0.1` → OCPP 2.0.1 handler

Implement a connection registry (in-memory + Redis) mapping `chargePointId` → WebSocket connection for sending commands to chargers.

### 4.2 OCPP Message Format

All OCPP JSON messages follow this envelope:

```json
// Request (Call):       [2, "messageId", "Action", {payload}]
// Response (CallResult):[3, "messageId", {payload}]
// Error (CallError):    [4, "messageId", "errorCode", "errorDescription", {errorDetails}]
```

### 4.3 Boot Sequence

When a charger first connects:

```
CS → CSMS:  BootNotification {chargePointVendor, chargePointModel, ...}
CSMS → CS:  BootNotification.conf {status: "Accepted", interval: 300, currentTime}
CS → CSMS:  StatusNotification {connectorId: 0, status: "Available"}  // per connector
CS → CSMS:  StatusNotification {connectorId: 1, status: "Available"}
CSMS:       Store/update charging_station record, mark online
```

### 4.4 Charging Session Flow — OCPP 1.6J

```
1. Driver taps RFID card
   CS → CSMS:  Authorize {idTag: "ABCD1234"}
   CSMS → CS:  Authorize.conf {idTagInfo: {status: "Accepted"}}

2. Cable plugged in, charger ready
   CS → CSMS:  StatusNotification {connectorId: 1, status: "Preparing"}

3. Transaction starts
   CS → CSMS:  StartTransaction {connectorId: 1, idTag: "ABCD1234", meterStart: 0, timestamp}
   CSMS → CS:  StartTransaction.conf {transactionId: 12345, idTagInfo: {status: "Accepted"}}
   CSMS:       Create charging_session record with status "ACTIVE"

4. During charging — periodic meter values
   CS → CSMS:  StatusNotification {connectorId: 1, status: "Charging"}
   CS → CSMS:  MeterValues {connectorId: 1, transactionId: 12345, meterValue: [...]}
   CSMS:       Store meter readings, update session running totals

5. Charging completes
   CS → CSMS:  StopTransaction {transactionId: 12345, meterStop: 35420, reason: "EVDisconnected"}
   CSMS → CS:  StopTransaction.conf {idTagInfo: {status: "Accepted"}}
   CSMS:       Finalize session, calculate cost, generate CDR

6. Connector returns to available
   CS → CSMS:  StatusNotification {connectorId: 1, status: "Available"}
```

### 4.5 Charging Session Flow — OCPP 2.0.1

In 2.0.1, `StartTransaction`, `StopTransaction`, and mid-transaction `MeterValues`/`StatusNotification` are consolidated into `TransactionEvent`:

```
1. Driver taps RFID
   CS → CSMS:  Authorize {idToken: {idToken: "ABCD1234", type: "ISO14443"}}
   CSMS → CS:  AuthorizeResponse {idTokenInfo: {status: "Accepted"}}

2. Cable connected
   CS → CSMS:  TransactionEvent {
                 eventType: "Started",
                 triggerReason: "Authorized",
                 transactionInfo: {transactionId: "uuid-xxx", chargingState: "EVConnected"},
                 evse: {id: 1, connectorId: 1},
                 idToken: {idToken: "ABCD1234", type: "ISO14443"},
                 meterValue: [{timestamp, sampledValue: [{value: "0", ...}]}]
               }
   CSMS → CS:  TransactionEventResponse {idTokenInfo: {status: "Accepted"}}

3. Charging active — periodic updates
   CS → CSMS:  TransactionEvent {
                 eventType: "Updated",
                 triggerReason: "MeterValuePeriodic",
                 transactionInfo: {transactionId: "uuid-xxx", chargingState: "Charging"},
                 meterValue: [{timestamp, sampledValue: [{value: "15230", measurand: "Energy.Active.Import.Register"}]}]
               }

4. Charging stopped
   CS → CSMS:  TransactionEvent {
                 eventType: "Ended",
                 triggerReason: "EVCommunicationLost" | "StoppedByEV" | "RemoteStop",
                 transactionInfo: {transactionId: "uuid-xxx", chargingState: "Idle", stoppedReason: "EVDisconnected"},
                 meterValue: [{timestamp, sampledValue: [{value: "35420", ...}]}]
               }
```

### 4.6 Status States (Connector Lifecycle)

```
             ┌──────────────┐
             │  Available   │ ← Charger is idle, ready for new session
             └──────┬───────┘
                    │ Cable plugged in / RFID tap
                    ▼
             ┌──────────────┐
             │  Preparing   │ ← EV connected, authorization in progress
             └──────┬───────┘
                    │ Authorization accepted, power flowing
                    ▼
             ┌──────────────┐
             │  Charging    │ ← Active energy transfer
             └──┬───────┬───┘
                │       │
     EV pauses  │       │ Charger pauses (load mgmt)
                ▼       ▼
        ┌────────────┐ ┌──────────────┐
        │SuspendedEV │ │SuspendedEVSE │
        └──────┬─────┘ └──────┬───────┘
               │               │
               └───────┬───────┘
                       │ Resume or stop
                       ▼
             ┌──────────────┐
             │  Finishing   │ ← Session ending, cable still connected
             └──────┬───────┘
                    │ Cable unplugged
                    ▼
             ┌──────────────┐
             │  Available   │
             └──────────────┘

  At any point:  ──→ ┌──────────┐
                     │ Faulted  │ ← Hardware/software error
                     └──────────┘
```

---

## 5. OCPI Implementation

### 5.1 Registration Flow (Credentials Module)

```
1. Parties exchange registration tokens out-of-band
2. Party A → POST /ocpi/2.2.1/credentials with token_A
3. Party B validates, responds with token_B and version endpoints
4. Both parties store each other's credentials
5. Communication uses TOKEN_B in Authorization header for Party A → B calls
```

### 5.2 Location Sync (CPO → eMSP)

CPO publishes location/EVSE/connector data. eMSP pulls or receives push updates.

```
GET  /ocpi/cpo/2.2.1/locations                    — List all locations
GET  /ocpi/cpo/2.2.1/locations/{id}               — Single location
GET  /ocpi/cpo/2.2.1/locations/{id}/{evse_uid}     — Single EVSE
PUT  /ocpi/emsp/2.2.1/locations/{country}/{party}/{id}  — Push location update
```

### 5.3 Session Lifecycle (CPO → eMSP)

```
Session starts  → PUT /ocpi/emsp/2.2.1/sessions/{country}/{party}/{session_id}
                  status: "ACTIVE", kwh: 0, cost: {...}

During charging → PATCH same URL with updated kwh, cost, last_updated

Session ends    → PATCH with status: "COMPLETED", total_cost
                → POST CDR to /ocpi/emsp/2.2.1/cdrs
```

### 5.4 Real-Time Authorization (eMSP Token Validation)

```
Driver presents token at CPO charger
CPO checks local token cache first (from Tokens module sync)
If not found → POST /ocpi/emsp/2.2.1/tokens/{token_uid}/authorize
eMSP responds: {allowed: "ALLOWED" | "BLOCKED" | "EXPIRED" | "NOT_ALLOWED"}
CPO proceeds or rejects
```

### 5.5 Remote Commands (eMSP → CPO)

```
eMSP sends:  POST /ocpi/cpo/2.2.1/commands/START_SESSION
             {token, location_id, evse_uid, authorization_reference}
CPO maps to: OCPP RemoteStartTransaction (1.6) or RequestStartTransaction (2.0.1)
CPO responds with async result via callback URL
```

---

## 6. Authorization Flows

### 6.1 RFID Authorization

Most common flow. Driver taps a physical RFID card (ISO 14443 / ISO 15693).

```
OCPP 1.6:  idTag = UID of the RFID card (hex string, max 20 chars)
OCPP 2.0.1: idToken = {idToken: "UID", type: "ISO14443"}

Flow:
1. Charger reads RFID UID
2. CS → CSMS: Authorize {idTag/idToken}
3. CSMS checks id_tokens table → match by uid
4. If found and active → Accepted
5. If not found → check OCPI partner tokens (ocpi_tokens table)
6. If still not found → real-time OCPI authorize call to eMSP
7. Return Accepted/Invalid/Blocked/Expired
```

### 6.2 EMAID (e-Mobility Account Identifier)

Used in ISO 15118 / OCPI roaming. Format: `CC-PPP-CCCCCCC-D` (country-provider-id-check).

```
OCPP 2.0.1: idToken = {idToken: "DE-ABC-C12345678-X", type: "eMAID"}

Flow:
1. EV communicates eMAID during ISO 15118 handshake
2. CS → CSMS: Authorize {idToken with type "eMAID"}
3. CSMS extracts provider ID from eMAID (e.g., "DE-ABC")
4. Looks up OCPI partner by provider ID
5. Sends real-time authorization to that eMSP
6. Caches result for future use
```

### 6.3 Credit Card (Direct Payment)

No pre-existing account needed. Driver pays at the charger via card terminal.

```
Flow:
1. Driver inserts/taps credit card on charger's payment terminal
2. Charger sends payment pre-authorization to payment processor (NOT via OCPP)
3. On successful pre-auth, charger sends:
   OCPP 1.6:  StartTransaction with idTag = payment reference
   OCPP 2.0.1: TransactionEvent with idToken type "Central" or custom
4. CSMS creates session tagged as "direct_payment"
5. On session end, charger/CSMS settles final amount with payment processor
6. CDR generated with payment_method = "credit_card"
```

### 6.4 Plug & Charge (ISO 15118)

Zero-interaction charging. The EV authenticates automatically via TLS certificates.

```
Requires: OCPP 2.0.1 + ISO 15118-2 + V2G PKI infrastructure

Flow:
1. Driver plugs in cable (no tap, no app)
2. EV and charger establish TLS session via ISO 15118
3. EV presents contract certificate containing eMAID
4. Charger validates certificate chain (V2G Root CA → MO Sub-CA → Contract Cert)
5. CS → CSMS: Authorize {idToken: {idToken: "eMAID", type: "eMAID"},
               certificate: "PEM...", iso15118CertificateHashData: [...]}
6. CSMS validates certificate with PKI/OCSP
7. CSMS authorizes via eMAID lookup (same as 6.2)
8. TransactionEvent started automatically

Certificate Management (OCPP 2.0.1):
- InstallCertificate / DeleteCertificate — manage V2G root certificates
- Get15118EVCertificate — charger requests updated EV contract certificate
- SignCertificate — charger CSR for its own TLS certificate
```

### 6.5 Remote Start (from Mobile App)

Driver initiates charging from the app before or after plugging in.

```
Flow:
1. Driver opens app, selects charger/EVSE, taps "Start Charging"
2. App → Backend REST API: POST /api/sessions/start
   {evse_id, driver_id, auth_token}
3. Backend validates driver, checks balance/subscription
4. Backend → Charger via OCPP:
   OCPP 1.6:  RemoteStartTransaction {connectorId: 1, idTag: "APP-xyz123"}
   OCPP 2.0.1: RequestStartTransaction {evseId: 1, idToken: {idToken: "xyz123", type: "Central"},
                remoteStartId: 42}
5. Charger responds: Accepted/Rejected
6. If Accepted → charger initiates normal StartTransaction/TransactionEvent flow
7. CSMS links the transaction to the driver's account

Remote Stop:
   OCPP 1.6:  RemoteStopTransaction {transactionId: 12345}
   OCPP 2.0.1: RequestStopTransaction {transactionId: "uuid-xxx"}
```

### 6.6 Authorization Priority Logic

When a charger sends an Authorize request, the CSMS should check in this order:

```
1. Local Authorization Cache (on charger — checked before CSMS call)
2. Local Authorization List (synced to charger via SendLocalList)
3. CSMS id_tokens table (own CPO tokens — RFID, app tokens)
4. CSMS ocpi_tokens table (cached roaming partner tokens)
5. Real-time OCPI Authorize to partner eMSP (if token not cached)
6. Fallback: Reject if all checks fail

Response statuses:
- Accepted      — Token valid, proceed
- Blocked       — Token known but blocked (stolen card, suspended account)
- Expired       — Token validity period ended
- Invalid       — Token not recognized anywhere
- ConcurrentTx  — Token already in use in another active session
- NoCredit      — Insufficient balance (prepaid/wallet)
```

---

## 7. Session Management

### 7.1 Session State Machine

```
                  ┌───────────────────────────────────┐
                  │         Session States              │
                  ├───────────────────────────────────┤
                  │                                     │
  Authorize OK    │    ┌──────────┐                     │
  ───────────────►│    │ PENDING  │  Awaiting cable/start│
                  │    └────┬─────┘                     │
                  │         │ StartTransaction received  │
                  │         ▼                            │
                  │    ┌──────────┐                     │
                  │    │ ACTIVE   │  Energy flowing      │
                  │    └──┬───┬───┘                     │
                  │       │   │                          │
                  │  Suspend  Resume                     │
                  │       │   │                          │
                  │       ▼   │                          │
                  │    ┌──────────┐                     │
                  │    │SUSPENDED │  Paused (EV/EVSE)    │
                  │    └────┬─────┘                     │
                  │         │ StopTransaction            │
                  │         ▼                            │
                  │    ┌──────────┐                     │
                  │    │COMPLETED │  Final meter read     │
                  │    └────┬─────┘                     │
                  │         │ CDR generated              │
                  │         ▼                            │
                  │    ┌──────────┐                     │
                  │    │ BILLED   │  Payment processed    │
                  │    └──────────┘                     │
                  │                                     │
                  │    ┌──────────┐                     │
                  │    │ INVALID  │  Auth failed/timeout  │
                  │    └──────────┘                     │
                  └───────────────────────────────────┘
```

### 7.2 Session Record Structure

```
charging_session {
  id:                  UUID (primary key)
  ocpp_transaction_id: string (from charger — int for 1.6, UUID for 2.0.1)
  connector_id:        FK → connectors
  evse_id:             FK → evses
  charging_station_id: FK → charging_stations
  id_token_id:         FK → id_tokens
  driver_id:           FK → drivers (nullable — guest/roaming)
  ocpi_session_id:     string (for OCPI sync)

  status:              enum (PENDING, ACTIVE, SUSPENDED, COMPLETED, BILLED, INVALID)
  auth_method:         enum (RFID, EMAID, CREDIT_CARD, APP_REMOTE, PLUG_AND_CHARGE)
  start_reason:        enum (AUTHORIZED, REMOTE_START, PLUG_AND_CHARGE)

  started_at:          timestamp
  stopped_at:          timestamp
  meter_start:         integer (Wh)
  meter_stop:          integer (Wh)
  energy_delivered_wh: integer (computed: meter_stop - meter_start)
  stop_reason:         string (EVDisconnected, RemoteStop, PowerLoss, etc.)

  total_cost:          decimal
  currency:            string (ISO 4217)
  tariff_id:           FK → tariffs
  payment_method:      enum (WALLET, SUBSCRIPTION, CREDIT_CARD, ROAMING)

  created_at:          timestamp
  updated_at:          timestamp
}
```

### 7.3 Handling Edge Cases

**Offline charging**: If the CSMS is unreachable during authorization, the charger may use its local auth list/cache to start charging. When connectivity resumes, the charger sends the queued `StartTransaction` and `MeterValues`. The CSMS must handle out-of-order messages gracefully.

**Orphaned sessions**: If a charger reboots mid-session, it sends a `BootNotification` followed by `StatusNotification`. If a previous session was active, the CSMS should check for orphaned sessions and close them using the last known meter value.

**Concurrent transactions**: OCPP 1.6 allows only one transaction per connector. OCPP 2.0.1 allows configuring this per EVSE. The CSMS must enforce this constraint.

**Clock drift**: Charger timestamps may drift. The CSMS should use `BootNotification.conf.currentTime` to sync the charger clock and handle meter value timestamps that are slightly out of order.

---

## 8. Meter Values & Billing

### 8.1 Meter Value Structure

```
meter_value {
  id:                  UUID
  session_id:          FK → charging_sessions
  timestamp:           timestamp (from charger)
  received_at:         timestamp (server time)

  // Standard measurands (OCPP SampledValue):
  energy_wh:           integer   — Energy.Active.Import.Register (cumulative Wh)
  power_w:             integer   — Power.Active.Import (instantaneous W)
  voltage_v:           decimal   — Voltage (V)
  current_a:           decimal   — Current.Import (A)
  soc_percent:         integer   — SoC (0-100, if EV reports it)
  temperature_c:       decimal   — Temperature (charger internal)
  frequency_hz:        decimal   — Frequency

  phase:               string    — L1, L2, L3, L1-N, L2-N, L3-N, null
  context:             string    — Sample.Periodic, Sample.Clock, Transaction.Begin, Transaction.End
  format:              string    — Raw, SignedData
  location:            string    — Body, Cable, EV, Inlet, Outlet
}
```

### 8.2 CDR Generation

When a session completes:

```
1. Collect all meter_values for the session
2. Calculate total energy: meter_stop - meter_start (Wh)
3. Calculate duration: stopped_at - started_at
4. Apply tariff:
   - Per kWh component × energy
   - Per minute component × duration (or per parking-minute if not charging)
   - Flat session fee
   - Time-of-use multipliers
5. Generate CDR record
6. If roaming session → push CDR to eMSP via OCPI
7. If direct payment → settle with payment processor
8. If wallet → deduct from driver balance
```

### 8.3 CDR Record

```
cdr {
  id:                  UUID
  session_id:          FK → charging_sessions
  ocpi_cdr_id:         string (for OCPI sync)

  start_date_time:     timestamp
  end_date_time:       timestamp
  auth_id:             string (token UID)
  auth_method:         enum
  location:            jsonb (snapshot of location at time of charging)
  evse_uid:            string
  connector_id:        string
  meter_id:            string

  currency:            string (ISO 4217)
  total_cost:          decimal
  total_energy:        decimal (kWh)
  total_time:          decimal (hours)
  total_parking_time:  decimal (hours — time not charging but connected)

  charging_periods:    jsonb[] — array of {start_date_time, dimensions: [{type, volume}]}
  tariff_id:           string
  remark:              string

  created_at:          timestamp
}
```

---

## 9. Smart Charging

### 9.1 OCPP 1.6 Smart Charging

Uses `ChargingProfile` with three profile purposes:
- `ChargePointMaxProfile` — Overall station limit
- `TxDefaultProfile` — Default for new transactions
- `TxProfile` — Specific transaction profile

```
CSMS → CS: SetChargingProfile {
  connectorId: 1,
  csChargingProfiles: {
    chargingProfileId: 1,
    stackLevel: 0,
    chargingProfilePurpose: "TxProfile",
    chargingProfileKind: "Absolute",
    chargingSchedule: {
      chargingRateUnit: "W",
      chargingSchedulePeriod: [
        {startPeriod: 0, limit: 22000},      // 0-30min: full power
        {startPeriod: 1800, limit: 11000},    // 30-60min: half power
        {startPeriod: 3600, limit: 7400}      // 60min+: reduced
      ]
    }
  }
}
```

### 9.2 OCPP 2.0.1 Smart Charging

Enhanced with EV communication:
- EV can report requested energy and departure time
- Supports `NotifyEVChargingNeeds` and `NotifyEVChargingSchedule`
- Enables accurate departure-time-based scheduling

---

## 10. Security

### 10.1 OCPP Security Profiles

**Profile 0**: No security (development only)
**Profile 1**: Basic Authentication — charger sends username/password in WebSocket URL
**Profile 2**: TLS with server certificate — encrypted connection, charger verifies CSMS cert
**Profile 3**: TLS with mutual authentication — both charger and CSMS present certificates

### 10.2 Best Practices

- Always use WSS (WebSocket Secure) in production
- Implement rate limiting on WebSocket connections
- Log all OCPP messages for audit trail (ocpp_messages_log table)
- Use signed meter values (OCPP 2.0.1 `SignedData` format) for billing disputes
- Implement charger identity verification on WebSocket connect
- Rotate security certificates regularly
- Use separate API keys per OCPI partner
- Validate all incoming OCPP message payloads against JSON schema

### 10.3 OCPI Security

- All OCPI endpoints require `Authorization: Token <TOKEN>` header
- Tokens are exchanged during credential registration
- Use HTTPS only
- Implement IP whitelisting for known partners
- Rate limit per partner
