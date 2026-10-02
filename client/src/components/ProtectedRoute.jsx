import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import LoadingSpinner from './LoadingSpinner.jsx';

const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  if (loading) return <LoadingSpinner fullPage />;
  if (!user) return <Navigate to="/login" replace />;

  return <Outlet />;
};

export default ProtectedRoute;
