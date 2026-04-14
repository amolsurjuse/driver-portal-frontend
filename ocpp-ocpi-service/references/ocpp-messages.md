# OCPP Message Reference

Complete reference for all OCPP 1.6J and 2.0.1 messages, their direction, payloads, and handling logic.

## Table of Contents

1. [OCPP 1.6J Messages](#1-ocpp-16j-messages)
2. [OCPP 2.0.1 Messages](#2-ocpp-201-messages)
3. [Error Codes](#3-error-codes)
4. [Implementation Patterns](#4-implementation-patterns)

---

## 1. OCPP 1.6J Messages

### Charge Point → Central System (CS → CSMS)

| Message | Profile | Description | Key Fields |
|---------|---------|-------------|------------|
| **Authorize** | Core | Validate an idTag before/during charging | `idTag` |
| **BootNotification** | Core | Register and announce charger on connect | `chargePointVendor`, `chargePointModel`, `chargePointSerialNumber`, `firmwareVersion` |
| **DataTransfer** | Core | Vendor-specific data exchange | `vendorId`, `messageId`, `data` |
| **DiagnosticsStatusNotification** | FirmwareManagement | Report diagnostics upload status | `status` (Idle, Uploaded, UploadFailed) |
| **FirmwareStatusNotification** | FirmwareManagement | Report firmware update progress | `status` (Downloaded, DownloadFailed, Installing, Installed, InstallationFailed) |
| **Heartbeat** | Core | Keep-alive signal, get server time | (empty) → returns `currentTime` |
| **MeterValues** | Core | Report energy and power measurements | `connectorId`, `transactionId`, `meterValue[]` |
| **StartTransaction** | Core | Begin a charging transaction | `connectorId`, `idTag`, `meterStart`, `timestamp`, `reservationId` |
| **StatusNotification** | Core | Report connector status change | `connectorId`, `errorCode`, `status`, `timestamp`, `info`, `vendorId`, `vendorErrorCode` |
| **StopTransaction** | Core | End a charging transaction | `transactionId`, `idTag`, `meterStop`, `timestamp`, `reason`, `transactionData[]` |

### Central System → Charge Point (CSMS → CS)

| Message | Profile | Description | Key Fields |
|---------|---------|-------------|------------|
| **CancelReservation** | Reservation | Cancel a previously made reservation | `reservationId` |
| **ChangeAvailability** | Core | Change connector availability | `connectorId`, `type` (Inoperative, Operative) |
| **ChangeConfiguration** | Core | Set a configuration key | `key`, `value` |
| **ClearCache** | Core | Clear authorization cache | (empty) |
| **ClearChargingProfile** | SmartCharging | Remove charging profiles | `id`, `connectorId`, `chargingProfilePurpose`, `stackLevel` |
| **DataTransfer** | Core | Vendor-specific data exchange | `vendorId`, `messageId`, `data` |
| **GetCompositeSchedule** | SmartCharging | Get merged charging schedule | `connectorId`, `duration`, `chargingRateUnit` |
| **GetConfiguration** | Core | Read configuration keys | `key[]` |
| **GetDiagnostics** | FirmwareManagement | Request diagnostics upload | `location` (URI), `startTime`, `stopTime`, `retries` |
| **GetLocalListVersion** | LocalAuthListManagement | Get local auth list version | (empty) → returns `listVersion` |
| **RemoteStartTransaction** | Core | Remotely start charging | `idTag`, `connectorId`, `chargingProfile` |
| **RemoteStopTransaction** | Core | Remotely stop charging | `transactionId` |
| **ReserveNow** | Reservation | Make a reservation | `connectorId`, `expiryDate`, `idTag`, `reservationId` |
| **Reset** | Core | Reboot charger | `type` (Hard, Soft) |
| **SendLocalList** | LocalAuthListManagement | Push auth list to charger | `listVersion`, `localAuthorizationList[]`, `updateType` (Differential, Full) |
| **SetChargingProfile** | SmartCharging | Set a charging power limit | `connectorId`, `csChargingProfiles` |
| **TriggerMessage** | RemoteTrigger | Request charger to send a specific message | `requestedMessage`, `connectorId` |
| **UnlockConnector** | Core | Unlock a connector | `connectorId` |
| **UpdateFirmware** | FirmwareManagement | Initiate firmware update | `location` (URI), `retrieveDate`, `retries`, `retryInterval` |

### MeterValues SampledValue Measurands

| Measurand | Unit | Description |
|-----------|------|-------------|
| Energy.Active.Import.Register | Wh | Cumulative energy imported |
| Energy.Active.Export.Register | Wh | Cumulative energy exported (V2G) |
| Energy.Reactive.Import.Register | varh | Reactive energy imported |
| Power.Active.Import | W | Instantaneous active power |
| Power.Active.Export | W | Instantaneous export power (V2G) |
| Power.Offered | W | Maximum power charger can offer |
| Power.Reactive.Import | var | Reactive power |
| Voltage | V | Voltage |
| Current.Import | A | Current flowing to EV |
| Current.Export | A | Current flowing from EV (V2G) |
| Current.Offered | A | Maximum current offered |
| SoC | Percent | State of Charge (0-100) |
| Temperature | Celsius | Charger temperature |
| Frequency | Hz | Grid frequency |
| RPM | - | Fan speed |

### StatusNotification Status Values

| Status | Description |
|--------|-------------|
| Available | Ready for new session |
| Preparing | EV connected, auth in progress |
| Charging | Active energy transfer |
| SuspendedEV | Paused by EV (SoC reached, etc.) |
| SuspendedEVSE | Paused by charger (load management) |
| Finishing | Session ending, cable still plugged |
| Reserved | Reserved for a specific driver |
| Unavailable | Out of service (maintenance, disabled) |
| Faulted | Hardware or software error |

### StopTransaction Reasons

| Reason | Description |
|--------|-------------|
| EmergencyStop | Emergency stop button pressed |
| EVDisconnected | EV disconnected cable |
| HardReset | Hard reset of charger |
| Local | Stopped locally at charger (button/RFID) |
| Other | Other reason |
| PowerLoss | Power outage |
| Reboot | Charger rebooting |
| Remote | Stopped remotely via CSMS |
| SoftReset | Soft reset of charger |
| UnlockCommand | Unlock command received |
| DeAuthorized | idTag deauthorized during session |

---

## 2. OCPP 2.0.1 Messages

### Organized by Functional Block

#### Provisioning
| Message | Direction | Description |
|---------|-----------|-------------|
| BootNotification | CS → CSMS | Register charger, get interval |
| Heartbeat | CS → CSMS | Keep alive, sync time |
| SetVariables | CSMS → CS | Configure charger variables |
| GetVariables | CSMS → CS | Read charger variables |
| GetBaseReport | CSMS → CS | Full device model report |
| NotifyReport | CS → CSMS | Report device model variables |
| Reset | CSMS → CS | Reboot (Immediate, OnIdle) |

#### Authorization
| Message | Direction | Description |
|---------|-----------|-------------|
| Authorize | CS → CSMS | Validate idToken |
| ClearCache | CSMS → CS | Clear auth cache |
| SendLocalList | CSMS → CS | Push local auth list |
| GetLocalListVersion | CSMS → CS | Get list version |

#### Transactions
| Message | Direction | Description |
|---------|-----------|-------------|
| **TransactionEvent** | CS → CSMS | Report all transaction lifecycle events (replaces Start/Stop/MeterValues) |
| RequestStartTransaction | CSMS → CS | Remote start |
| RequestStopTransaction | CSMS → CS | Remote stop |
| GetTransactionStatus | CSMS → CS | Check if messages are queued |
| CostUpdated | CSMS → CS | Push running cost to charger display |

#### Availability
| Message | Direction | Description |
|---------|-----------|-------------|
| StatusNotification | CS → CSMS | Connector status change |
| ChangeAvailability | CSMS → CS | Set EVSE availability |

#### Meter Values
| Message | Direction | Description |
|---------|-----------|-------------|
| MeterValues | CS → CSMS | Non-transaction meter readings |

#### Smart Charging
| Message | Direction | Description |
|---------|-----------|-------------|
| SetChargingProfile | CSMS → CS | Set power limits |
| GetChargingProfiles | CSMS → CS | Read active profiles |
| ClearChargingProfile | CSMS → CS | Remove profiles |
| ReportChargingProfiles | CS → CSMS | Response to GetChargingProfiles |
| NotifyEVChargingNeeds | CS → CSMS | EV reports energy needs (ISO 15118) |
| NotifyEVChargingSchedule | CS → CSMS | EV reports its charging schedule |
| GetCompositeSchedule | CSMS → CS | Get merged schedule |

#### Reservation
| Message | Direction | Description |
|---------|-----------|-------------|
| ReserveNow | CSMS → CS | Make reservation |
| CancelReservation | CSMS → CS | Cancel reservation |
| ReservationStatusUpdate | CS → CSMS | Reservation state change |

#### ISO 15118 Certificate Management
| Message | Direction | Description |
|---------|-----------|-------------|
| Get15118EVCertificate | CS → CSMS | Request EV contract certificate |
| SignCertificate | CS → CSMS | Request charger certificate signing |
| CertificateSigned | CSMS → CS | Return signed certificate |
| InstallCertificate | CSMS → CS | Install CA certificate |
| DeleteCertificate | CSMS → CS | Remove certificate |
| GetInstalledCertificateIds | CSMS → CS | List installed certificates |

#### Security
| Message | Direction | Description |
|---------|-----------|-------------|
| SecurityEventNotification | CS → CSMS | Report security event |
| SignCertificate | CS → CSMS | Request certificate signing |

#### Display Messages
| Message | Direction | Description |
|---------|-----------|-------------|
| SetDisplayMessage | CSMS → CS | Show message on charger display |
| GetDisplayMessages | CSMS → CS | Query display messages |
| NotifyDisplayMessages | CS → CSMS | Report current messages |
| ClearDisplayMessage | CSMS → CS | Remove display message |

#### Firmware
| Message | Direction | Description |
|---------|-----------|-------------|
| UpdateFirmware | CSMS → CS | Initiate update |
| FirmwareStatusNotification | CS → CSMS | Report update progress |
| PublishFirmware | CSMS → CS | For local controller: publish firmware to local chargers |
| PublishFirmwareStatusNotification | CS → CSMS | Report publish status |
| UnpublishFirmware | CSMS → CS | Remove published firmware |

#### Diagnostics
| Message | Direction | Description |
|---------|-----------|-------------|
| GetLog | CSMS → CS | Request log upload |
| LogStatusNotification | CS → CSMS | Report log upload progress |
| NotifyEvent | CS → CSMS | Report component events/alarms |
| NotifyMonitoringReport | CS → CSMS | Report monitoring config |
| SetMonitoringBase | CSMS → CS | Set monitoring defaults |
| SetMonitoringLevel | CSMS → CS | Set severity threshold |
| SetVariableMonitoring | CSMS → CS | Configure specific monitors |
| ClearVariableMonitoring | CSMS → CS | Remove monitors |
| GetMonitoringReport | CSMS → CS | Query monitoring config |
| NotifyCustomerInformation | CS → CSMS | Return customer data |
| CustomerInformation | CSMS → CS | Request customer data clear/report |

### TransactionEvent TriggerReasons

| TriggerReason | Description |
|---------------|-------------|
| Authorized | Authorization successful |
| CablePluggedIn | Cable connected |
| ChargingRateChanged | Power rate changed |
| ChargingStateChanged | State transition |
| Deauthorized | Token deauthorized mid-session |
| EnergyLimitReached | Energy limit hit |
| EVCommunicationLost | ISO 15118 communication lost |
| EVConnectTimeout | EV didn't start communication in time |
| MeterValueClock | Clock-aligned meter reading |
| MeterValuePeriodic | Periodic meter reading |
| TimeLimitReached | Time limit hit |
| Trigger | Triggered by TriggerMessage |
| UnlockCommand | Unlock received |
| StopAuthorized | Stop authorization received |
| EVDeparted | EV disconnected |
| EVDetected | EV connected |
| RemoteStop | Remote stop command |
| RemoteStart | Remote start command |
| AbnormalCondition | Fault detected |
| SignedDataReceived | Signed meter data |
| ResetCommand | Reset received |

### IdToken Types (OCPP 2.0.1)

| Type | Description | Example |
|------|-------------|---------|
| Central | System/backend-generated token | Remote start from app |
| eMAID | e-Mobility Account Identifier | DE-ABC-C12345678-X |
| ISO14443 | NFC/RFID (most common) | ABCD1234 |
| ISO15693 | Long-range RFID | 1234567890ABCDEF |
| KeyCode | PIN or keypad entry | 1234 |
| Local | Charger-local identifier | Internal use |
| MacAddress | BLE/WiFi MAC | AA:BB:CC:DD:EE:FF |
| NoAuthorization | Free charging, no auth required | — |

---

## 3. Error Codes

### OCPP CallError Error Codes

| Code | Description |
|------|-------------|
| NotImplemented | Requested action not implemented |
| NotSupported | Requested action recognized but not supported |
| InternalError | Internal error prevented processing |
| ProtocolError | Payload violates protocol |
| SecurityError | Security issue |
| FormationViolation | Payload syntax error |
| PropertyConstraintViolation | Field value out of allowed range |
| OccurrenceConstraintViolation | Required field missing or extra field |
| TypeConstraintViolation | Wrong data type |
| GenericError | Any other error |

### OCPP 1.6 ChargePointErrorCode (in StatusNotification)

| Code | Description |
|------|-------------|
| ConnectorLockFailure | Connector lock/unlock failed |
| EVCommunicationError | Communication with EV failed |
| GroundFailure | Ground fault detected |
| HighTemperature | Temperature too high |
| InternalError | Internal hardware/software error |
| LocalListConflict | Auth list conflict |
| NoError | No error |
| OtherError | Other unspecified error |
| OverCurrentFailure | Over-current detected |
| OverVoltage | Over-voltage detected |
| PowerMeterFailure | Meter reading failure |
| PowerSwitchFailure | Power switch failure |
| ReaderFailure | RFID reader failure |
| ResetFailure | Reset failed |
| UnderVoltage | Under-voltage detected |
| WeakSignal | Weak cellular/network signal |

---

## 4. Implementation Patterns

### Message Handler Architecture

```
WebSocket Message Received
  → Parse JSON envelope [messageType, messageId, action, payload]
  → Route to action handler based on `action` string
  → Validate payload against JSON schema
  → Execute business logic
  → Return response via same WebSocket
  → Log to ocpp_messages_log
```

### Request-Response Correlation

OCPP uses `messageId` for correlating requests with responses. Maintain a pending-requests map:

```
pendingRequests: Map<messageId, {resolve, reject, timeout, action}>
```

When sending a command to a charger (e.g., RemoteStartTransaction), generate a messageId, store the promise, and resolve/reject when the response arrives or timeout occurs.

### Recommended Timeouts

| Operation | Timeout |
|-----------|---------|
| BootNotification response | 30s |
| Authorize response | 10s |
| RemoteStart/Stop response | 30s |
| Heartbeat interval | 300s (5 min) |
| WebSocket ping/pong | 30s |
| Connection idle timeout | 900s (15 min) |
| MeterValues interval | 60s (configurable) |

### Offline Message Queue

When a charger reconnects after being offline, it may send queued messages. Handle:
1. Accept queued `StartTransaction` with past timestamps
2. Accept queued `MeterValues` and insert with original timestamps
3. Accept queued `StopTransaction` and close orphaned sessions
4. Reconcile meter readings with any estimated values
