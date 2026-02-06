
import React from 'react';
import { ChevronRight } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string;
  trend?: number;
  icon: React.ReactNode;
  onViewMore?: () => void;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, trend, icon, onViewMore }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-all group relative overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-gray-50 rounded-xl text-gray-500 group-hover:bg-gray-900 group-hover:text-white transition-colors">
          {icon}
        </div>
        {trend !== undefined && (
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${trend >= 0 ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
            {trend >= 0 ? '+' : ''}{trend}%
          </span>
        )}
      </div>
      <div className="mb-4">
        <p className="text-sm font-medium text-gray-400 mb-1">{label}</p>
        <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
      </div>
      
      {onViewMore && (
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onViewMore();
          }}
          className="flex items-center gap-1 text-[10px] font-bold text-gray-400 uppercase tracking-widest hover:text-gray-900 transition-colors w-fit pt-2 border-t border-gray-50 w-full"
        >
          Ver mais <ChevronRight size={12} />
        </button>
      )}
    </div>
  );
};

export default StatCard;
