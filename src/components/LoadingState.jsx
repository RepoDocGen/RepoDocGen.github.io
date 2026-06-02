export default function LoadingState({ progress }) {
  const pct = Math.round((progress?.progress || 0) * 100);

  const phaseLabel = {
    starting: 'init',
    cloning: 'clone',
    analyzing: 'analyze',
    generating: 'generate',
    complete: 'done',
  }[progress?.phase] || '...';

  return (
    <div className="scanline-overlay" style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', padding: 24,
    }}>
      <div className="fade-in-up" style={{ width: '100%', maxWidth: 400, textAlign: 'center' }}>
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-muted)',
          marginBottom: 20, letterSpacing: '0.1em',
        }}>
          {'> generating'}.<span style={{ color: 'var(--accent)' }}>{phaseLabel}</span>
        </div>

        <h2 style={{
          fontSize: 18, fontWeight: 700, color: 'var(--text-primary)',
          marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.08em',
        }}>
          {progress?.message || 'Processing...'}
        </h2>

        <p style={{
          fontSize: 12, color: 'var(--text-muted)', marginBottom: 28,
          fontFamily: 'var(--font-mono)',
        }}>
          [{pct}%] {'█'.repeat(Math.floor(pct / 5))}{'░'.repeat(20 - Math.floor(pct / 5))}
        </p>

        <div style={{
          width: '100%', height: 4, background: 'var(--bg-secondary)',
          border: '1px solid var(--border)', overflow: 'hidden',
        }}>
          <div className={pct < 100 ? 'progress-shimmer' : ''} style={{
            height: '100%', width: `${pct}%`,
            background: 'var(--accent)',
            transition: 'width 0.5s ease',
          }} />
        </div>
      </div>
    </div>
  );
}
