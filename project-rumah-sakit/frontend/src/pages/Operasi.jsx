import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Operasi = () => {
  const [operasiList, setOperasiList] = useState([]);
  const [ruanganList, setRuanganList] = useState([]);
  // Live lookups for forms
  const [pasienList, setPasienList] = useState([]);
  const [dokterList, setDokterList] = useState([]);
  
  const [loading, setLoading] = useState(true);

  // Modal states
  const [showOpModal, setShowOpModal] = useState(false);
  const [showRoomModal, setShowRoomModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Form states
  const [opForm, setOpForm] = useState({ id_pasien: '', id_dokter: '', id_ruangan: '', jadwal_operasi: '', jenis_operasi: '' });
  const [roomForm, setRoomForm] = useState({ nama_ruangan: '', lantai: '' });

  const fetchData = async () => {
    try {
      const [resOperasi, resRuangan, resPasien, resDokter] = await Promise.all([
        axios.get('http://localhost:5000/api/operasi'),
        axios.get('http://localhost:5000/api/operasi/ruangan'),
        axios.get('http://localhost:5000/api/pasien'),
        axios.get('http://localhost:5000/api/karyawan/dokter')
      ]);
      setOperasiList(resOperasi.data);
      setRuanganList(resRuangan.data);
      setPasienList(resPasien.data);
      setDokterList(resDokter.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Operation Handlers
  const handleOpChange = (e) => setOpForm({ ...opForm, [e.target.name]: e.target.value });
  
  const handleAddOp = () => {
    setEditingId(null);
    setOpForm({ id_pasien: '', id_dokter: '', id_ruangan: '', jadwal_operasi: '', jenis_operasi: '' });
    setShowOpModal(true);
  };

  const handleEditOp = (op) => {
    setEditingId(op.id_tindakan);
    // Parse datetime for input type="datetime-local" format YYYY-MM-DDThh:mm
    const date = new Date(op.jadwal_operasi);
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    const isoDateTime = date.toISOString().slice(0,16);

    setOpForm({
      id_pasien: op.id_pasien,
      id_dokter: op.id_dokter,
      id_ruangan: op.id_ruangan,
      jenis_operasi: op.jenis_operasi,
      jadwal_operasi: isoDateTime
    });
    setShowOpModal(true);
  };

  const submitOp = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/api/operasi/${editingId}`, opForm);
      } else {
        await axios.post('http://localhost:5000/api/operasi', opForm);
      }
      setShowOpModal(false);
      fetchData();
    } catch (error) {
      console.error('Error saving:', error);
      alert('Gagal menyimpan operasi.');
    }
  };

  const deleteOp = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/operasi/${id}`);
      fetchData();
    } catch (error) {
      console.error('Error deleting:', error);
      alert(error.response?.data?.message || 'Gagal menghapus operasi.');
    }
  };

  // Room Handlers
  const submitRoom = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/operasi/ruangan', roomForm);
      setShowRoomModal(false);
      setRoomForm({ nama_ruangan: '', lantai: '' });
      fetchData();
    } catch (error) {
      console.error('Error saving room:', error);
      alert('Gagal menyimpan ruangan.');
    }
  };

  const deleteRoom = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/operasi/ruangan/${id}`);
      fetchData();
    } catch (error) {
      console.error('Error deleting room:', error);
      alert(error.response?.data?.message || 'Gagal menghapus ruangan.');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ marginBottom: '0.25rem' }}>Jadwal Operasi</h1>
          <p>Manajemen tindakan operasi dan ruang operasi</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn btn-glass" onClick={() => setShowRoomModal(true)}>
            + Tambah Ruangan
          </button>
          <button className="btn btn-primary" onClick={handleAddOp}>
            <span>+</span> Jadwalkan Operasi
          </button>
        </div>
      </div>

      {/* Ruang Operasi Display */}
      <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Ruang Tersedia</h2>
      <div className="grid grid-3" style={{ marginBottom: '2rem' }}>
        {ruanganList.map((ruangan, index) => (
          <div key={ruangan.id_ruangan} className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', position: 'relative' }}>
            <button className="btn btn-danger" style={{ position: 'absolute', top: '10px', right: '10px', padding: '0.2rem 0.5rem', fontSize:'0.7rem' }} onClick={() => deleteRoom(ruangan.id_ruangan)}>X</button>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ color: '#f472b6', fontSize: '1.5rem' }}>🚪</div>
              <span className="badge badge-purple">Lantai {ruangan.lantai}</span>
            </div>
            <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#f8fafc' }}>{ruangan.nama_ruangan}</h3>
            <p style={{ margin: 0, fontSize: '0.8rem' }}>Room #{index + 1}</p>
          </div>
        ))}
        {ruanganList.length === 0 && (
          <div className="glass-card" style={{ gridColumn: 'span 3', textAlign: 'center', padding: '2rem' }}>
            Belum ada data ruang operasi. Tambahkan terlebih dahulu!
          </div>
        )}
      </div>

      <div className="glass-card table-container">
        <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Semua Tindakan Operasi</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Jadwal Operasi</th>
              <th>Jenis Operasi</th>
              <th>Pasien</th>
              <th>Dokter Penanggung Jawab</th>
              <th>Ruangan</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {operasiList.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '2rem' }}>Belum ada data jadwal operasi</td>
              </tr>
            ) : (
              operasiList.map((op) => (
                <tr key={op.id_tindakan}>
                  <td>{new Date(op.jadwal_operasi).toLocaleString()}</td>
                  <td>{op.jenis_operasi}</td>
                  <td style={{ fontWeight: 500, color: '#f8fafc' }}>{op.nama_pasien}</td>
                  <td>{op.nama_dokter}</td>
                  <td><span className="badge badge-blue">{op.nama_ruangan} (Lt. {op.lantai})</span></td>
                  <td>
                    <div style={{display:'flex', gap:'0.5rem'}}>
                      <button className="btn btn-glass" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }} onClick={() => handleEditOp(op)}>Edit</button>
                      <button className="btn btn-danger" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }} onClick={() => deleteOp(op.id_tindakan)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal: Tambah/Edit Operasi */}
      {showOpModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, backdropFilter: 'blur(5px)' }}>
          <div className="glass-card" style={{ width: '100%', maxWidth: '600px', background: 'rgba(15, 23, 42, 0.9)' }}>
            <h2 style={{ marginBottom: '1.5rem', color: '#f8fafc' }}>{editingId ? 'Edit Jadwal Operasi' : 'Jadwalkan Operasi'}</h2>
            <form onSubmit={submitOp}>
              
              <div className="grid grid-2">
                <div className="form-group">
                  <label className="form-label">Pilih Pasien</label>
                  <select name="id_pasien" className="form-control" value={opForm.id_pasien} onChange={handleOpChange} required>
                    <option value="">-- Pilih Pasien --</option>
                    {pasienList.map(p => <option key={p.id_pasien} value={p.id_pasien}>{p.nama_pasien}</option>)}
                  </select>
                </div>
                
                <div className="form-group">
                  <label className="form-label">Pilih Dokter</label>
                  <select name="id_dokter" className="form-control" value={opForm.id_dokter} onChange={handleOpChange} required>
                    <option value="">-- Pilih Dokter --</option>
                    {dokterList.map(d => <option key={d.id_karyawan} value={d.id_karyawan}>{d.nama} ({d.spesialisasi})</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-2">
                <div className="form-group">
                  <label className="form-label">Ruang Operasi</label>
                  <select name="id_ruangan" className="form-control" value={opForm.id_ruangan} onChange={handleOpChange} required>
                    <option value="">-- Pilih Ruangan --</option>
                    {ruanganList.map(r => <option key={r.id_ruangan} value={r.id_ruangan}>{r.nama_ruangan} - Lantai {r.lantai}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Jadwal Operasi</label>
                  <input type="datetime-local" name="jadwal_operasi" className="form-control" value={opForm.jadwal_operasi} onChange={handleOpChange} required />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Jenis Operasi</label>
                <input type="text" name="jenis_operasi" className="form-control" value={opForm.jenis_operasi} onChange={handleOpChange} required placeholder="Contoh: Operasi Katarak" />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                <button type="button" className="btn btn-glass" onClick={() => setShowOpModal(false)}>Batal</button>
                <button type="submit" className="btn btn-primary">Simpan</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Tambah Ruangan */}
      {showRoomModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, backdropFilter: 'blur(5px)' }}>
          <div className="glass-card" style={{ width: '100%', maxWidth: '400px', background: 'rgba(15, 23, 42, 0.9)' }}>
            <h2 style={{ marginBottom: '1.5rem', color: '#f8fafc' }}>Tambah Ruang Operasi</h2>
            <form onSubmit={submitRoom}>
              <div className="form-group">
                <label className="form-label">Nama Ruangan</label>
                <input type="text" name="nama_ruangan" className="form-control" value={roomForm.nama_ruangan} onChange={(e) => setRoomForm({...roomForm, nama_ruangan: e.target.value})} required placeholder="Contoh: OK-1" />
              </div>
              <div className="form-group">
                <label className="form-label">Lantai</label>
                <input type="text" name="lantai" className="form-control" value={roomForm.lantai} onChange={(e) => setRoomForm({...roomForm, lantai: e.target.value})} required placeholder="Contoh: 2" />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                <button type="button" className="btn btn-glass" onClick={() => setShowRoomModal(false)}>Batal</button>
                <button type="submit" className="btn btn-primary">Simpan</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Operasi;
