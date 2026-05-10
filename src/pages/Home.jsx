import { useEffect, useRef, useState } from 'react'
import { TextHoverEffect } from '@/ui/text-hover-effect'
import { CardContainer, CardBody, CardItem } from '@/ui/3d-card'
import { CanvasText } from '@/ui/canvas-text'
import { SplineScene } from '@/components/SplineScene'
import { GlassButton } from '@/components/GlassButton'
import { AnimatedText } from '@/components/AnimatedText'
import Reveal from '@/components/Reveal'

const SPLINE_ROBOT_URL = 'https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode'

function Hero() {
  return (
    <section className="relative min-h-[100dvh] w-full overflow-hidden">
      {/* atmospheric backdrop */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-0 [background-image:linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_50%_40%,#000_30%,transparent_75%)]" />
        <div className="absolute -left-32 -top-32 h-[480px] w-[480px] rounded-full blur-[80px] opacity-50 [background:radial-gradient(circle,rgba(58,81,115,0.7),transparent_70%)]" />
        <div className="absolute -right-40 -bottom-40 h-[540px] w-[540px] rounded-full blur-[80px] opacity-50 [background:radial-gradient(circle,rgba(234,164,75,0.45),transparent_70%)]" />
      </div>

      {/* eyebrow */}
      <div className="relative z-10 px-[clamp(24px,5vw,96px)] pt-12">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-neutral-400 inline-flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-ochre shadow-[0_0_12px_#EAA44B] animate-pulse" />
          Available for collaboration · Toronto
        </p>
      </div>

      {/* big TextHoverEffect title */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 items-center px-[clamp(24px,5vw,96px)]">
        <div className="h-[44vh] md:h-[60vh] flex items-center">
          <TextHoverEffect text="MINJAE" />
        </div>
        <div className="h-[44vh] md:h-[60vh] relative">
          <SplineScene scene={SPLINE_ROBOT_URL} className="absolute inset-0 w-full h-full" />
        </div>
      </div>

      <div className="relative z-10 px-[clamp(24px,5vw,96px)] pb-20 -mt-6">
        <p className="text-lg md:text-xl text-neutral-300 max-w-2xl">
          Mechanical Engineering · University of Toronto · Premed.{' '}
          Building <CanvasText text="small useful things" backgroundClassName="bg-ochre/30" colors={[
            'rgba(234,164,75,1)','rgba(234,164,75,0.85)','rgba(234,164,75,0.6)','rgba(234,164,75,0.35)','rgba(234,164,75,0.15)'
          ]} lineGap={3} animationDuration={16}/> with curiosity & care.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs text-neutral-500 tracking-wide">
          <span>ME ’28</span><span className="w-1 h-1 rounded-full bg-neutral-600" />
          <span>Bioengineering minor</span><span className="w-1 h-1 rounded-full bg-neutral-600" />
          <span>Microscopy research</span>
        </div>
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
      <div className="absolute inset-0 pointer-events-none [background:radial-gradient(circle_at_80%_20%,rgba(58,81,115,0.15),transparent_50%)]" />
      <Reveal>
        <div className="relative grid grid-cols-1 md:grid-cols-[420px_1fr] gap-12 md:gap-16 items-center max-w-[1280px] mx-auto">
          <div
            ref={wrapRef}
            onMouseEnter={() => !isTouch && setInside(true)}
            onMouseMove={!isTouch ? onMove : undefined}
            onMouseLeave={() => setInside(false)}
            onClick={onClick}
            className="relative w-full aspect-[5/6] rounded-3xl overflow-hidden border-l-[3px] border-teal cursor-pointer bg-[#1A1A1A]"
          >
            <div className="absolute inset-0 [background:radial-gradient(120%_90%_at_30%_20%,rgba(234,164,75,0.5),transparent_55%),radial-gradient(120%_90%_at_80%_80%,rgba(58,81,115,0.6),transparent_55%),linear-gradient(180deg,#2a1f17,#0E1118)] grid place-items-center">
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
            <h2 className="font-display text-[clamp(36px,5.5vw,64px)] leading-[1.04] tracking-tight font-normal mb-6">
              Builder, student, friend.
            </h2>
            <p className="text-lg text-neutral-300 leading-relaxed max-w-xl mb-8">
              Mechanical engineering student at the University of Toronto. Minor in Bioengineering.
              Premed, currently researching and developing a low-cost dark field microscope for
              antimicrobial susceptibility testing. Love volleyball, cooking, and making friends.
            </p>
            <ul className="list-none p-0 m-0 flex flex-col">
              {[
                ['01', 'Researching dark-field microscopy for AST'],
                ['02', 'Bioengineering minor at UofT'],
                ['03', 'Volleyball, cooking, lifelong friends'],
              ].map(([n, t], i) => (
                <li key={n} className={`flex items-baseline gap-4 py-3 border-t border-white/10 ${i === 2 ? 'border-b' : ''}`}>
                  <span className="font-mono text-[11px] text-neutral-500 tracking-wider">{n}</span>
                  <span className="text-[15px]">{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

function StatBadge({ value, label, color = 'ochre' }) {
  return (
    <div className="flex items-baseline gap-2">
      <span className="font-display font-medium leading-none tracking-tight text-[64px] md:text-[88px]" style={{ color: `var(--color-${color})` }}>{value}</span>
      <span className="font-mono text-[11px] uppercase tracking-[0.10em] text-neutral-500">{label}</span>
    </div>
  )
}

function Achievement3D({ title, body, stat, label, color = 'ochre', featured = false }) {
  return (
    <CardContainer containerClassName={featured ? 'py-4 md:col-span-2' : 'py-4'}>
      <CardBody className={`${featured ? 'h-auto md:h-[28rem] w-full md:w-[44rem]' : 'h-auto md:h-[26rem] w-full md:w-[22rem]'} relative bg-[#15110A] border border-white/10 rounded-3xl p-6 md:p-8 group/card hover:shadow-[0_30px_80px_rgba(234,164,75,0.18)] transition-shadow`}
                style={{ borderColor: featured ? 'rgba(234,164,75,0.55)' : undefined }}>
        {featured && (
          <CardItem translateZ={20} className="absolute top-4 right-4 font-mono text-[10px] uppercase tracking-[0.12em] text-ochre px-2.5 py-1 rounded-full border border-ochre/35 bg-ochre/8">
            Highest Honor
          </CardItem>
        )}
        <CardItem translateZ={60} className="mb-4">
          <StatBadge value={stat} label={label} color={color} />
        </CardItem>
        <CardItem translateZ={40} as="h3" className={`font-display ${featured ? 'text-3xl' : 'text-2xl'} font-medium text-white mb-3`}>
          {title}
        </CardItem>
        <CardItem translateZ={20} as="p" className="text-sm text-neutral-400 leading-relaxed">
          {body}
        </CardItem>
        <CardItem translateZ={30} className="absolute bottom-6 right-6 text-neutral-500 group-hover/card:text-ochre transition-colors">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
        </CardItem>
      </CardBody>
    </CardContainer>
  )
}

function Achievements() {
  const items = [
    { title: "2025 Winter Dean's List", body: 'Completed 2.15 credits, achieving a 3.93/4.0 sGPA and an 88.3% average.', stat: '3.93', label: 'sGPA', color: 'ochre' },
    { title: "2024 Fall Dean's List",  body: 'Completed 2.75 credits, achieving a 3.80/4.0 sGPA and an 84.8% average.', stat: '3.80', label: 'sGPA', color: 'teal' },
    { title: "UofT Scholar's Program", body: 'Provides recognition to outstanding incoming students. Approximately 900 admission awards were granted with a value of $10,000.', stat: '$10K', label: 'Award', color: 'sage' },
    { title: "Governor General's Academic Award", body: "Awarded for achieving the highest average of my graduating class with a cumulative grades 10–12 average of 98.9%.", stat: '98.9%', label: 'Average', color: 'ochre', featured: true },
  ]

  return (
    <section className="px-[clamp(24px,5vw,96px)] py-24 max-w-[1320px] mx-auto">
      <div className="mb-12 max-w-2xl">
        <Reveal>
          <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-ochre mb-4 inline-flex items-center gap-2 before:content-[''] before:w-6 before:h-px before:bg-ochre">Recognition</p>
          <AnimatedText
            text="Academic Achievements."
            textClassName="font-display text-[clamp(40px,6vw,72px)] !text-left font-normal tracking-tight !text-white"
            underlineClassName="text-ochre"
          />
          <p className="text-neutral-400 text-lg mt-8">A record of curiosity that paid off.</p>
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

function Footer() {
  return (
    <footer className="mt-24 px-[clamp(24px,5vw,96px)] py-12 pb-24 flex flex-wrap justify-between items-end gap-6 border-t border-white/10 max-w-[1280px] mx-auto">
      <div>
        <p className="font-display text-2xl">Minjae Kim</p>
        <p className="text-neutral-500 font-mono text-xs">Toronto · 2026</p>
      </div>
      <div className="flex gap-6 font-mono text-xs text-neutral-400">
        <a href="#" className="hover:text-ochre transition-colors">YouTube</a>
        <a href="#" className="hover:text-ochre transition-colors">LinkedIn</a>
        <a href="mailto:minjae@example.com" className="hover:text-ochre transition-colors">Email</a>
      </div>
    </footer>
  )
}

export default function Home() {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  return (
    <>
      <Hero/>
      <About/>
      <Achievements/>
      <Footer/>
    </>
  )
}
