import React from 'react';
import { Menu, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ title, onMenuToggle }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="navbar">
      <div className="navbar-left">
        <button className="navbar-hamburger btn" onClick={onMenuToggle}>
          <Menu size={22} />
        </button>
        <h1 className="navbar-title">{title}</h1>
      </div>
      <div className="navbar-right">
        <div className="navbar-user">
          <span className="navbar-user-name" style={{ display: 'none' }}>
            {user?.name}
          </span>
          <div className="navbar-avatar" title={user?.name}>
            {getInitials(user?.name)}
          </div>
        </div>
        <button
          className="btn btn-ghost btn-sm"
          onClick={handleLogout}
          title="Logout"
          style={{ display: 'flex', alignItems: 'center', gap: 6 }}
        >
          <LogOut size={16} />
          <span style={{ display: 'none' }}>Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
