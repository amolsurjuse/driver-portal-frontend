import { BrandLogo } from './BrandLogo';

type HeaderProps = {
  userIdentifier: string;
  onLogout: () => void;
};

export function Header({ userIdentifier, onLogout }: HeaderProps) {
  return (
    <header className="admin-top-nav">
      <div className="logo admin-logo">
        <BrandLogo size="header" />
      </div>

      <div className="admin-nav-links">
        <div className="admin-user-menu">
          <span className="user-avatar">{initialsForIdentifier(userIdentifier)}</span>
          <span className="user-name">{displayNameFromIdentifier(userIdentifier)}</span>
        </div>
        <button className="ghost-button" onClick={onLogout} type="button">
          Log out
        </button>
      </div>
    </header>
  );
}

export function displayNameFromIdentifier(value: string) {
  const local = value.split('@')[0] ?? value;
  return local
    .replace(/[._-]+/g, ' ')
    .split(' ')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

export function initialsForIdentifier(value: string) {
  const words = displayNameFromIdentifier(value).split(' ').filter(Boolean);
  if (words.length === 0) {
    return 'SA';
  }
  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase();
  }
  return `${words[0].charAt(0)}${words[1].charAt(0)}`.toUpperCase();
}
