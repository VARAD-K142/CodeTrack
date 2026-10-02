import React from 'react';

const StatCard = ({ icon, value, label, color = 'indigo' }) => {
  return (
    <div className={`stat-card ${color}`}>
      <div className={`stat-icon ${color}`}>{icon}</div>
      <div className="stat-info">
        <div className="stat-value">{value}</div>
        <div className="stat-label">{label}</div>
      </div>
    </div>
  );
};

export default StatCard;
