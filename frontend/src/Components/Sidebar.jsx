import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaShoppingBag, FaBoxOpen, FaFolderOpen, FaUsers, FaSignOutAlt } from 'react-icons/fa';

const Sidebar = ({ isOpen, onClose }) => {
  const menuItems = [
    { name: 'Dashboard', path: '/', icon: FaHome },
    { name: 'Orders', path: '/orders', icon: FaShoppingBag },
    { name: 'Products', path: '/products', icon: FaBoxOpen },
    { name: 'Categories', path: '/categories', icon: FaFolderOpen },
    { name: 'Users', path: '/users', icon: FaUsers },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden backdrop-blur-sm"
          onClick={onClose}
        />
      )}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-2xl transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static lg:inset-0 transition-transform duration-300 ease-out border-r border-gray-200 lg:shadow-lg`}
      >
        <div className="flex items-center justify-center h-16 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white shadow-lg">
          <img
            src="/logo.png" // Replace with your professional logo path (e.g., SVG or PNG)
            alt="FoodAdmin"
            className="h-8 w-auto drop-shadow-md"
          />
        </div>
        <nav className="mt-6 px-3">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50/80 rounded-xl font-medium transition-all duration-200 group hover:text-gray-900 hover:shadow-sm border-l-4 border-transparent hover:border-blue-500"
                    onClick={onClose}
                  >
                    <Icon className="w-5 h-5 mr-3 text-gray-500 group-hover:text-blue-500 transition-colors duration-200 flex-shrink-0" />
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="absolute bottom-4 left-4 w-56">
          <button
            onClick={onClose}
            className="w-full flex items-center px-4 py-2.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50/80 rounded-xl transition-all duration-200 font-medium border border-gray-200 hover:border-gray-300 hover:shadow-sm"
          >
            <FaSignOutAlt className="w-4 h-4 mr-3 text-gray-500" />
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;