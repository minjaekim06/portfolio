import { useEffect, useState, useCallback } from 'react'
import Reveal from '../components/Reveal.jsx'

const PHOTOS = [
  'Screen Shot 2026-05-10 at 9.43.15 AM.png',
  'Screen Shot 2026-05-10 at 9.45.11 AM.png',
  'Screen Shot 2026-05-10 at 9.45.35 AM.png',
  'Screen Shot 2026-05-10 at 9.46.18 AM.png',
  'Screen Shot 2026-05-10 at 9.46.40 AM.png',
  'Screen Shot 2026-05-10 at 9.47.03 AM.png',
  'Screen Shot 2026-05-10 at 9.47.36 AM.png',
  'Screen Shot 2026-05-10 at 9.48.25 AM.png',
].map((file, i) => ({
  src: `${import.meta.env.BASE_URL}photos/${encodeURIComponent(file)}`,
  alt: file.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' '),
  id: i,
}))

function Lightbox({ photo, onClose, onPrev, onNext }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, onPrev, onNext])

  return (
    <div className="lb" onClick={onClose}>
      <button className="lb-close" onClick={(e) => { e.stopPropagation(); onClose() }} aria-label="Close">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M6 6l12 12M18 6L6 18"/></svg>
      </button>
      <button className="lb-arrow lb-prev" onClick={(e) => { e.stopPropagation(); onPrev() }} aria-label="Previous">
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M15 6l-6 6 6 6"/></svg>
      </button>
      <button className="lb-arrow lb-next" onClick={(e) => { e.stopPropagation(); onNext() }} aria-label="Next">
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M9 6l6 6-6 6"/></svg>
      </button>
      <img src={photo.src} alt={photo.alt} onClick={(e) => e.stopPropagation()}/>
      <style>{`
        .lb {
          position: fixed; inset: 0; z-index: 500;
          background: rgba(0,0,0,0.85);
          backdrop-filter: blur(20px);
          display: grid; place-items: center;
          animation: lbFade 200ms ease;
        }
        @keyframes lbFade { from { opacity: 0 } to { opacity: 1 } }
        .lb img {
          max-width: 90vw; max-height: 90vh;
          border-radius: var(--radius-lg);
          box-shadow: 0 30px 80px rgba(0,0,0,0.6);
        }
        .lb-close, .lb-arrow {
          position: absolute; display: grid; place-items: center;
          width: 44px; height: 44px;
          color: #fff;
          background: rgba(255,255,255,0.10);
          border: 1px solid rgba(255,255,255,0.20);
          border-radius: var(--radius-full);
          backdrop-filter: blur(12px);
          transition: transform var(--transition-fast), background var(--transition-fast);
        }
        .lb-close { top: 24px; right: 24px; }
        .lb-arrow { top: 50%; transform: translateY(-50%); }
        .lb-prev { left: 24px; }
        .lb-next { right: 24px; }
        .lb-close:hover, .lb-arrow:hover { background: rgba(234,164,75,0.25); }
        .lb-arrow:hover { transform: translateY(-50%) scale(1.05); }
      `}</style>
    </div>
  )
}

export default function Gallery() {
  const [active, setActive] = useState(null)
  useEffect(() => { window.scrollTo(0, 0) }, [])

  const open = (i) => setActive(i)
  const close = useCallback(() => setActive(null), [])
  const prev = useCallback(() => setActive(i => (i - 1 + PHOTOS.length) % PHOTOS.length), [])
  const next = useCallback(() => setActive(i => (i + 1) % PHOTOS.length), [])

  return (
    <section className="gal">
      <header className="gal-head">
        <Reveal>
          <div className="section-tag">Lens</div>
          <h1>Gallery.</h1>
          <p className="gal-lead">Frames from a life — friends, food, fluorescence, and the occasional lab bench.</p>
        </Reveal>
      </header>

      <div className="masonry">
        {PHOTOS.map((p, i) => (
          <Reveal key={p.id} delay={i * 60} className="m-item">
            <button className="thumb" onClick={() => open(i)} aria-label={p.alt}>
              <img src={p.src} alt={p.alt} loading="lazy"/>
              <div className="thumb-overlay">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M15 3h6v6M21 3l-7 7M9 21H3v-6M3 21l7-7"/>
                </svg>
              </div>
            </button>
          </Reveal>
        ))}
      </div>

      {active !== null && (
        <Lightbox
          photo={PHOTOS[active]}
          onClose={close}
          onPrev={prev}
          onNext={next}
        />
      )}

      <style>{`
        .gal { max-width: 1400px; margin: 0 auto; padding: var(--space-16) clamp(var(--space-6), 5vw, var(--space-12)) var(--space-24); }
        .gal-head { margin-bottom: var(--space-12); max-width: 720px; }
        .section-tag {
          font-family: var(--font-mono); font-size: 11px;
          color: var(--color-ochre); letter-spacing: 0.16em;
          text-transform: uppercase; margin-bottom: var(--space-6);
          display: inline-flex; align-items: center; gap: 8px;
        }
        .section-tag::before { content: ''; width: 24px; height: 1px; background: var(--color-ochre); }
        .gal-head h1 {
          font-family: var(--font-display); font-size: clamp(56px, 9vw, 120px);
          font-weight: 300; letter-spacing: -0.04em; line-height: 0.95; margin-bottom: var(--space-4);
        }
        .gal-lead { color: var(--color-text-secondary); font-size: 18px; }

        .masonry {
          column-count: 3;
          column-gap: var(--space-4);
        }
        @media (max-width: 1024px) { .masonry { column-count: 2; } }
        @media (max-width: 640px)  { .masonry { column-count: 1; } }
        .m-item { break-inside: avoid; margin-bottom: var(--space-4); display: block; }
        .thumb {
          display: block; width: 100%;
          padding: 0; border: 0; background: transparent; cursor: pointer;
          position: relative; overflow: hidden;
          border-radius: var(--radius-md);
          transition: transform var(--transition-base);
        }
        .thumb img {
          width: 100%; height: auto; display: block;
          border-radius: var(--radius-md);
          transition: transform 600ms cubic-bezier(.2,.7,.2,1), filter var(--transition-base);
        }
        .thumb:hover img {
          transform: scale(1.04);
          filter: brightness(1.04);
        }
        .thumb-overlay {
          position: absolute; inset: 0;
          display: grid; place-items: center;
          color: #fff;
          background: linear-gradient(180deg, transparent 60%, rgba(103,153,163,0.35));
          opacity: 0;
          transition: opacity var(--transition-base);
        }
        .thumb:hover .thumb-overlay { opacity: 1; }
        .thumb::after {
          content: ''; position: absolute; inset: 0;
          border-radius: var(--radius-md);
          box-shadow: inset 0 0 0 1px var(--glass-border);
          pointer-events: none;
        }
        .thumb:hover::after {
          box-shadow: inset 0 0 0 1px rgba(103,153,163,0.55);
        }
      `}</style>
    </section>
  )
}
