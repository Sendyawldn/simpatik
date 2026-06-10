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
import { grades as dummyGrades, attendance as dummyAttendance, announcements as dummyAnnouncements, behaviorNotes as dummyBehaviorNotes } from '../../data/dummyData';
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
  const [classAnnouncements, setClassAnnouncements] = useState([]);
  const [behaviorNote, setBehaviorNote] = useState(null);
  
  // Custom states for data to combine dummy and local storage
  const [allGrades, setAllGrades] = useState(dummyGrades);
  const [allAttendance, setAllAttendance] = useState(dummyAttendance);
  const [selectedSemester, setSelectedSemester] = useState('1');

  // In a real app, this is determined by user login.
  // For dummy data, we assume this OrangTua is the parent of "Andi" (S01).
  const childId = 'S01'; 
  const childName = 'Andi Wijaya';

  useEffect(() => {
    // Load school announcements
    const savedAnnouncements = localStorage.getItem('simpatik_announcements');
    if (savedAnnouncements) {
      setAnnouncements(JSON.parse(savedAnnouncements));
    } else {
      setAnnouncements(dummyAnnouncements);
    }

    // Load class announcements
    const savedClassAnnouncements = localStorage.getItem('simpatik_class_announcements');
    if (savedClassAnnouncements) {
      setClassAnnouncements(JSON.parse(savedClassAnnouncements));
    } else {
      import('../../data/dummyData').then(mod => {
        setClassAnnouncements(mod.classAnnouncements || []);
      });
    }

    // Load behavior notes for the child
    const savedNotes = localStorage.getItem('simpatik_behavior_notes');
    let parsedNotes = [];
    if (savedNotes) {
      parsedNotes = JSON.parse(savedNotes);
    } else {
      parsedNotes = dummyBehaviorNotes;
    }
    const childNotes = parsedNotes.filter(n => n.id_siswa === childId);
    if (childNotes.length > 0) {
      setBehaviorNote(childNotes[0]);
    }
  }, []);
  
  // Filter grades and attendance for current child and selected semester
  const childGrades = allGrades.filter(g => g.id_siswa === childId && g.semester === parseInt(selectedSemester));
  const childAttendance = allAttendance.filter(a => a.id_siswa === childId && a.semester === parseInt(selectedSemester));

  // Chart Data: Grades
  const gradeData = {
    labels: childGrades.map(g => g.mapel),
    datasets: [
      {
        label: `Nilai Semester ${selectedSemester}`,
        data: childGrades.map(g => g.nilai),
        backgroundColor: 'rgba(79, 70, 229, 0.6)',
      },
    ],
  };

  // Chart Data: Attendance Summary (Counts of Hadir, Sakit, Izin, Alpa)
  const hadirCount = childAttendance.filter(a => a.status === 'Hadir').length;
  const sakitCount = childAttendance.filter(a => a.status === 'Sakit').length;
  const izinCount = childAttendance.filter(a => a.status === 'Izin').length;
  const alpaCount = childAttendance.filter(a => a.status === 'Alpa').length;

  const attendanceData = {
    labels: ['Hadir', 'Sakit', 'Izin', 'Alpa'],
    datasets: [
      {
        label: `Total Hari (Sem ${selectedSemester})`,
        data: [hadirCount, sakitCount, izinCount, alpaCount],
        backgroundColor: [
          'rgba(16, 185, 129, 0.6)', // Green for Hadir
          'rgba(245, 158, 11, 0.6)', // Yellow for Sakit
          'rgba(59, 130, 246, 0.6)', // Blue for Izin
          'rgba(239, 68, 68, 0.6)'   // Red for Alpa
        ],
      },
    ],
  };

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
        <div>
          <h2 className="text-2xl font-bold">Halo, {currentUser.nama || 'Orang Tua'}</h2>
          <p className="mt-1 opacity-90">Berikut adalah perkembangan anak Anda, {childName}.</p>
        </div>
        
        {/* Global Semester Filter for the Dashboard */}
        <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm border border-white/30 flex items-center gap-3">
          <span className="text-sm font-medium">Tampilkan Data:</span>
          <select 
            className="text-sm border-none rounded-md py-1.5 px-3 focus:ring-2 focus:ring-white bg-white text-indigo-900 font-semibold cursor-pointer"
            value={selectedSemester}
            onChange={e => setSelectedSemester(e.target.value)}
          >
            <option value="1">Semester 1</option>
            <option value="2">Semester 2</option>
            <option value="3">Semester 3</option>
            <option value="4">Semester 4</option>
            <option value="5">Semester 5</option>
            <option value="6">Semester 6</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pengumuman Sekolah Section */}
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

        {/* Pengumuman Kelas Section */}
        {classAnnouncements.length > 0 && (
          <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <Info className="h-5 w-5 text-indigo-600" />
              <h3 className="text-md font-semibold text-indigo-800">Pengumuman Kelas (Dari Guru)</h3>
            </div>
            <div className="space-y-3">
              {classAnnouncements.slice(0, 2).map((a) => (
                <div key={a.id} className="bg-white rounded-xl p-4 shadow-sm border border-indigo-50 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
                  <h4 className="font-semibold text-gray-900">{a.judul}</h4>
                  <div className="flex items-center justify-between mt-1 mb-2">
                    <p className="text-xs text-gray-400">{a.tanggal}</p>
                    <p className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">{a.guru}</p>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">{a.isi}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Grafik Nilai */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Capaian Akademik</h3>
            <span className="text-xs font-medium bg-indigo-100 text-indigo-800 px-2 py-1 rounded-md">Semester {selectedSemester}</span>
          </div>
          
          <div className="h-72 relative w-full">
            {childGrades.length > 0 ? (
              <Bar data={gradeData} options={{ maintainAspectRatio: false }} />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm border-2 border-dashed border-gray-100 rounded-xl">
                Belum ada data nilai untuk Semester {selectedSemester}.
              </div>
            )}
          </div>
        </div>

        {/* Grafik Kehadiran */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Rekapitulasi Kehadiran</h3>
            <span className="text-xs font-medium bg-green-100 text-green-800 px-2 py-1 rounded-md">Semester {selectedSemester}</span>
          </div>
          
          <div className="h-72 relative w-full">
            {childAttendance.length > 0 ? (
              <Bar data={attendanceData} options={{ maintainAspectRatio: false }} />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm border-2 border-dashed border-gray-100 rounded-xl">
                Belum ada data absensi untuk Semester {selectedSemester}.
              </div>
            )}
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
