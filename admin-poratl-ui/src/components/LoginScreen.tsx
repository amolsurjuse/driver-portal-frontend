import { FormEvent, useState } from 'react';
import { BrandLogo } from './shared/BrandLogo';

type LoginScreenProps = {
  loading: boolean;
  error: string | null;
  onSubmit: (email: string, password: string) => Promise<void>;
};

export function LoginScreen({ loading, error, onSubmit }: LoginScreenProps) {
  const [email, setEmail] = useState('sysadmin.dev@electrahub.com');
  const [password, setPassword] = useState('Admin@12345');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await onSubmit(email.trim(), password);
  }

  return (
    <div className="login-shell">
      <section className="login-hero">
        <div className="login-brand-mark">
          <BrandLogo size="hero" variant="dark" />
        </div>
        <p className="eyebrow">System administration</p>
        <h1>Admin Portal</h1>
        <p>
          Standalone system-administration workspace for user operations, credential rotation, and account retirement.
        </p>
        <div className="hero-note">
          <span>Dev seed</span>
          <strong>sysadmin.dev@electrahub.com</strong>
        </div>
      </section>

      <form className="login-card" onSubmit={handleSubmit}>
        <div>
          <p className="section-label">System admin sign in</p>
          <h2>Access the control room</h2>
        </div>

        <label className="field">
          <span>Email</span>
          <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" required />
        </label>

        <label className="field">
          <span>Password</span>
          <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" required />
        </label>

        {error ? <p className="error-banner">{error}</p> : null}

        <button className="primary-button" type="submit" disabled={loading}>
          {loading ? 'Signing in...' : 'Sign in'}
        </button>
      </form>
    </div>
  );
}
