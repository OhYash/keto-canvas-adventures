
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft } from 'lucide-react';

interface WorkSectionProps {
  gradient: string;
  icon: string;
  title: string;
  subtitle: string;
  onNavigateHome: () => void;
}

const WorkSection: React.FC<WorkSectionProps> = ({
  gradient,
  icon,
  title,
  subtitle,
  onNavigateHome,
}) => {
  return (
    <Card className={`p-4 sm:p-6 ${gradient} backdrop-blur-sm border-slate-600/50 w-[95vw] sm:w-[90vw] md:w-[700px] max-w-[700px] max-h-[85vh] overflow-y-auto`}>
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={onNavigateHome}
          className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors bg-slate-800/50 hover:bg-slate-700/50 px-3 py-2 rounded-lg"
        >
          <ArrowLeft className="w-4 h-4" />
          Home
        </button>
        <div className="text-2xl sm:text-3xl">{icon}</div>
      </div>

      <div className="text-center mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 mb-2">{title}</h2>
        <p className="text-sm sm:text-base text-slate-300">{subtitle}</p>
      </div>
      
      <div className="grid grid-cols-1 gap-3 sm:gap-4">
        <div className="bg-slate-800/50 p-3 sm:p-4 rounded-lg">
          <h3 className="text-base sm:text-lg font-semibold text-white mb-2">Frontend Development</h3>
          <p className="text-slate-300 mb-3 text-sm">Building modern, responsive web applications with React, TypeScript, and modern CSS frameworks.</p>
          <div className="flex flex-wrap gap-1">
            <Badge className="text-xs">React</Badge>
            <Badge className="text-xs">TypeScript</Badge>
            <Badge className="text-xs">Tailwind CSS</Badge>
          </div>
        </div>
        
        <div className="bg-slate-800/50 p-3 sm:p-4 rounded-lg">
          <h3 className="text-base sm:text-lg font-semibold text-white mb-2">UI/UX Design</h3>
          <p className="text-slate-300 mb-3 text-sm">Creating intuitive user experiences and beautiful interfaces that users love to interact with.</p>
          <div className="flex flex-wrap gap-1">
            <Badge className="text-xs">Figma</Badge>
            <Badge className="text-xs">Design Systems</Badge>
            <Badge className="text-xs">Prototyping</Badge>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default WorkSection;
