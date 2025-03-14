import React, { useState, useEffect } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { Search, Globe, Shield, AlertTriangle, Server, Database, ChevronDown, Eye, Code, Terminal } from 'lucide-react';

// Components
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';

// Scenes
import NetworkMap from './scenes/NetworkMap';

// Tool-specific components
import NmapScanner from './tools/NmapScanner';
import NslookupTool from './tools/NslookupTool';
import WhatwebScanner from './tools/WhatwebScanner';
import DirbScanner from './tools/DirbScanner';
import GobusterScanner from './tools/GobusterScanner';
import DnsReconTool from './tools/DnsReconTool';

function App() {
  // States
  const [activeTab, setActiveTab] = useState('dashboard');
  const [activeSubTab, setActiveSubTab] = useState('');
  const [scanInProgress, setScanInProgress] = useState(false);
  const [target, setTarget] = useState('');
  const [scanResults, setScanResults] = useState({});
  const [vulnerabilities, setVulnerabilities] = useState([]);
  const [scanHistory, setScanHistory] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [loadingPercentage, setLoadingPercentage] = useState(0);

  // Mock data for charts
  const vulnerabilityData = [
    { name: 'Critical', count: 3, color: '#FF5252' },
    { name: 'High', count: 7, color: '#FF9100' },
    { name: 'Medium', count: 12, color: '#FFEB3B' },
    { name: 'Low', count: 18, color: '#4CAF50' },
    { name: 'Info', count: 25, color: '#2196F3' }
  ];

  const timelineData = [
    { name: 'Jan', scans: 12, vulnerabilities: 34 },
    { name: 'Feb', scans: 19, vulnerabilities: 28 },
    { name: 'Mar', scans: 15, vulnerabilities: 42 },
    { name: 'Apr', scans: 22, vulnerabilities: 31 },
    { name: 'May', scans: 28, vulnerabilities: 47 },
    { name: 'Jun', scans: 24, vulnerabilities: 39 }
  ];
  // Calculate severity score based on findings
  const calculateSeverityScore = (findings) => {
    const weights = {
      critical: 10,
      high: 7,
      medium: 4,
      low: 1,
      info: 0
    };

    let totalScore = 0;
    let maxPossibleScore = 0;

    Object.keys(findings).forEach(severity => {
      totalScore += findings[severity] * weights[severity.toLowerCase()];
      maxPossibleScore += findings[severity] * 10; // Assuming all could be critical
    });

    // Normalize to 0-100 scale
    return Math.min(100, Math.round((totalScore / maxPossibleScore) * 100) || 0);
  };

  // Mock function to start scan
  const startScan = () => {
    if (!target.trim()) {
      alert('Please enter a target');
      return;
    }

    setScanInProgress(true);
    setLoadingPercentage(0);

    // Simulate scan progress
    const interval = setInterval(() => {
      setLoadingPercentage(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.floor(Math.random() * 5) + 1;
      });
    }, 300);

    // Simulate scan completion
    setTimeout(() => {
      clearInterval(interval);
      setLoadingPercentage(100);
      
      // Mock results
      const mockFindings = {
        critical: Math.floor(Math.random() * 5),
        high: Math.floor(Math.random() * 10),
        medium: Math.floor(Math.random() * 15),
        low: Math.floor(Math.random() * 20),
        info: Math.floor(Math.random() * 30)
      };
      
      const mockResults = {
        target: target,
        timestamp: new Date().toISOString(),
        tools: {
          nmap: { ports: [22, 80, 443, 3306], services: ['SSH', 'HTTP', 'HTTPS', 'MySQL'] },
          nslookup: { ip: '192.168.1.' + Math.floor(Math.random() * 255), records: ['A', 'MX', 'NS'] },
          whatweb: { technologies: ['Apache', 'PHP', 'jQuery', 'Bootstrap'] },
          dirb: { directories: ['/admin', '/login', '/api', '/uploads'] },
          gobuster: { files: ['.env', 'config.php', 'backup.sql'] },
          dnsRecon: { subdomains: ['api', 'dev', 'staging', 'mail'] }
        },
        findings: mockFindings,
        severityScore: calculateSeverityScore(mockFindings)
      };
      
      setScanResults(mockResults);
      
      // Add vulnerabilities based on findings
      const newVulnerabilities = [];
      if (mockResults.tools.nmap.ports.includes(22)) {
        newVulnerabilities.push({
          id: Date.now() + 1,
          name: 'SSH Service Exposed',
          severity: 'Medium',
          description: 'SSH service is exposed and might be vulnerable to brute force attacks.',
          recommendation: 'Limit SSH access or implement key-based authentication.'
        });
      }
      
      if (mockResults.tools.dirb.directories.includes('/admin')) {
        newVulnerabilities.push({
          id: Date.now() + 2,
          name: 'Admin Panel Exposed',
          severity: 'High',
          description: 'Admin panel is publicly accessible without sufficient protection.',
          recommendation: 'Restrict access to admin panel using IP filtering or VPN.'
        });
      }
      
      // Add more mock vulnerabilities
      if (Math.random() > 0.5) {
        newVulnerabilities.push({
          id: Date.now() + 3,
          name: 'Outdated Web Server',
          severity: 'Critical',
          description: 'Web server is running an outdated version with known vulnerabilities.',
          recommendation: 'Update to the latest version and apply security patches.'
        });
      }
      
      setVulnerabilities(newVulnerabilities);
      
      // Add to scan history
      setScanHistory(prev => [...prev, {
        id: Date.now(),
        target: target,
        date: new Date().toLocaleDateString(),
        vulnerabilities: newVulnerabilities.length,
        severityScore: mockResults.severityScore
      }]);
      
      setScanInProgress(false);
    }, 8000);
  };

  // Function to get color based on severity score
  const getSeverityColor = (score) => {
    if (score >= 80) return '#FF5252'; // Critical
    if (score >= 60) return '#FF9100'; // High
    if (score >= 40) return '#FFEB3B'; // Medium
    if (score >= 20) return '#4CAF50'; // Low
    return '#2196F3'; // Info
  };

  // Function to get severity level based on score
  const getSeverityLevel = (score) => {
    if (score >= 80) return 'Critical';
    if (score >= 60) return 'High';
    if (score >= 40) return 'Medium';
    if (score >= 20) return 'Low';
    return 'Info';
  };
  // Render dashboard
  const renderDashboard = () => (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h2 className="text-2xl font-bold mb-4">Vulnerability Scanner Dashboard</h2>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="flex flex-col md:flex-row mb-6">
            <div className="w-full md:w-2/3 pr-0 md:pr-4 mb-4 md:mb-0">
              <label className="block text-sm font-medium mb-2">Target (URL, IP, or Domain)</label>
              <div className="flex">
                <input
                  type="text"
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
                  placeholder="e.g., example.com or 192.168.1.1"
                  className="flex-grow px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={startScan}
                  disabled={scanInProgress}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-r-lg flex items-center"
                >
                  {scanInProgress ? 'Scanning...' : 'Start Scan'}
                  {!scanInProgress && <Search className="ml-2 h-5 w-5" />}
                </button>
              </div>
            </div>
            <div className="w-full md:w-1/3">
              <label className="block text-sm font-medium mb-2">Select Tools</label>
              <select className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="all">All Tools</option>
                <option value="nmap">Nmap</option>
                <option value="nslookup">Nslookup</option>
                <option value="whatweb">WhatWeb</option>
                <option value="dirb">Dirb</option>
                <option value="gobuster">Gobuster</option>
                <option value="dnsrecon">DNS Recon</option>
              </select>
            </div>
          </div>
          
          {scanInProgress && (
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Scan in progress...</span>
                <span className="text-sm font-medium">{loadingPercentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
                  style={{ width: `${loadingPercentage}%` }}
                ></div>
              </div>
              <div className="mt-2 text-sm text-gray-500">
                Running tools: {loadingPercentage < 30 ? 'Nmap, Nslookup' : loadingPercentage < 60 ? 'WhatWeb, Dirb' : 'Gobuster, DNS Recon'}
              </div>
            </div>
          )}
          
          {Object.keys(scanResults).length > 0 && !scanInProgress && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                  <h3 className="text-lg font-medium mb-2">Scan Summary</h3>
                  <p><strong>Target:</strong> {scanResults.target}</p>
                  <p><strong>Scan Date:</strong> {new Date(scanResults.timestamp).toLocaleString()}</p>
                  <p><strong>Total Findings:</strong> {vulnerabilities.length}</p>
                </div>
                
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                  <h3 className="text-lg font-medium mb-2">Severity Score</h3>
                  <div className="flex items-center">
                    <div 
                      className="w-24 h-24 rounded-full flex items-center justify-center text-white text-2xl font-bold"
                      style={{ backgroundColor: getSeverityColor(scanResults.severityScore) }}
                    >
                      {scanResults.severityScore}
                    </div>
                    <div className="ml-4">
                      <p className="text-lg font-medium">{getSeverityLevel(scanResults.severityScore)}</p>
                      <p className="text-sm text-gray-500">Based on {Object.values(scanResults.findings).reduce((a, b) => a + b, 0)} findings</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                  <h3 className="text-lg font-medium mb-2">Quick Actions</h3>
                  <div className="flex flex-col space-y-2">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center">
                      <Eye className="mr-2 h-4 w-4" /> View Full Report
                    </button>
                    <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded flex items-center">
                      <Code className="mr-2 h-4 w-4" /> Export Results
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
  // Continuation of renderDashboard
  const renderDashboardChartsAndVulnerabilities = () => (
    <div>
      {Object.keys(scanResults).length > 0 && !scanInProgress && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <h3 className="text-lg font-medium mb-4">Vulnerability Distribution</h3>
              <PieChart width={300} height={300}>
                <Pie
                  data={vulnerabilityData}
                  cx={150}
                  cy={150}
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="count"
                  label
                >
                  {vulnerabilityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <h3 className="text-lg font-medium mb-4">Scan History</h3>
              <LineChart
                width={500}
                height={300}
                data={timelineData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="scans" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="vulnerabilities" stroke="#82ca9d" />
              </LineChart>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-4">Detected Vulnerabilities</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    <th className="py-3 px-4 text-left">Name</th>
                    <th className="py-3 px-4 text-left">Severity</th>
                    <th className="py-3 px-4 text-left">Description</th>
                    <th className="py-3 px-4 text-left">Recommendation</th>
                  </tr>
                </thead>
                <tbody>
                  {vulnerabilities.map(vuln => (
                    <tr key={vuln.id} className="border-b border-gray-200 dark:border-gray-700">
                      <td className="py-3 px-4">{vuln.name}</td>
                      <td className="py-3 px-4">
                        <span 
                          className="px-2 py-1 rounded text-white text-sm"
                          style={{ 
                            backgroundColor: 
                              vuln.severity === 'Critical' ? '#FF5252' : 
                              vuln.severity === 'High' ? '#FF9100' : 
                              vuln.severity === 'Medium' ? '#FFEB3B' : 
                              vuln.severity === 'Low' ? '#4CAF50' : '#2196F3'
                          }}
                        >
                          {vuln.severity}
                        </span>
                      </td>
                      <td className="py-3 px-4">{vuln.description}</td>
                      <td className="py-3 px-4">{vuln.recommendation}</td>
                    </tr>
                  ))}
                  {vulnerabilities.length === 0 && (
                    <tr>
                      <td className="py-4 px-4 text-center" colSpan="4">No vulnerabilities detected</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <h3 className="text-lg font-medium mb-4">Network Services (Nmap)</h3>
              <div className="space-y-3">
                <p><strong>Open Ports:</strong> {scanResults.tools.nmap.ports.join(', ')}</p>
                <p><strong>Detected Services:</strong> {scanResults.tools.nmap.services.join(', ')}</p>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <h3 className="text-lg font-medium mb-4">Web Technologies (WhatWeb)</h3>
              <div className="space-y-3">
                <p><strong>Detected Technologies:</strong> {scanResults.tools.whatweb.technologies.join(', ')}</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">Scan History</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700">
                  <th className="py-3 px-4 text-left">Target</th>
                  <th className="py-3 px-4 text-left">Date</th>
                  <th className="py-3 px-4 text-left">Vulnerabilities</th>
                  <th className="py-3 px-4 text-left">Severity</th>
                  <th className="py-3 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {scanHistory.map(scan => (
                  <tr key={scan.id} className="border-b border-gray-200 dark:border-gray-700">
                    <td className="py-3 px-4">{scan.target}</td>
                    <td className="py-3 px-4">{scan.date}</td>
                    <td className="py-3 px-4">{scan.vulnerabilities}</td>
                    <td className="py-3 px-4">
                      <span 
                        className="px-2 py-1 rounded text-white text-sm"
                        style={{ backgroundColor: getSeverityColor(scan.severityScore) }}
                      >
                        {getSeverityLevel(scan.severityScore)}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <button className="text-blue-500 hover:text-blue-700 mr-2">View</button>
                      <button className="text-red-500 hover:text-red-700">Delete</button>
                    </td>
                  </tr>
                ))}
                {scanHistory.length === 0 && (
                  <tr>
                    <td className="py-4 px-4 text-center" colSpan="5">No scan history</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">Security Dashboard</h2>
          <div className="flex flex-wrap -mx-2">
            <div className="w-1/2 px-2 mb-4">
              <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-500 rounded-full">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium">Total Scans</h3>
                    <p className="text-2xl font-bold">{scanHistory.length}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="w-1/2 px-2 mb-4">
              <div className="p-4 bg-red-100 dark:bg-red-900 rounded-lg">
                <div className="flex items-center">
                  <div className="p-3 bg-red-500 rounded-full">
                    <AlertTriangle className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium">Vulnerabilities</h3>
                    <p className="text-2xl font-bold">
                      {scanHistory.reduce((total, scan) => total + scan.vulnerabilities, 0)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  

    // Render tools tab content
    const renderTools = () => {
      switch (activeSubTab) {
        case 'nmap':
          return <NmapScanner target={target} setScanResults={setScanResults} />;
        case 'nslookup':
          return <NslookupTool target={target} setScanResults={setScanResults} />;
        case 'whatweb':
          return <WhatwebScanner target={target} setScanResults={setScanResults} />;
        case 'dirb':
          return <DirbScanner target={target} setScanResults={setScanResults} />;
        case 'gobuster':
          return <GobusterScanner target={target} setScanResults={setScanResults} />;
        case 'dnsrecon':
          return <DnsReconTool target={target} setScanResults={setScanResults} />;
        default:
          return (
            <div className="p-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Scanning Tools</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Nmap */}
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                    <div className="flex items-center mb-4">
                      <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                        <Search className="h-6 w-6 text-blue-500 dark:text-blue-300" />
                      </div>
                      <h3 className="text-xl font-medium ml-3">Nmap</h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Network mapper for port scanning and service detection
                    </p>
                    <button
                      onClick={() => setActiveSubTab('nmap')}
                      className="text-blue-500 hover:text-blue-700 font-medium"
                    >
                      Use Tool →
                    </button>
                  </div>
                  {/* Nslookup */}
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                    <div className="flex items-center mb-4">
                      <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
                        <Globe className="h-6 w-6 text-green-500 dark:text-green-300" />
                      </div>
                      <h3 className="text-xl font-medium ml-3">Nslookup</h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Query DNS records and resolve domain names
                    </p>
                    <button
                      onClick={() => setActiveSubTab('nslookup')}
                      className="text-blue-500 hover:text-blue-700 font-medium"
                    >
                      Use Tool →
                    </button>
                  </div>
                  {/* WhatWeb */}
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                    <div className="flex items-center mb-4">
                      <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full">
                        <Code className="h-6 w-6 text-purple-500 dark:text-purple-300" />
                      </div>
                      <h3 className="text-xl font-medium ml-3">WhatWeb</h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Identify web technologies and fingerprinting
                    </p>
                    <button
                      onClick={() => setActiveSubTab('whatweb')}
                      className="text-blue-500 hover:text-blue-700 font-medium"
                    >
                      Use Tool →
                    </button>
                  </div>
                  {/* Dirb */}
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                    <div className="flex items-center mb-4">
                      <div className="p-3 bg-red-100 dark:bg-red-900 rounded-full">
                        <Terminal className="h-6 w-6 text-red-500 dark:text-red-300" />
                      </div>
                      <h3 className="text-xl font-medium ml-3">Dirb</h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Directory and file brute forcing for web servers
                    </p>
                    <button
                      onClick={() => setActiveSubTab('dirb')}
                      className="text-blue-500 hover:text-blue-700 font-medium"
                    >
                      Use Tool →
                    </button>
                  </div>
                  {/* Gobuster */}
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                    <div className="flex items-center mb-4">
                      <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-full">
                        <Server className="h-6 w-6 text-yellow-500 dark:text-yellow-300" />
                      </div>
                      <h3 className="text-xl font-medium ml-3">Gobuster</h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Directory/file/DNS/vhost busting tool
                    </p>
                    <button
                      onClick={() => setActiveSubTab('gobuster')}
                      className="text-blue-500 hover:text-blue-700 font-medium"
                    >
                      Use Tool →
                    </button>
                  </div>
                  {/* DNS Recon */}
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                    <div className="flex items-center mb-4">
                      <div className="p-3 bg-teal-100 dark:bg-teal-900 rounded-full">
                        <Database className="h-6 w-6 text-teal-500 dark:text-teal-300" />
                      </div>
                      <h3 className="text-xl font-medium ml-3">DNS Recon</h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      DNS reconnaissance and subdomain enumeration
                    </p>
                    <button
                      onClick={() => setActiveSubTab('dnsrecon')}
                      className="text-blue-500 hover:text-blue-700 font-medium"
                    >
                      Use Tool →
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          );
      }
    };
      // Render network map tab
  const renderNetworkMap = () => (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Network Map</h2>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <NetworkMap scanResults={scanResults} />
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            Interactive 3D visualization of network topology based on scan results.
          </p>
        </div>
      </motion.div>
    </div>
  );
    // Render reports tab
    const renderReports = () => (
      <div className="p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Scan Reports</h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex justify-between mb-4">
              <h3 className="text-lg font-medium">Scan History</h3>
              <button
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded flex items-center"
                onClick={() => alert('Export functionality to be implemented')}
              >
                <Code className="mr-2 h-4 w-4" /> Export All
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    <th className="py-3 px-4 text-left">Target</th>
                    <th className="py-3 px-4 text-left">Date</th>
                    <th className="py-3 px-4 text-left">Vulnerabilities</th>
                    <th className="py-3 px-4 text-left">Severity</th>
                    <th className="py-3 px-4 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {scanHistory.map(scan => (
                    <tr key={scan.id} className="border-b border-gray-200 dark:border-gray-700">
                      <td className="py-3 px-4">{scan.target}</td>
                      <td className="py-3 px-4">{scan.date}</td>
                      <td className="py-3 px-4">{scan.vulnerabilities}</td>
                      <td className="py-3 px-4">
                        <span
                          className="px-2 py-1 rounded text-white text-sm"
                          style={{ backgroundColor: getSeverityColor(scan.severityScore) }}
                        >
                          {getSeverityLevel(scan.severityScore)}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <button className="text-blue-500 hover:text-blue-700 mr-2">View</button>
                        <button
                          className="text-red-500 hover:text-red-700"
                          onClick={() => setScanHistory(prev => prev.filter(s => s.id !== scan.id))}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                  {scanHistory.length === 0 && (
                    <tr>
                      <td className="py-4 px-4 text-center" colSpan="5">No scan history available</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </div>
    );
      // Render main content based on active tab
  const renderMainContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <>
            {renderDashboard()}
            {renderDashboardChartsAndVulnerabilities()}
          </>
        );
      case 'tools':
        return renderTools();
      case 'network':
        return renderNetworkMap();
      case 'reports':
        return renderReports();
      default:
        return <div className="p-6">Select a tab to view content</div>;
    }
  };
  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-100'}`}>
      <Navbar setActiveTab={setActiveTab} darkMode={darkMode} setDarkMode={setDarkMode} />
      <div className="flex">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="flex-1">
          {renderMainContent()}
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default App;