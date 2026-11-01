import Hero from '../components/home/Hero.jsx'
import AboutBrief from '../components/home/AboutBrief.jsx'
import PainPoints from '../components/home/PainPoints.jsx'
import ServiceCards from '../components/home/ServiceCards.jsx'
import LogoWall from '../components/home/LogoWall.jsx'
import Testimonials from '../components/home/Testimonials.jsx'
import FinalCta from '../components/home/FinalCta.jsx'
import { usePageMeta } from '../hooks/usePageMeta.js'

export default function Home() {
  usePageMeta('home')
  return (
    <>
      <Hero />
      <AboutBrief />
      <PainPoints />
      <ServiceCards />
      <LogoWall />
      <Testimonials />
      <FinalCta />
    </>
  )
}
