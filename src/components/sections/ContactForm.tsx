import { useEffect, useRef, useState } from 'react'
import {
  Field,
  FieldError,
  Honeypot,
  SelectField,
  TextAreaField,
} from '@/components/ui/FormFields'
import { mailtoFallback, submitForm } from '@/lib/forms'

const TOPICS = [
  { value: 'general', label: 'General inquiry' },
  { value: 'council', label: 'IES Leadership Council' },
  { value: 'branch', label: 'Branch support' },
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
 * Sends a notification email through Web3Forms — see `lib/forms.ts`. If that
 * call fails the visitor is handed a pre-filled mail draft rather than being
 * told to start again, so a message is never silently discarded.
 *
 * Spam protection is layered and requires no third-party script:
 *   1. a hidden honeypot field that real users never fill in;
 *   2. a minimum time-on-form check — bots submit almost instantly.
 * Add a CAPTCHA at the endpoint if volume ever warrants it.
 */
export function ContactForm({ defaultTopic = 'general' }: { defaultTopic?: string }) {
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState<string | null>(null)
  const [fallbackHref, setFallbackHref] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<FieldName, string>>>({})
  const [topic, setTopic] = useState(defaultTopic)
  const mountedAt = useRef(Date.now())
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => setTopic(defaultTopic), [defaultTopic])

  /** Validates on blur only — flagging an address as malformed mid-keystroke
   *  is noise, since every partial entry is invalid on the way to a valid one. */
  function handleBlur(name: string, value: string) {
    setFieldErrors((prev) => ({ ...prev, [name]: validateField(name as FieldName, value) }))
  }

  /** Clears a field's error as soon as the visitor starts fixing it. */
  function handleInput(name: string) {
    setFieldErrors((prev) => (prev[name as FieldName] ? { ...prev, [name]: undefined } : prev))
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setFallbackHref(null)

    const form = event.currentTarget
    const data = new FormData(form)

    const payload = {
      name: (data.get('name') as string)?.trim(),
      email: (data.get('email') as string)?.trim(),
      organization: (data.get('organization') as string)?.trim(),
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
     * Time-on-form, checked last on purpose. It used to run before validation,
     * so anyone who hit Send quickly on an empty form was told to "take a
     * moment" while the fields that were actually wrong went unmarked. A person
     * always gets told what is wrong with their form first; this only ever
     * stands between a *complete* submission and delivery.
     */
    if (Date.now() - mountedAt.current < 3000) {
      setError('Please take a moment to complete the form before submitting.')
      setStatus('error')
      return
    }

    const topicLabel = TOPICS.find((option) => option.value === topic)?.label ?? topic

    const fields = {
      Name: payload.name,
      Email: payload.email,
      'School or organization': payload.organization,
      Topic: topicLabel,
      Message: payload.message,
    }

    const subject = `New IES inquiry — ${payload.name} (${topicLabel})`

    setFieldErrors({})
    setStatus('submitting')

    try {
      await submitForm({
        subject,
        fields,
        botcheck: (data.get('company') as string) ?? '',
      })
      setStatus('success')
      form.reset()
    } catch {
      /* Delivery failed. Rather than tell the visitor to write to us elsewhere
         from scratch, hand them a draft carrying everything they already typed. */
      setFallbackHref(mailtoFallback(subject, fields))
      setError('We could not send your message automatically.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="border bg-bone p-10 text-center" role="status">
        <p className="text-h3 font-serif text-navy">Message sent</p>
        <p className="mx-auto mt-4 max-w-md text-ink-soft">
          Thank you. We will reply by email.
        </p>
        <button
          type="button"
          onClick={() => {
            mountedAt.current = Date.now()
            setStatus('idle')
          }}
          className="link mt-6 text-[0.9375rem] font-medium text-navy"
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-6">
      <Honeypot />

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

      <SelectField label="Topic" name="topic" value={topic} onChange={setTopic} options={TOPICS} />

      <TextAreaField
        label="Message"
        name="message"
        required
        error={fieldErrors.message}
        onBlur={handleBlur}
        onInput={handleInput}
        placeholder="Who you are, and what you are looking for."
      />

      {error && (
        <div role="alert" className="border border-red-700/40 bg-red-50 px-5 py-4">
          <FieldError id="contact-form-error">{error}</FieldError>
          {fallbackHref && (
            <a
              href={fallbackHref}
              className="link mt-3 inline-block text-[0.875rem] text-navy"
            >
              Send as an email instead — your answers are already filled in
            </a>
          )}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-6 pt-2">
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="rounded-sm bg-navy px-6 py-3.5 text-[0.9375rem] font-medium text-paper transition-colors hover:bg-navy-600 disabled:opacity-60"
        >
          {status === 'submitting' ? 'Sending…' : 'Send message'}
        </button>
        <p className="text-[0.8125rem] text-slate">
          Your details are used only to reply.
        </p>
      </div>
    </form>
  )
}
