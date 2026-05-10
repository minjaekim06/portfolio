import { useEffect } from 'react'
import { CardBody, CardContainer, CardItem } from '@/ui/3d-card'
import Reveal from '@/components/Reveal'
import { AnimatedText } from '@/components/AnimatedText'

const PROJECTS = Array.from({ length: 6 }).map(() => ({
  title: 'Project Title',
  description: 'Short description of the project goes here.',
  tags: ['Mechanical', 'Research', 'Design'],
}))

function ProjectCard({ p }) {
  return (
    <CardContainer containerClassName="py-3">
      <CardBody className="bg-[#0A0A0A] relative group/card hover:shadow-2xl hover:shadow-cobalt-bright/25 border border-white/10 hover:border-cobalt-bright/50 w-full sm:w-[22rem] h-auto rounded-2xl p-5 transition-all">
        <CardItem translateZ={80} as="h3" className="font-display text-2xl text-white font-medium mb-2">
          {p.title}
        </CardItem>
        <CardItem translateZ={60} as="p" className="text-sm text-neutral-400 leading-relaxed mb-4 max-w-sm">
          {p.description}
        </CardItem>
        <CardItem translateZ={100} rotateX={12} rotateZ={-4} className="w-full mt-2">
          <div className="h-52 w-full rounded-xl overflow-hidden bg-gradient-to-br from-cobalt/40 via-transparent to-cobalt-bright/30 border border-white/10 grid place-items-center group-hover/card:shadow-2xl group-hover/card:shadow-cobalt-bright/40 relative">
            <svg viewBox="0 0 100 100" width="64" height="64" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="1">
              <circle cx="50" cy="50" r="30"/>
              <path d="M30 65l15-20 12 14 8-10 15 16"/>
            </svg>
            <div className="absolute inset-0 [background:radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.16),transparent_50%)]" />
          </div>
        </CardItem>
        <div className="flex flex-wrap gap-1.5 mt-5">
          {p.tags.map(t => (
            <CardItem key={t} translateZ={30} className="font-mono text-[10px] px-2.5 py-1 rounded-full bg-cobalt/15 text-cobalt-bright border border-cobalt-bright/30">
              {t}
            </CardItem>
          ))}
        </div>
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
          <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-cobalt-bright mb-4 inline-flex items-center gap-2 before:content-[''] before:w-6 before:h-px before:bg-cobalt-bright">Selected Work</p>
          <AnimatedText
            text="Projects."
            textClassName="font-display text-[clamp(56px,9vw,120px)] !text-left font-light tracking-tight !text-white"
            underlineClassName="text-cobalt-bright"
          />
        </Reveal>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {PROJECTS.map((p, i) => (
          <Reveal key={i} delay={(i % 3) * 100}>
            <ProjectCard p={p}/>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
