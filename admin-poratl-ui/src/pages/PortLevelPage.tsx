import React, { useMemo, useState } from 'react';
import { mockPortLevels } from '../mocks/legacyEntities';
import type { PortLevel } from '../types/legacyEntities';
import { TableActionIconButton } from '../components/ui/TableActionIconButton';

type View = 'list' | 'form' | 'view';

interface FormData {
  level: string;
  connectorName: string;
  voltageV: number | '';
  currentA: number | '';
  powerKw: number | '';
}

const emptyForm: FormData = {
  level: '',
  connectorName: '',
  voltageV: '',
  currentA: '',
  powerKw: '',
};

export default function PortLevelPage() {
  const [view, setView] = useState<View>('list');
  const [portLevels, setPortLevels] = useState<PortLevel[]>(mockPortLevels);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>(emptyForm);

  const selectedLevel = useMemo(
    () => portLevels.find((level) => level.levelId === selectedId) ?? null,
    [portLevels, selectedId]
  );

  const filteredLevels = useMemo(() => {
    return portLevels.filter((level) =>
      level.connectorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      level.level.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [portLevels, searchTerm]);

  const stats = useMemo(() => {
    const total = portLevels.length;
    const maxPower = portLevels.length > 0 ? Math.max(...portLevels.map((p) => p.powerKw)) : 0;
    const minVoltage = portLevels.length > 0 ? Math.min(...portLevels.map((p) => p.voltageV)) : 0;
    const maxVoltage = portLevels.length > 0 ? Math.max(...portLevels.map((p) => p.voltageV)) : 0;

    return {
      total,
      maxPower,
      voltageRange: `${minVoltage}-${maxVoltage}`,
    };
  }, [portLevels]);

  const handleInputChange = (field: keyof FormData, value: string | number) => {
    const newFormData = { ...formData, [field]: value };

    if (field === 'voltageV' || field === 'currentA') {
      const voltage =
        field === 'voltageV'
          ? typeof value === 'number'
            ? value
            : parseFloat(value as string)
          : typeof newFormData.voltageV === 'number'
            ? newFormData.voltageV
            : parseFloat(newFormData.voltageV as string);

      const current =
        field === 'currentA'
          ? typeof value === 'number'
            ? value
            : parseFloat(value as string)
          : typeof newFormData.currentA === 'number'
            ? newFormData.currentA
            : parseFloat(newFormData.currentA as string);

      if (!Number.isNaN(voltage) && !Number.isNaN(current) && voltage > 0 && current > 0) {
        newFormData.powerKw = Math.round((voltage * current / 1000) * 100) / 100;
      }
    }

    setFormData(newFormData);
  };

  const openAddForm = () => {
    setSelectedId(null);
    setFormData(emptyForm);
    setView('form');
  };

  const openView = (level: PortLevel) => {
    setSelectedId(level.levelId);
    setView('view');
  };

  const openEdit = (level: PortLevel) => {
    setSelectedId(level.levelId);
    setFormData({
      level: level.level,
      connectorName: level.connectorName,
      voltageV: level.voltageV,
      currentA: level.currentA,
      powerKw: level.powerKw,
    });
    setView('form');
  };

  const handleSubmit = () => {
    if (
      !formData.level ||
      !formData.connectorName ||
      formData.voltageV === '' ||
      formData.currentA === '' ||
      formData.powerKw === ''
    ) {
      return;
    }

    if (selectedId) {
      setPortLevels((current) =>
        current.map((level) =>
          level.levelId === selectedId
            ? {
                ...level,
                level: formData.level.trim(),
                connectorName: formData.connectorName.trim(),
                voltageV: Number(formData.voltageV),
                currentA: Number(formData.currentA),
                powerKw: Number(formData.powerKw),
              }
            : level
        )
      );
    } else {
      const newLevel: PortLevel = {
        levelId: `PL-${Date.now()}`,
        level: formData.level.trim(),
        connectorName: formData.connectorName.trim(),
        voltageV: Number(formData.voltageV),
        currentA: Number(formData.currentA),
        powerKw: Number(formData.powerKw),
      };
      setPortLevels((current) => [newLevel, ...current]);
    }

    setFormData(emptyForm);
    setView('list');
    setSelectedId(null);
  };

  const handleCancel = () => {
    setView('list');
    setFormData(emptyForm);
  };

  return (
    <>
      <header className="portal-page-head">
        <div>
          <p className="eyebrow">General</p>
          <h1>Port Level</h1>
          <p className="hero-copy">Define electrical specifications for charging connector types.</p>
        </div>
      </header>

      {view === 'list' && (
        <>
          <section className="stats-grid">
            <div className="stat-card">
              <div className="stat-label">Total Levels</div>
              <div className="stat-value">{stats.total}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Max Power</div>
              <div className="stat-value">{stats.maxPower} kW</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Voltage Range</div>
              <div className="stat-value">{stats.voltageRange} V</div>
            </div>
          </section>

          <section className="single-panel">
            <div className="subscription-filter-bar">
              <input
                type="text"
                className="subscription-search-field"
                placeholder="Search by level or connector name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="primary-button" onClick={openAddForm} type="button">
                + Add Port Level
              </button>
            </div>

            {filteredLevels.length === 0 ? (
              <div className="blank-card">
                <p>No port levels found. Add one to get started.</p>
              </div>
            ) : (
              <div className="subscription-table-wrap">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Level</th>
                      <th>Connector Name</th>
                      <th>Voltage (V)</th>
                      <th>Current (A)</th>
                      <th>Power (kW)</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLevels.map((level) => (
                      <tr key={level.levelId}>
                        <td>{level.level}</td>
                        <td>{level.connectorName}</td>
                        <td>{level.voltageV}</td>
                        <td>{level.currentA}</td>
                        <td>
                          <span className="code-chip">{level.powerKw}</span>
                        </td>
                        <td>
                          <div className="table-row-actions table-action-icons">
                            <TableActionIconButton
                              icon="view"
                              label="View"
                              onClick={() => openView(level)}
                            />
                            <TableActionIconButton
                              icon="edit"
                              label="Edit"
                              onClick={() => openEdit(level)}
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </>
      )}

      {view === 'view' && selectedLevel ? (
        <section className="single-panel">
          <div className="panel-header">
            <h2>{selectedLevel.level}</h2>
            <button className="ghost-button" onClick={() => setView('list')} type="button">
              Back
            </button>
          </div>

          <div className="field-grid">
            <div className="field">
              <label className="section-label">Level</label>
              <div className="subtle-copy">{selectedLevel.level}</div>
            </div>
            <div className="field">
              <label className="section-label">Connector Name</label>
              <div className="subtle-copy">{selectedLevel.connectorName}</div>
            </div>
            <div className="field">
              <label className="section-label">Voltage (V)</label>
              <div className="subtle-copy">{selectedLevel.voltageV}</div>
            </div>
            <div className="field">
              <label className="section-label">Current (A)</label>
              <div className="subtle-copy">{selectedLevel.currentA}</div>
            </div>
            <div className="field">
              <label className="section-label">Power (kW)</label>
              <div className="subtle-copy">{selectedLevel.powerKw}</div>
            </div>
          </div>

          <div className="form-actions">
            <button className="primary-button" onClick={() => openEdit(selectedLevel)} type="button">
              Edit
            </button>
            <button className="ghost-button" onClick={() => setView('list')} type="button">
              Close
            </button>
          </div>
        </section>
      ) : null}

      {view === 'form' && (
        <section className="single-panel">
          <div className="panel-header">
            <h2>{selectedId ? 'Edit Port Level' : 'Add Port Level'}</h2>
          </div>

          <div className="editor-form">
            <div className="field-grid">
              <div className="field">
                <label>
                  Level <span style={{ color: '#d32f2f' }}>*</span>
                </label>
                <input
                  type="text"
                  value={formData.level}
                  onChange={(e) => handleInputChange('level', e.target.value)}
                  placeholder="e.g., Level 1, Level 2"
                />
              </div>

              <div className="field">
                <label>
                  Connector Name <span style={{ color: '#d32f2f' }}>*</span>
                </label>
                <input
                  type="text"
                  value={formData.connectorName}
                  onChange={(e) => handleInputChange('connectorName', e.target.value)}
                  placeholder="e.g., Type 2"
                />
              </div>

              <div className="field">
                <label>
                  Voltage (V) <span style={{ color: '#d32f2f' }}>*</span>
                </label>
                <input
                  type="number"
                  value={formData.voltageV}
                  onChange={(e) => handleInputChange('voltageV', e.target.value ? parseFloat(e.target.value) : '')}
                  placeholder="e.g., 230"
                />
              </div>

              <div className="field">
                <label>
                  Current (A) <span style={{ color: '#d32f2f' }}>*</span>
                </label>
                <input
                  type="number"
                  value={formData.currentA}
                  onChange={(e) => handleInputChange('currentA', e.target.value ? parseFloat(e.target.value) : '')}
                  placeholder="e.g., 32"
                />
              </div>

              <div className="field">
                <label>
                  Power (kW) <span style={{ color: '#d32f2f' }}>*</span>
                </label>
                <input
                  type="number"
                  value={formData.powerKw}
                  onChange={(e) => handleInputChange('powerKw', e.target.value ? parseFloat(e.target.value) : '')}
                  placeholder="Auto-calculated"
                  readOnly
                />
                <small style={{ color: '#666', marginTop: '4px' }}>
                  Auto-calculated from Voltage × Current / 1000
                </small>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button className="primary-button" onClick={handleSubmit} type="button">
              {selectedId ? 'Update' : 'Add'} Port Level
            </button>
            <button className="ghost-button" onClick={handleCancel} type="button">
              Cancel
            </button>
          </div>
        </section>
      )}
    </>
  );
}
