import React, { useMemo, useState } from 'react';
import { TableActionIconButton } from '../components/ui/TableActionIconButton';
import { mockNetworkOperators } from '../mocks/legacyEntities';
import type { NetworkOperator } from '../types/legacyEntities';

type ViewMode = 'list' | 'form' | 'view';

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
});

function countEnabledFeatures(op: NetworkOperator): number {
  const flags = [
    op.insightAccess,
    op.firmwareManagement,
    op.demandResponse,
    op.driverMaxPrice,
    op.smartFleetAccess,
    op.alertsNotifications,
    op.flexChargeManager,
    op.chargerGroup,
    op.price360Pricing,
    op.pricePlanAllowed,
    op.oneMpsPricing,
    op.calculateIdleFeeOnStatus,
    op.fleetDashboard,
    op.enableSubscription,
    op.enableReservation,
  ];
  return flags.filter(Boolean).length;
}

interface FormData {
  operatorName: string;
  contactPerson: string;
  phone: string;
  address: string;
  country: string;
  state: string;
  currencyUnit: string;
  postalCode: string;
  legalEntityName: string;
  subdomain: string;
  taxRegName: string;
  taxRegValue: string;
  insightAccess: boolean;
  firmwareManagement: boolean;
  demandResponse: boolean;
  driverMaxPrice: boolean;
  smartFleetAccess: boolean;
  alertsNotifications: boolean;
  flexChargeManager: boolean;
  chargerGroup: boolean;
  supervisorPaymentLimit: string;
  teamleadPaymentLimit: string;
  agentPaymentLimit: string;
}

const emptyForm: FormData = {
  operatorName: '',
  contactPerson: '',
  phone: '',
  address: '',
  country: '',
  state: '',
  currencyUnit: '',
  postalCode: '',
  legalEntityName: '',
  subdomain: '',
  taxRegName: '',
  taxRegValue: '',
  insightAccess: false,
  firmwareManagement: false,
  demandResponse: false,
  driverMaxPrice: false,
  smartFleetAccess: false,
  alertsNotifications: false,
  flexChargeManager: false,
  chargerGroup: false,
  supervisorPaymentLimit: '',
  teamleadPaymentLimit: '',
  agentPaymentLimit: '',
};

function parseNumber(value: string): number {
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function toFormData(operator: NetworkOperator): FormData {
  return {
    operatorName: operator.operatorName,
    contactPerson: operator.contactPerson,
    phone: operator.phone,
    address: operator.address,
    country: operator.country,
    state: operator.state,
    currencyUnit: operator.currencyUnit,
    postalCode: operator.postalCode,
    legalEntityName: operator.legalEntityName,
    subdomain: operator.subdomain,
    taxRegName: operator.taxRegAttrName,
    taxRegValue: operator.taxRegAttrValue,
    insightAccess: operator.insightAccess,
    firmwareManagement: operator.firmwareManagement,
    demandResponse: operator.demandResponse,
    driverMaxPrice: operator.driverMaxPrice,
    smartFleetAccess: operator.smartFleetAccess,
    alertsNotifications: operator.alertsNotifications,
    flexChargeManager: operator.flexChargeManager,
    chargerGroup: operator.chargerGroup,
    supervisorPaymentLimit: String(operator.supervisorLimit ?? 0),
    teamleadPaymentLimit: String(operator.teamleadLimit ?? 0),
    agentPaymentLimit: String(operator.agentLimit ?? 0),
  };
}

export default function NetworkOperatorPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [operators, setOperators] = useState<NetworkOperator[]>(mockNetworkOperators);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOperatorId, setSelectedOperatorId] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>(emptyForm);

  const selectedOperator = useMemo(
    () => operators.find((operator) => operator.operatorId === selectedOperatorId) ?? null,
    [operators, selectedOperatorId]
  );

  const filteredOperators = useMemo(() => {
    return operators.filter((op) => {
      const query = searchQuery.toLowerCase();
      return (
        op.operatorName.toLowerCase().includes(query) ||
        op.contactPerson.toLowerCase().includes(query)
      );
    });
  }, [operators, searchQuery]);

  const totalOperators = operators.length;
  const activeFeatures = operators.reduce((sum, op) => sum + countEnabledFeatures(op), 0);
  const uniqueCountries = new Set(operators.map((op) => op.country)).size;

  const enabledFeaturesForSelected = useMemo(() => {
    if (!selectedOperator) {
      return [] as string[];
    }
    const flags: Array<[string, boolean]> = [
      ['Insight Access', selectedOperator.insightAccess],
      ['Firmware Management', selectedOperator.firmwareManagement],
      ['Demand Response', selectedOperator.demandResponse],
      ['Driver Max Price', selectedOperator.driverMaxPrice],
      ['Smart Fleet Access', selectedOperator.smartFleetAccess],
      ['Alerts & Notifications', selectedOperator.alertsNotifications],
      ['FlexCharge Manager', selectedOperator.flexChargeManager],
      ['Charger Group', selectedOperator.chargerGroup],
      ['Price360 Pricing', selectedOperator.price360Pricing],
      ['Price Plan Allowed', selectedOperator.pricePlanAllowed],
      ['One MPS Pricing', selectedOperator.oneMpsPricing],
      ['Idle Fee On Status', selectedOperator.calculateIdleFeeOnStatus],
      ['Fleet Dashboard', selectedOperator.fleetDashboard],
      ['Subscription Enabled', selectedOperator.enableSubscription],
      ['Reservation Enabled', selectedOperator.enableReservation],
    ];
    return flags.filter(([, enabled]) => enabled).map(([label]) => label);
  }, [selectedOperator]);

  const openAddOperator = () => {
    setSelectedOperatorId(null);
    setFormData(emptyForm);
    setViewMode('form');
  };

  const openEditOperator = (operator: NetworkOperator) => {
    setSelectedOperatorId(operator.operatorId);
    setFormData(toFormData(operator));
    setViewMode('form');
  };

  const openViewOperator = (operator: NetworkOperator) => {
    setSelectedOperatorId(operator.operatorId);
    setViewMode('view');
  };

  const handleSaveOperator = () => {
    const existingOperator = operators.find((operator) => operator.operatorId === selectedOperatorId) ?? null;

    const inferredSlug = formData.subdomain.trim().toLowerCase().replace(/\s+/g, '-');
    const now = new Date().toISOString();

    const nextOperator: NetworkOperator = {
      operatorId: existingOperator?.operatorId ?? `NO-${Date.now()}`,
      operatorName: formData.operatorName.trim(),
      contactPerson: formData.contactPerson.trim(),
      phone: formData.phone.trim(),
      address: formData.address.trim(),
      country: formData.country.trim(),
      state: formData.state.trim(),
      currencyUnit: formData.currencyUnit.trim(),
      postalCode: formData.postalCode.trim(),
      legalEntityName: formData.legalEntityName.trim(),
      subdomain: formData.subdomain.trim(),
      taxRegAttrName: formData.taxRegName.trim(),
      taxRegAttrValue: formData.taxRegValue.trim(),
      insightAccess: formData.insightAccess,
      firmwareManagement: formData.firmwareManagement,
      demandResponse: formData.demandResponse,
      driverMaxPrice: formData.driverMaxPrice,
      smartFleetAccess: formData.smartFleetAccess,
      alertsNotifications: formData.alertsNotifications,
      flexChargeManager: formData.flexChargeManager,
      chargerGroup: formData.chargerGroup,
      price360Pricing: existingOperator?.price360Pricing ?? false,
      pricePlanAllowed: existingOperator?.pricePlanAllowed ?? false,
      oneMpsPricing: existingOperator?.oneMpsPricing ?? false,
      calculateIdleFeeOnStatus: existingOperator?.calculateIdleFeeOnStatus ?? false,
      fleetDashboard: existingOperator?.fleetDashboard ?? false,
      enableSubscription: existingOperator?.enableSubscription ?? false,
      enableReservation: existingOperator?.enableReservation ?? false,
      autoTaxEnabled: existingOperator?.autoTaxEnabled ?? false,
      supervisorLimit: parseNumber(formData.supervisorPaymentLimit),
      teamleadLimit: parseNumber(formData.teamleadPaymentLimit),
      agentLimit: parseNumber(formData.agentPaymentLimit),
      plugshareSubOperator: existingOperator?.plugshareSubOperator ?? inferredSlug,
      tosUrl: existingOperator?.tosUrl ?? '',
      tosVersion: existingOperator?.tosVersion ?? '1.0',
      createdAt: existingOperator?.createdAt ?? now,
    };

    if (existingOperator) {
      setOperators((current) =>
        current.map((operator) =>
          operator.operatorId === existingOperator.operatorId ? nextOperator : operator
        )
      );
      setSelectedOperatorId(nextOperator.operatorId);
    } else {
      setOperators((current) => [nextOperator, ...current]);
      setSelectedOperatorId(nextOperator.operatorId);
    }

    setFormData(emptyForm);
    setViewMode('list');
  };

  const handleCancelForm = () => {
    setViewMode('list');
    setFormData(emptyForm);
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, type, value } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  return (
    <>
      <header className="portal-page-head">
        <div>
          <p className="eyebrow">General</p>
          <h1>Network Operators</h1>
          <p className="hero-copy">
            Manage the top-level charging network providers and their configuration.
          </p>
        </div>
      </header>

      {viewMode === 'list' && (
        <>
          <section className="stats-grid">
            <div className="stat-card">
              <div className="stat-label">Total Operators</div>
              <div className="stat-value">{totalOperators}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Active Features</div>
              <div className="stat-value">{activeFeatures}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Countries</div>
              <div className="stat-value">{uniqueCountries}</div>
            </div>
          </section>

          <section className="single-panel">
            <div className="subscription-filter-bar">
              <input
                type="text"
                placeholder="Search by operator name or contact person..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="subscription-search-field"
              />
              <button onClick={openAddOperator} className="primary-button" type="button">
                + Add Operator
              </button>
            </div>

            <div className="subscription-table-wrap">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Operator Name</th>
                    <th>Contact Person</th>
                    <th>Country</th>
                    <th>Currency</th>
                    <th>Legal Entity</th>
                    <th>Features</th>
                    <th>ToS Version</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOperators.length === 0 ? (
                    <tr>
                      <td colSpan={8} style={{ textAlign: 'center', padding: '2rem' }}>
                        <div className="blank-card">No operators found</div>
                      </td>
                    </tr>
                  ) : (
                    filteredOperators.map((operator) => (
                      <tr key={operator.operatorId}>
                        <td className="table-cell-name">{operator.operatorName}</td>
                        <td>{operator.contactPerson}</td>
                        <td>{operator.country}</td>
                        <td>{operator.currencyUnit}</td>
                        <td className="table-cell-sub">{operator.legalEntityName}</td>
                        <td>
                          <span className="code-chip">{countEnabledFeatures(operator)} / 15</span>
                        </td>
                        <td>{operator.tosVersion || '1.0'}</td>
                        <td>
                          <div className="table-row-actions table-action-icons">
                            <TableActionIconButton
                              icon="view"
                              label="View"
                              onClick={() => openViewOperator(operator)}
                            />
                            <TableActionIconButton
                              icon="edit"
                              label="Edit"
                              onClick={() => openEditOperator(operator)}
                            />
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}

      {viewMode === 'view' && selectedOperator ? (
        <section className="single-panel">
          <div className="panel-header">
            <h2>{selectedOperator.operatorName}</h2>
            <button className="ghost-button" onClick={() => setViewMode('list')} type="button">
              Back
            </button>
          </div>

          <div className="field-grid">
            <div className="field">
              <label className="section-label">Operator ID</label>
              <div className="subtle-copy">{selectedOperator.operatorId}</div>
            </div>
            <div className="field">
              <label className="section-label">Contact Person</label>
              <div className="subtle-copy">{selectedOperator.contactPerson}</div>
            </div>
            <div className="field">
              <label className="section-label">Country / State</label>
              <div className="subtle-copy">{selectedOperator.country} / {selectedOperator.state || '—'}</div>
            </div>
            <div className="field">
              <label className="section-label">Currency</label>
              <div className="subtle-copy">{selectedOperator.currencyUnit}</div>
            </div>
            <div className="field">
              <label className="section-label">Legal Entity</label>
              <div className="subtle-copy">{selectedOperator.legalEntityName}</div>
            </div>
            <div className="field">
              <label className="section-label">Created</label>
              <div className="subtle-copy">{dateFormatter.format(new Date(selectedOperator.createdAt))}</div>
            </div>
          </div>

          <div className="field" style={{ marginTop: '1rem' }}>
            <label className="section-label">Enabled Features</label>
            <div className="table-role-stack">
              {enabledFeaturesForSelected.length > 0 ? (
                enabledFeaturesForSelected.map((feature) => (
                  <span key={feature} className="role-pill">
                    {feature}
                  </span>
                ))
              ) : (
                <span className="subtle-copy">No features enabled</span>
              )}
            </div>
          </div>

          <div className="form-actions">
            <button
              className="primary-button"
              onClick={() => openEditOperator(selectedOperator)}
              type="button"
            >
              Edit
            </button>
            <button className="ghost-button" onClick={() => setViewMode('list')} type="button">
              Close
            </button>
          </div>
        </section>
      ) : null}

      {viewMode === 'form' ? (
        <section className="single-panel">
          <div className="panel-header">
            <h2>{selectedOperator ? 'Edit Network Operator' : 'Add Network Operator'}</h2>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSaveOperator();
            }}
          >
            <div className="section-label">Basic Information</div>

            <div className="field-grid">
              <div className="field">
                <label>Operator Name *</label>
                <input
                  type="text"
                  name="operatorName"
                  value={formData.operatorName}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div className="field">
                <label>Contact Person *</label>
                <input
                  type="text"
                  name="contactPerson"
                  value={formData.contactPerson}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div className="field">
                <label>Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleFormChange}
                />
              </div>
              <div className="field">
                <label>Address *</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div className="field">
                <label>Country *</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div className="field">
                <label>State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleFormChange}
                />
              </div>
              <div className="field">
                <label>Currency Unit *</label>
                <input
                  type="text"
                  name="currencyUnit"
                  value={formData.currencyUnit}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div className="field">
                <label>Postal Code</label>
                <input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleFormChange}
                />
              </div>
            </div>

            <div className="section-label">Legal & Compliance</div>

            <div className="field-grid">
              <div className="field">
                <label>Legal Entity Name *</label>
                <input
                  type="text"
                  name="legalEntityName"
                  value={formData.legalEntityName}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div className="field">
                <label>Subdomain</label>
                <input
                  type="text"
                  name="subdomain"
                  value={formData.subdomain}
                  onChange={handleFormChange}
                />
              </div>
              <div className="field">
                <label>Tax Registration Name *</label>
                <input
                  type="text"
                  name="taxRegName"
                  value={formData.taxRegName}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div className="field">
                <label>Tax Registration Value *</label>
                <input
                  type="text"
                  name="taxRegValue"
                  value={formData.taxRegValue}
                  onChange={handleFormChange}
                  required
                />
              </div>
            </div>

            <div className="section-label">Feature Flags</div>

            <div className="field-grid">
              <div className="field">
                <label>
                  <input
                    type="checkbox"
                    name="insightAccess"
                    checked={formData.insightAccess}
                    onChange={handleFormChange}
                  />
                  Insight Access
                </label>
              </div>
              <div className="field">
                <label>
                  <input
                    type="checkbox"
                    name="firmwareManagement"
                    checked={formData.firmwareManagement}
                    onChange={handleFormChange}
                  />
                  Firmware Management
                </label>
              </div>
              <div className="field">
                <label>
                  <input
                    type="checkbox"
                    name="demandResponse"
                    checked={formData.demandResponse}
                    onChange={handleFormChange}
                  />
                  Demand Response
                </label>
              </div>
              <div className="field">
                <label>
                  <input
                    type="checkbox"
                    name="driverMaxPrice"
                    checked={formData.driverMaxPrice}
                    onChange={handleFormChange}
                  />
                  Driver Max Price
                </label>
              </div>
              <div className="field">
                <label>
                  <input
                    type="checkbox"
                    name="smartFleetAccess"
                    checked={formData.smartFleetAccess}
                    onChange={handleFormChange}
                  />
                  Smart Fleet Access
                </label>
              </div>
              <div className="field">
                <label>
                  <input
                    type="checkbox"
                    name="alertsNotifications"
                    checked={formData.alertsNotifications}
                    onChange={handleFormChange}
                  />
                  Alerts & Notifications
                </label>
              </div>
              <div className="field">
                <label>
                  <input
                    type="checkbox"
                    name="flexChargeManager"
                    checked={formData.flexChargeManager}
                    onChange={handleFormChange}
                  />
                  FlexCharge Manager
                </label>
              </div>
              <div className="field">
                <label>
                  <input
                    type="checkbox"
                    name="chargerGroup"
                    checked={formData.chargerGroup}
                    onChange={handleFormChange}
                  />
                  Charger Group
                </label>
              </div>
            </div>

            <div className="section-label">Payment Limits</div>

            <div className="field-grid">
              <div className="field">
                <label>Supervisor Payment Limit</label>
                <input
                  type="number"
                  name="supervisorPaymentLimit"
                  value={formData.supervisorPaymentLimit}
                  onChange={handleFormChange}
                  placeholder="0.00"
                />
              </div>
              <div className="field">
                <label>Teamlead Payment Limit</label>
                <input
                  type="number"
                  name="teamleadPaymentLimit"
                  value={formData.teamleadPaymentLimit}
                  onChange={handleFormChange}
                  placeholder="0.00"
                />
              </div>
              <div className="field">
                <label>Agent Payment Limit</label>
                <input
                  type="number"
                  name="agentPaymentLimit"
                  value={formData.agentPaymentLimit}
                  onChange={handleFormChange}
                  placeholder="0.00"
                />
              </div>
            </div>

            <div className="form-actions">
              <button type="button" onClick={handleCancelForm} className="ghost-button">
                Cancel
              </button>
              <button type="submit" className="primary-button">
                {selectedOperator ? 'Update Operator' : 'Create Operator'}
              </button>
            </div>
          </form>
        </section>
      ) : null}
    </>
  );
}
