import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion'
import { TextHoverEffect } from '@/ui/text-hover-effect'
import { SplineScene } from '@/components/SplineScene'
import { GlassButton } from '@/components/GlassButton'
import Reveal from '@/components/Reveal'
import { Spotlight } from '@/components/ui/spotlight-new'
import { Timeline } from '@/components/ui/timeline'
import { CardBody, CardContainer, CardItem } from '@/components/ui/3d-card'

const SPLINE_ROBOT_URL = 'https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode'

const galleryPhotos = import.meta.glob('/gallery/photos/*.{png,jpg,jpeg,webp}', { eager: true, import: 'default' })
// Lead photo first, then the rest (excluding it) — cycles every 5s.
const LEAD_PHOTO = galleryPhotos['/gallery/photos/Screen Shot 2026-05-10 at 9.46.40 AM.png']
const ABOUT_PHOTOS = [LEAD_PHOTO, ...Object.entries(galleryPhotos)
  .filter(([k]) => k !== '/gallery/photos/Screen Shot 2026-05-10 at 9.46.40 AM.png')
  .map(([, v]) => v)].filter(Boolean)

function Hero() {
  return (
    <section className="relative min-h-[100dvh] w-full overflow-hidden">
      <Spotlight
        gradientFirst="radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(33, 79%, 65%, 0.14) 0, hsla(33, 79%, 50%, 0.05) 50%, hsla(33, 79%, 45%, 0) 80%)"
        gradientSecond="radial-gradient(50% 50% at 50% 50%, hsla(33, 79%, 60%, 0.10) 0, hsla(33, 79%, 50%, 0.03) 80%, transparent 100%)"
        gradientThird="radial-gradient(50% 50% at 50% 50%, hsla(33, 79%, 60%, 0.06) 0, hsla(33, 79%, 45%, 0.02) 80%, transparent 100%)"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-0 [background-image:linear-gradient(to_right,var(--grid-line)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid-line)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_50%_40%,#000_30%,transparent_75%)]" />
      </div>

      <div
        className="absolute right-0 top-0 h-[100dvh] w-full md:w-[68vw] z-0"
        style={{ WebkitMaskImage: 'linear-gradient(to bottom, #000 0%, #000 78%, transparent 100%)', maskImage: 'linear-gradient(to bottom, #000 0%, #000 78%, transparent 100%)' }}
      >
        <div className="absolute inset-0" style={{ transform: 'scale(0.82)', transformOrigin: 'center center' }}>
          <SplineScene scene={SPLINE_ROBOT_URL} className="absolute inset-0 w-full h-full" />
        </div>
      </div>

      <div className="relative z-10 min-h-[100dvh] flex flex-col justify-center px-[clamp(24px,5vw,96px)] py-20 max-w-[1400px] mx-auto pointer-events-none">
        <div className="w-full max-w-[640px]">
          <div className="h-[18vh] md:h-[22vh]">
            <TextHoverEffect text="MINJAE" />
          </div>
          <div className="h-[18vh] md:h-[22vh] -mt-2">
            <TextHoverEffect text="KIM" />
          </div>
        </div>

        <p className="mt-10 text-lg md:text-xl text-neutral-700 dark:text-neutral-300 max-w-md pointer-events-auto">
          Mechanical Engineering · University of Toronto
        </p>
      </div>
    </section>
  )
}

function About() {
  const wrapRef = useRef(null)
  const isTouch = typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches

  const [photoIdx, setPhotoIdx] = useState(0)
  useEffect(() => {
    if (ABOUT_PHOTOS.length < 2) return
    const id = setInterval(() => setPhotoIdx((i) => (i + 1) % ABOUT_PHOTOS.length), 5000)
    return () => clearInterval(id)
  }, [])

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
            className="relative w-full aspect-[5/6] rounded-3xl overflow-hidden border-l-[3px] border-ochre cursor-pointer bg-neutral-200 dark:bg-[#0A0A0A]"
          >
            <AnimatePresence initial={false} mode="popLayout">
              <motion.img
                key={photoIdx}
                src={ABOUT_PHOTOS[photoIdx]}
                alt="Minjae"
                draggable={false}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9, ease: 'easeInOut' }}
                className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/15 pointer-events-none" />
            {!isTouch && (
              <motion.div className="absolute top-0 left-0 pointer-events-none will-change-transform" style={{ x: xs, y: ys }}>
                <div className="-translate-x-1/2 -translate-y-1/2">
                  <GlassButton size="default">
                    <span style={{ color: '#FFFFFF' }} className="inline-flex items-center gap-2">
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M13 2 3 14h7l-1 8 10-12h-7l1-8Z"/></svg>
                      Let's Chat
                    </span>
                  </GlassButton>
                </div>
              </motion.div>
            )}
          </div>

          <div className="text-left">
            <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-ochre mb-6 inline-flex items-center gap-2 before:content-[''] before:w-6 before:h-px before:bg-ochre">A little about me</p>
            <h2 className="font-display italic font-light text-[clamp(32px,4.4vw,52px)] leading-[1.05] tracking-tight text-neutral-900 dark:text-white mb-6">
              Hi, I'm Minjae <span className="text-ochre not-italic">—</span>
            </h2>
            <p className="font-serif text-[clamp(18px,1.5vw,22px)] leading-[1.55] text-neutral-800 dark:text-neutral-200/90 max-w-[58ch]">
              I study mechanical engineering at the <span className="text-neutral-900 dark:text-white">University of Toronto</span>, with
              a bioengineering minor, and I'm on the premed track.
            </p>
            <p className="font-serif text-[clamp(18px,1.5vw,22px)] leading-[1.55] text-neutral-700 dark:text-neutral-300/85 max-w-[58ch] mt-4">
              These days I'm helping build a <span className="text-ochre">low-cost dark-field microscope</span> so antimicrobial susceptibility testing can be run almost anywhere.
            </p>
            <p className="font-serif text-[clamp(18px,1.5vw,22px)] leading-[1.55] text-neutral-600 dark:text-neutral-400/85 max-w-[58ch] mt-4">
              Off-lab: volleyball, cooking, and making friends.
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

function Achievements() {
  const items = [
    {
      title: '2022',
      content: (
        <TimelineCard
          eyebrow="Highschool · Capstone"
          heading="Governor General's Academic Award"
          bullets={['Highest average in my graduating class — 98.9% across grades 10–12.']}
        />
      ),
    },
    {
      title: '2023',
      content: (
        <TimelineCard
          eyebrow="University of Toronto · Admission"
          heading="UofT Scholar's Program"
          bullets={['One of ~900 incoming students recognised with a $10,000 admission award.']}
        />
      ),
    },
    {
      title: '2024',
      content: (
        <TimelineCard
          eyebrow="Faculty of Applied Science & Engineering · Fall"
          heading="Dean's List — first semester at UofT"
          bullets={['2.75 credits completed', '3.80 sGPA · 84.8% average']}
        />
      ),
    },
    {
      title: '2025',
      content: (
        <TimelineCard
          eyebrow="Faculty of Applied Science & Engineering · Winter"
          heading="Dean's List — second semester at UofT"
          bullets={['2.15 credits completed', '3.93 sGPA · 88.3% average']}
        />
      ),
    },
  ]

  return (
    <section className="relative">
      <div className="px-[clamp(16px,4vw,72px)] pt-16 max-w-[1100px] mx-auto text-center">
        <Reveal>
          <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-ochre mb-3">My career pathway</p>
          <h2 className="font-display text-[clamp(32px,5vw,56px)] font-light tracking-tight text-neutral-900 dark:text-white">Work &amp; School.</h2>
        </Reveal>
      </div>
      <Timeline data={items} />
    </section>
  )
}

function TimelineCard({ eyebrow, heading, bullets }) {
  return (
    <CardContainer containerClassName="py-0 block" className="w-full">
      <CardBody className="group/card relative h-auto w-full rounded-2xl border border-neutral-200 dark:border-white/10 bg-white/70 dark:bg-white/[0.03] backdrop-blur-sm p-6 md:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.06)] dark:hover:shadow-2xl dark:hover:shadow-ochre/[0.08] dark:shadow-[0_18px_50px_rgba(0,0,0,0.45)]">
        <CardItem
          translateZ={40}
          as="p"
          className="font-mono text-[11px] uppercase tracking-[0.14em] text-ochre/90 mb-3"
        >
          {eyebrow}
        </CardItem>
        <CardItem
          translateZ={70}
          as="h3"
          className="font-display text-xl md:text-2xl tracking-tight text-neutral-900 dark:text-white mb-4"
        >
          {heading}
        </CardItem>
        <CardItem
          translateZ={50}
          as="ul"
          className="text-sm md:text-base leading-relaxed text-neutral-700 dark:text-neutral-300 list-disc pl-5 space-y-1"
        >
          {bullets.map((b) => <li key={b}>{b}</li>)}
        </CardItem>
      </CardBody>
    </CardContainer>
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
