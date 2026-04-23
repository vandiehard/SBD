import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DashboardDokter = ({ user }) => {
  const [operasiList, setOperasiList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOperasi = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/operasi');
        // Filter operasi untuk dokter ini saja
        // Karena mock login pakai nama bebas, kita filter berdasar kecocokan nama, atau tampilkan semua jika belum ada auth kuat.
        // Untuk demo, kita tampilkan semua, tapi di dunia nyata difilter by ID.
        // const myOps = res.data.filter(op => op.nama_dokter.toLowerCase().includes(user.name.toLowerCase()));
        setOperasiList(res.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOperasi();
  }, [user]);

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ marginBottom: '0.5rem' }}>Selamat Datang, Dr. {user?.name}</h1>
        <p>Lihat ringkasan jadwal dan aktivitas Anda hari ini.</p>
      </div>

      <div className="grid grid-3" style={{ marginBottom: '2.5rem' }}>
        <div className="glass-card" style={{ background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.2), rgba(15, 23, 42, 0.4))' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <p style={{ color: '#7dd3fc', marginBottom: '0.5rem', fontWeight: 500 }}>Total Jadwal Anda</p>
              <h2 style={{ fontSize: '2.5rem', margin: 0 }}>{operasiList.length}</h2>
            </div>
            <div style={{ background: 'rgba(56, 189, 248, 0.2)', padding: '1rem', borderRadius: '12px', fontSize: '1.5rem' }}>📅</div>
          </div>
        </div>
      </div>

      <div className="glass-card table-container">
        <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Jadwal Operasi Mendatang</h2>
        {loading ? (
          <p>Memuat jadwal...</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Jadwal Operasi</th>
                <th>Jenis Operasi</th>
                <th>Pasien</th>
                <th>Ruangan</th>
              </tr>
            </thead>
            <tbody>
              {operasiList.length === 0 ? (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center', padding: '2rem' }}>Tidak ada jadwal operasi saat ini</td>
                </tr>
              ) : (
                operasiList.map((op) => (
                  <tr key={op.id_tindakan}>
                    <td>{new Date(op.jadwal_operasi).toLocaleString('id-ID')}</td>
                    <td>{op.jenis_operasi}</td>
                    <td style={{ fontWeight: 500, color: '#f8fafc' }}>{op.nama_pasien}</td>
                    <td><span className="badge badge-blue">{op.nama_ruangan}</span></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default DashboardDokter;
