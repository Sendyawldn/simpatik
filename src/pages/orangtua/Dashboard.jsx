import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import { grades, attendance, announcements as dummyAnnouncements } from '../../data/dummyData';
import { Bell, MessageSquare, Megaphone, Info } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const OrangTuaDashboard = () => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
  const [announcements, setAnnouncements] = useState([]);
  const [behaviorNote, setBehaviorNote] = useState(null);

  // In a real app, this is determined by user login.
  // For dummy data, we assume this OrangTua is the parent of "Andi" (S01).
  const childId = 'S01'; 
  const childName = 'Andi';

  useEffect(() => {
    // Load announcements
    const savedAnnouncements = localStorage.getItem('simpatik_announcements');
    if (savedAnnouncements) {
      setAnnouncements(JSON.parse(savedAnnouncements));
    } else {
      setAnnouncements(dummyAnnouncements);
    }

    // Load behavior notes for the child
    const savedNotes = localStorage.getItem('simpatik_behavior_notes');
    if (savedNotes) {
      const parsedNotes = JSON.parse(savedNotes);
      // Find the most recent note for this child
      const childNotes = parsedNotes.filter(n => n.id_siswa === childId);
      if (childNotes.length > 0) {
        setBehaviorNote(childNotes[0]);
      }
    }
  }, []);
  
  // Data dummy chart
  const gradeData = {
    labels: grades.filter(g => g.id_siswa === childId).map(g => g.mapel),
    datasets: [
      {
        label: 'Nilai Semester 1',
        data: grades.filter(g => g.id_siswa === childId).map(g => g.nilai),
        backgroundColor: 'rgba(79, 70, 229, 0.6)',
      },
    ],
  };

  const attendanceData = {
    labels: ['Okt 01', 'Okt 02', 'Okt 03', 'Okt 04', 'Okt 05'],
    datasets: [
      {
        label: 'Tingkat Kehadiran (%)',
        data: [100, 100, 80, 85, 95],
        borderColor: 'rgba(16, 185, 129, 1)',
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
        <h2 className="text-2xl font-bold">Halo, {currentUser.nama || 'Orang Tua'}</h2>
        <p className="mt-1 opacity-90">Berikut adalah perkembangan anak Anda, {childName}.</p>
      </div>

      {/* Pengumuman Section */}
      {announcements.length > 0 && (
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Megaphone className="h-5 w-5 text-blue-600" />
            <h3 className="text-md font-semibold text-blue-800">Pengumuman Sekolah</h3>
          </div>
          <div className="space-y-3">
            {announcements.slice(0, 2).map((a) => (
              <div key={a.id} className="bg-white rounded-xl p-4 shadow-sm border border-blue-50">
                <h4 className="font-semibold text-gray-900">{a.judul}</h4>
                <p className="text-xs text-gray-400 mb-2">{a.tanggal}</p>
                <p className="text-sm text-gray-700 leading-relaxed">{a.isi}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Laporan Perilaku / Catatan Guru Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-1 h-full bg-pink-500"></div>
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="text-pink-500 w-5 h-5" />
            <h3 className="text-lg font-semibold text-gray-800">Catatan Perilaku & Sikap</h3>
          </div>
        </div>
        <div className="p-5 bg-pink-50/30">
          {behaviorNote ? (
            <div>
              <p className="text-sm text-gray-800 italic bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                "{behaviorNote.catatan}"
              </p>
              <div className="mt-3 flex justify-between items-center text-xs text-gray-500">
                <span>Dari: {behaviorNote.guru}</span>
                <span>{behaviorNote.tanggal} - {behaviorNote.waktu}</span>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3 text-gray-500">
              <Info className="w-5 h-5 text-blue-400" />
              <p className="text-sm">Belum ada catatan sikap terbaru dari guru untuk saat ini.</p>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Grafik Nilai</h3>
          <div className="h-64">
            <Bar data={gradeData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Grafik Kehadiran</h3>
          <div className="h-64">
            <Line data={attendanceData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
      </div>
      
      {/* Mobile Fab for Chat */}
      <button className="md:hidden fixed bottom-6 right-6 bg-pink-500 text-white p-4 rounded-full shadow-lg hover:bg-pink-600 transition-colors z-50">
        <MessageSquare className="w-6 h-6" />
      </button>
    </div>
  );
};

export default OrangTuaDashboard;
