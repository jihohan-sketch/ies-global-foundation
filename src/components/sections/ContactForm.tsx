import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/Primitives'
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
      <div className="border border-[var(--accent)]/40 bg-[var(--accent)]/6 p-10 text-center" role="status">
        <p className="font-serif text-h3 text-[var(--accent)]">Message sent</p>
        <p className="mx-auto mt-5 max-w-md leading-relaxed text-mist">
          Thank you for getting in touch. Inquiries are directed to the relevant branch or team,
          and we aim to respond within a few working days.
        </p>
        <button
          type="button"
          onClick={() => {
            mountedAt.current = Date.now()
            setStatus('idle')
          }}
          className="mt-8 text-[0.75rem] font-medium tracking-[0.14em] text-paper uppercase underline underline-offset-8 transition-colors hover:text-[var(--accent)]"
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
        placeholder="Tell us a little about who you are and what you are looking for."
      />

      {error && (
        <div role="alert" className="border border-red-400/40 bg-red-400/8 px-5 py-4">
          <FieldError id="contact-form-error">{error}</FieldError>
          {fallbackHref && (
            <a
              href={fallbackHref}
              className="mt-3 inline-block text-[0.8125rem] text-paper underline underline-offset-4 transition-colors hover:text-[var(--accent)]"
            >
              Send it as an email instead — your answers are already filled in
            </a>
          )}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-6 pt-2">
        <Button type="submit" variant="primary" disabled={status === 'submitting'} arrow>
          {status === 'submitting' ? 'Sending…' : 'Send message'}
        </Button>
        <p className="text-xs text-mist">
          We use your details only to respond to your inquiry.
        </p>
      </div>
    </form>
  )
}
