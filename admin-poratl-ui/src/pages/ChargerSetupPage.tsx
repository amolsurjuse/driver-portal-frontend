import { useMemo, useState } from 'react';
import { Tabs } from '../components/ui/Tabs';
import { CHARGER_PROVISIONING_STEPS } from '../mocks/chargerProvisioning';

export default function ChargerSetupPage() {
  const [activeStepId, setActiveStepId] = useState(CHARGER_PROVISIONING_STEPS[0]?.id ?? '');

  const steps = CHARGER_PROVISIONING_STEPS;
  const activeStep = useMemo(
    () => steps.find((step) => step.id === activeStepId) ?? steps[0],
    [activeStepId, steps]
  );

  const totalComponents = useMemo(
    () => steps.reduce((sum, step) => sum + step.components.length, 0),
    [steps]
  );

  const totalValidations = useMemo(
    () => steps.reduce((sum, step) => sum + step.validations.length, 0),
    [steps]
  );

  if (!activeStep) {
    return (
      <div className="blank-card">
        <h3>No setup data available</h3>
        <p>Mock provisioning data is currently unavailable.</p>
      </div>
    );
  }

  return (
    <>
      <header className="portal-page-head">
        <div>
          <p className="eyebrow">Charger Onboarding</p>
          <h1>Charger Setup Components</h1>
          <p className="hero-copy">
            End-to-end provisioning blueprint with mock data for OCPP and OCPI aligned charger rollout.
          </p>
        </div>
      </header>

      <section className="stats-grid">
        <article className="stat-card">
          <span>Creation steps</span>
          <strong>{steps.length}</strong>
          <small>Ordered onboarding stages</small>
        </article>
        <article className="stat-card cool">
          <span>Provisioning components</span>
          <strong>{totalComponents}</strong>
          <small>Granular entities to configure</small>
        </article>
        <article className="stat-card warm">
          <span>Validation gates</span>
          <strong>{totalValidations}</strong>
          <small>Commissioning and protocol checks</small>
        </article>
      </section>

      <section className="single-panel">
        <div className="panel-header subscription-page-head">
          <div>
            <p className="section-label">Creation order</p>
            <h2>Recommended setup sequence</h2>
            <p className="subtle-copy">Follow each step in order to avoid protocol and dependency gaps.</p>
          </div>
          <span className="count-chip">
            Step {activeStep.sequence} of {steps.length}
          </span>
        </div>

        <Tabs
          activeTab={activeStep.id}
          onTabChange={setActiveStepId}
          tabs={steps.map((step) => ({
            id: step.id,
            label: `${step.sequence}. ${step.shortLabel}`,
            count: step.components.length,
          }))}
        />

        <div className="provisioning-step-head">
          <div>
            <p className="section-label">Step {activeStep.sequence}</p>
            <h3>{activeStep.title}</h3>
            <p className="subtle-copy">{activeStep.objective}</p>
          </div>
          <div className="provisioning-protocol-tags">
            {activeStep.protocolFocus.map((focus) => (
              <span className="role-pill" key={focus}>
                {focus}
              </span>
            ))}
          </div>
        </div>

        <div className="subscription-table-wrap">
          <table className="data-table provisioning-component-table">
            <colgroup>
              <col className="col-provision-component" />
              <col className="col-provision-layer" />
              <col className="col-provision-fields" />
              <col className="col-provision-mock" />
            </colgroup>
            <thead>
              <tr>
                <th>Component</th>
                <th>Layer</th>
                <th>Required fields</th>
                <th>Mock data</th>
              </tr>
            </thead>
            <tbody>
              {activeStep.components.map((component) => (
                <tr key={component.id}>
                  <td>
                    <div className="table-cell-name">
                      <strong>{component.name}</strong>
                      <p className="subtle-copy table-cell-sub">{component.id}</p>
                    </div>
                  </td>
                  <td>
                    <span className="role-pill">{component.layer}</span>
                  </td>
                  <td>
                    <div className="provisioning-chip-wrap">
                      {component.requiredFields.map((field) => (
                        <span className="code-chip" key={`${component.id}-${field}`}>
                          {field}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td>
                    <div className="provisioning-chip-wrap">
                      {Object.entries(component.mockData).map(([key, value]) => (
                        <span className="code-chip" key={`${component.id}-${key}`}>
                          {key}: {value}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="provisioning-check-grid">
          <article className="blank-card">
            <h3>Step deliverables</h3>
            <ul className="provisioning-check-list">
              {activeStep.deliverables.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article className="blank-card">
            <h3>Validation checklist</h3>
            <ul className="provisioning-check-list">
              {activeStep.validations.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>

        <article className="blank-card">
          <h3>Mock payload sample</h3>
          <p className="subtle-copy">
            Use this payload as a dev seed template for step {activeStep.sequence}.
          </p>
          <pre className="provisioning-json">
            {JSON.stringify(activeStep.samplePayload, null, 2)}
          </pre>
        </article>
      </section>
    </>
  );
}
