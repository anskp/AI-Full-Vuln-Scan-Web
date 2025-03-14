// src/tools/NmapScanner.js
import React from 'react';

const NmapScanner = ({ target, setScanResults }) => {
  const runScan = () => {
    // Mock scan result for Nmap
    setScanResults({
      tools: {
        nmap: {
          ports: [22, 80, 443],
          services: ['SSH', 'HTTP', 'HTTPS'],
        },
      },
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Nmap Scanner</h2>
      <p className="mb-4">Target: {target || 'Not set'}</p>
      <button
        onClick={runScan}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
      >
        Run Nmap Scan
      </button>
    </div>
  );
};

export default NmapScanner;