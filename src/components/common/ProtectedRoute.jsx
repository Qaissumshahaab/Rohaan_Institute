import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

/**
 * ProtectedRoute — wraps admin pages.
 * Redirects to /admin/login if not authenticated.
 * Optionally restricts to super_admin role only.
 */
export default function ProtectedRoute({ children, superOnly = false }) {
  const { isAuthenticated, admin, loading } = useAuth();
  const location = useLocation();

  // Show a minimal spinner while auth state is being resolved
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500 text-sm">Verifying session...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to login, preserving the intended destination
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  if (superOnly && admin?.role !== 'super_admin') {
    // Not authorized — redirect to dashboard
    return <Navigate to="/admin/dashboard" replace />;
  }

  return children;
}
