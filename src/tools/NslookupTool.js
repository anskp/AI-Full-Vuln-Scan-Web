// src/tools/NslookupTool.js
import React from 'react';

const NslookupTool = ({ target, setScanResults }) => {
  const runScan = () => {
    setScanResults({
      tools: {
        nslookup: {
          ip: '192.168.1.' + Math.floor(Math.random() * 255),
          records: ['A', 'MX', 'NS'],
        },
      },
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Nslookup Tool</h2>
      <p className="mb-4">Target: {target || 'Not set'}</p>
      <button
        onClick={runScan}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
      >
        Run Nslookup
      </button>
    </div>
  );
};

export default NslookupTool;
