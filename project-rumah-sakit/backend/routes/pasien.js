const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET all patients
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM PASIEN ORDER BY id_pasien DESC');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// GET single patient by ID
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM PASIEN WHERE id_pasien = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Patient not found' });
    const [phones] = await db.query('SELECT no_telp FROM NO_TELP_PASIEN WHERE id_pasien = ?', [req.params.id]);
    const [family] = await db.query('SELECT * FROM KELUARGA_PASIEN WHERE id_pasien = ?', [req.params.id]);
    res.json({ ...rows[0], phones: phones.map(p => p.no_telp), family });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// CREATE patient
router.post('/', async (req, res) => {
  const { nama_pasien, tgl_lahir, umur, jalan, kota, no_telp } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO PASIEN (nama_pasien, tgl_lahir, umur, jalan, kota) VALUES (?, ?, ?, ?, ?)',
      [nama_pasien, tgl_lahir || null, umur || null, jalan || null, kota || null]
    );
    const id_pasien = result.insertId;
    if (no_telp) await db.query('INSERT INTO NO_TELP_PASIEN (id_pasien, no_telp) VALUES (?, ?)', [id_pasien, no_telp]);
    res.status(201).json({ id_pasien, message: 'Patient created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// UPDATE patient
router.put('/:id', async (req, res) => {
  const { nama_pasien, tgl_lahir, umur, jalan, kota, no_telp } = req.body;
  
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    await conn.query(
      'UPDATE PASIEN SET nama_pasien = ?, tgl_lahir = ?, umur = ?, jalan = ?, kota = ? WHERE id_pasien = ?',
      [nama_pasien, tgl_lahir || null, umur || null, jalan || null, kota || null, req.params.id]
    );
    
    // Clear and re-add phone
    if (no_telp) {
      await conn.query('DELETE FROM NO_TELP_PASIEN WHERE id_pasien = ?', [req.params.id]);
      await conn.query('INSERT INTO NO_TELP_PASIEN (id_pasien, no_telp) VALUES (?, ?)', [req.params.id, no_telp]);
    }

    await conn.commit();
    res.json({ message: 'Patient updated successfully' });
  } catch (error) {
    await conn.rollback();
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  } finally {
    conn.release();
  }
});

// DELETE patient
router.delete('/:id', async (req, res) => {
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    // To bypass the ON DELETE RESTRICT constraint on TINDAKAN_OPERASI, 
    // we explicitly delete any scheduled operations for this patient first.
    await conn.query('DELETE FROM TINDAKAN_OPERASI WHERE id_pasien = ?', [req.params.id]);

    // Now delete the patient. (Phone and Family will auto-delete via ON DELETE CASCADE)
    await conn.query('DELETE FROM PASIEN WHERE id_pasien = ?', [req.params.id]);

    await conn.commit();
    res.json({ message: 'Patient and associated records deleted successfully' });
  } catch (error) {
    await conn.rollback();
    console.error('Delete error:', error);
    res.status(500).json({ message: 'Server Error' });
  } finally {
    conn.release();
  }
});

module.exports = router;
