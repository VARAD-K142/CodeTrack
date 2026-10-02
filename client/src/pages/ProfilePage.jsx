import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../components/Toast.jsx';
import AppLayout from '../components/AppLayout.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import { problemService } from '../services/problemService.js';

const ProfilePage = () => {
  const { user, updateUser } = useAuth(); const toast = useToast();
  const [profile, setProfile] = useState(user); const [name, setName] = useState(user?.name || ''); const [loading, setLoading] = useState(true); const [saving, setSaving] = useState(false); const [error, setError] = useState('');
  useEffect(() => { let active = true; problemService.getProfile().then(({ data }) => { if (active) { setProfile(data.user); setName(data.user.name); } }).catch((err) => { if (active) setError(err.response?.data?.message || 'Unable to load profile.'); }).finally(() => { if (active) setLoading(false); }); return () => { active = false; }; }, []);
  const submit = async (event) => { event.preventDefault(); if (!name.trim()) { setError('Name cannot be empty.'); return; } if (name.trim().length > 100) { setError('Name cannot exceed 100 characters.'); return; } setError(''); setSaving(true); try { const { data } = await problemService.updateProfile({ name: name.trim() }); setProfile(data.user); updateUser(data.user); toast.success('Your profile has been updated.'); } catch (err) { setError(err.response?.data?.message || 'Could not update your profile.'); } finally { setSaving(false); } };
  return <AppLayout title="Profile"><div className="page-header"><div><h2>Profile</h2><p>View your account details and update your name.</p></div></div>{loading ? <LoadingSpinner /> : <section className="card profile-card">{error && <div className="auth-error">{error}</div>}<form className="auth-form" onSubmit={submit}><div className="form-group"><label className="form-label">Full Name</label><input className="form-input" value={name} onChange={(event) => setName(event.target.value)} maxLength={100} required /></div><div className="form-group"><label className="form-label">Email Address</label><input className="form-input" value={profile?.email || ''} readOnly /></div><div className="form-group"><label className="form-label">Account Created</label><input className="form-input" value={profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) : '—'} readOnly /></div><button className="btn btn-primary" type="submit" disabled={saving}>{saving ? 'Saving…' : 'Save Changes'}</button></form></section>}</AppLayout>;
};
export default ProfilePage;
