import React, { useEffect, useState } from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import AppLayout from '../components/AppLayout.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import StatCard from '../components/StatCard.jsx';
import { problemService } from '../services/problemService.js';

const AnalyticsPage = () => {
  const [stats, setStats] = useState(null); const [loading, setLoading] = useState(true); const [error, setError] = useState('');
  useEffect(() => { let active = true; problemService.getDashboardStats().then(({ data }) => { if (active) setStats(data.stats); }).catch((err) => { if (active) setError(err.response?.data?.message || 'Unable to load analytics.'); }).finally(() => { if (active) setLoading(false); }); return () => { active = false; }; }, []);
  if (loading) return <AppLayout title="Analytics"><LoadingSpinner /></AppLayout>;
  if (error) return <AppLayout title="Analytics"><div className="auth-error">{error}</div></AppLayout>;
  const charts = [{ title: 'Difficulty distribution', data: [{ name: 'Easy', value: stats.easy }, { name: 'Medium', value: stats.medium }, { name: 'Hard', value: stats.hard }], colors: ['#10b981', '#f59e0b', '#ef4444'] }, { title: 'Completion status', data: [{ name: 'Not Started', value: stats.notStarted }, { name: 'In Progress', value: stats.inProgress }, { name: 'Completed', value: stats.completed }], colors: ['#94a3b8', '#f59e0b', '#10b981'] }, { title: 'Programming languages', data: stats.languageStats.map((item) => ({ name: item.name, value: item.count })), colors: ['#6366f1', '#8b5cf6', '#06b6d4', '#f97316', '#10b981', '#ec4899', '#eab308'] }, { title: 'Platforms', data: stats.platformStats.map((item) => ({ name: item.name, value: item.count })), colors: ['#6366f1', '#8b5cf6', '#06b6d4', '#f97316', '#10b981', '#ec4899', '#eab308'] }];
  return <AppLayout title="Analytics"><div className="page-header"><div><h2>Analytics</h2><p>Insights from your coding practice records.</p></div></div><div className="stats-grid"><StatCard value={stats.total} label="Total Problems" color="indigo" /><StatCard value={stats.completed} label="Completed" color="green" /><StatCard value={`${stats.completionPercentage}%`} label="Completion Rate" color="purple" /></div>{stats.total === 0 ? <section className="card empty-state"><h3>No practice data yet</h3><p>Add coding problems to see your difficulty, status, language, and platform breakdowns.</p></section> : <div className="charts-grid">{charts.map((chart) => <section className="card" key={chart.title}><div className="card-header"><h3>{chart.title}</h3></div><div className="chart-container"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={chart.data} dataKey="value" nameKey="name" outerRadius="72%" label>{chart.data.map((item, index) => <Cell key={item.name} fill={chart.colors[index % chart.colors.length]} />)}</Pie><Tooltip /></PieChart></ResponsiveContainer></div><div className="chart-legend">{chart.data.map((item) => <span key={item.name}>{item.name}: {item.value}</span>)}</div></section>)}</div>}</AppLayout>;
};
export default AnalyticsPage;
