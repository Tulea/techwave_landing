import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useContent } from '../i18n.jsx'

function setMeta(attr, key, value) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', value)
}

function setCanonical(href) {
  let el = document.head.querySelector('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

export function usePageMeta(page, { noindex = false } = {}) {
  const { seo, site } = useContent()
  const meta = seo[page]
  const { pathname } = useLocation()

  useEffect(() => {
    if (!meta) return
    const url = site.url + pathname
    document.title = meta.title
    setMeta('name', 'description', meta.description)
    setMeta('property', 'og:title', meta.title)
    setMeta('property', 'og:description', meta.description)
    setMeta('property', 'og:url', url)
    setMeta('name', 'robots', noindex ? 'noindex' : 'index, follow')
    setCanonical(url)
  }, [meta, site.url, pathname, noindex])
}
