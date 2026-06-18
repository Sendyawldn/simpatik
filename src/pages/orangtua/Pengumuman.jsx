import React, { useState } from 'react';
import { announcements, classAnnouncements } from '../../data/dummyData';
import { Megaphone, Info, Calendar } from 'lucide-react';

const PengumumanOrangTua = () => {
  const [activeTab, setActiveTab] = useState('sekolah');
  const [filterBulan, setFilterBulan] = useState('Semua');

  // Hardcode available months from the dummy data for simplicity
  const bulanList = ['Semua', '12', '11', '10', '09'];
  const getBulanName = (num) => {
    if (num === 'Semua') return 'Semua Bulan';
    const names = { '12': 'Desember', '11': 'November', '10': 'Oktober', '09': 'September' };
    return names[num] || num;
  };

  const filteredSekolah = announcements.filter(a => {
    if (filterBulan === 'Semua') return true;
    return a.tanggal.split('-')[1] === filterBulan;
  });

  const filteredKelas = classAnnouncements.filter(a => {
    if (filterBulan === 'Semua') return true;
    return a.tanggal.split('-')[1] === filterBulan;
  });

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Papan Pengumuman
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Informasi terbaru dari sekolah dan wali kelas.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-gray-300 shadow-sm">
          <Calendar className="h-4 w-4 text-gray-500" />
          <select 
            className="border-none bg-transparent text-sm font-medium text-gray-700 focus:ring-0 cursor-pointer"
            value={filterBulan}
            onChange={e => setFilterBulan(e.target.value)}
          >
            {bulanList.map(b => (
              <option key={b} value={b}>{getBulanName(b)}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-xl border border-gray-100 overflow-hidden">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('sekolah')}
              className={`${
                activeTab === 'sekolah'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors`}
            >
              <Megaphone className={`mr-2 h-5 w-5 ${activeTab === 'sekolah' ? 'text-blue-500' : 'text-gray-400'}`} />
              Pengumuman Sekolah
              <span className={`ml-2 py-0.5 px-2.5 rounded-full text-xs font-medium ${activeTab === 'sekolah' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-900'}`}>
                {filteredSekolah.length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('kelas')}
              className={`${
                activeTab === 'kelas'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors`}
            >
              <Info className={`mr-2 h-5 w-5 ${activeTab === 'kelas' ? 'text-indigo-500' : 'text-gray-400'}`} />
              Pengumuman Kelas
              <span className={`ml-2 py-0.5 px-2.5 rounded-full text-xs font-medium ${activeTab === 'kelas' ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-900'}`}>
                {filteredKelas.length}
              </span>
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'sekolah' && (
            <div className="space-y-4">
              {filteredSekolah.length > 0 ? (
                filteredSekolah.map(a => (
                  <div key={a.id} className="bg-blue-50 border border-blue-100 rounded-xl p-5 shadow-sm transition hover:shadow-md">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-lg text-blue-900">{a.judul}</h4>
                      <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2.5 py-1 rounded-full whitespace-nowrap">
                        {new Date(a.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </span>
                    </div>
                    <p className="text-gray-700 leading-relaxed mt-3">{a.isi}</p>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <Megaphone className="mx-auto h-12 w-12 text-gray-300 mb-3" />
                  <p className="text-gray-500 text-lg">Tidak ada pengumuman sekolah di bulan ini.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'kelas' && (
            <div className="space-y-4">
              {filteredKelas.length > 0 ? (
                filteredKelas.map(a => (
                  <div key={a.id} className="bg-indigo-50 border border-indigo-100 rounded-xl p-5 shadow-sm transition hover:shadow-md relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-indigo-500"></div>
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-lg text-indigo-900">{a.judul}</h4>
                      <span className="text-xs font-medium text-indigo-600 bg-indigo-100 px-2.5 py-1 rounded-full whitespace-nowrap">
                        {new Date(a.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </span>
                    </div>
                    <div className="mb-3">
                      <span className="text-xs font-medium text-gray-500 bg-white border border-gray-200 px-2 py-1 rounded shadow-sm">
                        Dari: {a.guru}
                      </span>
                    </div>
                    <p className="text-gray-700 leading-relaxed mt-2">{a.isi}</p>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <Info className="mx-auto h-12 w-12 text-gray-300 mb-3" />
                  <p className="text-gray-500 text-lg">Tidak ada pengumuman kelas di bulan ini.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PengumumanOrangTua;
