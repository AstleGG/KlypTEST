
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

const startApp = () => {
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    console.error("Klyp: Root element not found.");
    document.body.classList.add('loaded');
    return;
  }

  try {
    const root = createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    
    // Hide loader once React has control
    requestAnimationFrame(() => {
      setTimeout(() => {
        document.body.classList.add('loaded');
      }, 100);
    });
  } catch (err) {
    console.error("Klyp: Rendering Error:", err);
    // Force error visibility
    const display = document.getElementById('error-display');
    if (display) {
        display.style.display = 'block';
        display.textContent = `Render Error: ${err.message}\n${err.stack}`;
    }
    document.body.classList.add('loaded');
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startApp);
} else {
  startApp();
}
