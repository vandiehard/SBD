const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET all karyawan
router.get('/', async (req, res) => {
  try {
    const [karyawan] = await db.query('SELECT * FROM KARYAWAN ORDER BY id_karyawan DESC');
    res.json(karyawan);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// GET statistics
router.get('/stats', async (req, res) => {
  try {
    const [[{ count: pasienCount }]] = await db.query('SELECT COUNT(*) as count FROM PASIEN');
    const [[{ count: dokterCount }]] = await db.query("SELECT COUNT(*) as count FROM KARYAWAN WHERE tipe_karyawan = 'DOKTER'");
    const [[{ count: perawatCount }]] = await db.query("SELECT COUNT(*) as count FROM KARYAWAN WHERE tipe_karyawan = 'PERAWAT'");
    const [[{ count: operasiCount }]] = await db.query("SELECT COUNT(*) as count FROM TINDAKAN_OPERASI");

    res.json({ pasienCount, dokterCount, perawatCount, operasiCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// GET all doctors
router.get('/dokter', async (req, res) => {
  try {
    const query = `
      SELECT K.*, D.spesialisasi, D.no_izin 
      FROM KARYAWAN K
      JOIN DOKTER D ON K.id_karyawan = D.id_karyawan
    `;
    const [dokter] = await db.query(query);
    res.json(dokter);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// GET all nurses
router.get('/perawat', async (req, res) => {
  try {
    const query = `
      SELECT K.*, P.shift_jaga, P.area_tugas 
      FROM KARYAWAN K
      JOIN PERAWAT P ON K.id_karyawan = P.id_karyawan
    `;
    const [perawat] = await db.query(query);
    res.json(perawat);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// POST to create Dokter or Perawat
router.post('/', async (req, res) => {
  const { nama, tipe_karyawan, spesialisasi, no_izin, shift_jaga, area_tugas } = req.body;
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();
    const [result] = await conn.query('INSERT INTO KARYAWAN (nama, tipe_karyawan) VALUES (?, ?)', [nama, tipe_karyawan]);
    const id_karyawan = result.insertId;

    if (tipe_karyawan === 'DOKTER') {
      await conn.query('INSERT INTO DOKTER (id_karyawan, spesialisasi, no_izin) VALUES (?, ?, ?)', [id_karyawan, spesialisasi || null, no_izin || null]);
    } else if (tipe_karyawan === 'PERAWAT') {
      await conn.query('INSERT INTO PERAWAT (id_karyawan, shift_jaga, area_tugas) VALUES (?, ?, ?)', [id_karyawan, shift_jaga || null, area_tugas || null]);
    }

    await conn.commit();
    res.status(201).json({ id_karyawan, message: 'Karyawan created successfully' });
  } catch (error) {
    await conn.rollback();
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  } finally {
    conn.release();
  }
});

// PUT to update Dokter or Perawat
router.put('/:id', async (req, res) => {
  const { nama, spesialisasi, no_izin, shift_jaga, area_tugas } = req.body;
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();
    
    // First figure out the type
    const [karyawanData] = await conn.query('SELECT tipe_karyawan FROM KARYAWAN WHERE id_karyawan = ?', [req.params.id]);
    if (karyawanData.length === 0) return res.status(404).json({message: 'Not found'});
    
    const { tipe_karyawan } = karyawanData[0];
    
    await conn.query('UPDATE KARYAWAN SET nama = ? WHERE id_karyawan = ?', [nama, req.params.id]);

    if (tipe_karyawan === 'DOKTER') {
      await conn.query('UPDATE DOKTER SET spesialisasi = ?, no_izin = ? WHERE id_karyawan = ?', [spesialisasi, no_izin, req.params.id]);
    } else if (tipe_karyawan === 'PERAWAT') {
      await conn.query('UPDATE PERAWAT SET shift_jaga = ?, area_tugas = ? WHERE id_karyawan = ?', [shift_jaga, area_tugas, req.params.id]);
    }

    await conn.commit();
    res.json({ message: 'Karyawan updated successfully' });
  } catch (error) {
    await conn.rollback();
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  } finally {
    conn.release();
  }
});

// DELETE Karyawan
router.delete('/:id', async (req, res) => {
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    // To prevent the ON DELETE RESTRICT constraint from triggering,
    // explicitly delete operations where this Karyawan is assigned as doctor
    await conn.query('DELETE FROM TINDAKAN_OPERASI WHERE id_dokter = ?', [req.params.id]);

    // Deleting from KARYAWAN will cascade successfully to DOKTER/PERAWAT
    await conn.query('DELETE FROM KARYAWAN WHERE id_karyawan = ?', [req.params.id]);

    await conn.commit();
    res.json({ message: 'Karyawan deleted successfully' });
  } catch (error) {
    await conn.rollback();
    console.error('Delete error', error);
    res.status(500).json({ message: 'Server Error' });
  } finally {
    conn.release();
  }
});

module.exports = router;
