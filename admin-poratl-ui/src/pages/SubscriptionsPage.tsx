import { useState } from 'react';
import { SubscriptionWorkspace } from '../components/SubscriptionWorkspace';
import { Tabs } from '../components/ui/Tabs';
import { useAuth } from '../contexts/AuthContext';

export default function SubscriptionsPage() {
  const { token, payload } = useAuth();
  const [activeTab, setActiveTab] = useState('plans');
  const actor = payload?.sub ?? 'System Admin';

  const tabs = [
    { id: 'plans', label: 'Plans' },
    { id: 'allocations', label: 'Allocations' },
    { id: 'utilizations', label: 'Utilizations' },
    { id: 'audit-logs', label: 'Audit Logs' },
  ];

  return (
    <>
      <header className="portal-page-head">
        <div>
          <p className="eyebrow">Subscription Management</p>
          <h1>Subscriptions</h1>
          <p className="hero-copy">Manage subscription plans and allocations</p>
        </div>
      </header>

      <Tabs activeTab={activeTab} onTabChange={setActiveTab} tabs={tabs} />

      {activeTab === 'plans' && <SubscriptionWorkspace actor={actor} token={token} />}
      {activeTab === 'allocations' && <div style={{ padding: '2rem' }}>Allocations - Coming soon</div>}
      {activeTab === 'utilizations' && <div style={{ padding: '2rem' }}>Utilizations - Coming soon</div>}
      {activeTab === 'audit-logs' && <div style={{ padding: '2rem' }}>Audit Logs - Coming soon</div>}
    </>
  );
}
