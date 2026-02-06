
import React from 'react';

interface NavbarProps {
  onSupportClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onSupportClick }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">Klyp</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-500">
          <a href="#" className="hover:text-indigo-600 transition-colors">How it works</a>
          <a href="#" className="hover:text-indigo-600 transition-colors">Privacy</a>
        </div>

        <button 
          onClick={onSupportClick}
          className="px-4 py-2 text-sm font-medium text-white bg-slate-900 rounded-full hover:bg-slate-800 transition-all active:scale-95"
        >
          Support us
        </button>
      </div>
    </nav>
  );
};
