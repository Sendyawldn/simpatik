import React, { useState } from 'react';
import { Outlet, Navigate, Link, useLocation, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { Home, Bell, MessageCircle, LogOut } from 'lucide-react';

const Layout = ({ allowedRoles }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  if (!currentUser) {
    if (location.pathname.startsWith('/orang-tua')) {
      return <Navigate to="/login-ortu" replace />;
    }
    return <Navigate to="/" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
    if (location.pathname.startsWith('/orang-tua')) {
      return <Navigate to="/login-ortu" replace />;
    }
    return <Navigate to="/" replace />;
  }

  const isOrangTua = currentUser.role === 'ORANG_TUA';

  if (isOrangTua) {
    const navItems = [
      { name: 'Beranda', path: '/orang-tua', icon: Home },
      { name: 'Pengumuman', path: '/orang-tua/pengumuman', icon: Bell },
      { name: 'Obrolan', path: '/orang-tua/chat', icon: MessageCircle },
    ];

    const handleLogout = () => {
      localStorage.removeItem('currentUser');
      navigate('/login-ortu');
    };

    return (
      <div className="flex flex-col h-[100dvh] bg-gray-50 overflow-hidden font-sans">
        <header className="bg-white border-b border-gray-200 shadow-sm flex-shrink-0 z-20 sticky top-0">
          <div className="flex items-center justify-between px-4 h-14">
            <h1 className="text-lg font-semibold text-gray-800">
              SIMPATIK <span className="text-sm font-normal text-gray-500">Orang Tua</span>
            </h1>
            <button
              onClick={handleLogout}
              className="flex items-center justify-center p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors"
              title="Keluar"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </header>
        
        <main className="flex-1 overflow-y-auto pb-safe">
          <div className="h-full">
            <Outlet />
          </div>
        </main>

        <nav className="bg-white border-t border-gray-200 flex-shrink-0 pb-safe z-20">
          <div className="flex justify-around items-center h-16 px-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${
                    isActive ? 'text-orange-500' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <div className={`p-1 rounded-full ${isActive ? 'bg-orange-50' : ''}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="text-[10px] font-medium">{item.name}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    );
  }

  // Default Desktop Layout for ADMIN / GURU
  return (
    <div className="flex h-screen bg-background overflow-hidden font-sans">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Navbar onMenuClick={() => setSidebarOpen(true)} title={`Dashboard ${currentUser.role}`} />
        
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
