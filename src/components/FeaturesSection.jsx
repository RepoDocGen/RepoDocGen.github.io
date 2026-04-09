import { motion } from 'framer-motion';

export default function FeaturesSection({ features }) {
  if (!features?.length) return null;

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
          Features
        </h2>
        <p style={{
          color: 'var(--text-secondary)', fontSize: '16px',
          marginBottom: '40px', maxWidth: '500px',
        }}>
          Key capabilities and what makes this project stand out.
        </p>
      </motion.div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
        gap: '16px',
      }}>
        {features.map((feature, idx) => (
          <motion.div
            key={idx}
            className="glass-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.08, duration: 0.5 }}
            style={{ padding: '24px', cursor: 'default' }}
          >
            {/* Emoji icon */}
            <div style={{
              width: '40px', height: '40px', borderRadius: '10px',
              background: 'var(--gradient-subtle)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '20px', marginBottom: '16px',
            }}>
              {feature.emoji || '✨'}
            </div>

            <h3 style={{
              fontSize: '16px', fontWeight: 600, marginBottom: '8px',
              color: 'var(--text-primary)',
            }}>
              {feature.title}
            </h3>

            <p style={{
              fontSize: '14px', color: 'var(--text-secondary)',
              lineHeight: 1.7,
            }}>
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
