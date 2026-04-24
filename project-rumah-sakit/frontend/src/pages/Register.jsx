import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [role, setRole] = useState('Admin');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [idKaryawan, setIdKaryawan] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!username.trim() || !password.trim()) {
      setError("Username dan Password tidak boleh kosong");
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/auth/register', {
        username,
        password,
        role: role.toLowerCase(),
        id_karyawan: role === 'Dokter' ? idKaryawan : null
      });

      alert('Registrasi berhasil! Silahkan login.');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Terjadi kesalahan saat registrasi');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div className="glass-card" style={{ maxWidth: '450px', width: '100%', padding: '3rem 2.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h1 style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>Daftar Akun Baru</h1>
          <p>Buat akun untuk sistem MyKlinik</p>
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

        {error && <div style={{ color: '#ef4444', background: 'rgba(239,68,68,0.1)', padding: '0.8rem', borderRadius: '8px', marginBottom: '1.5rem', textAlign: 'center', border: '1px solid rgba(239,68,68,0.2)' }}>{error}</div>}

        <form onSubmit={handleRegister}>
          <div className="form-group" style={{ marginBottom: '1.5rem' }}>
            <label className="form-label">Username</label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Masukkan username..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group" style={{ marginBottom: '1.5rem' }}>
            <label className="form-label">Password</label>
            <input 
              type="password" 
              className="form-control" 
              placeholder="Masukkan password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {role === 'Dokter' && (
            <div className="form-group" style={{ marginBottom: '2rem' }}>
              <label className="form-label">ID Karyawan</label>
              <input 
                type="number" 
                className="form-control" 
                placeholder="Masukkan ID Karyawan Anda..."
                value={idKaryawan}
                onChange={(e) => setIdKaryawan(e.target.value)}
                required
              />
              <small style={{ color: 'var(--text-muted)', marginTop: '0.5rem', display: 'block' }}>ID ini diberikan oleh admin saat Anda didaftarkan sebagai pegawai.</small>
            </div>
          )}

          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem', fontSize: '1.1rem', marginTop: role === 'Admin' ? '0.5rem' : '0' }}>
            Daftar sebagai {role}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ color: 'var(--text-muted)' }}>
            Sudah punya akun? <span onClick={() => navigate('/login')} style={{ color: 'var(--primary)', cursor: 'pointer', fontWeight: 'bold' }}>Masuk di sini</span>
          </div>
          <a href="/" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem' }}>
            ← Kembali ke Beranda
          </a>
        </div>
      </div>
    </div>
  );
};

export default Register;
