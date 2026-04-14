import { useState, useMemo } from 'react';
import { mockSiteControllers } from '../mocks/legacyEntities';
import type { SiteController } from '../types/legacyEntities';
import { TableActionIconButton } from '../components/ui/TableActionIconButton';

export default function SiteControllerPage() {
  const [isListView, setIsListView] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({
    siteControllerId: '',
    siteControllerName: '',
    location: '',
    dateCommissioned: '',
    inverterPower: '',
    batteryCapacity: '',
    peakCapacity: '',
    meterReadingInterval: '5',
    loadRamping: true,
    skipCount: '1',
    powerLevelDataInterval: '60',
    loadControl: 'SITE_CONTROLLER',
  });

  const filteredControllers = useMemo(() => {
    return mockSiteControllers.filter((controller) =>
      controller.siteControllerId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      controller.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      controller.locationName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const stats = useMemo(() => {
    return {
      totalControllers: mockSiteControllers.length,
      onlineCount: mockSiteControllers.filter((c) => c.availability === 'ONLINE').length,
      totalPeakCapacity: mockSiteControllers.reduce((sum, c) => sum + (c.peakCapacityKw || 0), 0),
    };
  }, []);

  const dateFormatter = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  const dateOnlyFormatter = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setFormData((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Reset form
    setFormData({
      siteControllerId: '',
      siteControllerName: '',
      location: '',
      dateCommissioned: '',
      inverterPower: '',
      batteryCapacity: '',
      peakCapacity: '',
      meterReadingInterval: '5',
      loadRamping: true,
      skipCount: '1',
      powerLevelDataInterval: '60',
      loadControl: 'SITE_CONTROLLER',
    });
    setIsListView(true);
  };

  return (
    <>
      <header className="portal-page-head">
        <div>
          <p className="eyebrow">Network Operator</p>
          <h1>Site Controllers</h1>
          <p className="hero-copy">
            Manage energy management devices controlling power distribution across charging locations.
          </p>
        </div>
      </header>

      <section className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Total Controllers</div>
          <div className="stat-value">{stats.totalControllers}</div>
        </div>
        <div className="stat-card cool">
          <div className="stat-label">Online</div>
          <div className="stat-value">{stats.onlineCount}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Total Peak Capacity</div>
          <div className="stat-value">{stats.totalPeakCapacity} kW</div>
        </div>
      </section>

      <div className="section-controls">
        <button
          className={`toggle-button ${isListView ? 'active' : ''}`}
          onClick={() => setIsListView(true)}
        >
          List
        </button>
        <button
          className={`toggle-button ${!isListView ? 'active' : ''}`}
          onClick={() => setIsListView(false)}
        >
          Add
        </button>
      </div>

      {isListView && (
        <section className="single-panel">
          <div className="subscription-filter-bar">
            <input
              type="text"
              className="subscription-search-field"
              placeholder="Search by ID, name, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="primary-button" onClick={() => setIsListView(false)}>
              + Add Site Controller
            </button>
          </div>

          {filteredControllers.length === 0 ? (
            <div className="blank-card">
              <p className="subtle-copy">No site controllers found</p>
            </div>
          ) : (
            <div className="subscription-table-wrap">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Controller ID</th>
                    <th>Name</th>
                    <th>Location</th>
                    <th>Peak Capacity (kW)</th>
                    <th>Associated Stations</th>
                    <th>Current Load (kW)</th>
                    <th>Availability</th>
                    <th>Last Communication</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredControllers.map((controller) => (
                    <tr key={controller.siteControllerId}>
                      <td>
                        <span className="code-chip">{controller.siteControllerId}</span>
                      </td>
                      <td className="table-cell-name">{controller.name}</td>
                      <td className="table-cell-sub">{controller.locationName}</td>
                      <td>{controller.peakCapacityKw}</td>
                      <td>{controller.associatedStations || 0}</td>
                      <td>{controller.currentLoadKw || 0}</td>
                      <td>
                        <span
                          className={`status-pill ${
                            controller.availability === 'ONLINE' ? 'enabled' : 'disabled'
                          }`}
                        >
                          {controller.availability}
                        </span>
                      </td>
                      <td className="table-cell-sub">
                        {controller.lastCommunication
                          ? dateFormatter.format(new Date(controller.lastCommunication))
                          : '—'}
                      </td>
                      <td>
                        <div className="table-row-actions table-action-icons">
                          <TableActionIconButton icon="view" label="View" onClick={() => {}} />
                          <TableActionIconButton icon="edit" label="Edit" onClick={() => {}} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      )}

      {!isListView && (
        <section className="single-panel">
          <div className="panel-header">
            <h2>Add Site Controller</h2>
          </div>

          <form className="editor-form" onSubmit={handleSubmit}>
            {/* Basic Info Section */}
            <div className="form-section">
              <h3 className="section-label">Basic Info</h3>
              <div className="field-grid">
                <div className="field">
                  <label htmlFor="siteControllerId">
                    SiteController ID <span className="required">*</span>
                  </label>
                  <input
                    id="siteControllerId"
                    type="text"
                    name="siteControllerId"
                    value={formData.siteControllerId}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="field">
                  <label htmlFor="siteControllerName">
                    SiteController Name <span className="required">*</span>
                  </label>
                  <input
                    id="siteControllerName"
                    type="text"
                    name="siteControllerName"
                    value={formData.siteControllerName}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="field">
                  <label htmlFor="location">
                    Location <span className="required">*</span>
                  </label>
                  <input
                    id="location"
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="field">
                  <label htmlFor="dateCommissioned">
                    Date Commissioned <span className="required">*</span>
                  </label>
                  <input
                    id="dateCommissioned"
                    type="date"
                    name="dateCommissioned"
                    value={formData.dateCommissioned}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Energy Specs Section */}
            <div className="form-section">
              <h3 className="section-label">Energy Specs</h3>
              <div className="field-grid">
                <div className="field">
                  <label htmlFor="inverterPower">
                    Inverter Power (kW) <span className="required">*</span>
                  </label>
                  <input
                    id="inverterPower"
                    type="number"
                    step="0.01"
                    name="inverterPower"
                    value={formData.inverterPower}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="field">
                  <label htmlFor="batteryCapacity">
                    Battery Capacity (kWh) <span className="required">*</span>
                  </label>
                  <input
                    id="batteryCapacity"
                    type="number"
                    step="0.01"
                    name="batteryCapacity"
                    value={formData.batteryCapacity}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="field">
                  <label htmlFor="peakCapacity">
                    Peak Capacity (kW) <span className="required">*</span>
                  </label>
                  <input
                    id="peakCapacity"
                    type="number"
                    step="0.01"
                    name="peakCapacity"
                    value={formData.peakCapacity}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Load Management Section */}
            <div className="form-section">
              <h3 className="section-label">Load Management</h3>
              <div className="field-grid">
                <div className="field">
                  <label htmlFor="meterReadingInterval">
                    Meter Reading Interval (Mins) <span className="required">*</span>
                  </label>
                  <input
                    id="meterReadingInterval"
                    type="number"
                    name="meterReadingInterval"
                    value={formData.meterReadingInterval}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="field">
                  <label htmlFor="skipCount">
                    Skip Count <span className="required">*</span>
                  </label>
                  <input
                    id="skipCount"
                    type="number"
                    name="skipCount"
                    value={formData.skipCount}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="field">
                  <label htmlFor="powerLevelDataInterval">
                    PowerLevelData Interval (Sec) <span className="required">*</span>
                  </label>
                  <input
                    id="powerLevelDataInterval"
                    type="number"
                    name="powerLevelDataInterval"
                    value={formData.powerLevelDataInterval}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="field">
                  <label htmlFor="loadControl">
                    Load Control <span className="required">*</span>
                  </label>
                  <select
                    id="loadControl"
                    name="loadControl"
                    value={formData.loadControl}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="SKY">SKY</option>
                    <option value="SITE_CONTROLLER">SITE_CONTROLLER</option>
                  </select>
                </div>

                <div className="field checkbox-field">
                  <label htmlFor="loadRamping">
                    <input
                      id="loadRamping"
                      type="checkbox"
                      name="loadRamping"
                      checked={formData.loadRamping}
                      onChange={handleInputChange}
                    />
                    Load Ramping
                  </label>
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="form-actions">
              <button type="submit" className="primary-button">
                Save Site Controller
              </button>
              <button
                type="button"
                className="ghost-button"
                onClick={() => setIsListView(true)}
              >
                Cancel
              </button>
            </div>
          </form>
        </section>
      )}
    </>
  );
}
