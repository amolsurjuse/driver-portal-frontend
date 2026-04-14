import { ReactNode } from 'react';

type BadgeProps = {
  children: ReactNode;
  variant?: 'success' | 'danger' | 'warning' | 'info' | 'neutral';
};

export function Badge({ children, variant = 'neutral' }: BadgeProps) {
  return <span className={`badge badge-${variant}`}>{children}</span>;
}
