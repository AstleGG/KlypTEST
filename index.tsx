
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const startApp = () => {
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    console.error("Klyp: Target root element not found.");
    return;
  }

  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    // Use requestAnimationFrame to ensure we signal completion after the first render cycle
    requestAnimationFrame(() => {
        document.body.classList.add('loaded');
    });
  } catch (err) {
    console.error("Klyp: Mounting Error:", err);
    document.body.classList.add('loaded');
  }
};

// Start when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startApp);
} else {
  startApp();
}
