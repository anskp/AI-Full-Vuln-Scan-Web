// src/scenes/NetworkMap.js
import React from 'react';
import * as THREE from 'three';

const NetworkMap = ({ scanResults }) => {
  return (
    <div className="h-96 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
      <p className="text-gray-700 dark:text-gray-300">
        3D Network Map Placeholder (Ports: {scanResults.tools?.nmap?.ports?.join(', ') || 'N/A'})
      </p>
    </div>
  );
};

export default NetworkMap;