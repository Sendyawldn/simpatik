import React, { useState } from 'react';
import { students, grades as initialGrades, attendance as initialAttendance } from '../../data/dummyData';
import { Save, Plus, BookOpen, UserCheck } from 'lucide-react';

const RekapNilai = () => {
  const [activeTab, setActiveTab] = useState('nilai');
  
  // Nilai State
  const [grades, setGrades] = useState(initialGrades);
  const [isNilaiFormOpen, setIsNilaiFormOpen] = useState(false);
  const [nilaiFormData, setNilaiFormData] = useState({ id_siswa: '', mapel: '', nilai: '' });

  // Absen State
  const [attendances, setAttendances] = useState(initialAttendance);
  const [isAbsenFormOpen, setIsAbsenFormOpen] = useState(false);
  const [absenFormData, setAbsenFormData] = useState({ id_siswa: '', tanggal: new Date().toISOString().split('T')[0], status: 'Hadir' });

  // Handlers
  const handleSaveNilai = (e) => {
    e.preventDefault();
    const newGrade = {
      id: `N${Date.now()}`,
      id_siswa: nilaiFormData.id_siswa,
      mapel: nilaiFormData.mapel,
      nilai: parseInt(nilaiFormData.nilai),
      semester: 1
    };
    setGrades([...grades, newGrade]);
    setIsNilaiFormOpen(false);
    setNilaiFormData({ id_siswa: '', mapel: '', nilai: '' });
  };

  const handleSaveAbsen = (e) => {
    e.preventDefault();
    const newAbsen = {
      id: `A${Date.now()}`,
      id_siswa: absenFormData.id_siswa,
      tanggal: absenFormData.tanggal,
      status: absenFormData.status
    };
    setAttendances([...attendances, newAbsen]);
    setIsAbsenFormOpen(false);
    setAbsenFormData({ id_siswa: '', tanggal: new Date().toISOString().split('T')[0], status: 'Hadir' });
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
            Rekap Nilai & Kehadiran
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Kelola data akademik dan absensi siswa kelas Anda.
          </p>
        </div>
        
        {activeTab === 'nilai' ? (
          <button
            onClick={() => setIsNilaiFormOpen(!isNilaiFormOpen)}
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 transition-colors"
          >
            {isNilaiFormOpen ? 'Tutup Form' : <><Plus className="h-5 w-5 mr-2 -ml-1" /> Input Nilai Baru</>}
          </button>
        ) : (
          <button
            onClick={() => setIsAbsenFormOpen(!isAbsenFormOpen)}
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
          >
            {isAbsenFormOpen ? 'Tutup Form' : <><Plus className="h-5 w-5 mr-2 -ml-1" /> Input Absen Baru</>}
          </button>
        )}
      </div>

      <div className="bg-white shadow-sm rounded-xl border border-gray-100 overflow-hidden">
        
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6" aria-label="Tabs">
            <button
              onClick={() => { setActiveTab('nilai'); setIsAbsenFormOpen(false); }}
              className={`${
                activeTab === 'nilai'
                  ? 'border-teal-500 text-teal-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } flex items-center whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors`}
            >
              <BookOpen className={`mr-2 h-5 w-5 ${activeTab === 'nilai' ? 'text-teal-500' : 'text-gray-400'}`} />
              Rekap Nilai
            </button>
            <button
              onClick={() => { setActiveTab('absen'); setIsNilaiFormOpen(false); }}
              className={`${
                activeTab === 'absen'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } flex items-center whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors`}
            >
              <UserCheck className={`mr-2 h-5 w-5 ${activeTab === 'absen' ? 'text-indigo-500' : 'text-gray-400'}`} />
              Rekap Kehadiran
            </button>
          </nav>
        </div>

        {/* Tab Content: Nilai */}
        {activeTab === 'nilai' && (
          <div className="p-4 sm:p-6">
            {isNilaiFormOpen && (
              <div className="bg-gray-50 rounded-xl border border-gray-200 p-5 mb-6 transition-all">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Form Input Nilai</h3>
                <form onSubmit={handleSaveNilai} className="space-y-4 sm:flex sm:space-y-0 sm:gap-4 items-end">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700">Siswa</label>
                    <select required className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-teal-500 focus:border-teal-500 sm:text-sm" value={nilaiFormData.id_siswa} onChange={e => setNilaiFormData({...nilaiFormData, id_siswa: e.target.value})}>
                      <option value="">Pilih Siswa</option>
                      {students.map(s => (
                        <option key={s.id} value={s.id}>{s.nama} ({s.kelas})</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700">Mata Pelajaran</label>
                    <input type="text" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-teal-500 focus:border-teal-500 sm:text-sm" value={nilaiFormData.mapel} onChange={e => setNilaiFormData({...nilaiFormData, mapel: e.target.value})} />
                  </div>
                  <div className="w-24">
                    <label className="block text-sm font-medium text-gray-700">Nilai</label>
                    <input type="number" min="0" max="100" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-teal-500 focus:border-teal-500 sm:text-sm" value={nilaiFormData.nilai} onChange={e => setNilaiFormData({...nilaiFormData, nilai: e.target.value})} />
                  </div>
                  <button type="submit" className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700">
                    <Save className="h-4 w-4 mr-2" /> Simpan
                  </button>
                </form>
              </div>
            )}

            <div className="overflow-x-auto border border-gray-200 rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Siswa</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mata Pelajaran</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nilai</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Semester</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {grades.length > 0 ? grades.map((grade) => (
                    <tr key={grade.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{getStudentName(grade.id_siswa)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{grade.mapel}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-bold">
                        <span className={`px-2 py-1 rounded ${grade.nilai >= 75 ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100'}`}>
                          {grade.nilai}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{grade.semester}</td>
                    </tr>
                  )) : (
                    <tr><td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">Belum ada data nilai</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab Content: Absen */}
        {activeTab === 'absen' && (
          <div className="p-4 sm:p-6">
            {isAbsenFormOpen && (
              <div className="bg-gray-50 rounded-xl border border-gray-200 p-5 mb-6 transition-all">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Form Input Kehadiran</h3>
                <form onSubmit={handleSaveAbsen} className="space-y-4 sm:flex sm:space-y-0 sm:gap-4 items-end">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700">Siswa</label>
                    <select required className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" value={absenFormData.id_siswa} onChange={e => setAbsenFormData({...absenFormData, id_siswa: e.target.value})}>
                      <option value="">Pilih Siswa</option>
                      {students.map(s => (
                        <option key={s.id} value={s.id}>{s.nama} ({s.kelas})</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700">Tanggal</label>
                    <input type="date" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" value={absenFormData.tanggal} onChange={e => setAbsenFormData({...absenFormData, tanggal: e.target.value})} />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <select required className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" value={absenFormData.status} onChange={e => setAbsenFormData({...absenFormData, status: e.target.value})}>
                      <option value="Hadir">Hadir</option>
                      <option value="Sakit">Sakit</option>
                      <option value="Izin">Izin</option>
                      <option value="Alpa">Alpa</option>
                    </select>
                  </div>
                  <button type="submit" className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                    <Save className="h-4 w-4 mr-2" /> Simpan
                  </button>
                </form>
              </div>
            )}

            <div className="overflow-x-auto border border-gray-200 rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Siswa</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status Kehadiran</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {attendances.length > 0 ? attendances.map((absen) => {
                    let statusColor = 'bg-gray-100 text-gray-800';
                    if (absen.status === 'Hadir') statusColor = 'bg-green-100 text-green-800';
                    else if (absen.status === 'Sakit') statusColor = 'bg-yellow-100 text-yellow-800';
                    else if (absen.status === 'Izin') statusColor = 'bg-blue-100 text-blue-800';
                    else if (absen.status === 'Alpa') statusColor = 'bg-red-100 text-red-800';
                    
                    return (
                      <tr key={absen.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{getStudentName(absen.id_siswa)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{absen.tanggal}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColor}`}>
                            {absen.status}
                          </span>
                        </td>
                      </tr>
                    );
                  }) : (
                    <tr><td colSpan="3" className="px-6 py-4 text-center text-sm text-gray-500">Belum ada data kehadiran</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default RekapNilai;
