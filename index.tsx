
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const startApp = () => {
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    console.error("Klyp: Root element not found.");
    document.body.classList.add('loaded');
    return;
  }

  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    
    // Signal to the HTML loader that we are ready
    requestAnimationFrame(() => {
      setTimeout(() => {
        document.body.classList.add('loaded');
      }, 100);
    });
  } catch (err) {
    console.error("Klyp: Rendering Error:", err);
    document.body.classList.add('loaded');
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startApp);
} else {
  startApp();
}
