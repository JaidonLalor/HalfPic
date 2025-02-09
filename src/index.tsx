import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import Layout from './components/Layout';

const root = document.getElementById('root');
if (!root) throw new Error('Root element not found');
if (root) {
  (ReactDOM as any).createRoot(root).render(
    <React.StrictMode>
      <Layout/>
    </React.StrictMode>
  );
} else {
  console.error('Root element not found');
}