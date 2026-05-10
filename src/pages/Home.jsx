import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { TextHoverEffect } from '@/ui/text-hover-effect'
import { SplineScene } from '@/components/SplineScene'
import { GlassButton } from '@/components/GlassButton'
import Reveal from '@/components/Reveal'
import { Spotlight } from '@/components/ui/spotlight-new'
import { Timeline } from '@/components/ui/timeline'
import { SparklesCore } from '@/components/ui/sparkles'

const SPLINE_ROBOT_URL = 'https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode'

const galleryPhotos = import.meta.glob('/gallery/photos/*.{png,jpg,jpeg,webp}', { eager: true, import: 'default' })
const ABOUT_PHOTO = galleryPhotos['/gallery/photos/Screen Shot 2026-05-10 at 9.43.15 AM.png']

function Hero() {
  const [showSparkles, setShowSparkles] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setShowSparkles(true), 4200)
    return () => clearTimeout(t)
  }, [])

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

      <div
        className="absolute right-0 top-0 h-[100dvh] w-full md:w-[62vw] z-0 pointer-events-none"
        style={{ WebkitMaskImage: 'linear-gradient(to bottom, #000 0%, #000 78%, transparent 100%)', maskImage: 'linear-gradient(to bottom, #000 0%, #000 78%, transparent 100%)' }}
      >
        <SplineScene scene={SPLINE_ROBOT_URL} className="absolute inset-0 w-full h-full" />
      </div>

      <div className="relative z-10 min-h-[100dvh] flex flex-col justify-center px-[clamp(24px,5vw,96px)] py-20 max-w-[1400px] mx-auto">
        <div className="relative w-full max-w-[640px]">
          <div className="h-[18vh] md:h-[22vh]">
            <TextHoverEffect text="MINJAE" />
          </div>
          <div className="h-[18vh] md:h-[22vh] -mt-2">
            <TextHoverEffect text="KIM" />
          </div>

          {showSparkles && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.4, ease: 'easeOut' }}
              className="absolute inset-0 pointer-events-none"
              aria-hidden="true"
            >
              <SparklesCore
                background="transparent"
                minSize={0.6}
                maxSize={1.6}
                particleDensity={70}
                particleColor="#EAA44B"
                speed={0.9}
                className="h-full w-full"
              />
            </motion.div>
          )}
        </div>

        <p className="mt-10 text-lg md:text-xl text-neutral-300 max-w-md">
          Mechanical Engineering · University of Toronto
        </p>
      </div>
    </section>
  )
}

function About() {
  const wrapRef = useRef(null)
  const isTouch = typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const xs = useSpring(x, { damping: 26, stiffness: 220, mass: 0.5 })
  const ys = useSpring(y, { damping: 26, stiffness: 220, mass: 0.5 })

  const restOf = (rect) => ({ rx: rect.width / 2, ry: rect.height * 0.88 })

  useLayoutEffect(() => {
    const snapToRest = (jump) => {
      const el = wrapRef.current
      if (!el) return
      const { rx, ry } = restOf(el.getBoundingClientRect())
      x.set(rx); y.set(ry)
      if (jump) { xs.jump(rx); ys.jump(ry) }
    }
    snapToRest(true)
    const onResize = () => snapToRest(false)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const onMove = (e) => {
    if (isTouch) return
    const r = wrapRef.current.getBoundingClientRect()
    x.set(e.clientX - r.left)
    y.set(e.clientY - r.top)
  }
  const onLeave = () => {
    if (!wrapRef.current) return
    const { rx, ry } = restOf(wrapRef.current.getBoundingClientRect())
    x.set(rx); y.set(ry)
  }
  const onClick = () => { window.location.href = "mailto:minjae@example.com?subject=Let's%20Chat" }

  return (
    <section id="about" className="relative px-[clamp(24px,5vw,96px)] py-24">
      <Reveal>
        <div className="relative grid grid-cols-1 md:grid-cols-[420px_1fr] gap-12 md:gap-16 items-center max-w-[1280px] mx-auto">
          <div
            ref={wrapRef}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            onClick={onClick}
            className="relative w-full aspect-[5/6] rounded-3xl overflow-hidden border-l-[3px] border-ochre cursor-pointer bg-[#0A0A0A]"
          >
            {ABOUT_PHOTO && (
              <img src={ABOUT_PHOTO} alt="Minjae" draggable={false} className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/15 pointer-events-none" />
            {!isTouch && (
              <motion.div className="absolute top-0 left-0 pointer-events-none will-change-transform" style={{ x: xs, y: ys }}>
                <div className="-translate-x-1/2 -translate-y-1/2">
                  <GlassButton size="default">
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M13 2 3 14h7l-1 8 10-12h-7l1-8Z"/></svg>
                    Let's Chat
                  </GlassButton>
                </div>
              </motion.div>
            )}
          </div>

          <div className="text-left">
            <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-ochre mb-6 inline-flex items-center gap-2 before:content-[''] before:w-6 before:h-px before:bg-ochre">A little about me</p>
            <h2 className="font-display italic font-light text-[clamp(32px,4.4vw,52px)] leading-[1.05] tracking-tight text-white mb-6">
              Hi, I'm Minjae <span className="text-ochre not-italic">—</span>
            </h2>
            <p className="font-serif text-[clamp(18px,1.5vw,22px)] leading-[1.55] text-neutral-200/90 max-w-[58ch]">
              I study mechanical engineering at the <span className="text-white">University of Toronto</span>, with
              a bioengineering minor, and I'm on the premed track.
            </p>
            <p className="font-serif text-[clamp(18px,1.5vw,22px)] leading-[1.55] text-neutral-300/85 max-w-[58ch] mt-4">
              These days I'm helping build a <span className="text-ochre">low-cost dark-field microscope</span> so antimicrobial susceptibility testing can be run almost anywhere.
            </p>
            <p className="font-serif text-[clamp(18px,1.5vw,22px)] leading-[1.55] text-neutral-400/85 max-w-[58ch] mt-4">
              Off-lab: volleyball, cooking, and making friends.
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

function Achievements() {
  const data = [
    {
      title: '2022',
      content: (
        <>
          <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-ochre mb-3">Highschool · capstone</p>
          <h3 className="font-display text-2xl md:text-3xl text-white mb-2 tracking-tight">Governor General's Academic Award</h3>
          <p className="text-sm md:text-base text-neutral-400 leading-relaxed max-w-prose">
            Highest average in my graduating class — <span className="text-ochre">98.9%</span> across grades 10–12.
          </p>
        </>
      ),
    },
    {
      title: '2023',
      content: (
        <>
          <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-ochre mb-3">UofT · entry</p>
          <h3 className="font-display text-2xl md:text-3xl text-white mb-2 tracking-tight">UofT Scholar's Program</h3>
          <p className="text-sm md:text-base text-neutral-400 leading-relaxed max-w-prose">
            One of ~900 incoming students recognised with a <span className="text-ochre">$10,000</span> admission award.
          </p>
        </>
      ),
    },
    {
      title: '2024 Fall',
      content: (
        <>
          <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-ochre mb-3">Dean's List</p>
          <h3 className="font-display text-2xl md:text-3xl text-white mb-2 tracking-tight">First semester at UofT</h3>
          <p className="text-sm md:text-base text-neutral-400 leading-relaxed max-w-prose">
            2.75 credits · <span className="text-ochre">3.80 sGPA</span> · 84.8% average.
          </p>
        </>
      ),
    },
    {
      title: '2025 Winter',
      content: (
        <>
          <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-ochre mb-3">Dean's List</p>
          <h3 className="font-display text-2xl md:text-3xl text-white mb-2 tracking-tight">Second semester at UofT</h3>
          <p className="text-sm md:text-base text-neutral-400 leading-relaxed max-w-prose">
            2.15 credits · <span className="text-ochre">3.93 sGPA</span> · 88.3% average.
          </p>
        </>
      ),
    },
  ]

  return (
    <section className="px-[clamp(16px,4vw,72px)] pt-12 pb-20 max-w-[1100px] mx-auto">
      <div className="mb-2 max-w-2xl px-4 md:px-10">
        <Reveal>
          <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-ochre mb-3 inline-flex items-center gap-2 before:content-[''] before:w-6 before:h-px before:bg-ochre">A few wins</p>
          <h2 className="font-display text-[clamp(28px,4vw,44px)] font-light tracking-tight text-white">School things, in order.</h2>
        </Reveal>
      </div>
      <Timeline data={data} />
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
