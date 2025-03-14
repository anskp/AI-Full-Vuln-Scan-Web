// src/tools/DnsReconTool.js
import React from 'react';

const DnsReconTool = ({ target, setScanResults }) => {
  const runScan = () => {
    setScanResults({
      tools: {
        dnsRecon: {
          subdomains: ['api', 'dev', 'staging'],
        },
      },
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">DNS Recon Tool</h2>
      <p className="mb-4">Target: {target || 'Not set'}</p>
      <button
        onClick={runScan}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
      >
        Run DNS Recon
      </button>
    </div>
  );
};

export default DnsReconTool;
