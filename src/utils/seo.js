/**
 * Lightweight per-route SEO helper for RepoDocGen.
 * Updates document title + meta description on navigation so every
 * page (home + generated docs) is crawlable with unique metadata.
 */
export function setSEO(title, description) {
  if (title) {
    document.title = title;
  }
  if (description) {
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', description);
  }
  // Update OG tags to match
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle && title) ogTitle.setAttribute('content', title);
  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc && description) ogDesc.setAttribute('content', description);
}