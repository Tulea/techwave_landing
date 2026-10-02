import { Link } from 'react-router-dom'
import { useContent } from '../i18n.jsx'
import { usePageMeta } from '../hooks/usePageMeta.js'

export default function NotFound() {
  const { notFound } = useContent()
  usePageMeta('notFound', { noindex: true })
  return (
    <section className="section">
      <div className="container-site mx-auto max-w-2xl py-16 text-center">
        <p className="eyebrow">{notFound.eyebrow}</p>
        <h1 className="mt-3 text-4xl font-bold text-brand-800">{notFound.title}</h1>
        <p className="mt-4 text-slate-600">
          {notFound.body}
        </p>
        <Link to="/" className="btn-primary mt-8">
          {notFound.cta}
        </Link>
      </div>
    </section>
  )
}
