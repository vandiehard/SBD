const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const pasienRoutes = require('./routes/pasien');
const karyawanRoutes = require('./routes/karyawan');
const operasiRoutes = require('./routes/operasi');

app.use('/api/pasien', pasienRoutes);
app.use('/api/karyawan', karyawanRoutes);
app.use('/api/operasi', operasiRoutes);

// Base route
app.get('/', (req, res) => {
  res.send('Klinik API Server is running');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
