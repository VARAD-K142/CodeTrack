import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Plus } from 'lucide-react';
import AppLayout from '../components/AppLayout.jsx';
import ProblemForm from '../components/ProblemForm.jsx';
import ProblemTable from '../components/ProblemTable.jsx';
import SearchBar from '../components/SearchBar.jsx';
import FilterPanel from '../components/FilterPanel.jsx';
import ConfirmDialog from '../components/ConfirmDialog.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import { useToast } from '../components/Toast.jsx';
import { problemService } from '../services/problemService.js';

const DEFAULT_FILTERS = { difficulty: 'All', language: 'All', status: 'All', platform: 'All', sort: 'newest' };
const ProblemsPage = () => {
  const toast = useToast();
  const [problems, setProblems] = useState([]); const [loading, setLoading] = useState(true); const [saving, setSaving] = useState(false); const [error, setError] = useState('');
  const [search, setSearch] = useState(''); const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [formOpen, setFormOpen] = useState(false); const [editing, setEditing] = useState(null); const [deleting, setDeleting] = useState(null);
  const loadProblems = useCallback(async () => { setError(''); try { const { data } = await problemService.getAll(); setProblems(data.problems || []); } catch (err) { setError(err.response?.data?.message || 'Unable to load your problems.'); } finally { setLoading(false); } }, []);
  useEffect(() => { loadProblems(); }, [loadProblems]);
  const visible = useMemo(() => { let list = problems.filter((p) => `${p.title} ${p.language} ${p.platform}`.toLowerCase().includes(search.toLowerCase())); for (const key of ['difficulty', 'language', 'status', 'platform']) if (filters[key] !== 'All') list = list.filter((p) => p[key] === filters[key]); return [...list].sort((a, b) => filters.sort === 'alpha' ? a.title.localeCompare(b.title) : filters.sort === 'oldest' ? new Date(a.createdAt) - new Date(b.createdAt) : new Date(b.createdAt) - new Date(a.createdAt)); }, [problems, search, filters]);
  const submit = async (data) => { setSaving(true); try { if (editing) await problemService.update(editing._id, data); else await problemService.create(data); await loadProblems(); setFormOpen(false); setEditing(null); toast.success(editing ? 'Problem updated.' : 'Problem added.'); } catch (err) { toast.error(err.response?.data?.message || 'Could not save this problem.'); } finally { setSaving(false); } };
  const remove = async () => { if (!deleting) return; setSaving(true); try { await problemService.delete(deleting._id); setProblems((items) => items.filter((item) => item._id !== deleting._id)); toast.success('Problem deleted.'); setDeleting(null); } catch (err) { toast.error(err.response?.data?.message || 'Could not delete this problem.'); } finally { setSaving(false); } };
  const edit = (problem) => { setEditing(problem); setFormOpen(true); };
  const clear = () => { setFilters(DEFAULT_FILTERS); setSearch(''); };
  return <AppLayout title="My Problems"><div className="page-header"><div><h2>My Problems</h2><p>Keep your coding practice organized in one place.</p></div><button className="btn btn-primary" onClick={() => { setEditing(null); setFormOpen(true); }}><Plus size={17} /> Add Problem</button></div><section className="card"><div className="toolbar"><div className="toolbar-left"><SearchBar value={search} onChange={setSearch} placeholder="Search title, language or platform…" /></div><div className="toolbar-right"><span className="text-muted">{visible.length} of {problems.length} problems</span>{search && <button className="btn btn-ghost btn-sm" onClick={clear}>Clear</button>}</div></div><FilterPanel filters={filters} onChange={(key, value) => setFilters((prev) => ({ ...prev, [key]: value }))} onClear={clear} />{error && <div className="auth-error">{error} <button className="btn btn-ghost btn-sm" onClick={() => { setLoading(true); loadProblems(); }}>Retry</button></div>}{loading ? <LoadingSpinner /> : <ProblemTable problems={visible} onEdit={edit} onDelete={setDeleting} />}</section><ProblemForm isOpen={formOpen} onClose={() => { setFormOpen(false); setEditing(null); }} onSubmit={submit} editData={editing} loading={saving} /><ConfirmDialog isOpen={Boolean(deleting)} title="Delete problem?" message={`“${deleting?.title}” will be permanently removed from your tracker.`} onCancel={() => setDeleting(null)} onConfirm={remove} loading={saving} /></AppLayout>;
};
export default ProblemsPage;
