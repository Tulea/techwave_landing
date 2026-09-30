import Hero from '../components/home/Hero.jsx'
import QuickLinks from '../components/home/QuickLinks.jsx'
import AboutBrief from '../components/home/AboutBrief.jsx'
import PainPoints from '../components/home/PainPoints.jsx'
import ServiceCards from '../components/home/ServiceCards.jsx'
import ProtejaSusDatos from '../components/home/ProtejaSusDatos.jsx'
import LogoWall from '../components/home/LogoWall.jsx'
import Counters from '../components/Counters.jsx'
import Testimonials from '../components/home/Testimonials.jsx'
import FinalCta from '../components/home/FinalCta.jsx'

export default function Home() {
  return (
    <>
      <Hero />
      <QuickLinks />
      <AboutBrief />
      <PainPoints />
      <ServiceCards />
      <ProtejaSusDatos />
      <LogoWall />
      <Counters />
      <Testimonials />
      <FinalCta />
    </>
  )
}
