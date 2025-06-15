
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink } from 'lucide-react';

interface ProjectsSectionProps {
  gradient: string;
  icon: string;
  title: string;
  subtitle: string;
  onNavigateHome: () => void;
  onNavigateToSection: (sectionId: string) => void;
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  gradient,
  icon,
  title,
  subtitle,
  onNavigateHome,
  onNavigateToSection,
}) => {
  return (
    <Card className={`p-4 sm:p-6 ${gradient} backdrop-blur-sm border-slate-600/50 w-[95vw] sm:w-[90vw] md:w-[700px] max-w-[700px] max-h-[85vh] overflow-y-auto`}>
      <div className="text-center mb-4 sm:mb-6">
        <span className="text-2xl sm:text-3xl lg:text-4xl mb-2 sm:mb-3 block">{icon}</span>
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 mb-2">{title}</h2>
        <p className="text-sm sm:text-base text-slate-300">{subtitle}</p>
      </div>
      
      <div className="grid grid-cols-1 gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div className="bg-slate-800/50 p-3 sm:p-4 rounded-lg">
          <h3 className="text-base sm:text-lg font-semibold text-white mb-2">Interactive Portfolio</h3>
          <p className="text-slate-300 text-sm">This infinite canvas portfolio you're currently exploring! Built with React, TypeScript, and Tailwind CSS.</p>
          <div className="flex flex-wrap gap-1 mt-2">
            <Badge className="text-xs">React</Badge>
            <Badge className="text-xs">TypeScript</Badge>
            <Badge className="text-xs">Canvas API</Badge>
          </div>
        </div>
        
        <div className="bg-slate-800/50 p-3 sm:p-4 rounded-lg">
          <h3 className="text-base sm:text-lg font-semibold text-white mb-2">Task Management App</h3>
          <p className="text-slate-300 text-sm">A full-stack productivity app with real-time collaboration features and advanced filtering options.</p>
          <div className="flex flex-wrap gap-1 mt-2">
            <Badge className="text-xs">Next.js</Badge>
            <Badge className="text-xs">PostgreSQL</Badge>
            <Badge className="text-xs">WebSockets</Badge>
          </div>
        </div>
        
        <div className="bg-slate-800/50 p-3 sm:p-4 rounded-lg">
          <h3 className="text-base sm:text-lg font-semibold text-white mb-2">Weather Dashboard</h3>
          <p className="text-slate-300 text-sm">Beautiful weather visualization with interactive charts and location-based forecasts.</p>
          <div className="flex flex-wrap gap-1 mt-2">
            <Badge className="text-xs">Vue.js</Badge>
            <Badge className="text-xs">Chart.js</Badge>
            <Badge className="text-xs">Weather API</Badge>
          </div>
        </div>
        
        <div className="bg-slate-800/50 p-3 sm:p-4 rounded-lg">
          <h3 className="text-base sm:text-lg font-semibold text-white mb-2">Open Source Contributions</h3>
          <p className="text-slate-300 text-sm">Contributing to various open source projects, focusing on accessibility improvements and performance optimizations.</p>
          <div className="flex flex-wrap gap-1 mt-2">
            <Badge className="text-xs">GitHub</Badge>
            <Badge className="text-xs">Accessibility</Badge>
            <Badge className="text-xs">Performance</Badge>
          </div>
        </div>
      </div>
      
      <div className="flex gap-2 justify-center mb-4">
        <button 
          onClick={() => onNavigateToSection('work')}
          className="px-4 py-3 bg-blue-500/30 hover:bg-blue-500/40 text-white rounded-lg transition-all duration-300 text-sm touch-manipulation flex items-center gap-2"
        >
          <ExternalLink className="w-4 h-4" />
          View Work Experience
        </button>
        <button 
          onClick={onNavigateHome}
          className="px-4 py-3 bg-white/30 hover:bg-white/40 text-white rounded-lg transition-all duration-300 text-sm touch-manipulation"
        >
          ← Back to Home
        </button>
      </div>
    </Card>
  );
};

export default ProjectsSection;
