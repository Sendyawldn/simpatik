import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, Menu } from 'lucide-react';

const Navbar = ({ onMenuClick, title }) => {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  return (
    <header className="bg-surface border-b border-gray-200 sticky top-0 z-30">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
        <div className="flex items-center">
          <button
            type="button"
            className="text-textLight hover:text-text md:hidden mr-4"
            onClick={onMenuClick}
          >
            <Menu className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-semibold text-text">{title || 'SIMPATIK Dashboard'}</h1>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-text hidden sm:block">
            Halo, {currentUser?.nama || 'User'}
          </span>
          <button
            onClick={handleLogout}
            className="flex items-center text-sm font-medium text-red-600 hover:text-red-800 transition-colors"
          >
            <LogOut className="h-5 w-5 sm:mr-1" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
