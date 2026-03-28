import { FormEvent, useEffect, useMemo, useState } from 'react';
import { deleteAdminUser, getAdminUser, resetAdminUserPassword, searchAdminUsers, updateAdminUser } from '../api/adminUsers';
import { PaginationControls } from '../components/PaginationControls';
import { TableSkeleton } from '../components/ui/Skeleton';
import { TableActionIconButton } from '../components/ui/TableActionIconButton';
import { useAuth } from '../contexts/AuthContext';
import { useDebouncedValue } from '../hooks/useDebouncedValue';
import type { AdminUpdateUserRequest, AdminUserDetail, AdminUserSummary } from '../types/admin';

const emptyForm: Omit<AdminUpdateUserRequest, 'address'> & { street?: string; city?: string; state?: string; postalCode?: string; countryIsoCode?: string } = {
  firstName: '',
  lastName: '',
  phoneNumber: '',
  enabled: true,
  street: '',
  city: '',
  state: '',
  postalCode: '',
  countryIsoCode: '',
};

const emptyPageInfo = {
  total: 0,
  limit: 10,
  offset: 0,
  currentPage: 0,
  totalPages: 0,
  hasNext: false,
  hasPrevious: false,
};

export default function AdminUsersPage() {
  const { token } = useAuth();
  const pageSize = 10;
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(0);
  const [users, setUsers] = useState<AdminUserSummary[]>([]);
  const [pageInfo, setPageInfo] = useState(emptyPageInfo);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [selectedUserDetail, setSelectedUserDetail] = useState<AdminUserDetail | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [showPasswordResetModal, setShowPasswordResetModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [formLoading, setFormLoading] = useState(false);

  const debouncedQuery = useDebouncedValue(query);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await searchAdminUsers(token, debouncedQuery, pageSize, page * pageSize);
        setUsers(result.items);
        setPageInfo(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load users');
      } finally {
        setIsLoading(false);
      }
    };

    void fetchUsers();
  }, [token, debouncedQuery, page]);

  useEffect(() => {
    if (!selectedUserId) {
      setSelectedUserDetail(null);
      setForm(emptyForm);
      return;
    }

    const fetchDetail = async () => {
      setFormError(null);
      try {
        const detail = await getAdminUser(token, selectedUserId);
        setSelectedUserDetail(detail);
        setForm({
          firstName: detail.firstName || '',
          lastName: detail.lastName || '',
          phoneNumber: detail.phoneNumber || '',
          enabled: detail.enabled,
          street: detail.street || '',
          city: detail.city || '',
          state: detail.state || '',
          postalCode: detail.postalCode || '',
          countryIsoCode: detail.countryCode || '',
        });
      } catch (err) {
        setFormError(err instanceof Error ? err.message : 'Failed to load user detail');
      }
    };

    void fetchDetail();
  }, [selectedUserId, token]);

  const adminCount = useMemo(() => users.filter((user) => user.roles.includes('SYSTEM_ADMIN')).length, [users]);

  const handleUpdateUser = async (e: FormEvent) => {
    e.preventDefault();
    if (!selectedUserId) return;

    setFormLoading(true);
    setFormError(null);

    try {
      const payload: AdminUpdateUserRequest = {
        firstName: form.firstName,
        lastName: form.lastName,
        phoneNumber: form.phoneNumber,
        enabled: form.enabled,
        address: {
          street: form.street || '',
          city: form.city || '',
          state: form.state || '',
          postalCode: form.postalCode || '',
          countryIsoCode: form.countryIsoCode || '',
        },
      };
      await updateAdminUser(token, selectedUserId, payload);
      setFormError(null);
      // Refresh the list
      const result = await searchAdminUsers(token, debouncedQuery, pageSize, page * pageSize);
      setUsers(result.items);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Failed to update user');
    } finally {
      setFormLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!selectedUserId || !newPassword) return;

    setFormLoading(true);
    setFormError(null);

    try {
      await resetAdminUserPassword(token, selectedUserId, newPassword);
      setNewPassword('');
      setShowPasswordResetModal(false);
      setFormError(null);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Failed to reset password');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteUser = async () => {
    if (!selectedUserId) return;

    setFormLoading(true);
    setFormError(null);

    try {
      await deleteAdminUser(token, selectedUserId);
      setSelectedUserId(null);
      setShowDeleteModal(false);
      // Refresh the list
      const result = await searchAdminUsers(token, debouncedQuery, pageSize, page * pageSize);
      setUsers(result.items);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Failed to delete user');
    } finally {
      setFormLoading(false);
    }
  };

  if (selectedUserDetail) {
    return (
      <>
        <header className="portal-page-head">
          <button className="ghost-button" onClick={() => setSelectedUserId(null)} type="button">
            ← Back to list
          </button>
          <h2>{selectedUserDetail.email}</h2>
        </header>

        <section>
          {formError && <div className="error-message">{formError}</div>}

          <form onSubmit={handleUpdateUser}>
            <fieldset disabled={formLoading}>
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  id="firstName"
                  onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                  type="text"
                  value={form.firstName}
                />
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  id="lastName"
                  onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                  type="text"
                  value={form.lastName}
                />
              </div>

              <div className="form-group">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                  id="phoneNumber"
                  onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
                  type="text"
                  value={form.phoneNumber}
                />
              </div>

              <div className="form-group">
                <label htmlFor="street">Street</label>
                <input
                  id="street"
                  onChange={(e) => setForm({ ...form, street: e.target.value })}
                  type="text"
                  value={form.street}
                />
              </div>

              <div className="form-group">
                <label htmlFor="city">City</label>
                <input
                  id="city"
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  type="text"
                  value={form.city}
                />
              </div>

              <div className="form-group">
                <label htmlFor="state">State</label>
                <input
                  id="state"
                  onChange={(e) => setForm({ ...form, state: e.target.value })}
                  type="text"
                  value={form.state}
                />
              </div>

              <div className="form-group">
                <label htmlFor="postalCode">Postal Code</label>
                <input
                  id="postalCode"
                  onChange={(e) => setForm({ ...form, postalCode: e.target.value })}
                  type="text"
                  value={form.postalCode}
                />
              </div>

              <div className="form-group">
                <label htmlFor="countryIsoCode">Country</label>
                <input
                  id="countryIsoCode"
                  onChange={(e) => setForm({ ...form, countryIsoCode: e.target.value })}
                  type="text"
                  value={form.countryIsoCode}
                />
              </div>

              <div className="form-group">
                <label htmlFor="enabled">
                  <input
                    id="enabled"
                    checked={form.enabled}
                    onChange={(e) => setForm({ ...form, enabled: e.target.checked })}
                    type="checkbox"
                  />
                  Enabled
                </label>
              </div>

              <div className="form-actions">
                <button className="primary-button" type="submit">
                  Save Changes
                </button>
                <button className="ghost-button" onClick={() => setShowPasswordResetModal(true)} type="button">
                  Reset Password
                </button>
                <button className="ghost-button danger" onClick={() => setShowDeleteModal(true)} type="button">
                  Delete Account
                </button>
              </div>
            </fieldset>
          </form>

          {showPasswordResetModal && (
            <div className="modal-overlay" onClick={() => setShowPasswordResetModal(false)}>
              <div className="modal" onClick={(e) => e.stopPropagation()}>
                <h3>Reset Password</h3>
                <input
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="New password"
                  type="password"
                  value={newPassword}
                />
                <div style={{ marginTop: '1rem' }}>
                  <button className="primary-button" disabled={formLoading} onClick={handleResetPassword} type="button">
                    Confirm Reset
                  </button>
                  <button className="ghost-button" onClick={() => setShowPasswordResetModal(false)} type="button">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {showDeleteModal && (
            <div className="modal-overlay" onClick={() => setShowDeleteModal(false)}>
              <div className="modal" onClick={(e) => e.stopPropagation()}>
                <h3>Delete Account</h3>
                <p>Are you sure? This action cannot be undone.</p>
                <div style={{ marginTop: '1rem' }}>
                  <button className="danger-button" disabled={formLoading} onClick={handleDeleteUser} type="button">
                    Delete
                  </button>
                  <button className="ghost-button" onClick={() => setShowDeleteModal(false)} type="button">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>
      </>
    );
  }

  return (
    <>
      <header className="portal-page-head">
        <div>
          <p className="eyebrow">Admin Management</p>
          <h1>Admin Users</h1>
          <p className="hero-copy">Manage system administrator accounts</p>
        </div>
      </header>

      <section className="stats-grid">
        <article className="stat-card">
          <span>Total</span>
          <strong>{pageInfo.total}</strong>
          <small>Total admin users</small>
        </article>
        <article className="stat-card warm">
          <span>System Admins</span>
          <strong>{adminCount}</strong>
          <small>Admin seats</small>
        </article>
      </section>

      <section className="single-panel">
        {error ? <p className="error-banner">{error}</p> : null}

        <div className="panel-header subscription-page-head">
          <div>
            <p className="section-label">Admin Users</p>
            <h2>Admin user list</h2>
            <p className="subtle-copy">Manage administrator access and account details.</p>
          </div>
          <span className="count-chip">{pageInfo.total}</span>
        </div>

        <div className="subscription-filter-bar">
          <label className="field subscription-search-field">
            <span>Search admin users</span>
            <input
              onChange={(event) => {
                setQuery(event.target.value);
                setPage(0);
              }}
              placeholder="Find by email, name, or phone"
              type="search"
              value={query}
            />
          </label>
        </div>

        <div className="subscription-table-wrap">
          {isLoading ? <TableSkeleton rows={6} cols={6} /> : null}
          {!isLoading && users.length === 0 ? (
            <div className="blank-card">
              <h3>No admin users found</h3>
              <p>Try a broader search term to bring more accounts into view.</p>
            </div>
          ) : null}
          {!isLoading && users.length > 0 ? (
            <table className="data-table admin-user-roster-table">
              <colgroup>
                <col className="col-admin-user" />
                <col className="col-admin-phone" />
                <col className="col-admin-status" />
                <col className="col-admin-roles" />
                <col className="col-admin-created" />
                <col className="col-admin-actions" />
              </colgroup>
              <thead>
                <tr>
                  <th>User</th>
                  <th>Phone</th>
                  <th>Status</th>
                  <th>Roles</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.userId}>
                    <td>
                      <div className="table-cell-name">
                        <strong>{displayName(user)}</strong>
                        <p className="subtle-copy table-cell-sub">{user.email}</p>
                      </div>
                    </td>
                    <td>{user.phoneNumber || 'Not provided'}</td>
                    <td>
                      <span className={`status-pill ${user.enabled ? 'enabled' : 'disabled'}`}>
                        {user.enabled ? 'Enabled' : 'Disabled'}
                      </span>
                    </td>
                    <td>
                      <div className="table-role-stack">
                        {user.roles.length > 0 ? (
                          user.roles.map((role) => (
                            <span className="role-pill" key={`${user.userId}-${role}`}>
                              {humanizeRole(role)}
                            </span>
                          ))
                        ) : (
                          <span className="subtle-copy">No role</span>
                        )}
                      </div>
                    </td>
                    <td>{formatDate(user.createdAt)}</td>
                    <td>
                      <div className="table-row-actions table-action-icons">
                        <TableActionIconButton icon="view" label="View admin user" onClick={() => setSelectedUserId(user.userId)} />
                        <TableActionIconButton icon="edit" label="Edit admin user" onClick={() => setSelectedUserId(user.userId)} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : null}
        </div>

        <PaginationControls onPageChange={setPage} pageInfo={pageInfo} />
      </section>
    </>
  );
}

function displayName(user: Pick<AdminUserSummary, 'firstName' | 'lastName' | 'email'>) {
  const name = `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim();
  if (name) {
    return name;
  }

  return user.email.split('@')[0] ?? user.email;
}

function humanizeRole(role: string) {
  return role.replace(/_/g, ' ');
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(new Date(value));
}
