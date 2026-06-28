import { useState, useEffect } from 'react';
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
import { Bar } from 'react-chartjs-2';
import { grades as dummyGrades, attendance as dummyAttendance, announcements as dummyAnnouncements, students as dummyStudents, bukuPenghubungData, characterStats } from '../../data/dummyData';
import { MessageSquare, Megaphone, Info, CheckCircle, Star, Clock, Send } from 'lucide-react';

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

  
  // Custom states for data to combine dummy and local storage
  const [allGrades, setAllGrades] = useState(dummyGrades);
  const [allAttendance, setAllAttendance] = useState(dummyAttendance);
  const [selectedKelas, setSelectedKelas] = useState('5A');
  const [selectedSemester, setSelectedSemester] = useState('1');

  const [bukuPenghubung, setBukuPenghubung] = useState([]);
  const [characterData, setCharacterData] = useState(null);
  const [todayAttendance, setTodayAttendance] = useState(null);

  const myChildren = dummyStudents.filter(s => s.id_orangtua === currentUser.id);
  const [selectedChildId, setSelectedChildId] = useState(myChildren.length > 0 ? myChildren[0].id : null);
  const selectedChild = myChildren.find(s => s.id === selectedChildId) || { nama: 'Siswa', id: '' };

  const childId = selectedChild.id; 
  const childName = selectedChild.nama;

  useEffect(() => {
    // Load school announcements
    setAnnouncements(dummyAnnouncements);

    // Load class announcements
    import('../../data/dummyData').then(mod => {
      setClassAnnouncements(mod.classAnnouncements || []);
    });



    // Load Grades
    setAllGrades(dummyGrades);

    // Load Attendance
    setAllAttendance(dummyAttendance);
    
    // Load character stats
    const stats = characterStats.find(s => s.id_siswa === childId);
    setCharacterData(stats || { kedisiplinan: 4, kebersihan: 4, sikap: 4 });

    // Load buku penghubung
    const bp = bukuPenghubungData.filter(b => b.id_siswa === childId);
    setBukuPenghubung(bp);

    // Get latest attendance
    const childAtt = dummyAttendance.filter(a => a.id_siswa === childId);
    if (childAtt.length > 0) {
      const sorted = childAtt.sort((a,b) => new Date(b.tanggal) - new Date(a.tanggal));
      setTodayAttendance(sorted[0]);
    }
  }, [childId]);
  
  // Filter grades and attendance for current child and selected semester
  const childGrades = allGrades.filter(g => g.id_siswa === childId && g.kelas === selectedKelas && g.semester === selectedSemester);
  const childAttendance = allAttendance.filter(a => a.id_siswa === childId && a.kelas === selectedKelas && a.semester === selectedSemester);

  // Chart Data: Grades
  const gradeData = {
    labels: childGrades.map(g => g.mapel),
    datasets: [
      {
        label: `Nilai Kelas ${selectedKelas} Semester ${selectedSemester}`,
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
        label: `Total Hari (Kls ${selectedKelas} Sem ${selectedSemester})`,
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

  // Grouping grades for Detail Table
  const groupedGrades = {};
  childGrades.forEach(g => {
    if (!groupedGrades[g.mapel]) {
      groupedGrades[g.mapel] = { PR: '-', UH: '-', UTS: '-', UAS: '-' };
    }
    groupedGrades[g.mapel][g.tipe || 'UH'] = g.nilai;
  });

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
        <div>
          <h2 className="text-2xl font-bold">Halo, {currentUser.nama || 'Orang Tua'}</h2>
          <div className="mt-2 flex items-center gap-2">
            <span className="opacity-90">Perkembangan:</span>
            {myChildren.length > 1 ? (
              <select 
                className="text-sm border-none rounded-md py-1 px-2 focus:ring-2 focus:ring-white bg-white/20 text-white font-semibold cursor-pointer outline-none"
                value={selectedChildId}
                onChange={e => setSelectedChildId(e.target.value)}
              >
                {myChildren.map(child => (
                  <option key={child.id} value={child.id} className="text-indigo-900">{child.nama}</option>
                ))}
              </select>
            ) : (
              <span className="font-semibold">{childName}</span>
            )}
          </div>
        </div>
        
        {/* Global Filter for the Dashboard */}
        <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm border border-white/30 flex items-center gap-3">
          <span className="text-sm font-medium">Data Kelas:</span>
          <select 
            className="text-sm border-none rounded-md py-1.5 px-3 focus:ring-2 focus:ring-white bg-white text-indigo-900 font-semibold cursor-pointer"
            value={selectedKelas}
            onChange={e => setSelectedKelas(e.target.value)}
          >
            <option value="1A">Kelas 1A</option>
            <option value="2A">Kelas 2A</option>
            <option value="3A">Kelas 3A</option>
            <option value="4A">Kelas 4A</option>
            <option value="5A">Kelas 5A</option>
            <option value="6A">Kelas 6A</option>
          </select>
          <span className="text-sm font-medium">Semester:</span>
          <select 
            className="text-sm border-none rounded-md py-1.5 px-3 focus:ring-2 focus:ring-white bg-white text-indigo-900 font-semibold cursor-pointer"
            value={selectedSemester}
            onChange={e => setSelectedSemester(e.target.value)}
          >
            <option value="1">Smt 1</option>
            <option value="2">Smt 2</option>
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

      {/* Status Kehadiran Hari Ini */}
      {todayAttendance && (
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-full ${todayAttendance.status === 'Hadir' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
              {todayAttendance.status === 'Hadir' ? <CheckCircle className="w-6 h-6" /> : <Clock className="w-6 h-6" />}
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800">Status Kehadiran Hari Ini: {todayAttendance.status}</h3>
              {todayAttendance.status === 'Hadir' && todayAttendance.waktu && (
                <p className="text-sm text-gray-500">Tiba di sekolah pukul {todayAttendance.waktu} WIB</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Buku Penghubung Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
        <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-indigo-50/30">
          <div className="flex items-center gap-2">
            <MessageSquare className="text-indigo-600 w-5 h-5" />
            <h3 className="text-lg font-semibold text-gray-800">Buku Penghubung</h3>
          </div>
        </div>
        <div className="p-5 space-y-4">
          {bukuPenghubung.length > 0 ? (
            <div className="space-y-4 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
              {bukuPenghubung.map(msg => (
                <div key={msg.id} className={`flex flex-col ${msg.pengirim === 'OrangTua' ? 'items-end' : 'items-start'}`}>
                  <div className={`max-w-[85%] rounded-2xl p-3 ${msg.pengirim === 'OrangTua' ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-gray-100 text-gray-800 rounded-bl-none'}`}>
                    <p className="text-xs opacity-70 mb-1">{msg.nama_pengirim}</p>
                    <p className="text-sm">{msg.isi}</p>
                  </div>
                  <span className="text-[10px] text-gray-400 mt-1">{msg.tanggal}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-4 text-sm text-gray-500">Belum ada pesan di buku penghubung.</div>
          )}
          
          {/* Reply Form */}
          <div className="mt-4 flex items-center gap-2">
            <input type="text" placeholder="Balas pesan guru..." className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:ring-indigo-500 focus:border-indigo-500" />
            <button className="bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700">
              <Send className="w-4 h-4 ml-[-2px]" />
            </button>
          </div>
        </div>
      </div>

      {/* Raport Karakter Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-1 h-full bg-yellow-400"></div>
        <div className="p-4 border-b border-gray-100 flex items-center gap-2 bg-yellow-50/30">
          <Star className="text-yellow-500 w-5 h-5" />
          <h3 className="text-lg font-semibold text-gray-800">Raport Karakter & Perkembangan</h3>
        </div>
        <div className="p-5">
          {characterData ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-yellow-50 rounded-xl p-4 text-center border border-yellow-100">
                <p className="text-sm font-semibold text-yellow-800 mb-2">Kedisiplinan</p>
                <div className="flex justify-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-5 h-5 ${i < characterData.kedisiplinan ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} />
                  ))}
                </div>
              </div>
              <div className="bg-green-50 rounded-xl p-4 text-center border border-green-100">
                <p className="text-sm font-semibold text-green-800 mb-2">Kebersihan</p>
                <div className="flex justify-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-5 h-5 ${i < characterData.kebersihan ? 'text-green-500 fill-green-500' : 'text-gray-300'}`} />
                  ))}
                </div>
              </div>
              <div className="bg-blue-50 rounded-xl p-4 text-center border border-blue-100">
                <p className="text-sm font-semibold text-blue-800 mb-2">Sikap & Sopan Santun</p>
                <div className="flex justify-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-5 h-5 ${i < characterData.sikap ? 'text-blue-500 fill-blue-500' : 'text-gray-300'}`} />
                  ))}
                </div>
              </div>
            </div>
          ) : (
             <p className="text-sm text-gray-500">Data karakter belum tersedia.</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Grafik Nilai */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Capaian Akademik</h3>
            <span className="text-xs font-medium bg-indigo-100 text-indigo-800 px-2 py-1 rounded-md">Kelas {selectedKelas} | Smt {selectedSemester}</span>
          </div>
          
          <div className="h-72 relative w-full">
            {childGrades.length > 0 ? (
              <Bar data={gradeData} options={{ maintainAspectRatio: false }} />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm border-2 border-dashed border-gray-100 rounded-xl">
                Belum ada data nilai untuk Kelas {selectedKelas} Semester {selectedSemester}.
              </div>
            )}
          </div>
        </div>

        {/* Grafik Kehadiran */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Rekapitulasi Kehadiran</h3>
            <span className="text-xs font-medium bg-green-100 text-green-800 px-2 py-1 rounded-md">Kelas {selectedKelas} | Smt {selectedSemester}</span>
          </div>
          
          <div className="h-72 relative w-full">
            {childAttendance.length > 0 ? (
              <Bar data={attendanceData} options={{ maintainAspectRatio: false }} />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm border-2 border-dashed border-gray-100 rounded-xl">
                Belum ada data absensi untuk Kelas {selectedKelas} Semester {selectedSemester}.
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Detail Nilai Per Mapel */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 overflow-x-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">📚 Detail Nilai</h3>
            <span className="text-xs font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded-md">Kelas {selectedKelas} | Smt {selectedSemester}</span>
          </div>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mata Pelajaran</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">PR</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">UH</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">UTS</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">UAS</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {Object.keys(groupedGrades).length > 0 ? (
                Object.entries(groupedGrades).map(([mapel, scores]) => (
                  <tr key={mapel} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{mapel}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-center text-gray-500">{scores.PR}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-center text-gray-500">{scores.UH}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-center text-gray-500">{scores.UTS}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-center text-gray-500">{scores.UAS}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-4 py-6 text-center text-sm text-gray-400">Belum ada detail nilai</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Timeline Absen Harian */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 overflow-x-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">📅 Riwayat Kehadiran Harian</h3>
          </div>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tanggal</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {childAttendance.length > 0 ? (
                childAttendance.slice().reverse().slice(0, 10).map(absen => {
                  let statusBadge = '';
                  if (absen.status === 'Hadir') statusBadge = 'bg-green-100 text-green-800';
                  else if (absen.status === 'Sakit') statusBadge = 'bg-yellow-100 text-yellow-800';
                  else if (absen.status === 'Izin') statusBadge = 'bg-blue-100 text-blue-800';
                  else if (absen.status === 'Alpa') statusBadge = 'bg-red-100 text-red-800';

                  return (
                    <tr key={absen.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 font-medium">
                        {new Date(absen.tanggal).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' })}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusBadge}`}>
                          {absen.status === 'Hadir' && '🟢'}
                          {absen.status === 'Sakit' && '🟡'}
                          {absen.status === 'Izin' && '🔵'}
                          {absen.status === 'Alpa' && '🔴'}
                          <span className="ml-1">{absen.status}</span>
                        </span>
                      </td>
                    </tr>
                  )
                })
              ) : (
                <tr>
                  <td colSpan="2" className="px-4 py-6 text-center text-sm text-gray-400">Belum ada riwayat absensi</td>
                </tr>
              )}
            </tbody>
          </table>
          {childAttendance.length > 10 && (
            <div className="mt-4 text-center">
              <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">Lihat Semua</button>
            </div>
          )}
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
