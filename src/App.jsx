import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import AdminDashboard from './pages/admin/Dashboard';
import MasterData from './pages/admin/MasterData';
import GuruDashboard from './pages/guru/Dashboard';
import RekapNilai from './pages/guru/RekapNilai';
import OrangTuaDashboard from './pages/orangtua/Dashboard';
import Chat from './pages/Chat';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        
        {/* Admin Routes */}
        <Route element={<Layout allowedRoles={['ADMIN']} />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/master" element={<MasterData />} />
          <Route path="/admin/pengumuman" element={<div className="p-4 bg-white rounded-xl shadow-sm border border-gray-100"><h2 className="text-xl font-semibold">Pengumuman</h2><p className="mt-2 text-gray-500">Halaman ini sedang dalam pengembangan.</p></div>} />
        </Route>

        {/* Guru Routes */}
        <Route element={<Layout allowedRoles={['GURU']} />}>
          <Route path="/guru" element={<GuruDashboard />} />
          <Route path="/guru/nilai" element={<RekapNilai />} />
          <Route path="/guru/chat" element={<Chat />} />
        </Route>

        {/* Orang Tua Routes */}
        <Route element={<Layout allowedRoles={['ORANG_TUA']} />}>
          <Route path="/orang-tua" element={<OrangTuaDashboard />} />
          <Route path="/orang-tua/chat" element={<Chat />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
