import React, { useState, useEffect } from 'react';
import { students, grades, announcements as dummyAnnouncements, classAnnouncements as dummyClassAnnouncements } from '../../data/dummyData';
import { CheckCircle, AlertCircle, FileText, Megaphone, Send, Info } from 'lucide-react';

const GuruDashboard = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [classAnnouncements, setClassAnnouncements] = useState([]);
  const [newAnnouncement, setNewAnnouncement] = useState({ judul: '', isi: '' });
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    // School announcements
    const saved = localStorage.getItem('simpatik_announcements');
    if (saved) {
      setAnnouncements(JSON.parse(saved));
    } else {
      setAnnouncements(dummyAnnouncements);
    }

    // Class announcements
    const savedClass = localStorage.getItem('simpatik_class_announcements');
    if (savedClass) {
      setClassAnnouncements(JSON.parse(savedClass));
    } else {
      setClassAnnouncements(dummyClassAnnouncements);
    }
  }, []);

  const handlePostAnnouncement = (e) => {
    e.preventDefault();
    if (!newAnnouncement.judul.trim() || !newAnnouncement.isi.trim()) return;

    const newObj = {
      id: `CP${Date.now()}`,
      judul: newAnnouncement.judul,
      tanggal: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
      isi: newAnnouncement.isi,
      guru: "Pak Budi Santoso"
    };

    const updated = [newObj, ...classAnnouncements];
    setClassAnnouncements(updated);
    localStorage.setItem('simpatik_class_announcements', JSON.stringify(updated));
    setNewAnnouncement({ judul: '', isi: '' });

    setSuccessMsg('Pengumuman kelas berhasil dipublikasikan ke Orang Tua.');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          Dashboard Guru
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Selamat datang. Berikut adalah ringkasan kelas Anda hari ini.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="bg-white overflow-hidden shadow-sm rounded-xl border border-gray-100 p-5 flex items-center">
          <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
            <CheckCircle className="h-6 w-6 text-blue-600" />
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">Siswa Hadir</dt>
              <dd className="text-2xl font-semibold text-gray-900">28</dd>
            </dl>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow-sm rounded-xl border border-gray-100 p-5 flex items-center">
          <div className="flex-shrink-0 bg-red-100 rounded-md p-3">
            <AlertCircle className="h-6 w-6 text-red-600" />
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">Siswa Absen</dt>
              <dd className="text-2xl font-semibold text-gray-900">2</dd>
            </dl>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow-sm rounded-xl border border-gray-100 p-5 flex items-center">
          <div className="flex-shrink-0 bg-yellow-100 rounded-md p-3">
            <FileText className="h-6 w-6 text-yellow-600" />
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">Tugas Masuk</dt>
              <dd className="text-2xl font-semibold text-gray-900">15</dd>
            </dl>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Fitur Buat Pengumuman Kelas */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Megaphone className="h-5 w-5 text-indigo-500" />
              <h3 className="text-lg font-semibold text-gray-900">Buat Pengumuman Kelas</h3>
            </div>
          </div>
          
          <p className="text-sm text-gray-500 mb-4">
            Pesan yang Anda tulis di sini akan tampil di Dashboard semua Orang Tua siswa di kelas Anda.
          </p>

          {successMsg && (
            <div className="mb-4 bg-green-50 border border-green-200 text-green-700 p-3 rounded-lg text-sm flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              {successMsg}
            </div>
          )}

          <form onSubmit={handlePostAnnouncement} className="space-y-4 flex-1 flex flex-col">
            <div>
              <input 
                type="text" 
                placeholder="Judul Pengumuman (misal: Iuran Uang Kas)" 
                className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                value={newAnnouncement.judul}
                onChange={e => setNewAnnouncement({...newAnnouncement, judul: e.target.value})}
                required
              />
            </div>
            <div className="flex-1">
              <textarea 
                rows="4" 
                placeholder="Isi pengumuman lengkap..." 
                className="w-full h-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 text-sm resize-none"
                value={newAnnouncement.isi}
                onChange={e => setNewAnnouncement({...newAnnouncement, isi: e.target.value})}
                required
              ></textarea>
            </div>
            <button 
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <Send className="w-4 h-4" /> Kirim ke Orang Tua
            </button>
          </form>
        </div>

        {/* List Pengumuman Sekolah (Global) */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Info className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-blue-800">Pengumuman dari Sekolah</h3>
          </div>
          <div className="space-y-3 overflow-y-auto max-h-80 pr-2 custom-scrollbar">
            {announcements.length > 0 ? (
              announcements.map((a) => (
                <div key={a.id} className="bg-white rounded-lg p-4 shadow-sm border border-blue-50">
                  <h4 className="font-semibold text-gray-900">{a.judul}</h4>
                  <p className="text-xs text-gray-400 mb-2">{a.tanggal}</p>
                  <p className="text-sm text-gray-700 leading-relaxed">{a.isi}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 italic text-center py-4">Belum ada pengumuman sekolah.</p>
            )}
          </div>
        </div>
      </div>
      
      <div className="bg-white shadow-sm rounded-xl border border-gray-100">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-100">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Daftar Siswa Kelas Anda</h3>
        </div>
        <ul className="divide-y divide-gray-100">
          {students.map((student) => (
            <li key={student.id} className="p-4 hover:bg-gray-50 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-indigo-600">{student.nama}</p>
                <p className="text-sm text-gray-500">NIS: {student.nis} • Kelas: {student.kelas}</p>
              </div>
              <button className="text-sm text-blue-600 font-medium hover:text-blue-800">Lihat Detail</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GuruDashboard;
