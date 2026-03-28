---
name: shell-recharge-admin
description: |
  Shell Recharge Solutions Admin Portal — OCPP charger configuration, network operator management, and EV charging infrastructure business logic. Use this skill whenever the user mentions: Shell Recharge, Greenlots, OCPP, charge station configuration, network operator setup, enterprise management, location management, site controller, charger provisioning, port levels, charge station models, EV charging pricing plans, subscription plans, charger commissioning, or anything related to configuring and managing EV charging infrastructure in the Shell Recharge admin portal. Also trigger when the user asks about the entity hierarchy (Network Operator → Enterprise → Location → Charge Station), OCPP protocol configuration, charging session management, idle fees, smart charging, load management, or pricing/subscription workflows. Even if the user just says "admin portal" or "SKY portal" or references JSF pages, this skill should be used.
---

# Shell Recharge Solutions — Admin Portal Business Logic

This skill captures the complete business logic, entity relationships, UI patterns, and configuration workflows for the Shell Recharge Solutions (formerly Greenlots) Admin Portal. The portal manages EV charging infrastructure including charger provisioning, network operations, pricing, and subscriptions.

## Portal Architecture

The system has two UI layers:

1. **Legacy Admin Portal** (JSF-based): `sky.dev.shellrechargetest.com/greenlots/protected/admin/...`
   - Built with JavaServer Faces (JSF)
   - URL pattern: `*.jsf` endpoints
   - Traditional server-rendered pages with form submissions

2. **Core Frontend** (Modern SPA): `sky.dev.shellrechargetest.com/core-frontend/...`
   - Used for Pricing Plans and Subscription Plans
   - Modern Material-style UI with left icon sidebar
   - Single-page application architecture

## Entity Hierarchy & Relationships

The core domain model follows a strict hierarchical structure. Understanding this hierarchy is essential — almost every form uses cascading dropdowns that follow this chain:

```
Network Operator (top-level)
  └── Enterprise
        └── Location
              ├── Charge Station(s)
              └── SiteController(s)
```

Parallel to this hierarchy, charger hardware is modeled separately:

```
Charge Station Make (manufacturer)
  └── Charge Station Model (specific model, includes protocol)
        └── Port Level (electrical specs per connector)
```

These two hierarchies converge at the **Charge Station** entity, which references both a Location (from the operational hierarchy) and a Model (from the hardware hierarchy).

---

## Entity Details & Business Logic

### 1. Network Operator

The top-level organizational entity. Represents a charging network provider.

**URL**: `/greenlots/protected/admin/networkoperator.jsf` (List) / `addNetworkoperator.jsf` (Add)

**Core Fields:**
- Operator Name* — unique identifier
- Contact Person* — primary contact
- Phone — contact number
- Address* — physical address
- Country* → State* (cascading dropdowns)
- Currency Unit* — billing currency
- Postal Code
- Plugshare Sub Operator — integration ID for PlugShare
- Subdomain — dropdown for portal subdomain
- Legal Entity Name* — legal registration name
- Tax Registration Attribute Name* / Value* — tax ID info (with info tooltips)

**Feature Flags (checkboxes):**
These control which features are available to the network operator's users:
- Insight Access Allowed — analytics/reporting access
- Firmware Management Allowed — OTA firmware updates
- Demand Response 2.0 Allowed — grid demand response
- Driver Max Price Access Allowed — EV driver price visibility
- Smart Fleet Access Allowed — fleet management features
- Alerts & Notifications Allowed — notification system
- Flex Charge Manager Allowed — flexible charging schedules
- Charger Group Allowed — station grouping
- Price360 Based Pricing Allowed — advanced pricing engine
- Price Plan Allowed — new pricing model
- OneMPS-based Pricing Allowed — OneMPS pricing integration
- Calculate Idle Fee on Status Notification — idle fee trigger method
- Fleet Dashboard Allowed — fleet analytics
- Enable Subscription Plan — subscription model support
- Enable Reservation at this Network Operator — reservation system

**Tax Calculation Section:**
- Thomson Reuters Auto-Tax Calculation Enabled — external tax service integration

**Payment Credit/Void Limits:**
Role-based payment limits (in currency units):
- Supervisor Role — highest limit (e.g., 0.00 default)
- Teamlead Role — mid-level limit
- Agent Role — lowest limit

**Terms of Service:**
- Terms of Service URL — link to ToS document
- Terms of Service Version — with "increase Version" action link

**Business Rules:**
- A Network Operator must exist before creating Enterprises, Locations, or Charge Stations
- Feature flags cascade down to all child entities
- Currency Unit determines billing across the entire operator hierarchy
- Country/State affects tax calculation and regulatory compliance

---

### 2. Charge Station Make (Device Manufacturer)

Represents a hardware manufacturer of charging equipment.

**URL**: `/greenlots/protected/admin/deviceManufacturer.jsf` (List) / `addDeviceManufacturer.jsf` (Add)

**Fields:**
- Name* — manufacturer name (e.g., "ABB", "ChargePoint", "Tesla")
- Short Name* — abbreviated identifier
- Address* — manufacturer address
- Description — optional notes

**List View Columns:** Name, Short Name, Operations (Edit/Delete)
**Pagination:** 10 per page, 24 pages of records

**Business Rules:**
- Must exist before creating Charge Station Models
- Simple lookup entity — acts as a foreign key reference
- Name and Short Name should be unique

---

### 3. Port Level

Defines the electrical specifications for a charging connector type.

**URL**: `/greenlots/protected/admin/level.jsf` (List) / Add Level tab

**Fields:**
- Level — identifier name
- Connector Name — human-readable connector label
- Voltage (V)* — voltage rating
- Current (A)* — amperage rating
- Power (kW)* — power output (typically Voltage × Current / 1000)

**List View Columns:** Level, Connector Name, Voltage (V), Current (A), Power (kW), Operations
**Pagination:** 10 per page, 15 pages

**Business Rules:**
- Power (kW) = Voltage (V) × Current (A) / 1000 (relationship should be consistent)
- Port Levels are referenced by Charge Station Models to define connector capabilities
- Common levels: Level 1 (120V/20A), Level 2 (240V/30-80A), DC Fast (200-1000V, 50-500A)
- Each port on a charge station maps to a Port Level

---

### 4. Charge Station Model

Links a manufacturer (Make) to a specific charger model, including protocol and port count.

**URL**: `/greenlots/protected/admin/deviceModel.jsf` (List) / Add tab

**Fields:**
- Charge Station Make* — dropdown (references Device Manufacturer)
- Model Name* — specific model identifier
- No. Of Port* — number of charging connectors
- Protocol* — communication protocol (predominantly OCPP16J)

**List View Columns:** Charge Station Make, Model Name, No. Of Port, Protocol, Operations
**Has:** Advanced Search + text search
**Pagination:** 39 pages

**Business Rules:**
- Each model belongs to exactly one Make
- Protocol determines communication capabilities (OCPP 1.6 JSON is the dominant protocol)
- Number of ports determines how many simultaneous charging sessions the station supports
- Model must exist before provisioning physical Charge Stations

**OCPP Protocol Notes:**
- OCPP16J = Open Charge Point Protocol version 1.6 using JSON over WebSocket
- Defines message types: BootNotification, StatusNotification, StartTransaction, StopTransaction, etc.
- The protocol field links to how the backend communicates with physical chargers

---

### 5. Enterprise

An organizational unit under a Network Operator, typically representing a business customer or sub-organization.

**URL**: `/greenlots/protected/common/enterprise.jsf` (List) / Add Enterprise tab

**Fields:**
- Network Operator* — parent operator (dropdown)
- Enterprise Name* — organization name
- Email — contact email
- Phone — contact phone

**List View Columns:** Network Operator, Enterprise Name, Email, Phone, Operations
**Has:** Advanced Search + text search
**Pagination:** 160 pages

**Business Rules:**
- Must belong to exactly one Network Operator
- Enterprises contain Locations, which contain Charge Stations
- Pricing and Subscriptions can be scoped to Enterprise level
- Enterprise users can be restricted from editing Price Plans (via "Prevent enterprise from editing" toggle)

---

### 6. Location

A physical site where charging stations are deployed. Very detailed entity.

**URL**: `/greenlots/protected/common/site.jsf` (List) / `addSite.jsf` (Add)

**Core Fields:**
- Network Operator* → Enterprise* (cascading dropdowns)
- Name* — location identifier
- Description

**Contact Information:**
- PRIMARY CONTACT: Contact Person*, Phone*, Email
- SECONDARY CONTACT: Contact Person, Phone, Email

**Address & Geo:**
- Address 1*, Address 2, City*, Postal Code*
- Country* → State* (cascading dropdowns)
- Latitude*, Longitude* — with "Convert" button (address-to-coords) and "Check Map" button
- External Location IDs — third-party reference IDs

**Configuration:**
- TimeZone* — operational timezone
- Date Format* / Time Format* — display formats
- Facility* — dropdown (default: UNKNOWN) — type of facility (parking garage, shopping center, etc.)
- Location Type* — dropdown (default: UNKNOWN) — classification
- Dynamic Info* — Yes/No radio — whether location publishes real-time availability

**Pricing & Fees:**
- Pricing Unit* — dropdown (Flat, kWh, Hourly, Session)
- Idle Fee* — fee for occupying charger after session completes
- Max Idle Fee* — cap on idle charges
- Free Minutes* — grace period before idle fee starts

**Operational Flags:**
- Enable Smart Charging — load management optimization
- Commissioned — whether location is live
- Disable Remote Stop — prevent remote session termination

**Utility Integration:**
- Reference — internal reference ID
- Utility Program ID — dropdown, grid program enrollment
- Utility Tariff section: Utility Name, Tariff Name, System — energy cost tracking

**Business Rules:**
- Location is the key operational unit — chargers and site controllers attach here
- Geo-coordinates are mandatory for map-based features and EV driver apps
- Idle Fee logic: charges start after Free Minutes grace period, capped at Max Idle Fee
- Commissioned flag controls whether location appears in public-facing apps
- Smart Charging enables load balancing across chargers at the location
- Pricing Unit at Location level sets the default billing method for all stations at this location

---

### 7. SiteController

An energy management device that controls power distribution across chargers at a location.

**URL**: `/greenlots/protected/admin/siteController.jsf` (List) / `addSiteController.jsf` (Add)

**Fields:**
- Network Operator* → Enterprise* → Location* (three-level cascading dropdowns)
- SiteController ID* — unique hardware identifier
- SiteController Name* — human-readable name
- Date Commissioned* — when put into service

**Energy Specs:**
- Inverter Power* (kW) — solar/battery inverter capacity
- Battery Capacity* (kWh) — on-site energy storage
- Peak Capacity* (kW) — maximum power draw allowed at the site

**Load Management Configuration:**
- Meter Reading Interval* (Mins) — how often to read power meters (default: 5)
- Load Ramping — checkbox (default: checked) — gradual power adjustment
- Default Power on unknown — fallback when status unknown
- Default Power on connection close — fallback on disconnect
- Default Power on reading skip — fallback on missed meter reading
- Skip Count* — number of missed readings before fallback (default: 1)
- PowerLevelData Interval* (Sec) — power reporting frequency (default: 60)
- Load Control* — radio: SKY (cloud-controlled) or Site Controller (local control)

**Notifications:**
- Offline Notification — alert when controller goes offline
- Peak Capacity Notification — alert when approaching peak

**List View Columns:** SiteController ID, SiteController Name, Peak Capacity (kW), Associated Stations, Current Load (kW), Availability (ONLINE/OFFLINE), Last Communication, Operations (Edit/Delete/Copy)

**Business Rules:**
- SiteController manages power distribution to prevent exceeding site electrical capacity
- Peak Capacity is the hard limit — total power across all chargers cannot exceed this
- Load Control setting determines whether power management decisions happen in the cloud (SKY) or locally on the site controller hardware
- Load Ramping prevents sudden power spikes by gradually adjusting charger power levels
- Meter Reading Interval and Skip Count determine how aggressively the system responds to data gaps
- A SiteController can have multiple associated Charge Stations
- Availability is tracked via Last Communication timestamp — goes OFFLINE if communication lapses

---

### 8. Charge Stations

The actual physical charging equipment deployed at a location.

**URL**: `/greenlots/protected/admin/device.jsf` (List) / Add tab

**Key Fields:**
- Enterprise — parent enterprise
- Location — deployment site
- Charge Station Name — human-readable name
- Station Id — internal numeric ID
- ChargeBox ID — OCPP identity (used in OCPP communication)
- Status — color-coded: red circle (offline/faulted), grey circle (inactive), green (available)
- Creation date

**Special Features:**
- **Add/Remove Column** dropdown — configurable table columns
- **Advanced Search** — filter by any combination of fields
- **Status Icons:** Red = error/offline, Grey = unavailable, Green = available

**Business Rules:**
- ChargeBox ID is the OCPP identifier — must match what the physical charger sends in BootNotification
- Station Id is the internal system identifier
- Each Charge Station belongs to one Location and one Enterprise
- Status reflects real-time OCPP communication state
- A station's capabilities are determined by its Charge Station Model (Make + Model + Protocol + Ports)

---

### 9. Price Plans (Core Frontend)

Modern pricing configuration for charging sessions.

**URL**: `/core-frontend/pricing/pricing-list` (List) / `/pricing/add-plan` (Add)

**List Columns:** Name, Network, Enterprise, Effective Version, Effective Form (date), Updated By, In Use (Yes/No), Status (Draft+/Published), Action

**Add Form Fields:**
- Network Operator* — dropdown
- Enterprise (Optional) — dropdown (can be network-wide)
- Price Plan Name* — identifier
- Description*
- Currency* — billing currency
- Price Change Method* — dropdown (e.g., "Start of Session" — when price changes take effect)
- Prevent Enterprise from Editing — toggle to lock plan from enterprise-level edits

**Business Rules:**
- Plans have versioning (Effective Version number increments)
- Status workflow: Draft → Draft+ → Published
- "In Use" indicates whether any charge station is actively using this plan
- Plans can be scoped to Network Operator level (applies to all enterprises) or specific Enterprise
- Price Change Method "Start of Session" means if prices change mid-session, the session keeps the price from when it started
- Only Published plans can be assigned to stations
- 904 records indicate heavy usage of the pricing system

---

### 10. Subscription Plans (Core Frontend)

Recurring membership plans for EV drivers.

**URL**: `/core-frontend/subscription/subscription-list` (List) / `/subscription/add` (Add)

**List Columns:** Subscription Name, Subscription Type, Enrollment Start/End Date, Subscription Fee, Subscription Cycle, Subscription Term, Action

**Add Form Fields:**
- Country* — dropdown
- Network Operator (Optional) — dropdown
- Subscription Name* — plan name
- Description — with help tooltip
- Subscription Type* — dropdown (RETAIL = paid by driver, INCENTIVE = sponsored/free)
- Enrolment Start Date / End Date — enrollment window
- Zone Type* — dropdown (Hierarchical = follows org hierarchy)
- Category* — dropdown (Individual = per-driver subscriptions)
- Open Access to All EV Driver Users — checkbox to make universally available

**Pricing Section:**
- Currency — billing currency
- Subscription Cycle* — dropdown (MONTHLY, WEEKLY, ANNUALLY)
- Subscription Term — number of cycles
- Subscription Fee — recurring charge amount
- Setup Fee — one-time onboarding charge
- Termination Fee — early cancellation charge

**Business Rules:**
- Two types: RETAIL (driver pays) and INCENTIVE (employer/fleet pays)
- Enrollment dates control when new users can sign up
- Zone Type "Hierarchical" means the subscription follows the Network Operator → Enterprise hierarchy
- Subscription Cycle determines billing frequency
- 306 records across the system

---

### 11. Price (Legacy Planner)

Time-of-day pricing configuration using a weekly calendar planner interface.

**URL**: `/greenlots/protected/common/price.jsf` (List/Planner)

**Filters:**
- Network Operator* — dropdown
- Enterprise* — dropdown (cascades from Network Operator)
- Price Group* — dropdown

**Tabs:**
- Planner — weekly calendar view for setting time-of-day pricing
- Add Price — form to create new pricing rules

**Business Rules:**
- Filters are mandatory; planner only shows pricing for selected Network Operator + Enterprise + Price Group combination
- Time-of-day pricing allows different rates for different hours of the day
- Legacy planner interface; modern pricing uses Core Frontend Price Plans (Section 9)

---

### 12. Discount

Discount management for charges and subscriptions.

**URL**: `/greenlots/protected/admin/discount.jsf` (List) / Add Discount tab

**List View Columns:** User Group, Charge Station Group, Enterprise, Discount %, Operations

**Pagination:** 38 pages

**Add Form Fields:**
- User Group* — dropdown (EV driver group classification)
- Charge Station Group* — dropdown (grouped chargers)
- Enterprise* — dropdown (organizational unit)
- Discount %* — percentage discount to apply

**Business Rules:**
- Discounts are scoped to User Group + Charge Station Group + Enterprise combination
- Percentage discount is applied to charging fees
- Enables targeted promotions and loyalty incentives

---

### 13. Program

Program management for driver engagement and incentives.

**URL**: `/greenlots/protected/admin/program.jsf` (List) / Add Program tab

**List View Columns:** Program Name, Description, Status, Operations

**Add Form Fields:**
- Program Name* — identifier
- Description — detailed explanation
- Status* — dropdown (Active, Inactive, etc.)

**Features:**
- Advanced Search available on list view

**Business Rules:**
- Programs are engagement mechanisms (e.g., loyalty, referral, demand response)
- Status controls whether the program is actively available
- Programs can be scoped to Network Operators or Enterprises

---

### 14. Subscription Plans (Legacy)

Legacy subscription plan management interface.

**URL**: `/greenlots/protected/admin/subscriptionPlans.jsf` (List) / Add Subscription tab

**List View Columns:** Subscription Name, Start Date, End Date, No of Subscribers, Period, Status

**Pagination:** Has Advanced Search, multiple pages

**Add Form Fields:**
- Subscription Name* — plan identifier
- Start Date* — enrollment opens
- End Date* — enrollment closes
- Period* — billing frequency (Monthly, Quarterly, Annually, etc.)
- Status* — Active, Inactive, Archived
- No of Subscribers — read-only (auto-calculated)

**Business Rules:**
- Legacy interface; modern subscriptions use Core Frontend Subscription Plans (Section 10)
- Date range controls enrollment window
- No of Subscribers is auto-calculated from active enrollments
- Differentiate from Core Frontend subscriptions in documentation and workflows

---

### 15. Fleet

Fleet management for fleet operators with balance tracking.

**URL**: `/greenlots/protected/admin/fleet.jsf` (List) / Add Fleet tab

**List View Columns:** Network Operator, Enterprise, Name, Balance ($), Operations (Edit/Delete/$ balance icon)

**Pagination:** 7 pages

**Add Form Fields:**
- Network Operator* → Enterprise* (cascading dropdowns)
- Fleet Name* — identifier
- Balance — prepaid balance for fleet account (in currency units)

**Business Rules:**
- Fleets are sub-organizations under Enterprises for managing company vehicle charging
- Balance is a prepaid account balance used for charging
- Each Fleet belongs to one Enterprise
- Balance icon in Operations allows viewing or adjusting fleet account balance
- Edit and Delete operations available for fleet management

---

### 16. Fleet Vehicle

Individual vehicles within a fleet.

**URL**: `/greenlots/protected/admin/fleetMember.jsf` (List) / Add Fleet Vehicle tab

**List View Columns:** Network Operator, Enterprise Name, Fleet, VIN, Unique Attribute, Operations

**Pagination:** 225 pages

**Add Form Fields:**
- Network Operator* → Enterprise* → Fleet* (cascading dropdowns)
- VIN* — Vehicle Identification Number (unique identifier)
- Unique Attribute — custom identifier or license plate
- Make/Model — vehicle information

**Features:**
- Advanced Search available on list view

**Business Rules:**
- Fleet Vehicles are individual vehicles assigned to a Fleet
- VIN is globally unique; Unique Attribute provides additional identification
- 225 pages indicates large fleet deployments across the system
- Edit/Delete operations allow vehicle lifecycle management

---

### 17. User RFIDs

Radio Frequency Identification tags assigned to EV drivers.

**URL**: `/greenlots/protected/common/customerRFID.jsf` (List with multiple tabs)

**Tabs:**
- RFID List — existing assigned RFIDs
- Add RFID — assign new RFID to a user
- Requested RFID — RFIDs pending activation

**List View Columns:** S/N, Owner, User, Email, Driver Number, RFID, Serial Number, Balance, Actions

**Pagination:** 26,754 pages (very large dataset)

**Business Rules:**
- RFIDs enable wireless charging authorization at stations
- Each RFID can be owned by a User or an Organization
- Three states: Active (assigned), Requested (pending), Unassigned
- Balance is the account balance associated with the RFID
- Driver Number links RFID to a specific driver account
- 26,754 pages indicates millions of RFIDs across the system

---

### 18. Users (EV Drivers)

EV driver accounts and loyalty program members.

**URL**: `/greenlots/protected/common/customer.jsf` (List with multiple tabs)

**Tabs:**
- User List — active EV driver accounts
- Add User — register new driver
- Loyalty — loyalty program memberships

**List View Columns:** Enterprise Admin, First Name, Last Name, Email, Driver Number, Activate, Country Code, OEM Code, OEM Brand, Operations

**Features:**
- Download link to export user data
- Advanced Search available

**Add Form Fields:**
- First Name*, Last Name* — driver name
- Email* — contact email
- Country Code* — country of registration
- OEM Code* — Original Equipment Manufacturer (e.g., Tesla, BMW)
- OEM Brand* — brand identifier
- Activate — checkbox to enable account immediately

**Business Rules:**
- Users are EV drivers using the charging network
- OEM Code and OEM Brand link drivers to vehicle manufacturers
- Driver Number is auto-assigned upon creation
- Activate flag controls account status
- Email is used for notifications and app login
- Enterprise Admin associates user with an organization context

---

### 19. User Groups

Groups for segmenting and targeting EV drivers.

**URL**: `/greenlots/protected/admin/userGroup.jsf` (List) / Add User Group tab

**List View Columns:** Group Name, Short Name, Description, Operations

**Pagination:** 32 pages

**Add Form Fields:**
- Group Name* — full name of the group
- Short Name* — abbreviated identifier
- Description — purpose and membership criteria

**Features:**
- Advanced Search available

**Business Rules:**
- User Groups are used for targeting discounts, programs, and communications
- Groups enable bulk operations across multiple drivers
- Commonly used in demand response programs and loyalty initiatives
- Groups can be hierarchical (e.g., by geography, employer, vehicle type)

---

### 20. Session Report

Real-time and historical charging session analytics.

**URL**: `/greenlots/protected/admin/sessionreport.jsf`

**Features:**
- Download Report button — export session data
- Download Financial Report button — export financial metrics
- Add/Remove Column dropdown — customize visible columns

**Report Columns:** Driver Email, Driver Number, Enterprise, Start Time, End Time, Charge St. Name, Usage (kWh)

**Advanced Search:** Available for filtering by any combination of fields

**Data Volume:** 516,959 records

**Business Rules:**
- Sessions represent individual charging events
- 516,959 records indicate high transaction volume
- Financial Report extracts revenue metrics from sessions
- Add/Remove Column feature allows customized reporting views
- Advanced Search enables complex filtering (date range, location, driver, etc.)

---

### 21. Transaction Report

Financial transaction history and billing analysis.

**URL**: `/greenlots/protected/admin/transactionreport.jsf`

**Report Columns:** Customer Name, Email, Driver Number, Enterprise, DATE, CCN (Credit Card Network), CC method, CC Trx Id, Amount

**Features:**
- Download link to export transaction data
- Advanced Search available

**Business Rules:**
- Transactions are financial records from charging sessions
- CCN and CC method show payment network used (Visa, MasterCard, etc.)
- CC Trx Id is the payment gateway transaction ID (for reconciliation with processors)
- Amount is the charge amount in the operator's currency
- Used for billing reconciliation, revenue reporting, and payment processing audits

---

### 22. Schedule Report

Scheduled report generation and management.

**URL**: `/greenlots/protected/admin/scheduleReport.jsf`

**Add Report Scheduler Form Fields:**
- Schedule Name* — identifier for the scheduled report
- Report Type* — dropdown (Session, Transaction, Subscription, etc.)
- Network Operator* — which network operator to report on
- Enterprise — optional, specific enterprise
- Location — optional, specific charging location
- Price Group — optional, specific pricing group
- TimeZone* — timezone for report scheduling (affects when reports run)
- Schedule expression* — cron-like syntax for recurring runs

**Reports Table Columns:** Schedule Name, Report Type, Network Operator, Enterprise, Location, Price Group, TimeZone, Prev Fire Time, Next Fire Time, Operations

**Business Rules:**
- Schedule expression determines report frequency (daily, weekly, monthly, custom)
- Prev Fire Time and Next Fire Time show execution history and next scheduled run
- Scheduled reports are typically auto-emailed or made available for download
- Report scope determined by Network Operator + Enterprise + Location + Price Group filters

---

### 23. Subscription Report

Analysis of subscription plan enrollment and usage.

**URL**: `/greenlots/protected/admin/subscriptionreport.jsf`

**Report Columns:** Subscriber Name, Plan Name, Subscribed Date, Last Billed Date, Next Billing Date, Total Sessions, Energy

**Features:**
- Advanced Search available

**Business Rules:**
- Subscription Report tracks recurring plan revenue and usage
- Total Sessions shows number of charging sessions under the subscription
- Energy shows total kWh consumed across all sessions on the plan
- Last Billed Date and Next Billing Date show billing cycle information
- Used for subscription KPI tracking and churn analysis

---

### 24. Utility

Utility company integration for demand response and tariff programs.

**URL**: `/greenlots/protected/admin/utility.jsf`

**List Features:**
- Add Utility button — register new utility company
- Advanced Search

**List View Columns:** State, Utility, Utility ID, Status, Operation

**Add Form Fields:**
- Utility Name* — utility company name
- Utility ID* — unique identifier for the utility (from NERC or regulatory database)
- State* — service state/region
- Status* — Active, Inactive, etc.

**Business Rules:**
- Utilities are energy providers and grid operators
- Utility ID is used in tariff lookups and demand response programs
- Status controls whether locations can enroll in the utility's programs
- Utilities are the foundation for Tariff Management (Section 25)

---

### 25. Federal Holiday

Holiday calendar for time-of-use pricing and demand response scheduling.

**URL**: `/greenlots/protected/admin/federalHoliday.jsf`

**Features:**
- Year selector dropdown to filter by calendar year
- Add Holiday button — register new holiday

**List View Columns:** Name, Date, Operation

**Add Form Fields:**
- Holiday Name* — e.g., "Memorial Day", "Labor Day"
- Date* — calendar date
- Country/State — geographic scope

**Business Rules:**
- Holidays affect time-of-use pricing (different rates apply)
- Federal holidays may have different charging demand patterns
- Used in demand response scheduling (holidays may suspend programs)
- Year selector allows managing multiple years in advance

---

### 26. Tariff Management

Utility rate schedules and time-of-use tariffs.

**URL**: `/greenlots/protected/admin/tariffView.jsf`

**Tabs:**
- Tariff List — existing tariff schedules
- Add Tariff — register new tariff

**List View Columns:** Utility, State, Tariff Name, Period, Status, Operation

**Add Form Fields:**
- Utility* — dropdown (references Utility entity)
- State* — geographic region
- Tariff Name* — identifier (e.g., "EV Time-of-Use Schedule E")
- Period — tariff effective date range
- Status* — Active, Inactive, Archived

**Business Rules:**
- Tariffs define utility rate schedules with time-of-use pricing
- Tariffs link to Locations (Section 6 has "Utility Tariff section")
- Status controls whether the tariff is actively applied to stations
- Tariff integration enables dynamic pricing based on grid conditions

---

### 27. Qrtz Job (Scheduled Jobs)

QUARTZ scheduler job management for background tasks.

**URL**: `/greenlots/protected/admin/qrtzjob.jsf` (List only, read-only)

**List View Columns:** Job Name, Job Group, Next Fire Time, Previous Fire Time, Start Time, End Time

**Pagination:** 7 pages

**Features:**
- Refresh Table button to poll for updated job status

**Business Rules:**
- Jobs are scheduled background tasks (e.g., billing runs, report generation, data cleanup)
- Job Group organizes jobs by functional area
- Next Fire Time shows when the job will next execute
- Previous Fire Time shows last execution
- Start Time / End Time show actual execution duration (performance monitoring)
- Read-only interface; jobs are configured in application code
- Useful for troubleshooting delayed tasks or monitoring batch processes

---

### 28. ErroneousStationData

Data quality monitoring for charge station configuration errors.

**URL**: `/greenlots/protected/admin/erroneousStationData.jsf` (List only, read-only)

**Business Rules:**
- Captures station data with validation failures or inconsistencies
- Typically shows stations with missing required fields or data conflicts
- Used for data quality monitoring and troubleshooting
- Admin users review erroneous records and correct them in the source entity pages
- Read-only interface to identify problems

---

### 29. ErroneousSessionData

Data quality monitoring for charging session errors.

**URL**: `/greenlots/protected/admin/erroneousSessionData.jsf` (List only, read-only)

**Business Rules:**
- Captures sessions with validation failures (missing fields, pricing errors, incomplete records)
- Common errors: missing start/stop times, zero usage, missing user references
- Used to identify billing or reporting anomalies
- Read-only interface for investigation
- Admin escalates corrected records or marks them for manual billing adjustments

---

## Applications (External App Links)

The Admin Portal sidebar includes links to 12 external applications or separate modules. These are separate from the JSF and Core Frontend pages and typically involve third-party integrations or specialized subsystems:

| Application | Description |
|---|---|
| **Price Plan** | Redirects to Core Frontend pricing-list (`core-frontend/pricing/pricing-list`) — modern pricing configuration interface |
| **Subscriptions** | Redirects to Core Frontend subscription-list (`core-frontend/subscription/subscription-list`) — modern subscription management |
| **Card Readers** | External app for managing payment card reader devices and POS integrations |
| **Alerts & Notification** | External app for configuring alerts (threshold, escalation) and notification delivery (email, SMS, push) |
| **Insights** | Analytics/BI tool for dashboards, KPIs, and operational insights |
| **Demand Response 2.0** | Grid demand response programs and load shedding orchestration |
| **Energy Management** | Renewable energy integration and on-site energy storage optimization |
| **Support tools** | Internal support/ticketing system for customer service |
| **Fleet Solutions** | Fleet-specific features (vehicle assignment, driver management, balance tracking) |
| **Smart Fleets** | Advanced fleet analytics and optimization (route planning, utilization, predictive maintenance) |
| **Charger group** | Charger grouping and bulk management features |
| **Account Management** | Customer account settings, billing address, payment methods |

**Navigation Pattern:**
- Applications appear in the sidebar under a collapsible "Applications" section
- Clicking each link either redirects to the external app or opens it in a new tab/modal
- Some applications (like Demand Response 2.0, Energy Management) may require additional enterprise feature flags to be enabled on the Network Operator

---

## Common UI Patterns

### JSF Admin Portal (Legacy)

1. **List / Add Tab Pattern** — Every entity page has two tabs:
   - **List** (green active button) — paginated data table
   - **Add [Entity]** (with + icon) — creation form

2. **Pagination** — "1 of N" with numbered page links, configurable items per page (default 10)

3. **Operations Column** — Edit (pencil icon), Delete (red X), sometimes Copy (clipboard icon) or Impersonate (person icon)

4. **Advanced Search** — Available on complex pages (Charge Station Model, Admin Users, Charge Stations, Station Fault Severity, Location)

5. **Cascading Dropdowns** — Network Operator → Enterprise → Location pattern used consistently

6. **Required Fields** — Marked with asterisk (*), form validation on Submit/Save

7. **Section Headers** — Forms use section dividers (e.g., "PRIMARY CONTACT", "SECONDARY CONTACT", "TAX CALCULATION", "PAYMENT CREDIT/VOID LIMITS")

### Core Frontend (Modern)

1. **Left Icon Sidebar** — Icon-based navigation between sections
2. **"+ ADD [ENTITY]"** button — teal/green colored
3. **Material Design Inputs** — Floating labels, underline inputs, dropdown with arrow
4. **Status Badges** — Colored text links (Draft+, Published)
5. **Items Per Page Selector** — Bottom right of lists
6. **Cancel / Create** buttons — Form actions

---

## OCPP Integration Points

The admin portal is fundamentally an OCPP charger management system. Key OCPP touchpoints:

1. **ChargeBox ID** — The OCPP identity string. Must match between admin portal config and physical charger firmware
2. **Protocol** — OCPP16J (OCPP 1.6 JSON over WebSocket) is the standard
3. **Protocol Logs** — Records all OCPP messages: BootNotification, StatusNotification, OpenConnection, CloseConnection, TriggerMessage, ChangeConfiguration
4. **Status** — Derived from OCPP StatusNotification messages (Available, Preparing, Charging, Faulted, etc.)
5. **SiteController** — Can use OCPP or SiteController protocol for communication
6. **Remote Operations** — Remote Stop, Trigger Message, Change Configuration all use OCPP commands

---

## Configuration Workflow (Typical Setup Sequence)

When onboarding new charging infrastructure, follow this order:

1. **Create Network Operator** — Set up the org, currency, country, feature flags
2. **Create Enterprise** — Business unit under the operator
3. **Create Charge Station Make** — Register the hardware manufacturer
4. **Create Port Level** — Define connector electrical specs
5. **Create Charge Station Model** — Link make + model + ports + protocol
6. **Create Location** — Physical site with address, geo, pricing, idle fees
7. **Create SiteController** (if applicable) — Energy management for the site
8. **Create/Register Charge Station** — Deploy charger with ChargeBox ID matching hardware
9. **Create Price Plan** — Define pricing (can be done earlier and assigned later)
10. **Create Subscription** (optional) — Recurring membership plans

This order respects the foreign key dependencies — each entity depends on its parent existing first.
