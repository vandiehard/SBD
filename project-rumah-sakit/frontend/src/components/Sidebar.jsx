import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ background: 'linear-gradient(to right, #38bdf8, #818cf8)', WebkitBackgroundClip: 'text', color: 'transparent', fontSize: '1.8rem', fontWeight: 'bold' }}>
          MyKlinik
        </h2>
        <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Management System</p>
      </div>
      
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <span style={{ fontSize: '1.2rem' }}>📊</span> Dashboard
        </NavLink>
        <NavLink to="/pasien" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <span style={{ fontSize: '1.2rem' }}>🧑‍⚕️</span> Pasien
        </NavLink>
        <NavLink to="/karyawan" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <span style={{ fontSize: '1.2rem' }}>👨‍⚕️</span> Karyawan
        </NavLink>
        <NavLink to="/operasi" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <span style={{ fontSize: '1.2rem' }}>🏨</span> Operasi
        </NavLink>
      </nav>

      <div className="glass-card" style={{ marginTop: 'auto', padding: '1rem', background: 'rgba(56, 189, 248, 0.1)', borderColor: 'rgba(56, 189, 248, 0.2)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #38bdf8, #818cf8)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
            A
          </div>
          <div>
            <div style={{ fontWeight: '600', fontSize: '0.9rem', color: '#f8fafc' }}>Admin</div>
            <div style={{ fontSize: '0.75rem', color: '#38bdf8' }}>Online</div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
