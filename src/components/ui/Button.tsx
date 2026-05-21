import React from 'react';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled,
  className = '',
  ...props
}) => {
  // Styles for variants
  const variantStyles = {
    primary: 'bg-accent text-bg-deep border-accent-border hover:brightness-110 active:scale-[0.98] focus:ring-accent-soft disabled:opacity-50 disabled:cursor-not-allowed',
    ghost: 'bg-transparent text-text border-transparent hover:bg-surface-2 active:bg-surface focus:ring-accent-soft disabled:opacity-30 disabled:cursor-not-allowed',
    danger: 'bg-danger text-text border-danger/30 hover:brightness-110 active:scale-[0.98] focus:ring-danger/20 disabled:opacity-50 disabled:cursor-not-allowed',
  };

  // Styles for sizes
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs rounded-lg min-h-[32px]',
    md: 'px-5 py-2.5 text-sm rounded-xl min-h-[44px]',
    lg: 'px-7 py-3.5 text-base rounded-2xl min-h-[52px]',
  };

  const baseStyles = 'inline-flex items-center justify-center gap-2 font-bold transition-all duration-200 border outline-none focus:ring-2 cursor-pointer select-none';

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
};
