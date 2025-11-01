import React from 'react';

const Header = ({ onMenuClick }) => {
  return (
    <header className="bg-gradient-to-r from-white via-gray-50 to-white shadow-xl border-b border-gray-200/50 backdrop-blur-sm">
      <div className="flex items-center justify-between px-6 py-4">
        <button 
          onClick={onMenuClick} 
          className="lg:hidden p-2.5 rounded-xl hover:bg-gray-100/80 transition-all duration-200 text-gray-700 hover:text-gray-900 hover:shadow-md shadow-sm"
        >
          <span className="text-2xl">☰</span>
        </button>
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Dashboard</h2>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <span className="text-base text-gray-700 font-medium bg-gray-50/50 px-2 py-1 rounded-full">Admin</span>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 via-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-lg ring-2 ring-white/20">
              A
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;