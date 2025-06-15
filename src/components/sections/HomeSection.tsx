
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, ArrowLeft, ArrowUp, ArrowDown } from 'lucide-react';

interface Section {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  direction: 'right' | 'left' | 'up' | 'down';
  gradient: string;
}

interface HomeSectionProps {
  sections: Section[];
  onNavigateToSection: (sectionId: string) => void;
}

const HomeSection: React.FC<HomeSectionProps> = ({ sections, onNavigateToSection }) => {
  const getArrowIcon = (direction: string) => {
    switch (direction) {
      case 'right': return <ArrowRight className="w-4 h-4 sm:w-6 sm:h-6" />;
      case 'left': return <ArrowLeft className="w-4 h-4 sm:w-6 sm:h-6" />;
      case 'up': return <ArrowUp className="w-4 h-4 sm:w-6 sm:h-6" />;
      case 'down': return <ArrowDown className="w-4 h-4 sm:w-6 sm:h-6" />;
      default: return <ArrowRight className="w-4 h-4 sm:w-6 sm:h-6" />;
    }
  };

  return (
    <Card className="p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-slate-800/90 to-slate-700/90 backdrop-blur-sm border-slate-600/50 text-center w-[95vw] sm:w-[90vw] md:w-[600px] max-w-[600px] max-h-[85vh] overflow-y-auto">
      <div className="mb-4 sm:mb-6">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-2 sm:mb-3">
          Welcome to My Universe
        </h1>
        <p className="text-sm sm:text-base lg:text-lg text-slate-300 mb-4 sm:mb-6">
          Navigate through different dimensions of my life
        </p>
        <div className="text-xs sm:text-sm text-slate-400 mb-3 sm:mb-4">
          Use arrow keys, tap cards, or drag to explore
        </div>
      </div>

      {/* Navigation hints */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-4 sm:mb-6">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => onNavigateToSection(section.id)}
            className={`p-3 sm:p-4 rounded-lg border border-slate-600/50 hover:border-slate-400/50 transition-all duration-300 hover:scale-105 ${section.gradient} backdrop-blur-sm group touch-manipulation`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-lg sm:text-xl">{section.icon}</span>
              <div className="opacity-70 group-hover:opacity-100 transition-opacity">
                {getArrowIcon(section.direction)}
              </div>
            </div>
            <div className="text-left">
              <div className="font-semibold text-white text-xs sm:text-sm">{section.title}</div>
              <div className="text-xs text-slate-300">{section.subtitle}</div>
            </div>
          </button>
        ))}
      </div>

      <Badge variant="secondary" className="text-xs">
        Press ESC to return home
      </Badge>
    </Card>
  );
};

export default HomeSection;
