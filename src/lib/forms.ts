/**
 * Form delivery.
 *
 * Submissions go to Web3Forms, which forwards them as email to the address the
 * access key was registered against — theiesociety@gmail.com and
 * jiho.han@valorschool.org. There is no backend of our own in the loop.
 *
 * The key below is not a secret. Web3Forms access keys are public identifiers,
 * the same class of thing as a Stripe publishable key or a Google Analytics ID:
 * they are meant to sit in client HTML, they authorise nothing except "send a
 * message to the inbox this key belongs to", and they cannot be used to read
 * anything back. Vite inlines `import.meta.env.VITE_*` into the bundle at build
 * time, so routing it through an env var would not hide it either — the env
 * override exists so the key can be rotated or pointed at a test inbox without
 * a code change, not for secrecy.
 *
 * To rotate: get a new key at https://web3forms.com, then either replace the
 * constant or set VITE_WEB3FORMS_KEY in the Vercel project settings.
 */
const FALLBACK_KEY = 'c1f95b3b-11bb-48a9-8e1d-a945751a3842'

export const web3formsKey =
  (import.meta.env.VITE_WEB3FORMS_KEY as string | undefined) || FALLBACK_KEY

const ENDPOINT = 'https://api.web3forms.com/submit'

/** Where a submission lands if Web3Forms is ever unreachable. */
export const FALLBACK_INBOX = 'theiesociety@gmail.com'

export interface SubmitOptions {
  /** Subject line of the notification email. */
  subject: string
  /** Field name → value. Rendered as the body of the email, in this order. */
  fields: Record<string, string | undefined>
  /** Honeypot contents. Non-empty means a bot filled a hidden field. */
  botcheck?: string
}

/**
 * Posts a submission and resolves only if Web3Forms accepted it.
 *
 * Throws on both transport failure and an application-level rejection — the API
 * answers 200 with `{ success: false }` for things like a disabled key, so the
 * status code alone is not enough to tell a delivered message from a dropped one.
 */
export async function submitForm({ subject, fields, botcheck }: SubmitOptions): Promise<void> {
  const response = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      access_key: web3formsKey,
      subject,
      // Web3Forms uses this as the email's From display name.
      from_name: 'IES Global Foundation website',
      botcheck: botcheck || '',
      ...fields,
    }),
  })

  const result = (await response.json().catch(() => null)) as { success?: boolean } | null

  if (!response.ok || !result?.success) {
    throw new Error(`Web3Forms rejected the submission (HTTP ${response.status})`)
  }
}

/**
 * Builds a `mailto:` draft as the last resort, used only when the network call
 * above has already failed. Keeps a visitor's typing from being thrown away.
 */
export function mailtoFallback(subject: string, fields: Record<string, string | undefined>): string {
  const body = Object.entries(fields)
    .map(([label, value]) => `${label}: ${value || '—'}`)
    .join('\n')
  return `mailto:${FALLBACK_INBOX}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}
