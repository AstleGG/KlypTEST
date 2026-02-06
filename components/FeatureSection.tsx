
import React from 'react';

export const FeatureSection: React.FC = () => {
  const features = [
    {
      title: "Clean Design",
      desc: "No ads, no popups, no clutter. Just a clean interface for your content.",
      icon: (
        <svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z" />
        </svg>
      )
    },
    {
      title: "Multiple Formats",
      desc: "Choose between high-quality video or extracted audio for offline listening.",
      icon: (
        <svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: "Speedy Engine",
      desc: "Fast processing and reliable extraction from supported platforms.",
      icon: (
        <svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 max-w-5xl mx-auto w-full">
      {features.map((f, i) => (
        <div key={i} className="bg-white/50 p-6 rounded-3xl border border-slate-200/50 hover:bg-white hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300">
          <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center mb-4">
            {f.icon}
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">{f.title}</h3>
          <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
        </div>
      ))}
    </div>
  );
};
