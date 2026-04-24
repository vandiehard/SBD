import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Karyawan = () => {
  const [dokterList, setDokterList] = useState([]);
  const [perawatList, setPerawatList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dokter');

  // Form state
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    nama: '',
    username: '',
    password: '',
    tipe_karyawan: 'DOKTER',
    spesialisasi: '',
    no_izin: '',
    shift_jaga: '',
    area_tugas: ''
  });

  const fetchData = async () => {
    try {
      const [resDokter, resPerawat] = await Promise.all([
        axios.get('http://localhost:5000/api/karyawan/dokter'),
        axios.get('http://localhost:5000/api/karyawan/perawat')
      ]);
      setDokterList(resDokter.data);
      setPerawatList(resPerawat.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleAddNew = () => {
    setEditingId(null);
    setFormData({
      nama: '',
      username: '',
      password: '',
      tipe_karyawan: activeTab === 'dokter' ? 'DOKTER' : 'PERAWAT',
      spesialisasi: '', no_izin: '', shift_jaga: '', area_tugas: ''
    });
    setShowModal(true);
  };

  const handleEdit = (karyawan, tipe) => {
    setEditingId(karyawan.id_karyawan);
    setFormData({
      nama: karyawan.nama,
      username: karyawan.username || '',
      password: '', // Leave blank, only update if admin types something
      tipe_karyawan: tipe,
      spesialisasi: karyawan.spesialisasi || '',
      no_izin: karyawan.no_izin || '',
      shift_jaga: karyawan.shift_jaga || '',
      area_tugas: karyawan.area_tugas || ''
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/api/karyawan/${editingId}`, formData);
      } else {
        await axios.post('http://localhost:5000/api/karyawan', formData);
      }
      setShowModal(false);
      fetchData();
    } catch (error) {
      console.error('Error saving karyawan:', error);
      alert('Gagal menyimpan data karyawan.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/karyawan/${id}`);
      fetchData();
    } catch (error) {
      console.error('Error deleting employee:', error);
      alert(error.response?.data?.message || 'Gagal menghapus data.');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ marginBottom: '0.25rem' }}>Data Karyawan</h1>
          <p>Manajemen data Dokter dan Perawat</p>
        </div>
        <button className="btn btn-primary" onClick={handleAddNew}>
          <span>+</span> Tambah {activeTab === 'dokter' ? 'Dokter' : 'Perawat'}
        </button>
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
        <button
          className={`btn ${activeTab === 'dokter' ? 'btn-primary' : 'btn-glass'}`}
          onClick={() => setActiveTab('dokter')}
        >
          👨‍⚕️ Dokter ({dokterList.length})
        </button>
        <button
          className={`btn ${activeTab === 'perawat' ? 'btn-primary' : 'btn-glass'}`}
          onClick={() => setActiveTab('perawat')}
        >
          👩‍⚕️ Perawat ({perawatList.length})
        </button>
      </div>

      <div className="glass-card table-container">
        {activeTab === 'dokter' ? (
          <table className="table">
            <thead>
              <tr>
                <th>No</th>
                <th>Nama Dokter</th>
                <th>Tipe</th>
                <th>Spesialisasi</th>
                <th>No Izin</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {dokterList.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '2rem' }}>Belum ada data dokter</td>
                </tr>
              ) : (
                dokterList.map((d, index) => (
                  <tr key={d.id_karyawan}>
                    <td>{index + 1}</td>
                    <td style={{ fontWeight: 500, color: '#f8fafc' }}>{d.nama}</td>
                    <td><span className="badge badge-purple">{d.tipe_karyawan}</span></td>
                    <td>{d.spesialisasi || '-'}</td>
                    <td>{d.no_izin || '-'}</td>
                    <td>
                      <div style={{display:'flex', gap:'0.5rem'}}>
                        <button className="btn btn-glass" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }} onClick={() => handleEdit(d, 'DOKTER')}>Edit</button>
                        <button className="btn btn-danger" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }} onClick={() => handleDelete(d.id_karyawan)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>No</th>
                <th>Nama Perawat</th>
                <th>Tipe</th>
                <th>Shift Jaga</th>
                <th>Area Tugas</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {perawatList.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '2rem' }}>Belum ada data perawat</td>
                </tr>
              ) : (
                perawatList.map((p, index) => (
                  <tr key={p.id_karyawan}>
                    <td>{index + 1}</td>
                    <td style={{ fontWeight: 500, color: '#f8fafc' }}>{p.nama}</td>
                    <td><span className="badge badge-green">{p.tipe_karyawan}</span></td>
                    <td><span className="badge badge-blue">{p.shift_jaga || '-'}</span></td>
                    <td>{p.area_tugas || '-'}</td>
                    <td>
                      <div style={{display:'flex', gap:'0.5rem'}}>
                        <button className="btn btn-glass" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }} onClick={() => handleEdit(p, 'PERAWAT')}>Edit</button>
                        <button className="btn btn-danger" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }} onClick={() => handleDelete(p.id_karyawan)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, backdropFilter: 'blur(5px)' }}>
          <div className="glass-card" style={{ width: '100%', maxWidth: '500px', background: 'rgba(15, 23, 42, 0.9)' }}>
            <h2 style={{ marginBottom: '1.5rem', color: '#f8fafc' }}>
              {editingId ? `Edit Data ${formData.tipe_karyawan}` : `Tambah ${formData.tipe_karyawan}`}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Nama Lengkap</label>
                <input type="text" name="nama" className="form-control" value={formData.nama} onChange={handleChange} required />
              </div>
              
              <div className="grid grid-2">
                <div className="form-group">
                  <label className="form-label">Username</label>
                  <input type="text" name="username" className="form-control" value={formData.username} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Password {editingId && '(Kosongkan jika tidak diubah)'}</label>
                  <input type="password" name="password" className="form-control" value={formData.password} onChange={handleChange} required={!editingId} />
                </div>
              </div>
              
              {!editingId && (
                <div className="form-group">
                  <label className="form-label">Tipe Karyawan</label>
                  <select name="tipe_karyawan" className="form-control" value={formData.tipe_karyawan} onChange={handleChange}>
                    <option value="DOKTER">Dokter</option>
                    <option value="PERAWAT">Perawat</option>
                  </select>
                </div>
              )}

              {formData.tipe_karyawan === 'DOKTER' && (
                <div className="grid grid-2">
                  <div className="form-group">
                    <label className="form-label">Spesialisasi</label>
                    <input type="text" name="spesialisasi" className="form-control" value={formData.spesialisasi} onChange={handleChange} placeholder="Contoh: Bedah" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">No Izin / SIP</label>
                    <input type="text" name="no_izin" className="form-control" value={formData.no_izin} onChange={handleChange} />
                  </div>
                </div>
              )}

              {formData.tipe_karyawan === 'PERAWAT' && (
                <div className="grid grid-2">
                  <div className="form-group">
                    <label className="form-label">Shift Jaga</label>
                    <select name="shift_jaga" className="form-control" value={formData.shift_jaga} onChange={handleChange}>
                      <option value="">Pilih Shift</option>
                      <option value="Pagi">Pagi</option>
                      <option value="Siang">Siang</option>
                      <option value="Malam">Malam</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Area Tugas</label>
                    <input type="text" name="area_tugas" className="form-control" value={formData.area_tugas} onChange={handleChange} placeholder="Contoh: UGD" />
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                <button type="button" className="btn btn-glass" onClick={() => setShowModal(false)}>Batal</button>
                <button type="submit" className="btn btn-primary">Simpan</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Karyawan;
