import { useEffect, useRef, useState } from 'react'
import { TextHoverEffect } from '@/ui/text-hover-effect'
import { CardContainer, CardBody, CardItem } from '@/ui/3d-card'
import { SplineScene } from '@/components/SplineScene'
import { GlassButton } from '@/components/GlassButton'
import { AnimatedText } from '@/components/AnimatedText'
import Reveal from '@/components/Reveal'
import { Spotlight } from '@/components/ui/spotlight-new'
import { BackgroundGradient } from '@/components/ui/background-gradient'

const SPLINE_ROBOT_URL = 'https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode'

function Hero() {
  return (
    <section className="relative min-h-[100dvh] w-full overflow-hidden">
      <Spotlight
        gradientFirst="radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(220, 100%, 65%, 0.18) 0, hsla(220, 100%, 50%, 0.06) 50%, hsla(220, 100%, 45%, 0) 80%)"
        gradientSecond="radial-gradient(50% 50% at 50% 50%, hsla(220, 100%, 60%, 0.12) 0, hsla(220, 100%, 50%, 0.04) 80%, transparent 100%)"
        gradientThird="radial-gradient(50% 50% at 50% 50%, hsla(220, 100%, 60%, 0.08) 0, hsla(220, 100%, 45%, 0.02) 80%, transparent 100%)"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-0 [background-image:linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_50%_40%,#000_30%,transparent_75%)]" />
      </div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 items-center px-[clamp(24px,5vw,96px)] pt-24">
        <div className="h-[44vh] md:h-[60vh] flex items-center">
          <TextHoverEffect text="MINJAE" />
        </div>
        <div className="h-[44vh] md:h-[60vh] relative">
          <SplineScene scene={SPLINE_ROBOT_URL} className="absolute inset-0 w-full h-full" />
        </div>
      </div>

      <div className="relative z-10 px-[clamp(24px,5vw,96px)] pb-24">
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
            className="relative w-full aspect-[5/6] rounded-3xl overflow-hidden border-l-[3px] border-cobalt-bright cursor-pointer bg-[#0A0A0A]"
          >
            <div className="absolute inset-0 [background:radial-gradient(120%_90%_at_30%_20%,rgba(31,79,255,0.45),transparent_55%),radial-gradient(120%_90%_at_80%_80%,rgba(0,71,171,0.55),transparent_55%),linear-gradient(180deg,#000,#0A0F1F)] grid place-items-center">
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
            <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-cobalt-bright mb-6 inline-flex items-center gap-2 before:content-[''] before:w-6 before:h-px before:bg-cobalt-bright">About</p>
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

function Achievement3D({ title, body, stat, label, featured = false }) {
  const card = (
    <CardContainer containerClassName={featured ? 'py-4 md:col-span-2' : 'py-4'}>
      <CardBody className={`${featured ? 'h-auto md:h-[28rem] w-full md:w-[44rem]' : 'h-auto md:h-[26rem] w-full md:w-[22rem]'} relative bg-[#0A0A0A] border rounded-3xl p-6 md:p-8 group/card transition-shadow ${featured ? 'border-cobalt-bright/60 hover:shadow-[0_30px_80px_rgba(31,79,255,0.25)]' : 'border-white/10 hover:shadow-[0_30px_80px_rgba(31,79,255,0.18)] hover:border-cobalt-bright/40'}`}>
        <CardItem translateZ={60} className="mb-4 flex items-baseline gap-2">
          <span className="font-display font-medium leading-none tracking-tight text-[64px] md:text-[88px] text-cobalt-bright">{stat}</span>
          <span className="font-mono text-[11px] uppercase tracking-[0.10em] text-neutral-500">{label}</span>
        </CardItem>
        <CardItem translateZ={40} as="h3" className={`font-display ${featured ? 'text-3xl' : 'text-2xl'} font-medium text-white mb-3`}>
          {title}
        </CardItem>
        <CardItem translateZ={20} as="p" className="text-sm text-neutral-400 leading-relaxed">
          {body}
        </CardItem>
      </CardBody>
    </CardContainer>
  )
  if (!featured) return card
  return (
    <BackgroundGradient containerClassName="rounded-3xl" className="rounded-3xl bg-transparent p-0">
      {card}
    </BackgroundGradient>
  )
}

function Achievements() {
  const items = [
    { title: "2025 Winter Dean's List", body: 'Completed 2.15 credits, achieving a 3.93/4.0 sGPA and an 88.3% average.', stat: '3.93', label: 'sGPA' },
    { title: "2024 Fall Dean's List",  body: 'Completed 2.75 credits, achieving a 3.80/4.0 sGPA and an 84.8% average.', stat: '3.80', label: 'sGPA' },
    { title: "UofT Scholar's Program", body: 'Provides recognition to outstanding incoming students. Approximately 900 admission awards were granted with a value of $10,000.', stat: '$10K', label: 'Award' },
    { title: "Governor General's Academic Award", body: "Awarded for achieving the highest average of my graduating class with a cumulative grades 10–12 average of 98.9%.", stat: '98.9%', label: 'Average', featured: true },
  ]

  return (
    <section className="px-[clamp(24px,5vw,96px)] py-24 max-w-[1320px] mx-auto">
      <div className="mb-12 max-w-2xl">
        <Reveal>
          <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-cobalt-bright mb-4 inline-flex items-center gap-2 before:content-[''] before:w-6 before:h-px before:bg-cobalt-bright">Recognition</p>
          <AnimatedText
            text="Academic Achievements."
            textClassName="font-display text-[clamp(40px,6vw,72px)] !text-left font-normal tracking-tight !text-white"
            underlineClassName="text-cobalt-bright"
          />
        </Reveal>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {items.map((item, i) => (
          <Reveal key={item.title} delay={i * 110} className={item.featured ? 'lg:col-span-2 md:col-span-2' : ''}>
            <Achievement3D {...item}/>
          </Reveal>
        ))}
      </div>
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
