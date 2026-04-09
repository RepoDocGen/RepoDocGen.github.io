import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import HomePage from './pages/HomePage';
import DocsPage from './pages/DocsPage';

export default function App() {
  const [docsData, setDocsData] = useState(null);

  return (
    <Routes>
      <Route path="/" element={<HomePage onDocsGenerated={setDocsData} />} />
      <Route path="/:owner/:repo" element={<DocsPage docsData={docsData} setDocsData={setDocsData} />} />
    </Routes>
  );
}
