import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Code2, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

const RegisterPage = () => {
  const { register, logout } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);
  const change = (key, value) => { setForm((prev) => ({ ...prev, [key]: value })); setErrors((prev) => ({ ...prev, [key]: '' })); setApiError(''); };
  const submit = async (event) => {
    event.preventDefault();
    const next = {};
    if (!form.name.trim()) next.name = 'Full name is required';
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) next.email = 'Enter a valid email address';
    if (form.password.length < 6) next.password = 'Password must be at least 6 characters';
    if (form.confirmPassword !== form.password) next.confirmPassword = 'Passwords do not match';
    if (Object.keys(next).length) { setErrors(next); return; }
    setLoading(true);
    try { await register(form.name.trim(), form.email.trim(), form.password); logout(); navigate('/login', { replace: true, state: { registered: true } }); }
    catch (error) { setApiError(error.response?.data?.message || 'Could not create your account. Please try again.'); }
    finally { setLoading(false); }
  };
  const field = (key, label, type = 'text', autoComplete = key) => <div className="form-group" key={key}><label className="form-label">{label}</label><input className={`form-input ${errors[key] ? 'error' : ''}`} type={type} value={form[key]} onChange={(event) => change(key, event.target.value)} autoComplete={autoComplete} />{errors[key] && <span className="form-error">{errors[key]}</span>}</div>;
  return <div className="auth-page"><div className="auth-card"><div className="auth-logo"><div className="auth-logo-icon"><Code2 size={22} color="white" /></div><span className="auth-logo-text">Code<span>Track</span></span></div><h2 className="auth-title">Create your account</h2><p className="auth-subtitle">Start keeping track of your coding practice</p>{apiError && <div className="auth-error"><AlertCircle size={16} />{apiError}</div>}<form className="auth-form" onSubmit={submit}>{field('name', 'Full Name', 'text', 'name')}{field('email', 'Email Address', 'email', 'email')}{field('password', 'Password', 'password', 'new-password')}{field('confirmPassword', 'Confirm Password', 'password', 'new-password')}<button className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>{loading ? 'Creating account…' : 'Create Account'}</button></form><p className="auth-link">Already have an account? <Link to="/login">Sign in</Link></p></div></div>;
};

export default RegisterPage;
