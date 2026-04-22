import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [stats, setStats] = useState({
    pasienCount: 0,
    dokterCount: 0,
    perawatCount: 0,
    operasiCount: 0
  });
  const [recentOperations, setRecentOperations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const statsRes = await axios.get('http://localhost:5000/api/karyawan/stats');
        setStats(statsRes.data);
        
        const opsRes = await axios.get('http://localhost:5000/api/operasi');
        // Get top 5 recent
        setRecentOperations(opsRes.data.slice(0, 5));
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div style={{ color: '#fff' }}>Loading...</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ marginBottom: '0.25rem' }}>Dashboard Overview</h1>
          <p>Welcome back, Admin. Here is what's happening at the clinic today.</p>
        </div>
        <button className="btn btn-primary">
          <span>+</span> New Registration
        </button>
      </div>

      <div className="grid grid-4" style={{ marginBottom: '2rem' }}>
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ width: '45px', height: '45px', borderRadius: '12px', background: 'rgba(56, 189, 248, 0.1)', color: '#38bdf8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
              🧑‍⚕️
            </div>
            <span className="badge badge-green">+12%</span>
          </div>
          <div>
            <h3 style={{ fontSize: '2rem', marginBottom: '0', color: '#f8fafc' }}>{stats.pasienCount}</h3>
            <p style={{ margin: 0, fontSize: '0.9rem' }}>Total Patients</p>
          </div>
        </div>

        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ width: '45px', height: '45px', borderRadius: '12px', background: 'rgba(167, 139, 250, 0.1)', color: '#a78bfa', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
              👨‍⚕️
            </div>
            <span className="badge badge-blue">Active</span>
          </div>
          <div>
            <h3 style={{ fontSize: '2rem', marginBottom: '0', color: '#f8fafc' }}>{stats.dokterCount}</h3>
            <p style={{ margin: 0, fontSize: '0.9rem' }}>Doctors</p>
          </div>
        </div>

        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ width: '45px', height: '45px', borderRadius: '12px', background: 'rgba(244, 114, 182, 0.1)', color: '#f472b6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
              👩‍⚕️
            </div>
            <span className="badge badge-blue">Active</span>
          </div>
          <div>
            <h3 style={{ fontSize: '2rem', marginBottom: '0', color: '#f8fafc' }}>{stats.perawatCount}</h3>
            <p style={{ margin: 0, fontSize: '0.9rem' }}>Nurses</p>
          </div>
        </div>

        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ width: '45px', height: '45px', borderRadius: '12px', background: 'rgba(52, 211, 153, 0.1)', color: '#34d399', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
              🏨
            </div>
            <span className="badge badge-purple">On Schedule</span>
          </div>
          <div>
            <h3 style={{ fontSize: '2rem', marginBottom: '0', color: '#f8fafc' }}>{stats.operasiCount}</h3>
            <p style={{ margin: 0, fontSize: '0.9rem' }}>Operations</p>
          </div>
        </div>
      </div>

      <div className="glass-card">
        <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Recent Operations</h2>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Patient</th>
                <th>Doctor</th>
                <th>Operation</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOperations.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '1rem' }}>No recent operations scheduled</td>
                </tr>
              ) : (
                recentOperations.map((op) => (
                  <tr key={op.id_tindakan}>
                    <td style={{ fontWeight: 500, color: '#f8fafc' }}>{op.nama_pasien}</td>
                    <td>{op.nama_dokter}</td>
                    <td>{op.jenis_operasi}</td>
                    <td>{new Date(op.jadwal_operasi).toLocaleString()}</td>
                    <td>
                      <span className={`badge ${new Date(op.jadwal_operasi) > new Date() ? 'badge-blue' : 'badge-green'}`}>
                        {new Date(op.jadwal_operasi) > new Date() ? 'Scheduled' : 'Completed'}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
