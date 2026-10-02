import { useEffect, useRef, useState } from 'react'
import { useContent } from '../i18n.jsx'
import SectionHeading from './SectionHeading.jsx'

function useInView(ref) {
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          obs.disconnect()
        }
      },
      { threshold: 0.3 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [ref])
  return inView
}

function Counter({ value, suffix = '', label, start }) {
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!start) return undefined
    const duration = 1200
    const t0 = performance.now()
    let raf
    const tick = (t) => {
      const p = Math.min((t - t0) / duration, 1)
      setN(Math.round(value * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [start, value])

  return (
    <div className="text-center">
      <p className="text-4xl font-bold text-white sm:text-5xl">
        {n}
        {suffix}
      </p>
      <p className="mt-2 text-sm text-brand-200">{label}</p>
    </div>
  )
}

export default function Counters() {
  const { counters } = useContent()
  const ref = useRef(null)
  const inView = useInView(ref)
  return (
    <section className="section bg-brand-800">
      <div className="container-site">
        <SectionHeading eyebrow={counters.eyebrow} title={counters.title} dark />
        <div ref={ref} className="mt-12 grid grid-cols-2 gap-10 md:grid-cols-4">
          {counters.items.map((c) => (
            <Counter key={c.label} {...c} start={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}
