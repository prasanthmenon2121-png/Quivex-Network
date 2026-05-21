import { forwardRef, useId, type InputHTMLAttributes } from 'react';

export interface AppInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helper?: string;
}

export const AppInput = forwardRef<HTMLInputElement, AppInputProps>(
  function AppInput({ label, error, helper, className = '', id, type = 'text', ...props }, ref) {
    const generatedId = useId();
    const inputId = id || generatedId;

    return (
      <div className="w-full flex flex-col">
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs font-semibold uppercase tracking-wider text-muted mb-1.5 pl-0.5 select-none"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          type={type}
          className={`w-full bg-surface-2 border rounded-xl px-4 py-3 text-text placeholder:text-soft-muted font-medium outline-none transition-colors duration-200 text-base ${error
              ? 'border-danger focus:border-danger focus:ring-2 focus:ring-danger/10'
              : 'border-border focus:border-accent focus:ring-2 focus:ring-accent-soft'
            } ${className}`}
          style={{ fontSize: '16px' }}
          {...props}
        />
        <div className="h-5 mt-1 pl-0.5 flex items-center">
          {error ? (
            <span className="text-xs text-danger font-medium">{error}</span>
          ) : helper ? (
            <span className="text-xs text-soft-muted font-medium">{helper}</span>
          ) : null}
        </div>
      </div>
    );
  }
);

export default AppInput;
