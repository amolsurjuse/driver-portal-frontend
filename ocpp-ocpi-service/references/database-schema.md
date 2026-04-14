# Database Schema Reference — OCPP/OCPI CSMS

Full PostgreSQL schema for the Charging Station Management System.

## Table of Contents

1. [Organization & Infrastructure](#1-organization--infrastructure)
2. [Charging Stations & EVSE](#2-charging-stations--evse)
3. [Drivers & Tokens](#3-drivers--tokens)
4. [Sessions & Transactions](#4-sessions--transactions)
5. [Meter Values (Time-Series)](#5-meter-values)
6. [Billing & CDRs](#6-billing--cdrs)
7. [OCPI Roaming](#7-ocpi-roaming)
8. [Audit & Logging](#8-audit--logging)
9. [Smart Charging](#9-smart-charging)
10. [Indexes & Performance](#10-indexes--performance)

---

## 1. Organization & Infrastructure

```sql
CREATE TYPE org_role AS ENUM ('CPO', 'EMSP', 'HUB', 'NSP', 'SCSP');

CREATE TABLE organizations (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name            VARCHAR(255) NOT NULL,
    country_code    CHAR(2) NOT NULL,          -- ISO 3166-1 alpha-2
    party_id        VARCHAR(3) NOT NULL,        -- OCPI party_id
    role            org_role NOT NULL,
    website         VARCHAR(500),
    logo_url        VARCHAR(500),
    is_active       BOOLEAN DEFAULT true,
    created_at      TIMESTAMPTZ DEFAULT now(),
    updated_at      TIMESTAMPTZ DEFAULT now(),
    UNIQUE(country_code, party_id)
);

CREATE TABLE locations (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id),
    ocpi_id         VARCHAR(36) NOT NULL,       -- OCPI location_id
    name            VARCHAR(255) NOT NULL,
    address         VARCHAR(500) NOT NULL,
    city            VARCHAR(100) NOT NULL,
    postal_code     VARCHAR(20),
    state           VARCHAR(100),
    country         CHAR(2) NOT NULL,
    latitude        DECIMAL(10, 7) NOT NULL,
    longitude       DECIMAL(10, 7) NOT NULL,
    time_zone       VARCHAR(50) NOT NULL,       -- IANA timezone
    parking_type    VARCHAR(50),                -- ON_STREET, PARKING_GARAGE, etc.
    facilities      JSONB DEFAULT '[]',         -- ["WIFI", "MALL", "CAFE"]
    opening_times   JSONB,                      -- Regular hours + exceptions
    energy_mix      JSONB,                      -- Energy source breakdown
    is_active       BOOLEAN DEFAULT true,
    last_updated    TIMESTAMPTZ DEFAULT now(),
    created_at      TIMESTAMPTZ DEFAULT now(),
    UNIQUE(organization_id, ocpi_id)
);
```

---

## 2. Charging Stations & EVSE

```sql
CREATE TYPE connector_standard AS ENUM (
    'CHADEMO', 'IEC_62196_T1',       -- Type 1 (J1772)
    'IEC_62196_T1_COMBO',            -- CCS1
    'IEC_62196_T2',                  -- Type 2 (Mennekes)
    'IEC_62196_T2_COMBO',            -- CCS2
    'TESLA_S', 'TESLA_R',           -- Tesla (legacy/new)
    'GBT_AC', 'GBT_DC',             -- Chinese GB/T
    'DOMESTIC_A', 'DOMESTIC_B',      -- Standard outlets
    'NACS'                           -- North American Charging Standard
);

CREATE TYPE connector_format AS ENUM ('SOCKET', 'CABLE');
CREATE TYPE power_type AS ENUM ('AC_1_PHASE', 'AC_3_PHASE', 'DC');
CREATE TYPE connector_status AS ENUM (
    'AVAILABLE', 'PREPARING', 'CHARGING', 'SUSPENDED_EV',
    'SUSPENDED_EVSE', 'FINISHING', 'RESERVED', 'UNAVAILABLE', 'FAULTED'
);

CREATE TABLE charging_stations (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    location_id         UUID NOT NULL REFERENCES locations(id),
    charge_point_id     VARCHAR(255) NOT NULL UNIQUE,  -- OCPP identity (used in WS URL)
    ocpp_protocol       VARCHAR(20) NOT NULL DEFAULT 'ocpp1.6',  -- ocpp1.6 | ocpp2.0.1
    vendor              VARCHAR(100),
    model               VARCHAR(100),
    serial_number       VARCHAR(100),
    firmware_version    VARCHAR(50),
    iccid               VARCHAR(30),            -- SIM card
    imsi                VARCHAR(30),
    security_profile    SMALLINT DEFAULT 0,      -- 0, 1, 2, or 3
    is_online           BOOLEAN DEFAULT false,
    last_heartbeat      TIMESTAMPTZ,
    last_boot           TIMESTAMPTZ,
    configuration       JSONB DEFAULT '{}',      -- Cached OCPP configuration keys
    is_active           BOOLEAN DEFAULT true,
    created_at          TIMESTAMPTZ DEFAULT now(),
    updated_at          TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE evses (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    charging_station_id UUID NOT NULL REFERENCES charging_stations(id),
    evse_id             INTEGER NOT NULL,         -- OCPP 2.0.1 evse.id (physical unit number)
    ocpi_uid            VARCHAR(36) NOT NULL,      -- OCPI evse_uid
    status              connector_status DEFAULT 'UNAVAILABLE',
    capabilities        JSONB DEFAULT '[]',        -- ["CHARGING_PROFILE_CAPABLE", "RFID_READER"]
    floor_level         VARCHAR(10),
    physical_reference  VARCHAR(50),               -- "Bay 3A"
    max_power_kw        DECIMAL(8, 2),
    is_active           BOOLEAN DEFAULT true,
    last_updated        TIMESTAMPTZ DEFAULT now(),
    created_at          TIMESTAMPTZ DEFAULT now(),
    UNIQUE(charging_station_id, evse_id)
);

CREATE TABLE connectors (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    evse_id             UUID NOT NULL REFERENCES evses(id),
    connector_id        INTEGER NOT NULL,          -- Physical connector number (1-based)
    ocpi_id             VARCHAR(36) NOT NULL,
    standard            connector_standard NOT NULL,
    format              connector_format NOT NULL,
    power_type          power_type NOT NULL,
    max_voltage         INTEGER,                   -- Volts
    max_amperage        INTEGER,                   -- Amps
    max_electric_power  INTEGER,                   -- Watts
    status              connector_status DEFAULT 'UNAVAILABLE',
    last_updated        TIMESTAMPTZ DEFAULT now(),
    created_at          TIMESTAMPTZ DEFAULT now(),
    UNIQUE(evse_id, connector_id)
);

-- Track status changes for analytics and debugging
CREATE TABLE connector_status_history (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    connector_id    UUID NOT NULL REFERENCES connectors(id),
    status          connector_status NOT NULL,
    error_code      VARCHAR(50),                -- OCPP error code if faulted
    info            VARCHAR(500),
    vendor_id       VARCHAR(255),
    vendor_error    VARCHAR(50),
    timestamp       TIMESTAMPTZ NOT NULL,        -- Charger-reported time
    received_at     TIMESTAMPTZ DEFAULT now()    -- Server receive time
);
```

---

## 3. Drivers & Tokens

```sql
CREATE TYPE token_type AS ENUM (
    'RFID',             -- Physical RFID card (ISO 14443 / ISO 15693)
    'EMAID',            -- e-Mobility Account Identifier
    'APP',              -- Mobile app token
    'CREDIT_CARD',      -- Credit card reference
    'KEY_CODE',         -- PIN or key code
    'PLUG_AND_CHARGE',  -- ISO 15118 contract certificate
    'QR_CODE',          -- QR code scan
    'AUTOCHARGE',       -- MAC address based
    'OTHER'
);

CREATE TYPE token_status AS ENUM ('ACTIVE', 'BLOCKED', 'EXPIRED', 'LOST', 'REVOKED');

CREATE TABLE drivers (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID REFERENCES organizations(id),  -- eMSP owner
    email           VARCHAR(255),
    phone           VARCHAR(50),
    first_name      VARCHAR(100),
    last_name       VARCHAR(100),
    language        CHAR(2) DEFAULT 'en',
    wallet_balance  DECIMAL(12, 2) DEFAULT 0.00,
    currency        CHAR(3) DEFAULT 'USD',
    subscription_id UUID,                               -- FK to subscriptions if applicable
    is_active       BOOLEAN DEFAULT true,
    created_at      TIMESTAMPTZ DEFAULT now(),
    updated_at      TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE id_tokens (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    driver_id       UUID REFERENCES drivers(id),         -- nullable for guest/roaming
    organization_id UUID NOT NULL REFERENCES organizations(id),
    uid             VARCHAR(64) NOT NULL,                 -- Token identifier (RFID UID, eMAID, etc.)
    token_type      token_type NOT NULL,
    status          token_status DEFAULT 'ACTIVE',
    visual_number   VARCHAR(64),                          -- Printed number on card
    issuer          VARCHAR(100),                          -- Issuing organization
    group_id        VARCHAR(36),                           -- OCPP groupIdToken for family/fleet
    contract_id     VARCHAR(64),                           -- eMAID contract ID
    valid_from      TIMESTAMPTZ,
    valid_until     TIMESTAMPTZ,
    cache_expiry    TIMESTAMPTZ,                           -- OCPP cache expiry
    last_used       TIMESTAMPTZ,
    whitelist_type  VARCHAR(20) DEFAULT 'ALLOWED',         -- ALLOWED, BLOCKED, ALWAYS, NEVER
    max_concurrent  INTEGER DEFAULT 1,                     -- Max simultaneous sessions
    created_at      TIMESTAMPTZ DEFAULT now(),
    updated_at      TIMESTAMPTZ DEFAULT now(),
    UNIQUE(organization_id, uid, token_type)
);

CREATE TABLE vehicles (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    driver_id       UUID NOT NULL REFERENCES drivers(id),
    make            VARCHAR(100),
    model           VARCHAR(100),
    year            INTEGER,
    vin             VARCHAR(17),
    battery_kwh     DECIMAL(6, 2),                        -- Battery capacity
    max_ac_kw       DECIMAL(6, 2),                        -- Max AC charging rate
    max_dc_kw       DECIMAL(6, 2),                        -- Max DC charging rate
    connector_types JSONB DEFAULT '[]',                    -- Supported connector types
    iso15118_capable BOOLEAN DEFAULT false,
    created_at      TIMESTAMPTZ DEFAULT now()
);
```

---

## 4. Sessions & Transactions

```sql
CREATE TYPE session_status AS ENUM (
    'PENDING',      -- Authorized but not yet started
    'ACTIVE',       -- Energy is flowing (or was flowing)
    'SUSPENDED',    -- Paused by EV or EVSE
    'COMPLETED',    -- Transaction ended, pending billing
    'BILLED',       -- Payment processed
    'INVALID'       -- Authorization failed or session rejected
);

CREATE TYPE auth_method AS ENUM (
    'RFID', 'EMAID', 'CREDIT_CARD', 'APP_REMOTE',
    'PLUG_AND_CHARGE', 'QR_CODE', 'AUTOCHARGE', 'WHITELIST'
);

CREATE TYPE start_reason AS ENUM (
    'AUTHORIZED',       -- Normal RFID/token auth at charger
    'REMOTE_START',     -- App-initiated RemoteStartTransaction
    'PLUG_AND_CHARGE',  -- ISO 15118 automatic
    'CREDIT_CARD',      -- Direct payment at terminal
    'FREE_CHARGING'     -- No auth required (free charger)
);

CREATE TABLE charging_sessions (
    id                      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    -- OCPP identifiers
    ocpp_transaction_id     VARCHAR(64),            -- int (1.6) or UUID (2.0.1)
    ocpp_protocol_version   VARCHAR(20),
    -- Infrastructure references
    charging_station_id     UUID NOT NULL REFERENCES charging_stations(id),
    evse_id                 UUID NOT NULL REFERENCES evses(id),
    connector_id            UUID NOT NULL REFERENCES connectors(id),
    -- User references
    id_token_id             UUID REFERENCES id_tokens(id),
    driver_id               UUID REFERENCES drivers(id),
    vehicle_id              UUID REFERENCES vehicles(id),
    -- OCPI references
    ocpi_session_id         VARCHAR(36),
    ocpi_authorization_ref  VARCHAR(36),
    -- Session state
    status                  session_status DEFAULT 'PENDING',
    auth_method             auth_method NOT NULL,
    start_reason            start_reason NOT NULL,
    -- Timestamps
    authorized_at           TIMESTAMPTZ,
    started_at              TIMESTAMPTZ,
    last_updated            TIMESTAMPTZ DEFAULT now(),
    stopped_at              TIMESTAMPTZ,
    -- Meter data
    meter_start             BIGINT,                  -- Wh at start
    meter_stop              BIGINT,                  -- Wh at stop
    energy_delivered_wh     BIGINT DEFAULT 0,        -- Running total
    max_power_w             INTEGER DEFAULT 0,       -- Peak power during session
    -- Stop info
    stop_reason             VARCHAR(50),             -- EVDisconnected, RemoteStop, PowerLoss, etc.
    stop_id_token_id        UUID REFERENCES id_tokens(id),  -- Different token used to stop
    -- Billing
    tariff_id               UUID,
    currency                CHAR(3),
    total_cost              DECIMAL(12, 4),
    total_energy_cost       DECIMAL(12, 4),
    total_time_cost         DECIMAL(12, 4),
    total_parking_cost      DECIMAL(12, 4),
    total_fixed_cost        DECIMAL(12, 4),
    payment_method          VARCHAR(30),
    payment_reference       VARCHAR(255),
    -- Metadata
    signed_meter_data       TEXT,                     -- Eichrecht signed data
    metadata                JSONB DEFAULT '{}',
    created_at              TIMESTAMPTZ DEFAULT now(),
    updated_at              TIMESTAMPTZ DEFAULT now()
);

-- OCPP 2.0.1 TransactionEvent log (preserves every event from charger)
CREATE TABLE transaction_events (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id          UUID NOT NULL REFERENCES charging_sessions(id),
    event_type          VARCHAR(20) NOT NULL,      -- Started, Updated, Ended
    trigger_reason      VARCHAR(50) NOT NULL,      -- Authorized, CablePluggedIn, ChargingStateChanged,
                                                    -- MeterValuePeriodic, RemoteStart, RemoteStop, etc.
    sequence_no         INTEGER NOT NULL,
    timestamp           TIMESTAMPTZ NOT NULL,
    charging_state      VARCHAR(30),               -- Charging, EVConnected, SuspendedEV, etc.
    offline             BOOLEAN DEFAULT false,
    number_of_phases    SMALLINT,
    cable_max_current   DECIMAL(6, 2),
    evse_id             INTEGER,
    connector_id        INTEGER,
    raw_payload         JSONB NOT NULL,             -- Full OCPP message preserved
    received_at         TIMESTAMPTZ DEFAULT now()
);
```

---

## 5. Meter Values

```sql
-- Consider using TimescaleDB hypertable for this if volume is high
CREATE TABLE meter_values (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id      UUID NOT NULL REFERENCES charging_sessions(id),
    timestamp       TIMESTAMPTZ NOT NULL,       -- Charger-reported time
    received_at     TIMESTAMPTZ DEFAULT now(),

    -- Core measurands (denormalized for query performance)
    energy_wh       BIGINT,                     -- Energy.Active.Import.Register (cumulative)
    power_w         INTEGER,                    -- Power.Active.Import (instantaneous)
    power_offered_w INTEGER,                    -- Power.Offered (max available)
    voltage_v       DECIMAL(7, 2),              -- Voltage (V)
    current_a       DECIMAL(7, 2),              -- Current.Import (A)
    soc_percent     SMALLINT,                   -- State of Charge (0-100)
    temperature_c   DECIMAL(5, 1),              -- Temperature

    -- Phase details (for 3-phase AC)
    voltage_l1      DECIMAL(7, 2),
    voltage_l2      DECIMAL(7, 2),
    voltage_l3      DECIMAL(7, 2),
    current_l1      DECIMAL(7, 2),
    current_l2      DECIMAL(7, 2),
    current_l3      DECIMAL(7, 2),
    power_l1        INTEGER,
    power_l2        INTEGER,
    power_l3        INTEGER,

    -- Metadata
    context         VARCHAR(30),                -- Sample.Periodic, Transaction.Begin, etc.
    signed_data     TEXT,                        -- Signed meter value (Eichrecht)
    raw_payload     JSONB                        -- Full OCPP SampledValue array
);

-- TimescaleDB: convert to hypertable for time-series performance
-- SELECT create_hypertable('meter_values', 'timestamp');
```

---

## 6. Billing & CDRs

```sql
CREATE TABLE tariffs (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id),
    ocpi_id         VARCHAR(36) NOT NULL,
    currency        CHAR(3) NOT NULL,
    name            VARCHAR(255),
    -- Tariff components (simplified — full OCPI tariff is in tariff_elements JSONB)
    energy_rate     DECIMAL(8, 4),              -- per kWh
    time_rate       DECIMAL(8, 4),              -- per minute (while charging)
    parking_rate    DECIMAL(8, 4),              -- per minute (connected but not charging)
    flat_rate       DECIMAL(8, 4),              -- per session
    min_price       DECIMAL(8, 2),              -- Minimum billing amount
    max_price       DECIMAL(8, 2),              -- Maximum billing amount
    -- Full OCPI tariff structure
    tariff_elements JSONB NOT NULL DEFAULT '[]',  -- [{price_components, restrictions}]
    tariff_type     VARCHAR(30),                  -- AD_HOC_PAYMENT, PROFILE_CHEAP, etc.
    tariff_alt_text JSONB DEFAULT '[]',
    tariff_alt_url  VARCHAR(500),
    is_active       BOOLEAN DEFAULT true,
    valid_from      TIMESTAMPTZ,
    valid_until     TIMESTAMPTZ,
    last_updated    TIMESTAMPTZ DEFAULT now(),
    created_at      TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE cdrs (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id          UUID NOT NULL REFERENCES charging_sessions(id) UNIQUE,
    ocpi_cdr_id         VARCHAR(36) NOT NULL UNIQUE,
    -- Party info
    country_code        CHAR(2) NOT NULL,
    party_id            VARCHAR(3) NOT NULL,
    -- Session summary
    start_date_time     TIMESTAMPTZ NOT NULL,
    end_date_time       TIMESTAMPTZ NOT NULL,
    auth_id             VARCHAR(64) NOT NULL,
    auth_method         auth_method NOT NULL,
    -- Location snapshot (frozen at time of session for billing accuracy)
    cdr_location        JSONB NOT NULL,
    meter_id            VARCHAR(255),
    -- Totals
    currency            CHAR(3) NOT NULL,
    total_cost          DECIMAL(12, 4) NOT NULL,
    total_energy        DECIMAL(12, 4) NOT NULL,   -- kWh
    total_time          DECIMAL(12, 4) NOT NULL,   -- hours
    total_parking_time  DECIMAL(12, 4) DEFAULT 0,  -- hours
    total_fixed_cost    DECIMAL(12, 4) DEFAULT 0,
    -- Breakdown
    charging_periods    JSONB NOT NULL DEFAULT '[]',  -- OCPI ChargingPeriod[]
    tariff_id           VARCHAR(36),
    -- Signed data for German Eichrecht / calibration law
    signed_data         JSONB,
    -- Credit CDR reference (for corrections)
    credit              BOOLEAN DEFAULT false,
    credit_reference_id VARCHAR(36),
    remark              TEXT,
    -- Sync state
    synced_to_emsp      BOOLEAN DEFAULT false,
    sync_attempts       INTEGER DEFAULT 0,
    last_sync_error     TEXT,
    -- Timestamps
    created_at          TIMESTAMPTZ DEFAULT now(),
    updated_at          TIMESTAMPTZ DEFAULT now()
);
```

---

## 7. OCPI Roaming

```sql
CREATE TABLE ocpi_credentials (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID REFERENCES organizations(id),
    party_name      VARCHAR(255) NOT NULL,
    country_code    CHAR(2) NOT NULL,
    party_id        VARCHAR(3) NOT NULL,
    role            org_role NOT NULL,
    -- Authentication
    token_a         VARCHAR(255),                   -- Token we use to call them
    token_b         VARCHAR(255),                   -- Token they use to call us
    token_c         VARCHAR(255),                   -- Registration token
    -- Endpoints
    base_url        VARCHAR(500) NOT NULL,
    version         VARCHAR(10) DEFAULT '2.2.1',
    endpoints       JSONB DEFAULT '{}',              -- {locations: "/url", sessions: "/url", ...}
    -- Status
    is_active       BOOLEAN DEFAULT true,
    last_synced     TIMESTAMPTZ,
    created_at      TIMESTAMPTZ DEFAULT now(),
    updated_at      TIMESTAMPTZ DEFAULT now(),
    UNIQUE(country_code, party_id, role)
);

CREATE TABLE ocpi_tokens (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    credential_id   UUID NOT NULL REFERENCES ocpi_credentials(id),
    -- Token fields (OCPI Token object)
    country_code    CHAR(2) NOT NULL,
    party_id        VARCHAR(3) NOT NULL,
    uid             VARCHAR(36) NOT NULL,
    token_type      VARCHAR(20) NOT NULL,            -- RFID, OTHER, AD_HOC_USER
    contract_id     VARCHAR(36) NOT NULL,             -- eMAID
    visual_number   VARCHAR(64),
    issuer          VARCHAR(64) NOT NULL,
    group_id        VARCHAR(36),
    is_valid        BOOLEAN DEFAULT true,
    whitelist       VARCHAR(20) DEFAULT 'ALLOWED',    -- ALWAYS, ALLOWED, ALLOWED_OFFLINE, NEVER
    language        CHAR(2),
    default_profile VARCHAR(20),                      -- Default tariff profile
    energy_contract JSONB,
    last_updated    TIMESTAMPTZ NOT NULL,
    created_at      TIMESTAMPTZ DEFAULT now(),
    UNIQUE(country_code, party_id, uid)
);

-- OCPI session sync queue (for pushing updates to eMSPs)
CREATE TABLE ocpi_session_sync_queue (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id      UUID NOT NULL REFERENCES charging_sessions(id),
    credential_id   UUID NOT NULL REFERENCES ocpi_credentials(id),
    operation       VARCHAR(10) NOT NULL,             -- PUT, PATCH
    payload         JSONB NOT NULL,
    attempts        INTEGER DEFAULT 0,
    max_attempts    INTEGER DEFAULT 5,
    next_attempt    TIMESTAMPTZ DEFAULT now(),
    last_error      TEXT,
    completed       BOOLEAN DEFAULT false,
    created_at      TIMESTAMPTZ DEFAULT now()
);
```

---

## 8. Audit & Logging

```sql
CREATE TABLE ocpp_messages_log (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    charge_point_id VARCHAR(255) NOT NULL,
    direction       VARCHAR(10) NOT NULL,       -- INBOUND, OUTBOUND
    message_type    SMALLINT NOT NULL,          -- 2=Call, 3=CallResult, 4=CallError
    message_id      VARCHAR(64) NOT NULL,
    action          VARCHAR(50),                -- Authorize, StartTransaction, etc.
    payload         JSONB,
    error_code      VARCHAR(50),
    error_desc      TEXT,
    timestamp       TIMESTAMPTZ DEFAULT now()
);

-- Partition by month for performance
-- CREATE TABLE ocpp_messages_log_2026_01 PARTITION OF ocpp_messages_log
--   FOR VALUES FROM ('2026-01-01') TO ('2026-02-01');

CREATE TABLE authorization_log (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    charge_point_id VARCHAR(255) NOT NULL,
    id_token_uid    VARCHAR(64) NOT NULL,
    token_type      VARCHAR(20),
    result          VARCHAR(20) NOT NULL,       -- Accepted, Blocked, Invalid, etc.
    source          VARCHAR(30) NOT NULL,       -- LOCAL_LIST, CACHE, CSMS, OCPI_REALTIME
    ocpi_partner    VARCHAR(20),                -- country_code-party_id if OCPI
    response_ms     INTEGER,                    -- Authorization response time
    timestamp       TIMESTAMPTZ DEFAULT now()
);
```

---

## 9. Smart Charging

```sql
CREATE TABLE charging_profiles (
    id                      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    charging_station_id     UUID NOT NULL REFERENCES charging_stations(id),
    evse_id                 UUID REFERENCES evses(id),       -- null = station-wide
    session_id              UUID REFERENCES charging_sessions(id),
    -- OCPP ChargingProfile fields
    ocpp_profile_id         INTEGER NOT NULL,
    stack_level             SMALLINT NOT NULL DEFAULT 0,
    profile_purpose         VARCHAR(30) NOT NULL,             -- ChargePointMaxProfile, TxDefaultProfile, TxProfile
    profile_kind            VARCHAR(20) NOT NULL,             -- Absolute, Recurring, Relative
    recurrency_kind         VARCHAR(10),                      -- Daily, Weekly
    valid_from              TIMESTAMPTZ,
    valid_to                TIMESTAMPTZ,
    -- Schedule
    schedule                JSONB NOT NULL,                    -- {chargingRateUnit, chargingSchedulePeriod[]}
    -- Source tracking
    source                  VARCHAR(20) NOT NULL,              -- CSMS, OCPI, DRIVER, GRID_OPERATOR
    is_active               BOOLEAN DEFAULT true,
    created_at              TIMESTAMPTZ DEFAULT now(),
    updated_at              TIMESTAMPTZ DEFAULT now()
);
```

---

## 10. Indexes & Performance

```sql
-- Charging sessions — most queried table
CREATE INDEX idx_sessions_status ON charging_sessions(status) WHERE status IN ('ACTIVE', 'PENDING', 'SUSPENDED');
CREATE INDEX idx_sessions_station ON charging_sessions(charging_station_id, status);
CREATE INDEX idx_sessions_driver ON charging_sessions(driver_id) WHERE driver_id IS NOT NULL;
CREATE INDEX idx_sessions_token ON charging_sessions(id_token_id);
CREATE INDEX idx_sessions_started ON charging_sessions(started_at DESC);
CREATE INDEX idx_sessions_ocpp_txn ON charging_sessions(ocpp_transaction_id);
CREATE INDEX idx_sessions_ocpi ON charging_sessions(ocpi_session_id) WHERE ocpi_session_id IS NOT NULL;

-- Meter values — high volume, time-series queries
CREATE INDEX idx_meter_session_time ON meter_values(session_id, timestamp DESC);
CREATE INDEX idx_meter_energy ON meter_values(session_id, energy_wh) WHERE energy_wh IS NOT NULL;

-- Tokens — authorization lookup must be fast
CREATE INDEX idx_tokens_uid ON id_tokens(uid, token_type);
CREATE INDEX idx_tokens_status ON id_tokens(uid) WHERE status = 'ACTIVE';
CREATE INDEX idx_ocpi_tokens_uid ON ocpi_tokens(uid, country_code, party_id);

-- Connector status
CREATE INDEX idx_connector_status ON connectors(status);
CREATE INDEX idx_status_history ON connector_status_history(connector_id, timestamp DESC);

-- OCPP message log — use partitioning and partial indexes
CREATE INDEX idx_ocpp_log_cp ON ocpp_messages_log(charge_point_id, timestamp DESC);
CREATE INDEX idx_ocpp_log_action ON ocpp_messages_log(action, timestamp DESC);

-- CDRs
CREATE INDEX idx_cdrs_session ON cdrs(session_id);
CREATE INDEX idx_cdrs_sync ON cdrs(synced_to_emsp) WHERE synced_to_emsp = false;

-- OCPI sync queue
CREATE INDEX idx_sync_queue_pending ON ocpi_session_sync_queue(next_attempt)
    WHERE completed = false;

-- Charging stations
CREATE INDEX idx_stations_online ON charging_stations(is_online) WHERE is_online = true;
CREATE INDEX idx_stations_cp_id ON charging_stations(charge_point_id);
```

### Partitioning Recommendations

```sql
-- Meter values: partition by month (high volume)
-- OCPP messages log: partition by month (audit trail, high volume)
-- Authorization log: partition by month
-- Connector status history: partition by month

-- Example:
CREATE TABLE meter_values (
    -- ... columns ...
) PARTITION BY RANGE (timestamp);

CREATE TABLE meter_values_2026_01 PARTITION OF meter_values
    FOR VALUES FROM ('2026-01-01') TO ('2026-02-01');
```

### Estimated Table Sizes (per 1000 chargers)

| Table | Rows/Day | Rows/Month | Notes |
|-------|----------|------------|-------|
| meter_values | ~1.4M | ~43M | 1 reading/min × 1000 chargers |
| ocpp_messages_log | ~500K | ~15M | ~500 msgs/day per charger |
| connector_status_history | ~50K | ~1.5M | ~50 status changes/day |
| charging_sessions | ~5K | ~150K | ~5 sessions/day per charger |
| cdrs | ~5K | ~150K | 1:1 with sessions |
| transaction_events | ~30K | ~900K | ~6 events per session |
