import { useRef, useState } from 'react'

export default function PopoutCard({ title, description, tags = [], image, accent = 'teal' }) {
  const ref = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [hover, setHover] = useState(false)

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width  // 0..1
    const py = (e.clientY - r.top)  / r.height // 0..1
    setTilt({ x: (py - 0.5) * -14, y: (px - 0.5) * 18 })
  }
  const onLeave = () => { setTilt({ x: 0, y: 0 }); setHover(false) }

  return (
    <div className="popout-wrap"
      onMouseEnter={() => setHover(true)}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ perspective: '1200px' }}
    >
      <div
        ref={ref}
        className="popout-card"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(0)`,
        }}
      >
        <div className="popout-img" style={{ transform: hover ? 'translateZ(50px)' : 'translateZ(0)' }}>
          {image
            ? <img src={image} alt={title}/>
            : <div className="popout-placeholder">
                <svg viewBox="0 0 100 100" width="60" height="60" fill="none" stroke="currentColor" strokeWidth="1">
                  <circle cx="50" cy="50" r="30"/><path d="M30 65l15-20 12 14 8-10 15 16"/>
                </svg>
              </div>
          }
          <div className="popout-shine" style={{ opacity: hover ? 1 : 0 }}/>
        </div>
        <div className="popout-body">
          <h3 className="popout-title" style={{ transform: hover ? 'translateZ(40px)' : 'translateZ(0)' }}>{title}</h3>
          <p className="popout-desc" style={{ transform: hover ? 'translateZ(28px)' : 'translateZ(0)' }}>{description}</p>
          <div className="popout-tags" style={{ transform: hover ? 'translateZ(20px)' : 'translateZ(0)' }}>
            {tags.map(t => <span key={t} className="popout-tag">{t}</span>)}
          </div>
        </div>
        <div className="popout-glow"/>
      </div>
      <style>{`
        .popout-wrap { width: 100%; }
        .popout-card {
          position: relative;
          background: linear-gradient(180deg, var(--color-bg-secondary), var(--color-bg-surface));
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-xl);
          padding: var(--space-4);
          transform-style: preserve-3d;
          transition: transform 220ms cubic-bezier(.2,.7,.2,1), box-shadow var(--transition-base), border-color var(--transition-base);
          box-shadow: 0 8px 30px rgba(0,0,0,0.25);
        }
        .popout-wrap:hover .popout-card {
          border-color: rgba(103,153,163,0.55);
          box-shadow:
            0 0 0 1px rgba(103,153,163,0.35),
            0 24px 60px rgba(0,0,0,0.45),
            0 0 60px rgba(103,153,163,0.18);
        }
        .popout-img {
          position: relative;
          aspect-ratio: 4/3;
          overflow: hidden;
          border-radius: var(--radius-lg);
          background: var(--color-bg-surface);
          display: grid; place-items: center;
          color: var(--color-text-muted);
          transition: transform 280ms cubic-bezier(.2,.7,.2,1);
        }
        .popout-img img { width: 100%; height: 100%; object-fit: cover; }
        .popout-placeholder {
          background: radial-gradient(circle at 30% 20%, rgba(234,164,75,0.18), transparent 60%),
                      radial-gradient(circle at 80% 80%, rgba(103,153,163,0.18), transparent 60%);
          width: 100%; height: 100%; display: grid; place-items: center;
        }
        .popout-shine {
          position: absolute; inset: 0;
          background: linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.14) 45%, transparent 55%);
          transition: opacity 300ms ease;
          pointer-events: none;
        }
        .popout-body { padding: var(--space-4) var(--space-2) var(--space-2); }
        .popout-title {
          font-family: var(--font-display); font-size: 22px; font-weight: 500;
          color: var(--color-text-primary); margin-bottom: 6px;
          transition: transform 280ms cubic-bezier(.2,.7,.2,1);
        }
        .popout-desc {
          font-size: 14px; color: var(--color-text-secondary);
          line-height: 1.55; margin-bottom: var(--space-3);
          transition: transform 280ms cubic-bezier(.2,.7,.2,1);
        }
        .popout-tags { display: flex; flex-wrap: wrap; gap: 6px; transition: transform 280ms cubic-bezier(.2,.7,.2,1); }
        .popout-tag {
          font-family: var(--font-mono); font-size: 11px;
          padding: 3px 10px; border-radius: var(--radius-full);
          background: rgba(103,153,163,0.12); color: var(--color-teal);
          border: 1px solid rgba(103,153,163,0.25);
        }
        .popout-glow {
          position: absolute; inset: -1px; border-radius: var(--radius-xl);
          background: radial-gradient(circle at var(--mx,50%) var(--my,50%), rgba(234,164,75,0.10), transparent 60%);
          pointer-events: none; opacity: 0; transition: opacity var(--transition-base);
        }
      `}</style>
    </div>
  )
}
