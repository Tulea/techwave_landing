import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="section">
      <div className="container-site mx-auto max-w-2xl py-16 text-center">
        <p className="eyebrow">Error 404</p>
        <h1 className="mt-3 text-4xl font-bold text-brand-800">Página no encontrada</h1>
        <p className="mt-4 text-slate-600">
          La página que busca no existe o fue movida.
        </p>
        <Link to="/" className="btn-primary mt-8">
          Volver al inicio
        </Link>
      </div>
    </section>
  )
}
