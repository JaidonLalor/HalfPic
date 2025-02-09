// src/components/Layout.tsx
import React, { useState } from 'react';

export default function Layout() {
  const [processing, setProcessing] = useState(false);
  const [status, setStatus] = useState<string>('');

  
  const handleFileSelect = async () => {
    try {
      const files = await window.electronAPI.selectFiles();
      if (files.length > 0) {
        setProcessing(true);
        setStatus('Processing images...');

        try {
          const result = await window.electronAPI.invoke('process-images', files);
          if (result.success) {
            setStatus('Images processed successfully!');
          } else {
            setStatus(`Error: ${result.error}`);
          }
        } catch (error) {
          setStatus(`Error: ${error instanceof Error ? error.message : 'Unknown error occurred'}`);
        } finally {
          setProcessing(false);
        }
      }
    } catch (error) {
      setStatus('Error selecting files');
    }
  };

  return (
    <div 
      className="h-screen w-screen flex items-center justify-center p-12 cursor-pointer"
      style={{ backgroundColor: '#6475F2', boxShadow: 'inset 0 0 200px #002BCD' }}
      onClick={handleFileSelect}
    >
      <div className="text-white text-2xl font-medium text-center">
        {status ? status : 'Click here to select images'}
        {status && (
          <div className="bottom-10 text-white text-sm text-center pl-12 pr-12">
            Click again to select more :)
          </div>
        )}
      </div>
    </div>
  );
};