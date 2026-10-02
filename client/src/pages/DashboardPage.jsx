import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Activity, CheckCircle, Clock3, ListChecks, Plus, Target } from 'lucide-react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import AppLayout from '../components/AppLayout.jsx';
import StatCard from '../components/StatCard.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { problemService } from '../services/problemService.js';
import ProblemTable from '../components/ProblemTable.jsx';

const COLORS = ['#94a3b8', '#f59e0b', '#10b981'];
const DashboardPage = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    let active = true;
    problemService.getDashboardStats().then(({ data }) => { if (active) setStats(data.stats); })
      .catch((err) => { if (active) setError(err.response?.data?.message || 'Unable to load your dashboard.'); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);
  if (loading) return <AppLayout title="Dashboard"><LoadingSpinner /></AppLayout>;
  const statusData = stats ? [{ name: 'Not Started', value: stats.notStarted }, { name: 'In Progress', value: stats.inProgress }, { name: 'Completed', value: stats.completed }] : [];
  const difficultyData = stats ? [{ name: 'Easy', count: stats.easy }, { name: 'Medium', count: stats.medium }, { name: 'Hard', count: stats.hard }] : [];
  return <AppLayout title="Dashboard">
    <div className="page-header"><div><h2>Welcome back, {user?.name?.split(' ')[0] || 'there'} 👋</h2><p>Here’s a snapshot of your coding practice.</p></div><Link className="btn btn-primary" to="/problems"><Plus size={17} /> Add Problem</Link></div>
    {error && <div className="auth-error">{error}</div>}
    {stats && <>
      <div className="stats-grid">
        <StatCard icon={<ListChecks size={20} />} value={stats.total} label="Total Problems" color="indigo" />
        <StatCard icon={<CheckCircle size={20} />} value={stats.completed} label="Completed" color="green" />
        <StatCard icon={<Activity size={20} />} value={stats.inProgress} label="In Progress" color="blue" />
        <StatCard icon={<Clock3 size={20} />} value={stats.notStarted} label="Not Started" color="orange" />
        <StatCard icon={<Target size={20} />} value={`${stats.completionPercentage}%`} label="Completion Rate" color="purple" />
        <StatCard value={stats.easy} label="Easy" color="green" />
        <StatCard value={stats.medium} label="Medium" color="orange" />
        <StatCard value={stats.hard} label="Hard" color="red" />
      </div>
      <div className="charts-grid">
        <section className="card"><div className="card-header"><h3>Difficulty distribution</h3></div><div className="chart-container">{stats.total ? <ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={difficultyData} dataKey="count" nameKey="name" outerRadius="75%" label>{difficultyData.map((entry, index) => <Cell key={entry.name} fill={['#10b981', '#f59e0b', '#ef4444'][index]} />)}</Pie><Tooltip /></PieChart></ResponsiveContainer> : <p className="empty-chart">Add problems to see your difficulty breakdown.</p>}</div><div className="chart-legend">{difficultyData.map((item) => <span key={item.name}>{item.name}: {item.count}</span>)}</div></section>
        <section className="card"><div className="card-header"><h3>Completion status</h3></div><div className="chart-container">{stats.total ? <ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={statusData} dataKey="value" nameKey="name" innerRadius="48%" outerRadius="75%" label>{statusData.map((item, index) => <Cell key={item.name} fill={COLORS[index]} />)}</Pie><Tooltip /></PieChart></ResponsiveContainer> : <p className="empty-chart">Your status breakdown will appear here.</p>}</div><div className="chart-legend">{statusData.map((item) => <span key={item.name}>{item.name}: {item.value}</span>)}</div></section>
        <section className="card"><div className="card-header"><h3>Language statistics</h3></div>{stats.languageStats.length ? <div className="language-stats">{stats.languageStats.map((item) => <div className="lang-stat-row" key={item.name}><span>{item.name}</span><div className="lang-stat-bar"><span style={{ width: `${Math.max(5, (item.count / stats.total) * 100)}%` }} /></div><b className="lang-stat-count">{item.count}</b></div>)}</div> : <p className="empty-chart">No languages recorded yet.</p>}</section>
      </div>
      <section className="card recent-problems"><div className="card-header"><h3>Recent problems</h3><Link className="btn btn-ghost btn-sm" to="/problems">View all problems</Link></div>{stats.recentProblems.length ? <ProblemTable problems={stats.recentProblems} /> : <div className="empty-state"><h3>No problems yet</h3><p>Add your first coding problem to start tracking progress.</p><Link className="btn btn-primary" to="/problems"><Plus size={16} /> Add a problem</Link></div>}</section>
    </>}
  </AppLayout>;
};
export default DashboardPage;
