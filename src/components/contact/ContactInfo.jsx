import { site, contact } from '../../data/content.js'

export default function ContactInfo() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-brand-900">Información de contacto</h2>
        <p className="mt-3 text-slate-600">{contact.body}</p>
      </div>
      <ul className="space-y-4 text-sm">
        <li className="flex gap-3">
          <span className="text-accent-500" aria-hidden="true">📍</span>
          <span className="text-slate-700">{site.address}</span>
        </li>
        <li className="flex gap-3">
          <span className="text-accent-500" aria-hidden="true">📞</span>
          <a href={`tel:${site.phone.replace(/[^+\d]/g, '')}`} className="text-slate-700 transition hover:text-brand-800">
            {site.phone}
          </a>
        </li>
        <li className="flex gap-3">
          <span className="text-accent-500" aria-hidden="true">✉️</span>
          <a href={`mailto:${site.email}`} className="text-slate-700 transition hover:text-brand-800">
            {site.email}
          </a>
        </li>
      </ul>
      <div className="overflow-hidden rounded-2xl border border-slate-200">
        <iframe
          title="Ubicación de TechWave IT Services"
          src={contact.mapEmbed}
          className="h-64 w-full"
          loading="lazy"
        />
      </div>
    </div>
  )
}
