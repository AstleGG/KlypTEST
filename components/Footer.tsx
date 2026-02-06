
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-auto py-12 px-4 border-t border-slate-200 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-12">
          <div className="space-y-4 max-w-lg">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-slate-900 rounded flex items-center justify-center">
                <span className="text-white text-[10px] font-bold">K</span>
              </div>
              <span className="text-lg font-bold tracking-tight">Klyp</span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed">
              Klyp is a free, open-source tool built for researchers, students, and content enthusiasts who need offline access to public media. We value privacy and simplicity above all else.
            </p>
          </div>
          
          <div className="flex gap-12">
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest">Legal</h4>
              <ul className="text-sm text-slate-500 space-y-2">
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">DMCA</a></li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest">Connect</h4>
              <ul className="text-sm text-slate-500 space-y-2">
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Discord</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">GitHub</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 text-[11px] leading-relaxed text-slate-400">
          <p className="font-bold text-slate-500 mb-2 uppercase tracking-tight">Legal Disclaimer & Usage Terms</p>
          <p>
            Klyp is intended for educational and personal use only. Our platform does not bypass Digital Rights Management (DRM) or encryption measures. 
            By using Klyp, you agree that you will not violate the Terms of Service of YouTube, TikTok, or any other content provider. 
            Klyp does not support the downloading of restricted, private, or copyrighted content without explicit permission from the rights holder. 
            Users are solely responsible for compliance with their local copyright laws and for any misuse of the content downloaded via this tool.
          </p>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-slate-400">
          <p>© {new Date().getFullYear()} Klyp Media. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span>Built with</span>
            <span className="text-red-400">♥</span>
            <span>for the open web.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
