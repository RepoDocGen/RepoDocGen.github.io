import { motion } from 'framer-motion';

export default function ArchitectureSection({ architecture }) {
  if (!architecture) return null;

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
          Architecture
        </h2>

        {/* Overview */}
        {architecture.overview && (
          <div style={{
            fontSize: '15px', color: 'var(--text-secondary)',
            lineHeight: 1.8, marginBottom: '32px', maxWidth: '720px',
          }}>
            {architecture.overview.split('\n').map((p, i) => (
              <p key={i} style={{ marginBottom: '10px' }}>{p}</p>
            ))}
          </div>
        )}

        {/* Flow Diagram */}
        {architecture.flowDiagram && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="gradient-border"
            style={{ padding: '28px', marginBottom: '36px' }}
          >
            <h3 style={{
              fontSize: '13px', fontWeight: 600, color: 'var(--text-muted)',
              textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '16px',
            }}>
              Data Flow
            </h3>
            <pre style={{
              fontFamily: 'var(--font-mono)', fontSize: '13px',
              color: 'var(--accent-cyan)', lineHeight: 1.8,
              whiteSpace: 'pre-wrap', wordBreak: 'break-word',
              margin: 0,
            }}>
              {architecture.flowDiagram}
            </pre>
          </motion.div>
        )}

        {/* Components */}
        {architecture.components?.length > 0 && (
          <div>
            <h3 style={{
              fontSize: '13px', fontWeight: 600, color: 'var(--text-muted)',
              textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '16px',
            }}>
              Components
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {architecture.components.map((comp, idx) => (
                <motion.div
                  key={idx}
                  className="glass-card"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08, duration: 0.4 }}
                  style={{
                    padding: '20px 24px',
                    display: 'flex', alignItems: 'flex-start', gap: '16px',
                    cursor: 'default',
                  }}
                >
                  {/* Index */}
                  <div style={{
                    minWidth: '32px', height: '32px', borderRadius: '8px',
                    background: 'var(--gradient-primary)', display: 'flex',
                    alignItems: 'center', justifyContent: 'center',
                    fontSize: '13px', fontWeight: 700, color: 'white', flexShrink: 0,
                  }}>
                    {idx + 1}
                  </div>

                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px', flexWrap: 'wrap' }}>
                      <h4 style={{ fontSize: '15px', fontWeight: 600 }}>{comp.name}</h4>
                      {comp.techStack && (
                        <span style={{
                          fontSize: '11px', padding: '2px 8px', borderRadius: '4px',
                          background: 'rgba(6, 182, 212, 0.1)', color: 'var(--accent-cyan)',
                          fontFamily: 'var(--font-mono)',
                        }}>
                          {comp.techStack}
                        </span>
                      )}
                    </div>
                    <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                      {comp.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </section>
  );
}
