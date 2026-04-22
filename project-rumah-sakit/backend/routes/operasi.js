const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET all operational records with details
router.get('/', async (req, res) => {
  try {
    const query = `
      SELECT T.id_tindakan, T.jadwal_operasi, T.jenis_operasi,
             P.id_pasien, P.nama_pasien, K.id_karyawan as id_dokter, K.nama as nama_dokter, R.id_ruangan, R.nama_ruangan, R.lantai
      FROM TINDAKAN_OPERASI T
      JOIN PASIEN P ON T.id_pasien = P.id_pasien
      JOIN KARYAWAN K ON T.id_dokter = K.id_karyawan
      JOIN RUANG_OPERASI R ON T.id_ruangan = R.id_ruangan
      ORDER BY T.jadwal_operasi DESC
    `;
    const [rows] = await db.query(query);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// GET all operating rooms
router.get('/ruangan', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM RUANG_OPERASI');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// POST to create new operation schedule
router.post('/', async (req, res) => {
  const { id_dokter, id_pasien, id_ruangan, jadwal_operasi, jenis_operasi } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO TINDAKAN_OPERASI (id_dokter, id_pasien, id_ruangan, jadwal_operasi, jenis_operasi) VALUES (?, ?, ?, ?, ?)',
      [id_dokter, id_pasien, id_ruangan, jadwal_operasi, jenis_operasi]
    );
    res.status(201).json({ id_tindakan: result.insertId, message: 'Operasi scheduled successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// PUT to update operation
router.put('/:id', async (req, res) => {
  const { id_dokter, id_pasien, id_ruangan, jadwal_operasi, jenis_operasi } = req.body;
  try {
    await db.query(
      'UPDATE TINDAKAN_OPERASI SET id_dokter=?, id_pasien=?, id_ruangan=?, jadwal_operasi=?, jenis_operasi=? WHERE id_tindakan=?',
      [id_dokter, id_pasien, id_ruangan, jadwal_operasi, jenis_operasi, req.params.id]
    );
    res.json({ message: 'Operasi updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// DELETE operation
router.delete('/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM TINDAKAN_OPERASI WHERE id_tindakan = ?', [req.params.id]);
    res.json({ message: 'Operasi deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// POST to create new operating room
router.post('/ruangan', async (req, res) => {
  const { nama_ruangan, lantai } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO RUANG_OPERASI (nama_ruangan, lantai) VALUES (?, ?)',
      [nama_ruangan, lantai]
    );
    res.status(201).json({ id_ruangan: result.insertId, message: 'Ruang Operasi created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// DELETE operating room
router.delete('/ruangan/:id', async (req, res) => {
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    // To prevent the ON DELETE RESTRICT constraint from triggering,
    // explicitly delete operations scheduled in this room
    await conn.query('DELETE FROM TINDAKAN_OPERASI WHERE id_ruangan = ?', [req.params.id]);

    await conn.query('DELETE FROM RUANG_OPERASI WHERE id_ruangan = ?', [req.params.id]);

    await conn.commit();
    res.json({ message: 'Ruang Operasi deleted successfully' });
  } catch (error) {
    await conn.rollback();
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  } finally {
    conn.release();
  }
});

module.exports = router;
