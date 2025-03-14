// src/components/Navbar.js
import React from 'react';
import { Sun, Moon } from 'lucide-react';

const Navbar = ({ setActiveTab, darkMode, setDarkMode }) => {
  return (
    <nav className="bg-white dark:bg-gray-800 shadow p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-gray-900 dark:text-white">VulnScanner</h1>
      <div className="flex space-x-4">
        <button
          onClick={() => setActiveTab('dashboard')}
          className="text-gray-700 dark:text-gray-300 hover:text-blue-500"
        >
          Dashboard
        </button>
        <button
          onClick={() => setActiveTab('tools')}
          className="text-gray-700 dark:text-gray-300 hover:text-blue-500"
        >
          Tools
        </button>
        <button
          onClick={() => setActiveTab('network')}
          className="text-gray-700 dark:text-gray-300 hover:text-blue-500"
        >
          Network
        </button>
        <button
          onClick={() => setActiveTab('reports')}
          className="text-gray-700 dark:text-gray-300 hover:text-blue-500"
        >
          Reports
        </button>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="text-gray-700 dark:text-gray-300"
        >
          {darkMode ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;