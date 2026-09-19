import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { fetchReturns } from './api';
import FilterBar from './components/FilterBar';
import ReturnsList from './components/ReturnsList';
import ReturnDetail from './components/ReturnDetail';
import { normalizeReturn, type ReturnItem } from './types';
import './App.css';

function ReturnsPage() {
  const [returns, setReturns] = useState<ReturnItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [highRiskOnly, setHighRiskOnly] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: show a loading state while re-fetching after a filter change
    setLoading(true);
    setError(null);

    fetchReturns({
      risk: highRiskOnly ? 'high' : undefined,
      search: searchTerm || undefined,
    })
      .then((data) => setReturns(data.returns.map(normalizeReturn)))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [highRiskOnly, searchTerm]);

  return (
    <>
      <h1>ReturnGuard — Returns</h1>

      <FilterBar
        highRiskOnly={highRiskOnly}
        onHighRiskChange={setHighRiskOnly}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      {loading && <p>Loading...</p>}
      {error && <p className="error-text">Error: {error}</p>}
      {!loading && !error && <ReturnsList returns={returns} />}
    </>
  );
}

function App() {
  return (
    <div className="app-shell">
      <Routes>
        <Route path="/" element={<ReturnsPage />} />
        <Route path="/returns/:id" element={<ReturnDetail />} />
      </Routes>
    </div>
  );
}

export default App;
