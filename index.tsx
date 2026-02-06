// Klyp: Pure Static Entry Point Switcher
// This file is kept to satisfy dev environments that auto-load index.tsx, 
// but it will exit silently to allow script.js to manage the DOM directly.

const init = () => {
    const root = document.getElementById('root');
    if (!root) return; // Silent exit for framework-less usage
    console.log("Klyp: Static environment detected. Script.js taking over.");
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
