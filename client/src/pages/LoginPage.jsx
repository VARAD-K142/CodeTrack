import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Code2, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

const LoginPage = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Redirect if already logged in
  React.useEffect(() => {
    if (user) navigate('/dashboard', { replace: true });
  }, [user, navigate]);

  const validate = () => {
    const errs = {};
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = 'Enter a valid email address';
    if (!form.password) errs.password = 'Password is required';
    return errs;
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
    if (apiError) setApiError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setLoading(true);
    try {
      const result = await login(form.email, form.password);
      if (result.success) {
        navigate('/dashboard', { replace: true });
      } else {
        setApiError(result.message || 'Login failed. Please try again.');
      }
    } catch (err) {
      setApiError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <div className="auth-logo-icon"><Code2 size={22} color="white" /></div>
          <span className="auth-logo-text">Code<span>Track</span></span>
        </div>
        <h2 className="auth-title">Welcome back</h2>
        <p className="auth-subtitle">Sign in to your CodeTrack account</p>
        {location.state?.registered && <div className="auth-success">Account created successfully. Please sign in.</div>}

        {apiError && (
          <div className="auth-error">
            <AlertCircle size={16} />
            {apiError}
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              className={`form-input ${errors.email ? 'error' : ''}`}
              type="text"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => handleChange('email', e.target.value)}
              autoComplete="email"
            />
            {errors.email && <span className="form-error">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="password-input-wrapper">
              <input
                className={`form-input ${errors.password ? 'error' : ''}`}
                type={showPassword ? 'text' : 'password'}
                placeholder="Your password"
                value={form.password}
                onChange={(e) => handleChange('password', e.target.value)}
                autoComplete="current-password"
              />
              <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && <span className="form-error">{errors.password}</span>}
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
            {loading ? <><div className="spinner spinner-sm" /> Signing in...</> : 'Sign In'}
          </button>
        </form>

        <p className="auth-link">
          Don't have an account? <Link to="/register">Create one</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
