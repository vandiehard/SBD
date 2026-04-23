import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Sidebar = ({ user, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <aside className="sidebar">
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ background: 'linear-gradient(to right, #38bdf8, #818cf8)', WebkitBackgroundClip: 'text', color: 'transparent', fontSize: '1.8rem', fontWeight: 'bold' }}>
          MyKlinik
        </h2>
        <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Management System</p>
      </div>
      
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {user?.role === 'admin' && (
          <>
            <NavLink to="/admin/dashboard" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <span style={{ fontSize: '1.2rem' }}>📊</span> Dashboard
            </NavLink>
            <NavLink to="/admin/pasien" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <span style={{ fontSize: '1.2rem' }}>🧑‍⚕️</span> Pasien
            </NavLink>
            <NavLink to="/admin/karyawan" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <span style={{ fontSize: '1.2rem' }}>👨‍⚕️</span> Karyawan
            </NavLink>
            <NavLink to="/admin/operasi" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <span style={{ fontSize: '1.2rem' }}>🏨</span> Operasi
            </NavLink>
          </>
        )}

        {user?.role === 'dokter' && (
          <>
            <NavLink to="/dokter/dashboard" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <span style={{ fontSize: '1.2rem' }}>📊</span> Dashboard
            </NavLink>
          </>
        )}
      </nav>

      <div className="glass-card" style={{ marginTop: 'auto', padding: '1rem', background: 'rgba(56, 189, 248, 0.1)', borderColor: 'rgba(56, 189, 248, 0.2)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #38bdf8, #818cf8)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
            {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
          </div>
          <div style={{ overflow: 'hidden' }}>
            <div style={{ fontWeight: '600', fontSize: '0.9rem', color: '#f8fafc', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
              {user?.name || 'User'}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#38bdf8', textTransform: 'capitalize' }}>
              {user?.role || 'Guest'}
            </div>
          </div>
        </div>
        <button onClick={handleLogout} className="btn btn-danger" style={{ width: '100%', padding: '0.5rem', fontSize: '0.8rem' }}>
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
