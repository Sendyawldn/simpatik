import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { students, users, grades, attendance, behaviorNotes } from '../../data/dummyData';
import { ArrowLeft, User, BookOpen, Clock, AlertTriangle } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ProfilSiswa = () => {
  const { studentId } = useParams();
  const navigate = useNavigate();

  // Ambil data siswa
  const student = students.find(s => s.id === studentId);
  
  if (!student) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-700">Siswa tidak ditemukan</h2>
        <button onClick={() => navigate(-1)} className="mt-4 text-indigo-600 hover:underline">Kembali</button>
      </div>
    );
  }

  // Cari nama orang tua
  const parent = users.find(u => u.id === student.id_orangtua);

  // Ambil data nilai
  const studentGrades = grades.filter(g => g.id_siswa === studentId);
  const mapelList = [...new Set(studentGrades.map(g => g.mapel))];
  
  // Rata-rata nilai per mapel untuk grafik
  const avgGrades = mapelList.map(mapel => {
    const mGrades = studentGrades.filter(g => g.mapel === mapel);
    const sum = mGrades.reduce((acc, curr) => acc + curr.nilai, 0);
    return Math.round(sum / mGrades.length) || 0;
  });

  const chartData = {
    labels: mapelList,
    datasets: [
      {
        label: 'Rata-rata Nilai',
        data: avgGrades,
        backgroundColor: 'rgba(99, 102, 241, 0.6)',
        borderColor: 'rgba(99, 102, 241, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
      title: { display: false }
    },
    scales: {
      y: { min: 0, max: 100 }
    }
  };

  // Ambil absen dan sikap
  const studentAttendance = attendance.filter(a => a.id_siswa === studentId);
  const studentNotes = behaviorNotes.filter(n => n.id_siswa === studentId);

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      <div className="flex items-center gap-4 mb-6">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-50 border border-gray-200"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Profil Siswa</h2>
          <p className="text-sm text-gray-500">Detail akademik dan catatan khusus</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Biodata Singkat */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 lg:col-span-1">
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
              <User className="w-12 h-12 text-indigo-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">{student.nama}</h3>
            <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-sm font-medium rounded-full mt-2">
              Kelas {student.kelas}
            </span>
          </div>
          <div className="space-y-4 pt-4 border-t border-gray-100">
            <div>
              <p className="text-sm text-gray-500">NIS</p>
              <p className="font-semibold text-gray-900">{student.nis}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Nama Orang Tua</p>
              <p className="font-semibold text-gray-900">{parent ? parent.nama : '-'}</p>
            </div>
          </div>
        </div>

        {/* Grafik Nilai */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 lg:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-indigo-500" />
            <h3 className="text-lg font-semibold text-gray-800">Rata-rata Nilai Mata Pelajaran</h3>
          </div>
          <div className="h-64">
            {mapelList.length > 0 ? (
              <Bar data={chartData} options={chartOptions} />
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400">Belum ada data nilai</div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Tabel Riwayat Absen */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-indigo-500" />
            <h3 className="text-lg font-semibold text-gray-800">Riwayat Kehadiran</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tanggal</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {studentAttendance.length > 0 ? (
                  studentAttendance.slice().reverse().slice(0, 5).map(absen => {
                    let statusBadge = '';
                    if (absen.status === 'Hadir') statusBadge = 'bg-green-100 text-green-800';
                    else if (absen.status === 'Sakit') statusBadge = 'bg-yellow-100 text-yellow-800';
                    else if (absen.status === 'Izin') statusBadge = 'bg-blue-100 text-blue-800';
                    else if (absen.status === 'Alpa') statusBadge = 'bg-red-100 text-red-800';

                    return (
                      <tr key={absen.id}>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                          {new Date(absen.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusBadge}`}>
                            {absen.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="2" className="px-4 py-6 text-center text-sm text-gray-400">Belum ada riwayat absensi</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Riwayat Catatan Sikap */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            <h3 className="text-lg font-semibold text-gray-800">Catatan Perilaku & Sikap</h3>
          </div>
          <div className="space-y-4">
            {studentNotes.length > 0 ? (
              studentNotes.map(note => (
                <div key={note.id} className="bg-amber-50 border border-amber-100 p-4 rounded-xl">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-medium text-amber-800 bg-amber-200 px-2 py-1 rounded">
                      {note.tanggal}
                    </span>
                    <span className="text-xs text-amber-600">Oleh: {note.guru}</span>
                  </div>
                  <p className="text-sm text-gray-800">{note.catatan}</p>
                </div>
              ))
            ) : (
              <div className="text-center py-6 text-gray-400">
                <p className="text-sm">Tidak ada catatan perilaku untuk siswa ini.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilSiswa;
