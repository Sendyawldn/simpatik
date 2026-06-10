import React, { useState, useEffect } from 'react';
import { students, grades as initialGrades, attendance as initialAttendance } from '../../data/dummyData';
import { Save, BookOpen, UserCheck, CheckCircle, MessageSquare, Filter } from 'lucide-react';

const RekapNilai = () => {
  const [activeTab, setActiveTab] = useState('nilai');
  
  // Data Master State
  const [grades, setGrades] = useState(initialGrades);
  const [attendances, setAttendances] = useState(initialAttendance);
  const [behaviorNotes, setBehaviorNotes] = useState([]);

  // Bulk Input State - Nilai
  const [bulkMapel, setBulkMapel] = useState('');
  const [bulkSemester, setBulkSemester] = useState('1');
  const [bulkGrades, setBulkGrades] = useState({});
  const [historySemesterFilter, setHistorySemesterFilter] = useState('Semua');

  // Bulk Input State - Absen
  const [bulkDate, setBulkDate] = useState(new Date().toISOString().split('T')[0]);
  const [bulkAbsenSemester, setBulkAbsenSemester] = useState('1');
  const [bulkAbsen, setBulkAbsen] = useState({});
  const [absenSemesterFilter, setAbsenSemesterFilter] = useState('Semua');

  // Input State - Sikap
  const [sikapFormData, setSikapFormData] = useState({ id_siswa: '', catatan: '' });

  // Feedback State
  const [successMessage, setSuccessMessage] = useState('');

  // Initialize Data
  useEffect(() => {
    // Absen bulk state init
    const initialBulkAbsen = {};
    students.forEach(s => {
      initialBulkAbsen[s.id] = 'Hadir';
    });
    setBulkAbsen(initialBulkAbsen);

    // Load Catatan Sikap from LocalStorage
    const savedNotes = localStorage.getItem('simpatik_behavior_notes');
    if (savedNotes) {
      setBehaviorNotes(JSON.parse(savedNotes));
    }
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
          semester: parseInt(bulkSemester)
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
    showSuccessMessage(`Berhasil menyimpan ${newGrades.length} nilai pelajaran ${bulkMapel} untuk Semester ${bulkSemester}.`);
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
        status: bulkAbsen[studentId],
        semester: parseInt(bulkAbsenSemester)
      });
    });

    setAttendances([...attendances, ...newAttendances]);
    
    // Reset form (keep default 'Hadir')
    const resetAbsen = {};
    students.forEach(s => { resetAbsen[s.id] = 'Hadir'; });
    setBulkAbsen(resetAbsen);
    
    showSuccessMessage(`Berhasil menyimpan absensi kelas untuk tanggal ${bulkDate} (Semester ${bulkAbsenSemester}).`);
  };

  const handleSaveSikap = (e) => {
    e.preventDefault();
    if (!sikapFormData.id_siswa || !sikapFormData.catatan.trim()) return;

    const newNote = {
      id: `B${Date.now()}`,
      id_siswa: sikapFormData.id_siswa,
      tanggal: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
      waktu: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      catatan: sikapFormData.catatan,
      guru: 'Pak Budi' // Mock current teacher
    };

    const updatedNotes = [newNote, ...behaviorNotes];
    setBehaviorNotes(updatedNotes);
    localStorage.setItem('simpatik_behavior_notes', JSON.stringify(updatedNotes));

    setSikapFormData({ id_siswa: '', catatan: '' });
    showSuccessMessage(`Catatan kelakuan berhasil dikirim ke orang tua siswa.`);
  };

  const showSuccessMessage = (msg) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const getStudentName = (id) => {
    const student = students.find(s => s.id === id);
    return student ? student.nama : 'Unknown';
  };

  const filteredGrades = historySemesterFilter === 'Semua' 
    ? grades 
    : grades.filter(g => g.semester === parseInt(historySemesterFilter));

  const filteredAttendances = absenSemesterFilter === 'Semua'
    ? attendances
    : attendances.filter(a => a.semester === parseInt(absenSemesterFilter));

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Input Nilai, Kehadiran & Sikap
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Kelola data akademik dan perilaku siswa kelas Anda.
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
        <div className="border-b border-gray-200 overflow-x-auto">
          <nav className="-mb-px flex space-x-6 px-6 min-w-max" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('nilai')}
              className={`${
                activeTab === 'nilai'
                  ? 'border-teal-500 text-teal-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors`}
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
              } flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors`}
            >
              <UserCheck className={`mr-2 h-5 w-5 ${activeTab === 'absen' ? 'text-indigo-500' : 'text-gray-400'}`} />
              Input Kehadiran
            </button>
            <button
              onClick={() => setActiveTab('sikap')}
              className={`${
                activeTab === 'sikap'
                  ? 'border-pink-500 text-pink-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors`}
            >
              <MessageSquare className={`mr-2 h-5 w-5 ${activeTab === 'sikap' ? 'text-pink-500' : 'text-gray-400'}`} />
              Catatan Sikap
            </button>
          </nav>
        </div>

        {/* Tab Content: Nilai */}
        {activeTab === 'nilai' && (
          <div className="p-4 sm:p-6">
            <div className="mb-6 bg-teal-50 border border-teal-100 rounded-lg p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-teal-900 mb-2">Mata Pelajaran untuk Diinput</label>
                <input 
                  type="text" 
                  placeholder="Misal: Matematika, Bahasa Indonesia..." 
                  className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                  value={bulkMapel}
                  onChange={e => setBulkMapel(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-teal-900 mb-2">Pilih Semester</label>
                <select 
                  className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-teal-500 focus:border-teal-500 sm:text-sm bg-white"
                  value={bulkSemester}
                  onChange={e => setBulkSemester(e.target.value)}
                >
                  <option value="1">Semester 1 (Ganjil)</option>
                  <option value="2">Semester 2 (Genap)</option>
                  <option value="3">Semester 3 (Ganjil)</option>
                  <option value="4">Semester 4 (Genap)</option>
                  <option value="5">Semester 5 (Ganjil)</option>
                  <option value="6">Semester 6 (Genap)</option>
                </select>
              </div>
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
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
                <h3 className="text-lg font-medium text-gray-900">Riwayat Nilai Tersimpan</h3>
                <div className="flex items-center bg-white border border-gray-300 rounded-md shadow-sm">
                  <span className="pl-3 text-gray-500">
                    <Filter className="h-4 w-4" />
                  </span>
                  <select 
                    className="border-none focus:ring-0 py-2 pl-2 pr-8 sm:text-sm text-gray-700 rounded-md"
                    value={historySemesterFilter}
                    onChange={e => setHistorySemesterFilter(e.target.value)}
                  >
                    <option value="Semua">Semua Semester</option>
                    <option value="1">Semester 1</option>
                    <option value="2">Semester 2</option>
                    <option value="3">Semester 3</option>
                    <option value="4">Semester 4</option>
                    <option value="5">Semester 5</option>
                    <option value="6">Semester 6</option>
                  </select>
                </div>
              </div>
              <div className="overflow-x-auto border border-gray-200 rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Siswa</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mata Pelajaran</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Semester</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nilai</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredGrades.length > 0 ? (
                      filteredGrades.slice().reverse().map((grade) => (
                        <tr key={grade.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{getStudentName(grade.id_siswa)}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{grade.mapel}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Semester {grade.semester}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-bold">
                            <span className={`px-2 py-1 rounded ${grade.nilai >= 75 ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100'}`}>
                              {grade.nilai}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="px-6 py-8 text-center text-sm text-gray-500">
                          Tidak ada riwayat nilai untuk {historySemesterFilter === 'Semua' ? 'semua semester' : `Semester ${historySemesterFilter}`}.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content: Absen */}
        {activeTab === 'absen' && (
          <div className="p-4 sm:p-6">
            <div className="mb-6 bg-indigo-50 border border-indigo-100 rounded-lg p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-indigo-900 mb-2">Tanggal Kehadiran</label>
                <input 
                  type="date" 
                  className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={bulkDate}
                  onChange={e => setBulkDate(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-indigo-900 mb-2">Pilih Semester</label>
                <select 
                  className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white"
                  value={bulkAbsenSemester}
                  onChange={e => setBulkAbsenSemester(e.target.value)}
                >
                  <option value="1">Semester 1 (Ganjil)</option>
                  <option value="2">Semester 2 (Genap)</option>
                  <option value="3">Semester 3 (Ganjil)</option>
                  <option value="4">Semester 4 (Genap)</option>
                  <option value="5">Semester 5 (Ganjil)</option>
                  <option value="6">Semester 6 (Genap)</option>
                </select>
              </div>
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
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
                <h3 className="text-lg font-medium text-gray-900">Riwayat Absensi Tersimpan</h3>
                <div className="flex items-center bg-white border border-gray-300 rounded-md shadow-sm">
                  <span className="pl-3 text-gray-500">
                    <Filter className="h-4 w-4" />
                  </span>
                  <select 
                    className="border-none focus:ring-0 py-2 pl-2 pr-8 sm:text-sm text-gray-700 rounded-md"
                    value={absenSemesterFilter}
                    onChange={e => setAbsenSemesterFilter(e.target.value)}
                  >
                    <option value="Semua">Semua Semester</option>
                    <option value="1">Semester 1</option>
                    <option value="2">Semester 2</option>
                    <option value="3">Semester 3</option>
                    <option value="4">Semester 4</option>
                    <option value="5">Semester 5</option>
                    <option value="6">Semester 6</option>
                  </select>
                </div>
              </div>
              <div className="overflow-x-auto border border-gray-200 rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Semester</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Siswa</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredAttendances.length > 0 ? (
                      filteredAttendances.slice().reverse().map((absen) => {
                        let statusColor = 'bg-gray-100 text-gray-800';
                        if (absen.status === 'Hadir') statusColor = 'bg-green-100 text-green-800';
                        else if (absen.status === 'Sakit') statusColor = 'bg-yellow-100 text-yellow-800';
                        else if (absen.status === 'Izin') statusColor = 'bg-blue-100 text-blue-800';
                        else if (absen.status === 'Alpa') statusColor = 'bg-red-100 text-red-800';
                        
                        return (
                          <tr key={absen.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{absen.tanggal}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Semester {absen.semester}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{getStudentName(absen.id_siswa)}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColor}`}>
                                {absen.status}
                              </span>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="4" className="px-6 py-8 text-center text-sm text-gray-500">
                          Tidak ada riwayat kehadiran untuk {absenSemesterFilter === 'Semua' ? 'semua semester' : `Semester ${absenSemesterFilter}`}.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content: Sikap */}
        {activeTab === 'sikap' && (
          <div className="p-4 sm:p-6">
            <div className="bg-pink-50 rounded-xl border border-pink-200 p-5 mb-8">
              <h3 className="text-lg font-medium text-pink-900 mb-4">Kirim Laporan Sikap Siswa</h3>
              <p className="text-sm text-pink-700 mb-5">Catatan yang Anda tulis di sini akan langsung terlihat di Dashboard Orang Tua dari siswa yang bersangkutan.</p>
              
              <form onSubmit={handleSaveSikap} className="space-y-4">
                <div className="md:w-1/2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pilih Siswa</label>
                  <select 
                    required 
                    className="block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-pink-500 focus:border-pink-500 sm:text-sm" 
                    value={sikapFormData.id_siswa} 
                    onChange={e => setSikapFormData({...sikapFormData, id_siswa: e.target.value})}
                  >
                    <option value="">-- Pilih Siswa --</option>
                    {students.map(s => (
                      <option key={s.id} value={s.id}>{s.nama} ({s.kelas})</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Catatan Kelakuan / Sikap Anak</label>
                  <textarea 
                    required 
                    rows={4}
                    placeholder="Contoh: Andi hari ini sangat aktif di kelas, tapi mohon diingatkan untuk lebih fokus saat pelajaran Matematika..."
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-pink-500 focus:border-pink-500 sm:text-sm" 
                    value={sikapFormData.catatan} 
                    onChange={e => setSikapFormData({...sikapFormData, catatan: e.target.value})}
                  />
                </div>
                
                <button type="submit" className="inline-flex items-center justify-center px-6 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 transition-colors">
                  <MessageSquare className="h-4 w-4 mr-2" /> Kirim Catatan ke Orang Tua
                </button>
              </form>
            </div>

            {/* Riwayat Catatan Sikap */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Riwayat Catatan Kelakuan Terkirim</h3>
              <div className="space-y-4">
                {behaviorNotes.length > 0 ? (
                  behaviorNotes.map((note) => (
                    <div key={note.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm flex flex-col sm:flex-row gap-4">
                      <div className="sm:w-1/4">
                        <p className="font-semibold text-gray-900">{getStudentName(note.id_siswa)}</p>
                        <p className="text-xs text-gray-500">{note.tanggal} - {note.waktu}</p>
                      </div>
                      <div className="sm:w-3/4">
                        <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-md border border-gray-100">"{note.catatan}"</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                    <p className="text-sm text-gray-500">Belum ada catatan sikap yang dikirim.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default RekapNilai;
