import React from 'react';

export const LoadingIndicator: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative">
        <div className="h-24 w-24 rounded-full border-t-4 border-b-4 border-indigo-600 animate-spin"></div>
        <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-4 border-l-4 border-transparent border-r-4 border-indigo-300 animate-pulse"></div>
      </div>
      <p className="mt-4 text-slate-600 font-medium">Generating your .gitignore...</p>
      <p className="mt-2 text-sm text-slate-500">This may take a few seconds</p>
    </div>
  );
};