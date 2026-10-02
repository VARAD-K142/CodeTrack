import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import LandingPage from './pages/LandingPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import ProblemsPage from './pages/ProblemsPage.jsx';
import AnalyticsPage from './pages/AnalyticsPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import LoadingSpinner from './components/LoadingSpinner.jsx';

function App() {
  const { user, loading } = useAuth();
  if (loading) return <LoadingSpinner fullPage />;
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <LoginPage />} />
      <Route path="/register" element={user ? <Navigate to="/dashboard" replace /> : <RegisterPage />} />

      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/problems" element={<ProblemsPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
