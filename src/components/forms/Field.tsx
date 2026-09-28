import { forwardRef, useId, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { AlertCircle } from 'lucide-react';
import { cn } from '@/lib/cn';

const CONTROL =
  'w-full rounded-xl border bg-white px-4 text-[0.9375rem] text-ink placeholder:text-ink-muted ' +
  'transition-[border-color,box-shadow] duration-200 focus:outline-none focus-visible:outline-brand';

interface FieldShellProps {
  label: string;
  htmlFor: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: ReactNode;
  className?: string;
}

/** Shared label / hint / error scaffolding so every field is consistent. */
export function Field({ label, htmlFor, required, hint, error, children, className }: FieldShellProps) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label htmlFor={htmlFor} className="flex items-center gap-1.5 text-[0.8125rem] font-medium text-ink">
        {label}
        {required ? (
          <span className="text-brand" aria-hidden="true">
            *
          </span>
        ) : (
          <span className="font-normal text-ink-muted">(optional)</span>
        )}
      </label>
      {children}
      {error ? (
        <p id={`${htmlFor}-error`} className="flex items-center gap-1.5 text-[0.8125rem] text-[#B42318]" role="alert">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          {error}
        </p>
      ) : hint ? (
        <p id={`${htmlFor}-hint`} className="text-[0.8125rem] text-ink-muted">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

export interface TextFieldProps extends Omit<ComponentPropsWithoutRef<'input'>, 'id'> {
  label: string;
  hint?: string;
  error?: string;
  containerClassName?: string;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(function TextField(
  { label, hint, error, required, containerClassName, className, ...rest },
  ref,
) {
  const id = useId();
  return (
    <Field
      label={label}
      htmlFor={id}
      required={required}
      hint={hint}
      error={error}
      className={containerClassName}
    >
      <input
        id={id}
        ref={ref}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        className={cn(CONTROL, 'h-12', error ? 'border-[#F04438]' : 'border-line hover:border-brand-200 focus:border-brand', className)}
        {...rest}
      />
    </Field>
  );
});

export interface TextAreaFieldProps extends Omit<ComponentPropsWithoutRef<'textarea'>, 'id'> {
  label: string;
  hint?: string;
  error?: string;
  containerClassName?: string;
}

export const TextAreaField = forwardRef<HTMLTextAreaElement, TextAreaFieldProps>(function TextAreaField(
  { label, hint, error, required, containerClassName, className, ...rest },
  ref,
) {
  const id = useId();
  return (
    <Field
      label={label}
      htmlFor={id}
      required={required}
      hint={hint}
      error={error}
      className={containerClassName}
    >
      <textarea
        id={id}
        ref={ref}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        className={cn(CONTROL, 'min-h-[9rem] resize-y py-3.5 leading-relaxed', error ? 'border-[#F04438]' : 'border-line hover:border-brand-200 focus:border-brand', className)}
        {...rest}
      />
    </Field>
  );
});

export interface SelectFieldProps extends Omit<ComponentPropsWithoutRef<'select'>, 'id'> {
  label: string;
  hint?: string;
  error?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
  containerClassName?: string;
}

export const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(function SelectField(
  { label, hint, error, required, options, placeholder, containerClassName, className, ...rest },
  ref,
) {
  const id = useId();
  return (
    <Field label={label} htmlFor={id} required={required} hint={hint} error={error} className={containerClassName}>
      <div className="relative">
        <select
          id={id}
          ref={ref}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
          className={cn(
            CONTROL,
            'h-12 appearance-none pr-10',
            error ? 'border-[#F04438]' : 'border-line hover:border-brand-200 focus:border-brand',
            className,
          )}
          {...rest}
        >
          {placeholder ? <option value="">{placeholder}</option> : null}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <svg
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
          className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted"
        >
          <path d="m4 6 4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </Field>
  );
});
