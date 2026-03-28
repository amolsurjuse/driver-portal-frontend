import { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { getRbacPolicy, updateRbacPolicy } from '../api/rbacPolicy';
import { TableSkeleton } from '../components/ui/Skeleton';
import { Tabs } from '../components/ui/Tabs';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../hooks/useToast';
import type { RbacPolicy, RbacPolicyUpdateRequest } from '../types/admin';

/* ═══════════════════════════════════════════════════════════════
   Types
   ═══════════════════════════════════════════════════════════════ */

type DraftRule = {
  ruleId: string;
  name: string;
  methodsText: string;
  pathPattern: string;
  effect: 'ALLOW' | 'DENY';
  allowAnonymous: boolean;
  requiredRolesText: string;
  collapsed: boolean;
};

type RuleTemplate = {
  label: string;
  description: string;
  category: string;
  rule: Omit<DraftRule, 'ruleId' | 'collapsed'>;
};

/* ═══════════════════════════════════════════════════════════════
   Helpers
   ═══════════════════════════════════════════════════════════════ */

function uid(): string {
  return globalThis.crypto?.randomUUID?.() ?? `rule-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function createDraftRule(): DraftRule {
  return {
    ruleId: uid(),
    name: '',
    methodsText: '*',
    pathPattern: '/**',
    effect: 'ALLOW',
    allowAnonymous: false,
    requiredRolesText: '',
    collapsed: false,
  };
}

function toDraftRules(policy: RbacPolicy): DraftRule[] {
  return policy.rules.map((rule) => ({
    ruleId: rule.ruleId,
    name: rule.name,
    methodsText: rule.methods.join(', '),
    pathPattern: rule.pathPattern,
    effect: rule.effect,
    allowAnonymous: rule.allowAnonymous,
    requiredRolesText: rule.requiredRoles.join(', '),
    collapsed: true,
  }));
}

function parseCsv(value: string): string[] {
  return value.split(',').map((p) => p.trim()).filter((p) => p.length > 0);
}

function methodBadgeColor(method: string): string {
  const m = method.trim().toUpperCase();
  switch (m) {
    case 'GET': return 'var(--color-success)';
    case 'POST': return 'var(--color-primary)';
    case 'PUT': return 'var(--color-warning)';
    case 'PATCH': return '#8b5cf6';
    case 'DELETE': return 'var(--color-danger)';
    case 'OPTIONS': return 'var(--color-neutral)';
    case '*': return '#374151';
    default: return 'var(--color-neutral)';
  }
}

/* ═══════════════════════════════════════════════════════════════
   Rule Templates
   ═══════════════════════════════════════════════════════════════ */

const RULE_TEMPLATES: RuleTemplate[] = [
  {
    label: 'Public Health Check',
    description: 'Allow anonymous GET to /actuator/health',
    category: 'Infrastructure',
    rule: { name: 'health-check', methodsText: 'GET', pathPattern: '/actuator/health/**', effect: 'ALLOW', allowAnonymous: true, requiredRolesText: '' },
  },
  {
    label: 'OpenAPI Docs',
    description: 'Public access to Swagger/OpenAPI docs',
    category: 'Infrastructure',
    rule: { name: 'openapi-docs', methodsText: 'GET', pathPattern: '/v3/api-docs/**', effect: 'ALLOW', allowAnonymous: true, requiredRolesText: '' },
  },
  {
    label: 'CORS Preflight',
    description: 'Allow OPTIONS on all paths',
    category: 'Infrastructure',
    rule: { name: 'cors-preflight', methodsText: 'OPTIONS', pathPattern: '/**', effect: 'ALLOW', allowAnonymous: true, requiredRolesText: '' },
  },
  {
    label: 'Auth Login',
    description: 'Public POST to login endpoint',
    category: 'Auth',
    rule: { name: 'auth-login', methodsText: 'POST', pathPattern: '/auth/api/auth/login', effect: 'ALLOW', allowAnonymous: true, requiredRolesText: '' },
  },
  {
    label: 'Auth Register',
    description: 'Public POST to registration endpoint',
    category: 'Auth',
    rule: { name: 'auth-register', methodsText: 'POST', pathPattern: '/auth/api/auth/register', effect: 'ALLOW', allowAnonymous: true, requiredRolesText: '' },
  },
  {
    label: 'Admin Only Endpoint',
    description: 'Restrict to SYSTEM_ADMIN role',
    category: 'Access Control',
    rule: { name: 'admin-endpoint', methodsText: '*', pathPattern: '/api/v1/admin/**', effect: 'ALLOW', allowAnonymous: false, requiredRolesText: 'SYSTEM_ADMIN' },
  },
  {
    label: 'Authenticated Users',
    description: 'Allow any authenticated user',
    category: 'Access Control',
    rule: { name: 'authenticated-access', methodsText: '*', pathPattern: '/**', effect: 'ALLOW', allowAnonymous: false, requiredRolesText: 'USER' },
  },
  {
    label: 'Deny All Fallback',
    description: 'Explicit deny for unmatched routes',
    category: 'Access Control',
    rule: { name: 'deny-all', methodsText: '*', pathPattern: '/**', effect: 'DENY', allowAnonymous: false, requiredRolesText: '' },
  },
  {
    label: 'Pricing Admin',
    description: 'Pricing plan management for admins',
    category: 'Services',
    rule: { name: 'pricing-admin', methodsText: '*', pathPattern: '/pricing/api/v1/pricing/plans/**', effect: 'ALLOW', allowAnonymous: false, requiredRolesText: 'SYSTEM_ADMIN' },
  },
  {
    label: 'Pricing Search (Public)',
    description: 'Allow users to search pricing plans',
    category: 'Services',
    rule: { name: 'pricing-search', methodsText: 'POST, GET', pathPattern: '/pricing/api/v1/pricing/search/**', effect: 'ALLOW', allowAnonymous: false, requiredRolesText: 'USER' },
  },
];

/* ═══════════════════════════════════════════════════════════════
   Component
   ═══════════════════════════════════════════════════════════════ */

export default function RbacPolicyPage() {
  const { token } = useAuth();
  const { addToast } = useToast();

  /* ── state ── */
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [policy, setPolicy] = useState<RbacPolicy | null>(null);
  const [roleHierarchy, setRoleHierarchy] = useState('');
  const [defaultDecision, setDefaultDecision] = useState<'ALLOW' | 'DENY'>('DENY');
  const [rules, setRules] = useState<DraftRule[]>([]);
  const [activeTab, setActiveTab] = useState('editor');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterEffect, setFilterEffect] = useState<'ALL' | 'ALLOW' | 'DENY'>('ALL');
  const [filterAnon, setFilterAnon] = useState<'ALL' | 'YES' | 'NO'>('ALL');
  const [showTemplates, setShowTemplates] = useState(false);
  const [templateCategory, setTemplateCategory] = useState<string>('All');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showJsonPreview, setShowJsonPreview] = useState(false);

  /* drag state */
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const dragCounter = useRef(0);

  /* ── derived ── */
  const ruleCount = rules.length;
  const allowCount = rules.filter((r) => r.effect === 'ALLOW').length;
  const denyCount = rules.filter((r) => r.effect === 'DENY').length;
  const anonCount = rules.filter((r) => r.allowAnonymous).length;
  const availableRoleCount = policy?.availableRoles.length ?? 0;

  const availableRoleText = useMemo(() => {
    if (!policy || policy.availableRoles.length === 0) return 'No roles available';
    return policy.availableRoles.join(', ');
  }, [policy]);

  const filteredRuleIndices = useMemo(() => {
    return rules
      .map((rule, index) => ({ rule, index }))
      .filter(({ rule }) => {
        if (searchQuery) {
          const q = searchQuery.toLowerCase();
          const matchesSearch =
            rule.name.toLowerCase().includes(q) ||
            rule.pathPattern.toLowerCase().includes(q) ||
            rule.methodsText.toLowerCase().includes(q) ||
            rule.requiredRolesText.toLowerCase().includes(q);
          if (!matchesSearch) return false;
        }
        if (filterEffect !== 'ALL' && rule.effect !== filterEffect) return false;
        if (filterAnon === 'YES' && !rule.allowAnonymous) return false;
        if (filterAnon === 'NO' && rule.allowAnonymous) return false;
        return true;
      })
      .map(({ index }) => index);
  }, [rules, searchQuery, filterEffect, filterAnon]);

  const templateCategories = useMemo(() => {
    const cats = new Set(RULE_TEMPLATES.map((t) => t.category));
    return ['All', ...Array.from(cats)];
  }, []);

  const filteredTemplates = useMemo(() => {
    if (templateCategory === 'All') return RULE_TEMPLATES;
    return RULE_TEMPLATES.filter((t) => t.category === templateCategory);
  }, [templateCategory]);

  const jsonPreview = useMemo(() => {
    return JSON.stringify(
      {
        roleHierarchy: roleHierarchy.trim(),
        defaultDecision,
        rules: rules.map((rule) => ({
          name: rule.name.trim(),
          methods: parseCsv(rule.methodsText).map((m) => m.toUpperCase()),
          pathPattern: rule.pathPattern.trim(),
          effect: rule.effect,
          allowAnonymous: rule.allowAnonymous,
          requiredRoles: rule.allowAnonymous ? [] : parseCsv(rule.requiredRolesText).map((r) => r.toUpperCase()),
        })),
      },
      null,
      2,
    );
  }, [roleHierarchy, defaultDecision, rules]);

  /* ── actions ── */

  const markDirty = useCallback(() => setHasUnsavedChanges(true), []);

  async function loadPolicy() {
    setLoading(true);
    try {
      const response = await getRbacPolicy(token);
      setPolicy(response);
      setRoleHierarchy(response.roleHierarchy);
      setDefaultDecision(response.defaultDecision);
      setRules(toDraftRules(response));
      setHasUnsavedChanges(false);
    } catch (error) {
      addToast(error instanceof Error ? error.message : 'Unable to load RBAC policy.', 'error');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadPolicy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  function updateRule(index: number, patch: Partial<DraftRule>) {
    setRules((cur) => cur.map((r, i) => (i === index ? { ...r, ...patch } : r)));
    markDirty();
  }

  function addRule() {
    setRules((cur) => [...cur, createDraftRule()]);
    markDirty();
  }

  function removeRule(index: number) {
    setRules((cur) => cur.filter((_, i) => i !== index));
    markDirty();
  }

  function duplicateRule(index: number) {
    setRules((cur) => {
      const copy = { ...cur[index], ruleId: uid(), name: cur[index].name + '-copy', collapsed: false };
      const next = [...cur];
      next.splice(index + 1, 0, copy);
      return next;
    });
    markDirty();
  }

  function moveRule(from: number, to: number) {
    if (from === to) return;
    setRules((cur) => {
      const next = [...cur];
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      return next;
    });
    markDirty();
  }

  function toggleCollapse(index: number) {
    setRules((cur) => cur.map((r, i) => (i === index ? { ...r, collapsed: !r.collapsed } : r)));
  }

  function collapseAll() {
    setRules((cur) => cur.map((r) => ({ ...r, collapsed: true })));
  }

  function expandAll() {
    setRules((cur) => cur.map((r) => ({ ...r, collapsed: false })));
  }

  function addFromTemplate(template: RuleTemplate) {
    const newRule: DraftRule = { ...template.rule, ruleId: uid(), collapsed: false };
    setRules((cur) => [...cur, newRule]);
    setShowTemplates(false);
    markDirty();
    addToast(`Added "${template.label}" rule`, 'success');
  }

  /* ── drag & drop ── */

  function handleDragStart(index: number) {
    setDragIndex(index);
  }

  function handleDragEnter(index: number) {
    dragCounter.current++;
    setDragOverIndex(index);
  }

  function handleDragLeave() {
    dragCounter.current--;
    if (dragCounter.current <= 0) {
      setDragOverIndex(null);
      dragCounter.current = 0;
    }
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
  }

  function handleDrop(index: number) {
    if (dragIndex !== null && dragIndex !== index) {
      moveRule(dragIndex, index);
    }
    setDragIndex(null);
    setDragOverIndex(null);
    dragCounter.current = 0;
  }

  function handleDragEnd() {
    setDragIndex(null);
    setDragOverIndex(null);
    dragCounter.current = 0;
  }

  /* ── submit ── */

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!policy) return;

    if (rules.length === 0) {
      addToast('At least one rule is required.', 'warning');
      return;
    }

    for (const [index, rule] of rules.entries()) {
      if (!rule.name.trim()) {
        addToast(`Rule ${index + 1} is missing a name.`, 'warning');
        return;
      }
      if (!rule.pathPattern.trim()) {
        addToast(`Rule ${index + 1} is missing a path pattern.`, 'warning');
        return;
      }
      if (parseCsv(rule.methodsText).length === 0) {
        addToast(`Rule ${index + 1} must define at least one method.`, 'warning');
        return;
      }
    }

    const payload: RbacPolicyUpdateRequest = {
      roleHierarchy: roleHierarchy.trim(),
      defaultDecision,
      rules: rules.map((rule) => ({
        name: rule.name.trim(),
        methods: parseCsv(rule.methodsText).map((m) => m.toUpperCase()),
        pathPattern: rule.pathPattern.trim(),
        effect: rule.effect,
        allowAnonymous: rule.allowAnonymous,
        requiredRoles: rule.allowAnonymous ? [] : parseCsv(rule.requiredRolesText).map((r) => r.toUpperCase()),
      })),
    };

    setSaving(true);
    try {
      const response = await updateRbacPolicy(token, payload);
      setPolicy(response);
      setRoleHierarchy(response.roleHierarchy);
      setDefaultDecision(response.defaultDecision);
      setRules(toDraftRules(response));
      setHasUnsavedChanges(false);
      addToast('RBAC policy updated and cache invalidation triggered.', 'success');
    } catch (error) {
      addToast(error instanceof Error ? error.message : 'Unable to save RBAC policy.', 'error');
    } finally {
      setSaving(false);
    }
  }

  /* ── render ── */

  const tabs = [
    { id: 'editor', label: 'Policy Editor' },
    { id: 'visualization', label: 'Route Map' },
    { id: 'json', label: 'JSON Preview' },
  ];

  return (
    <>
      <header className="portal-page-head">
        <div>
          <p className="eyebrow">Security</p>
          <h1>RBAC Policy</h1>
          <p className="hero-copy">
            Manage API gateway authorization rules, role hierarchy, and route permissions.
            {hasUnsavedChanges && <span className="rbac-unsaved-badge">Unsaved changes</span>}
          </p>
        </div>
        <div className="form-actions">
          <button className="ghost-button" onClick={() => setShowTemplates(true)} type="button">
            <RbacIcon name="template" /> Templates
          </button>
          <button className="ghost-button" onClick={() => void loadPolicy()} type="button" disabled={saving}>
            <RbacIcon name="refresh" /> Reload
          </button>
        </div>
      </header>

      {/* ── Stats ── */}
      <section className="stats-grid">
        <article className="stat-card">
          <span>Policy version</span>
          <strong>{policy?.version ?? 0}</strong>
          <small>Auto-incremented on save</small>
        </article>
        <article className="stat-card cool">
          <span>Total rules</span>
          <strong>{ruleCount}</strong>
          <small>{allowCount} allow · {denyCount} deny</small>
        </article>
        <article className="stat-card warm">
          <span>Anonymous routes</span>
          <strong>{anonCount}</strong>
          <small>Public endpoints</small>
        </article>
        <article className="stat-card muted">
          <span>Available roles</span>
          <strong>{availableRoleCount}</strong>
          <small>{availableRoleText}</small>
        </article>
      </section>

      <Tabs activeTab={activeTab} onTabChange={setActiveTab} tabs={tabs} />

      {/* ══════════════════════════════════════════
          TAB: Policy Editor
          ══════════════════════════════════════════ */}
      {activeTab === 'editor' && (
        <section className="single-panel">
          {loading ? <TableSkeleton rows={6} cols={4} /> : null}

          {!loading && policy ? (
            <form className="editor-form" onSubmit={handleSubmit}>
              <div className="panel-header">
                <div>
                  <p className="section-label">Policy key: {policy.policyKey}</p>
                  <h2>Gateway authorization policy</h2>
                  <p className="subtle-copy">Last updated: {new Date(policy.updatedAt).toLocaleString()}</p>
                </div>
                <div className="form-actions">
                  <button className="primary-button" type="submit" disabled={saving}>
                    {saving ? 'Saving…' : 'Save policy'}
                  </button>
                </div>
              </div>

              {/* Policy settings */}
              <div className="field-grid">
                <label className="field field-wide">
                  <span>
                    Role hierarchy
                    <span className="rbac-field-hint">Define role inheritance (e.g. ROLE_SYSTEM_ADMIN &gt; ROLE_USER)</span>
                  </span>
                  <textarea
                    className="rbac-textarea"
                    value={roleHierarchy}
                    onChange={(e) => { setRoleHierarchy(e.target.value); markDirty(); }}
                    placeholder="ROLE_SYSTEM_ADMIN > ROLE_USER"
                    rows={4}
                  />
                </label>

                <label className="field">
                  <span>
                    Default decision
                    <span className="rbac-field-hint">Applied when no rule matches a request</span>
                  </span>
                  <select
                    value={defaultDecision}
                    onChange={(e) => { setDefaultDecision(e.target.value as 'ALLOW' | 'DENY'); markDirty(); }}
                  >
                    <option value="DENY">DENY (Recommended)</option>
                    <option value="ALLOW">ALLOW</option>
                  </select>
                </label>

                <div className="toggle-card field-wide rbac-roles-card">
                  <span className="section-label">Available roles from user-service</span>
                  <div className="rbac-role-pills">
                    {policy.availableRoles.length > 0
                      ? policy.availableRoles.map((role) => (
                          <span key={role} className="role-pill">{role}</span>
                        ))
                      : <p className="subtle-copy">No roles available</p>
                    }
                  </div>
                </div>
              </div>

              {/* Rules header with search and filters */}
              <div className="rbac-rules-header">
                <div className="rbac-rules-title-row">
                  <div>
                    <h3 style={{ margin: 0 }}>Rules</h3>
                    <p className="subtle-copy">Evaluated top-to-bottom. Drag to reorder. First match wins.</p>
                  </div>
                  <div className="form-actions">
                    <button className="ghost-button" onClick={collapseAll} type="button" title="Collapse all">
                      <RbacIcon name="collapse" />
                    </button>
                    <button className="ghost-button" onClick={expandAll} type="button" title="Expand all">
                      <RbacIcon name="expand" />
                    </button>
                    <button className="ghost-button" onClick={addRule} type="button">
                      + Add rule
                    </button>
                  </div>
                </div>

                <div className="rbac-filter-row">
                  <div className="rbac-search-input-wrap">
                    <RbacIcon name="search" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search rules by name, path, method, or role..."
                      className="rbac-search-input"
                    />
                    {searchQuery && (
                      <button
                        className="rbac-search-clear"
                        onClick={() => setSearchQuery('')}
                        type="button"
                        title="Clear search"
                      >
                        &times;
                      </button>
                    )}
                  </div>
                  <select
                    value={filterEffect}
                    onChange={(e) => setFilterEffect(e.target.value as 'ALL' | 'ALLOW' | 'DENY')}
                    className="rbac-filter-select"
                  >
                    <option value="ALL">All effects</option>
                    <option value="ALLOW">ALLOW only</option>
                    <option value="DENY">DENY only</option>
                  </select>
                  <select
                    value={filterAnon}
                    onChange={(e) => setFilterAnon(e.target.value as 'ALL' | 'YES' | 'NO')}
                    className="rbac-filter-select"
                  >
                    <option value="ALL">All access</option>
                    <option value="YES">Anonymous only</option>
                    <option value="NO">Authenticated only</option>
                  </select>
                  {(searchQuery || filterEffect !== 'ALL' || filterAnon !== 'ALL') && (
                    <span className="rbac-filter-count">
                      {filteredRuleIndices.length} of {ruleCount} rules
                    </span>
                  )}
                </div>
              </div>

              {/* Rules list */}
              <div className="list-grid">
                {filteredRuleIndices.length === 0 && ruleCount > 0 && (
                  <div className="rbac-empty-filter">
                    <p className="subtle-copy">No rules match your filters.</p>
                    <button
                      className="ghost-button"
                      onClick={() => { setSearchQuery(''); setFilterEffect('ALL'); setFilterAnon('ALL'); }}
                      type="button"
                    >
                      Clear filters
                    </button>
                  </div>
                )}

                {filteredRuleIndices.map((ruleIndex) => {
                  const rule = rules[ruleIndex];
                  const isDragging = dragIndex === ruleIndex;
                  const isDragOver = dragOverIndex === ruleIndex && dragIndex !== ruleIndex;
                  const methods = parseCsv(rule.methodsText);
                  const roles = parseCsv(rule.requiredRolesText);

                  return (
                    <article
                      key={rule.ruleId}
                      className={`rbac-rule-card ${isDragging ? 'dragging' : ''} ${isDragOver ? 'drag-over' : ''} ${rule.effect === 'DENY' ? 'rbac-rule-deny' : ''}`}
                      draggable
                      onDragStart={() => handleDragStart(ruleIndex)}
                      onDragEnter={() => handleDragEnter(ruleIndex)}
                      onDragLeave={handleDragLeave}
                      onDragOver={handleDragOver}
                      onDrop={() => handleDrop(ruleIndex)}
                      onDragEnd={handleDragEnd}
                    >
                      {/* Rule summary header */}
                      <div className="rbac-rule-header" onClick={() => toggleCollapse(ruleIndex)}>
                        <div className="rbac-rule-drag-handle" title="Drag to reorder">
                          <RbacIcon name="grip" />
                        </div>

                        <span className="rbac-rule-order">{ruleIndex + 1}</span>

                        <span className={`rbac-effect-badge ${rule.effect.toLowerCase()}`}>
                          {rule.effect}
                        </span>

                        <div className="rbac-rule-summary">
                          <strong>{rule.name || '(unnamed)'}</strong>
                          <code className="rbac-path-code">{rule.pathPattern || '/**'}</code>
                        </div>

                        <div className="rbac-method-badges">
                          {methods.slice(0, 4).map((m, i) => (
                            <span
                              key={i}
                              className="rbac-method-badge"
                              style={{ '--method-color': methodBadgeColor(m) } as React.CSSProperties}
                            >
                              {m.toUpperCase()}
                            </span>
                          ))}
                          {methods.length > 4 && (
                            <span className="rbac-method-badge rbac-method-more">+{methods.length - 4}</span>
                          )}
                        </div>

                        {rule.allowAnonymous && (
                          <span className="rbac-anon-badge" title="Anonymous access allowed">
                            <RbacIcon name="globe" /> Public
                          </span>
                        )}

                        {!rule.allowAnonymous && roles.length > 0 && (
                          <div className="rbac-role-badges-inline">
                            {roles.slice(0, 2).map((r, i) => (
                              <span key={i} className="role-pill">{r}</span>
                            ))}
                            {roles.length > 2 && <span className="role-pill">+{roles.length - 2}</span>}
                          </div>
                        )}

                        <button
                          className="rbac-collapse-btn"
                          type="button"
                          title={rule.collapsed ? 'Expand' : 'Collapse'}
                          onClick={(e) => { e.stopPropagation(); toggleCollapse(ruleIndex); }}
                        >
                          <RbacIcon name={rule.collapsed ? 'chevron-down' : 'chevron-up'} />
                        </button>
                      </div>

                      {/* Expanded editor */}
                      {!rule.collapsed && (
                        <div className="rbac-rule-body">
                          <div className="field-grid">
                            <label className="field">
                              <span>Rule name</span>
                              <input
                                value={rule.name}
                                onChange={(e) => updateRule(ruleIndex, { name: e.target.value })}
                                placeholder="descriptive-rule-name"
                              />
                            </label>

                            <label className="field">
                              <span>HTTP Methods <span className="rbac-field-hint">(comma-separated)</span></span>
                              <input
                                value={rule.methodsText}
                                onChange={(e) => updateRule(ruleIndex, { methodsText: e.target.value })}
                                placeholder="GET, POST, PUT, DELETE, *"
                              />
                            </label>

                            <label className="field field-wide">
                              <span>Path pattern <span className="rbac-field-hint">(Spring Ant-style)</span></span>
                              <input
                                value={rule.pathPattern}
                                onChange={(e) => updateRule(ruleIndex, { pathPattern: e.target.value })}
                                placeholder="/service/api/v1/resource/**"
                              />
                            </label>

                            <label className="field">
                              <span>Effect</span>
                              <select
                                value={rule.effect}
                                onChange={(e) => updateRule(ruleIndex, { effect: e.target.value as 'ALLOW' | 'DENY' })}
                              >
                                <option value="ALLOW">ALLOW</option>
                                <option value="DENY">DENY</option>
                              </select>
                            </label>

                            <label className="field">
                              <span>Required roles <span className="rbac-field-hint">(comma-separated)</span></span>
                              <input
                                value={rule.requiredRolesText}
                                onChange={(e) => updateRule(ruleIndex, { requiredRolesText: e.target.value })}
                                placeholder="SYSTEM_ADMIN, USER"
                                disabled={rule.allowAnonymous}
                              />
                            </label>

                            <div className="field field-wide">
                              <div className="rbac-rule-footer-actions">
                                <label className="toggle-inline">
                                  <input
                                    type="checkbox"
                                    checked={rule.allowAnonymous}
                                    onChange={(e) => updateRule(ruleIndex, { allowAnonymous: e.target.checked })}
                                  />
                                  Allow anonymous access
                                </label>

                                <div className="form-actions">
                                  <button
                                    className="ghost-button"
                                    onClick={() => duplicateRule(ruleIndex)}
                                    type="button"
                                    title="Duplicate rule"
                                  >
                                    <RbacIcon name="copy" /> Duplicate
                                  </button>
                                  <button
                                    className="ghost-button"
                                    onClick={() => { if (ruleIndex > 0) moveRule(ruleIndex, ruleIndex - 1); }}
                                    type="button"
                                    disabled={ruleIndex === 0}
                                    title="Move up"
                                  >
                                    <RbacIcon name="arrow-up" />
                                  </button>
                                  <button
                                    className="ghost-button"
                                    onClick={() => { if (ruleIndex < rules.length - 1) moveRule(ruleIndex, ruleIndex + 1); }}
                                    type="button"
                                    disabled={ruleIndex === rules.length - 1}
                                    title="Move down"
                                  >
                                    <RbacIcon name="arrow-down" />
                                  </button>
                                  <button
                                    className="danger-button"
                                    onClick={() => removeRule(ruleIndex)}
                                    type="button"
                                    style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </article>
                  );
                })}
              </div>
            </form>
          ) : null}
        </section>
      )}

      {/* ══════════════════════════════════════════
          TAB: Route Map Visualization
          ══════════════════════════════════════════ */}
      {activeTab === 'visualization' && (
        <section className="single-panel">
          <div className="panel-header">
            <div>
              <h2>Route Map</h2>
              <p className="subtle-copy">
                Visual overview of all {ruleCount} gateway rules grouped by service prefix.
                Default decision: <strong className={defaultDecision === 'DENY' ? 'rbac-text-deny' : 'rbac-text-allow'}>{defaultDecision}</strong>
              </p>
            </div>
          </div>

          <div className="rbac-route-map">
            {(() => {
              const groups: Record<string, DraftRule[]> = {};
              for (const rule of rules) {
                const prefix = rule.pathPattern.split('/').filter(Boolean)[0] || '(root)';
                if (!groups[prefix]) groups[prefix] = [];
                groups[prefix].push(rule);
              }

              return Object.entries(groups).map(([prefix, groupRules]) => (
                <div key={prefix} className="rbac-route-group">
                  <div className="rbac-route-group-header">
                    <span className="rbac-route-prefix">/{prefix}</span>
                    <span className="count-chip">{groupRules.length}</span>
                  </div>
                  <div className="rbac-route-entries">
                    {groupRules.map((rule) => (
                      <div key={rule.ruleId} className={`rbac-route-entry ${rule.effect.toLowerCase()}`}>
                        <span className={`rbac-effect-dot ${rule.effect.toLowerCase()}`} />
                        <code>{rule.pathPattern}</code>
                        <div className="rbac-method-badges">
                          {parseCsv(rule.methodsText).map((m, i) => (
                            <span
                              key={i}
                              className="rbac-method-badge"
                              style={{ '--method-color': methodBadgeColor(m) } as React.CSSProperties}
                            >
                              {m.toUpperCase()}
                            </span>
                          ))}
                        </div>
                        <span className="subtle-copy" style={{ marginLeft: 'auto', fontSize: '0.8rem' }}>
                          {rule.allowAnonymous ? 'Public' : parseCsv(rule.requiredRolesText).join(', ') || 'No roles'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ));
            })()}
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════
          TAB: JSON Preview
          ══════════════════════════════════════════ */}
      {activeTab === 'json' && (
        <section className="single-panel">
          <div className="panel-header">
            <div>
              <h2>JSON Preview</h2>
              <p className="subtle-copy">The payload that will be sent to the user-service API on save.</p>
            </div>
            <button
              className="ghost-button"
              type="button"
              onClick={() => {
                navigator.clipboard.writeText(jsonPreview);
                addToast('JSON copied to clipboard', 'success');
              }}
            >
              <RbacIcon name="copy" /> Copy JSON
            </button>
          </div>
          <pre className="rbac-json-preview">{jsonPreview}</pre>
        </section>
      )}

      {/* ══════════════════════════════════════════
          Template Drawer
          ══════════════════════════════════════════ */}
      {showTemplates && (
        <div className="modal-overlay" onClick={() => setShowTemplates(false)}>
          <div className="modal-content modal-lg" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Rule Templates</h2>
              <button className="modal-close" onClick={() => setShowTemplates(false)} type="button">
                &times;
              </button>
            </div>
            <div className="modal-body" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
              <div className="rbac-template-categories">
                {templateCategories.map((cat) => (
                  <button
                    key={cat}
                    className={`rbac-template-cat-btn ${templateCategory === cat ? 'active' : ''}`}
                    onClick={() => setTemplateCategory(cat)}
                    type="button"
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="rbac-template-grid">
                {filteredTemplates.map((template, i) => (
                  <div key={i} className="rbac-template-card">
                    <div>
                      <strong>{template.label}</strong>
                      <p className="subtle-copy">{template.description}</p>
                      <div style={{ marginTop: '0.5rem', display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                        <span className={`rbac-effect-badge ${template.rule.effect.toLowerCase()}`} style={{ fontSize: '0.7rem', padding: '2px 8px' }}>
                          {template.rule.effect}
                        </span>
                        {parseCsv(template.rule.methodsText).map((m, j) => (
                          <span key={j} className="rbac-method-badge" style={{ '--method-color': methodBadgeColor(m), fontSize: '0.65rem', padding: '1px 6px' } as React.CSSProperties}>
                            {m}
                          </span>
                        ))}
                      </div>
                      <code className="rbac-path-code" style={{ marginTop: '0.5rem', display: 'block', fontSize: '0.75rem' }}>
                        {template.rule.pathPattern}
                      </code>
                    </div>
                    <button className="primary-button button-compact button-compact-wide button-top-gap" onClick={() => addFromTemplate(template)} type="button">
                      Add rule
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Icons
   ═══════════════════════════════════════════════════════════════ */

function RbacIcon({ name }: { name: string }) {
  const props = { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, width: 16, height: 16 };
  switch (name) {
    case 'grip':
      return <svg {...props}><circle cx="9" cy="5" r="1" fill="currentColor" /><circle cx="9" cy="12" r="1" fill="currentColor" /><circle cx="9" cy="19" r="1" fill="currentColor" /><circle cx="15" cy="5" r="1" fill="currentColor" /><circle cx="15" cy="12" r="1" fill="currentColor" /><circle cx="15" cy="19" r="1" fill="currentColor" /></svg>;
    case 'search':
      return <svg {...props}><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>;
    case 'chevron-down':
      return <svg {...props}><polyline points="6 9 12 15 18 9" /></svg>;
    case 'chevron-up':
      return <svg {...props}><polyline points="18 15 12 9 6 15" /></svg>;
    case 'arrow-up':
      return <svg {...props}><line x1="12" y1="19" x2="12" y2="5" /><polyline points="5 12 12 5 19 12" /></svg>;
    case 'arrow-down':
      return <svg {...props}><line x1="12" y1="5" x2="12" y2="19" /><polyline points="19 12 12 19 5 12" /></svg>;
    case 'copy':
      return <svg {...props}><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>;
    case 'globe':
      return <svg {...props}><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>;
    case 'refresh':
      return <svg {...props}><polyline points="23 4 23 10 17 10" /><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" /></svg>;
    case 'template':
      return <svg {...props}><rect x="3" y="3" width="18" height="18" rx="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" /></svg>;
    case 'collapse':
      return <svg {...props}><polyline points="4 14 10 14 10 20" /><polyline points="20 10 14 10 14 4" /><line x1="14" y1="10" x2="21" y2="3" /><line x1="3" y1="21" x2="10" y2="14" /></svg>;
    case 'expand':
      return <svg {...props}><polyline points="15 3 21 3 21 9" /><polyline points="9 21 3 21 3 15" /><line x1="21" y1="3" x2="14" y2="10" /><line x1="3" y1="21" x2="10" y2="14" /></svg>;
    default:
      return null;
  }
}
