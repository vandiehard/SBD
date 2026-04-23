import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Pasien from './pages/Pasien';
import Karyawan from './pages/Karyawan';
import Operasi from './pages/Operasi';
import PublicLanding from './pages/PublicLanding';
import Login from './pages/Login';
import DashboardDokter from './pages/DashboardDokter';

// Protected Route Component
const ProtectedRoute = ({ user, allowedRoles, children }) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }
  return children ? children : <Outlet />;
};

// Layout with Sidebar for logged in users
const MainLayout = ({ user, onLogout }) => {
  return (
    <div className="app-container">
      <div className="bg-blobs">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>
      <Sidebar user={user} onLogout={onLogout} />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<PublicLanding />} />
      <Route path="/login" element={<Login onLogin={handleLogin} />} />

      {/* Protected Layout Routes */}
      <Route element={<MainLayout user={user} onLogout={handleLogout} />}>
        {/* Admin Routes */}
        <Route element={<ProtectedRoute user={user} allowedRoles={['admin']} />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/pasien" element={<Pasien />} />
          <Route path="/admin/karyawan" element={<Karyawan />} />
          <Route path="/admin/operasi" element={<Operasi />} />
        </Route>

        {/* Dokter Routes */}
        <Route element={<ProtectedRoute user={user} allowedRoles={['dokter']} />}>
          <Route path="/dokter/dashboard" element={<DashboardDokter user={user} />} />
        </Route>
      </Route>

      {/* Catch All Redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
