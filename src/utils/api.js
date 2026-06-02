/**
 * Frontend API client — uses native fetch
 */

const API_BASE = import.meta.env.VITE_BACKEND_API;

/**
 * Generate documentation for a repo using SSE (Server-Sent Events)
 * @param {Object} params - { repoUrl }
 * @param {Function} onProgress - Called with progress updates
 * @returns {Promise<Object>} The final documentation data
 */
export async function generateDocs({ repoUrl }, onProgress) {
  const response = await fetch(`${API_BASE}/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ repoUrl }),
  });

  // If it's a regular JSON response (cached result)
  const contentType = response.headers.get('content-type');
  if (contentType?.includes('application/json')) {
    const json = await response.json();
    if (!json.success && json.error) {
      throw new Error(json.error);
    }
    return json.data;
  }

  // It's an SSE stream
  if (!response.ok) {
    throw new Error(`Server error: ${response.status}`);
  }

  return new Promise((resolve, reject) => {
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';

    function processBuffer() {
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          try {
            const data = JSON.parse(line.slice(6));

            if (data.phase === 'error') {
              reject(new Error(data.message));
              return;
            }

            if (onProgress) {
              onProgress(data);
            }

            if (data.phase === 'complete' && data.data) {
              resolve(data.data);
              return;
            }
          } catch (e) {
            // Skip malformed JSON
          }
        }
      }
    }

    function read() {
      reader.read().then(({ done, value }) => {
        if (done) {
          if (buffer) processBuffer();
          reject(new Error('Stream ended unexpectedly'));
          return;
        }
        buffer += decoder.decode(value, { stream: true });
        processBuffer();
        read();
      }).catch(reject);
    }

    read();
  });
}

/**
 * Fetch cached documentation for a given owner/repo
 */
export async function fetchCachedDocs(owner, repo) {
  const response = await fetch(`${API_BASE}/generate/docs/${owner}/${repo}`);
  const json = await response.json();

  if (!response.ok || !json.success) {
    return null;
  }

  return json.data;
}

/**
 * Parse a GitHub URL and extract owner/repo
 */
export function parseGitHubUrl(url) {
  const patterns = [
    /github\.com\/([^\/]+)\/([^\/\?#]+)/,
    /^([^\/]+)\/([^\/\?#]+)$/,
  ];
  for (const pat of patterns) {
    const m = url.match(pat);
    if (m) return { owner: m[1], repo: m[2].replace(/\.git$/, '') };
  }
  return null;
}

/**
 * Check if documentation already exists for a repo
 */
export async function checkDocsExist(owner, repo) {
  try {
    const data = await fetchCachedDocs(owner, repo);
    return !!data;
  } catch {
    return false;
  }
}
