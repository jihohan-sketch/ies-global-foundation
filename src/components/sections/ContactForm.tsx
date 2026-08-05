import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Button } from '@/components/ui/Primitives'
import { cx } from '@/lib/utils'

const TOPICS = [
  { value: 'general', label: 'General inquiry' },
  { value: 'membership', label: 'Membership' },
  { value: 'chapter', label: 'School chapter' },
  { value: 'branch', label: 'National branch role' },
  { value: 'partnership', label: 'Partnership' },
  { value: 'media', label: 'Media' },
] as const

type Status = 'idle' | 'submitting' | 'success' | 'error'

type FieldName = 'name' | 'email' | 'message'

/** DOM order, so the first invalid field is also the topmost one. */
const REQUIRED_FIELDS: FieldName[] = ['name', 'email', 'message']

/**
 * Deliberately permissive — the endpoint is the real authority on deliverability.
 * This only catches the obvious typo before a visitor waits on a round trip.
 */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validateField(name: FieldName, value: string): string | undefined {
  const trimmed = value.trim()

  if (!trimmed) {
    return {
      name: 'Please enter your name.',
      email: 'Please enter your email address so we can reply.',
      message: 'Please tell us what your inquiry is about.',
    }[name]
  }

  if (name === 'email' && !EMAIL_PATTERN.test(trimmed)) {
    return 'Please enter a valid email address, for example name@school.org.'
  }

  return undefined
}

/**
 * Contact form.
 *
 * Delivery: set `VITE_CONTACT_ENDPOINT` to any endpoint that accepts a JSON
 * POST (a form service, a serverless function, or a Supabase edge function).
 * With no endpoint configured the form falls back to opening a pre-filled mail
 * draft, so it never silently discards a message.
 *
 * Spam protection is layered and requires no third-party script:
 *   1. a hidden honeypot field that real users never fill in;
 *   2. a minimum time-on-form check — bots submit almost instantly.
 * Add a CAPTCHA at the endpoint if volume ever warrants it.
 */
export function ContactForm({ defaultTopic = 'general' }: { defaultTopic?: string }) {
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<FieldName, string>>>({})
  const [topic, setTopic] = useState(defaultTopic)
  const mountedAt = useRef(Date.now())
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => setTopic(defaultTopic), [defaultTopic])

  const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined

  /** Validates on blur only — flagging an address as malformed mid-keystroke
   *  is noise, since every partial entry is invalid on the way to a valid one. */
  function handleBlur(name: FieldName, value: string) {
    setFieldErrors((prev) => ({ ...prev, [name]: validateField(name, value) }))
  }

  /** Clears a field's error as soon as the visitor starts fixing it. */
  function handleInput(name: FieldName) {
    setFieldErrors((prev) => (prev[name] ? { ...prev, [name]: undefined } : prev))
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)

    const form = event.currentTarget
    const data = new FormData(form)

    // 1 — honeypot
    if ((data.get('company') as string)?.trim()) {
      setStatus('success') // Fail silently for bots.
      return
    }

    const payload = {
      name: (data.get('name') as string)?.trim(),
      email: (data.get('email') as string)?.trim(),
      organization: (data.get('organization') as string)?.trim(),
      topic: data.get('topic') as string,
      message: (data.get('message') as string)?.trim(),
    }

    const nextErrors: Partial<Record<FieldName, string>> = {}
    for (const field of REQUIRED_FIELDS) {
      const message = validateField(field, payload[field] ?? '')
      if (message) nextErrors[field] = message
    }

    if (Object.keys(nextErrors).length > 0) {
      setFieldErrors(nextErrors)
      setStatus('error')
      // Send the visitor straight to the first problem rather than making them hunt.
      const firstInvalid = REQUIRED_FIELDS.find((field) => nextErrors[field])
      if (firstInvalid) {
        const control = formRef.current?.elements.namedItem(firstInvalid)
        if (control instanceof HTMLElement) control.focus()
      }
      return
    }

    /*
     * 2 — time-on-form, checked last on purpose. It used to run before
     * validation, so anyone who hit Send quickly on an empty form was told to
     * "take a moment" while the fields that were actually wrong went unmarked.
     * A person always gets told what is wrong with their form first; this only
     * ever stands between a *complete* submission and the endpoint.
     */
    if (Date.now() - mountedAt.current < 3000) {
      setError('Please take a moment to complete the form before submitting.')
      setStatus('error')
      return
    }

    setFieldErrors({})
    setStatus('submitting')

    if (!endpoint) {
      // No backend configured — hand off to the visitor's mail client.
      const subject = encodeURIComponent(`[${payload.topic}] Website inquiry from ${payload.name}`)
      const body = encodeURIComponent(
        `Name: ${payload.name}\nEmail: ${payload.email}\nOrganization: ${payload.organization || '—'}\nTopic: ${payload.topic}\n\n${payload.message}`,
      )
      window.location.href = `mailto:theiesociety@gmail.com?subject=${subject}&body=${body}`
      setStatus('success')
      form.reset()
      return
    }

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!response.ok) throw new Error(`Request failed with status ${response.status}`)
      setStatus('success')
      form.reset()
    } catch {
      setError(
        'We could not send your message. Please email theiesociety@gmail.com directly.',
      )
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="border border-[var(--accent)]/40 bg-[var(--accent)]/6 p-10 text-center" role="status">
        <p className="font-serif text-h3 text-[var(--accent)]">Message sent</p>
        <p className="mx-auto mt-5 max-w-md leading-relaxed font-light text-mist">
          Thank you for getting in touch. Inquiries are directed to the relevant branch or team,
          and we aim to respond within a few working days.
        </p>
        <button
          type="button"
          onClick={() => {
            mountedAt.current = Date.now()
            setStatus('idle')
          }}
          className="mt-8 text-[0.75rem] font-medium tracking-[0.14em] text-paper/80 uppercase underline underline-offset-8 transition-colors hover:text-[var(--accent)]"
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-6">
      {/* Honeypot — visually and programmatically hidden from real users. */}
      <div aria-hidden className="absolute h-0 w-0 overflow-hidden opacity-0">
        <label htmlFor="company">Company (leave blank)</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          label="Name"
          name="name"
          required
          autoComplete="name"
          error={fieldErrors.name}
          onBlur={handleBlur}
          onInput={handleInput}
        />
        <Field
          label="Email"
          name="email"
          type="email"
          required
          autoComplete="email"
          error={fieldErrors.email}
          onBlur={handleBlur}
          onInput={handleInput}
        />
      </div>

      <Field label="School or organization" name="organization" autoComplete="organization" />

      <div>
        <label htmlFor="topic" className={labelClass}>
          Topic
        </label>
        {/* `appearance-none` strips the native arrow, so the affordance has to be
            drawn back in — without it the select reads as a plain text input. */}
        <div className="relative">
          <select
            id="topic"
            name="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className={cx(inputClass, 'appearance-none bg-navy-700/40 pr-12')}
          >
            {TOPICS.map((option) => (
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

      <div>
        <label htmlFor="message" className={labelClass}>
          Message{' '}
          <span aria-hidden className="text-[var(--accent)]">
            *
          </span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          aria-invalid={fieldErrors.message ? true : undefined}
          aria-describedby={fieldErrors.message ? 'message-error' : undefined}
          onBlur={(e) => handleBlur('message', e.target.value)}
          onInput={() => handleInput('message')}
          className={cx(inputClass, 'resize-y', fieldErrors.message && invalidInputClass)}
          placeholder="Tell us a little about who you are and what you are looking for."
        />
        {fieldErrors.message && <FieldError id="message-error">{fieldErrors.message}</FieldError>}
      </div>

      {error && (
        <p role="alert" className="border border-red-400/40 bg-red-400/8 px-5 py-4 text-sm text-red-200">
          {error}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-6 pt-2">
        <Button type="submit" variant="primary" disabled={status === 'submitting'} arrow>
          {status === 'submitting' ? 'Sending…' : 'Send message'}
        </Button>
        <p className="text-xs font-light text-mist/70">
          We use your details only to respond to your inquiry.
        </p>
      </div>
    </form>
  )
}

const labelClass =
  'block text-xs font-medium tracking-[0.18em] text-mist uppercase mb-3'

/* No `focus:outline-none` here: a 1px border tint is too quiet to serve as the
   only focus indicator, so the gold ring from index.css is left in place.
   Placeholder sits at /75 — /45 measured 2.67:1 against the field, under AA,
   and /70 still fell short against the lighter focused background. */
const inputClass =
  'w-full border border-mist/22 bg-navy-700/30 px-5 py-3.5 text-[0.9375rem] font-light text-paper placeholder:text-mist/75 transition-colors duration-300 focus:border-[var(--accent)]/70 focus:bg-navy-700/50'

const invalidInputClass = 'border-red-400/70 bg-red-400/5'

/** Error text pairs an icon with the colour, so the state survives colour blindness. */
function FieldError({ id, children }: { id: string; children: ReactNode }) {
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

function Field({
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
  onBlur?: (name: FieldName, value: string) => void
  onInput?: (name: FieldName) => void
}) {
  const errorId = `${name}-error`
  return (
    <div>
      <label htmlFor={name} className={labelClass}>
        {label}{' '}
        {required && (
          <span aria-hidden className="text-[var(--accent)]">
            *
          </span>
        )}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        onBlur={(e) => onBlur?.(name as FieldName, e.target.value)}
        onInput={() => onInput?.(name as FieldName)}
        className={cx(inputClass, error && invalidInputClass)}
      />
      {error && <FieldError id={errorId}>{error}</FieldError>}
    </div>
  )
}
