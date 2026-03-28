# Shell Recharge Admin Portal — URL Map & Navigation Reference

## Base URLs
- **Legacy Admin**: `https://sky.dev.shellrechargetest.com/greenlots/protected/`
- **Core Frontend**: `https://sky.dev.shellrechargetest.com/core-frontend/`

## General Section (Legacy Admin)

| Page | List URL | Add URL |
|------|----------|---------|
| Network Operator | `admin/networkoperator.jsf` | `admin/addNetworkoperator.jsf` |
| Charge Station Make | `admin/deviceManufacturer.jsf` | `admin/addDeviceManufacturer.jsf` |
| Port Level | `admin/level.jsf` | (Add Level tab on same page) |
| Charge Station Model | `admin/deviceModel.jsf` | (Add tab on same page) |
| Admin Users | `common/user.jsf` | (Add Admin User tab) |
| Protocol Logs | `admin/messagelog.jsf` | N/A (read-only + filter) |
| Status Notifications | `admin/notification.jsf` | (Add Notification button) |
| Station Fault Severity | `admin/deviceFaultSeverity.jsf` | (inline form + list) |
| Greenlots Fee | `admin/addgreenlotsfee.jsf` | (search + inline) |
| Reload | `admin/reload.jsf` | N/A |
| Orphan Sessions | `admin/orphanSessions.jsf` | N/A |
| ErroneousStationData | `admin/erroneousStationData.jsf` | N/A |
| ErroneousSessionData | `admin/erroneousSessionData.jsf` | N/A |
| Qrtz Job | `admin/qrtzjob.jsf` | N/A |

## Network Operator Section (Legacy Admin)

| Page | List URL | Add URL |
|------|----------|---------|
| Enterprise | `common/enterprise.jsf` | (Add Enterprise tab) |
| Price Groups | `common/group.jsf` | (Add Price Group tab) |
| Location | `common/site.jsf` | `common/addSite.jsf` |
| SiteController | `admin/siteController.jsf` | `admin/addSiteController.jsf` |
| Charge Stations | `admin/device.jsf` | (Add tab) |
| Price (Legacy Planner) | `common/price.jsf` | N/A |
| Discount | `admin/discount.jsf` | (Add Discount tab) |
| Program | `admin/program.jsf` | (Add Program tab) |
| Subscription (Legacy) | `admin/subscriptionPlans.jsf` | (Add Subscription tab) |

## Fleet Section (Legacy Admin)

| Page | List URL | Add URL |
|------|----------|---------|
| Fleet | `admin/fleet.jsf` | (Add Fleet tab) |
| Fleet Vehicle | `admin/fleetMember.jsf` | (Add Fleet Vehicle tab) |

## EV Driver Section (Legacy Admin)

| Page | List URL | Add URL |
|------|----------|---------|
| User RFIDs | `common/customerRFID.jsf` | (Add RFID tab) |
| Users | `common/customer.jsf` | (Add User tab) |
| User Groups | `admin/userGroup.jsf` | (Add User Group tab) |

## Reports Section (Legacy Admin)

| Page | List URL | Add URL |
|------|----------|---------|
| Session Report | `admin/sessionreport.jsf` | N/A |
| Transaction Report | `admin/transactionreport.jsf` | N/A |
| Schedule Report | `admin/scheduleReport.jsf` | (Add Report Scheduler form) |
| Subscription Report | `admin/subscriptionreport.jsf` | N/A |

## Utility Information Section (Legacy Admin)

| Page | List URL | Add URL |
|------|----------|---------|
| Utility | `admin/utility.jsf` | (Add Utility button) |
| Federal Holiday | `admin/federalHoliday.jsf` | (Add Holiday button) |
| Tariff Management | `admin/tariffView.jsf` | (Add Tariff tab) |

## Core Frontend

| Page | URL |
|------|-----|
| Pricing List | `pricing/pricing-list` |
| Add Price Plan | `pricing/add-plan` |
| Subscription List | `subscription/subscription-list` |
| Add Subscription | `subscription/add` |

## Applications (External App Links)

These links navigate to external applications or core-frontend modules:

| Application | Link / URL |
|---|---|
| Price Plan | `core-frontend/pricing/pricing-list` |
| Subscriptions | `core-frontend/subscription/subscription-list` |
| Card Readers | (external app link) |
| Alerts & Notification | (external app link) |
| Insights | (external app link) |
| Demand Response 2.0 | (external app link) |
| Energy Management | (external app link) |
| Support tools | (external app link) |
| Fleet Solutions | (external app link) |
| Smart Fleets | (external app link) |
| Charger group | (external app link) |
| Account Management | (external app link) |

## Sidebar Navigation Structure

```
− General (collapsible)
    Network Operator
    Charge Station Make
    Port Level
    Charge Station Model
    Admin Users
    Protocol Logs
    Status Notifications
    Station Fault Severity
    Greenlots Fee
    Reload
    Orphan Sessions
    ErroneousStationData
    ErroneousSessionData
    Qrtz Job

+ Network Operator (collapsible)
    Enterprise
    Price Groups
    Location
    SiteController
    Charge Stations
    Price (Legacy Planner)
    Discount
    Program
    Subscription (Legacy)

+ Fleet (collapsible)
    Fleet
    Fleet Vehicle

+ EV Driver (collapsible)
    User RFIDs
    Users
    User Groups

+ Reports (collapsible)
    Session Report
    Transaction Report
    Schedule Report
    Subscription Report

+ Utility Information (collapsible)
    Utility
    Federal Holiday
    Tariff Management

+ Applications (collapsible)
    Price Plan
    Subscriptions
    Card Readers
    Alerts & Notification
    Insights
    Demand Response 2.0
    Energy Management
    Support tools
    Fleet Solutions
    Smart Fleets
    Charger group
    Account Management
```

## Header Navigation
- Home | Language | Change password | Logout

## Version
- App version: 1.0.0-10278-dev
