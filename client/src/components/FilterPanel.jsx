import React from 'react';
import { X } from 'lucide-react';

const LANGUAGES = ['C', 'C++', 'Java', 'Python', 'JavaScript', 'C#', 'Go', 'Other'];
const PLATFORMS = ['LeetCode', 'HackerRank', 'CodeChef', 'GeeksforGeeks', 'Codeforces', 'InterviewBit', 'Other'];

const FilterPanel = ({ filters, onChange, onClear }) => {
  const hasActiveFilters =
    filters.difficulty !== 'All' ||
    filters.language !== 'All' ||
    filters.status !== 'All' ||
    filters.platform !== 'All' ||
    filters.sort !== 'newest';

  return (
    <div className="filters-bar">
      <select
        className={`filter-select ${filters.difficulty !== 'All' ? 'filter-active' : ''}`}
        value={filters.difficulty}
        onChange={(e) => onChange('difficulty', e.target.value)}
      >
        <option value="All">All Difficulties</option>
        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
        <option value="Hard">Hard</option>
      </select>

      <select
        className={`filter-select ${filters.status !== 'All' ? 'filter-active' : ''}`}
        value={filters.status}
        onChange={(e) => onChange('status', e.target.value)}
      >
        <option value="All">All Statuses</option>
        <option value="Not Started">Not Started</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>

      <select
        className={`filter-select ${filters.language !== 'All' ? 'filter-active' : ''}`}
        value={filters.language}
        onChange={(e) => onChange('language', e.target.value)}
      >
        <option value="All">All Languages</option>
        {LANGUAGES.map((lang) => <option key={lang} value={lang}>{lang}</option>)}
      </select>

      <select
        className={`filter-select ${filters.platform !== 'All' ? 'filter-active' : ''}`}
        value={filters.platform}
        onChange={(e) => onChange('platform', e.target.value)}
      >
        <option value="All">All Platforms</option>
        {PLATFORMS.map((p) => <option key={p} value={p}>{p}</option>)}
      </select>

      <select
        className="filter-select"
        value={filters.sort}
        onChange={(e) => onChange('sort', e.target.value)}
      >
        <option value="newest">Recently Added</option>
        <option value="oldest">Oldest First</option>
        <option value="alpha">A – Z</option>
      </select>

      {hasActiveFilters && (
        <button className="btn btn-ghost btn-sm" onClick={onClear}>
          <X size={14} /> Clear Filters
        </button>
      )}
    </div>
  );
};

export default FilterPanel;
