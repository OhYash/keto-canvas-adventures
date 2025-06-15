
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, ArrowLeft, ArrowUp, ArrowDown, Compass } from 'lucide-react';

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
      case 'right': return <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />;
      case 'left': return <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />;
      case 'up': return <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5" />;
      case 'down': return <ArrowDown className="w-4 h-4 sm:w-5 sm:h-5" />;
      default: return <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />;
    }
  };

  return (
    <Card className="w-[95vw] sm:w-[90vw] md:w-[600px] max-w-[600px] max-h-[85vh] overflow-y-auto bg-gradient-to-br from-slate-800/90 to-slate-700/90 backdrop-blur-sm border-slate-600/50">
      <CardHeader className="pb-6">
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Compass className="w-8 h-8 text-white" />
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              Welcome to My Universe
            </h1>
          </div>
          <p className="text-slate-300 text-base sm:text-lg mb-6 font-medium">
            Navigate through different dimensions of my life
          </p>
          <div className="bg-white/10 rounded-lg px-4 py-2 inline-block">
            <p className="text-slate-300 text-sm font-medium">
              Use arrow keys, tap cards, or drag to explore
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Navigation Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => onNavigateToSection(section.id)}
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-slate-500/30 hover:border-slate-400/50 transition-all duration-300 hover:scale-105 group touch-manipulation"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl">{section.icon}</span>
                <div className="opacity-70 group-hover:opacity-100 transition-opacity text-slate-300 group-hover:text-white">
                  {getArrowIcon(section.direction)}
                </div>
              </div>
              <div className="text-left">
                <h3 className="font-bold text-white text-base mb-1">{section.title}</h3>
                <p className="text-slate-300 text-sm leading-relaxed">{section.subtitle}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Welcome Message */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-slate-500/30">
          <p className="text-slate-200 text-base italic text-center font-medium leading-relaxed">
            "Discover my journey through work, personal interests, and creative projects. Each section tells a different part of my story."
          </p>
        </div>

        {/* Navigation Instructions */}
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-white text-center mb-4">Quick Navigation</h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="bg-white/5 rounded-lg p-3 text-center">
              <div className="text-slate-300 font-medium">Arrow Keys</div>
              <div className="text-slate-400 text-xs">Keyboard navigation</div>
            </div>
            <div className="bg-white/5 rounded-lg p-3 text-center">
              <div className="text-slate-300 font-medium">Drag & Pan</div>
              <div className="text-slate-400 text-xs">Mouse or touch</div>
            </div>
          </div>
        </div>

        <div className="text-center pt-4">
          <Badge variant="secondary" className="text-sm font-semibold bg-white/20 text-white hover:bg-white/30 px-4 py-2 border-0">
            Press ESC to return home anytime
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default HomeSection;
