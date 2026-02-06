
import React, { useState } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { KlypForm } from './components/KlypForm.tsx';
import { Footer } from './components/Footer.tsx';
import { FeatureSection } from './components/FeatureSection.tsx';
import { DownloadState } from './types.ts';
import { getMediaMetadata } from './services/gemini.ts';

const SupportModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl modal-enter border border-slate-100">
        <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6">
          <svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">You're awesome!</h3>
        <p className="text-slate-500 leading-relaxed mb-6">
          You can’t really support us with anything besides using the site and sharing it with others. We're happy to keep Klyp free and ad-free for everyone.
        </p>
        <button 
          onClick={onClose}
          className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors"
        >
          Sounds good!
        </button>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [downloadState, setDownloadState] = useState<DownloadState>({
    status: 'idle',
    progress: 0,
  });
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);

  const handleFetchMetadata = async (url: string) => {
    if (!url) return;
    setDownloadState(prev => ({ ...prev, status: 'fetching', error: undefined }));
    try {
      const result = await getMediaMetadata(url);
      if (result.isValid) {
        setDownloadState({
          status: 'ready',
          progress: 0,
          metadata: {
            title: result.title || "Unknown Media",
            author: result.author || "Unknown Creator",
            thumbnail: result.thumbnail || "https://picsum.photos/400/225",
            duration: result.duration
          }
        });
      } else {
        setDownloadState({
          status: 'error',
          progress: 0,
          error: result.errorMessage || "Invalid URL or restricted content."
        });
      }
    } catch (err) {
      setDownloadState({
        status: 'error',
        progress: 0,
        error: "An unexpected error occurred. Please try again."
      });
    }
  };

  const handleDownload = () => {
    setDownloadState(prev => ({ ...prev, status: 'downloading', progress: 0 }));
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.random() * 25;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        
        // ACTUAL DOWNLOAD SIMULATION
        const blobContent = `Klyp Download Manifest\nTitle: ${downloadState.metadata?.title}\nSource: Klyp Web Tool\nDate: ${new Date().toLocaleString()}`;
        const blob = new Blob([blobContent], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${(downloadState.metadata?.title || 'klyp-media').replace(/[^a-z0-9]/gi, '_').toLowerCase()}.txt`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

        setDownloadState(prev => ({ ...prev, status: 'completed', progress: 100 }));
        setTimeout(() => setDownloadState({ status: 'idle', progress: 0 }), 5000);
      } else {
        setDownloadState(prev => ({ ...prev, progress: Math.floor(currentProgress) }));
      }
    }, 250);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-indigo-100 selection:text-indigo-700">
      <Navbar onSupportClick={() => setIsSupportModalOpen(true)} />
      <SupportModal isOpen={isSupportModalOpen} onClose={() => setIsSupportModalOpen(false)} />
      
      <main className="flex-grow flex flex-col items-center justify-start px-4 pt-16 md:pt-24 pb-12">
        <div className="w-full max-w-4xl text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
            Keep your <span className="text-indigo-600">Klyps</span>.
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000">
            A minimalist media downloader for your favorite content. Free, private, and beautifully simple.
          </p>
        </div>

        <KlypForm 
          downloadState={downloadState} 
          onFetch={handleFetchMetadata} 
          onDownload={handleDownload}
          onReset={() => setDownloadState({ status: 'idle', progress: 0 })}
        />
        <FeatureSection />
      </main>
      <Footer />
    </div>
  );
};

export default App;
