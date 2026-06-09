import React, { useState } from 'react';
import { students, grades as initialGrades } from '../../data/dummyData';
import { Save, Plus } from 'lucide-react';

const RekapNilai = () => {
  const [grades, setGrades] = useState(initialGrades);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({ id_siswa: '', mapel: '', nilai: '' });

  const handleSave = (e) => {
    e.preventDefault();
    const newGrade = {
      id: `N${Date.now()}`,
      id_siswa: formData.id_siswa,
      mapel: formData.mapel,
      nilai: parseInt(formData.nilai),
      semester: 1
    };
    setGrades([...grades, newGrade]);
    setIsFormOpen(false);
    setFormData({ id_siswa: '', mapel: '', nilai: '' });
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
            Rekap Nilai Siswa
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Kelola dan input nilai mata pelajaran siswa.
          </p>
        </div>
        <button
          onClick={() => setIsFormOpen(!isFormOpen)}
          className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700"
        >
          {isFormOpen ? 'Tutup Form' : <><Plus className="h-5 w-5 mr-2 -ml-1" /> Input Nilai Baru</>}
        </button>
      </div>

      {isFormOpen && (
        <div className="bg-white shadow-sm rounded-xl border border-gray-100 p-6 mb-6 transition-all">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Form Input Nilai</h3>
          <form onSubmit={handleSave} className="space-y-4 sm:flex sm:space-y-0 sm:gap-4 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">Siswa</label>
              <select required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-teal-500 focus:border-teal-500 sm:text-sm" value={formData.id_siswa} onChange={e => setFormData({...formData, id_siswa: e.target.value})}>
                <option value="">Pilih Siswa</option>
                {students.map(s => (
                  <option key={s.id} value={s.id}>{s.nama} ({s.kelas})</option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">Mata Pelajaran</label>
              <input type="text" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-teal-500 focus:border-teal-500 sm:text-sm" value={formData.mapel} onChange={e => setFormData({...formData, mapel: e.target.value})} />
            </div>
            <div className="w-24">
              <label className="block text-sm font-medium text-gray-700">Nilai</label>
              <input type="number" min="0" max="100" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-teal-500 focus:border-teal-500 sm:text-sm" value={formData.nilai} onChange={e => setFormData({...formData, nilai: e.target.value})} />
            </div>
            <button type="submit" className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700">
              <Save className="h-4 w-4 mr-2" /> Simpan
            </button>
          </form>
        </div>
      )}

      <div className="bg-white shadow-sm rounded-xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
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
              {grades.map((grade) => (
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RekapNilai;
