import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/Primitives'
import {
  Field,
  FieldError,
  Honeypot,
  SelectField,
  TextAreaField,
} from '@/components/ui/FormFields'
import { joinPathways } from '@/content/join'
import { branches } from '@/content/branches'
import { mailtoFallback, submitForm } from '@/lib/forms'

/* Pathway options mirror the five routes listed above the form, so a visitor
   picks the same words they just read rather than a re-worded shortlist. */
const PATHWAY_OPTIONS = joinPathways.map((pathway) => ({
  value: pathway.id,
  label: pathway.title,
}))

const COUNTRY_OPTIONS = [
  ...branches.map((branch) => ({ value: branch.country, label: branch.country })),
  { value: 'Elsewhere', label: 'Somewhere else' },
]

type Status = 'idle' | 'submitting' | 'success' | 'error'
type FieldName = 'name' | 'email' | 'message'

/** DOM order, so the first invalid field is also the topmost one. */
const REQUIRED_FIELDS: FieldName[] = ['name', 'email', 'message']

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validateField(name: FieldName, value: string): string | undefined {
  const trimmed = value.trim()

  if (!trimmed) {
    return {
      name: 'Please enter your name.',
      email: 'Please enter your email address so we can reply.',
      message: 'Please tell us a little about why you want to join.',
    }[name]
  }

  if (name === 'email' && !EMAIL_PATTERN.test(trimmed)) {
    return 'Please enter a valid email address, for example name@school.org.'
  }

  return undefined
}

/**
 * Join application form.
 *
 * Sends a notification email through Web3Forms — see `lib/forms.ts`. Spam
 * protection is the same two layers the contact form uses and needs no
 * third-party script: a honeypot field real visitors never see, and a minimum
 * time-on-form check, since bots submit almost instantly.
 */
export function JoinForm({ defaultPathway = 'member' }: { defaultPathway?: string }) {
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState<string | null>(null)
  const [fallbackHref, setFallbackHref] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<FieldName, string>>>({})
  const [pathway, setPathway] = useState(defaultPathway)
  const [country, setCountry] = useState(COUNTRY_OPTIONS[0].value)
  const mountedAt = useRef(Date.now())
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => setPathway(defaultPathway), [defaultPathway])

  /** Validates on blur only — flagging an address as malformed mid-keystroke
   *  is noise, since every partial entry is invalid on the way to a valid one. */
  function handleBlur(name: string, value: string) {
    setFieldErrors((prev) => ({ ...prev, [name]: validateField(name as FieldName, value) }))
  }

  /** Clears a field's error as soon as the visitor starts fixing it. */
  function handleInput(name: string) {
    setFieldErrors((prev) =>
      prev[name as FieldName] ? { ...prev, [name]: undefined } : prev,
    )
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
      school: (data.get('school') as string)?.trim(),
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

    /* Time-on-form, checked after validation on purpose: a person always gets
       told what is wrong with their form first, and this only ever stands
       between a *complete* submission and delivery. */
    if (Date.now() - mountedAt.current < 3000) {
      setError('Please take a moment to complete the form before submitting.')
      setStatus('error')
      return
    }

    const pathwayLabel =
      PATHWAY_OPTIONS.find((option) => option.value === pathway)?.label ?? pathway

    const fields = {
      Name: payload.name,
      Email: payload.email,
      'School or organization': payload.school,
      Country: country,
      Pathway: pathwayLabel,
      Message: payload.message,
    }

    const subject = `New IES join request — ${payload.name} (${pathwayLabel})`

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
      /* Delivery failed. Rather than tell the visitor to start again elsewhere,
         hand them a pre-filled draft carrying everything they already typed. */
      setFallbackHref(mailtoFallback(subject, fields))
      setError('We could not send your application automatically.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div
        className="border border-[var(--accent)]/40 bg-[var(--accent)]/6 p-10 text-center"
        role="status"
      >
        <p className="font-serif text-h3 text-[var(--accent)]">Application received</p>
        <p className="mx-auto mt-5 max-w-md leading-relaxed text-mist">
          Thank you for applying. Your request goes to the branch in your country, and someone
          will reply within a few working days.
        </p>
        <button
          type="button"
          onClick={() => {
            mountedAt.current = Date.now()
            setStatus('idle')
          }}
          className="mt-8 text-[0.75rem] font-medium tracking-[0.14em] text-paper uppercase underline underline-offset-8 transition-colors hover:text-[var(--accent)]"
        >
          Submit another application
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

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="School or organization" name="school" autoComplete="organization" />
        <SelectField
          label="Where you are"
          name="country"
          value={country}
          onChange={setCountry}
          options={COUNTRY_OPTIONS}
        />
      </div>

      <SelectField
        label="Which pathway"
        name="pathway"
        value={pathway}
        onChange={setPathway}
        options={PATHWAY_OPTIONS}
      />

      <TextAreaField
        label="Why you want to join"
        name="message"
        required
        rows={5}
        placeholder="Tell us what you want to take on, and what you are hoping to get out of it."
        error={fieldErrors.message}
        onBlur={handleBlur}
        onInput={handleInput}
      />

      {error && (
        <div role="alert" className="border border-red-400/40 bg-red-400/8 px-5 py-4">
          <FieldError id="join-form-error">{error}</FieldError>
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
          {status === 'submitting' ? 'Sending…' : 'Submit application'}
        </Button>
        <p className="text-xs text-mist">
          We use your details only to respond to your application.
        </p>
      </div>
    </form>
  )
}
