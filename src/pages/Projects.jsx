import { useEffect } from 'react'
import { CardBody, CardContainer, CardItem } from '@/ui/3d-card'
import Reveal from '@/components/Reveal'
import { AnimatedText } from '@/components/AnimatedText'

const PROJECTS = [
  { title: 'Dark-Field Microscope', description: 'Low-cost dark field microscopy platform for antimicrobial susceptibility testing.', tags: ['Optics', 'Research', 'Bio'], gradient: 'from-ochre/40 via-transparent to-teal/40' },
  { title: 'NMES Textile Device', description: 'Wearable neuromuscular electrical stimulation prototype for rehabilitation.', tags: ['Wearable', 'Electronics'], gradient: 'from-teal/40 via-transparent to-sage/30' },
  { title: 'Compact Robotic Arm', description: 'Desktop-scale 4-DOF arm with custom planetary gearing.', tags: ['Mechanical', 'CAD'], gradient: 'from-navy/40 via-transparent to-ochre/40' },
  { title: 'Fluid Sim Visualizer', description: 'Real-time GPU-accelerated 2D fluid simulation in WebGL.', tags: ['Sim', 'GPU'], gradient: 'from-teal/30 via-transparent to-navy/40' },
  { title: 'Volleyball Stat Tracker', description: 'iOS app for live volleyball stat capture with bluetooth scoreboards.', tags: ['App', 'Sport'], gradient: 'from-sage/30 via-transparent to-teal/30' },
  { title: 'Folded Plate Lamp', description: 'Origami-inspired sheet metal lamp prototyped in SolidWorks.', tags: ['Design', 'Manufacture'], gradient: 'from-ochre/40 via-transparent to-sage/30' },
]

function ProjectCard({ p, idx }) {
  return (
    <CardContainer containerClassName="py-3">
      <CardBody className="bg-[#111111] relative group/card hover:shadow-2xl hover:shadow-teal/20 border border-white/10 hover:border-teal/40 w-full sm:w-[22rem] h-auto rounded-2xl p-5 transition-all">
        <CardItem translateZ={50} className="font-mono text-[11px] tracking-[0.12em] text-neutral-500 uppercase mb-3">
          {String(idx + 1).padStart(2, '0')} · Project
        </CardItem>
        <CardItem translateZ={80} as="h3" className="font-display text-2xl text-white font-medium mb-2">
          {p.title}
        </CardItem>
        <CardItem translateZ={60} as="p" className="text-sm text-neutral-400 leading-relaxed mb-4 max-w-sm">
          {p.description}
        </CardItem>
        <CardItem translateZ={100} rotateX={12} rotateZ={-4} className="w-full mt-2">
          <div className={`h-52 w-full rounded-xl overflow-hidden bg-gradient-to-br ${p.gradient} border border-white/10 grid place-items-center group-hover/card:shadow-2xl group-hover/card:shadow-teal/30 relative`}>
            <svg viewBox="0 0 100 100" width="64" height="64" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="1">
              <circle cx="50" cy="50" r="30"/>
              <path d="M30 65l15-20 12 14 8-10 15 16"/>
            </svg>
            <div className="absolute inset-0 [background:radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.16),transparent_50%)]" />
          </div>
        </CardItem>
        <div className="flex flex-wrap gap-1.5 mt-5">
          {p.tags.map(t => (
            <CardItem key={t} translateZ={30} className="font-mono text-[10px] px-2.5 py-1 rounded-full bg-teal/10 text-teal border border-teal/25">
              {t}
            </CardItem>
          ))}
        </div>
        <CardItem translateZ={40} className="mt-5 flex justify-between items-center">
          <span className="font-mono text-[11px] text-neutral-600 tracking-wider">VIEW</span>
          <span className="text-neutral-500 group-hover/card:text-ochre group-hover/card:translate-x-1 transition-all">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
          </span>
        </CardItem>
      </CardBody>
    </CardContainer>
  )
}

export default function Projects() {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  return (
    <section className="max-w-[1400px] mx-auto px-[clamp(24px,5vw,96px)] py-16 pb-32">
      <header className="mb-12 max-w-2xl">
        <Reveal>
          <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-ochre mb-4 inline-flex items-center gap-2 before:content-[''] before:w-6 before:h-px before:bg-ochre">Selected Work</p>
          <AnimatedText
            text="Projects."
            textClassName="font-display text-[clamp(56px,9vw,120px)] !text-left font-light tracking-tight !text-white"
            underlineClassName="text-ochre"
          />
          <p className="text-lg text-neutral-400 max-w-xl mt-8">A grab-bag of mechanical, electrical, and software experiments — mostly built late at night with friends.</p>
        </Reveal>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {PROJECTS.map((p, i) => (
          <Reveal key={p.title} delay={(i % 3) * 100}>
            <ProjectCard p={p} idx={i}/>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
