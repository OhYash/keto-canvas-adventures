import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Sparkles, ArrowUpRight, Maximize2 } from 'lucide-react';

interface Position {
  x: number;
  y: number;
}

interface Section {
  id: string;
  title: string;
  subtitle: string;
  position: Position;
  color: string;
  gradient: string;
  icon: string;
  direction: 'right' | 'left' | 'up' | 'down';
  parent?: string;
}

interface SectionPlaceholderProps {
  section: Section;
  onNavigateToSection: (sectionId: string) => void;
}

const SectionPlaceholder: React.FC<SectionPlaceholderProps> = ({
  section,
  onNavigateToSection,
}) => {
  return (
    <Card
      onClick={() => onNavigateToSection(section.id)}
      className={`w-[90vw] sm:w-[380px] cursor-pointer ${section.gradient} backdrop-blur-md border border-slate-600/60 hover:border-slate-400/80 transition-all duration-300 transform hover:scale-[1.03] shadow-xl group overflow-hidden select-none`}
    >
      <CardHeader className="p-5 pb-3">
        <div className="flex items-center justify-between mb-3">
          <span className="text-3xl sm:text-4xl group-hover:scale-110 transition-transform duration-300 drop-shadow-sm">
            {section.icon}
          </span>
          <span className="flex items-center gap-1 text-[11px] font-semibold tracking-wide uppercase px-2.5 py-1 rounded-full bg-white/20 text-slate-800 backdrop-blur-sm group-hover:bg-white/30 transition-colors border border-white/30">
            Preview
            <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </span>
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900 group-hover:text-black transition-colors mb-1">
            {section.title}
          </h3>
          <p className="text-xs text-slate-700/90 line-clamp-2 leading-relaxed">
            {section.subtitle}
          </p>
        </div>
      </CardHeader>
      <CardContent className="p-5 pt-0">
        <div className="w-full mt-2 py-2 px-3 rounded-lg bg-slate-900/10 group-hover:bg-slate-900/20 text-slate-800 text-xs font-medium flex items-center justify-between transition-colors border border-slate-900/5">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
            Pan or click to expand
          </span>
          <Maximize2 className="w-3.5 h-3.5 text-slate-600 group-hover:scale-110 transition-transform" />
        </div>
      </CardContent>
    </Card>
  );
};

export default SectionPlaceholder;
