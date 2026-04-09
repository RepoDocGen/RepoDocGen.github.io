import { motion } from 'framer-motion';

/**
 * Renders images assigned to a specific section.
 * Images are linked from raw.githubusercontent.com — not downloaded.
 */
export default function SectionImages({ images, section }) {
  // Filter images assigned to this section
  const sectionImages = (images || []).filter(img => img.section === section);

  if (sectionImages.length === 0) return null;

  return (
    <div style={{ marginTop: '32px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {sectionImages.map((img, idx) => (
        <motion.figure
          key={idx}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.1, duration: 0.5 }}
          style={{ margin: 0 }}
        >
          <a href={img.url} target="_blank" rel="noopener noreferrer">
            <div style={{
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              border: '1px solid var(--border-subtle)',
              background: 'rgba(255, 255, 255, 0.02)',
              transition: 'all 0.3s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-accent)';
              e.currentTarget.style.boxShadow = '0 4px 24px rgba(139, 92, 246, 0.08)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-subtle)';
              e.currentTarget.style.boxShadow = 'none';
            }}
            >
              <img
                src={img.url}
                alt={img.alt || 'Repository image'}
                loading="lazy"
                style={{
                  width: '100%',
                  maxHeight: '500px',
                  objectFit: 'contain',
                  display: 'block',
                  background: 'rgba(255,255,255,0.95)',
                  padding: '16px',
                }}
              />
            </div>
          </a>
          {img.caption && (
            <figcaption style={{
              marginTop: '10px',
              fontSize: '13px',
              color: 'var(--text-muted)',
              textAlign: 'center',
              fontStyle: 'italic',
            }}>
              {img.caption}
            </figcaption>
          )}
        </motion.figure>
      ))}
    </div>
  );
}
