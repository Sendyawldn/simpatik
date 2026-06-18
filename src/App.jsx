import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import AdminDashboard from './pages/admin/Dashboard';
import MasterData from './pages/admin/MasterData';
import Pengumuman from './pages/admin/Pengumuman';
import GuruDashboard from './pages/guru/Dashboard';
import RekapNilai from './pages/guru/RekapNilai';
import ProfilSiswa from './pages/guru/ProfilSiswa';
import OrangTuaDashboard from './pages/orangtua/Dashboard';
import PengumumanOrangTua from './pages/orangtua/Pengumuman';
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
          <Route path="/admin/pengumuman" element={<Pengumuman />} />
        </Route>

        {/* Guru Routes */}
        <Route element={<Layout allowedRoles={['GURU']} />}>
          <Route path="/guru" element={<GuruDashboard />} />
          <Route path="/guru/nilai" element={<RekapNilai />} />
          <Route path="/guru/siswa/:studentId" element={<ProfilSiswa />} />
          <Route path="/guru/chat" element={<Chat />} />
        </Route>

        {/* Orang Tua Routes */}
        <Route element={<Layout allowedRoles={['ORANG_TUA']} />}>
          <Route path="/orang-tua" element={<OrangTuaDashboard />} />
          <Route path="/orang-tua/pengumuman" element={<PengumumanOrangTua />} />
          <Route path="/orang-tua/chat" element={<Chat />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
