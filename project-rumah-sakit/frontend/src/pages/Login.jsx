import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [role, setRole] = useState('Admin');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!username.trim()) {
      alert("Nama tidak boleh kosong");
      return;
    }
    if (!password.trim()) {
      alert("Password tidak boleh kosong");
      return;
    }

    const userData = {
      name: username,
      role: role.toLowerCase(), // 'admin' or 'dokter'
      password: password
    };

    onLogin(userData);
    
    if (role === 'Admin') {
      navigate('/admin/dashboard');
    } else {
      navigate('/dokter/dashboard');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div className="glass-card" style={{ maxWidth: '450px', width: '100%', padding: '3rem 2.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h1 style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>Staff Login</h1>
          <p>Masuk ke sistem MyKlinik</p>
        </div>

        <div style={{ display: 'flex', background: 'rgba(15,23,42,0.6)', borderRadius: '12px', padding: '0.3rem', marginBottom: '2rem' }}>
          <button 
            type="button"
            style={{ flex: 1, padding: '0.8rem', background: role === 'Admin' ? 'var(--primary)' : 'transparent', color: role === 'Admin' ? 'white' : 'var(--text-muted)', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, transition: 'all 0.3s ease' }}
            onClick={() => setRole('Admin')}
          >
            Admin
          </button>
          <button 
            type="button"
            style={{ flex: 1, padding: '0.8rem', background: role === 'Dokter' ? 'var(--primary)' : 'transparent', color: role === 'Dokter' ? 'white' : 'var(--text-muted)', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, transition: 'all 0.3s ease' }}
            onClick={() => setRole('Dokter')}
          >
            Dokter
          </button>
        </div>

        <form onSubmit={handleLogin}>
          <div className="form-group" style={{ marginBottom: '1.5rem' }}>
            <label className="form-label">Nama {role}</label>
            <input 
              type="text" 
              className="form-control" 
              placeholder={`Masukkan nama ${role}...`}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group" style={{ marginBottom: '2rem' }}>
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Masukkan password Anda..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem', fontSize: '1.1rem' }}>
            Masuk sebagai {role}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <a href="/" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem' }}>
            ← Kembali ke Beranda
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
