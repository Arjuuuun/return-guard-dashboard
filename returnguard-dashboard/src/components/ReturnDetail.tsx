import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchReturnDetail } from '../api';
import { buildTraceUrl } from '../traceUrl';
import { normalizeReturn, type ReturnItem } from '../types';

function riskLabel(score: number | null) {
  if (score === null) return 'Pending';
  if (score > 0.7) return 'High';
  if (score > 0.4) return 'Medium';
  return 'Low';
}

function ReturnDetail() {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<ReturnItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: show a loading state while fetching the detail view
    setLoading(true);
    setError(null);

    fetchReturnDetail(id)
      .then((data) => setItem(normalizeReturn(data)))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <div className="return-detail">
      <Link to="/" className="back-link">
        &larr; Back to returns
      </Link>

      {loading && <p>Loading...</p>}
      {error && <p className="error-text">Error: {error}</p>}

      {!loading && !error && item && (
        <>
          <h1>Return {item.id}</h1>

          <div className="detail-meta">
            <span className={`badge badge-${riskLabel(item.score).toLowerCase()}`}>
              {riskLabel(item.score)}
            </span>
            <span className="detail-score">
              Score: {item.score !== null ? item.score.toFixed(2) : '—'}
            </span>
            <span className="detail-archetype">
              Archetype: {item.archetype ?? '—'}
            </span>
          </div>

          <div className="detail-field">
            <h2>Reason</h2>
            <p>{item.reason}</p>
          </div>

          <div className="detail-field">
            <h2>Agent Reasoning</h2>
            <p>{item.reasoning ?? 'Not yet scored.'}</p>
          </div>

          <div className="detail-field">
            <h2>Scored At</h2>
            <p>{item.scored_at ?? '—'}</p>
          </div>

          {item.reasoning_trace_id && (
            <a
              href={buildTraceUrl(item.reasoning_trace_id)}
              target="_blank"
              rel="noopener noreferrer"
              className="trace-link"
            >
              View trace in App Insights &rarr;
            </a>
          )}
        </>
      )}
    </div>
  );
}

export default ReturnDetail;
