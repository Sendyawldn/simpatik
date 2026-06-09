import { useNavigate } from 'react-router-dom';
import { users } from '../data/dummyData';
import { UserCircle, ShieldCheck, GraduationCap, Users } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (role) => {
    const user = users.find(u => u.role === role);
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      if (role === 'ADMIN') navigate('/admin');
      if (role === 'GURU') navigate('/guru');
      if (role === 'ORANG_TUA') navigate('/orang-tua');
    }
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
          <div className="space-y-6">
            <div>
              <p className="text-sm font-medium text-gray-700 text-center mb-4">Masuk Sebagai:</p>
              
              <button
                onClick={() => handleLogin('ADMIN')}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all transform hover:scale-[1.02]"
              >
                <ShieldCheck className="mr-2 h-5 w-5" /> Admin
              </button>
            </div>
            
            <div>
              <button
                onClick={() => handleLogin('GURU')}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all transform hover:scale-[1.02]"
              >
                <UserCircle className="mr-2 h-5 w-5" /> Guru
              </button>
            </div>

            <div>
              <button
                onClick={() => handleLogin('ORANG_TUA')}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all transform hover:scale-[1.02]"
              >
                <Users className="mr-2 h-5 w-5" /> Orang Tua
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
