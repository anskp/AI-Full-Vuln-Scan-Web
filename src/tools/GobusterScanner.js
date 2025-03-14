// src/tools/GobusterScanner.js
import React from 'react';

const GobusterScanner = ({ target, setScanResults }) => {
  const runScan = () => {
    setScanResults({
      tools: {
        gobuster: {
          files: ['.env', 'config.php', 'backup.sql'],
        },
      },
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Gobuster Scanner</h2>
      <p className="mb-4">Target: {target || 'Not set'}</p>
      <button
        onClick={runScan}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
      >
        Run Gobuster Scan
      </button>
    </div>
  );
};

export default GobusterScanner;
