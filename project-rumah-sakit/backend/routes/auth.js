const express = require('express');
const router = express.Router();
const db = require('../config/db');
const bcrypt = require('bcryptjs');

// Register a new user (Admin or Dokter)
router.post('/register', async (req, res) => {
  const { username, password, role, id_karyawan } = req.body;

  if (!username || !password || !role) {
    return res.status(400).json({ message: 'Username, password, and role are required' });
  }

  const conn = await db.getConnection();
  try {
    // Check if username already exists
    const [existingUsers] = await conn.query('SELECT * FROM USERS WHERE username = ?', [username]);
    if (existingUsers.length > 0) {
      return res.status(400).json({ message: 'Username already taken' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert new user
    await conn.query(
      'INSERT INTO USERS (username, password, role, id_karyawan) VALUES (?, ?, ?, ?)',
      [username, hashedPassword, role, id_karyawan || null]
    );

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server Error' });
  } finally {
    conn.release();
  }
});

// Login user
router.post('/login', async (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password || !role) {
    return res.status(400).json({ message: 'Username, password, and role are required' });
  }

  try {
    const [users] = await db.query('SELECT * FROM USERS WHERE username = ? AND role = ?', [username, role]);
    
    if (users.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials or role' });
    }

    const user = users[0];

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Return user info (excluding password)
    res.json({
      id_user: user.id_user,
      username: user.username,
      role: user.role,
      id_karyawan: user.id_karyawan
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
