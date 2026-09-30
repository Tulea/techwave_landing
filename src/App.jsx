import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import NotFound from './components/NotFound.jsx'

function Placeholder({ name }) {
  return <main className="container-site py-24"><h1 className="text-3xl font-bold text-brand-800">{name}</h1></main>
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Placeholder name="Inicio" />} />
        <Route path="/nosotros" element={<Placeholder name="Nosotros" />} />
        <Route path="/servicios" element={<Placeholder name="Servicios" />} />
        <Route path="/contacto" element={<Placeholder name="Contacto" />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
