import React, { useState, useEffect } from 'react';
import { students, grades, announcements as dummyAnnouncements } from '../../data/dummyData';
import { CheckCircle, AlertCircle, FileText, Megaphone } from 'lucide-react';

const GuruDashboard = () => {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('simpatik_announcements');
    if (saved) {
      setAnnouncements(JSON.parse(saved));
    } else {
      setAnnouncements(dummyAnnouncements);
    }
  }, []);

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

      {/* Pengumuman Section */}
      {announcements.length > 0 && (
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Megaphone className="h-5 w-5 text-blue-600" />
            <h3 className="text-md font-semibold text-blue-800">Pengumuman Terbaru</h3>
          </div>
          <div className="space-y-3">
            {announcements.slice(0, 2).map((a) => (
              <div key={a.id} className="bg-white rounded-lg p-3 shadow-sm border border-blue-50">
                <h4 className="font-medium text-gray-900">{a.judul}</h4>
                <p className="text-xs text-gray-400 mb-1">{a.tanggal}</p>
                <p className="text-sm text-gray-700">{a.isi}</p>
              </div>
            ))}
          </div>
        </div>
      )}

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
