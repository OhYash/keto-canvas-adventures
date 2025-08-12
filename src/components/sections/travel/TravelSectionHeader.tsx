
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { handleCopyUrl } from '@/utils/urlUtils';

interface TravelSectionHeaderProps {
  icon: string;
  title: string;
  subtitle: string;
  onNavigateHome: () => void;
}

const TravelSectionHeader: React.FC<TravelSectionHeaderProps> = ({
  icon,
  title,
  subtitle,
  onNavigateHome,
}) => {
  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={onNavigateHome}
          className="flex items-center gap-2 text-slate-700 hover:text-slate-900 transition-colors bg-white/80 hover:bg-white/90 px-3 py-2 rounded-lg text-sm font-medium shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Home
        </button>
        <button
          onClick={handleCopyUrl}
          className="text-2xl sm:text-3xl hover:scale-110 transition-transform duration-200 cursor-pointer"
          title="Copy page link"
        >
          {icon}
        </button>
      </div>
      
      <div className="text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
          {title}
        </h1>
        <p className="text-slate-700 text-sm sm:text-base mb-4">
          {subtitle}
        </p>
      </div>
    </>
  );
};

export default TravelSectionHeader;
