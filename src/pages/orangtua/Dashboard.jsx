import React from 'react';
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
import { grades, attendance } from '../../data/dummyData';
import { Bell, MessageSquare } from 'lucide-react';

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
  
  // Data dummy chart
  const gradeData = {
    labels: grades.filter(g => g.id_siswa === 'S01').map(g => g.mapel),
    datasets: [
      {
        label: 'Nilai Semester 1',
        data: grades.filter(g => g.id_siswa === 'S01').map(g => g.nilai),
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
        <h2 className="text-2xl font-bold">Halo, {currentUser.nama}</h2>
        <p className="mt-1 opacity-90">Berikut adalah perkembangan anak Anda, Andi.</p>
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

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800">Catatan Guru</h3>
          <Bell className="text-indigo-500 w-5 h-5" />
        </div>
        <div className="p-4 bg-indigo-50/50">
          <p className="text-sm text-gray-700">"Andi sangat aktif di kelas hari ini dan berhasil menjawab beberapa pertanyaan matematika dengan baik." - Pak Budi</p>
          <span className="text-xs text-gray-500 mt-2 block">Hari ini, 10:30 WIB</span>
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
