import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Pasien from './pages/Pasien';
import Karyawan from './pages/Karyawan';
import Operasi from './pages/Operasi';

function App() {
  return (
    <div className="app-container">
      {/* Background blobs for premium feel */}
      <div className="bg-blobs">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      <Sidebar />
      
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/pasien" element={<Pasien />} />
          <Route path="/karyawan" element={<Karyawan />} />
          <Route path="/operasi" element={<Operasi />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
