import { useMemo, useState } from 'react';
import { mockChargeStationMakes } from '../mocks/legacyEntities';
import type { ChargeStationMake } from '../types/legacyEntities';
import { TableActionIconButton } from '../components/ui/TableActionIconButton';

type ViewMode = 'list' | 'view' | 'form';

const emptyForm = {
  name: '',
  shortName: '',
  address: '',
  description: '',
};

export default function ChargeStationMakePage() {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [makes, setMakes] = useState<ChargeStationMake[]>(mockChargeStationMakes);
  const [selectedMakeId, setSelectedMakeId] = useState<string | null>(null);
  const [editingMakeId, setEditingMakeId] = useState<string | null>(null);
  const [formData, setFormData] = useState(emptyForm);

  const selectedMake = useMemo(
    () => makes.find((make) => make.makeId === selectedMakeId) ?? null,
    [makes, selectedMakeId]
  );

  const filteredMakes = useMemo(() => {
    if (!searchQuery.trim()) {
      return makes;
    }
    const query = searchQuery.toLowerCase();
    return makes.filter(
      (make) =>
        make.name.toLowerCase().includes(query) ||
        make.shortName.toLowerCase().includes(query)
    );
  }, [makes, searchQuery]);

  const dateFormatter = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const openAdd = () => {
    setSelectedMakeId(null);
    setEditingMakeId(null);
    setFormData(emptyForm);
    setViewMode('form');
  };

  const openView = (make: ChargeStationMake) => {
    setSelectedMakeId(make.makeId);
    setEditingMakeId(null);
    setViewMode('view');
  };

  const openEdit = (make: ChargeStationMake) => {
    setSelectedMakeId(make.makeId);
    setEditingMakeId(make.makeId);
    setFormData({
      name: make.name,
      shortName: make.shortName,
      address: make.address,
      description: make.description,
    });
    setViewMode('form');
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.shortName.trim() || !formData.address.trim()) {
      return;
    }

    if (editingMakeId) {
      setMakes((current) =>
        current.map((make) =>
          make.makeId === editingMakeId
            ? {
                ...make,
                name: formData.name.trim(),
                shortName: formData.shortName.trim(),
                address: formData.address.trim(),
                description: formData.description.trim(),
              }
            : make
        )
      );
    } else {
      const newMake: ChargeStationMake = {
        makeId: `MK-${Date.now()}`,
        name: formData.name.trim(),
        shortName: formData.shortName.trim(),
        address: formData.address.trim(),
        description: formData.description.trim(),
        createdAt: new Date().toISOString(),
      };
      setMakes((current) => [newMake, ...current]);
    }

    setFormData(emptyForm);
    setSelectedMakeId(null);
    setEditingMakeId(null);
    setViewMode('list');
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => {
    setViewMode('list');
    setFormData(emptyForm);
    setEditingMakeId(null);
  };

  return (
    <>
      <header className="portal-page-head">
        <div>
          <p className="eyebrow">General</p>
          <h1>Charge Station Make</h1>
          <p className="hero-copy">
            Register and manage hardware manufacturers for charging equipment.
          </p>
        </div>
      </header>

      <section className="stats-grid">
        <div className="stat-card">
          <div style={{ fontSize: '32px', fontWeight: 'bold' }}>
            {makes.length}
          </div>
          <div className="subtle-copy">Registered makes</div>
        </div>
      </section>

      {viewMode === 'list' ? (
        <section className="single-panel">
          <div className="panel-header">
            <div className="subscription-filter-bar">
              <input
                type="text"
                placeholder="Search by name or short name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="subscription-search-field"
              />
              <button onClick={openAdd} className="primary-button" type="button">
                Add Manufacturer
              </button>
            </div>
          </div>

          {filteredMakes.length > 0 ? (
            <div className="subscription-table-wrap">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Short Name</th>
                    <th>Address</th>
                    <th>Description</th>
                    <th>Created</th>
                    <th style={{ width: '80px' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMakes.map((make) => (
                    <tr key={make.makeId}>
                      <td className="table-cell-name">{make.name}</td>
                      <td>{make.shortName}</td>
                      <td>{make.address}</td>
                      <td className="subtle-copy">{make.description || '—'}</td>
                      <td className="subtle-copy">
                        {dateFormatter.format(new Date(make.createdAt))}
                      </td>
                      <td>
                        <div className="table-row-actions table-action-icons">
                          <TableActionIconButton
                            icon="view"
                            label="View"
                            onClick={() => openView(make)}
                          />
                          <TableActionIconButton
                            icon="edit"
                            label="Edit"
                            onClick={() => openEdit(make)}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="blank-card">
              <p className="subtle-copy">
                {searchQuery.trim()
                  ? 'No manufacturers match your search.'
                  : 'No manufacturers registered yet.'}
              </p>
            </div>
          )}
        </section>
      ) : null}

      {viewMode === 'view' && selectedMake ? (
        <section className="single-panel">
          <div className="panel-header">
            <h2>{selectedMake.name}</h2>
            <button className="ghost-button" onClick={() => setViewMode('list')} type="button">
              Back
            </button>
          </div>

          <div className="field-grid">
            <div className="field">
              <label className="section-label">Name</label>
              <div className="subtle-copy">{selectedMake.name}</div>
            </div>
            <div className="field">
              <label className="section-label">Short Name</label>
              <div className="subtle-copy">{selectedMake.shortName}</div>
            </div>
            <div className="field">
              <label className="section-label">Address</label>
              <div className="subtle-copy">{selectedMake.address}</div>
            </div>
            <div className="field field-wide">
              <label className="section-label">Description</label>
              <div className="subtle-copy">{selectedMake.description || '—'}</div>
            </div>
            <div className="field">
              <label className="section-label">Created</label>
              <div className="subtle-copy">{dateFormatter.format(new Date(selectedMake.createdAt))}</div>
            </div>
          </div>

          <div className="form-actions">
            <button className="primary-button" onClick={() => openEdit(selectedMake)} type="button">
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
            <h2 style={{ margin: 0 }}>{editingMakeId ? 'Edit Manufacturer' : 'Add New Manufacturer'}</h2>
          </div>

          <form onSubmit={handleSave} className="editor-form">
            <div className="field-grid">
              <div className="field">
                <label>Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  placeholder="e.g., Tesla"
                  required
                />
              </div>

              <div className="field">
                <label>Short Name *</label>
                <input
                  type="text"
                  name="shortName"
                  value={formData.shortName}
                  onChange={handleFormChange}
                  placeholder="e.g., TSL"
                  required
                />
              </div>

              <div className="field">
                <label>Address *</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleFormChange}
                  placeholder="e.g., 1 Tesla Road, Palo Alto, CA 94301"
                  required
                />
              </div>

              <div className="field field-wide">
                <label>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleFormChange}
                  placeholder="Optional manufacturer description..."
                  rows={4}
                />
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="primary-button">
                {editingMakeId ? 'Update Manufacturer' : 'Save Manufacturer'}
              </button>
              <button type="button" onClick={handleCancel} className="ghost-button">
                Cancel
              </button>
            </div>
          </form>
        </section>
      ) : null}
    </>
  );
}
