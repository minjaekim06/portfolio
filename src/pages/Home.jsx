import { useEffect, useRef, useState } from 'react'
import Reveal from '../components/Reveal.jsx'
import AchievementCard from '../components/AchievementCard.jsx'

function Robot() {
  // SVG robot, gently floats
  return (
    <svg className="robot" viewBox="0 0 320 360" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#EAA44B"/>
          <stop offset="1" stopColor="#B97E2E"/>
        </linearGradient>
        <linearGradient id="visor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3A5173"/>
          <stop offset="1" stopColor="#0A1224"/>
        </linearGradient>
        <radialGradient id="eye" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#DAE3BB"/>
          <stop offset="0.5" stopColor="#6799A3"/>
          <stop offset="1" stopColor="#0A1224"/>
        </radialGradient>
        <filter id="glow"><feGaussianBlur stdDeviation="3"/></filter>
      </defs>

      {/* shadow */}
      <ellipse cx="160" cy="340" rx="90" ry="10" fill="#000" opacity="0.35"/>

      {/* antenna */}
      <line x1="160" y1="40" x2="160" y2="78" stroke="#6799A3" strokeWidth="3" strokeLinecap="round"/>
      <circle cx="160" cy="34" r="7" fill="#EAA44B">
        <animate attributeName="r" values="6;8;6" dur="2.4s" repeatCount="indefinite"/>
      </circle>
      <circle cx="160" cy="34" r="14" fill="#EAA44B" opacity="0.25" filter="url(#glow)"/>

      {/* head */}
      <rect x="92" y="78" width="136" height="120" rx="32" fill="url(#body)"/>
      <rect x="96" y="82" width="128" height="20" rx="10" fill="#fff" opacity="0.18"/>

      {/* visor */}
      <rect x="108" y="108" width="104" height="56" rx="22" fill="url(#visor)"/>
      <rect x="110" y="110" width="100" height="14" rx="7" fill="#fff" opacity="0.12"/>

      {/* eyes */}
      <circle cx="138" cy="138" r="11" fill="url(#eye)"/>
      <circle cx="182" cy="138" r="11" fill="url(#eye)"/>
      <circle cx="140" cy="135" r="3" fill="#fff"/>
      <circle cx="184" cy="135" r="3" fill="#fff"/>

      {/* mouth grille */}
      <rect x="138" y="178" width="44" height="6" rx="3" fill="#0A0A0A"/>
      <line x1="148" y1="178" x2="148" y2="184" stroke="#6799A3" strokeWidth="1.2"/>
      <line x1="160" y1="178" x2="160" y2="184" stroke="#6799A3" strokeWidth="1.2"/>
      <line x1="172" y1="178" x2="172" y2="184" stroke="#6799A3" strokeWidth="1.2"/>

      {/* neck */}
      <rect x="148" y="198" width="24" height="12" fill="#3A5173"/>

      {/* body */}
      <rect x="78" y="208" width="164" height="110" rx="20" fill="url(#body)"/>
      <rect x="78" y="208" width="164" height="14" rx="7" fill="#fff" opacity="0.18"/>
      <circle cx="160" cy="262" r="14" fill="#3A5173"/>
      <circle cx="160" cy="262" r="6" fill="#DAE3BB"/>

      {/* chest plate detail */}
      <rect x="100" y="284" width="50" height="6" rx="3" fill="#3A5173" opacity="0.7"/>
      <rect x="170" y="284" width="50" height="6" rx="3" fill="#3A5173" opacity="0.7"/>

      {/* arms */}
      <rect x="48" y="220" width="28" height="80" rx="14" fill="url(#body)"/>
      <rect x="244" y="220" width="28" height="80" rx="14" fill="url(#body)"/>
      <circle cx="62" cy="305" r="14" fill="#3A5173"/>
      <circle cx="258" cy="305" r="14" fill="#3A5173"/>
    </svg>
  )
}

function HeroBackdrop() {
  return (
    <div className="hero-backdrop" aria-hidden>
      <div className="grid"/>
      <div className="orb o1"/>
      <div className="orb o2"/>
    </div>
  )
}

function Hero() {
  return (
    <section className="hero">
      <HeroBackdrop/>
      <div className="hero-inner">
        <div className="hero-text">
          <p className="hero-eyebrow"><span className="dot"/> Available for collaboration · Toronto</p>
          <h1 className="hero-name">
            <span className="hero-name-line line-a">Minjae</span>
            <span className="hero-name-line line-b"><em>Kim</em></span>
          </h1>
          <p className="hero-tagline">
            Mechanical Engineering · University of Toronto · Premed · Builder of small useful things.
          </p>
          <div className="hero-meta">
            <span>ME ’28</span>
            <span className="meta-dot"/>
            <span>Bioeng minor</span>
            <span className="meta-dot"/>
            <span>Microscopy research</span>
          </div>
        </div>
        <div className="hero-robot-wrap">
          <Robot/>
          <div className="hero-robot-shadow"/>
        </div>
      </div>
      <a href="#about" className="scroll-cue" aria-label="Scroll">
        <span/>
      </a>
      <style>{`
        .hero {
          position: relative;
          min-height: 100dvh;
          display: grid;
          place-items: center;
          padding: 0 clamp(var(--space-6), 5vw, var(--space-24));
          overflow: hidden;
        }
        .hero-backdrop { position: absolute; inset: 0; z-index: 0; pointer-events: none; }
        .hero-backdrop .grid {
          position: absolute; inset: -2px;
          background-image:
            linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px);
          background-size: 64px 64px;
          mask-image: radial-gradient(ellipse at 50% 40%, #000 30%, transparent 75%);
        }
        html.light .hero-backdrop .grid {
          background-image:
            linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px);
        }
        .hero-backdrop .orb {
          position: absolute; border-radius: 50%; filter: blur(80px); opacity: 0.45;
        }
        .hero-backdrop .o1 {
          width: 480px; height: 480px;
          left: -120px; top: -120px;
          background: radial-gradient(circle, rgba(58,81,115,0.7), transparent 70%);
        }
        .hero-backdrop .o2 {
          width: 540px; height: 540px;
          right: -160px; bottom: -160px;
          background: radial-gradient(circle, rgba(234,164,75,0.4), transparent 70%);
        }

        .hero-inner {
          position: relative; z-index: 1;
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: var(--space-12);
          align-items: center;
          width: 100%;
          max-width: 1280px;
        }
        @media (max-width: 880px) {
          .hero-inner { grid-template-columns: 1fr; gap: var(--space-8); }
        }

        .hero-eyebrow {
          font-family: var(--font-mono); font-size: 12px;
          color: var(--color-text-secondary); letter-spacing: 0.08em;
          text-transform: uppercase; display: inline-flex; align-items: center; gap: 8px;
          opacity: 0; animation: fadeUp 600ms 100ms forwards cubic-bezier(.2,.7,.2,1);
        }
        .dot { width: 8px; height: 8px; border-radius: 50%; background: var(--color-ochre); box-shadow: 0 0 12px var(--color-ochre); animation: pulse 2s infinite; }
        @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }

        .hero-name {
          font-family: var(--font-display);
          font-size: clamp(56px, 11vw, 168px);
          line-height: 0.92;
          font-weight: 300;
          letter-spacing: -0.04em;
          margin: var(--space-4) 0 var(--space-6);
        }
        .hero-name-line { display: block; opacity: 0; transform: translateY(40px); }
        .line-a { animation: fadeUp 800ms 200ms forwards cubic-bezier(.2,.7,.2,1); }
        .line-b { animation: fadeUp 800ms 350ms forwards cubic-bezier(.2,.7,.2,1); color: var(--color-ochre); }
        .line-b em { font-style: italic; font-family: var(--font-serif); font-weight: 400; }
        @keyframes fadeUp {
          to { opacity: 1; transform: translateY(0); }
        }

        .hero-tagline {
          font-size: clamp(16px, 1.4vw, 19px);
          color: var(--color-text-secondary); max-width: 560px;
          opacity: 0; animation: fadeUp 800ms 500ms forwards cubic-bezier(.2,.7,.2,1);
        }
        .hero-meta {
          margin-top: var(--space-6);
          display: flex; align-items: center; gap: 14px; flex-wrap: wrap;
          font-family: var(--font-mono); font-size: 12px;
          color: var(--color-text-muted); letter-spacing: 0.04em;
          opacity: 0; animation: fadeUp 800ms 650ms forwards cubic-bezier(.2,.7,.2,1);
        }
        .meta-dot { width: 4px; height: 4px; border-radius: 50%; background: var(--color-text-muted); }

        .hero-robot-wrap {
          position: relative;
          display: grid; place-items: center;
          opacity: 0; animation: fadeUp 1000ms 400ms forwards cubic-bezier(.2,.7,.2,1);
        }
        .robot {
          width: clamp(240px, 32vw, 380px);
          height: auto;
          animation: float 4s ease-in-out infinite;
          filter: drop-shadow(0 20px 40px rgba(0,0,0,0.4));
        }
        @keyframes float {
          0%,100% { transform: translateY(0) rotate(-1deg); }
          50%     { transform: translateY(-14px) rotate(1deg); }
        }
        .hero-robot-shadow {
          position: absolute; bottom: 0; left: 50%; transform: translateX(-50%);
          width: 60%; height: 12px; border-radius: 50%;
          background: radial-gradient(ellipse, rgba(234,164,75,0.4), transparent 70%);
          filter: blur(12px);
        }

        .scroll-cue {
          position: absolute; bottom: 110px; left: 50%; transform: translateX(-50%);
          width: 24px; height: 38px;
          border: 1px solid var(--color-text-muted);
          border-radius: 12px;
          opacity: 0; animation: fadeUp 600ms 1000ms forwards;
        }
        .scroll-cue span {
          display: block; width: 3px; height: 8px;
          background: var(--color-text-secondary);
          border-radius: 2px; margin: 6px auto;
          animation: scrollDot 1.6s infinite;
        }
        @keyframes scrollDot {
          0% { transform: translateY(0); opacity: 1; }
          70% { transform: translateY(14px); opacity: 0; }
          100% { opacity: 0; }
        }
      `}</style>
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
    <section id="about" className="about">
      <Reveal className="about-grid">
        <div
          className="photo"
          ref={wrapRef}
          onMouseEnter={() => !isTouch && setInside(true)}
          onMouseMove={!isTouch ? onMove : undefined}
          onMouseLeave={() => setInside(false)}
          onClick={onClick}
        >
          <div className="photo-img">
            {/* placeholder portrait — gradient + initials */}
            <div className="initials">MK</div>
            <div className="photo-vignette"/>
            <div className="photo-grain"/>
          </div>
          {!isTouch && (
            <div
              className="chat-cta"
              style={{ left: pos.x, top: pos.y, opacity: inside ? 1 : 0 }}
            >
              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M13 2 3 14h7l-1 8 10-12h-7l1-8Z"/></svg>
              Let's Chat
            </div>
          )}
        </div>

        <div className="bio">
          <div className="section-tag">About</div>
          <h2>Builder, student, friend.</h2>
          <p className="bio-text">
            Mechanical engineering student at the University of Toronto. Minor in Bioengineering.
            Premed, currently researching and developing a low-cost dark field microscope for
            antimicrobial susceptibility testing. Love volleyball, cooking, and making friends.
          </p>
          <ul className="bio-quick">
            <li><span>01</span> Researching dark-field microscopy for AST</li>
            <li><span>02</span> Bioengineering minor at UofT</li>
            <li><span>03</span> Volleyball, cooking, lifelong friends</li>
          </ul>
        </div>
      </Reveal>

      <style>{`
        .about { padding: var(--space-24) clamp(var(--space-6), 5vw, var(--space-24)); position: relative; }
        .about::before {
          content: ''; position: absolute; inset: 0;
          background: radial-gradient(circle at 80% 20%, rgba(58,81,115,0.15), transparent 50%);
          pointer-events: none;
        }
        .about-grid {
          display: grid;
          grid-template-columns: 420px 1fr;
          gap: var(--space-16);
          align-items: center;
          max-width: 1280px; margin: 0 auto;
        }
        @media (max-width: 880px) { .about-grid { grid-template-columns: 1fr; gap: var(--space-8); } }

        .photo {
          position: relative;
          width: 100%; aspect-ratio: 5/6;
          border-radius: var(--radius-xl);
          overflow: hidden;
          border-left: 3px solid var(--color-teal);
          cursor: pointer;
          background: var(--color-bg-surface);
        }
        .photo-img {
          position: absolute; inset: 0;
          background:
            radial-gradient(120% 90% at 30% 20%, rgba(234,164,75,0.5), transparent 55%),
            radial-gradient(120% 90% at 80% 80%, rgba(58,81,115,0.6), transparent 55%),
            linear-gradient(180deg, #2a1f17, #0E1118);
          display: grid; place-items: center;
        }
        .initials {
          font-family: var(--font-display);
          font-size: clamp(80px, 14vw, 180px);
          font-style: italic;
          color: rgba(245,245,240,0.92);
          letter-spacing: -0.04em;
          mix-blend-mode: overlay;
        }
        .photo-vignette {
          position: absolute; inset: 0;
          background: radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.5));
          pointer-events: none;
        }
        .photo-grain {
          position: absolute; inset: 0; pointer-events: none; mix-blend-mode: overlay; opacity: 0.25;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.4 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        }
        .chat-cta {
          position: absolute;
          transform: translate(-50%, -50%);
          display: inline-flex; align-items: center; gap: 8px;
          padding: 10px 18px;
          font-family: var(--font-body); font-size: 14px; font-weight: 500;
          color: #fff;
          background: rgba(255,255,255,0.14);
          backdrop-filter: blur(12px) saturate(160%);
          -webkit-backdrop-filter: blur(12px) saturate(160%);
          border: 1px solid rgba(255,255,255,0.25);
          border-radius: var(--radius-full);
          pointer-events: none;
          transition: opacity 220ms ease, left 80ms ease, top 80ms ease;
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }

        .section-tag {
          font-family: var(--font-mono); font-size: 11px;
          color: var(--color-ochre); letter-spacing: 0.16em;
          text-transform: uppercase; margin-bottom: var(--space-6);
          display: inline-flex; align-items: center; gap: 8px;
        }
        .section-tag::before { content: ''; width: 24px; height: 1px; background: var(--color-ochre); }
        .bio h2 {
          font-family: var(--font-display);
          font-size: clamp(36px, 5.5vw, 64px);
          font-weight: 400;
          line-height: 1.04;
          letter-spacing: -0.03em;
          margin-bottom: var(--space-6);
        }
        .bio-text {
          font-size: 18px;
          color: var(--color-text-secondary);
          line-height: 1.65;
          margin-bottom: var(--space-8);
          max-width: 580px;
        }
        .bio-quick {
          list-style: none; padding: 0; margin: 0;
          display: flex; flex-direction: column; gap: var(--space-3);
        }
        .bio-quick li {
          display: flex; align-items: baseline; gap: var(--space-4);
          padding: var(--space-3) 0;
          border-top: 1px solid var(--glass-border);
          font-size: 15px; color: var(--color-text-primary);
        }
        .bio-quick li:last-child { border-bottom: 1px solid var(--glass-border); }
        .bio-quick span {
          font-family: var(--font-mono); font-size: 11px;
          color: var(--color-text-muted);
          letter-spacing: 0.06em;
        }
      `}</style>
    </section>
  )
}

function Achievements() {
  const items = [
    { title: "2025 Winter Dean's List", body: 'Completed 2.15 credits, achieving a 3.93/4.0 sGPA and an 88.3% average.', stat: '3.93', statLabel: 'sGPA', accent: 'ochre' },
    { title: "2024 Fall Dean's List", body: 'Completed 2.75 credits, achieving a 3.80/4.0 sGPA and an 84.8% average.', stat: '3.80', statLabel: 'sGPA', accent: 'teal' },
    { title: "UofT Scholar's Program", body: 'Provides recognition to outstanding incoming students. Approximately 900 admission awards were granted with a value of $10,000.', stat: '$10K', statLabel: 'Award', accent: 'sage' },
    { title: "Governor General's Academic Award", body: "Awarded for achieving the highest average of my graduating class with a cumulative grades 10–12 average of 98.9%.", stat: '98.9%', statLabel: 'Average', accent: 'ochre', featured: true },
  ]

  return (
    <section className="achievements">
      <div className="ach-head">
        <Reveal>
          <div className="section-tag">Recognition</div>
          <h2>Academic <em>Achievements</em>.</h2>
          <p className="ach-lead">A record of curiosity that paid off.</p>
        </Reveal>
      </div>

      <div className="ach-grid">
        {items.map((item, i) => (
          <Reveal key={item.title} delay={i * 110} className={item.featured ? 'span-2' : ''}>
            <AchievementCard {...item}/>
          </Reveal>
        ))}
      </div>

      <style>{`
        .achievements { padding: var(--space-24) clamp(var(--space-6), 5vw, var(--space-24)); max-width: 1280px; margin: 0 auto; }
        .ach-head { margin-bottom: var(--space-16); max-width: 720px; }
        .ach-head h2 {
          font-family: var(--font-display); font-size: clamp(40px, 6vw, 72px);
          font-weight: 400; line-height: 1.04; letter-spacing: -0.03em;
          margin-bottom: var(--space-3);
        }
        .ach-head h2 em { font-family: var(--font-serif); color: var(--color-ochre); font-style: italic; font-weight: 400; }
        .ach-lead { color: var(--color-text-secondary); font-size: 18px; }
        .ach-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-6);
          grid-auto-flow: dense;
        }
        .span-2 { grid-column: span 2; }
        @media (max-width: 1024px) {
          .ach-grid { grid-template-columns: repeat(2, 1fr); }
          .span-2 { grid-column: span 2; }
        }
        @media (max-width: 640px) {
          .ach-grid { grid-template-columns: 1fr; }
          .span-2 { grid-column: span 1; }
        }
      `}</style>
    </section>
  )
}

function Footer() {
  return (
    <footer className="foot">
      <div>
        <p className="foot-name">Minjae Kim</p>
        <p className="foot-meta">Toronto · 2026</p>
      </div>
      <div className="foot-links">
        <a href="#">YouTube</a>
        <a href="#">LinkedIn</a>
        <a href="mailto:minjae@example.com">Email</a>
      </div>
      <style>{`
        .foot {
          margin-top: var(--space-24);
          padding: var(--space-12) clamp(var(--space-6), 5vw, var(--space-24)) var(--space-24);
          display: flex; justify-content: space-between; align-items: flex-end;
          border-top: 1px solid var(--glass-border);
          flex-wrap: wrap; gap: var(--space-6);
          max-width: 1280px; margin-left: auto; margin-right: auto;
        }
        .foot-name { font-family: var(--font-display); font-size: 24px; }
        .foot-meta { color: var(--color-text-muted); font-family: var(--font-mono); font-size: 12px; }
        .foot-links { display: flex; gap: var(--space-6); font-family: var(--font-mono); font-size: 13px; color: var(--color-text-secondary); }
        .foot-links a { transition: color var(--transition-fast); }
        .foot-links a:hover { color: var(--color-ochre); }
      `}</style>
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
