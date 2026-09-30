import { aboutBrief } from '../../data/content.js'
import SectionHeading from '../SectionHeading.jsx'

export default function AboutBrief() {
  return (
    <section className="section">
      <div className="container-site">
        <SectionHeading eyebrow={aboutBrief.eyebrow} title={aboutBrief.title} />
        <p className="mx-auto mt-6 max-w-3xl text-center text-lg leading-relaxed text-slate-600">
          {aboutBrief.body}
        </p>
        <ul className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-3">
          {aboutBrief.highlights.map((h) => (
            <li
              key={h}
              className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 text-sm font-medium text-slate-700 shadow-sm"
            >
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 shrink-0 text-accent-500" aria-hidden="true">
                <path fillRule="evenodd" d="M16.7 5.3a1 1 0 0 1 0 1.4l-8 8a1 1 0 0 1-1.4 0l-4-4a1 1 0 1 1 1.4-1.4L8 12.6l7.3-7.3a1 1 0 0 1 1.4 0Z" clipRule="evenodd" />
              </svg>
              {h}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
