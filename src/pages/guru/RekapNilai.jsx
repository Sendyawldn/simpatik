import React, { useState, useEffect } from 'react';
import { students, grades as initialGrades, attendance as initialAttendance } from '../../data/dummyData';
import { Save, BookOpen, UserCheck, CheckCircle } from 'lucide-react';

const RekapNilai = () => {
  const [activeTab, setActiveTab] = useState('nilai');
  
  // Data Master State
  const [grades, setGrades] = useState(initialGrades);
  const [attendances, setAttendances] = useState(initialAttendance);

  // Bulk Input State - Nilai
  const [bulkMapel, setBulkMapel] = useState('');
  const [bulkGrades, setBulkGrades] = useState({});

  // Bulk Input State - Absen
  const [bulkDate, setBulkDate] = useState(new Date().toISOString().split('T')[0]);
  const [bulkAbsen, setBulkAbsen] = useState({});

  // Feedback State
  const [successMessage, setSuccessMessage] = useState('');

  // Initialize Bulk Absen with 'Hadir'
  useEffect(() => {
    const initialBulkAbsen = {};
    students.forEach(s => {
      initialBulkAbsen[s.id] = 'Hadir';
    });
    setBulkAbsen(initialBulkAbsen);
  }, []);

  const handleGradeChange = (studentId, value) => {
    setBulkGrades({ ...bulkGrades, [studentId]: value });
  };

  const handleAbsenChange = (studentId, value) => {
    setBulkAbsen({ ...bulkAbsen, [studentId]: value });
  };

  const handleSaveBulkNilai = (e) => {
    e.preventDefault();
    if (!bulkMapel.trim()) {
      alert("Mohon isi Mata Pelajaran terlebih dahulu!");
      return;
    }

    const newGrades = [];
    Object.keys(bulkGrades).forEach(studentId => {
      const scoreStr = bulkGrades[studentId];
      if (scoreStr !== '' && scoreStr !== undefined) {
        newGrades.push({
          id: `N${Date.now()}-${studentId}`,
          id_siswa: studentId,
          mapel: bulkMapel,
          nilai: parseInt(scoreStr),
          semester: 1
        });
      }
    });

    if (newGrades.length === 0) {
      alert("Belum ada nilai yang diinput. Isi setidaknya satu nilai siswa.");
      return;
    }

    setGrades([...grades, ...newGrades]);
    
    // Reset form
    setBulkMapel('');
    setBulkGrades({});
    showSuccessMessage(`Berhasil menyimpan ${newGrades.length} nilai pelajaran ${bulkMapel}.`);
  };

  const handleSaveBulkAbsen = (e) => {
    e.preventDefault();
    if (!bulkDate) return;

    const newAttendances = [];
    Object.keys(bulkAbsen).forEach(studentId => {
      newAttendances.push({
        id: `A${Date.now()}-${studentId}`,
        id_siswa: studentId,
        tanggal: bulkDate,
        status: bulkAbsen[studentId]
      });
    });

    setAttendances([...attendances, ...newAttendances]);
    
    // Reset form (keep default 'Hadir')
    const resetAbsen = {};
    students.forEach(s => { resetAbsen[s.id] = 'Hadir'; });
    setBulkAbsen(resetAbsen);
    
    showSuccessMessage(`Berhasil menyimpan absensi kelas untuk tanggal ${bulkDate}.`);
  };

  const showSuccessMessage = (msg) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const getStudentName = (id) => {
    const student = students.find(s => s.id === id);
    return student ? student.nama : 'Unknown';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Input Nilai & Kehadiran
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Sistem input masal (Bulk Input) untuk mempercepat pekerjaan Guru.
          </p>
        </div>
      </div>

      {successMessage && (
        <div className="bg-green-50 border border-green-200 text-green-800 rounded-xl p-4 flex items-center">
          <CheckCircle className="h-5 w-5 mr-3 text-green-500" />
          <p className="text-sm font-medium">{successMessage}</p>
        </div>
      )}

      <div className="bg-white shadow-sm rounded-xl border border-gray-100 overflow-hidden">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('nilai')}
              className={`${
                activeTab === 'nilai'
                  ? 'border-teal-500 text-teal-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } flex items-center whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors`}
            >
              <BookOpen className={`mr-2 h-5 w-5 ${activeTab === 'nilai' ? 'text-teal-500' : 'text-gray-400'}`} />
              Input Nilai
            </button>
            <button
              onClick={() => setActiveTab('absen')}
              className={`${
                activeTab === 'absen'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } flex items-center whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors`}
            >
              <UserCheck className={`mr-2 h-5 w-5 ${activeTab === 'absen' ? 'text-indigo-500' : 'text-gray-400'}`} />
              Input Kehadiran
            </button>
          </nav>
        </div>

        {/* Tab Content: Nilai */}
        {activeTab === 'nilai' && (
          <div className="p-4 sm:p-6">
            <div className="mb-6 bg-teal-50 border border-teal-100 rounded-lg p-4">
              <label className="block text-sm font-semibold text-teal-900 mb-2">Mata Pelajaran untuk Diinput</label>
              <input 
                type="text" 
                placeholder="Misal: Matematika, Bahasa Indonesia..." 
                className="w-full md:w-1/2 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                value={bulkMapel}
                onChange={e => setBulkMapel(e.target.value)}
              />
            </div>

            <form onSubmit={handleSaveBulkNilai}>
              <div className="overflow-x-auto border border-gray-200 rounded-lg mb-6">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-16">No</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Siswa</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-48">Nilai Angka</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {students.map((student, index) => (
                      <tr key={student.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{student.nama} - {student.kelas}</td>
                        <td className="px-6 py-2 whitespace-nowrap">
                          <input 
                            type="number" 
                            min="0" max="100"
                            placeholder="Kosongkan jika belum"
                            className="w-full border border-gray-300 rounded-md py-1.5 px-3 focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                            value={bulkGrades[student.id] || ''}
                            onChange={(e) => handleGradeChange(student.id, e.target.value)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-end">
                <button 
                  type="submit" 
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-teal-600 hover:bg-teal-700 transition-colors"
                >
                  <Save className="h-5 w-5 mr-2" /> Simpan Semua Nilai
                </button>
              </div>
            </form>

            {/* Riwayat Data */}
            <div className="mt-12">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Riwayat Nilai Tersimpan</h3>
              <div className="overflow-x-auto border border-gray-200 rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Siswa</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mata Pelajaran</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nilai</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {grades.slice().reverse().map((grade) => (
                      <tr key={grade.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{getStudentName(grade.id_siswa)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{grade.mapel}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold">
                          <span className={`px-2 py-1 rounded ${grade.nilai >= 75 ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100'}`}>
                            {grade.nilai}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content: Absen */}
        {activeTab === 'absen' && (
          <div className="p-4 sm:p-6">
            <div className="mb-6 bg-indigo-50 border border-indigo-100 rounded-lg p-4">
              <label className="block text-sm font-semibold text-indigo-900 mb-2">Tanggal Kehadiran</label>
              <input 
                type="date" 
                className="w-full md:w-1/3 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={bulkDate}
                onChange={e => setBulkDate(e.target.value)}
                required
              />
            </div>

            <form onSubmit={handleSaveBulkAbsen}>
              <div className="overflow-x-auto border border-gray-200 rounded-lg mb-6">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-16">No</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Siswa</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-64">Status Kehadiran</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {students.map((student, index) => (
                      <tr key={student.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{student.nama} - {student.kelas}</td>
                        <td className="px-6 py-2 whitespace-nowrap">
                          <select 
                            className="w-full border border-gray-300 rounded-md py-1.5 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white"
                            value={bulkAbsen[student.id] || 'Hadir'}
                            onChange={(e) => handleAbsenChange(student.id, e.target.value)}
                          >
                            <option value="Hadir">🟢 Hadir</option>
                            <option value="Sakit">🟡 Sakit</option>
                            <option value="Izin">🔵 Izin</option>
                            <option value="Alpa">🔴 Alpa</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-end">
                <button 
                  type="submit" 
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
                >
                  <Save className="h-5 w-5 mr-2" /> Simpan Absensi Kelas
                </button>
              </div>
            </form>

            {/* Riwayat Data Absen */}
            <div className="mt-12">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Riwayat Absensi Tersimpan</h3>
              <div className="overflow-x-auto border border-gray-200 rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Siswa</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {attendances.slice().reverse().map((absen) => {
                      let statusColor = 'bg-gray-100 text-gray-800';
                      if (absen.status === 'Hadir') statusColor = 'bg-green-100 text-green-800';
                      else if (absen.status === 'Sakit') statusColor = 'bg-yellow-100 text-yellow-800';
                      else if (absen.status === 'Izin') statusColor = 'bg-blue-100 text-blue-800';
                      else if (absen.status === 'Alpa') statusColor = 'bg-red-100 text-red-800';
                      
                      return (
                        <tr key={absen.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{absen.tanggal}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{getStudentName(absen.id_siswa)}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColor}`}>
                              {absen.status}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default RekapNilai;
