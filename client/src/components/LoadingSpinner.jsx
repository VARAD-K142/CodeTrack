import React from 'react';

const LoadingSpinner = ({ fullPage = false }) => {
  if (fullPage) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: 'var(--bg-main)'
      }}>
        <div className="spinner" />
      </div>
    );
  }
  return (
    <div className="spinner-overlay">
      <div className="spinner" />
    </div>
  );
};

export default LoadingSpinner;
