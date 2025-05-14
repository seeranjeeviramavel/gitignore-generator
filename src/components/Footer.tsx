import React from 'react';
import { Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-800 text-slate-300 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} GitIgnore Generator. All rights reserved.
            </p>
          </div>
          
          <div className="flex items-center text-sm">
            <span>Built with</span>
            <Heart className="h-4 w-4 mx-1 text-red-400 animate-pulse" />
            <span>using React, TypeScript & Tailwind</span>
          </div>
        </div>
      </div>
    </footer>
  );
};