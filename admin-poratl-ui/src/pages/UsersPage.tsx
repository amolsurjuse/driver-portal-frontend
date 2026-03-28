import { useEffect, useMemo, useState } from 'react';
import { searchUsers } from '../api/adminUsers';
import { PaginationControls } from '../components/PaginationControls';
import { useAuth } from '../contexts/AuthContext';
import { useDebouncedValue } from '../hooks/useDebouncedValue';
import { TableSkeleton } from '../components/ui/Skeleton';
import { TableActionIconButton } from '../components/ui/TableActionIconButton';
import type { UserSummary } from '../types/admin';

type SortField = 'email' | 'name' | 'status' | 'createdAt';
type SortDirection = 'asc' | 'desc';
type StatusFilter = 'all' | 'enabled' | 'disabled';

const emptyPageInfo = {
  total: 0,
  limit: 10,
  offset: 0,
  currentPage: 0,
  totalPages: 0,
  hasNext: false,
  hasPrevious: false,
};

export default function UsersPage() {
  const { token } = useAuth();
  const pageSize = 10;
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(0);
  const [users, setUsers] = useState<UserSummary[]>([]);
  const [pageInfo, setPageInfo] = useState(emptyPageInfo);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<UserSummary | null>(null);
  const [detailPanelOpen, setDetailPanelOpen] = useState(false);
  const [sortField, setSortField] = useState<SortField>('email');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');

  const debouncedQuery = useDebouncedValue(query);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await searchUsers(token, debouncedQuery, pageSize, page * pageSize);
        setUsers(result.items);
        setPageInfo(result);
      } catch (requestError) {
        setError(requestError instanceof Error ? requestError.message : 'Failed to load users');
      } finally {
        setIsLoading(false);
      }
    };

    void fetchUsers();
  }, [token, debouncedQuery, page]);

  const activeCount = useMemo(() => users.filter((user) => user.enabled).length, [users]);

  const filteredUsers = useMemo(() => {
    let filtered = users;

    if (statusFilter === 'enabled') {
      filtered = filtered.filter((user) => user.enabled);
    } else if (statusFilter === 'disabled') {
      filtered = filtered.filter((user) => !user.enabled);
    }

    return [...filtered].sort((a, b) => {
      let aVal: string | number = '';
      let bVal: string | number = '';

      switch (sortField) {
        case 'email':
          aVal = a.email.toLowerCase();
          bVal = b.email.toLowerCase();
          break;
        case 'name':
          aVal = displayName(a).toLowerCase();
          bVal = displayName(b).toLowerCase();
          break;
        case 'status':
          aVal = a.enabled ? 1 : 0;
          bVal = b.enabled ? 1 : 0;
          break;
        case 'createdAt':
          aVal = new Date(a.createdAt).getTime();
          bVal = new Date(b.createdAt).getTime();
          break;
      }

      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [users, statusFilter, sortField, sortDirection]);

  function handleSort(field: SortField) {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
      return;
    }
    setSortField(field);
    setSortDirection('asc');
  }

  function closeDetailPanel() {
    setDetailPanelOpen(false);
    setSelectedUser(null);
  }

  const sortIndicator = (field: SortField) =>
    sortField === field ? <span className="table-sort-indicator">{sortDirection === 'asc' ? '▲' : '▼'}</span> : null;

  const listPanel = (
    <section className="single-panel">
      {error ? <p className="error-banner">{error}</p> : null}

      <div className="panel-header subscription-page-head">
        <div>
          <p className="section-label">User</p>
          <h2>User list</h2>
          <p className="subtle-copy">Browse and manage regular user accounts.</p>
        </div>
        <span className="count-chip">{pageInfo.total}</span>
      </div>

      <div className="subscription-filter-bar user-filter-bar">
        <label className="field subscription-search-field">
          <span>Search users</span>
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

        <label className="field user-status-filter">
          <span>Status</span>
          <select
            onChange={(event) => setStatusFilter(event.target.value as StatusFilter)}
            value={statusFilter}
          >
            <option value="all">All users</option>
            <option value="enabled">Enabled only</option>
            <option value="disabled">Disabled only</option>
          </select>
        </label>
      </div>

      <div className="subscription-table-wrap">
        {isLoading ? <TableSkeleton rows={6} cols={6} /> : null}
        {!isLoading && filteredUsers.length === 0 ? (
          <div className="blank-card">
            <h3>No users found</h3>
            <p>Try a different search term or status filter.</p>
          </div>
        ) : null}
        {!isLoading && filteredUsers.length > 0 ? (
          <table className="data-table user-roster-table">
            <colgroup>
              <col className="col-user-email" />
              <col className="col-user-name" />
              <col className="col-user-phone" />
              <col className="col-user-status" />
              <col className="col-user-created" />
              <col className="col-user-actions" />
            </colgroup>
            <thead>
              <tr>
                <th>
                  <button className="table-sort-button" onClick={() => handleSort('email')} type="button">
                    <span>Email</span>
                    {sortIndicator('email')}
                  </button>
                </th>
                <th>
                  <button className="table-sort-button" onClick={() => handleSort('name')} type="button">
                    <span>Name</span>
                    {sortIndicator('name')}
                  </button>
                </th>
                <th>Phone</th>
                <th>
                  <button className="table-sort-button" onClick={() => handleSort('status')} type="button">
                    <span>Status</span>
                    {sortIndicator('status')}
                  </button>
                </th>
                <th>
                  <button className="table-sort-button" onClick={() => handleSort('createdAt')} type="button">
                    <span>Created</span>
                    {sortIndicator('createdAt')}
                  </button>
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.userId}>
                  <td>{user.email}</td>
                  <td>{displayName(user)}</td>
                  <td>{user.phoneNumber || 'Not provided'}</td>
                  <td>
                    <span className={`status-pill ${user.enabled ? 'enabled' : 'disabled'}`}>
                      {user.enabled ? 'Enabled' : 'Disabled'}
                    </span>
                  </td>
                  <td>{formatDate(user.createdAt)}</td>
                  <td>
                    <div className="table-row-actions table-action-icons">
                      <TableActionIconButton
                        icon="view"
                        label="View user"
                        onClick={() => {
                          setSelectedUser(user);
                          setDetailPanelOpen(true);
                        }}
                      />
                      <TableActionIconButton
                        icon="edit"
                        label="Edit user"
                        onClick={() => {
                          setSelectedUser(user);
                          setDetailPanelOpen(true);
                        }}
                      />
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
  );

  if (selectedUser && detailPanelOpen) {
    return (
      <>
        <header className="portal-page-head">
          <div>
            <p className="eyebrow">User Management</p>
            <h1>Users</h1>
            <p className="hero-copy">Search and manage system users</p>
          </div>
        </header>

        <section className="stats-grid">
          <article className="stat-card">
            <span>Total</span>
            <strong>{pageInfo.total}</strong>
            <small>Total users</small>
          </article>
          <article className="stat-card cool">
            <span>Active</span>
            <strong>{activeCount}</strong>
            <small>Enabled users</small>
          </article>
        </section>

        <section className="single-panel">
          <div className="panel-header subscription-page-head">
            <div>
              <p className="section-label">User</p>
              <h2>User profile</h2>
              <p className="subtle-copy">Review account details and return to the list when done.</p>
            </div>
            <button className="ghost-button" onClick={closeDetailPanel} type="button">
              Back to list
            </button>
          </div>

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
              <span className="subtle-copy">Created {formatDate(selectedUser.createdAt)}</span>
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
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <header className="portal-page-head">
        <div>
          <p className="eyebrow">User Management</p>
          <h1>Users</h1>
          <p className="hero-copy">Search and manage system users</p>
        </div>
      </header>

      <section className="stats-grid">
        <article className="stat-card">
          <span>Total</span>
          <strong>{pageInfo.total}</strong>
          <small>Total users</small>
        </article>
        <article className="stat-card cool">
          <span>Active</span>
          <strong>{activeCount}</strong>
          <small>Enabled users</small>
        </article>
      </section>

      {listPanel}
    </>
  );
}

function DetailValueCard({ label, value }: { label: string; value: string | null | undefined }) {
  return (
    <article className="detail-value-card">
      <span className="subtle-copy">{label}</span>
      <strong>{value?.trim() ? value : 'Not provided'}</strong>
    </article>
  );
}

function displayName(user: Pick<UserSummary, 'firstName' | 'lastName' | 'email'>) {
  const name = `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim();
  if (name) {
    return name;
  }
  return user.email.split('@')[0] ?? user.email;
}

function initialsForUser(user: Pick<UserSummary, 'firstName' | 'lastName' | 'email'>) {
  const words = displayName(user)
    .replace(/[._-]+/g, ' ')
    .split(' ')
    .filter(Boolean);
  if (words.length === 0) return 'US';
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return `${words[0].charAt(0)}${words[1].charAt(0)}`.toUpperCase();
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(new Date(value));
}
