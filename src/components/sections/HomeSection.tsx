
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

  // Update the sections to change "Personal Life" to "About Me" and reorder them
  const displaySections = sections.map(section => {
    if (section.id === 'personal') {
      return { ...section, title: 'About Me' };
    }
    return section;
  });

  // Reorder sections: personal -> now -> keto -> hobbies -> work -> contact
  const reorderedSections = [
    displaySections.find(s => s.id === 'personal'),
    displaySections.find(s => s.id === 'now'),
    displaySections.find(s => s.id === 'keto'),
    displaySections.find(s => s.id === 'hobbies'),
    displaySections.find(s => s.id === 'work'),
    displaySections.find(s => s.id === 'contact')
  ].filter(Boolean) as Section[];

  return (
    <Card className="w-[95vw] sm:w-[90vw] md:w-[600px] max-w-[600px] max-h-[85vh] overflow-y-auto bg-gradient-to-br from-slate-800/90 to-slate-700/90 backdrop-blur-sm border-slate-600/50">
      <CardHeader className="pb-6">
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Compass className="w-6 h-6 text-white" />
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              👋 Hey, I'm Yash — welcome!
            </h1>
          </div>
          <p className="text-slate-300 text-sm sm:text-base mb-6">
            Dive into the different sides of who I am - from code to curiosity, work to wanderlust
          </p>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Navigation Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {reorderedSections.map((section) => (
            <button
              key={section.id}
              onClick={() => onNavigateToSection(section.id)}
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-slate-500/30 hover:border-slate-400/50 transition-all duration-300 hover:scale-105 group touch-manipulation"
            >
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

        {/* Visit Statistics - Hidden but code preserved */}
        {getTotalVisits() > 0 && (
          <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-xl p-4 border border-blue-500/30">
            <div className="flex items-center gap-2 mb-3">
              <Eye className="w-4 h-4 text-blue-400" />
              <h3 className="text-white font-semibold text-sm">Pages You've Visited</h3>
            </div>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-white">{getTotalVisits()}</div>
                <div className="text-xs text-slate-300">Total Page Visits</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{getMostVisitedSections(1)[0]?.visitCount || 0}</div>
                <div className="text-xs text-slate-300">Most Visited Page</div>
              </div>
            </div>
            {getMostVisitedSections(3).length > 0 && (
              <div className="mt-3 pt-3 border-t border-white/10">
                <div className="text-xs text-slate-300 mb-2">Your Most Visited Pages:</div>
                <div className="flex flex-wrap gap-2">
                  {getMostVisitedSections(3).map(({ sectionId, visitCount }) => {
                    const section = sections.find(s => s.id === sectionId);
                    return section ? (
                      <button
                        key={sectionId}
                        onClick={() => onNavigateToSection(sectionId)}
                        className="text-xs bg-white/10 hover:bg-white/20 text-white border-0 px-2 py-1 rounded-md transition-colors duration-200 cursor-pointer"
                      >
                        {section.icon} {section.title} ({visitCount})
                      </button>
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

        {/* Not sure where to start */}
        <div className="space-y-3">
          <h3 className="text-base font-bold text-white text-center mb-4">Not sure where to start?</h3>
          <div className="text-sm text-slate-300 space-y-3">
            <p className="mb-3 text-center text-slate-400">Try these:</p>
            <button
              onClick={() => onNavigateToSection('personal')}
              className="block w-full text-left bg-white/5 hover:bg-white/10 rounded-lg p-3 transition-colors duration-200 group"
            >
              <span className="text-slate-300 group-hover:text-white">👉 Just curious? </span>
              <span className="text-blue-400 group-hover:text-blue-300 underline">Start with "Who I Am"</span>
            </button>
            <button
              onClick={() => onNavigateToSection('work')}
              className="block w-full text-left bg-white/5 hover:bg-white/10 rounded-lg p-3 transition-colors duration-200 group"
            >
              <span className="text-slate-300 group-hover:text-white">🧑‍💻 From LinkedIn? </span>
              <span className="text-blue-400 group-hover:text-blue-300 underline">Check out "My Work Life"</span>
            </button>
            <button
              onClick={() => onNavigateToSection('keto')}
              className="block w-full text-left bg-white/5 hover:bg-white/10 rounded-lg p-3 transition-colors duration-200 group"
            >
              <span className="text-slate-300 group-hover:text-white">🐾 Followed for Keto? </span>
              <span className="text-blue-400 group-hover:text-blue-300 underline">Say hi to him here</span>
            </button>
            <button
              onClick={() => onNavigateToSection('hobbies')}
              className="block w-full text-left bg-white/5 hover:bg-white/10 rounded-lg p-3 transition-colors duration-200 group"
            >
              <span className="text-slate-300 group-hover:text-white">🧪 Into side projects? </span>
              <span className="text-blue-400 group-hover:text-blue-300 underline">See what I'm building</span>
            </button>
          </div>
        </div>

        <div className="text-center pt-4">
          <Badge variant="secondary" className="text-xs bg-white/20 text-white hover:bg-white/30 px-4 py-2 border-0">
            🌀 Lost? No worries—tap "Home" anytime to re-center.
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default HomeSection;
