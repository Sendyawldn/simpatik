import React, { useState, useEffect } from 'react';
import { announcements as dummyAnnouncements } from '../../data/dummyData';
import { Megaphone, Plus, Trash2 } from 'lucide-react';

const Pengumuman = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ judul: '', isi: '' });

  useEffect(() => {
    const saved = localStorage.getItem('simpatik_announcements');
    if (saved) {
      setAnnouncements(JSON.parse(saved));
    } else {
      setAnnouncements(dummyAnnouncements);
      localStorage.setItem('simpatik_announcements', JSON.stringify(dummyAnnouncements));
    }
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    const newAnnouncement = {
      id: `P${Date.now()}`,
      judul: formData.judul,
      isi: formData.isi,
      tanggal: new Date().toISOString().split('T')[0]
    };
    const updated = [newAnnouncement, ...announcements];
    setAnnouncements(updated);
    localStorage.setItem('simpatik_announcements', JSON.stringify(updated));
    setIsModalOpen(false);
    setFormData({ judul: '', isi: '' });
  };

  const handleDelete = (id) => {
    if (window.confirm('Hapus pengumuman ini?')) {
      const updated = announcements.filter(a => a.id !== id);
      setAnnouncements(updated);
      localStorage.setItem('simpatik_announcements', JSON.stringify(updated));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Pengumuman Sekolah
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Kelola pengumuman yang akan dilihat oleh Guru dan Orang Tua.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-5 w-5 mr-2 -ml-1" />
          Buat Pengumuman
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {announcements.length > 0 ? (
          announcements.map((item) => (
            <div key={item.id} className="bg-white shadow-sm rounded-xl border border-gray-100 p-6 flex items-start gap-4 transition-all hover:shadow-md">
              <div className="bg-blue-100 text-blue-600 p-3 rounded-full flex-shrink-0">
                <Megaphone className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold text-gray-900">{item.judul}</h3>
                  <button onClick={() => handleDelete(item.id)} className="text-red-500 hover:text-red-700 p-1">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
                <p className="text-sm text-gray-400 mb-2">{item.tanggal}</p>
                <p className="text-gray-700">{item.isi}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
            <Megaphone className="mx-auto h-12 w-12 text-gray-300" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">Belum ada pengumuman</h3>
            <p className="mt-1 text-sm text-gray-500">Mulai buat pengumuman baru untuk membagikan informasi.</p>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={() => setIsModalOpen(false)}></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleSave}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Buat Pengumuman Baru</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Judul Pengumuman</label>
                      <input type="text" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm" value={formData.judul} onChange={e => setFormData({...formData, judul: e.target.value})} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Isi Pengumuman</label>
                      <textarea required rows={4} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm" value={formData.isi} onChange={e => setFormData({...formData, isi: e.target.value})} />
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button type="submit" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm">
                    Publikasikan
                  </button>
                  <button type="button" onClick={() => setIsModalOpen(false)} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
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

export default Pengumuman;
