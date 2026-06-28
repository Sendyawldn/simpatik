import { useState, useEffect } from 'react';
import { students, announcements as dummyAnnouncements, classAnnouncements as dummyClassAnnouncements } from '../../data/dummyData';
import { CheckCircle, AlertCircle, FileText, Megaphone, Send, Info, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const GuruDashboard = () => {
  const navigate = useNavigate();
  const [announcements, setAnnouncements] = useState([]);
  const [classAnnouncements, setClassAnnouncements] = useState([]);
  const [newAnnouncement, setNewAnnouncement] = useState({ judul: '', isi: '' });
  const [successMsg, setSuccessMsg] = useState('');
  
  const [bukuPenghubung, setBukuPenghubung] = useState({ id_siswa: '', isi: '' });
  const [successBuku, setSuccessBuku] = useState('');

  useEffect(() => {
    // School announcements
    setAnnouncements(dummyAnnouncements);

    // Class announcements
    setClassAnnouncements(dummyClassAnnouncements);
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
    setNewAnnouncement({ judul: '', isi: '' });

    setSuccessMsg('Pengumuman kelas berhasil dipublikasikan ke Orang Tua.');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleSendBuku = (e) => {
    e.preventDefault();
    if (!bukuPenghubung.id_siswa || !bukuPenghubung.isi) return;
    setSuccessBuku('Pesan Buku Penghubung berhasil dikirim ke orang tua.');
    setTimeout(() => setSuccessBuku(''), 3000);
    setBukuPenghubung({ id_siswa: '', isi: '' });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          Dashboard Wali Kelas
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Selamat datang, Guru Kelas 1A. Berikut adalah ringkasan kelas Anda hari ini.
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
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Presensi Harian */}
        <div className="bg-white shadow-sm rounded-xl border border-gray-100">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-100 flex justify-between items-center">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Presensi Harian Kelas 1A</h3>
            <button className="text-sm bg-indigo-50 text-indigo-600 px-3 py-1 rounded-md hover:bg-indigo-100 font-medium">Simpan Presensi</button>
          </div>
          <div className="overflow-x-auto max-h-[28rem] custom-scrollbar">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 sticky top-0 z-10">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Siswa</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status Kehadiran</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {students.filter(s => s.kelas === '1A').map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm font-medium text-indigo-600 cursor-pointer hover:underline" onClick={() => navigate(`/guru/siswa/${student.id}`)}>{student.nama}</div>
                      <div className="text-xs text-gray-500">NIS: {student.nis}</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-center">
                      <select className="text-sm border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 cursor-pointer bg-white">
                        <option value="Hadir">🟢 Hadir</option>
                        <option value="Sakit">🟡 Sakit</option>
                        <option value="Izin">🔵 Izin</option>
                        <option value="Alpa">🔴 Alpa</option>
                      </select>
                    </td>
                  </tr>
                ))}
                {students.filter(s => s.kelas === '1A').length === 0 && (
                  <tr>
                    <td colSpan="2" className="px-4 py-8 text-center text-sm text-gray-500">Tidak ada siswa di kelas ini</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Buku Penghubung */}
        <div className="bg-white shadow-sm rounded-xl border border-gray-100 flex flex-col">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-indigo-500" />
              <h3 className="text-lg leading-6 font-medium text-gray-900">Buku Penghubung Harian</h3>
            </div>
            <p className="mt-1 text-sm text-gray-500">Kirim pesan singkat langsung ke orang tua siswa.</p>
          </div>
          
          <div className="p-5 flex-1 flex flex-col">
            {successBuku && (
              <div className="mb-4 bg-green-50 border border-green-200 text-green-700 p-3 rounded-lg text-sm flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                {successBuku}
              </div>
            )}
            
            <form onSubmit={handleSendBuku} className="space-y-4 flex-1 flex flex-col">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pilih Siswa</label>
                <select 
                  className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                  value={bukuPenghubung.id_siswa}
                  onChange={e => setBukuPenghubung({...bukuPenghubung, id_siswa: e.target.value})}
                  required
                >
                  <option value="">-- Pilih Siswa --</option>
                  {students.filter(s => s.kelas === '1A').map(s => (
                    <option key={s.id} value={s.id}>{s.nama}</option>
                  ))}
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Catatan ke Orang Tua</label>
                <textarea 
                  rows="6" 
                  placeholder="Misal: Hari ini Budi lupa membawa krayon untuk pelajaran menggambar..." 
                  className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 text-sm resize-none"
                  value={bukuPenghubung.isi}
                  onChange={e => setBukuPenghubung({...bukuPenghubung, isi: e.target.value})}
                  required
                ></textarea>
              </div>
              <button 
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-lg flex items-center justify-center gap-2 transition-colors mt-auto"
              >
                <Send className="w-4 h-4" /> Kirim Pesan
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuruDashboard;
