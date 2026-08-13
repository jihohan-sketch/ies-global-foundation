import type { ReactNode } from 'react'
import { cx } from '@/lib/utils'

/*
 * Shared field styling for every form on the site. Extracted so the contact and
 * join forms cannot drift apart, and — more to the point — so the contrast of a
 * field's border is decided once. See the mist ladder in index.css: `mist/55`
 * is the floor at which a border still marks out an interactive control under
 * WCAG 1.4.11, and these fields sit at exactly that.
 */

export const labelClass = 'block text-xs font-medium tracking-[0.18em] text-mist uppercase mb-3'

/* No `focus:outline-none` here: a 1px border tint is too quiet to serve as the
   only focus indicator, so the gold ring from index.css is left in place.
   Placeholder sits at /75 — /45 measured 2.67:1 against the field, under AA,
   and /70 still fell short against the lighter focused background. */
export const inputClass =
  'w-full border border-mist/55 bg-navy-700/30 px-5 py-3.5 text-[0.9375rem] font-light text-paper placeholder:text-mist/75 transition-colors duration-300 focus:border-[var(--accent)]/70 focus:bg-navy-700/50'

export const invalidInputClass = 'border-red-400/70 bg-red-400/5'

/** Error text pairs an icon with the colour, so the state survives colour blindness. */
export function FieldError({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} className="mt-2.5 flex items-start gap-2 text-[0.8125rem] font-light text-red-300">
      <svg aria-hidden viewBox="0 0 16 16" fill="none" className="mt-0.5 h-4 w-4 shrink-0">
        <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 5v3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="8" cy="11" r="0.85" fill="currentColor" />
      </svg>
      {children}
    </p>
  )
}

/** The asterisk is `aria-hidden` because the control carries `required` itself. */
function RequiredMark() {
  return (
    <span aria-hidden className="text-[var(--accent)]">
      *
    </span>
  )
}

export function Field({
  label,
  name,
  type = 'text',
  required = false,
  autoComplete,
  error,
  onBlur,
  onInput,
}: {
  label: string
  name: string
  type?: string
  required?: boolean
  autoComplete?: string
  error?: string
  onBlur?: (name: string, value: string) => void
  onInput?: (name: string) => void
}) {
  const errorId = `${name}-error`
  return (
    <div>
      <label htmlFor={name} className={labelClass}>
        {label} {required && <RequiredMark />}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        onBlur={(e) => onBlur?.(name, e.target.value)}
        onInput={() => onInput?.(name)}
        className={cx(inputClass, error && invalidInputClass)}
      />
      {error && <FieldError id={errorId}>{error}</FieldError>}
    </div>
  )
}

export function TextAreaField({
  label,
  name,
  rows = 6,
  required = false,
  placeholder,
  error,
  onBlur,
  onInput,
}: {
  label: string
  name: string
  rows?: number
  required?: boolean
  placeholder?: string
  error?: string
  onBlur?: (name: string, value: string) => void
  onInput?: (name: string) => void
}) {
  const errorId = `${name}-error`
  return (
    <div>
      <label htmlFor={name} className={labelClass}>
        {label} {required && <RequiredMark />}
      </label>
      <textarea
        id={name}
        name={name}
        rows={rows}
        required={required}
        placeholder={placeholder}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        onBlur={(e) => onBlur?.(name, e.target.value)}
        onInput={() => onInput?.(name)}
        className={cx(inputClass, 'resize-y', error && invalidInputClass)}
      />
      {error && <FieldError id={errorId}>{error}</FieldError>}
    </div>
  )
}

export function SelectField({
  label,
  name,
  value,
  onChange,
  options,
}: {
  label: string
  name: string
  value: string
  onChange: (value: string) => void
  options: ReadonlyArray<{ value: string; label: string }>
}) {
  return (
    <div>
      <label htmlFor={name} className={labelClass}>
        {label}
      </label>
      {/* `appearance-none` strips the native arrow, so the affordance has to be
          drawn back in — without it the select reads as a plain text input. */}
      <div className="relative">
        <select
          id={name}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cx(inputClass, 'appearance-none bg-navy-700/40 pr-12')}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value} className="bg-navy text-paper">
              {option.label}
            </option>
          ))}
        </select>
        <svg
          aria-hidden
          viewBox="0 0 16 16"
          fill="none"
          className="pointer-events-none absolute top-1/2 right-5 h-4 w-4 -translate-y-1/2 text-mist"
        >
          <path
            d="M4 6.5 8 10.5 12 6.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  )
}

/** Hidden field that only a bot will fill in. Paired with a time-on-form check. */
export function Honeypot({ name = 'company' }: { name?: string }) {
  return (
    <div aria-hidden className="absolute h-0 w-0 overflow-hidden opacity-0">
      <label htmlFor={name}>Company (leave blank)</label>
      <input id={name} name={name} type="text" tabIndex={-1} autoComplete="off" />
    </div>
  )
}
