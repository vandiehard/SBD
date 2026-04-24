import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Pasien = () => {
  const [pasienList, setPasienList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form state
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    nama_pasien: '', tgl_lahir: '', umur: '', jalan: '', kota: '', no_telp: ''
  });

  const fetchPasien = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/pasien');
      setPasienList(response.data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPasien();
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleEdit = async (p) => {
    setEditingId(p.id_pasien);
    // Fetch details for edit to get phone number
    try {
      const res = await axios.get(`http://localhost:5000/api/pasien/${p.id_pasien}`);
      const data = res.data;
      setFormData({
        nama_pasien: data.nama_pasien,
        tgl_lahir: data.tgl_lahir ? new Date(data.tgl_lahir).toISOString().split('T')[0] : '',
        umur: data.umur || '',
        jalan: data.jalan || '',
        kota: data.kota || '',
        no_telp: data.phones && data.phones.length > 0 ? data.phones[0] : ''
      });
      setShowModal(true);
    } catch(err) {
      console.error("Error fetching detail:", err);
    }
  };

  const handleAddNew = () => {
    setEditingId(null);
    setFormData({ nama_pasien: '', tgl_lahir: '', umur: '', jalan: '', kota: '', no_telp: '' });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/api/pasien/${editingId}`, formData);
      } else {
        await axios.post('http://localhost:5000/api/pasien', formData);
      }
      setShowModal(false);
      fetchPasien();
    } catch (error) {
      console.error('Error saving patient:', error);
      alert('Gagal menyimpan data.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/pasien/${id}`);
      fetchPasien();
    } catch (error) {
      console.error('Error deleting patient:', error);
      alert(error.response?.data?.message || 'Gagal menghapus data.');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ marginBottom: '0.25rem' }}>Daftar Pasien</h1>
          <p>Kelola data pasien klinik Anda</p>
        </div>
        <button className="btn btn-primary" onClick={handleAddNew}>
          <span>+</span> Tambah Pasien
        </button>
      </div>

      <div className="glass-card table-container">
        <table className="table">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama Pasien</th>
              <th>Tanggal Lahir</th>
              <th>Umur</th>
              <th>Alamat</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {pasienList.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '2rem' }}>Belum ada data pasien</td>
              </tr>
            ) : (
              pasienList.map((p, index) => (
                <tr key={p.id_pasien}>
                  <td>{index + 1}</td>
                  <td style={{ fontWeight: 500, color: '#f8fafc' }}>{p.nama_pasien}</td>
                  <td>{p.tgl_lahir ? new Date(p.tgl_lahir).toLocaleDateString() : '-'}</td>
                  <td>{p.umur ? `${p.umur} Thn` : '-'}</td>
                  <td>{p.jalan}, {p.kota}</td>
                  <td>
                    <div style={{display:'flex', gap:'0.5rem'}}>
                      <button className="btn btn-glass" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }} onClick={() => handleEdit(p)}>
                        Edit
                      </button>
                      <button className="btn btn-danger" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }} onClick={() => handleDelete(p.id_pasien)}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, backdropFilter: 'blur(5px)' }}>
          <div className="glass-card" style={{ width: '100%', maxWidth: '600px', background: 'rgba(15, 23, 42, 0.9)' }}>
            <h2 style={{ marginBottom: '1.5rem', color: '#f8fafc' }}>{editingId ? 'Edit Data Pasien' : 'Tambah Pasien Baru'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-2">
                <div className="form-group">
                  <label className="form-label">Nama Pasien</label>
                  <input type="text" name="nama_pasien" className="form-control" value={formData.nama_pasien} onChange={handleChange} required placeholder="Masukkan nama pasien" />
                </div>
                <div className="form-group">
                  <label className="form-label">No Telepon</label>
                  <input type="text" name="no_telp" className="form-control" value={formData.no_telp} onChange={handleChange} placeholder="08xxxxxxxx" />
                </div>
              </div>
              <div className="grid grid-2">
                <div className="form-group">
                  <label className="form-label">Tanggal Lahir</label>
                  <input type="date" name="tgl_lahir" className="form-control" value={formData.tgl_lahir} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label className="form-label">Umur</label>
                  <input type="number" name="umur" className="form-control" value={formData.umur} onChange={handleChange} placeholder="Contoh: 25" />
                </div>
              </div>
              <div className="grid grid-2">
                <div className="form-group">
                  <label className="form-label">Jalan / Alamat</label>
                  <input type="text" name="jalan" className="form-control" value={formData.jalan} onChange={handleChange} placeholder="Nama jalan, RT/RW" />
                </div>
                <div className="form-group">
                  <label className="form-label">Kota</label>
                  <input type="text" name="kota" className="form-control" value={formData.kota} onChange={handleChange} placeholder="Nama kota" />
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                <button type="button" className="btn btn-glass" onClick={() => setShowModal(false)}>Batal</button>
                <button type="submit" className="btn btn-primary">Simpan Data</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pasien;
