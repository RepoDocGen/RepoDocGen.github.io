import { motion } from 'framer-motion';
import { useState } from 'react';

export default function CodeSection({ codeExplanation }) {
  if (!codeExplanation?.length) return null;

  return (
    <section className="section-container" style={{ paddingTop: '40px' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 style={{
          fontSize: '32px', fontWeight: 700, marginBottom: '12px',
          letterSpacing: '-0.02em',
        }}>
          Code Walkthrough
        </h2>
        <p style={{
          color: 'var(--text-secondary)', fontSize: '16px',
          marginBottom: '36px', maxWidth: '550px',
        }}>
          File-by-file explanation of the most important code in this project.
        </p>
      </motion.div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {codeExplanation.map((file, idx) => (
          <FileCard key={idx} file={file} index={idx} />
        ))}
      </div>
    </section>
  );
}

function FileCard({ file, index }) {
  const [open, setOpen] = useState(index === 0);

  const complexityColors = {
    beginner: { bg: 'rgba(16, 185, 129, 0.1)', color: '#10b981', label: 'Beginner' },
    intermediate: { bg: 'rgba(251, 191, 36, 0.1)', color: '#fbbf24', label: 'Intermediate' },
    advanced: { bg: 'rgba(239, 68, 68, 0.1)', color: '#f87171', label: 'Advanced' },
  };

  const complexity = complexityColors[file.complexity] || complexityColors.intermediate;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
      className="glass-card"
      style={{ overflow: 'hidden', cursor: 'default' }}
    >
      {/* Header (clickable) */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%', display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', padding: '18px 24px',
          background: 'none', border: 'none', cursor: 'pointer',
          fontFamily: 'var(--font-sans)', textAlign: 'left',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: 0 }}>
          {/* File icon */}
          <div style={{
            width: '32px', height: '32px', borderRadius: '8px',
            background: 'rgba(139, 92, 246, 0.1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent-violet)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
              <polyline points="14,2 14,8 20,8" />
            </svg>
          </div>

          <div style={{ minWidth: 0, flex: 1 }}>
            <p style={{
              fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)',
              fontFamily: 'var(--font-mono)',
              whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
            }}>
              {file.file}
            </p>
            <p style={{
              fontSize: '13px', color: 'var(--text-muted)', marginTop: '2px',
              whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
            }}>
              {file.purpose}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0, marginLeft: '12px' }}>
          <span style={{
            fontSize: '11px', padding: '2px 8px', borderRadius: '4px',
            background: complexity.bg, color: complexity.color, fontWeight: 500,
          }}>
            {complexity.label}
          </span>
          <svg
            width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            style={{ transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </button>

      {/* Content */}
      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          transition={{ duration: 0.3 }}
          style={{
            padding: '0 24px 24px',
            borderTop: '1px solid var(--border-subtle)',
          }}
        >
          {/* Purpose */}
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.7, marginTop: '16px', marginBottom: '20px' }}>
            {file.purpose}
          </p>

          {/* Key Functions */}
          {file.keyFunctions?.length > 0 && (
            <div>
              <h4 style={{
                fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)',
                textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '12px',
              }}>
                Key Functions
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {file.keyFunctions.map((fn, i) => (
                  <div key={i} style={{
                    padding: '10px 14px', borderRadius: 'var(--radius-sm)',
                    background: 'rgba(0, 0, 0, 0.3)', border: '1px solid var(--border-subtle)',
                  }}>
                    <code style={{
                      fontFamily: 'var(--font-mono)', fontSize: '13px',
                      color: 'var(--accent-cyan)', fontWeight: 500,
                    }}>
                      {fn.name}
                    </code>
                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: 1.5 }}>
                      {fn.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}
