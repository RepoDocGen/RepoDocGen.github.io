import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateDocs } from '../utils/api';
import LoadingState from '../components/LoadingState';

export default function HomePage({ onDocsGenerated }) {
  const navigate = useNavigate();
  const [repoUrl, setRepoUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(null);
  const [error, setError] = useState('');

  const handleGenerate = async (e) => {
    e.preventDefault();
    setError('');
    if (!repoUrl.trim()) { setError('Please enter a GitHub repository URL'); return; }

    setLoading(true);
    setProgress({ phase: 'starting', message: 'Initializing...', progress: 0 });

    try {
      const data = await generateDocs(
        { repoUrl: repoUrl.trim() },
        (p) => setProgress(p)
      );
      onDocsGenerated(data);
      const owner = data.meta?.fullName?.split('/')[0] || 'unknown';
      const repo = data.meta?.fullName?.split('/')[1] || 'unknown';
      navigate(`/${owner}/${repo}`);
    } catch (err) {
      setError(err.message || 'Failed to generate documentation');
      setLoading(false);
      setProgress(null);
    }
  };

  if (loading) return <LoadingState progress={progress} />;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24, background: '#fff' }}>

      {/* Header */}
      <div className="fade-in-up" style={{ textAlign: 'center', marginBottom: 44, maxWidth: 520 }}>
        {/* Logo */}
        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 52, height: 52, borderRadius: 12, background: '#111827', marginBottom: 24 }}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
          </svg>
        </div>

        <h1 style={{ fontSize: 'clamp(32px, 5vw, 44px)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 14, color: '#111827' }}>
          RepoDocGen
        </h1>
        <p style={{ fontSize: 16, color: '#6b7280', lineHeight: 1.7 }}>
          Transform any GitHub repository into clean, readable documentation — powered by AI.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleGenerate} className="fade-in-up fade-in-up-delay-1" style={{
        width: '100%', maxWidth: 460, padding: 28,
        border: '1px solid #e5e7eb', borderRadius: 14, background: '#fff',
      }}>
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 8 }}>
            Repository URL
          </label>
          <input id="repo-url-input" type="text" className="input-field"
            placeholder="https://github.com/owner/repo"
            value={repoUrl} onChange={(e) => setRepoUrl(e.target.value)}
            style={{ fontFamily: 'var(--font-mono)', fontSize: 14 }}
          />
        </div>

        {error && (
          <div style={{ padding: '10px 14px', borderRadius: 8, marginBottom: 16, background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', fontSize: 14 }}>
            {error}
          </div>
        )}

        <button id="generate-btn" type="submit" className="btn-primary" style={{ width: '100%', height: 48 }}>
          Generate Documentation →
        </button>
      </form>

      <p className="fade-in-up fade-in-up-delay-2" style={{ marginTop: 36, fontSize: 12, color: '#d1d5db', textAlign: 'center' }}>
        Works with any public GitHub repository
      </p>
    </div>
  );
}
