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
      SELECT K.*, D.spesialisasi, D.no_izin, U.username 
      FROM KARYAWAN K
      JOIN DOKTER D ON K.id_karyawan = D.id_karyawan
      LEFT JOIN USERS U ON K.id_karyawan = U.id_karyawan
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
      SELECT K.*, P.shift_jaga, P.area_tugas, U.username
      FROM KARYAWAN K
      JOIN PERAWAT P ON K.id_karyawan = P.id_karyawan
      LEFT JOIN USERS U ON K.id_karyawan = U.id_karyawan
    `;
    const [perawat] = await db.query(query);
    res.json(perawat);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

const bcrypt = require('bcryptjs');

// POST to create Dokter or Perawat
router.post('/', async (req, res) => {
  const { nama, tipe_karyawan, spesialisasi, no_izin, shift_jaga, area_tugas, username, password } = req.body;
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

    // Create user account if username and password are provided
    if (username && password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const role = tipe_karyawan === 'DOKTER' ? 'dokter' : 'perawat'; // Need to be careful with roles
      
      await conn.query(
        'INSERT INTO USERS (username, password, role, id_karyawan) VALUES (?, ?, ?, ?)',
        [username, hashedPassword, role, id_karyawan]
      );
    }

    await conn.commit();
    res.status(201).json({ id_karyawan, message: 'Karyawan created successfully' });
  } catch (error) {
    await conn.rollback();
    console.error(error);
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ message: 'Username sudah digunakan' });
    }
    res.status(500).json({ message: 'Server Error' });
  } finally {
    conn.release();
  }
});

// PUT to update Dokter or Perawat
router.put('/:id', async (req, res) => {
  const { nama, spesialisasi, no_izin, shift_jaga, area_tugas, username, password } = req.body;
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

    // Update user credentials if username is provided
    if (username) {
      const [existingUser] = await conn.query('SELECT id_user FROM USERS WHERE id_karyawan = ?', [req.params.id]);
      
      if (existingUser.length > 0) {
        if (password) {
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(password, salt);
          await conn.query('UPDATE USERS SET username = ?, password = ? WHERE id_karyawan = ?', [username, hashedPassword, req.params.id]);
        } else {
          await conn.query('UPDATE USERS SET username = ? WHERE id_karyawan = ?', [username, req.params.id]);
        }
      } else {
        // If they didn't have an account before but admin is adding one now
        const role = tipe_karyawan === 'DOKTER' ? 'dokter' : 'perawat';
        if (password) {
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(password, salt);
          await conn.query('INSERT INTO USERS (username, password, role, id_karyawan) VALUES (?, ?, ?, ?)', [username, hashedPassword, role, req.params.id]);
        }
      }
    }

    await conn.commit();
    res.json({ message: 'Karyawan updated successfully' });
  } catch (error) {
    await conn.rollback();
    console.error(error);
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ message: 'Username sudah digunakan' });
    }
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
