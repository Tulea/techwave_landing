import { Link } from 'react-router-dom'
import { useContent } from '../../i18n.jsx'

export default function FinalCta() {
  const { finalCta } = useContent()
  return (
    <section className="section">
      <div className="container-site">
        <div className="rounded-3xl bg-gradient-to-r from-brand-800 to-brand-600 px-6 py-12 text-center sm:px-16 sm:py-14">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">{finalCta.title}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-brand-100">{finalCta.body}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4">
            {finalCta.buttons.map((b) =>
              b.primary ? (
                <Link key={b.label} to={b.to} className="btn-primary bg-accent-500 hover:bg-accent-600">
                  {b.label}
                </Link>
              ) : (
                <a key={b.label} href={b.to} className="btn-secondary border-white/30 bg-transparent text-white hover:bg-white/10">
                  {b.label}
                </a>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
