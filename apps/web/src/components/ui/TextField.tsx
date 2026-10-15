import { forwardRef, useId, type InputHTMLAttributes } from 'react';

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string | undefined;
  hint?: string;
};

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(function TextField(
  { label, error, hint, id, className = '', ...rest },
  ref,
) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const describedBy = error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined;
  return (
    <div className="space-y-1.5">
      <label htmlFor={inputId} className="text-sm font-semibold text-white">
        {label}
      </label>
      <input
        ref={ref}
        id={inputId}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={`block min-h-11 w-full rounded-xl border bg-surface px-3.5 text-base text-white placeholder:text-muted/70 ${
          error ? 'border-danger' : 'border-line focus:border-brand-500'
        } ${className}`}
        {...rest}
      />
      {error ? (
        <p id={`${inputId}-error`} role="alert" className="text-sm text-danger">
          {error}
        </p>
      ) : hint ? (
        <p id={`${inputId}-hint`} className="text-sm text-muted">
          {hint}
        </p>
      ) : null}
    </div>
  );
});
