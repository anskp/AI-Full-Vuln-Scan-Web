// src/tools/DirbScanner.js
import React from 'react';

const DirbScanner = ({ target, setScanResults }) => {
  const runScan = () => {
    setScanResults({
      tools: {
        dirb: {
          directories: ['/admin', '/login', '/api'],
        },
      },
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Dirb Scanner</h2>
      <p className="mb-4">Target: {target || 'Not set'}</p>
      <button
        onClick={runScan}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
      >
        Run Dirb Scan
      </button>
    </div>
  );
};

export default DirbScanner;
