import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import AdminDashboard from './pages/admin/Dashboard';
import GuruDashboard from './pages/guru/Dashboard';
import OrangTuaDashboard from './pages/orangtua/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        
        {/* Admin Routes */}
        <Route element={<Layout allowedRoles={['ADMIN']} />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/master" element={<div className="p-4 bg-white rounded-xl shadow-sm border border-gray-100"><h2 className="text-xl font-semibold">Master Data</h2><p className="mt-2 text-gray-500">Halaman ini sedang dalam pengembangan.</p></div>} />
          <Route path="/admin/pengumuman" element={<div className="p-4 bg-white rounded-xl shadow-sm border border-gray-100"><h2 className="text-xl font-semibold">Pengumuman</h2><p className="mt-2 text-gray-500">Halaman ini sedang dalam pengembangan.</p></div>} />
        </Route>

        {/* Guru Routes */}
        <Route element={<Layout allowedRoles={['GURU']} />}>
          <Route path="/guru" element={<GuruDashboard />} />
          <Route path="/guru/nilai" element={<div className="p-4 bg-white rounded-xl shadow-sm border border-gray-100"><h2 className="text-xl font-semibold">Rekap Nilai & Kehadiran</h2><p className="mt-2 text-gray-500">Halaman ini sedang dalam pengembangan.</p></div>} />
          <Route path="/guru/chat" element={<div className="p-4 bg-white rounded-xl shadow-sm border border-gray-100"><h2 className="text-xl font-semibold">Chat Orang Tua</h2><p className="mt-2 text-gray-500">Halaman ini sedang dalam pengembangan.</p></div>} />
        </Route>

        {/* Orang Tua Routes */}
        <Route element={<Layout allowedRoles={['ORANG_TUA']} />}>
          <Route path="/orang-tua" element={<OrangTuaDashboard />} />
          <Route path="/orang-tua/chat" element={<div className="p-4 bg-white rounded-xl shadow-sm border border-gray-100"><h2 className="text-xl font-semibold">Chat Guru</h2><p className="mt-2 text-gray-500">Halaman ini sedang dalam pengembangan.</p></div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
