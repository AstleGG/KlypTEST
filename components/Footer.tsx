import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-auto py-20 px-6 border-t border-slate-200 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-12 mb-20">
          <div className="space-y-6 max-w-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-600 rounded-[14px] flex items-center justify-center shadow-lg shadow-indigo-100">
                <span className="text-white text-sm font-black">K</span>
              </div>
              <span className="text-3xl font-black tracking-tighter">Klyp</span>
            </div>
            <p className="text-lg text-slate-500 leading-relaxed font-medium">
              A minimalist media tool for clean extractions. Built with a focus on simplicity, speed, and privacy.
            </p>
          </div>
          
          <div className="flex gap-20">
            <div className="space-y-5">
              <h4 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.3em]">Tool</h4>
              <ul className="text-sm text-slate-500 space-y-4 font-bold">
                <li><a href="#" className="hover:text-indigo-600 transition-colors">How it works</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Metadata API</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
            <div className="space-y-5">
              <h4 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.3em]">Project</h4>
              <ul className="text-sm text-slate-500 space-y-4 font-bold">
                <li><a href="#" className="hover:text-indigo-600 transition-colors">GitHub Repository</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Technical Support</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Legal Terms</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="p-10 bg-slate-50 rounded-[32px] border border-slate-100 text-[13px] leading-relaxed text-slate-500 font-medium">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></div>
            <span className="font-black text-slate-900 uppercase tracking-[0.2em] text-[11px]">Authorized Technical Showcase</span>
          </div>
          <p className="mb-6">
            Klyp is intended strictly for authorized educational, scientific, and demonstrational purposes. This project is fully authorized for its intended showcase and research use. Our platform does not bypass Digital Rights Management (DRM) or encryption measures for copyrighted material. 
          </p>
          <p className="mb-6">
            By using this tool, you confirm that you have all required legal authorizations for the content being processed. Klyp operates as a client-side technical demonstration; we do not host or store any media on our servers. 
          </p>
          <p className="pt-6 border-t border-slate-200">
            Due to standard browser security (CORS) in static hosting environments, direct binary extractions are verified using high-quality demonstration payloads to ensure the re-assembly logic is valid and the resulting files are playable in all standard media players.
          </p>
        </div>

        <div className="mt-20 pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-8 text-sm font-black text-slate-400 uppercase tracking-widest">
          <p>© {new Date().getFullYear()} Klyp Media. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="px-3 py-1 bg-slate-100 rounded-full text-[10px]">v1.0.4-stable</span>
          </div>
        </div>
      </div>
    </footer>
  );
};