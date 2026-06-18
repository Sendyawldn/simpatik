import React, { useState } from 'react';
import { students as initialStudents, users as initialUsers, mapelList } from '../../data/dummyData';
import { Plus, Edit2, Trash2, Search, Users, GraduationCap } from 'lucide-react';

const MasterData = () => {
  const [activeTab, setActiveTab] = useState('siswa');
  const [students, setStudents] = useState(initialStudents);
  const [teachers, setTeachers] = useState(initialUsers.filter(u => u.role === 'GURU'));
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterKelas, setFilterKelas] = useState('Semua');
  
  // Modal states
  const [isSiswaModalOpen, setIsSiswaModalOpen] = useState(false);
  const [isGuruModalOpen, setIsGuruModalOpen] = useState(false);
  
  const [siswaFormData, setSiswaFormData] = useState({ nis: '', nama: '', kelas: '', id_orangtua: '' });
  const [guruFormData, setGuruFormData] = useState({ nuptk: '', nama: '', mapel: '' });

  // Filtering
  let finalStudents = students.filter(s => 
    s.nama.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.nis.includes(searchTerm)
  );

  if (filterKelas !== 'Semua') {
    finalStudents = finalStudents.filter(s => s.kelas === filterKelas);
  }

  // Sort and group students by Kelas
  finalStudents.sort((a, b) => a.kelas.localeCompare(b.kelas) || a.nama.localeCompare(b.nama));
  
  const groupedStudents = {};
  finalStudents.forEach(s => {
    if (!groupedStudents[s.kelas]) groupedStudents[s.kelas] = [];
    groupedStudents[s.kelas].push(s);
  });
  
  const filteredTeachers = teachers.filter(t => 
    t.nama.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (t.nuptk && t.nuptk.includes(searchTerm))
  );

  // Delete handlers
  const handleDeleteSiswa = (id) => {
    if (window.confirm('Yakin ingin menghapus data siswa ini?')) {
      setStudents(students.filter(s => s.id !== id));
    }
  };

  const handleDeleteGuru = (id) => {
    if (window.confirm('Yakin ingin menghapus data guru ini?')) {
      setTeachers(teachers.filter(t => t.id !== id));
    }
  };

  // Save handlers
  const handleSaveSiswa = (e) => {
    e.preventDefault();
    const newStudent = {
      id: `S${Date.now()}`,
      ...siswaFormData
    };
    setStudents([...students, newStudent]);
    setIsSiswaModalOpen(false);
    setSiswaFormData({ nis: '', nama: '', kelas: '', id_orangtua: '' });
  };

  const handleSaveGuru = (e) => {
    e.preventDefault();
    const newTeacher = {
      id: `U${Date.now()}`,
      role: 'GURU',
      nuptk: guruFormData.nuptk,
      nama: guruFormData.nama,
      mapel: guruFormData.mapel
    };
    setTeachers([...teachers, newTeacher]);
    setIsGuruModalOpen(false);
    setGuruFormData({ nuptk: '', nama: '', mapel: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Master Data
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Kelola data induk siswa dan guru.
          </p>
        </div>
        
        {activeTab === 'siswa' ? (
          <button
            onClick={() => setIsSiswaModalOpen(true)}
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
          >
            <Plus className="h-5 w-5 mr-2 -ml-1" />
            Tambah Siswa
          </button>
        ) : (
          <button
            onClick={() => setIsGuruModalOpen(true)}
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 transition-colors"
          >
            <Plus className="h-5 w-5 mr-2 -ml-1" />
            Tambah Guru
          </button>
        )}
      </div>

      <div className="bg-white shadow-sm rounded-xl border border-gray-100 overflow-hidden">
        
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6" aria-label="Tabs">
            <button
              onClick={() => { setActiveTab('siswa'); setSearchTerm(''); }}
              className={`${
                activeTab === 'siswa'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } flex items-center whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors`}
            >
              <GraduationCap className={`mr-2 h-5 w-5 ${activeTab === 'siswa' ? 'text-indigo-500' : 'text-gray-400'}`} />
              Data Siswa
            </button>
            <button
              onClick={() => { setActiveTab('guru'); setSearchTerm(''); }}
              className={`${
                activeTab === 'guru'
                  ? 'border-teal-500 text-teal-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } flex items-center whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors`}
            >
              <Users className={`mr-2 h-5 w-5 ${activeTab === 'guru' ? 'text-teal-500' : 'text-gray-400'}`} />
              Data Guru
            </button>
          </nav>
        </div>

        <div className="p-4 border-b border-gray-100 bg-gray-50 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="relative w-full max-w-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder={`Cari ${activeTab === 'siswa' ? 'nama atau NIS...' : 'nama atau NUPTK...'}`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          {activeTab === 'siswa' && (
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">Filter Kelas:</span>
              <select 
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                value={filterKelas}
                onChange={e => setFilterKelas(e.target.value)}
              >
                <option value="Semua">Semua Kelas</option>
                <option value="1">Kelas 1</option>
                <option value="2">Kelas 2</option>
                <option value="3">Kelas 3</option>
                <option value="4">Kelas 4</option>
                <option value="5">Kelas 5</option>
                <option value="6">Kelas 6</option>
              </select>
            </div>
          )}
        </div>

        {/* Tabel Siswa */}
        {activeTab === 'siswa' && (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NIS</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Siswa</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kelas</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {Object.keys(groupedStudents).length > 0 ? (
                  Object.keys(groupedStudents).map(kelas => (
                    <React.Fragment key={kelas}>
                      {/* Section Header untuk Kelas */}
                      <tr className="bg-indigo-50">
                        <td colSpan="4" className="px-6 py-2 text-left text-sm font-bold text-indigo-800">
                          Kelas {kelas}
                        </td>
                      </tr>
                      {groupedStudents[kelas].map((student) => (
                        <tr key={student.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{student.nis}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.nama}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Kelas {student.kelas}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-indigo-600 hover:text-indigo-900 mr-3">
                              <Edit2 className="h-4 w-4 inline" />
                            </button>
                            <button onClick={() => handleDeleteSiswa(student.id)} className="text-red-600 hover:text-red-900">
                              <Trash2 className="h-4 w-4 inline" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">Tidak ada data siswa ditemukan</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Tabel Guru */}
        {activeTab === 'guru' && (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NUPTK</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Guru</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mata Pelajaran</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTeachers.length > 0 ? (
                  filteredTeachers.map((teacher) => (
                    <tr key={teacher.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{teacher.nuptk || '-'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{teacher.nama}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {teacher.mapel && teacher.mapel !== 'Guru Kelas' ? `Guru Bidang ${teacher.mapel}` : 'Guru Kelas'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-teal-600 hover:text-teal-900 mr-3">
                          <Edit2 className="h-4 w-4 inline" />
                        </button>
                        <button onClick={() => handleDeleteGuru(teacher.id)} className="text-red-600 hover:text-red-900">
                          <Trash2 className="h-4 w-4 inline" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="px-6 py-4 text-center text-sm text-gray-500">Tidak ada data guru ditemukan</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal Tambah Siswa */}
      {isSiswaModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={() => setIsSiswaModalOpen(false)}></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleSaveSiswa}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Tambah Data Siswa</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">NIS</label>
                      <input type="text" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" value={siswaFormData.nis} onChange={e => setSiswaFormData({...siswaFormData, nis: e.target.value})} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Nama Siswa</label>
                      <input type="text" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" value={siswaFormData.nama} onChange={e => setSiswaFormData({...siswaFormData, nama: e.target.value})} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Kelas</label>
                      <select required className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" value={siswaFormData.kelas} onChange={e => setSiswaFormData({...siswaFormData, kelas: e.target.value})}>
                        <option value="">Pilih Kelas</option>
                        <option value="1">Kelas 1</option>
                        <option value="2">Kelas 2</option>
                        <option value="3">Kelas 3</option>
                        <option value="4">Kelas 4</option>
                        <option value="5">Kelas 5</option>
                        <option value="6">Kelas 6</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button type="submit" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm">
                    Simpan Siswa
                  </button>
                  <button type="button" onClick={() => setIsSiswaModalOpen(false)} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                    Batal
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Modal Tambah Guru */}
      {isGuruModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={() => setIsGuruModalOpen(false)}></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleSaveGuru}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Tambah Data Guru</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">NUPTK</label>
                      <input type="text" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-teal-500 focus:border-teal-500 sm:text-sm" value={guruFormData.nuptk} onChange={e => setGuruFormData({...guruFormData, nuptk: e.target.value})} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Nama Guru</label>
                      <input type="text" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-teal-500 focus:border-teal-500 sm:text-sm" value={guruFormData.nama} onChange={e => setGuruFormData({...guruFormData, nama: e.target.value})} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Mata Pelajaran yang Diajarkan</label>
                      <select required className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-teal-500 focus:border-teal-500 sm:text-sm" value={guruFormData.mapel} onChange={e => setGuruFormData({...guruFormData, mapel: e.target.value})}>
                        <option value="">Pilih Mata Pelajaran</option>
                        <option value="Guru Kelas">Guru Kelas</option>
                        {mapelList.map((m, i) => (
                          <option key={i} value={m}>{m}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button type="submit" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-teal-600 text-base font-medium text-white hover:bg-teal-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm">
                    Simpan Guru
                  </button>
                  <button type="button" onClick={() => setIsGuruModalOpen(false)} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                    Batal
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default MasterData;
