
import React, { useState } from 'react';
import { Platform, Format, Quality, DownloadState } from '../types';

interface KlypFormProps {
  downloadState: DownloadState;
  onFetch: (url: string) => void;
  onDownload: () => void;
  onReset: () => void;
}

export const KlypForm: React.FC<KlypFormProps> = ({ downloadState, onFetch, onDownload, onReset }) => {
  const [url, setUrl] = useState('');
  const [platform, setPlatform] = useState<Platform>('youtube');
  const [format, setFormat] = useState<Format>('video');
  const [quality, setQuality] = useState<Quality>('high');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (downloadState.status === 'idle' || downloadState.status === 'error') {
      onFetch(url);
    } else if (downloadState.status === 'ready') {
      onDownload();
    }
  };

  const isIdle = downloadState.status === 'idle' || downloadState.status === 'error';
  const isFetching = downloadState.status === 'fetching';
  const isReady = downloadState.status === 'ready';
  const isDownloading = downloadState.status === 'downloading';
  const isCompleted = downloadState.status === 'completed';

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-6 md:p-8 border border-slate-100">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative group">
            <input
              type="text"
              placeholder={`Paste your ${platform} link...`}
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={isDownloading || isFetching || isCompleted}
              className={`w-full px-6 py-4 bg-slate-50 border-2 rounded-2xl outline-none transition-all text-lg
                ${isIdle ? 'border-transparent focus:border-indigo-500 group-hover:bg-slate-100' : 'border-slate-200 bg-slate-100'}
              `}
            />
            {url && isIdle && (
              <button 
                type="button"
                onClick={() => setUrl('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-slate-600"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 transition-all duration-500 ${isIdle ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
            <div className="space-y-2 col-span-1 md:col-span-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Platform</label>
              <div className="flex bg-slate-100 p-1 rounded-xl gap-1">
                {(['youtube', 'tiktok'] as Platform[]).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPlatform(p)}
                    className={`flex-1 py-2 px-3 rounded-lg text-sm font-semibold transition-all capitalize ${platform === p ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Format</label>
              <div className="flex bg-slate-100 p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => setFormat('video')}
                  className={`flex-1 py-2 px-3 rounded-lg text-sm font-semibold transition-all ${format === 'video' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500'}`}
                >
                  Video
                </button>
                <button
                  type="button"
                  onClick={() => setFormat('audio')}
                  className={`flex-1 py-2 px-3 rounded-lg text-sm font-semibold transition-all ${format === 'audio' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500'}`}
                >
                  Audio
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Quality</label>
              <select
                value={quality}
                onChange={(e) => setQuality(e.target.value as Quality)}
                className="w-full bg-slate-100 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-600 outline-none hover:bg-slate-200 transition-colors cursor-pointer"
              >
                <option value="high">High (Default)</option>
                <option value="medium">Medium</option>
                <option value="low">Low (Mobile)</option>
              </select>
            </div>
          </div>

          {downloadState.error && (
            <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-600 animate-in fade-in zoom-in duration-300">
              <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm font-medium">{downloadState.error}</p>
            </div>
          )}

          {isReady && downloadState.metadata && (
            <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-2xl flex gap-4 animate-in slide-in-from-top-4 fade-in duration-500">
              <img 
                src={downloadState.metadata.thumbnail} 
                className="w-24 h-16 md:w-32 md:h-20 object-cover rounded-lg shadow-sm"
                alt="Thumbnail"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-slate-900 truncate text-sm md:text-base">{downloadState.metadata.title}</h3>
                <p className="text-xs md:text-sm text-slate-500 font-medium truncate">{downloadState.metadata.author}</p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-indigo-600 text-[10px] text-white font-bold rounded uppercase">
                    {format}
                  </span>
                </div>
              </div>
              <button 
                type="button" 
                onClick={onReset}
                className="p-1 text-slate-400 hover:text-slate-600 self-start"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}

          <button
            type="submit"
            disabled={isDownloading || isFetching || (isIdle && !url) || isCompleted}
            className={`w-full py-4 rounded-2xl text-lg font-bold transition-all transform active:scale-[0.98] flex items-center justify-center gap-3
              ${isReady 
                ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200' 
                : isFetching || isDownloading
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  : isCompleted
                    ? 'bg-green-500 text-white cursor-default'
                    : 'bg-slate-900 text-white hover:bg-slate-800 disabled:bg-slate-100 disabled:text-slate-400'}
            `}
          >
            {isFetching ? (
              <>
                <div className="w-5 h-5 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin" />
                <span>Analysing {platform}...</span>
              </>
            ) : isDownloading ? (
              <div className="w-full px-8">
                <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-indigo-600 transition-all duration-300" 
                    style={{ width: `${downloadState.progress}%` }}
                  />
                </div>
                <p className="text-xs text-slate-500 mt-2">Processing: {downloadState.progress}%</p>
              </div>
            ) : isCompleted ? (
              <>
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                <span>Download Saved</span>
              </>
            ) : isReady ? (
              <>
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>Download Now</span>
              </>
            ) : (
              <span>Continue</span>
            )}
          </button>
        </form>
      </div>

      <div className="mt-8 flex items-center justify-center gap-6 text-slate-400 grayscale opacity-60">
        <div className="flex items-center gap-1.5 font-bold text-xs uppercase tracking-widest">YouTube</div>
        <div className="flex items-center gap-1.5 font-bold text-xs uppercase tracking-widest">TikTok</div>
      </div>
    </div>
  );
};
