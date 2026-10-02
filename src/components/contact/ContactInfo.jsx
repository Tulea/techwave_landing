import { useContent } from '../../i18n.jsx'

const icons = {
  address: 'M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z',
  phone: 'M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z',
  email: 'M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75',
}

function Icon({ name }) {
  return (
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-800">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d={icons[name]} />
      </svg>
    </span>
  )
}

export default function ContactInfo() {
  const { site, contact } = useContent()
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-brand-900">{contact.infoHeading}</h2>
        <p className="mt-3 text-slate-600">{contact.body}</p>
      </div>
      <ul className="space-y-3 text-sm">
        <li className="flex items-center gap-3">
          <Icon name="address" />
          <span className="text-slate-700">{site.address}</span>
        </li>
        <li className="flex items-center gap-3">
          <Icon name="phone" />
          <a href={`tel:${site.phone.replace(/[^+\d]/g, '')}`} className="text-slate-700 transition hover:text-brand-800">
            {site.phone}
          </a>
        </li>
        <li className="flex items-center gap-3">
          <Icon name="email" />
          <a href={`mailto:${site.email}`} className="break-all text-slate-700 transition hover:text-brand-800">
            {site.email}
          </a>
        </li>
      </ul>
    </div>
  )
}
