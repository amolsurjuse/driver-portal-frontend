import { useMemo, useState } from 'react';
import { mockChargeStationModels, mockChargeStationMakes } from '../mocks/legacyEntities';
import type { ChargeStationModel } from '../types/legacyEntities';
import { TableActionIconButton } from '../components/ui/TableActionIconButton';

const emptyForm = {
  makeId: '',
  modelName: '',
  numberOfPorts: 1,
  protocol: 'OCPP16J',
};

export default function ChargeStationModelPage() {
  const [isListView, setIsListView] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [models, setModels] = useState<ChargeStationModel[]>(mockChargeStationModels);
  const [selectedModel, setSelectedModel] = useState<ChargeStationModel | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(emptyForm);

  const filteredModels = useMemo(() => {
    return models.filter(
      (model) =>
        model.modelName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        model.makeName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [models, searchQuery]);

  const stats = useMemo(() => {
    return {
      totalModels: models.length,
      uniqueManufacturers: new Set(models.map((model) => model.makeName)).size,
      ocpp16j: models.filter((model) => model.protocol === 'OCPP16J').length,
    };
  }, [models]);

  const dateFormatter = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const handleAddClick = () => {
    setSelectedModel(null);
    setFormData(emptyForm);
    setIsEditing(true);
    setIsListView(false);
  };

  const handleEditClick = (model: ChargeStationModel) => {
    setSelectedModel(model);
    setFormData({
      makeId: model.makeId,
      modelName: model.modelName,
      numberOfPorts: model.numberOfPorts,
      protocol: model.protocol,
    });
    setIsEditing(true);
    setIsListView(false);
  };

  const handleViewClick = (model: ChargeStationModel) => {
    setSelectedModel(model);
    setIsListView(false);
    setIsEditing(false);
  };

  const handleFormChange = (field: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    const make = mockChargeStationMakes.find((item) => item.makeId === formData.makeId);
    if (!make || !formData.modelName.trim()) {
      return;
    }

    if (selectedModel) {
      const updatedModel: ChargeStationModel = {
        ...selectedModel,
        makeId: make.makeId,
        makeName: make.name,
        modelName: formData.modelName.trim(),
        numberOfPorts: Number(formData.numberOfPorts),
        protocol: formData.protocol,
      };

      setModels((current) =>
        current.map((model) =>
          model.modelId === selectedModel.modelId ? updatedModel : model
        )
      );
      setSelectedModel(updatedModel);
    } else {
      const newModel: ChargeStationModel = {
        modelId: `CM-${Date.now()}`,
        makeId: make.makeId,
        makeName: make.name,
        modelName: formData.modelName.trim(),
        numberOfPorts: Number(formData.numberOfPorts),
        protocol: formData.protocol,
        createdAt: new Date().toISOString(),
      };
      setModels((current) => [newModel, ...current]);
      setSelectedModel(newModel);
    }

    setFormData(emptyForm);
    setIsListView(true);
    setIsEditing(false);
    setSelectedModel(null);
  };

  const handleCancel = () => {
    setIsListView(true);
    setIsEditing(false);
    setSelectedModel(null);
    setFormData(emptyForm);
  };

  return (
    <>
      <header className="portal-page-head">
        <div>
          <p className="eyebrow">General</p>
          <h1>Charge Station Model</h1>
          <p className="hero-copy">
            Manage charger models linking manufacturers to specific hardware configurations and OCPP protocols.
          </p>
        </div>
      </header>

      {isListView && !isEditing && (
        <>
          <section className="stats-grid">
            <div className="stat-card">
              <div className="stat-label">Total Models</div>
              <div className="stat-value">{stats.totalModels}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Manufacturers</div>
              <div className="stat-value">{stats.uniqueManufacturers}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">OCPP16J</div>
              <div className="stat-value">{stats.ocpp16j}</div>
            </div>
          </section>

          <section className="single-panel">
            <div className="subscription-filter-bar">
              <input
                type="text"
                className="subscription-search-field"
                placeholder="Search models or manufacturers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="primary-button" onClick={handleAddClick} type="button">
                Add Model
              </button>
            </div>

            <div className="subscription-table-wrap">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Model Name</th>
                    <th>Charge Station Make</th>
                    <th>No. of Ports</th>
                    <th>Protocol</th>
                    <th>Created</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredModels.length > 0 ? (
                    filteredModels.map((model) => (
                      <tr key={model.modelId}>
                        <td className="table-cell-name">{model.modelName}</td>
                        <td className="table-cell-sub">{model.makeName}</td>
                        <td className="table-cell-sub">{model.numberOfPorts}</td>
                        <td className="table-cell-sub">
                          <span className="code-chip">{model.protocol}</span>
                        </td>
                        <td className="table-cell-sub">
                          {dateFormatter.format(new Date(model.createdAt))}
                        </td>
                        <td>
                          <div className="table-row-actions table-action-icons">
                            <TableActionIconButton
                              icon="view"
                              label="View"
                              onClick={() => handleViewClick(model)}
                            />
                            <TableActionIconButton
                              icon="edit"
                              label="Edit"
                              onClick={() => handleEditClick(model)}
                            />
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="blank-card">
                        <div className="subtle-copy">No charge station models found</div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}

      {!isListView && selectedModel && !isEditing && (
        <section className="single-panel">
          <div className="panel-header">
            <h2>{selectedModel.modelName}</h2>
            <button className="ghost-button" onClick={() => setIsListView(true)} type="button">
              Back
            </button>
          </div>
          <div className="field-grid">
            <div className="field">
              <label className="section-label">Model Name</label>
              <div className="subtle-copy">{selectedModel.modelName}</div>
            </div>
            <div className="field">
              <label className="section-label">Charge Station Make</label>
              <div className="subtle-copy">{selectedModel.makeName}</div>
            </div>
            <div className="field">
              <label className="section-label">No. of Ports</label>
              <div className="subtle-copy">{selectedModel.numberOfPorts}</div>
            </div>
            <div className="field">
              <label className="section-label">Protocol</label>
              <div className="subtle-copy">
                <span className="code-chip">{selectedModel.protocol}</span>
              </div>
            </div>
            <div className="field">
              <label className="section-label">Created</label>
              <div className="subtle-copy">{dateFormatter.format(new Date(selectedModel.createdAt))}</div>
            </div>
          </div>
          <div className="form-actions">
            <button className="primary-button" onClick={() => handleEditClick(selectedModel)} type="button">
              Edit
            </button>
            <button className="ghost-button" onClick={() => setIsListView(true)} type="button">
              Close
            </button>
          </div>
        </section>
      )}

      {isEditing && (
        <section className="single-panel">
          <div className="panel-header">
            <h2>{selectedModel ? 'Edit Model' : 'Add New Model'}</h2>
            <button className="ghost-button" onClick={handleCancel} type="button">
              Cancel
            </button>
          </div>
          <div className="editor-form">
            <div className="field-grid">
              <div className="field">
                <label className="section-label">Charge Station Make *</label>
                <select
                  value={formData.makeId}
                  onChange={(e) => handleFormChange('makeId', e.target.value)}
                >
                  <option value="">Select a manufacturer</option>
                  {mockChargeStationMakes.map((make) => (
                    <option key={make.makeId} value={make.makeId}>
                      {make.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label className="section-label">Model Name *</label>
                <input
                  type="text"
                  value={formData.modelName}
                  onChange={(e) => handleFormChange('modelName', e.target.value)}
                  placeholder="e.g., AC Wall-Mount 22kW"
                />
              </div>
              <div className="field">
                <label className="section-label">No. of Ports *</label>
                <input
                  type="number"
                  min="1"
                  value={formData.numberOfPorts}
                  onChange={(e) =>
                    handleFormChange(
                      'numberOfPorts',
                      e.target.value ? parseInt(e.target.value, 10) : 1
                    )
                  }
                />
              </div>
              <div className="field">
                <label className="section-label">Protocol *</label>
                <select
                  value={formData.protocol}
                  onChange={(e) => handleFormChange('protocol', e.target.value)}
                >
                  <option value="OCPP16J">OCPP16J</option>
                  <option value="OCPP201">OCPP201</option>
                </select>
              </div>
            </div>
          </div>
          <div className="form-actions">
            <button className="primary-button" onClick={handleSave} type="button">
              {selectedModel ? 'Update Model' : 'Create Model'}
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
