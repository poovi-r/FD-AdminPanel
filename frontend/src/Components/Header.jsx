import React from 'react';

const Header = ({ onMenuClick }) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const username = user.username || 'Admin';
  const initials = username.charAt(0).toUpperCase();

  return (
    <header className="h-20 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white shadow-lg flex items-center justify-between px-6">
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2.5 rounded-xl hover:bg-blue-500/20 transition-all duration-200 text-white hover:shadow-md"
      >
        <span className="text-2xl">☰</span>
      </button>

      <h2 className="text-2xl font-bold tracking-wide text-white">Dashboard</h2>

      <div className="flex items-center space-x-3">
        <span className="text-base font-medium bg-white/20 px-2 py-1 rounded-full backdrop-blur-sm">
          {username}
        </span>
        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-md ring-2 ring-white/20">
          {initials}
        </div>
      </div>
    </header>
  );
};

export default Header;
