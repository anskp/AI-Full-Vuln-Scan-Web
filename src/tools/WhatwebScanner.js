// src/tools/WhatwebScanner.js
import React from 'react';

const WhatwebScanner = ({ target, setScanResults }) => {
  const runScan = () => {
    setScanResults({
      tools: {
        whatweb: {
          technologies: ['Apache', 'PHP', 'jQuery'],
        },
      },
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">WhatWeb Scanner</h2>
      <p className="mb-4">Target: {target || 'Not set'}</p>
      <button
        onClick={runScan}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
      >
        Run WhatWeb Scan
      </button>
    </div>
  );
};

export default WhatwebScanner;