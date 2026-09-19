import { Link } from 'react-router-dom';
import type { ReturnItem } from '../types';

interface ReturnsListProps {
  returns: ReturnItem[];
}

function riskBadge(score: number | null) {
  if (score === null) {
    return <span className="badge badge-pending">Pending</span>;
  }
  if (score > 0.7) {
    return <span className="badge badge-high">High</span>;
  }
  if (score > 0.4) {
    return <span className="badge badge-medium">Medium</span>;
  }
  return <span className="badge badge-low">Low</span>;
}

function ReturnsList({ returns }: ReturnsListProps) {
  if (returns.length === 0) {
    return <p className="empty-state">No returns match the current filters.</p>;
  }

  return (
    <table className="returns-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Reason</th>
          <th>Risk</th>
          <th>Score</th>
          <th>Archetype</th>
        </tr>
      </thead>
      <tbody>
        {returns.map((r) => (
          <tr key={r.id}>
            <td>
              <Link to={`/returns/${r.id}`} className="row-link">
                {r.id}
              </Link>
            </td>
            <td>{r.reason}</td>
            <td>{riskBadge(r.score)}</td>
            <td>{r.score !== null ? r.score.toFixed(2) : '—'}</td>
            <td>{r.archetype ?? '—'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ReturnsList;
