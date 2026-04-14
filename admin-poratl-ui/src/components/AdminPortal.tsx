import { FormEvent, useEffect, useMemo, useState } from 'react';
import { deleteAdminUser, getAdminUser, resetAdminUserPassword, searchAdminUsers, searchUsers, updateAdminUser } from '../api/adminUsers';
import { logoutAll } from '../api/auth';
import { useDebouncedValue } from '../hooks/useDebouncedValue';
import { BrandLogo } from './shared/BrandLogo';
import { SubscriptionWorkspace } from './SubscriptionWorkspace';
import type { AdminUpdateUserRequest, AdminUserDetail, AdminUserSummary, JwtPayload, UserSummary } from '../types/admin';

type AdminPortalProps = {
  token: string;
  payload: JwtPayload | null;
  onLogout: () => void;
};

type PortalSection = 'users' | 'adminUsers' | 'subscriptions';
type SidebarIconName = 'users' | 'shield' | 'card' | 'chevron-left' | 'chevron-right';

const emptyForm = {
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

export function AdminPortal({ token, payload, onLogout }: AdminPortalProps) {
  const pageSize = 10;
  const [activeSection, setActiveSection] = useState<PortalSection>('adminUsers');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [usersView, setUsersView] = useState<'list' | 'detail'>('list');
  const [adminUsersView, setAdminUsersView] = useState<'list' | 'detail'>('list');
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(0);
  const [users, setUsers] = useState<AdminUserSummary[]>([]);
  const [total, setTotal] = useState(0);
  const [pageInfo, setPageInfo] = useState(emptyPageInfo);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<AdminUserDetail | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [rosterLoading, setRosterLoading] = useState(true);
  const [detailLoading, setDetailLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [resetDialogOpen, setResetDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [resetPassword, setResetPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [deleteConfirmation, setDeleteConfirmation] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const debouncedQuery = useDebouncedValue(query);

  const activeCount = useMemo(() => users.filter((user) => user.enabled).length, [users]);
  const adminCount = useMemo(() => users.filter((user) => user.roles.includes('SYSTEM_ADMIN')).length, [users]);
  const disabledCount = useMemo(() => users.filter((user) => !user.enabled).length, [users]);
  const navigationItems: Array<{ section: PortalSection; label: string; icon: SidebarIconName }> = [
    { section: 'users', label: 'User', icon: 'users' },
    { section: 'adminUsers', label: 'Admin Users', icon: 'shield' },
    { section: 'subscriptions', label: 'Subscription', icon: 'card' },
  ];
  const sectionMeta: Record<PortalSection, { title: string; description: string; badge: string }> = {
    users: {
      title: 'User Directory',
      description: 'Browse the complete roster, inspect account states, and scan role assignments from one streamlined list.',
      badge: 'User',
    },
    adminUsers: {
      title: 'System Admin User Operations',
      description: 'Search the user roster, edit profile details, rotate passwords, and delete accounts from a dedicated React admin portal.',
      badge: 'Admin Users',
    },
    subscriptions: {
      title: 'Subscription Workspace',
      description: 'Stage the billing and plan management experience in a separate control space that can be wired next.',
      badge: 'Subscription',
    },
  };
  const activeSectionMeta = sectionMeta[activeSection];

  useEffect(() => {
    if (activeSection === 'subscriptions') {
      return;
    }
    void loadRoster(activeSection, debouncedQuery, selectedUserId, page);
  }, [activeSection, debouncedQuery, page]);

  async function loadRoster(
    section: 'users' | 'adminUsers',
    searchValue: string,
    preferredUserId: string | null,
    nextPage: number
  ) {
    setRosterLoading(true);
    setError(null);

    try {
      const response = section === 'users'
        ? await searchUsers(token, searchValue.trim(), pageSize, nextPage * pageSize)
        : await searchAdminUsers(token, searchValue.trim(), pageSize, nextPage * pageSize);
      const normalizedItems = section === 'users'
        ? normalizeRegularUsers(response.items as UserSummary[])
        : (response.items as AdminUserSummary[]);
      setUsers(normalizedItems);
      setTotal(response.total);
      setPageInfo({
        total: response.total,
        limit: response.limit,
        offset: response.offset,
        currentPage: response.currentPage,
        totalPages: response.totalPages,
        hasNext: response.hasNext,
        hasPrevious: response.hasPrevious,
      });

      const nextSelectedUserId = normalizedItems.some((item) => item.userId === preferredUserId)
        ? preferredUserId
        : (normalizedItems[0]?.userId ?? null);

      setSelectedUserId(nextSelectedUserId);

      if (nextSelectedUserId) {
        await loadUser(nextSelectedUserId);
      } else {
        setSelectedUser(null);
        setForm(emptyForm);
      }
    } catch (requestError) {
      setError(extractMessage(requestError, 'Unable to load the user roster.'));
    } finally {
      setRosterLoading(false);
    }
  }

  async function loadUser(userId: string) {
    setDetailLoading(true);

    try {
      const user = await getAdminUser(token, userId);
      setSelectedUser(user);
      setSelectedUserId(user.userId);
      setForm({
        firstName: user.firstName ?? '',
        lastName: user.lastName ?? '',
        phoneNumber: user.phoneNumber ?? '',
        enabled: user.enabled,
        street: user.street ?? '',
        city: user.city ?? '',
        state: user.state ?? '',
        postalCode: user.postalCode ?? '',
        countryIsoCode: user.countryCode ?? '',
      });
    } catch (requestError) {
      setError(extractMessage(requestError, 'Unable to load the selected user.'));
    } finally {
      setDetailLoading(false);
    }
  }

  function updateForm<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedUser) {
      return;
    }

    setSaving(true);
    setError(null);
    setSuccess(null);

    const payloadToSave: AdminUpdateUserRequest = {
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      phoneNumber: form.phoneNumber.trim(),
      enabled: form.enabled,
      address: {
        street: form.street.trim(),
        city: form.city.trim(),
        state: form.state.trim(),
        postalCode: form.postalCode.trim(),
        countryIsoCode: form.countryIsoCode.trim().toUpperCase(),
      },
    };

    try {
      const updated = await updateAdminUser(token, selectedUser.userId, payloadToSave);
      setSelectedUser(updated);
      setSuccess('User profile updated successfully.');
      setUsers((current) =>
        current.map((user) =>
          user.userId === updated.userId
            ? {
                ...user,
                firstName: updated.firstName,
                lastName: updated.lastName,
                phoneNumber: updated.phoneNumber,
                enabled: updated.enabled,
                updatedAt: updated.updatedAt,
                roles: updated.roles,
              }
            : user
        )
      );
    } catch (requestError) {
      setError(extractMessage(requestError, 'Unable to save user changes.'));
    } finally {
      setSaving(false);
    }
  }

  async function handlePasswordReset(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedUser) {
      return;
    }
    if (resetPassword.trim().length < 8) {
      setError('Use at least 8 characters for the new password.');
      return;
    }
    if (resetPassword !== confirmPassword) {
      setError('Password confirmation does not match.');
      return;
    }

    setResetting(true);
    setError(null);
    setSuccess(null);

    try {
      await resetAdminUserPassword(token, selectedUser.userId, resetPassword.trim());
      setResetDialogOpen(false);
      setResetPassword('');
      setConfirmPassword('');
      setSuccess(`Password reset for ${selectedUser.email}.`);
    } catch (requestError) {
      setError(extractMessage(requestError, 'Unable to reset the password.'));
    } finally {
      setResetting(false);
    }
  }

  async function handleDelete(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedUser) {
      return;
    }
    if (deleteConfirmation.trim().toLowerCase() !== selectedUser.email.toLowerCase()) {
      setError('Enter the exact email address to confirm deletion.');
      return;
    }

    setDeleting(true);
    setError(null);
    setSuccess(null);

    try {
      await deleteAdminUser(token, selectedUser.userId);
      setDeleteDialogOpen(false);
      setDeleteConfirmation('');
      setSuccess(`Deleted ${selectedUser.email}.`);
      setPage(0);
      await loadRoster('adminUsers', query, null, 0);
    } catch (requestError) {
      setError(extractMessage(requestError, 'Unable to delete the account.'));
    } finally {
      setDeleting(false);
    }
  }

  async function handleLogout() {
    try {
      await logoutAll(token);
    } catch {
      // Local logout should still proceed even if the backend call fails.
    }
    onLogout();
  }

  async function openUserDetail(userId: string, nextSection: 'users' | 'adminUsers') {
    setError(null);
    setSuccess(null);
    await loadUser(userId);
    if (nextSection === 'users') {
      setUsersView('detail');
    } else {
      setAdminUsersView('detail');
    }
  }

  return (
    <div className="admin-app-shell">
      <header className="admin-top-nav">
        <div className="logo admin-logo">
          <BrandLogo size="header" />
        </div>

        <div className="admin-nav-links">
          <div className="admin-user-menu">
            <span className="user-avatar">{initialsForIdentifier(payload?.sub ?? 'System Admin')}</span>
            <span className="user-name">{displayNameFromIdentifier(payload?.sub ?? 'System Admin')}</span>
          </div>
          <button className="ghost-button" onClick={handleLogout} type="button">
            Log out
          </button>
        </div>
      </header>

      <main className={`admin-content-shell ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        <aside className="admin-left-nav">
          <button
            aria-label={sidebarCollapsed ? 'Expand navigation' : 'Collapse navigation'}
            className="admin-left-nav-user"
            onClick={() => setSidebarCollapsed((current) => !current)}
            title={displayNameFromIdentifier(payload?.sub ?? 'System Admin')}
            type="button"
          >
            <span className="admin-left-nav-user-avatar">{initialsForIdentifier(payload?.sub ?? 'System Admin')}</span>
            <span className="admin-left-nav-user-name">{displayNameFromIdentifier(payload?.sub ?? 'System Admin')}</span>
            <span className="admin-left-nav-toggle" aria-hidden="true">
              <SidebarIcon name={sidebarCollapsed ? 'chevron-right' : 'chevron-left'} />
            </span>
          </button>

          <nav aria-label="Admin portal sections">
            {navigationItems.map((item) => (
              <button
                className={`admin-left-nav-link ${activeSection === item.section ? 'active' : ''}`}
                key={item.section}
                onClick={() => setActiveSection(item.section)}
                title={item.label}
                type="button"
              >
                <span className="admin-left-nav-icon" aria-hidden="true">
                  <SidebarIcon name={item.icon} />
                </span>
                <span className="admin-left-nav-label">{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        <section className="content">
          <header className="portal-page-head">
            <div>
              <p className="eyebrow">Operations cockpit</p>
              <h1>{activeSectionMeta.title}</h1>
              <p className="hero-copy">{activeSectionMeta.description}</p>
            </div>
          </header>

          {activeSection !== 'subscriptions' ? (
            <section className="stats-grid">
              <article className="stat-card">
                <span>Total roster</span>
                <strong>{total}</strong>
                <small>Search result size</small>
              </article>
              <article className="stat-card warm">
                <span>System admins</span>
                <strong>{adminCount}</strong>
                <small>Admin seats in current view</small>
              </article>
              <article className="stat-card cool">
                <span>Active accounts</span>
                <strong>{activeCount}</strong>
                <small>Enabled and available</small>
              </article>
              <article className="stat-card muted">
                <span>Disabled accounts</span>
                <strong>{disabledCount}</strong>
                <small>Require follow-up</small>
              </article>
            </section>
          ) : null}

          {activeSection !== 'subscriptions' && error ? <p className="error-banner">{error}</p> : null}
          {activeSection !== 'subscriptions' && success ? <p className="success-banner">{success}</p> : null}

          <div className="workspace-content">
          {activeSection === 'users' ? (
            usersView === 'list' ? (
              <section className="single-panel">
                <div className="panel-header">
                  <div>
                    <p className="section-label">User</p>
                    <h2>User list</h2>
                  </div>
                  <div className="subscription-toolbar-actions">
                    <span className="count-chip">{total}</span>
                    <button className="ghost-button" onClick={() => void loadRoster('users', query, selectedUserId, page)} type="button">
                      {rosterLoading ? 'Refreshing...' : 'Refresh'}
                    </button>
                  </div>
                </div>

                <label className="field subscription-search-field">
                  <span>Search by email, name, or phone</span>
                  <input
                    placeholder="Find a user"
                    type="search"
                    value={query}
                    onChange={(event) => {
                      setQuery(event.target.value);
                      setPage(0);
                    }}
                  />
                </label>

                <div className="list-grid">
                  {rosterLoading ? <p className="subtle-copy">Loading users...</p> : null}
                  {!rosterLoading && users.length === 0 ? (
                    <div className="blank-card">
                      <h3>No users found</h3>
                      <p>Try a broader search term to bring more accounts into view.</p>
                    </div>
                  ) : null}
                  {users.map((user) => (
                    <article className="list-row interactive-row" key={`list-${user.userId}`}>
                      <span className="avatar-chip">{initialsForUser(user)}</span>
                      <div className="list-row-body">
                        <strong>{displayName(user)}</strong>
                        <span>{user.email}</span>
                      </div>
                      <div className="list-row-meta">
                        <span className={`status-pill ${user.enabled ? 'enabled' : 'disabled'}`}>
                          {user.enabled ? 'Active' : 'Disabled'}
                        </span>
                        {user.roles.map((role) => (
                          <span className="role-pill" key={`user-list-${user.userId}-${role}`}>
                            {humanizeRole(role)}
                          </span>
                        ))}
                        <button className="ghost-button action-button" onClick={() => void openUserDetail(user.userId, 'users')} type="button">
                          <ActionIcon />
                          <span>Manage</span>
                        </button>
                      </div>
                    </article>
                  ))}
                </div>

                <PaginationControls pageInfo={pageInfo} onPageChange={setPage} />
              </section>
            ) : (
              <section className="single-panel">
                <div className="panel-header subscription-page-head">
                  <div>
                    <p className="section-label">User</p>
                    <h2>User profile</h2>
                    <p className="subtle-copy">Review account details from a dedicated page and return to the list when finished.</p>
                  </div>
                  <button className="ghost-button" onClick={() => setUsersView('list')} type="button">
                    Back to list
                  </button>
                </div>

                {!selectedUser || detailLoading ? (
                  <div className="blank-card tall">
                    <h2>{detailLoading ? 'Loading user...' : 'No user selected'}</h2>
                    <p>{detailLoading ? 'Fetching the latest account details.' : 'Choose a user from the list to open this page.'}</p>
                  </div>
                ) : (
                  <div className="editor-form">
                    <div className="editor-header">
                      <div className="identity-block">
                        <span className="editor-avatar">{initialsForUser(selectedUser)}</span>
                        <div>
                          <p className="section-label">Selected account</p>
                          <h2>{displayName(selectedUser)}</h2>
                          <p className="subtle-copy">{selectedUser.email}</p>
                        </div>
                      </div>
                    </div>

                    <div className="meta-bar">
                      <span className={`status-pill ${selectedUser.enabled ? 'enabled' : 'disabled'}`}>
                        {selectedUser.enabled ? 'Enabled' : 'Disabled'}
                      </span>
                      {selectedUser.roles.map((role) => (
                        <span className="role-pill" key={`user-detail-${role}`}>
                          {humanizeRole(role)}
                        </span>
                      ))}
                      <span className="subtle-copy">Created {formatDate(selectedUser.createdAt)}</span>
                      <span className="subtle-copy">Updated {formatDate(selectedUser.updatedAt)}</span>
                    </div>

                    <section className="form-block">
                      <div className="panel-header">
                        <div>
                          <p className="section-label">Identity</p>
                          <h3>Profile details</h3>
                        </div>
                      </div>
                      <div className="detail-value-grid">
                        <DetailValueCard label="First name" value={selectedUser.firstName} />
                        <DetailValueCard label="Last name" value={selectedUser.lastName} />
                        <DetailValueCard label="Phone number" value={selectedUser.phoneNumber} />
                        <DetailValueCard label="Account status" value={selectedUser.enabled ? 'Enabled' : 'Disabled'} />
                      </div>
                    </section>

                    <section className="form-block">
                      <div className="panel-header">
                        <div>
                          <p className="section-label">Address</p>
                          <h3>Location details</h3>
                        </div>
                      </div>
                      <div className="detail-value-grid">
                        <DetailValueCard label="Street" value={selectedUser.street} wide />
                        <DetailValueCard label="City" value={selectedUser.city} />
                        <DetailValueCard label="State" value={selectedUser.state} />
                        <DetailValueCard label="Postal code" value={selectedUser.postalCode} />
                        <DetailValueCard label="Country" value={selectedUser.countryName ?? selectedUser.countryCode} />
                      </div>
                    </section>
                  </div>
                )}
              </section>
            )
          ) : null}

          {activeSection === 'adminUsers' ? (
            adminUsersView === 'list' ? (
              <section className="single-panel">
                <div className="panel-header">
                  <div>
                    <p className="section-label">Admin Users</p>
                    <h2>Admin user list</h2>
                  </div>
                  <div className="subscription-toolbar-actions">
                    <span className="count-chip">{total}</span>
                    <button className="ghost-button" onClick={() => void loadRoster('adminUsers', query, selectedUserId, page)} type="button">
                      {rosterLoading ? 'Refreshing...' : 'Refresh'}
                    </button>
                  </div>
                </div>

                <label className="field subscription-search-field">
                  <span>Search by email, name, or phone</span>
                  <input
                    placeholder="Find a user"
                    type="search"
                    value={query}
                    onChange={(event) => {
                      setQuery(event.target.value);
                      setPage(0);
                    }}
                  />
                </label>

                <div className="list-grid">
                  {rosterLoading ? <p className="subtle-copy">Loading users...</p> : null}
                  {!rosterLoading && users.length === 0 ? (
                    <div className="blank-card">
                      <h3>No users found</h3>
                      <p>Try a broader search term to bring more accounts into view.</p>
                    </div>
                  ) : null}
                  {users.map((user) => (
                    <article className="list-row interactive-row" key={user.userId}>
                      <span className="avatar-chip">{initialsForUser(user)}</span>
                      <div className="list-row-body">
                        <strong>{displayName(user)}</strong>
                        <span>{user.email}</span>
                      </div>
                      <div className="list-row-meta">
                        <span className={`status-pill ${user.enabled ? 'enabled' : 'disabled'}`}>
                          {user.enabled ? 'Active' : 'Disabled'}
                        </span>
                        {user.roles.map((role) => (
                          <span className="role-pill" key={`${user.userId}-${role}`}>
                            {humanizeRole(role)}
                          </span>
                        ))}
                        <button className="ghost-button action-button" onClick={() => void openUserDetail(user.userId, 'adminUsers')} type="button">
                          <ActionIcon />
                          <span>Manage</span>
                        </button>
                      </div>
                    </article>
                  ))}
                </div>

                <PaginationControls pageInfo={pageInfo} onPageChange={setPage} />
              </section>
            ) : (
              <section className="single-panel">
                <div className="panel-header subscription-page-head">
                  <div>
                    <p className="section-label">Admin Users</p>
                    <h2>Manage admin user</h2>
                    <p className="subtle-copy">Edit account details and perform admin actions from a dedicated management page.</p>
                  </div>
                  <button className="ghost-button" onClick={() => setAdminUsersView('list')} type="button">
                    Back to list
                  </button>
                </div>

                {!selectedUser ? (
                  <div className="blank-card tall">
                    <h2>No account selected</h2>
                    <p>Choose a user from the list to inspect details and execute admin actions.</p>
                  </div>
                ) : (
                  <>
                    <div className="editor-header">
                      <div className="identity-block">
                        <span className="editor-avatar">{initialsForUser(selectedUser)}</span>
                        <div>
                          <p className="section-label">Selected account</p>
                          <h2>{displayName(selectedUser)}</h2>
                          <p className="subtle-copy">{selectedUser.email}</p>
                        </div>
                      </div>

                      <div className="header-actions">
                        <button className="ghost-button" type="button" onClick={() => setResetDialogOpen(true)}>
                          Reset password
                        </button>
                        <button className="danger-button" type="button" onClick={() => setDeleteDialogOpen(true)}>
                          Delete account
                        </button>
                      </div>
                    </div>

                    <div className="meta-bar">
                      <span className={`status-pill ${selectedUser.enabled ? 'enabled' : 'disabled'}`}>
                        {selectedUser.enabled ? 'Enabled' : 'Disabled'}
                      </span>
                      {selectedUser.roles.map((role) => (
                        <span className="role-pill" key={`detail-${role}`}>
                          {humanizeRole(role)}
                        </span>
                      ))}
                      <span className="subtle-copy">Created {formatDate(selectedUser.createdAt)}</span>
                      <span className="subtle-copy">Updated {formatDate(selectedUser.updatedAt)}</span>
                    </div>

                    <form className="editor-form" onSubmit={handleSave}>
                      <section className="form-block">
                        <div className="panel-header">
                          <div>
                            <p className="section-label">Identity</p>
                            <h3>Profile details</h3>
                          </div>
                        </div>

                        <div className="field-grid">
                          <label className="field">
                            <span>First name</span>
                            <input
                              required
                              type="text"
                              value={form.firstName}
                              onChange={(event) => updateForm('firstName', event.target.value)}
                            />
                          </label>

                          <label className="field">
                            <span>Last name</span>
                            <input
                              required
                              type="text"
                              value={form.lastName}
                              onChange={(event) => updateForm('lastName', event.target.value)}
                            />
                          </label>

                          <label className="field">
                            <span>Phone number</span>
                            <input
                              type="text"
                              value={form.phoneNumber}
                              onChange={(event) => updateForm('phoneNumber', event.target.value)}
                            />
                          </label>

                          <label className="toggle-card">
                            <span>Account status</span>
                            <div className="toggle-inline">
                              <input
                                checked={form.enabled}
                                onChange={(event) => updateForm('enabled', event.target.checked)}
                                type="checkbox"
                              />
                              <strong>{form.enabled ? 'Enabled' : 'Disabled'}</strong>
                            </div>
                          </label>
                        </div>
                      </section>

                      <section className="form-block">
                        <div className="panel-header">
                          <div>
                            <p className="section-label">Address</p>
                            <h3>Location profile</h3>
                          </div>
                        </div>

                        <div className="field-grid">
                          <label className="field field-wide">
                            <span>Street</span>
                            <input
                              required
                              type="text"
                              value={form.street}
                              onChange={(event) => updateForm('street', event.target.value)}
                            />
                          </label>

                          <label className="field">
                            <span>City</span>
                            <input
                              required
                              type="text"
                              value={form.city}
                              onChange={(event) => updateForm('city', event.target.value)}
                            />
                          </label>

                          <label className="field">
                            <span>State</span>
                            <input
                              required
                              type="text"
                              value={form.state}
                              onChange={(event) => updateForm('state', event.target.value)}
                            />
                          </label>

                          <label className="field">
                            <span>Postal code</span>
                            <input
                              required
                              type="text"
                              value={form.postalCode}
                              onChange={(event) => updateForm('postalCode', event.target.value)}
                            />
                          </label>

                          <label className="field">
                            <span>Country code</span>
                            <input
                              maxLength={3}
                              required
                              type="text"
                              value={form.countryIsoCode}
                              onChange={(event) => updateForm('countryIsoCode', event.target.value.toUpperCase())}
                            />
                          </label>
                        </div>
                      </section>

                      <div className="form-actions">
                        <button
                          className="ghost-button"
                          disabled={detailLoading}
                          onClick={() => void loadUser(selectedUser.userId)}
                          type="button"
                        >
                          {detailLoading ? 'Reloading...' : 'Reload user'}
                        </button>
                        <button className="primary-button" disabled={saving} type="submit">
                          {saving ? 'Saving changes...' : 'Save changes'}
                        </button>
                      </div>
                    </form>
                  </>
                )}
              </section>
            )
          ) : null}

          {activeSection === 'subscriptions' ? (
            <SubscriptionWorkspace actor={payload?.sub ?? 'System Admin'} token={token} />
          ) : null}
          </div>
        </section>
      </main>

      <footer className="admin-footer">
        <div>© 2026 Electra Hub</div>
        <div className="muted">Build trusted access for EV charging operations.</div>
      </footer>

      {resetDialogOpen && selectedUser ? (
        <div className="dialog-backdrop" onClick={() => setResetDialogOpen(false)}>
          <section className="dialog-card" onClick={(event) => event.stopPropagation()}>
            <div className="panel-header">
              <div>
                <p className="section-label">Credential rotation</p>
                <h2>Reset password</h2>
              </div>
            </div>
            <p className="subtle-copy">Set a new password for {selectedUser.email}.</p>
            <form className="editor-form" onSubmit={handlePasswordReset}>
              <label className="field">
                <span>New password</span>
                <input
                  minLength={8}
                  required
                  type="password"
                  value={resetPassword}
                  onChange={(event) => setResetPassword(event.target.value)}
                />
              </label>
              <label className="field">
                <span>Confirm password</span>
                <input
                  required
                  type="password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                />
              </label>
              <div className="form-actions">
                <button className="ghost-button" type="button" onClick={() => setResetDialogOpen(false)}>
                  Cancel
                </button>
                <button className="primary-button" disabled={resetting} type="submit">
                  {resetting ? 'Resetting...' : 'Confirm reset'}
                </button>
              </div>
            </form>
          </section>
        </div>
      ) : null}

      {deleteDialogOpen && selectedUser ? (
        <div className="dialog-backdrop" onClick={() => setDeleteDialogOpen(false)}>
          <section className="dialog-card danger-dialog" onClick={(event) => event.stopPropagation()}>
            <div className="panel-header">
              <div>
                <p className="section-label">Permanent action</p>
                <h2>Delete account</h2>
              </div>
            </div>
            <p className="subtle-copy">
              This permanently removes {selectedUser.email}. Enter the email address to confirm.
            </p>
            <form className="editor-form" onSubmit={handleDelete}>
              <label className="field">
                <span>Confirmation</span>
                <input
                  placeholder={selectedUser.email}
                  required
                  type="text"
                  value={deleteConfirmation}
                  onChange={(event) => setDeleteConfirmation(event.target.value)}
                />
              </label>
              <div className="form-actions">
                <button className="ghost-button" type="button" onClick={() => setDeleteDialogOpen(false)}>
                  Cancel
                </button>
                <button className="danger-button" disabled={deleting} type="submit">
                  {deleting ? 'Deleting...' : 'Delete account'}
                </button>
              </div>
            </form>
          </section>
        </div>
      ) : null}
    </div>
  );
}

function displayName(user: Pick<AdminUserSummary, 'firstName' | 'lastName' | 'email'>) {
  const name = `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim();
  if (name) {
    return name;
  }

  const local = user.email.split('@')[0] ?? user.email;
  return local
    .replace(/[._-]+/g, ' ')
    .split(' ')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function normalizeRegularUsers(items: UserSummary[]): AdminUserSummary[] {
  return items.map((user) => ({
    userId: user.userId,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    phoneNumber: user.phoneNumber,
    enabled: user.enabled,
    createdAt: user.createdAt,
    updatedAt: user.createdAt,
    roles: [],
  }));
}

function SidebarIcon({ name }: { name: SidebarIconName }) {
  switch (name) {
    case 'users':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="3.25" />
          <path d="M6.5 19a5.5 5.5 0 0 1 11 0" />
        </svg>
      );
    case 'shield':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3l7 3v5c0 4.2-2.4 8.1-7 10-4.6-1.9-7-5.8-7-10V6l7-3Z" />
          <circle cx="12" cy="10" r="2.2" />
          <path d="M8.8 16a3.8 3.8 0 0 1 6.4 0" />
        </svg>
      );
    case 'card':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="5" width="18" height="14" rx="2.5" />
          <path d="M3 10h18" />
          <path d="M7 15h4" />
          <path d="M14 15h3" />
        </svg>
      );
    case 'chevron-right':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m9 6 6 6-6 6" />
        </svg>
      );
    case 'chevron-left':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m15 6-6 6 6 6" />
        </svg>
      );
  }
}

function ActionIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 7.5A2.5 2.5 0 0 1 6.5 5H14" />
      <path d="M4 11.5V16.5A2.5 2.5 0 0 0 6.5 19H16.5A2.5 2.5 0 0 0 19 16.5V10" />
      <path d="M13 6h5v5" />
      <path d="m10 14 8-8" />
    </svg>
  );
}

function PaginationControls({
  pageInfo,
  onPageChange,
}: {
  pageInfo: {
    total: number;
    limit: number;
    offset: number;
    currentPage: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
  onPageChange: (page: number) => void;
}) {
  const pages = buildVisiblePages(pageInfo.currentPage, pageInfo.totalPages);
  const start = pageInfo.total === 0 ? 0 : pageInfo.offset + 1;
  const end = Math.min(pageInfo.total, pageInfo.offset + pageInfo.limit);

  return (
    <div className="pagination-bar">
      <p className="subtle-copy">
        Showing {start}-{end} of {pageInfo.total}
      </p>
      <div className="pagination-actions">
        <button className="ghost-button" disabled={!pageInfo.hasPrevious} onClick={() => onPageChange(0)} type="button">
          First
        </button>
        <button
          className="ghost-button"
          disabled={!pageInfo.hasPrevious}
          onClick={() => onPageChange(pageInfo.currentPage - 1)}
          type="button"
        >
          Previous
        </button>
        <div className="pagination-pages">
          {pages.map((page, index) =>
            page === 'ellipsis' ? (
              <span className="pagination-ellipsis" key={`ellipsis-${index}`}>
                ...
              </span>
            ) : (
              <button
                className={`pagination-page-button ${page === pageInfo.currentPage ? 'active' : ''}`}
                key={page}
                onClick={() => onPageChange(page)}
                type="button"
              >
                {page + 1}
              </button>
            )
          )}
        </div>
        <button className="ghost-button" disabled={!pageInfo.hasNext} onClick={() => onPageChange(pageInfo.currentPage + 1)} type="button">
          Next
        </button>
        <button
          className="ghost-button"
          disabled={!pageInfo.hasNext || pageInfo.totalPages === 0}
          onClick={() => onPageChange(Math.max(pageInfo.totalPages - 1, 0))}
          type="button"
        >
          Last
        </button>
      </div>
    </div>
  );
}

function buildVisiblePages(currentPage: number, totalPages: number): Array<number | 'ellipsis'> {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index);
  }

  const pages = new Set<number>([0, 1, currentPage - 1, currentPage, currentPage + 1, totalPages - 2, totalPages - 1]);
  const sorted = Array.from(pages).filter((page) => page >= 0 && page < totalPages).sort((a, b) => a - b);
  const visible: Array<number | 'ellipsis'> = [];

  for (let index = 0; index < sorted.length; index += 1) {
    const page = sorted[index];
    const previous = sorted[index - 1];
    if (index > 0 && previous !== undefined && page - previous > 1) {
      visible.push('ellipsis');
    }
    visible.push(page);
  }

  return visible;
}

function DetailValueCard({ label, value, wide = false }: { label: string; value: string | null | undefined; wide?: boolean }) {
  return (
    <article className={`detail-value-card ${wide ? 'wide' : ''}`}>
      <span className="subtle-copy">{label}</span>
      <strong>{value?.trim() ? value : 'Not provided'}</strong>
    </article>
  );
}

function displayNameFromIdentifier(value: string) {
  const local = value.split('@')[0] ?? value;
  return local
    .replace(/[._-]+/g, ' ')
    .split(' ')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function initialsForIdentifier(value: string) {
  const words = displayNameFromIdentifier(value).split(' ').filter(Boolean);
  if (words.length === 0) {
    return 'SA';
  }
  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase();
  }
  return `${words[0].charAt(0)}${words[1].charAt(0)}`.toUpperCase();
}

function initialsForUser(user: Pick<AdminUserSummary, 'firstName' | 'lastName' | 'email'>) {
  const words = displayName(user).split(' ').filter(Boolean);
  if (words.length === 0) {
    return 'AD';
  }
  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase();
  }
  return `${words[0].charAt(0)}${words[1].charAt(0)}`.toUpperCase();
}

function humanizeRole(role: string) {
  return role.replace(/_/g, ' ');
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
  }).format(new Date(value));
}

function extractMessage(error: unknown, fallback: string) {
  if (error instanceof Error && error.message) {
    return error.message;
  }
  return fallback;
}
