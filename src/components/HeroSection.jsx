import { motion } from 'framer-motion';

export default function HeroSection({ hero, meta, techStack }) {
  return (
    <section className="section-container" style={{ paddingTop: '64px', paddingBottom: '64px' }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        {/* Badges */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
          {meta?.language && <span className="badge">{meta.language}</span>}
          {meta?.license && <span className="badge" style={{ background: 'rgba(16, 185, 129, 0.1)', borderColor: 'rgba(16, 185, 129, 0.2)', color: 'var(--accent-emerald)' }}>{meta.license}</span>}
          {meta?.stars > 0 && <span className="badge" style={{ background: 'rgba(251, 191, 36, 0.1)', borderColor: 'rgba(251, 191, 36, 0.2)', color: '#fbbf24' }}>⭐ {meta.stars.toLocaleString()} stars</span>}
          {meta?.forks > 0 && <span className="badge" style={{ background: 'rgba(59, 130, 246, 0.1)', borderColor: 'rgba(59, 130, 246, 0.2)', color: 'var(--accent-blue)' }}>🔱 {meta.forks.toLocaleString()} forks</span>}
        </div>

        {/* Title */}
        <h1 className="gradient-text" style={{
          fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 800,
          lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: '16px',
        }}>
          {hero?.title || meta?.name || 'Project'}
        </h1>

        {/* Tagline */}
        {hero?.tagline && (
          <p style={{
            fontSize: '20px', color: 'var(--text-secondary)',
            fontWeight: 400, marginBottom: '24px', lineHeight: 1.5,
          }}>
            {hero.tagline}
          </p>
        )}

        {/* Description */}
        {hero?.description && (
          <div style={{
            fontSize: '16px', color: 'var(--text-secondary)',
            lineHeight: 1.8, maxWidth: '720px',
          }}>
            {hero.description.split('\n').map((para, i) => (
              <p key={i} style={{ marginBottom: '12px' }}>{para}</p>
            ))}
          </div>
        )}

        {/* Topics */}
        {meta?.topics?.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '24px' }}>
            {meta.topics.map((topic) => (
              <span key={topic} style={{
                padding: '4px 10px', borderRadius: '100px', fontSize: '12px',
                background: 'rgba(139, 92, 246, 0.06)', border: '1px solid rgba(139, 92, 246, 0.12)',
                color: 'var(--text-muted)',
              }}>
                {topic}
              </span>
            ))}
          </div>
        )}

        {/* Tech Stack */}
        {techStack?.length > 0 && (
          <div style={{ marginTop: '40px' }}>
            <h3 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '16px' }}>
              Tech Stack
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {techStack.map((tech, i) => (
                <div key={i} className="glass-card" style={{
                  padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '8px',
                  borderRadius: 'var(--radius-sm)', cursor: 'default',
                }}>
                  <span style={{ fontSize: '16px' }}>{tech.emoji || '🔧'}</span>
                  <div>
                    <p style={{ fontSize: '13px', fontWeight: 600 }}>{tech.name}</p>
                    <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{tech.purpose}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick links */}
        <div style={{ display: 'flex', gap: '12px', marginTop: '32px' }}>
          <a
            href={meta?.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ textDecoration: 'none', fontSize: '14px', padding: '10px 24px' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
            </svg>
            View Source
          </a>
          <button
            onClick={() => document.getElementById('setup')?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              padding: '10px 24px', borderRadius: 'var(--radius-md)',
              background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-subtle)',
              color: 'var(--text-secondary)', cursor: 'pointer', fontFamily: 'var(--font-sans)',
              fontSize: '14px', fontWeight: 500, transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
          >
            Get Started →
          </button>
        </div>
      </motion.div>
    </section>
  );
}
