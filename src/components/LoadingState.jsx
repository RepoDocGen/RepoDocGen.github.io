export default function LoadingState({ progress }) {
  const pct = Math.round((progress?.progress || 0) * 100);

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', padding: 24, background: '#fff',
    }}>
      <div className="fade-in-up" style={{ width: '100%', maxWidth: 400, textAlign: 'center' }}>
        <div className="animate-spin" style={{
          width: 36, height: 36, border: '3px solid #e5e7eb', borderTopColor: '#111827',
          borderRadius: '50%', margin: '0 auto 24px',
        }} />

        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#111827', marginBottom: 6 }}>
          Generating Documentation
        </h2>
        <p style={{ fontSize: 14, color: '#6b7280', marginBottom: 28, lineHeight: 1.6 }}>
          {progress?.message || 'Processing...'}
        </p>

        <div style={{ width: '100%', height: 6, background: '#f3f4f6', borderRadius: 100, overflow: 'hidden' }}>
          <div className={pct < 100 ? 'progress-shimmer' : ''} style={{
            height: '100%', width: `${pct}%`,
            background: pct >= 100 ? '#111827' : '#111827',
            borderRadius: 100, transition: 'width 0.5s ease',
          }} />
        </div>

        <p style={{ fontSize: 13, color: '#9ca3af', marginTop: 12, fontVariantNumeric: 'tabular-nums' }}>{pct}%</p>
      </div>
    </div>
  );
}
