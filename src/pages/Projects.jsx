import { useEffect } from 'react'
import Reveal from '../components/Reveal.jsx'
import PopoutCard from '../components/PopoutCard.jsx'

const PROJECTS = [
  { title: 'Dark-Field Microscope', description: 'Low-cost dark field microscopy platform for antimicrobial susceptibility testing.', tags: ['Optics', 'Research', 'Bio'] },
  { title: 'NMES Textile Device', description: 'Wearable neuromuscular electrical stimulation prototype for rehabilitation.', tags: ['Wearable', 'Electronics'] },
  { title: 'Compact Robotic Arm', description: 'Desktop-scale 4-DOF arm with custom planetary gearing.', tags: ['Mechanical', 'CAD'] },
  { title: 'Fluid Sim Visualizer', description: 'Real-time GPU-accelerated 2D fluid simulation in WebGL.', tags: ['Sim', 'GPU'] },
  { title: 'Volleyball Stat Tracker', description: 'iOS app for live volleyball stat capture with bluetooth scoreboards.', tags: ['App', 'Sport'] },
  { title: 'Folded Plate Lamp', description: 'Origami-inspired sheet metal lamp prototyped in SolidWorks.', tags: ['Design', 'Manufacture'] },
]

export default function Projects() {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  return (
    <section className="projects">
      <header className="projects-head">
        <Reveal>
          <div className="section-tag">Selected Work</div>
          <h1>Projects.</h1>
          <p className="projects-lead">
            A grab-bag of mechanical, electrical, and software experiments —
            mostly built late at night with friends.
          </p>
        </Reveal>
      </header>

      <div className="proj-grid">
        {PROJECTS.map((p, i) => (
          <Reveal key={p.title} delay={(i % 3) * 100}>
            <PopoutCard {...p}/>
          </Reveal>
        ))}
      </div>

      <style>{`
        .projects {
          max-width: 1320px;
          margin: 0 auto;
          padding: var(--space-16) clamp(var(--space-6), 5vw, var(--space-12)) var(--space-24);
        }
        .projects-head { margin-bottom: var(--space-16); max-width: 720px; }
        .section-tag {
          font-family: var(--font-mono); font-size: 11px;
          color: var(--color-ochre); letter-spacing: 0.16em;
          text-transform: uppercase; margin-bottom: var(--space-6);
          display: inline-flex; align-items: center; gap: 8px;
        }
        .section-tag::before { content: ''; width: 24px; height: 1px; background: var(--color-ochre); }
        .projects-head h1 {
          font-family: var(--font-display); font-size: clamp(56px, 9vw, 120px);
          font-weight: 300; letter-spacing: -0.04em; line-height: 0.95; margin-bottom: var(--space-4);
        }
        .projects-lead { color: var(--color-text-secondary); font-size: 18px; max-width: 560px; }
        .proj-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-8);
        }
        @media (max-width: 1024px) { .proj-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 640px)  { .proj-grid { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  )
}
