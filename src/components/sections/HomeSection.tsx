
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, ArrowLeft, ArrowUp, ArrowDown, Compass, Eye } from 'lucide-react';
import { useVisitTracking } from '@/hooks/useVisitTracking';

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
  const { getSectionVisits, getTotalVisits, getMostVisitedSections } = useVisitTracking();

  const getArrowIcon = (direction: string) => {
    switch (direction) {
      case 'right': return <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />;
      case 'left': return <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />;
      case 'up': return <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5" />;
      case 'down': return <ArrowDown className="w-4 h-4 sm:w-5 sm:h-5" />;
      default: return <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />;
    }
  };

  const getVisitIndicator = (sectionId: string) => {
    const visits = getSectionVisits(sectionId);
    if (visits.visitCount === 0) return null;
    
    return (
      <div className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
        {visits.visitCount > 99 ? '99+' : visits.visitCount}
      </div>
    );
  };

  return (
    <Card className="w-[95vw] sm:w-[90vw] md:w-[600px] max-w-[600px] max-h-[85vh] overflow-y-auto bg-gradient-to-br from-slate-800/90 to-slate-700/90 backdrop-blur-sm border-slate-600/50">
      <CardHeader className="pb-6">
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Compass className="w-6 h-6 text-white" />
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              Welcome to My Universe
            </h1>
          </div>
          <p className="text-slate-300 text-sm sm:text-base mb-6">
            Navigate through different dimensions of my life
          </p>
          <div className="bg-white/10 rounded-lg px-4 py-2 inline-block">
            <p className="text-slate-300 text-xs">
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
              className="relative bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-slate-500/30 hover:border-slate-400/50 transition-all duration-300 hover:scale-105 group touch-manipulation"
            >
              {getVisitIndicator(section.id)}
              <div className="flex items-center justify-between mb-3">
                <span className="text-xl">{section.icon}</span>
                <div className="opacity-70 group-hover:opacity-100 transition-opacity text-slate-300 group-hover:text-white">
                  {getArrowIcon(section.direction)}
                </div>
              </div>
              <div className="text-left">
                <h3 className="font-bold text-white text-sm mb-1">{section.title}</h3>
                <p className="text-slate-300 text-xs leading-relaxed">{section.subtitle}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Visit Statistics */}
        {getTotalVisits() > 0 && (
          <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-xl p-4 border border-blue-500/30">
            <div className="flex items-center gap-2 mb-3">
              <Eye className="w-4 h-4 text-blue-400" />
              <h3 className="text-white font-semibold text-sm">Your Journey So Far</h3>
            </div>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-white">{getTotalVisits()}</div>
                <div className="text-xs text-slate-300">Total Visits</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{getMostVisitedSections(1)[0]?.visitCount || 0}</div>
                <div className="text-xs text-slate-300">Most Visited</div>
              </div>
            </div>
            {getMostVisitedSections(3).length > 0 && (
              <div className="mt-3 pt-3 border-t border-white/10">
                <div className="text-xs text-slate-300 mb-2">Popular Sections:</div>
                <div className="flex flex-wrap gap-2">
                  {getMostVisitedSections(3).map(({ sectionId, visitCount }) => {
                    const section = sections.find(s => s.id === sectionId);
                    return section ? (
                      <Badge key={sectionId} variant="secondary" className="text-xs bg-white/10 text-white border-0">
                        {section.icon} {section.title} ({visitCount})
                      </Badge>
                    ) : null;
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Welcome Message */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-slate-500/30">
          <p className="text-slate-200 text-sm italic text-center leading-relaxed">
            "Discover my journey through work, personal interests, and creative projects. Each section tells a different part of my story."
          </p>
        </div>

        {/* Navigation Instructions */}
        <div className="space-y-3">
          <h3 className="text-base font-bold text-white text-center mb-4">Quick Navigation</h3>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-white/5 rounded-lg p-3 text-center">
              <div className="text-slate-300">Arrow Keys</div>
              <div className="text-slate-400 text-xs">Keyboard navigation</div>
            </div>
            <div className="bg-white/5 rounded-lg p-3 text-center">
              <div className="text-slate-300">Drag & Pan</div>
              <div className="text-slate-400 text-xs">Mouse or touch</div>
            </div>
          </div>
        </div>

        <div className="text-center pt-4">
          <Badge variant="secondary" className="text-xs bg-white/20 text-white hover:bg-white/30 px-4 py-2 border-0">
            Press ESC to return home anytime
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default HomeSection;
