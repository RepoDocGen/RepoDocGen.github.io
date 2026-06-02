import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateDocs, parseGitHubUrl, checkDocsExist } from '../utils/api';
import LoadingState from '../components/LoadingState';

export default function HomePage({ onDocsGenerated }) {
  const navigate = useNavigate();
  const [repoUrl, setRepoUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(null);
  const [error, setError] = useState('');
  const [existsInfo, setExistsInfo] = useState(null);
  const [checking, setChecking] = useState(false);

  const handleCheck = async (e) => {
    e.preventDefault();
    setError('');
    setExistsInfo(null);
    if (!repoUrl.trim()) { setError('Enter a GitHub repository URL'); return; }

    const parsed = parseGitHubUrl(repoUrl.trim());
    if (!parsed) { setError('Invalid GitHub URL format'); return; }

    setChecking(true);
    try {
      const exists = await checkDocsExist(parsed.owner, parsed.repo);
      if (exists) {
        setExistsInfo(parsed);
      } else {
        startGeneration();
      }
    } catch {
      startGeneration();
    }
    setChecking(false);
  };

  const startGeneration = async () => {
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

  const handleViewExisting = () => {
    if (existsInfo) {
      navigate(`/${existsInfo.owner}/${existsInfo.repo}`);
    }
  };

  const handleGenerateNew = () => {
    setExistsInfo(null);
    startGeneration();
  };

  if (loading) return <LoadingState progress={progress} />;

  return (
    <div className="scanline-overlay" style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', padding: 24,
    }}>

      {/* Header */}
      <div className="fade-in-up" style={{ textAlign: 'center', marginBottom: 40, maxWidth: 500 }}>
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)',
          marginBottom: 16, letterSpacing: '0.12em', textTransform: 'uppercase',
        }}>
          {'> system.ready'}
        </div>

        <h1 style={{
          fontSize: 'clamp(28px, 5vw, 40px)', fontWeight: 700,
          letterSpacing: '0.08em', lineHeight: 1.2, marginBottom: 10,
          textTransform: 'uppercase',
        }}>
          RepoDocGen<span className="cursor" />
        </h1>
        <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.7, letterSpacing: '0.02em' }}>
          Generate documentation for any GitHub repository.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleCheck} className="fade-in-up fade-in-up-delay-1" style={{
        width: '100%', maxWidth: 440, padding: 24,
        border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)',
        background: 'var(--bg-card)',
      }}>
        <label style={{
          display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--text-muted)',
          marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.1em',
        }}>
          Repository URL
        </label>
        <input
          id="repo-url-input"
          type="text"
          className="input-field"
          placeholder="github.com/owner/repo"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
        />

        {error && (
          <div style={{
            padding: '10px 14px', marginTop: 12,
            border: '1px solid var(--danger)', borderRadius: 'var(--radius-sm)',
            background: 'rgba(255,68,68,0.06)', color: 'var(--danger)',
            fontSize: 12, fontFamily: 'var(--font-mono)',
          }}>
            {'> '}{error}
          </div>
        )}

        {/* Exists Prompt */}
        {existsInfo && (
          <div className="exists-prompt" style={{ marginTop: 16 }}>
            <h3>Documentation Found</h3>
            <p>
              /{existsInfo.owner}/{existsInfo.repo}
            </p>
            <div className="btn-group">
              <button
                type="button"
                className="btn-primary"
                onClick={handleViewExisting}
                style={{ flex: 1 }}
              >
                View Docs
              </button>
              <button
                type="button"
                className="btn-danger"
                onClick={handleGenerateNew}
                style={{ flex: 1 }}
              >
                Generate New
              </button>
            </div>
          </div>
        )}

        {!existsInfo && (
          <button
            id="generate-btn"
            type="submit"
            className="btn-primary"
            style={{ width: '100%', marginTop: 16, height: 44 }}
            disabled={checking}
          >
            {checking ? 'Checking...' : 'Generate Documentation'}
          </button>
        )}
      </form>

      <p className="fade-in-up fade-in-up-delay-2" style={{
        marginTop: 32, fontSize: 11, color: 'var(--text-muted)',
        textAlign: 'center', letterSpacing: '0.06em', textTransform: 'uppercase',
      }}>
        Works with any public GitHub repository
      </p>
    </div>
  );
}
