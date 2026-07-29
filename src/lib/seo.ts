import { useEffect } from 'react'
import { site } from '@/content/site'

interface SeoOptions {
  title: string
  description: string
  /** Path only, e.g. "/about". Combined with the live origin for the canonical tag. */
  path?: string
  /** Absolute URL. Defaults to the OG image on the origin currently serving the page. */
  image?: string
  type?: 'website' | 'article'
  /** ISO date, set for news articles. */
  publishedTime?: string
}

function setMeta(selector: string, attr: 'name' | 'property', key: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', value)
}

function setLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.rel = rel
    document.head.appendChild(el)
  }
  el.href = href
}

/**
 * Per-page document metadata. React 19 can hoist <title>/<meta> from JSX, but
 * doing it here keeps every page's SEO in one predictable shape and guarantees
 * tags are replaced rather than duplicated across client-side navigations.
 */
export function useSeo({
  title,
  description,
  path = '',
  image,
  type = 'website',
  publishedTime,
}: SeoOptions) {
  useEffect(() => {
    const fullTitle = title.includes(site.name) ? title : `${title} — ${site.name}`
    /*
     * Derived from the live location rather than a build-time constant, so the
     * canonical stays self-referential on whatever domain is serving the page —
     * the vercel.app URL today, the real domain once it is pointed here. The
     * static tags in index.html are what crawlers actually read; these keep the
     * client-side navigations consistent with them.
     */
    const origin = window.location.origin
    const url = `${origin}${path}`
    const imageUrl = image ?? `${origin}/og-image.svg`

    document.title = fullTitle

    setMeta('meta[name="description"]', 'name', 'description', description)
    setMeta('meta[property="og:title"]', 'property', 'og:title', fullTitle)
    setMeta('meta[property="og:description"]', 'property', 'og:description', description)
    setMeta('meta[property="og:url"]', 'property', 'og:url', url)
    setMeta('meta[property="og:type"]', 'property', 'og:type', type)
    setMeta('meta[property="og:image"]', 'property', 'og:image', imageUrl)
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', fullTitle)
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description)
    setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', imageUrl)
    setLink('canonical', url)

    const publishedEl = document.head.querySelector('meta[property="article:published_time"]')
    if (publishedTime) {
      setMeta(
        'meta[property="article:published_time"]',
        'property',
        'article:published_time',
        publishedTime,
      )
    } else if (publishedEl) {
      publishedEl.remove()
    }
  }, [title, description, path, image, type, publishedTime])
}
