import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Ensure canonical trailing slash on subpath deployments like GitHub Pages
if (typeof window !== 'undefined' && window.location.pathname === '/mantrasetu') {
  window.history.replaceState(null, '', '/mantrasetu/' + window.location.search + window.location.hash);
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Register Service Worker for offline PWA App mode
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {
      // SW registration fallback
    });
  });
}

