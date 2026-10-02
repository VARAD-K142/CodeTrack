import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Code2,
  LayoutDashboard,
  ListChecks,
  BarChart3,
  User,
  LogOut
} from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

const NAV_LINKS = [
  { to: '/dashboard', icon: <LayoutDashboard size={18} />, label: 'Dashboard' },
  { to: '/problems', icon: <ListChecks size={18} />, label: 'My Problems' },
  { to: '/analytics', icon: <BarChart3 size={18} />, label: 'Analytics' },
  { to: '/profile', icon: <User size={18} />, label: 'Profile' }
];

const Sidebar = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    if (onClose) onClose();
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? 'open' : ''}`} onClick={onClose} />
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        {/* Logo */}
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">
            <Code2 size={20} color="white" />
          </div>
          <div className="sidebar-logo-text">
            Code<span>Track</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          <div className="sidebar-section-label">Menu</div>
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
              onClick={onClose}
            >
              {link.icon}
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Bottom: User + Logout */}
        <div className="sidebar-bottom">
          <div className="sidebar-user">
            <div className="sidebar-avatar">{getInitials(user?.name)}</div>
            <div className="sidebar-user-info">
              <div className="sidebar-user-name">{user?.name || 'User'}</div>
              <div className="sidebar-user-role">Developer</div>
            </div>
          </div>
          <button
            className="sidebar-link"
            style={{ width: '100%', border: 'none', cursor: 'pointer', marginTop: 4 }}
            onClick={handleLogout}
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
