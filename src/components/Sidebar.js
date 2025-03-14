// src/components/Sidebar.js
import React from 'react';

const Sidebar = ({ activeTab, setActiveTab }) => {
  return (
    <aside className="w-64 bg-white dark:bg-gray-800 shadow p-4 h-screen">
      <ul className="space-y-4">
        <li>
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full text-left py-2 px-4 rounded ${
              activeTab === 'dashboard' ? 'bg-blue-500 text-white' : 'text-gray-700 dark:text-gray-300'
            }`}
          >
            Dashboard
          </button>
        </li>
        <li>
          <button
            onClick={() => setActiveTab('tools')}
            className={`w-full text-left py-2 px-4 rounded ${
              activeTab === 'tools' ? 'bg-blue-500 text-white' : 'text-gray-700 dark:text-gray-300'
            }`}
          >
            Tools
          </button>
        </li>
        <li>
          <button
            onClick={() => setActiveTab('network')}
            className={`w-full text-left py-2 px-4 rounded ${
              activeTab === 'network' ? 'bg-blue-500 text-white' : 'text-gray-700 dark:text-gray-300'
            }`}
          >
            Network
          </button>
        </li>
        <li>
          <button
            onClick={() => setActiveTab('reports')}
            className={`w-full text-left py-2 px-4 rounded ${
              activeTab === 'reports' ? 'bg-blue-500 text-white' : 'text-gray-700 dark:text-gray-300'
            }`}
          >
            Reports
          </button>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
