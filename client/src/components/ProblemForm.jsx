import React, { useState, useEffect } from 'react';
import { X, ExternalLink } from 'lucide-react';

const LANGUAGES = ['C', 'C++', 'Java', 'Python', 'JavaScript', 'C#', 'Go', 'Other'];
const PLATFORMS = ['LeetCode', 'HackerRank', 'CodeChef', 'GeeksforGeeks', 'Codeforces', 'InterviewBit', 'Other'];
const DIFFICULTIES = ['Easy', 'Medium', 'Hard'];
const STATUSES = ['Not Started', 'In Progress', 'Completed'];

const INITIAL_FORM = {
  title: '',
  language: '',
  difficulty: '',
  platform: '',
  status: 'Not Started',
  problemUrl: '',
  notes: ''
};

const ProblemForm = ({ isOpen, onClose, onSubmit, editData = null, loading = false }) => {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editData) {
      setForm({
        title: editData.title || '',
        language: editData.language || '',
        difficulty: editData.difficulty || '',
        platform: editData.platform || '',
        status: editData.status || 'Not Started',
        problemUrl: editData.problemUrl || '',
        notes: editData.notes || ''
      });
    } else {
      setForm(INITIAL_FORM);
    }
    setErrors({});
  }, [editData, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = 'Problem title is required';
    if (!form.language) newErrors.language = 'Programming language is required';
    if (!form.difficulty) newErrors.difficulty = 'Difficulty level is required';
    if (!form.platform) newErrors.platform = 'Platform is required';
    if (!form.status) newErrors.status = 'Status is required';
    if (form.problemUrl && form.problemUrl.trim()) {
      try { new URL(form.problemUrl); } catch {
        newErrors.problemUrl = 'Enter a valid URL (e.g. https://leetcode.com/problems/...)';
      }
    }
    return newErrors;
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onSubmit(form);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{editData ? 'Edit Problem' : 'Add New Problem'}</h2>
          <button className="modal-close" onClick={onClose}><X size={20} /></button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {/* Title */}
            <div className="form-group">
              <label className="form-label">Problem Title <span className="required">*</span></label>
              <input
                className={`form-input ${errors.title ? 'error' : ''}`}
                type="text"
                placeholder="e.g. Two Sum"
                value={form.title}
                onChange={(e) => handleChange('title', e.target.value)}
                maxLength={200}
              />
              {errors.title && <span className="form-error">{errors.title}</span>}
            </div>

            {/* Language + Difficulty */}
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Language <span className="required">*</span></label>
                <select
                  className={`form-select ${errors.language ? 'error' : ''}`}
                  value={form.language}
                  onChange={(e) => handleChange('language', e.target.value)}
                >
                  <option value="">Select Language</option>
                  {LANGUAGES.map((lang) => <option key={lang} value={lang}>{lang}</option>)}
                </select>
                {errors.language && <span className="form-error">{errors.language}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">Difficulty <span className="required">*</span></label>
                <select
                  className={`form-select ${errors.difficulty ? 'error' : ''}`}
                  value={form.difficulty}
                  onChange={(e) => handleChange('difficulty', e.target.value)}
                >
                  <option value="">Select Difficulty</option>
                  {DIFFICULTIES.map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
                {errors.difficulty && <span className="form-error">{errors.difficulty}</span>}
              </div>
            </div>

            {/* Platform + Status */}
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Platform <span className="required">*</span></label>
                <select
                  className={`form-select ${errors.platform ? 'error' : ''}`}
                  value={form.platform}
                  onChange={(e) => handleChange('platform', e.target.value)}
                >
                  <option value="">Select Platform</option>
                  {PLATFORMS.map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
                {errors.platform && <span className="form-error">{errors.platform}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">Status <span className="required">*</span></label>
                <select
                  className={`form-select ${errors.status ? 'error' : ''}`}
                  value={form.status}
                  onChange={(e) => handleChange('status', e.target.value)}
                >
                  {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                {errors.status && <span className="form-error">{errors.status}</span>}
              </div>
            </div>

            {/* Problem URL */}
            <div className="form-group">
              <label className="form-label">Problem URL <span style={{color:'var(--text-muted)',fontWeight:400}}>(optional)</span></label>
              <div style={{position:'relative'}}>
                <input
                  className={`form-input ${errors.problemUrl ? 'error' : ''}`}
                  type="text"
                  placeholder="https://leetcode.com/problems/..."
                  value={form.problemUrl}
                  onChange={(e) => handleChange('problemUrl', e.target.value)}
                  style={{paddingRight: form.problemUrl ? '40px' : '14px'}}
                />
                {form.problemUrl && !errors.problemUrl && (
                  <a
                    href={form.problemUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{position:'absolute',right:12,top:'50%',transform:'translateY(-50%)',color:'var(--color-info)'}}
                    title="Open URL"
                  >
                    <ExternalLink size={16} />
                  </a>
                )}
              </div>
              {errors.problemUrl && <span className="form-error">{errors.problemUrl}</span>}
            </div>

            {/* Notes */}
            <div className="form-group">
              <label className="form-label">Notes <span style={{color:'var(--text-muted)',fontWeight:400}}>(optional)</span></label>
              <textarea
                className="form-textarea"
                placeholder="Add your approach, key insights, or reminders..."
                value={form.notes}
                onChange={(e) => handleChange('notes', e.target.value)}
                maxLength={1000}
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-ghost" onClick={onClose} disabled={loading}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? (
                <><div className="spinner spinner-sm" />{editData ? 'Saving...' : 'Adding...'}</>
              ) : (
                editData ? 'Save Changes' : 'Add Problem'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProblemForm;
