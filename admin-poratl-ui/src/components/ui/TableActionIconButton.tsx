type TableActionIcon = 'view' | 'edit' | 'history' | 'deactivate';
type TableActionTone = 'default' | 'danger';

type TableActionIconButtonProps = {
  icon: TableActionIcon;
  label: string;
  onClick: () => void;
  tone?: TableActionTone;
};

export function TableActionIconButton({
  icon,
  label,
  onClick,
  tone = 'default',
}: TableActionIconButtonProps) {
  return (
    <button
      aria-label={label}
      className={`ghost-button table-action-icon-button ${tone === 'danger' ? 'danger' : ''}`}
      onClick={onClick}
      title={label}
      type="button"
    >
      {renderIcon(icon)}
    </button>
  );
}

function renderIcon(icon: TableActionIcon) {
  switch (icon) {
    case 'view':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      );
    case 'edit':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.12 2.12 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
        </svg>
      );
    case 'history':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 3v5h5" />
          <path d="M3.05 13a9 9 0 1 0 .5-4" />
          <path d="M12 7v5l3 3" />
        </svg>
      );
    case 'deactivate':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 6h18" />
          <path d="M8 6V4h8v2" />
          <path d="M19 6l-1 14H6L5 6" />
          <path d="M10 11v6" />
          <path d="M14 11v6" />
        </svg>
      );
    default:
      return null;
  }
}
