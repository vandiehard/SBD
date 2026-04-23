import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PublicLanding = () => {
  const [operasiList, setOperasiList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOperasi = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/operasi');
        setOperasiList(res.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOperasi();
  }, []);

  const filteredOperasi = operasiList.filter(op => 
    op.nama_pasien.toLowerCase().includes(searchTerm.toLowerCase()) || 
    op.jenis_operasi.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-gradient)', color: 'var(--text-main)', overflowX: 'hidden' }}>
      {/* Decorative Blobs */}
      <div className="bg-blobs">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      {/* Header */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 5%', background: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(10px)', borderBottom: '1px solid var(--glass-border)', position: 'sticky', top: 0, zIndex: 50 }}>
        <h2 style={{ margin: 0, background: 'linear-gradient(to right, #38bdf8, #818cf8)', WebkitBackgroundClip: 'text', color: 'transparent', fontWeight: 'bold' }}>
          MyKlinik
        </h2>
        <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <a href="#about" style={{ color: 'var(--text-main)', textDecoration: 'none', fontWeight: 500 }}>Tentang Kami</a>
          <a href="#portfolio" style={{ color: 'var(--text-main)', textDecoration: 'none', fontWeight: 500 }}>Portfolio</a>
          <a href="#jadwal" style={{ color: 'var(--text-main)', textDecoration: 'none', fontWeight: 500 }}>Jadwal Operasi</a>
          <button className="btn btn-primary" onClick={() => navigate('/login')}>Login Staff</button>
        </nav>
      </header>

      {/* Hero Section */}
      <section style={{ padding: '6rem 5%', textAlign: 'center', minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <h1 style={{ fontSize: '4rem', marginBottom: '1.5rem', lineHeight: 1.2 }}>Layanan Kesehatan <br/>Terbaik Untuk Anda</h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto 2.5rem auto' }}>
          Kami menyediakan layanan medis profesional dengan dokter spesialis berpengalaman dan fasilitas modern untuk memastikan kesehatan Anda.
        </p>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <a href="#jadwal" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>Cek Jadwal Operasi</a>
          <a href="#about" className="btn btn-glass" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>Pelajari Lebih Lanjut</a>
        </div>
      </section>

      {/* About & Address Section */}
      <section id="about" style={{ padding: '5rem 5%', background: 'rgba(0,0,0,0.2)' }}>
        <div className="grid grid-2" style={{ alignItems: 'center', gap: '4rem' }}>
          <div>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Tentang MyKlinik</h2>
            <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>
              MyKlinik didirikan dengan tujuan memberikan pelayanan kesehatan yang berkualitas, aman, dan terpercaya. Kami memiliki tim dokter spesialis dan perawat yang berdedikasi tinggi.
            </p>
            <div className="glass-card" style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: '#f472b6' }}>📍 Alamat Kami</h3>
              <p style={{ margin: 0 }}>Jl. Kesehatan No. 123, Jakarta Selatan<br/>DKI Jakarta 12345<br/>Telp: (021) 555-1234</p>
            </div>
          </div>
          <div className="grid grid-2" style={{ gap: '1.5rem' }}>
             <div className="glass-card" style={{ textAlign: 'center', padding: '2rem 1rem' }}>
               <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>👨‍⚕️</div>
               <h3>50+</h3>
               <p style={{ margin: 0 }}>Dokter Spesialis</p>
             </div>
             <div className="glass-card" style={{ textAlign: 'center', padding: '2rem 1rem' }}>
               <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🏥</div>
               <h3>24/7</h3>
               <p style={{ margin: 0 }}>Layanan Darurat</p>
             </div>
             <div className="glass-card" style={{ textAlign: 'center', padding: '2rem 1rem' }}>
               <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🛏️</div>
               <h3>100+</h3>
               <p style={{ margin: 0 }}>Ruang Inap</p>
             </div>
             <div className="glass-card" style={{ textAlign: 'center', padding: '2rem 1rem' }}>
               <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>⭐</div>
               <h3>99%</h3>
               <p style={{ margin: 0 }}>Pasien Puas</p>
             </div>
          </div>
        </div>
      </section>

      {/* Portfolio / Documentation */}
      <section id="portfolio" style={{ padding: '5rem 5%' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2.5rem' }}>Fasilitas & Dokumentasi</h2>
          <p>Klinik kami dilengkapi dengan fasilitas standar internasional.</p>
        </div>
        <div className="grid grid-3">
          <div className="glass-card" style={{ padding: '0.5rem' }}>
            <img src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=600&auto=format&fit=crop" alt="Ruang Operasi" style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '12px' }} />
            <h3 style={{ padding: '1rem 0.5rem 0.5rem' }}>Ruang Operasi Modern</h3>
          </div>
          <div className="glass-card" style={{ padding: '0.5rem' }}>
            <img src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=600&auto=format&fit=crop" alt="Lobi Utama" style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '12px' }} />
            <h3 style={{ padding: '1rem 0.5rem 0.5rem' }}>Lobi & Ruang Tunggu</h3>
          </div>
          <div className="glass-card" style={{ padding: '0.5rem' }}>
            <img src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=600&auto=format&fit=crop" alt="Perawatan" style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '12px' }} />
            <h3 style={{ padding: '1rem 0.5rem 0.5rem' }}>Fasilitas Rawat Inap</h3>
          </div>
        </div>
      </section>

      {/* Searchable Surgery Schedule */}
      <section id="jadwal" style={{ padding: '5rem 5%', background: 'rgba(0,0,0,0.2)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2.5rem' }}>Jadwal Operasi Pasien</h2>
            <p>Cari jadwal operasi berdasarkan nama pasien atau jenis operasi.</p>
          </div>

          <div className="form-group">
            <input 
              type="text" 
              className="form-control" 
              placeholder="🔍 Cari nama pasien atau jenis operasi..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ padding: '1rem 1.5rem', fontSize: '1.1rem', borderRadius: '50px' }}
            />
          </div>

          <div className="glass-card table-container" style={{ marginTop: '2rem' }}>
            {loading ? (
              <div style={{ textAlign: 'center', padding: '3rem' }}>Memuat jadwal...</div>
            ) : (
              <table className="table">
                <thead>
                  <tr>
                    <th>Waktu Operasi</th>
                    <th>Nama Pasien</th>
                    <th>Jenis Operasi</th>
                    <th>Dokter</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOperasi.length === 0 ? (
                    <tr>
                      <td colSpan="4" style={{ textAlign: 'center', padding: '3rem' }}>
                        Tidak ada jadwal operasi yang ditemukan.
                      </td>
                    </tr>
                  ) : (
                    filteredOperasi.map(op => (
                      <tr key={op.id_tindakan}>
                        <td>{new Date(op.jadwal_operasi).toLocaleString('id-ID')}</td>
                        <td style={{ fontWeight: 600 }}>{op.nama_pasien}</td>
                        <td>{op.jenis_operasi}</td>
                        <td>{op.nama_dokter}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </section>

      <footer style={{ padding: '2rem 5%', textAlign: 'center', borderTop: '1px solid var(--glass-border)', background: 'rgba(15, 23, 42, 0.8)' }}>
        <p style={{ margin: 0 }}>© {new Date().getFullYear()} MyKlinik. Hak Cipta Dilindungi.</p>
      </footer>
    </div>
  );
};

export default PublicLanding;
