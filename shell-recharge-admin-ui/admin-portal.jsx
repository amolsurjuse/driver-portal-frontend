import { useState } from "react";
import {
  Settings, Users, Zap, MapPin, Server, Battery, CreditCard, Tag,
  ChevronLeft, ChevronRight, Search, Plus, Edit2, Trash2,
  Building2, Cpu, PlugZap, Globe, Shield, Clock, DollarSign,
  Menu, X, Eye, MoreVertical, ChevronDown, Check, AlertCircle
} from "lucide-react";

/* ─── sample data generators ─── */
const networkOperators = [
  { id: 1, name: "Greenlots", contact: "John Smith", phone: "+1-555-0100", country: "US", state: "CA", currency: "USD", legalEntity: "Greenlots Inc.", features: ["insight","firmware","demandResponse","pricePlan","subscription"], status: "Active" },
  { id: 2, name: "Shell Recharge EU", contact: "Maria Schmidt", phone: "+49-555-0200", country: "DE", state: "Bavaria", currency: "EUR", legalEntity: "Shell Recharge GmbH", features: ["insight","alerts","smartFleet","pricePlan"], status: "Active" },
  { id: 3, name: "ELAM WPMUD", contact: "Sarah Lee", phone: "+1-555-0300", country: "US", state: "WA", currency: "USD", legalEntity: "ELAM Corp.", features: ["insight","pricePlan","chargerGroup"], status: "Active" },
  { id: 4, name: "DevrajDEVNWO", contact: "Dev Raj", phone: "+91-555-0400", country: "IN", state: "KA", currency: "INR", legalEntity: "DevTest Ltd.", features: ["insight","firmware","pricePlan","subscription","demandResponse"], status: "Active" },
  { id: 5, name: "YashasOperator", contact: "Yashas P", phone: "+1-555-0500", country: "US", state: "TX", currency: "USD", legalEntity: "Yashas LLC", features: ["pricePlan","alerts"], status: "Active" },
];

const chargeStationMakes = [
  { id: 1, name: "ABB", shortName: "ABB", address: "Zurich, Switzerland" },
  { id: 2, name: "ChargePoint", shortName: "CP", address: "Campbell, CA, USA" },
  { id: 3, name: "Siemens", shortName: "SIE", address: "Munich, Germany" },
  { id: 4, name: "BTC Power", shortName: "BTC", address: "Santa Ana, CA, USA" },
  { id: 5, name: "Tritium", shortName: "TRI", address: "Brisbane, Australia" },
  { id: 6, name: "Delta Electronics", shortName: "DEL", address: "Taipei, Taiwan" },
  { id: 7, name: "Efacec", shortName: "EFA", address: "Porto, Portugal" },
  { id: 8, name: "EVSE LLC", shortName: "EVSE", address: "Portland, OR, USA" },
];

const portLevels = [
  { id: 1, level: "Level 1", connector: "J1772", voltage: 120, current: 16, power: 1.9 },
  { id: 2, level: "Level 2 - 32A", connector: "J1772", voltage: 240, current: 32, power: 7.7 },
  { id: 3, level: "Level 2 - 40A", connector: "J1772", voltage: 240, current: 40, power: 9.6 },
  { id: 4, level: "Level 2 - 80A", connector: "J1772", voltage: 240, current: 80, power: 19.2 },
  { id: 5, level: "DC Fast - 50kW", connector: "CCS1", voltage: 500, current: 100, power: 50 },
  { id: 6, level: "DC Fast - 150kW", connector: "CCS1", voltage: 920, current: 200, power: 150 },
  { id: 7, level: "DC Fast - 350kW", connector: "CCS1", voltage: 920, current: 500, power: 350 },
  { id: 8, level: "CHAdeMO 50kW", connector: "CHAdeMO", voltage: 500, current: 125, power: 50 },
];

const chargeStationModels = [
  { id: 1, make: "ABB", model: "Terra AC W22-T-RD-MC-0", ports: 2, protocol: "OCPP16J" },
  { id: 2, make: "ABB", model: "Terra HP 175", ports: 2, protocol: "OCPP16J" },
  { id: 3, make: "ChargePoint", model: "CT4021-GW", ports: 2, protocol: "OCPP16J" },
  { id: 4, make: "ChargePoint", model: "CPF50", ports: 1, protocol: "OCPP16J" },
  { id: 5, make: "Siemens", model: "VersiCharge Gen3", ports: 1, protocol: "OCPP16J" },
  { id: 6, make: "BTC Power", model: "GEN4 180kW", ports: 2, protocol: "OCPP16J" },
  { id: 7, make: "Tritium", model: "RTM75", ports: 1, protocol: "OCPP16J" },
  { id: 8, make: "Delta Electronics", model: "City Charger 200kW", ports: 2, protocol: "OCPP16J" },
];

const enterprises = [
  { id: 1, networkOp: "Greenlots", name: "Autodesk", email: "admin@autodesk.com", phone: "+1-555-1001" },
  { id: 2, networkOp: "Greenlots", name: "City of Nanaimo", email: "ev@nanaimo.ca", phone: "+1-555-1002" },
  { id: 3, networkOp: "Shell Recharge EU", name: "BMW Group", email: "fleet@bmw.de", phone: "+49-555-1003" },
  { id: 4, networkOp: "Greenlots", name: "Jerry Seiner Salt Lake", email: "ops@seiner.com", phone: "+1-555-1004" },
  { id: 5, networkOp: "DevrajDEVNWO", name: "DevrajDEVEE", email: "dev@test.com", phone: "+91-555-1005" },
  { id: 6, networkOp: "YashasOperator", name: "YashasEnterprise", email: "yashas@test.com", phone: "+1-555-1006" },
  { id: 7, networkOp: "ELAM WPMUD", name: "CVSK AMAZON WAREHOUSE", email: "ops@cvsk.com", phone: "+1-555-1007" },
  { id: 8, networkOp: "Greenlots", name: "Performance Motors Ltd", email: "fleet@pml.com", phone: "+65-555-1008" },
];

const locations = [
  { id: 1, netOp: "Greenlots", enterprise: "Autodesk", name: "Autodesk HQ Garage", city: "San Rafael", state: "CA", lat: 37.9735, lng: -122.5233, timezone: "America/Los_Angeles", pricingUnit: "kWh", idleFee: 0.25, commissioned: true, smartCharging: true },
  { id: 2, netOp: "Greenlots", enterprise: "City of Nanaimo", name: "Nanaimo City Hall", city: "Nanaimo", state: "BC", lat: 49.1659, lng: -123.9401, timezone: "America/Vancouver", pricingUnit: "kWh", idleFee: 0.00, commissioned: true, smartCharging: false },
  { id: 3, netOp: "Shell Recharge EU", enterprise: "BMW Group", name: "BMW Welt Charging Hub", city: "Munich", state: "Bavaria", lat: 48.1774, lng: 11.5569, timezone: "Europe/Berlin", pricingUnit: "kWh", idleFee: 0.50, commissioned: true, smartCharging: true },
  { id: 4, netOp: "DevrajDEVNWO", enterprise: "DevrajDEVEE", name: "Dev Test Location 1", city: "Bangalore", state: "KA", lat: 12.9716, lng: 77.5946, timezone: "Asia/Kolkata", pricingUnit: "Session", idleFee: 0.00, commissioned: false, smartCharging: false },
  { id: 5, netOp: "ELAM WPMUD", enterprise: "CVSK AMAZON WAREHOUSE", name: "Amazon Depot Seattle", city: "Seattle", state: "WA", lat: 47.6062, lng: -122.3321, timezone: "America/Los_Angeles", pricingUnit: "kWh", idleFee: 0.30, commissioned: true, smartCharging: true },
];

const siteControllers = [
  { id: "SC-001", name: "Autodesk HQ Controller", location: "Autodesk HQ Garage", peakCapacity: 150, inverterPower: 50, batteryCapacity: 100, stations: 8, currentLoad: 67.3, availability: "ONLINE", lastComm: "03/26/2026 07:52", loadControl: "SKY", meterInterval: 5 },
  { id: "SC-002", name: "BMW Welt Energy Mgr", location: "BMW Welt Charging Hub", peakCapacity: 500, inverterPower: 200, batteryCapacity: 400, stations: 24, currentLoad: 312.5, availability: "ONLINE", lastComm: "03/26/2026 07:53", loadControl: "SKY", meterInterval: 3 },
  { id: "SC-003", name: "Amazon Depot SC", location: "Amazon Depot Seattle", peakCapacity: 300, inverterPower: 100, batteryCapacity: 200, stations: 16, currentLoad: 0.0, availability: "OFFLINE", lastComm: "03/25/2026 23:10", loadControl: "Site Controller", meterInterval: 5 },
  { id: "SC-004", name: "Nanaimo Controller", location: "Nanaimo City Hall", peakCapacity: 75, inverterPower: 0, batteryCapacity: 0, stations: 4, currentLoad: 22.1, availability: "ONLINE", lastComm: "03/26/2026 07:50", loadControl: "SKY", meterInterval: 10 },
];

const chargeStations = [
  { id: 1001, name: "Autodesk-CS-01", chargeBoxId: "GLAUTODESK001", enterprise: "Autodesk", location: "Autodesk HQ Garage", status: "Available", model: "CT4021-GW", created: "01/15/2024" },
  { id: 1002, name: "Autodesk-CS-02", chargeBoxId: "GLAUTODESK002", enterprise: "Autodesk", location: "Autodesk HQ Garage", status: "Charging", model: "CT4021-GW", created: "01/15/2024" },
  { id: 1003, name: "BMW-DCFC-01", chargeBoxId: "SREU_BMW_001", enterprise: "BMW Group", location: "BMW Welt Charging Hub", status: "Available", model: "Terra HP 175", created: "06/20/2024" },
  { id: 1004, name: "BMW-DCFC-02", chargeBoxId: "SREU_BMW_002", enterprise: "BMW Group", location: "BMW Welt Charging Hub", status: "Faulted", model: "Terra HP 175", created: "06/20/2024" },
  { id: 1005, name: "testStation01", chargeBoxId: "DEVTEST001", enterprise: "DevrajDEVEE", location: "Dev Test Location 1", status: "Unavailable", model: "VersiCharge Gen3", created: "03/01/2026" },
  { id: 1006, name: "Devraj_charger1", chargeBoxId: "DEVCHARGER01", enterprise: "DevrajDEVEE", location: "Dev Test Location 1", status: "Available", model: "GEN4 180kW", created: "03/10/2026" },
  { id: 1007, name: "AmazonDep-01", chargeBoxId: "ELAM_AMZ_001", enterprise: "CVSK AMAZON WAREHOUSE", location: "Amazon Depot Seattle", status: "Charging", model: "City Charger 200kW", created: "09/01/2025" },
];

const pricePlans = [
  { id: 1, name: "bktbvkh", network: "green_op18615", enterprise: "greens_enterprise18615", version: 1, effectiveFrom: "03/25/2026", updatedBy: "admin", inUse: false, status: "Draft+" },
  { id: 2, name: "DevrajSingapoorPP", network: "DevrajDEVNWO", enterprise: "DevrajDEVEE", version: 3, effectiveFrom: "03/24/2026", updatedBy: "admin", inUse: true, status: "Published" },
  { id: 3, name: "SanketPPTOU", network: "$$SanketMohalkar", enterprise: "$$SanketEnp", version: 8, effectiveFrom: "03/24/2026", updatedBy: "admin", inUse: true, status: "Published" },
  { id: 4, name: "AkT", network: "$AKTest", enterprise: "NA", version: 1, effectiveFrom: "03/24/2026", updatedBy: "admin", inUse: true, status: "Published" },
  { id: 5, name: "Mitanshu_idle_fee", network: "YashasOperator", enterprise: "YashasEnterprise", version: 2, effectiveFrom: "03/23/2026", updatedBy: "admin", inUse: false, status: "Published" },
  { id: 6, name: "YashasPricePlan", network: "YashasOperator", enterprise: "YashasEnterprise", version: 3, effectiveFrom: "03/23/2026", updatedBy: "admin", inUse: false, status: "Published" },
];

const subscriptionPlans = [
  { id: 1, name: "FordPass Charging", type: "RETAIL", startDate: "09/20/2023", endDate: "12/31/2026", fee: 12.99, cycle: "MONTHLY", term: 12 },
  { id: 2, name: "Electric Avenue Monthly Plan", type: "INCENTIVE", startDate: "05/14/2024", endDate: "05/14/2027", fee: 0.00, cycle: "MONTHLY", term: 36 },
  { id: 3, name: "Subscription_Dev_te", type: "RETAIL", startDate: "05/14/2024", endDate: "05/01/2026", fee: 9.99, cycle: "MONTHLY", term: 24 },
  { id: 4, name: "TestSubscriptionSan", type: "RETAIL", startDate: "05/28/2025", endDate: "06/30/2025", fee: 25.00, cycle: "WEEKLY", term: 4 },
  { id: 5, name: "devSMSP01", type: "INCENTIVE", startDate: "06/13/2025", endDate: "06/30/2025", fee: 0.00, cycle: "WEEKLY", term: 2 },
];

/* ─── feature flag labels ─── */
const featureFlags = {
  insight: "Insight Access", firmware: "Firmware Management", demandResponse: "Demand Response 2.0",
  driverMaxPrice: "Driver Max Price Access", smartFleet: "Smart Fleet Access", alerts: "Alerts & Notifications",
  flexCharge: "Flex Charge Manager", chargerGroup: "Charger Group", price360: "Price360 Pricing",
  pricePlan: "Price Plan", oneMPS: "OneMPS Pricing", idleFeeStatus: "Idle Fee on Status Notification",
  fleetDashboard: "Fleet Dashboard", subscription: "Subscription Plan", reservation: "Enable Reservation"
};

/* ─── UI components ─── */
const StatusBadge = ({ status }) => {
  const colors = {
    "Available": "bg-green-100 text-green-700",
    "Charging": "bg-blue-100 text-blue-700",
    "Faulted": "bg-red-100 text-red-700",
    "Unavailable": "bg-gray-100 text-gray-500",
    "Published": "bg-teal-100 text-teal-700",
    "Draft+": "bg-amber-100 text-amber-700",
    "Draft": "bg-gray-100 text-gray-500",
    "Active": "bg-green-100 text-green-700",
    "ONLINE": "bg-green-100 text-green-700",
    "OFFLINE": "bg-red-100 text-red-700",
    "RETAIL": "bg-purple-100 text-purple-700",
    "INCENTIVE": "bg-cyan-100 text-cyan-700",
  };
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status] || "bg-gray-100 text-gray-600"}`}>
      {status}
    </span>
  );
};

const StatusDot = ({ status }) => {
  const c = { Available: "bg-green-500", Charging: "bg-blue-500", Faulted: "bg-red-500", Unavailable: "bg-gray-400" };
  return <span className={`inline-block w-2.5 h-2.5 rounded-full mr-2 ${c[status]||"bg-gray-400"}`} />;
};

const DataTable = ({ columns, data, renderRow }) => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            {columns.map((col, i) => (
              <th key={i} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">{col}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {data.map((row, i) => renderRow(row, i))}
        </tbody>
      </table>
    </div>
    <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
      <span>Items per page: 10</span>
      <span>1 – {data.length} of {data.length}</span>
      <div className="flex gap-1">
        <button className="p-1 rounded hover:bg-gray-100"><ChevronLeft size={16} /></button>
        <button className="p-1 rounded hover:bg-gray-100"><ChevronRight size={16} /></button>
      </div>
    </div>
  </div>
);

const PageHeader = ({ title, onAdd, addLabel }) => (
  <div className="mb-6">
    <h1 className="text-2xl font-light text-gray-800 text-center mb-6">{title}</h1>
    <div className="flex items-center gap-3 mb-4">
      <div className="relative flex-1 max-w-sm">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input className="w-full pl-10 pr-4 py-2 border-b-2 border-gray-300 focus:border-teal-500 outline-none bg-transparent text-sm" placeholder="Search..." />
      </div>
      {onAdd && (
        <button onClick={onAdd} className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-white rounded text-sm font-medium hover:bg-teal-600 transition-colors">
          <Plus size={16} /> {addLabel || "ADD"}
        </button>
      )}
    </div>
  </div>
);

const ActionBtns = () => (
  <div className="flex items-center gap-1">
    <button className="p-1.5 rounded hover:bg-gray-100 text-gray-400 hover:text-teal-600"><Edit2 size={14}/></button>
    <button className="p-1.5 rounded hover:bg-gray-100 text-gray-400 hover:text-red-500"><Trash2 size={14}/></button>
    <button className="p-1.5 rounded hover:bg-gray-100 text-gray-400 hover:text-gray-600"><MoreVertical size={14}/></button>
  </div>
);

/* ─── Page Components ─── */
const NetworkOperatorPage = () => (
  <div>
    <PageHeader title="Network Operators" addLabel="ADD OPERATOR" onAdd={()=>{}} />
    <DataTable
      columns={["Name","Contact Person","Phone","Country","Currency","Legal Entity","Features","Status","Actions"]}
      data={networkOperators}
      renderRow={(r,i) => (
        <tr key={i} className="hover:bg-gray-50">
          <td className="px-4 py-3 text-sm font-medium text-teal-600 cursor-pointer hover:underline">{r.name}</td>
          <td className="px-4 py-3 text-sm text-gray-700">{r.contact}</td>
          <td className="px-4 py-3 text-sm text-gray-500">{r.phone}</td>
          <td className="px-4 py-3 text-sm text-gray-700">{r.country}, {r.state}</td>
          <td className="px-4 py-3 text-sm text-gray-700">{r.currency}</td>
          <td className="px-4 py-3 text-sm text-gray-500">{r.legalEntity}</td>
          <td className="px-4 py-3">
            <div className="flex flex-wrap gap-1">
              {r.features.slice(0,3).map((f,j) => <span key={j} className="px-1.5 py-0.5 bg-teal-50 text-teal-700 rounded text-xs">{featureFlags[f]?.split(" ")[0]}</span>)}
              {r.features.length > 3 && <span className="px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded text-xs">+{r.features.length-3}</span>}
            </div>
          </td>
          <td className="px-4 py-3"><StatusBadge status={r.status}/></td>
          <td className="px-4 py-3"><ActionBtns/></td>
        </tr>
      )}
    />
  </div>
);

const ChargeStationMakePage = () => (
  <div>
    <PageHeader title="Charge Station Makes" addLabel="ADD MAKE" onAdd={()=>{}} />
    <DataTable
      columns={["Name","Short Name","Address","Actions"]}
      data={chargeStationMakes}
      renderRow={(r,i) => (
        <tr key={i} className="hover:bg-gray-50">
          <td className="px-4 py-3 text-sm font-medium text-teal-600">{r.name}</td>
          <td className="px-4 py-3 text-sm text-gray-700">{r.shortName}</td>
          <td className="px-4 py-3 text-sm text-gray-500">{r.address}</td>
          <td className="px-4 py-3"><ActionBtns/></td>
        </tr>
      )}
    />
  </div>
);

const PortLevelPage = () => (
  <div>
    <PageHeader title="Port Levels" addLabel="ADD LEVEL" onAdd={()=>{}} />
    <DataTable
      columns={["Level","Connector Name","Voltage (V)","Current (A)","Power (kW)","Actions"]}
      data={portLevels}
      renderRow={(r,i) => (
        <tr key={i} className="hover:bg-gray-50">
          <td className="px-4 py-3 text-sm font-medium text-gray-800">{r.level}</td>
          <td className="px-4 py-3 text-sm text-gray-700">{r.connector}</td>
          <td className="px-4 py-3 text-sm text-gray-700 font-mono">{r.voltage}</td>
          <td className="px-4 py-3 text-sm text-gray-700 font-mono">{r.current}</td>
          <td className="px-4 py-3 text-sm font-medium text-gray-800 font-mono">{r.power}</td>
          <td className="px-4 py-3"><ActionBtns/></td>
        </tr>
      )}
    />
  </div>
);

const ChargeStationModelPage = () => (
  <div>
    <PageHeader title="Charge Station Models" addLabel="ADD MODEL" onAdd={()=>{}} />
    <DataTable
      columns={["Charge Station Make","Model Name","No. Of Port","Protocol","Actions"]}
      data={chargeStationModels}
      renderRow={(r,i) => (
        <tr key={i} className="hover:bg-gray-50">
          <td className="px-4 py-3 text-sm text-gray-700">{r.make}</td>
          <td className="px-4 py-3 text-sm font-medium text-teal-600">{r.model}</td>
          <td className="px-4 py-3 text-sm text-gray-700 text-center">{r.ports}</td>
          <td className="px-4 py-3"><span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded text-xs font-mono">{r.protocol}</span></td>
          <td className="px-4 py-3"><ActionBtns/></td>
        </tr>
      )}
    />
  </div>
);

const EnterprisePage = () => (
  <div>
    <PageHeader title="Enterprises" addLabel="ADD ENTERPRISE" onAdd={()=>{}} />
    <DataTable
      columns={["Network Operator","Enterprise Name","Email","Phone","Actions"]}
      data={enterprises}
      renderRow={(r,i) => (
        <tr key={i} className="hover:bg-gray-50">
          <td className="px-4 py-3 text-sm text-gray-500">{r.networkOp}</td>
          <td className="px-4 py-3 text-sm font-medium text-teal-600">{r.name}</td>
          <td className="px-4 py-3 text-sm text-gray-500">{r.email}</td>
          <td className="px-4 py-3 text-sm text-gray-500">{r.phone}</td>
          <td className="px-4 py-3"><ActionBtns/></td>
        </tr>
      )}
    />
  </div>
);

const LocationPage = () => (
  <div>
    <PageHeader title="Locations" addLabel="ADD LOCATION" onAdd={()=>{}} />
    <DataTable
      columns={["Name","Enterprise","City/State","Coordinates","Pricing","Idle Fee","Smart Charging","Commissioned","Actions"]}
      data={locations}
      renderRow={(r,i) => (
        <tr key={i} className="hover:bg-gray-50">
          <td className="px-4 py-3 text-sm font-medium text-teal-600">{r.name}</td>
          <td className="px-4 py-3 text-sm text-gray-500">{r.enterprise}</td>
          <td className="px-4 py-3 text-sm text-gray-700">{r.city}, {r.state}</td>
          <td className="px-4 py-3 text-xs text-gray-400 font-mono">{r.lat.toFixed(4)}, {r.lng.toFixed(4)}</td>
          <td className="px-4 py-3"><span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">{r.pricingUnit}</span></td>
          <td className="px-4 py-3 text-sm text-gray-700">${r.idleFee.toFixed(2)}</td>
          <td className="px-4 py-3">{r.smartCharging ? <Check size={16} className="text-green-500"/> : <X size={16} className="text-gray-300"/>}</td>
          <td className="px-4 py-3">{r.commissioned ? <StatusBadge status="Active"/> : <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-500">Pending</span>}</td>
          <td className="px-4 py-3"><ActionBtns/></td>
        </tr>
      )}
    />
  </div>
);

const SiteControllerPage = () => (
  <div>
    <PageHeader title="Site Controllers" addLabel="ADD SITE CONTROLLER" onAdd={()=>{}} />
    <DataTable
      columns={["ID","Name","Location","Peak (kW)","Current Load","Stations","Load Control","Availability","Last Comm","Actions"]}
      data={siteControllers}
      renderRow={(r,i) => (
        <tr key={i} className="hover:bg-gray-50">
          <td className="px-4 py-3 text-sm font-mono text-gray-600">{r.id}</td>
          <td className="px-4 py-3 text-sm font-medium text-teal-600">{r.name}</td>
          <td className="px-4 py-3 text-sm text-gray-500">{r.location}</td>
          <td className="px-4 py-3 text-sm font-mono text-gray-700">{r.peakCapacity}</td>
          <td className="px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{width:`${Math.min((r.currentLoad/r.peakCapacity)*100,100)}%`, backgroundColor: (r.currentLoad/r.peakCapacity)>0.8 ? '#ef4444' : '#14b8a6'}} />
              </div>
              <span className="text-xs font-mono text-gray-600">{r.currentLoad}</span>
            </div>
          </td>
          <td className="px-4 py-3 text-sm text-center text-gray-700">{r.stations}</td>
          <td className="px-4 py-3"><span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded text-xs">{r.loadControl}</span></td>
          <td className="px-4 py-3"><StatusBadge status={r.availability}/></td>
          <td className="px-4 py-3 text-xs text-gray-400">{r.lastComm}</td>
          <td className="px-4 py-3"><ActionBtns/></td>
        </tr>
      )}
    />
  </div>
);

const ChargeStationsPage = () => (
  <div>
    <PageHeader title="Charge Stations" addLabel="ADD STATION" onAdd={()=>{}} />
    <DataTable
      columns={["Station ID","Name","ChargeBox ID","Enterprise","Location","Model","Status","Created","Actions"]}
      data={chargeStations}
      renderRow={(r,i) => (
        <tr key={i} className="hover:bg-gray-50">
          <td className="px-4 py-3 text-sm font-mono text-gray-500">{r.id}</td>
          <td className="px-4 py-3 text-sm font-medium text-teal-600">{r.name}</td>
          <td className="px-4 py-3 text-sm font-mono text-gray-600">{r.chargeBoxId}</td>
          <td className="px-4 py-3 text-sm text-gray-500">{r.enterprise}</td>
          <td className="px-4 py-3 text-sm text-gray-500">{r.location}</td>
          <td className="px-4 py-3 text-sm text-gray-700">{r.model}</td>
          <td className="px-4 py-3"><div className="flex items-center"><StatusDot status={r.status}/><span className="text-sm text-gray-700">{r.status}</span></div></td>
          <td className="px-4 py-3 text-sm text-gray-400">{r.created}</td>
          <td className="px-4 py-3"><ActionBtns/></td>
        </tr>
      )}
    />
  </div>
);

const PricePlansPage = () => (
  <div>
    <PageHeader title="Price Plans" addLabel="ADD PLANS" onAdd={()=>{}} />
    <DataTable
      columns={["Name","Network","Enterprise","Effective Version","Effective From","Updated By","In Use","Status","Action"]}
      data={pricePlans}
      renderRow={(r,i) => (
        <tr key={i} className="hover:bg-gray-50">
          <td className="px-4 py-3 text-sm font-medium text-teal-600 cursor-pointer hover:underline">{r.name}</td>
          <td className="px-4 py-3 text-sm text-gray-500">{r.network}</td>
          <td className="px-4 py-3 text-sm text-gray-500">{r.enterprise}</td>
          <td className="px-4 py-3 text-sm text-center text-gray-700">{r.version}</td>
          <td className="px-4 py-3 text-sm text-gray-500">{r.effectiveFrom}</td>
          <td className="px-4 py-3 text-sm text-gray-500">{r.updatedBy}</td>
          <td className="px-4 py-3 text-sm text-gray-700">{r.inUse ? "Yes" : "No"}</td>
          <td className="px-4 py-3"><StatusBadge status={r.status}/></td>
          <td className="px-4 py-3"><ActionBtns/></td>
        </tr>
      )}
    />
  </div>
);

const SubscriptionPlansPage = () => (
  <div>
    <PageHeader title="Subscription Plans" addLabel="ADD SUBSCRIPTION" onAdd={()=>{}} />
    <DataTable
      columns={["Name","Type","Start Date","End Date","Fee","Cycle","Term","Action"]}
      data={subscriptionPlans}
      renderRow={(r,i) => (
        <tr key={i} className="hover:bg-gray-50">
          <td className="px-4 py-3 text-sm font-medium text-teal-600 cursor-pointer hover:underline">{r.name}</td>
          <td className="px-4 py-3"><StatusBadge status={r.type}/></td>
          <td className="px-4 py-3 text-sm text-gray-500">{r.startDate}</td>
          <td className="px-4 py-3 text-sm text-gray-500">{r.endDate}</td>
          <td className="px-4 py-3 text-sm font-medium text-gray-800">${r.fee.toFixed(2)}</td>
          <td className="px-4 py-3"><span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">{r.cycle}</span></td>
          <td className="px-4 py-3 text-sm text-gray-700">{r.term}</td>
          <td className="px-4 py-3"><ActionBtns/></td>
        </tr>
      )}
    />
  </div>
);

/* ─── navigation config ─── */
const navItems = [
  { key: "network-operator", label: "Network Operator", icon: Globe, component: NetworkOperatorPage },
  { key: "charge-station-make", label: "Charge Station Make", icon: Building2, component: ChargeStationMakePage },
  { key: "port-level", label: "Port Level", icon: Zap, component: PortLevelPage },
  { key: "charge-station-model", label: "Charge Station Model", icon: Cpu, component: ChargeStationModelPage },
  { key: "enterprise", label: "Enterprise", icon: Users, component: EnterprisePage },
  { key: "location", label: "Location", icon: MapPin, component: LocationPage },
  { key: "site-controller", label: "Site Controller", icon: Server, component: SiteControllerPage },
  { key: "charge-stations", label: "Charge Stations", icon: PlugZap, component: ChargeStationsPage },
  { key: "price-plans", label: "Price Plans", icon: DollarSign, component: PricePlansPage },
  { key: "subscription-plans", label: "Subscription Plans", icon: Tag, component: SubscriptionPlansPage },
];

/* ─── main app ─── */
export default function App() {
  const [activePage, setActivePage] = useState("network-operator");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const ActiveComponent = navItems.find(n => n.key === activePage)?.component || NetworkOperatorPage;

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? "w-60" : "w-16"} bg-white border-r border-gray-200 flex flex-col transition-all duration-200 flex-shrink-0`}>
        {/* Logo */}
        <div className="h-14 flex items-center px-4 border-b border-gray-100">
          {sidebarOpen ? (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-gradient-to-br from-yellow-400 to-red-500 flex items-center justify-center">
                <Zap size={16} className="text-white" />
              </div>
              <div className="leading-tight">
                <div className="text-sm font-bold text-gray-800">Shell Recharge</div>
                <div className="text-xs text-gray-400">Admin Portal</div>
              </div>
            </div>
          ) : (
            <div className="w-8 h-8 rounded bg-gradient-to-br from-yellow-400 to-red-500 flex items-center justify-center mx-auto">
              <Zap size={16} className="text-white" />
            </div>
          )}
        </div>

        {/* Toggle */}
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 mx-2 mt-2 rounded hover:bg-gray-100 text-gray-400 self-end">
          {sidebarOpen ? <ChevronLeft size={16}/> : <Menu size={16}/>}
        </button>

        {/* Nav items */}
        <nav className="flex-1 overflow-y-auto px-2 py-1">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activePage === item.key;
            return (
              <button
                key={item.key}
                onClick={() => setActivePage(item.key)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg mb-0.5 text-left transition-colors ${
                  isActive
                    ? "bg-teal-50 text-teal-700 border-l-3 border-teal-500"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
                }`}
                title={item.label}
              >
                <Icon size={18} className={isActive ? "text-teal-600" : "text-gray-400"} />
                {sidebarOpen && <span className="text-sm font-medium truncate">{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-gray-100 p-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center">
              <span className="text-xs font-bold text-teal-700">A</span>
            </div>
            {sidebarOpen && (
              <div className="leading-tight">
                <div className="text-sm font-medium text-gray-700">admin</div>
                <div className="text-xs text-gray-400">v1.0.0-10282-dev</div>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Top bar */}
        <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-10">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="text-gray-400">Admin</span>
            <ChevronRight size={14} className="text-gray-300"/>
            <span className="text-gray-700 font-medium">{navItems.find(n=>n.key===activePage)?.label}</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-full hover:bg-gray-100 text-gray-400"><Settings size={18}/></button>
            <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center">
              <span className="text-xs font-bold text-white">A</span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <div className="p-6 max-w-7xl mx-auto">
          <ActiveComponent />
        </div>
      </main>
    </div>
  );
}
