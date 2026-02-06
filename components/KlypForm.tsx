import React, { useState, useEffect } from 'react';
import { Platform, Format, Quality, DownloadState } from '../types';

interface KlypFormProps {
  downloadState: DownloadState;
  onFetch: (url: string) => void;
  onDownload: (format: Format) => void;
  onReset: () => void;
}

export const KlypForm: React.FC<KlypFormProps> = ({ downloadState, onFetch, onDownload, onReset }) => {
  const [url, setUrl] = useState('');
  const [platform, setPlatform] = useState<Platform>('youtube');
  const [format, setFormat] = useState<Format>('video');

  useEffect(() => {
    const lowerUrl = url.toLowerCase();
    if (lowerUrl.includes('tiktok.com')) setPlatform('tiktok');
    else if (lowerUrl.includes('youtube.com') || lowerUrl.includes('youtu.be')) setPlatform('youtube');
  }, [url]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (downloadState.status === 'idle' || downloadState.status === 'error') {
      if (url.trim()) onFetch(url.trim());
    } else if (downloadState.status === 'ready') {
      onDownload(format);
    }
  };

  const isIdle = downloadState.status === 'idle' || downloadState.status === 'error';
  const isFetching = downloadState.status === 'fetching';
  const isReady = downloadState.status === 'ready';
  const isDownloading = downloadState.status === 'downloading';
  const isCompleted = downloadState.status === 'completed';

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="bg-white rounded-[40px] shadow-2xl shadow-slate-200/40 p-6 md:p-10 border border-slate-100 transition-all">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="relative group">
            <input
              type="text"
              placeholder={`Paste your ${platform} link here...`}
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={isDownloading || isFetching || isCompleted}
              className={`w-full px-7 py-5 bg-slate-50 border-2 rounded-2xl outline-none transition-all text-lg
                ${isIdle ? 'border-transparent focus:border-indigo-500 group-hover:bg-slate-100' : 'border-slate-200 bg-slate-100'}
              `}
            />
            {url && isIdle && (
              <button 
                type="button"
                onClick={() => setUrl('')}
                className="absolute right-5 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-indigo-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 transition-all duration-500 ${isIdle ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Platform Source</label>
              <div className="flex bg-slate-100 p-1.5 rounded-2xl gap-1">
                {(['youtube', 'tiktok'] as Platform[]).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPlatform(p)}
                    className={`flex-1 py-3 px-3 rounded-xl text-sm font-bold transition-all capitalize ${platform === p ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500'}`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Output Type</label>
              <div className="flex bg-slate-100 p-1.5 rounded-2xl gap-1">
                <button
                  type="button"
                  onClick={() => setFormat('video')}
                  className={`flex-1 py-3 px-3 rounded-xl text-sm font-bold transition-all ${format === 'video' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500'}`}
                >
                  Video
                </button>
                <button
                  type="button"
                  onClick={() => setFormat('audio')}
                  className={`flex-1 py-3 px-3 rounded-xl text-sm font-bold transition-all ${format === 'audio' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500'}`}
                >
                  Audio
                </button>
              </div>
            </div>
          </div>

          {downloadState.error && (
            <div className="p-5 bg-red-50 border border-red-100 rounded-2xl flex items-start gap-3 text-red-600 animate-in fade-in">
              <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm font-semibold">{downloadState.error}</p>
            </div>
          )}

          {isReady && downloadState.metadata && (
            <div className="p-5 bg-indigo-50 border border-indigo-100 rounded-[28px] flex gap-5 animate-in slide-in-from-top-4 fade-in duration-500">
              <div className="relative flex-shrink-0">
                <img 
                  src={downloadState.metadata.thumbnail} 
                  className="w-28 h-20 object-cover rounded-2xl shadow-md border-2 border-white"
                  alt="Thumbnail"
                />
                <div className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-black/70 backdrop-blur-md rounded-md text-[9px] text-white font-black">
                  {downloadState.metadata.duration || "Live"}
                </div>
              </div>
              <div className="flex-1 min-w-0 flex flex-col justify-center">
                <h3 className="font-bold text-slate-900 truncate text-base leading-tight">
                  {downloadState.metadata.title}
                </h3>
                <p className="text-sm text-slate-500 font-semibold truncate mt-1">{downloadState.metadata.author}</p>
                <div className="mt-3 flex items-center gap-2">
                  <span className="px-2.5 py-1 bg-indigo-600 text-[10px] text-white font-black rounded-lg uppercase tracking-tight">
                    {format} Ready
                  </span>
                </div>
              </div>
              <button 
                type="button" 
                onClick={onReset}
                className="p-2 text-slate-300 hover:text-slate-600 self-start transition-colors"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}

          <button
            type="submit"
            disabled={isDownloading || isFetching || (isIdle && !url.trim()) || isCompleted}
            className={`w-full py-5 rounded-2xl text-xl font-black transition-all transform flex items-center justify-center gap-3 shadow-xl
              ${isReady 
                ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-100 active:scale-[0.98]' 
                : isFetching || isDownloading
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none'
                  : isCompleted
                    ? 'bg-green-500 text-white cursor-default shadow-green-100'
                    : 'bg-slate-900 text-white hover:bg-slate-800 disabled:bg-slate-100 disabled:text-slate-400 active:scale-[0.98] shadow-slate-200'}
            `}
          >
            {isFetching ? (
              <>
                <div className="w-6 h-6 border-3 border-slate-300 border-t-slate-600 rounded-full animate-spin" />
                <span>Analysing...</span>
              </>
            ) : isDownloading ? (
              <div className="w-full flex flex-col items-center gap-2 px-10">
                <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 transition-all duration-300" style={{ width: `${downloadState.progress}%` }} />
                </div>
                <span className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">Extraction: {downloadState.progress}%</span>
              </div>
            ) : isCompleted ? (
              <>
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
                <span>Success</span>
              </>
            ) : isReady ? (
              <span>Download</span>
            ) : (
              <span>Continue</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};