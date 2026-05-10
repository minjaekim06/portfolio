import { useEffect } from 'react'
import { CardBody, CardContainer, CardItem } from '@/components/ui/3d-card'
import Reveal from '@/components/Reveal'
import { AnimatedText } from '@/components/AnimatedText'
import { ContainerScroll } from '@/components/ContainerScroll'
import SolidWorksWorkspace from '@/components/SolidWorksWorkspace'

const PROJECTS = Array.from({ length: 6 }).map(() => ({
  title: 'Project Title',
  description: 'Short description of the project goes here.',
  tags: ['Mechanical', 'Research', 'Design'],
}))

function ProjectCard({ p }) {
  return (
    <CardContainer containerClassName="py-3">
      <CardBody className="bg-[#0A0A0A] relative group/card hover:shadow-2xl hover:shadow-ochre/15 border border-white/10 hover:border-ochre/40 w-full sm:w-[22rem] h-auto rounded-2xl p-5 transition-all">
        <CardItem translateZ={80} as="h3" className="font-display text-2xl text-white font-medium mb-2">
          {p.title}
        </CardItem>
        <CardItem translateZ={60} as="p" className="text-sm text-neutral-400 leading-relaxed mb-4 max-w-sm">
          {p.description}
        </CardItem>
        <CardItem translateZ={100} rotateX={12} rotateZ={-4} className="w-full mt-2">
          <div className="h-52 w-full rounded-xl overflow-hidden bg-gradient-to-br from-teal/40 via-transparent to-ochre/30 border border-white/10 grid place-items-center group-hover/card:shadow-2xl group-hover/card:shadow-ochre/40 relative">
            <svg viewBox="0 0 100 100" width="64" height="64" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="1">
              <circle cx="50" cy="50" r="30"/>
              <path d="M30 65l15-20 12 14 8-10 15 16"/>
            </svg>
            <div className="absolute inset-0 [background:radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.16),transparent_50%)]" />
          </div>
        </CardItem>
        <div className="flex flex-wrap gap-1.5 mt-5">
          {p.tags.map(t => (
            <CardItem key={t} translateZ={30} className="font-mono text-[10px] px-2.5 py-1 rounded-full bg-teal/15 text-ochre border border-ochre/30">
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
    <>
      <ContainerScroll
        titleComponent={
          <>
            <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-ochre mb-4">Workspace · CAD</p>
            <h2 className="font-display text-[clamp(40px,7vw,84px)] font-light tracking-tight text-white">
              SOLIDWORKS Studio.
            </h2>
          </>
        }
      >
        <SolidWorksWorkspace/>
      </ContainerScroll>

      <ContainerScroll
        titleComponent={
          <>
            <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-ochre mb-4">In Progress</p>
            <h2 className="font-display text-[clamp(40px,7vw,84px)] font-light tracking-tight text-white">
              Composite Airframe.
            </h2>
          </>
        }
      >
        <div className="h-full w-full grid place-items-center rounded-2xl bg-[radial-gradient(120%_90%_at_70%_20%,rgba(234,164,75,0.20),transparent_55%),linear-gradient(180deg,#0B0E14,#0A0A0A)] relative overflow-hidden">
          <div className="absolute inset-0 [background-image:linear-gradient(to_right,rgba(234,164,75,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(234,164,75,0.08)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_at_center,#000_40%,transparent_80%)]" />
          <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 800 500" fill="none" stroke="rgba(234,164,75,0.5)" strokeWidth="0.8" preserveAspectRatio="xMidYMid slice">
            <path d="M120 250 L400 120 L680 250 L400 380 Z" />
            <path d="M120 250 L400 380" strokeDasharray="4 4" />
            <path d="M680 250 L400 120" strokeDasharray="4 4" />
            <circle cx="400" cy="250" r="6" fill="rgba(234,164,75,0.6)" stroke="none" />
            <circle cx="120" cy="250" r="3" fill="rgba(234,164,75,0.6)" stroke="none" />
            <circle cx="680" cy="250" r="3" fill="rgba(234,164,75,0.6)" stroke="none" />
            <circle cx="400" cy="120" r="3" fill="rgba(234,164,75,0.6)" stroke="none" />
            <circle cx="400" cy="380" r="3" fill="rgba(234,164,75,0.6)" stroke="none" />
          </svg>
          <div className="relative text-center p-8 md:p-16 max-w-2xl">
            <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-ochre mb-4">Mechanical · 2025</p>
            <h3 className="font-display text-3xl md:text-5xl text-white mb-4 tracking-tight">Carbon-fibre UAV chassis</h3>
            <p className="text-neutral-300 leading-relaxed">Lightweight quadrotor frame designed in Fusion 360, with FEA-verified load paths and a hand-laid prepreg layup tuned for shock-prone field deployments.</p>
          </div>
        </div>
      </ContainerScroll>

      <ContainerScroll
        titleComponent={
          <>
            <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-ochre mb-4">Software</p>
            <h2 className="font-display text-[clamp(40px,7vw,84px)] font-light tracking-tight text-white">
              Sequence Viewer.
            </h2>
          </>
        }
      >
        <div className="h-full w-full grid place-items-center rounded-2xl bg-[radial-gradient(120%_90%_at_20%_80%,rgba(103,153,163,0.30),transparent_55%),linear-gradient(180deg,#0A1014,#0A0A0A)] relative overflow-hidden">
          <div className="absolute inset-0 [background-image:linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:100%_20px] [mask-image:linear-gradient(to_bottom,#000,transparent)]" />
          <div className="absolute left-8 top-8 right-8 bottom-8 font-mono text-[10px] text-teal/60 leading-[20px] overflow-hidden opacity-60 select-none">
            <div>{`> load("sample_43.fasta")`}</div>
            <div className="text-ochre/70">ATGCGTAAGCCTGAATCGCATGCTAGCTAGCATGCGTAAGCCT</div>
            <div className="text-teal/70">||||||||||||||||||||||||||||||||||||||||||||</div>
            <div className="text-ochre/70">ATGCGTAAGCCTAAATCGCATGCTAGCTAGCATGCGTAAGCCT</div>
            <div className="mt-2">{`> align(ref, query)  // 98.4% identity`}</div>
            <div className="text-neutral-500">→ 1 mismatch at position 12 (G→A)</div>
            <div className="mt-2">{`> render_heatmap(motifs)`}</div>
            <div className="flex gap-px mt-1 h-3">
              {Array.from({ length: 48 }).map((_, i) => (
                <div key={i} className="flex-1" style={{ background: `rgba(234,164,75,${0.15 + (i % 7) * 0.1})` }} />
              ))}
            </div>
          </div>
          <div className="relative text-center p-8 md:p-16 max-w-2xl bg-black/30 backdrop-blur-sm rounded-2xl border border-white/5">
            <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-ochre mb-4">Bioinformatics · 2025</p>
            <h3 className="font-display text-3xl md:text-5xl text-white mb-4 tracking-tight">Genome alignment dashboard</h3>
            <p className="text-neutral-300 leading-relaxed">A browser-based viewer for short-read alignments — built on WebGL for smooth panning across megabase-scale references, with motif highlighting baked in.</p>
          </div>
        </div>
      </ContainerScroll>

      <section className="max-w-[1400px] mx-auto px-[clamp(24px,5vw,96px)] py-16 pb-32">
        <header className="mb-12 max-w-2xl">
          <Reveal>
            <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-ochre mb-4 inline-flex items-center gap-2 before:content-[''] before:w-6 before:h-px before:bg-ochre">Selected Work</p>
            <AnimatedText
              text="Projects."
              textClassName="font-display text-[clamp(56px,9vw,120px)] !text-left font-light tracking-tight !text-white"
              underlineClassName="text-ochre"
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
    </>
  )
}
