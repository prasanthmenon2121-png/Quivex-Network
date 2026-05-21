import { type HTMLAttributes, type ReactNode } from 'react';

export interface AppCardProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  solid?: boolean;
  noPadding?: boolean;
}

export function AppCard({
  children,
  solid = false,
  noPadding = false,
  className = '',
  ...props
}: AppCardProps) {
  return (
    <div
      className={`rounded-2xl border border-border transition-colors duration-200 ${solid ? 'bg-card-solid' : 'bg-card backdrop-blur-sm'
        } ${noPadding ? '' : 'p-6'} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
