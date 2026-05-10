import { useLocation, useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext.jsx'
import { useRef } from 'react'

const Icon = {
  Home: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M3 11.5 12 4l9 7.5"/><path d="M5 10v10h14V10"/>
    </svg>
  ),
  Projects: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect x="3" y="4" width="7" height="7" rx="1.4"/><rect x="14" y="4" width="7" height="7" rx="1.4"/>
      <rect x="3" y="14" width="7" height="7" rx="1.4"/><rect x="14" y="14" width="7" height="7" rx="1.4"/>
    </svg>
  ),
  Experience: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 3 3 8l9 5 9-5-9-5z"/><path d="M3 13l9 5 9-5"/><path d="M3 18l9 5 9-5"/>
    </svg>
  ),
  Gallery: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="1.6"/><path d="m21 15-5-5L5 21"/>
    </svg>
  ),
  YouTube: (p) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M21.6 7.2a2.5 2.5 0 0 0-1.76-1.77C18.2 5 12 5 12 5s-6.2 0-7.84.43A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.76 1.77C5.8 19 12 19 12 19s6.2 0 7.84-.43a2.5 2.5 0 0 0 1.76-1.77A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8ZM10 15V9l5.2 3L10 15Z"/>
    </svg>
  ),
  LinkedIn: (p) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M4.98 3.5A2.5 2.5 0 1 1 5 8.5a2.5 2.5 0 0 1-.02-5ZM3 9.5h4V21H3V9.5Zm7 0h3.8v1.6h.05c.53-1 1.84-2.05 3.78-2.05 4.04 0 4.79 2.66 4.79 6.13V21h-4v-5.27c0-1.26-.02-2.88-1.76-2.88-1.76 0-2.03 1.37-2.03 2.79V21h-4V9.5Z"/>
    </svg>
  ),
  Resume: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6"/><path d="M9 13h6M9 17h6M9 9h2"/>
    </svg>
  ),
  Sun: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
    </svg>
  ),
  Moon: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/>
    </svg>
  ),
}

function DockItem({ children, label, active, onClick, href, accent }) {
  const ref = useRef(null)
  const inner = (
    <div
      ref={ref}
      className={`dock-item ${active ? 'active' : ''} ${accent ? 'accent' : ''}`}
      data-tip={label}
      onClick={onClick}
    >
      {children}
      <span className="dock-tip">{label}</span>
    </div>
  )
  if (href) return <a href={href} target="_blank" rel="noreferrer">{inner}</a>
  return inner
}

export default function FloatingDock() {
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const is = (p) => pathname === p

  return (
    <>
      <style>{`
        .dock {
          position: fixed; bottom: 22px; left: 50%; transform: translateX(-50%);
          z-index: 1000;
          display: flex; align-items: center; gap: 6px;
          padding: 8px;
          background: rgba(20,20,20,0.55);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-full);
          backdrop-filter: blur(18px) saturate(160%);
          -webkit-backdrop-filter: blur(18px) saturate(160%);
          box-shadow:
            0 10px 40px rgba(0,0,0,0.45),
            inset 0 1px 0 rgba(255,255,255,0.08);
        }
        html.light .dock {
          background: rgba(255,255,255,0.6);
          box-shadow: 0 10px 40px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.6);
        }
        .dock-divider {
          width: 1px; height: 22px; background: var(--glass-border); margin: 0 4px;
        }
        .dock-item {
          position: relative;
          width: 44px; height: 44px;
          display: grid; place-items: center;
          border-radius: var(--radius-full);
          color: var(--color-text-secondary);
          cursor: pointer;
          transition: transform var(--transition-base), color var(--transition-base), background var(--transition-base);
        }
        .dock-item svg { width: 20px; height: 20px; }
        .dock-item:hover {
          transform: translateY(-6px) scale(1.08);
          color: var(--color-text-primary);
          background: rgba(255,255,255,0.06);
        }
        html.light .dock-item:hover { background: rgba(0,0,0,0.05); }
        .dock-item.active {
          color: var(--color-ochre);
          background: rgba(234,164,75,0.12);
          box-shadow: 0 0 16px rgba(103,153,163,0.35), inset 0 0 0 1px rgba(234,164,75,0.35);
        }
        .dock-tip {
          position: absolute; bottom: calc(100% + 10px); left: 50%; transform: translateX(-50%) translateY(4px);
          font-family: var(--font-body); font-size: 11px; letter-spacing: 0.04em;
          padding: 4px 8px; border-radius: var(--radius-sm);
          background: rgba(0,0,0,0.85); color: #fff;
          white-space: nowrap; pointer-events: none;
          opacity: 0; transition: opacity var(--transition-fast), transform var(--transition-fast);
        }
        html.light .dock-tip { background: rgba(0,0,0,0.85); color: #fff; }
        .dock-item:hover .dock-tip { opacity: 1; transform: translateX(-50%) translateY(0); }
        @media (max-width: 640px) {
          .dock-item { width: 38px; height: 38px; }
          .dock-item svg { width: 17px; height: 17px; }
        }
      `}</style>
      <nav className="dock" aria-label="Primary">
        <DockItem label="Home" active={is('/')} onClick={() => navigate('/')}><Icon.Home/></DockItem>
        <DockItem label="Projects" active={is('/projects')} onClick={() => navigate('/projects')}><Icon.Projects/></DockItem>
        <DockItem label="Experience" active={is('/experience')} onClick={() => navigate('/experience')}><Icon.Experience/></DockItem>
        <DockItem label="Gallery" active={is('/gallery')} onClick={() => navigate('/gallery')}><Icon.Gallery/></DockItem>
        <span className="dock-divider"/>
        <DockItem label="YouTube" href="#"><Icon.YouTube/></DockItem>
        <DockItem label="LinkedIn" href="#"><Icon.LinkedIn/></DockItem>
        <DockItem label="Resume" href="/assets/resume.pdf"><Icon.Resume/></DockItem>
        <span className="dock-divider"/>
        <DockItem label={theme === 'dark' ? 'Light mode' : 'Dark mode'} onClick={toggleTheme}>
          {theme === 'dark' ? <Icon.Sun/> : <Icon.Moon/>}
        </DockItem>
      </nav>
    </>
  )
}
