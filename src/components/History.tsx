import React from 'react';
import { Clock, ArrowUpRight } from 'lucide-react';

interface HistoryProps {
  history: { techs: string[]; content: string; date: Date }[];
  onSelect: (item: { techs: string[]; content: string }) => void;
}

export const History: React.FC<HistoryProps> = ({ history, onSelect }) => {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center">
        <Clock className="h-5 w-5 mr-2" />
        <span>Recent Generations</span>
      </h2>
      
      <div className="space-y-3">
        {history.map((item, index) => (
          <div 
            key={index}
            onClick={() => onSelect(item)}
            className="p-4 bg-white rounded-lg border border-slate-200 hover:border-indigo-300 hover:shadow-sm cursor-pointer transition-all duration-200"
          >
            <div className="flex justify-between items-start">
              <div>
                <div className="flex flex-wrap gap-2 mb-2">
                  {item.techs.slice(0, 3).map((tech, i) => (
                    <span key={i} className="inline-block px-2 py-1 text-xs rounded-full bg-slate-100 text-slate-800">
                      {tech}
                    </span>
                  ))}
                  {item.techs.length > 3 && (
                    <span className="inline-block px-2 py-1 text-xs rounded-full bg-slate-100 text-slate-800">
                      +{item.techs.length - 3} more
                    </span>
                  )}
                </div>
                <span className="text-sm text-slate-500">{formatDate(item.date)}</span>
              </div>
              <ArrowUpRight className="h-5 w-5 text-slate-400" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};