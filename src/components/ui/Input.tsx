import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  className = '',
  id,
  ...props
}) => {
  const generatedId = React.useId();
  const inputId = id || generatedId;

  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="text-xs font-bold uppercase tracking-widest text-accent/60 pl-1 select-none"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`w-full bg-surface-2 border rounded-xl px-4 py-3 text-text placeholder-muted/30 font-medium outline-none transition-all duration-300 text-sm md:text-base ${
          error
            ? 'border-danger/50 focus:border-danger focus:ring-2 focus:ring-danger/10'
            : 'border-border focus:border-accent-border focus:ring-2 focus:ring-accent-soft'
        } ${className}`}
        {...props}
      />
      {error && (
        <span className="text-xs text-danger/80 pl-1 font-medium leading-relaxed">
          {error}
        </span>
      )}
      {!error && helperText && (
        <span className="text-xs text-muted/50 pl-1 font-medium leading-relaxed">
          {helperText}
        </span>
      )}
    </div>
  );
};
