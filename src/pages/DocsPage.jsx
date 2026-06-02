import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchCachedDocs } from '../utils/api';

const SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'features', label: 'Features' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'how-it-works', label: 'How It Works' },
  { id: 'code', label: 'Key Code' },
  { id: 'setup', label: 'Getting Started' },
];

export default function DocsPage({ docsData, setDocsData }) {
  const { owner, repo } = useParams();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('overview');
  const [loading, setLoading] = useState(!docsData);
  const [error, setError] = useState('');

  useEffect(() => {
    if (docsData) { setLoading(false); return; }
    async function loadDocs() {
      try {
        const data = await fetchCachedDocs(owner, repo);
        if (data) { setDocsData(data); setLoading(false); }
        else { setError('Documentation not found.'); setLoading(false); }
      } catch { setError('Failed to load documentation.'); setLoading(false); }
    }
    loadDocs();
  }, [owner, repo, docsData, setDocsData]);

  useEffect(() => {
    if (loading || error) return;
    const observer = new IntersectionObserver(
      (entries) => { for (const e of entries) if (e.isIntersecting) setActiveSection(e.target.id); },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
    );
    SECTIONS.forEach(({ id }) => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, [loading, error, docsData]);

  if (loading) return (
    <div className="scanline-overlay" style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{
          width: 24, height: 24, border: '2px solid var(--border)',
          borderTopColor: 'var(--accent)', borderRadius: '50%',
          margin: '0 auto 16px', animation: 'spin 1s linear infinite',
        }} />
        <p style={{ color: 'var(--text-muted)', fontSize: 12, fontFamily: 'var(--font-mono)' }}>
          {'> loading docs...'}
        </p>
      </div>
    </div>
  );

  if (error) return (
    <div className="scanline-overlay" style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', gap: 16,
    }}>
      <p style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: 13 }}>
        {'> '}{error}
      </p>
      <button className="btn-primary" onClick={() => navigate('/')}>{'<- Back'}</button>
    </div>
  );

  const { meta, sections } = docsData;
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }} className="scanline-overlay">
      {/* Sidebar */}
      <aside className="hidden-mobile" style={{
        position: 'fixed', top: 0, left: 0, width: 220, height: '100vh',
        borderRight: '1px solid var(--border)', padding: '20px 0',
        background: 'var(--bg-secondary)', zIndex: 50, overflowY: 'auto',
        display: 'flex', flexDirection: 'column',
      }}>
        <div style={{ padding: '0 16px', marginBottom: 24 }}>
          <button onClick={() => navigate('/')} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-muted)',
            display: 'flex', alignItems: 'center', gap: 6, textTransform: 'uppercase',
            letterSpacing: '0.08em',
          }}>
            {'<-'} RepoDocGen
          </button>
        </div>

        <div style={{ padding: '0 16px', marginBottom: 24 }}>
          <p style={{
            fontSize: 10, color: 'var(--text-muted)', marginBottom: 2,
            textTransform: 'uppercase', letterSpacing: '0.1em',
          }}>{owner}/</p>
          <p style={{
            fontSize: 14, fontWeight: 700, color: 'var(--text-primary)',
            fontFamily: 'var(--font-mono)', textTransform: 'uppercase',
            letterSpacing: '0.06em',
          }}>{repo}</p>
          <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
            {meta.language && <span className="badge">{meta.language}</span>}
            {meta.stars > 0 && <span className="badge">* {meta.stars}</span>}
          </div>
        </div>

        <nav style={{ flex: 1, padding: '0 8px' }}>
          {SECTIONS.map(({ id, label }) => (
            <button key={id} onClick={() => scrollTo(id)}
              className={`sidebar-link ${activeSection === id ? 'active' : ''}`}
              style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-mono)', textAlign: 'left' }}
            >
              {label}
            </button>
          ))}
        </nav>

        {meta.githubUrl && (
          <div style={{ padding: '14px 16px', borderTop: '1px solid var(--border)' }}>
            <a href={meta.githubUrl} target="_blank" rel="noopener noreferrer"
              style={{
                fontSize: 11, color: 'var(--text-muted)',
                display: 'flex', alignItems: 'center', gap: 6,
                textDecoration: 'none', fontFamily: 'var(--font-mono)',
                textTransform: 'uppercase', letterSpacing: '0.06em',
              }}>
              <GithubIcon size={12} />
              Source
            </a>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main style={{ marginLeft: 220, flex: 1, width: 'calc(100% - 220px)' }}>
        <header style={{
          position: 'sticky', top: 0, zIndex: 40,
          background: 'rgba(10,10,10,0.9)', backdropFilter: 'blur(8px)',
          borderBottom: '1px solid var(--border)',
          padding: '0 24px', height: 48,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{
              fontSize: 12, fontWeight: 700, color: 'var(--text-primary)',
              fontFamily: 'var(--font-mono)', textTransform: 'uppercase',
              letterSpacing: '0.06em',
            }}>{meta?.name || repo}</span>
            {meta?.language && <span className="badge" style={{ fontSize: 10, padding: '2px 6px' }}>{meta.language}</span>}
          </div>
          {meta?.githubUrl && (
            <a href={meta.githubUrl} target="_blank" rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '5px 12px', border: '1px solid var(--border)',
                background: 'transparent', color: 'var(--text-secondary)',
                textDecoration: 'none', fontSize: 11, fontFamily: 'var(--font-mono)',
                textTransform: 'uppercase', letterSpacing: '0.06em',
                transition: 'all 0.15s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
            >
              <GithubIcon size={12} />
              Source
            </a>
          )}
        </header>

        <section id="overview"><HeroSection hero={sections.hero} meta={meta} techStack={sections.techStack} images={sections.images} /></section>
        <Divider />
        <section id="features"><FeaturesSection features={sections.features} images={sections.images} /></section>
        <Divider />
        <section id="architecture"><ArchitectureSection architecture={sections.architecture} images={sections.images} /></section>
        <Divider />
        <section id="how-it-works"><HowItWorksSection howItWorks={sections.howItWorks} images={sections.images} /></section>
        <Divider />
        <section id="code"><CodeSection code={sections.codeExplanation} images={sections.images} /></section>
        <Divider />
        <section id="setup"><SetupSection setup={sections.setup} images={sections.images} /></section>

        <footer style={{
          textAlign: 'center', padding: '40px 24px',
          borderTop: '1px dashed var(--border)',
          color: 'var(--text-muted)', fontSize: 11,
          fontFamily: 'var(--font-mono)', textTransform: 'uppercase',
          letterSpacing: '0.1em',
        }}>
          Generated by RepoDocGen
        </footer>
      </main>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          main { margin-left: 0 !important; width: 100% !important; }
        }
      `}</style>
    </div>
  );
}

function GithubIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
  );
}

function Divider() {
  return <div className="section-divider"><hr /></div>;
}

function SectionImgs({ images, section }) {
  if (!images?.length) return null;
  const filtered = images.filter(img => img.section === section);
  if (!filtered.length) return null;
  return (
    <div style={{ marginTop: 24 }}>
      {filtered.map((img, i) => (
        <figure key={i} style={{ marginBottom: 18 }}>
          <img src={img.url} alt={img.alt || ''} style={{ maxWidth: '100%', border: '1px solid var(--border)' }} />
          {img.caption && <figcaption style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 8, textAlign: 'center', fontFamily: 'var(--font-mono)' }}>{img.caption}</figcaption>}
        </figure>
      ))}
    </div>
  );
}

function HeroSection({ hero, meta, techStack, images }) {
  if (!hero) return null;
  return (
    <div className="section-container" style={{ paddingTop: 40 }}>
      <p style={{
        fontSize: 10, color: 'var(--text-muted)', marginBottom: 10,
        textTransform: 'uppercase', letterSpacing: '0.12em',
        fontFamily: 'var(--font-mono)',
      }}>
        {'/'}{meta.fullName || `${meta.owner}/${meta.name}`}
      </p>
      <h1 style={{
        fontSize: 'clamp(22px, 4vw, 36px)', fontWeight: 700,
        letterSpacing: '0.06em', lineHeight: 1.2, marginBottom: 10,
        textTransform: 'uppercase',
      }}>
        {hero.title}
      </h1>
      <p style={{
        fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7,
        marginBottom: 20, maxWidth: 600,
      }}>
        {hero.tagline}
      </p>

      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 20 }}>
        {meta.language && <span className="badge">{meta.language}</span>}
        {meta.stars > 0 && <span className="badge">* {meta.stars}</span>}
        {meta.forks > 0 && <span className="badge">+ {meta.forks}</span>}
        {meta.topics?.slice(0, 4).map((t, i) => <span className="badge" key={i}>{t}</span>)}
      </div>

      <div className="doc-text" style={{ whiteSpace: 'pre-line', maxWidth: 660 }}>{hero.description}</div>

      <SectionImgs images={images} section="hero" />

      {techStack?.length > 0 && (
        <div style={{ marginTop: 32 }}>
          <h3 style={{
            fontSize: 10, fontWeight: 600, color: 'var(--text-muted)',
            textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 12,
            fontFamily: 'var(--font-mono)',
          }}>Tech Stack</h3>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {techStack.map((t, i) => (
              <div key={i} className="retro-card" style={{ padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 16 }}>{t.emoji || '>'}</span>
                <div>
                  <p style={{ fontSize: 12, fontWeight: 700, fontFamily: 'var(--font-mono)' }}>{t.name}</p>
                  <p style={{ fontSize: 10, color: 'var(--text-muted)', lineHeight: 1.4 }}>{t.purpose}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function FeaturesSection({ features, images }) {
  if (!features?.length) return null;
  return (
    <div className="section-container">
      <h2 className="doc-h2">Features</h2>
      <p className="doc-text" style={{ marginBottom: 20 }}>Key capabilities and what makes this project stand out.</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 10 }}>
        {features.map((f, i) => (
          <div key={i} className="retro-card" style={{ padding: 16 }}>
            <div style={{
              width: 32, height: 32, display: 'flex', alignItems: 'center',
              justifyContent: 'center', fontSize: 16, marginBottom: 10,
              border: '1px solid var(--border)',
            }}>
              {f.emoji || '>'}
            </div>
            <strong style={{
              fontSize: 12, display: 'block', marginBottom: 4,
              fontFamily: 'var(--font-mono)', textTransform: 'uppercase',
              letterSpacing: '0.06em',
            }}>{f.title}</strong>
            <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 0 }}>{f.description}</p>
          </div>
        ))}
      </div>
      <SectionImgs images={images} section="features" />
    </div>
  );
}

function ArchitectureSection({ architecture, images }) {
  if (!architecture) return null;
  return (
    <div className="section-container">
      <h2 className="doc-h2">Architecture</h2>
      <div className="doc-text" style={{ whiteSpace: 'pre-line', maxWidth: 660 }}>{architecture.overview}</div>
      <SectionImgs images={images} section="architecture" />

      {architecture.flowDiagram && (
        <div style={{ marginTop: 24 }}>
          <h3 style={{
            fontSize: 10, fontWeight: 600, color: 'var(--text-muted)',
            textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 12,
            fontFamily: 'var(--font-mono)',
          }}>Data Flow</h3>
          <pre className="code-block">{architecture.flowDiagram}</pre>
        </div>
      )}

      {architecture.components?.length > 0 && (
        <div style={{ marginTop: 28 }}>
          <h3 style={{
            fontSize: 10, fontWeight: 600, color: 'var(--text-muted)',
            textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 12,
            fontFamily: 'var(--font-mono)',
          }}>Components</h3>
          <div style={{ display: 'grid', gap: 8 }}>
            {architecture.components.map((c, i) => (
              <div key={i} className="retro-card" style={{ padding: '14px 18px', display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <div style={{
                  minWidth: 24, height: 24, display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: 10, fontWeight: 700,
                  color: 'var(--bg-primary)', background: 'var(--accent)',
                  fontFamily: 'var(--font-mono)', flexShrink: 0,
                }}>{i + 1}</div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
                    <strong style={{ fontSize: 13, fontFamily: 'var(--font-mono)' }}>{c.name}</strong>
                    {c.techStack && <span style={{ fontSize: 10, padding: '2px 6px', border: '1px solid var(--border)', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>{c.techStack}</span>}
                  </div>
                  <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{c.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function HowItWorksSection({ howItWorks, images }) {
  if (!howItWorks?.steps?.length) return null;
  return (
    <div className="section-container">
      <h2 className="doc-h2">How It Works</h2>
      {howItWorks.summary && <p className="doc-text">{howItWorks.summary}</p>}

      <div style={{ marginTop: 18, position: 'relative', paddingLeft: 28 }}>
        <div style={{ position: 'absolute', left: 13, top: 8, bottom: 8, width: 1, background: 'var(--border-accent)' }} />
        {howItWorks.steps.map((step, i) => (
          <div key={i} style={{ marginBottom: 24, position: 'relative' }}>
            <div style={{
              position: 'absolute', left: -22, top: 6, width: 8, height: 8,
              background: 'var(--accent)', border: '2px solid var(--bg-primary)',
            }} />
            <strong style={{
              fontSize: 13, display: 'block', marginBottom: 4,
              fontFamily: 'var(--font-mono)', textTransform: 'uppercase',
              letterSpacing: '0.04em',
            }}>{step.title}</strong>
            <p style={{ color: 'var(--text-secondary)', fontSize: 12, lineHeight: 1.7 }}>{step.description}</p>
          </div>
        ))}
      </div>
      <SectionImgs images={images} section="howItWorks" />
    </div>
  );
}

function CodeSection({ code, images }) {
  if (!code?.length) return null;
  const important = code.filter(f => f.complexity !== 'beginner' || f.keyFunctions?.length > 0).slice(0, 6);
  if (!important.length) return null;

  const cxStyle = (c) => {
    if (c === 'advanced') return { border: '1px solid var(--danger)', color: 'var(--danger)' };
    if (c === 'intermediate') return { border: '1px solid var(--warning)', color: 'var(--warning)' };
    return { border: '1px solid var(--accent)', color: 'var(--accent)' };
  };

  return (
    <div className="section-container">
      <h2 className="doc-h2">Key Code</h2>
      <p className="doc-text">Important modules and their core functions.</p>

      {important.map((file, i) => (
        <div key={i} style={{ marginBottom: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6, flexWrap: 'wrap' }}>
            <h3 style={{
              fontSize: 13, fontWeight: 700, fontFamily: 'var(--font-mono)',
              margin: 0,
            }}>{file.file}</h3>
            {file.complexity && (
              <span style={{
                fontSize: 10, padding: '2px 8px',
                fontFamily: 'var(--font-mono)', textTransform: 'uppercase',
                letterSpacing: '0.06em', ...cxStyle(file.complexity),
              }}>{file.complexity}</span>
            )}
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: 12, lineHeight: 1.7, marginBottom: 10 }}>{file.purpose}</p>

          {file.keyFunctions?.length > 0 && (
            <div style={{ paddingLeft: 14, borderLeft: '1px dashed var(--border)' }}>
              {file.keyFunctions.map((fn, j) => (
                <div key={j} style={{ marginBottom: 10 }}>
                  <code style={{ fontSize: 12, fontWeight: 700 }}>{fn.name}</code>
                  <p style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2, lineHeight: 1.6 }}>{fn.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
      <SectionImgs images={images} section="codeExplanation" />
    </div>
  );
}

function SetupSection({ setup, images }) {
  if (!setup) return null;
  return (
    <div className="section-container">
      <h2 className="doc-h2">Getting Started</h2>

      {setup.prerequisites?.length > 0 && (
        <div style={{ marginBottom: 24 }}>
          <h3 style={{
            fontSize: 10, fontWeight: 600, color: 'var(--text-muted)',
            textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 10,
            fontFamily: 'var(--font-mono)',
          }}>Prerequisites</h3>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {setup.prerequisites.map((p, i) => <span key={i} className="badge">{p}</span>)}
          </div>
        </div>
      )}

      {setup.installSteps?.length > 0 && (
        <div style={{ marginBottom: 24 }}>
          <h3 style={{
            fontSize: 10, fontWeight: 600, color: 'var(--text-muted)',
            textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 10,
            fontFamily: 'var(--font-mono)',
          }}>Installation</h3>
          {setup.installSteps.map((step, i) => (
            <div key={i} style={{ marginBottom: 16, display: 'flex', alignItems: 'flex-start', gap: 12 }}>
              <div style={{
                minWidth: 22, height: 22, display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: 10, fontWeight: 700,
                color: 'var(--bg-primary)', background: 'var(--accent)',
                fontFamily: 'var(--font-mono)', flexShrink: 0, marginTop: 2,
              }}>
                {step.step || i + 1}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 13, fontWeight: 700, marginBottom: 4, fontFamily: 'var(--font-mono)' }}>{step.title}</p>
                {step.description && <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 8, lineHeight: 1.6 }}>{step.description}</p>}
                {step.command && (
                  <div style={{ position: 'relative' }}>
                    <pre className="code-block" style={{ paddingRight: 52 }}>
                      <span style={{ color: 'var(--text-muted)', userSelect: 'none' }}>$ </span>{step.command}
                    </pre>
                    <button
                      onClick={() => navigator.clipboard.writeText(step.command)}
                      style={{
                        position: 'absolute', top: 8, right: 8,
                        background: 'var(--bg-card)', border: '1px solid var(--border)',
                        padding: '3px 8px', cursor: 'pointer',
                        color: 'var(--text-muted)', fontSize: 10,
                        fontFamily: 'var(--font-mono)', textTransform: 'uppercase',
                        letterSpacing: '0.06em', transition: 'all 0.15s',
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-muted)'; }}
                    >Copy</button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {setup.envVars?.length > 0 && (
        <div style={{ marginBottom: 24 }}>
          <h3 style={{
            fontSize: 10, fontWeight: 600, color: 'var(--text-muted)',
            textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 10,
            fontFamily: 'var(--font-mono)',
          }}>Environment Variables</h3>
          <div className="retro-card" style={{ overflow: 'hidden', padding: 0 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <th style={{ padding: '10px 14px', fontWeight: 700, fontSize: 10, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', textAlign: 'left' }}>Variable</th>
                  <th style={{ padding: '10px 14px', fontWeight: 700, fontSize: 10, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', textAlign: 'left' }}>Description</th>
                  <th style={{ padding: '10px 14px', fontWeight: 700, fontSize: 10, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', textAlign: 'center', width: 80 }}>Required</th>
                </tr>
              </thead>
              <tbody>
                {setup.envVars.map((v, i) => (
                  <tr key={i} style={{ borderBottom: i < setup.envVars.length - 1 ? '1px solid var(--border)' : 'none' }}>
                    <td style={{ padding: '10px 14px' }}><code>{v.name}</code></td>
                    <td style={{ padding: '10px 14px', color: 'var(--text-secondary)' }}>{v.description}</td>
                    <td style={{ padding: '10px 14px', textAlign: 'center' }}>
                      {v.required
                        ? <span style={{ color: 'var(--danger)', fontWeight: 700, fontSize: 10, fontFamily: 'var(--font-mono)' }}>REQ</span>
                        : <span style={{ color: 'var(--text-muted)', fontSize: 10, fontFamily: 'var(--font-mono)' }}>OPT</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <SectionImgs images={images} section="setup" />
    </div>
  );
}
