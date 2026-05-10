export default function AchievementCard({ title, body, stat, statLabel, accent = 'ochre', featured = false }) {
  const accentColor = `var(--color-${accent})`
  return (
    <article className={`ach-card ${featured ? 'featured' : ''}`}>
      <div className="ach-stat" style={{ color: accentColor }}>
        <span className="ach-stat-num">{stat}</span>
        {statLabel && <span className="ach-stat-label">{statLabel}</span>}
      </div>
      <h3 className="ach-title">{title}</h3>
      <p className="ach-body">{body}</p>
      <div className="ach-corner">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M5 12h14M13 5l7 7-7 7"/>
        </svg>
      </div>
      <style>{`
        .ach-card {
          position: relative;
          background: linear-gradient(180deg, var(--color-bg-secondary), var(--color-bg-surface));
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-lg);
          padding: var(--space-8) var(--space-6) var(--space-6);
          transition: transform var(--transition-base), border-color var(--transition-base), box-shadow var(--transition-base);
          overflow: hidden;
          height: 100%;
          display: flex; flex-direction: column;
        }
        .ach-card::before {
          content: ''; position: absolute; inset: 0;
          background: radial-gradient(circle at 0% 0%, rgba(234,164,75,0.05), transparent 50%);
          pointer-events: none;
        }
        .ach-card:hover {
          transform: translateY(-4px);
          border-color: rgba(103,153,163,0.4);
          box-shadow: 0 24px 60px rgba(0,0,0,0.35), 0 0 40px rgba(103,153,163,0.12);
        }
        .ach-card.featured {
          border: 1px solid rgba(234,164,75,0.55);
          background: linear-gradient(180deg, #15110a, #1A1A1A);
          box-shadow: 0 0 60px rgba(234,164,75,0.15), inset 0 0 0 1px rgba(234,164,75,0.15);
        }
        html.light .ach-card.featured {
          background: linear-gradient(180deg, #F2E6D0, #E3E2DC);
        }
        .ach-card.featured::after {
          content: 'Highest Honor';
          position: absolute; top: var(--space-4); right: var(--space-4);
          font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--color-ochre);
          padding: 4px 10px;
          border: 1px solid rgba(234,164,75,0.35);
          border-radius: var(--radius-full);
          background: rgba(234,164,75,0.08);
        }
        .ach-stat { display: flex; align-items: baseline; gap: 8px; margin-bottom: var(--space-4); }
        .ach-stat-num {
          font-family: var(--font-display);
          font-size: clamp(40px, 6vw, 64px);
          font-weight: 500;
          line-height: 1;
          letter-spacing: -0.04em;
        }
        .featured .ach-stat-num { font-size: clamp(56px, 8vw, 88px); }
        .ach-stat-label {
          font-family: var(--font-mono); font-size: 11px;
          color: var(--color-text-muted); letter-spacing: 0.08em;
          text-transform: uppercase;
        }
        .ach-title {
          font-family: var(--font-display);
          font-size: 22px; font-weight: 500;
          margin-bottom: var(--space-3);
          color: var(--color-text-primary);
        }
        .featured .ach-title { font-size: 28px; }
        .ach-body {
          font-size: 14px; line-height: 1.6;
          color: var(--color-text-secondary);
          flex: 1;
        }
        .ach-corner {
          position: absolute; bottom: var(--space-4); right: var(--space-4);
          color: var(--color-text-muted);
          opacity: 0.5;
          transition: transform var(--transition-base), color var(--transition-base);
        }
        .ach-card:hover .ach-corner { transform: translate(4px, -4px); color: var(--color-ochre); opacity: 1; }
      `}</style>
    </article>
  )
}
