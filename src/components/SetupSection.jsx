import { motion } from 'framer-motion';

export default function SetupSection({ setup }) {
  if (!setup) return null;

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
          Getting Started
        </h2>
        <p style={{
          color: 'var(--text-secondary)', fontSize: '16px',
          marginBottom: '40px', maxWidth: '500px',
        }}>
          Set up and run this project locally in a few simple steps.
        </p>

        {/* Prerequisites */}
        {setup.prerequisites?.length > 0 && (
          <div style={{ marginBottom: '36px' }}>
            <h3 style={{
              fontSize: '13px', fontWeight: 600, color: 'var(--text-muted)',
              textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '16px',
            }}>
              Prerequisites
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {setup.prerequisites.map((prereq, i) => (
                <span key={i} style={{
                  padding: '8px 14px', borderRadius: 'var(--radius-sm)',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid var(--border-subtle)',
                  fontSize: '13px', color: 'var(--text-secondary)',
                }}>
                  {prereq}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Install Steps */}
        {setup.installSteps?.length > 0 && (
          <div style={{ marginBottom: '36px' }}>
            <h3 style={{
              fontSize: '13px', fontWeight: 600, color: 'var(--text-muted)',
              textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '16px',
            }}>
              Installation
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {setup.installSteps.map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08, duration: 0.4 }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                    {/* Step number */}
                    <div style={{
                      minWidth: '28px', height: '28px', borderRadius: '50%',
                      background: 'var(--gradient-primary)', display: 'flex',
                      alignItems: 'center', justifyContent: 'center',
                      fontSize: '12px', fontWeight: 700, color: 'white', flexShrink: 0,
                      marginTop: '2px',
                    }}>
                      {step.step || idx + 1}
                    </div>

                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '6px' }}>
                        {step.title}
                      </h4>

                      {step.description && (
                        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '10px', lineHeight: 1.6 }}>
                          {step.description}
                        </p>
                      )}

                      {step.command && (
                        <div style={{ position: 'relative' }}>
                          <div className="code-block" style={{ paddingRight: '48px' }}>
                            <span style={{ color: 'var(--text-muted)', userSelect: 'none' }}>$ </span>
                            {step.command}
                          </div>
                          <button
                            onClick={() => navigator.clipboard.writeText(step.command)}
                            style={{
                              position: 'absolute', top: '10px', right: '10px',
                              background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border-subtle)',
                              borderRadius: '6px', padding: '4px 8px',
                              cursor: 'pointer', color: 'var(--text-muted)',
                              fontSize: '11px', fontFamily: 'var(--font-sans)',
                              transition: 'all 0.2s',
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'var(--text-muted)'; }}
                          >
                            Copy
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Environment Variables */}
        {setup.envVars?.length > 0 && (
          <div>
            <h3 style={{
              fontSize: '13px', fontWeight: 600, color: 'var(--text-muted)',
              textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '16px',
            }}>
              Environment Variables
            </h3>

            <div className="glass-card" style={{ overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <th style={{ padding: '12px 20px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Variable</th>
                    <th style={{ padding: '12px 20px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Description</th>
                    <th style={{ padding: '12px 20px', textAlign: 'center', fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Required</th>
                  </tr>
                </thead>
                <tbody>
                  {setup.envVars.map((v, i) => (
                    <tr key={i} style={{ borderBottom: i < setup.envVars.length - 1 ? '1px solid var(--border-subtle)' : 'none' }}>
                      <td style={{ padding: '12px 20px' }}>
                        <code style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--accent-cyan)' }}>
                          {v.name}
                        </code>
                      </td>
                      <td style={{ padding: '12px 20px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                        {v.description}
                      </td>
                      <td style={{ padding: '12px 20px', textAlign: 'center' }}>
                        {v.required ? (
                          <span style={{ color: '#f87171', fontSize: '12px', fontWeight: 600 }}>Required</span>
                        ) : (
                          <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>Optional</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </motion.div>
    </section>
  );
}
