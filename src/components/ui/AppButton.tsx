import { type ButtonHTMLAttributes, type ReactNode } from 'react';
import { Loader2 } from 'lucide-react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

export interface AppButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  children?: ReactNode;
}

const baseStyles =
  'inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 ' +
  'outline-none focus-visible:ring-2 focus-visible:ring-offset-0 select-none cursor-pointer ' +
  'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none active:scale-[0.98]';

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-accent text-bg-deep hover:bg-accent-dark focus-visible:ring-accent-soft border border-accent-border',
  secondary: 'bg-surface-2 text-text hover:bg-surface-3 focus-visible:ring-border border border-border hover:border-border-strong',
  ghost: 'bg-transparent text-text hover:bg-surface-2 active:bg-surface-3 focus-visible:ring-border border border-transparent',
  danger: 'bg-danger text-white hover:brightness-90 focus-visible:ring-danger/20 border border-danger/20',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-xs rounded-lg min-h-[48px] sm:min-h-[40px]',
  md: 'px-5 py-3 text-sm rounded-xl min-h-[48px]',
  lg: 'px-6 py-4 text-base rounded-xl min-h-[52px]',
};

export function AppButton({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled,
  className = '',
  ...props
}: AppButtonProps) {
  return (
    <button
      disabled={disabled || isLoading}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {isLoading && <Loader2 className="w-4 h-4 animate-spin shrink-0" />}
      {children}
    </button>
  );
}
