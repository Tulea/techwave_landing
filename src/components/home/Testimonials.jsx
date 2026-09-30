import { useEffect, useState } from 'react'
import { testimonials } from '../../data/content.js'
import SectionHeading from '../SectionHeading.jsx'

const AUTOPLAY_MS = 6000

export default function Testimonials() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const count = testimonials.items.length

  useEffect(() => {
    const prefersReduced = typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (paused || prefersReduced || count <= 1) return undefined
    const timer = setInterval(() => setIndex((i) => (i + 1) % count), AUTOPLAY_MS)
    return () => clearInterval(timer)
  }, [paused, count])

  const go = (i) => setIndex((i + count) % count)

  return (
    <section className="section bg-brand-50/60">
      <div className="container-site">
        <SectionHeading eyebrow={testimonials.eyebrow} title={testimonials.title} />
        <div
          className="mx-auto mt-12 max-w-3xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {testimonials.items.map((t, i) => (
                <div
                  key={t.author}
                  className="w-full shrink-0 px-4 py-1"
                >
                  <figure
                    aria-hidden={i !== index}
                    className="h-full rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
                  >
                    <blockquote className="text-lg leading-relaxed text-slate-700">“{t.quote}”</blockquote>
                    <figcaption className="mt-5 text-sm">
                      <p className="font-semibold text-brand-900">{t.author}</p>
                      <p className="text-slate-500">{[t.role, t.company].filter(Boolean).join(' · ')}</p>
                    </figcaption>
                  </figure>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6 flex items-center justify-center gap-6">
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label={testimonials.prevLabel}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-800 text-white shadow-sm transition hover:bg-brand-700"
            >
              ←
            </button>
            <div className="flex items-center gap-2">
              {testimonials.items.map((t, i) => (
                <button
                  key={t.author}
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`${testimonials.dotLabel} ${i + 1}`}
                  aria-current={i === index}
                  className={`h-2.5 rounded-full transition-all ${i === index ? 'w-6 bg-brand-800' : 'w-2.5 bg-brand-200 hover:bg-brand-300'}`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label={testimonials.nextLabel}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-800 text-white shadow-sm transition hover:bg-brand-700"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
