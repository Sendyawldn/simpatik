import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { users } from '../data/dummyData';
import { UserCircle, ShieldCheck, GraduationCap, Users, ArrowLeft } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState('');

  const handleLogin = (e) => {
    if (e) e.preventDefault();
    let user;
    if (selectedRole === 'ADMIN') {
      user = users.find(u => u.role === 'ADMIN');
    } else {
      user = users.find(u => u.id === selectedUserId);
    }

    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      if (selectedRole === 'ADMIN') navigate('/admin');
      if (selectedRole === 'GURU') navigate('/guru');
      if (selectedRole === 'ORANG_TUA') navigate('/orang-tua');
    } else {
      alert("Silakan pilih akun terlebih dahulu!");
    }
  };

  const renderFormFields = () => {
    if (selectedRole === 'ADMIN') {
      return (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input type="text" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Masukkan username" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input type="password" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="••••••••" />
          </div>
        </>
      );
    } else if (selectedRole === 'GURU') {
      const guruList = users.filter(u => u.role === 'GURU');
      return (
        <div>
          <label className="block text-sm font-medium text-gray-700">Pilih Akun Guru</label>
          <select 
            required 
            className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
            value={selectedUserId}
            onChange={e => setSelectedUserId(e.target.value)}
          >
            <option value="">-- Pilih Guru --</option>
            {guruList.map(u => (
              <option key={u.id} value={u.id}>{u.nama} ({u.mapel || 'Guru Kelas'})</option>
            ))}
          </select>
        </div>
      );
    } else if (selectedRole === 'ORANG_TUA') {
      const orangTuaList = users.filter(u => u.role === 'ORANG_TUA');
      return (
        <div>
          <label className="block text-sm font-medium text-gray-700">Pilih Akun Orang Tua</label>
          <select 
            required 
            className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
            value={selectedUserId}
            onChange={e => setSelectedUserId(e.target.value)}
          >
            <option value="">-- Pilih Orang Tua --</option>
            {orangTuaList.map(u => (
              <option key={u.id} value={u.id}>{u.nama}</option>
            ))}
          </select>
        </div>
      );
    }
    return null;
  };

  const getRoleTitle = () => {
    if (selectedRole === 'ADMIN') return 'Login Admin';
    if (selectedRole === 'GURU') return 'Login Guru';
    if (selectedRole === 'ORANG_TUA') return 'Login Orang Tua';
    return '';
  };

  const getButtonColor = () => {
    if (selectedRole === 'ADMIN') return 'from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:ring-indigo-500';
    if (selectedRole === 'GURU') return 'from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 focus:ring-teal-500';
    if (selectedRole === 'ORANG_TUA') return 'from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 focus:ring-orange-500';
    return '';
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="flex justify-center text-primary">
          <GraduationCap size={64} />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 tracking-tight">
          Sistem <span className="text-primary">SIMPATIK</span>
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Monitoring Perkembangan Akademik dan Komunikasi
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-white/80 backdrop-blur-lg py-8 px-4 shadow-2xl sm:rounded-2xl sm:px-10 border border-white/20">
          
          {!selectedRole ? (
            <div className="space-y-6">
              <div>
                <p className="text-sm font-medium text-gray-700 text-center mb-4">Pilih Peran Anda:</p>
                
                <button
                  onClick={() => setSelectedRole('ADMIN')}
                  className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all transform hover:scale-[1.02]"
                >
                  <ShieldCheck className="mr-2 h-5 w-5" /> Admin
                </button>
              </div>
              
              <div>
                <button
                  onClick={() => setSelectedRole('GURU')}
                  className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all transform hover:scale-[1.02]"
                >
                  <UserCircle className="mr-2 h-5 w-5" /> Guru
                </button>
              </div>

              <div>
                <button
                  onClick={() => setSelectedRole('ORANG_TUA')}
                  className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all transform hover:scale-[1.02]"
                >
                  <Users className="mr-2 h-5 w-5" /> Orang Tua
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center mb-6">
                <button 
                  onClick={() => {
                    setSelectedRole(null);
                    setSelectedUserId('');
                  }}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
                <h3 className="flex-1 text-center text-lg font-medium text-gray-900 pr-5">
                  {getRoleTitle()}
                </h3>
              </div>
              
              <form onSubmit={handleLogin} className="space-y-6">
                {renderFormFields()}
                
                <button
                  type="submit"
                  className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r ${getButtonColor()} focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all transform hover:scale-[1.02]`}
                >
                  Masuk Sekarang
                </button>
              </form>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Login;
