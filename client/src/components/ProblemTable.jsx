import React from 'react';
import { Edit2, Trash2, ExternalLink } from 'lucide-react';

const difficultyClass = { Easy: 'badge-easy', Medium: 'badge-medium', Hard: 'badge-hard' };
const statusClass = {
  'Not Started': 'badge-not-started',
  'In Progress': 'badge-in-progress',
  'Completed': 'badge-completed'
};

const formatDate = (dateStr) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
};

const ProblemTable = ({ problems, onEdit, onDelete }) => {
  if (problems.length === 0) {
    return (
      <div className="empty-state" style={{ minHeight: 280 }}>
        <div className="empty-state-icon">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3>No problems found</h3>
        <p>No problems match your current search and filter criteria. Try adjusting your filters or add a new problem.</p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Problem Title</th>
            <th>Language</th>
            <th>Difficulty</th>
            <th>Platform</th>
            <th>Status</th>
            <th>Date Added</th>
            {(onEdit || onDelete) && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {problems.map((problem, idx) => (
            <tr key={problem._id}>
              <td style={{ color: 'var(--text-muted)', fontWeight: 500 }}>{idx + 1}</td>
              <td>
                <div className="table-title" title={problem.title}>{problem.title}</div>
                {problem.problemUrl && (
                  <a
                    href={problem.problemUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="table-url-link"
                  >
                    <ExternalLink size={12} /> Open
                  </a>
                )}
              </td>
              <td>
                <span className="badge badge-lang">{problem.language}</span>
              </td>
              <td>
                <span className={`badge ${difficultyClass[problem.difficulty] || ''}`}>
                  <span className="badge-dot" />
                  {problem.difficulty}
                </span>
              </td>
              <td style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)' }}>
                {problem.platform}
              </td>
              <td>
                <span className={`badge ${statusClass[problem.status] || ''}`}>
                  <span className="badge-dot" />
                  {problem.status}
                </span>
              </td>
              <td style={{ color: 'var(--text-muted)', fontSize: 'var(--font-size-xs)' }}>
                {formatDate(problem.createdAt)}
              </td>
              {(onEdit || onDelete) && <td>
                <div className="table-actions">
                  {onEdit && <button
                    className="btn btn-ghost btn-icon"
                    onClick={() => onEdit(problem)}
                    title="Edit problem"
                    style={{ color: 'var(--color-primary)' }}
                  >
                    <Edit2 size={15} />
                  </button>}
                  {onDelete && <button
                    className="btn btn-ghost btn-icon"
                    onClick={() => onDelete(problem)}
                    title="Delete problem"
                    style={{ color: 'var(--color-danger)' }}
                  >
                    <Trash2 size={15} />
                  </button>}
                </div>
              </td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProblemTable;
