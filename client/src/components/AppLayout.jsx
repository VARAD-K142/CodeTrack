import React, { useState } from 'react';
import Sidebar from './Sidebar.jsx';
import Navbar from './Navbar.jsx';

const AppLayout = ({ title, children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return <div className="app-layout"><Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} /><main className="main-content"><Navbar title={title} onMenuToggle={() => setSidebarOpen((open) => !open)} /><div className="page-content">{children}</div></main></div>;
};

export default AppLayout;
