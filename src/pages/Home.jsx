import { useEffect, useRef, useState } from 'react'
import { TextHoverEffect } from '@/ui/text-hover-effect'
import { SplineScene } from '@/components/SplineScene'
import { GlassButton } from '@/components/GlassButton'
import { AnimatedText } from '@/components/AnimatedText'
import Reveal from '@/components/Reveal'
import { Spotlight } from '@/components/ui/spotlight-new'

const SPLINE_ROBOT_URL = 'https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode'

function Hero() {
  return (
    <section className="relative min-h-[100dvh] w-full overflow-hidden">
      <Spotlight
        gradientFirst="radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(33, 79%, 65%, 0.14) 0, hsla(33, 79%, 50%, 0.05) 50%, hsla(33, 79%, 45%, 0) 80%)"
        gradientSecond="radial-gradient(50% 50% at 50% 50%, hsla(33, 79%, 60%, 0.10) 0, hsla(33, 79%, 50%, 0.03) 80%, transparent 100%)"
        gradientThird="radial-gradient(50% 50% at 50% 50%, hsla(33, 79%, 60%, 0.06) 0, hsla(33, 79%, 45%, 0.02) 80%, transparent 100%)"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-0 [background-image:linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_50%_40%,#000_30%,transparent_75%)]" />
      </div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 items-center px-[clamp(24px,5vw,96px)] pt-20">
        <div className="h-[44vh] md:h-[68vh] flex items-center">
          <TextHoverEffect text="MINJAE" />
        </div>
        <div
          className="h-[60vh] md:h-[92vh] relative -mt-6 md:-mt-16 -mb-16 md:-mb-32 overflow-hidden"
          style={{ WebkitMaskImage: 'linear-gradient(to bottom, #000 0%, #000 80%, transparent 100%)', maskImage: 'linear-gradient(to bottom, #000 0%, #000 80%, transparent 100%)' }}
        >
          <SplineScene scene={SPLINE_ROBOT_URL} className="absolute inset-0 w-full h-full" />
        </div>
      </div>

      <div className="relative z-10 px-[clamp(24px,5vw,96px)] pb-20">
        <p className="text-lg md:text-xl text-neutral-300 max-w-2xl">
          Mechanical Engineering · University of Toronto
        </p>
      </div>
    </section>
  )
}

function About() {
  const wrapRef = useRef(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [inside, setInside] = useState(false)
  const isTouch = typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches

  const onMove = (e) => {
    const r = wrapRef.current.getBoundingClientRect()
    setPos({ x: e.clientX - r.left, y: e.clientY - r.top })
  }
  const onClick = () => { window.location.href = "mailto:minjae@example.com?subject=Let's%20Chat" }

  return (
    <section id="about" className="relative px-[clamp(24px,5vw,96px)] py-24">
      <Reveal>
        <div className="relative grid grid-cols-1 md:grid-cols-[420px_1fr] gap-12 md:gap-16 items-center max-w-[1280px] mx-auto">
          <div
            ref={wrapRef}
            onMouseEnter={() => !isTouch && setInside(true)}
            onMouseMove={!isTouch ? onMove : undefined}
            onMouseLeave={() => setInside(false)}
            onClick={onClick}
            className="relative w-full aspect-[5/6] rounded-3xl overflow-hidden border-l-[3px] border-ochre cursor-pointer bg-[#0A0A0A]"
          >
            <div className="absolute inset-0 [background:radial-gradient(120%_90%_at_30%_20%,rgba(218,227,187,0.20),transparent_55%),radial-gradient(120%_90%_at_80%_80%,rgba(58,81,115,0.40),transparent_55%),linear-gradient(180deg,#0A0A0A,#11141B)] grid place-items-center">
              <div className="font-display italic text-[clamp(80px,14vw,180px)] text-white/90 tracking-tighter mix-blend-overlay">MK</div>
            </div>
            <div className="absolute inset-0 [background:radial-gradient(ellipse_at_center,transparent_50%,rgba(0,0,0,0.5))] pointer-events-none" />
            {!isTouch && (
              <div
                className="absolute pointer-events-none transition-[left,top,opacity] duration-[80ms] ease-out"
                style={{ left: pos.x, top: pos.y, transform: 'translate(-50%,-50%)', opacity: inside ? 1 : 0 }}
              >
                <GlassButton size="default">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M13 2 3 14h7l-1 8 10-12h-7l1-8Z"/></svg>
                  Let's Chat
                </GlassButton>
              </div>
            )}
          </div>

          <div className="text-left">
            <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-ochre mb-6 inline-flex items-center gap-2 before:content-[''] before:w-6 before:h-px before:bg-ochre">About</p>
            <p className="text-lg text-neutral-300 leading-relaxed max-w-xl">
              Mechanical engineering student at the University of Toronto. Minor in Bioengineering.
              Premed, currently researching and developing a low-cost dark field microscope for
              antimicrobial susceptibility testing. Love volleyball, cooking, and making friends.
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

function Achievements() {
  const items = [
    { stat: '3.93',  unit: 'sGPA',    title: "2025 Winter Dean's List",          body: '2.15 credits · 88.3% average' },
    { stat: '3.80',  unit: 'sGPA',    title: "2024 Fall Dean's List",            body: '2.75 credits · 84.8% average' },
    { stat: '$10K',  unit: 'award',   title: "UofT Scholar's Program",           body: 'Recognition for outstanding incoming students.' },
    { stat: '98.9%', unit: 'average', title: "Governor General's Academic Award", body: 'Highest average in my graduating class (grades 10–12).' },
  ]

  return (
    <section className="px-[clamp(24px,5vw,96px)] py-20 max-w-[920px] mx-auto">
      <div className="mb-10 max-w-2xl">
        <Reveal>
          <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-ochre mb-3 inline-flex items-center gap-2 before:content-[''] before:w-6 before:h-px before:bg-ochre">A few wins</p>
          <h2 className="font-display text-[clamp(28px,4vw,44px)] font-light tracking-tight text-white">School things.</h2>
        </Reveal>
      </div>
      <ul className="divide-y divide-white/5">
        {items.map((it, i) => (
          <Reveal key={it.title} delay={i * 80}>
            <li className="grid grid-cols-[120px_1fr] md:grid-cols-[160px_1fr] gap-6 py-5 items-baseline">
              <div className="font-display italic text-2xl md:text-3xl text-ochre">
                {it.stat}
                <span className="ml-1.5 font-mono text-[10px] not-italic uppercase tracking-wider text-neutral-500">{it.unit}</span>
              </div>
              <div>
                <h3 className="text-base text-neutral-100 font-normal">{it.title}</h3>
                <p className="text-sm text-neutral-500 leading-snug mt-1">{it.body}</p>
              </div>
            </li>
          </Reveal>
        ))}
      </ul>
    </section>
  )
}

export default function Home() {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  return (
    <>
      <Hero/>
      <About/>
      <Achievements/>
    </>
  )
}
