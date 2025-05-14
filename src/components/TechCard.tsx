import React from 'react';
import { Check } from 'lucide-react';
import { TechItem } from '../types';

interface TechCardProps {
  tech: TechItem;
  isSelected: boolean;
  onSelect: () => void;
}

export const TechCard: React.FC<TechCardProps> = ({ tech, isSelected, onSelect }) => {
  return (
    <div 
      onClick={onSelect}
      className={`
        border rounded-lg p-4 cursor-pointer transition-all duration-200 w-full max-w-xs h-40
        ${isSelected 
          ? 'border-indigo-500 bg-indigo-50 shadow-sm' 
          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
        }
      `}
    >
      <div className="flex items-start h-full">
        <div className="flex-1 overflow-hidden">
          <h3 className="font-medium text-slate-800 truncate">{tech.name}</h3>
          <p className="text-sm text-slate-500 mt-1 line-clamp-3">
            {tech.description}
          </p>
        </div>
        <div className={`
          w-6 h-6 rounded-full flex items-center justify-center ml-2 flex-shrink-0
          ${isSelected 
            ? 'bg-indigo-600 text-white' 
            : 'bg-slate-100 border border-slate-300'
          }
        `}>
          {isSelected && <Check className="w-4 h-4" />}
        </div>
      </div>
    </div>
  );
};
