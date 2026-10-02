import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import NotFound from './components/NotFound.jsx'
import Home from './pages/Home.jsx'
import Nosotros from './pages/Nosotros.jsx'
import Servicios from './pages/Servicios.jsx'
import Contacto from './pages/Contacto.jsx'
import Privacidad from './pages/Privacidad.jsx'
import TrabajaConNosotros from './pages/TrabajaConNosotros.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/privacidad" element={<Privacidad />} />
        <Route path="/trabaja-con-nosotros" element={<TrabajaConNosotros />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
