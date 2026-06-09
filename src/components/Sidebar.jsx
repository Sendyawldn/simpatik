import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, BookOpen, MessageSquare, X, Bell } from 'lucide-react';

const Sidebar = ({ isOpen, onClose }) => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
  const role = currentUser.role;

  let links = [];
  if (role === 'ADMIN') {
    links = [
      { to: '/admin', icon: LayoutDashboard, label: 'Dashboard Admin' },
      { to: '/admin/master', icon: Users, label: 'Master Data' },
      { to: '/admin/pengumuman', icon: Bell, label: 'Pengumuman' },
    ];
  } else if (role === 'GURU') {
    links = [
      { to: '/guru', icon: LayoutDashboard, label: 'Dashboard Guru' },
      { to: '/guru/nilai', icon: BookOpen, label: 'Rekap Nilai & Kehadiran' },
      { to: '/guru/chat', icon: MessageSquare, label: 'Chat Orang Tua' },
    ];
  } else if (role === 'ORANG_TUA') {
    links = [
      { to: '/orang-tua', icon: LayoutDashboard, label: 'Dashboard Anak' },
      { to: '/orang-tua/chat', icon: MessageSquare, label: 'Chat Guru' },
    ];
  }

  return (
    <>
      {/* Mobile overlay */}
      <div 
        className={`fixed inset-0 bg-gray-900/80 z-40 transition-opacity duration-300 md:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-primary text-white shadow-xl transform transition-transform duration-300 md:translate-x-0 md:static md:inset-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between h-16 px-6 bg-indigo-700">
          <span className="text-2xl font-bold tracking-wider">SIMPATIK</span>
          <button className="md:hidden text-white hover:text-gray-200" onClick={onClose}>
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="flex flex-col flex-1 overflow-y-auto">
          <nav className="flex-1 px-4 py-6 space-y-2">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={onClose}
                end={link.to === '/admin' || link.to === '/guru' || link.to === '/orang-tua'}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-white text-primary font-semibold shadow-md'
                      : 'text-indigo-100 hover:bg-indigo-600 hover:text-white'
                  }`
                }
              >
                <link.icon className="h-5 w-5 mr-3" />
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
        <div className="p-4 bg-indigo-800 text-xs text-indigo-200 text-center">
          © 2026 SIMPATIK App
        </div>
      </div>
    </>
  );
};

export default Sidebar;
