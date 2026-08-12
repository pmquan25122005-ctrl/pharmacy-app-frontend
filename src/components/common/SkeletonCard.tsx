import React from 'react';

export const SkeletonCard: React.FC = () => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm animate-pulse space-y-4">
      {/* Thumbnail placeholder */}
      <div className="w-full h-48 bg-slate-200 rounded-lg" />
      
      {/* Category badge placeholder */}
      <div className="w-1/3 h-4 bg-slate-200 rounded-full" />
      
      {/* Title placeholder */}
      <div className="w-3/4 h-5 bg-slate-200 rounded" />
      
      {/* Description placeholder */}
      <div className="space-y-2">
        <div className="w-full h-3 bg-slate-100 rounded" />
        <div className="w-5/6 h-3 bg-slate-100 rounded" />
      </div>
      
      {/* Price & button area */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-100">
        <div className="w-1/4 h-6 bg-slate-200 rounded" />
        <div className="w-1/3 h-8 bg-slate-200 rounded-lg" />
      </div>
    </div>
  );
};
