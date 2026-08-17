import React from "react";
import { Badge } from "@/components/ui/badge";
import {
  Palette,
  Music,
  Code,
  Terminal,
  Cpu,
  Bike,
  Waves,
} from "lucide-react";
import SectionCard from "@/components/canvas/SectionCard";
import { hobbies } from "@/data/hobbiesData";

interface HobbiesSectionProps {
  gradient: string;
  icon: string;
  title: string;
  subtitle: string;
  isActive?: boolean;
  onNavigateHome: () => void;
  onNavigateToSection: (sectionId: string) => void;
}

const HobbiesSection: React.FC<HobbiesSectionProps> = ({
  gradient,
  icon,
  title,
  subtitle,
  isActive = false,
  onNavigateHome,
  onNavigateToSection,
}) => {
  const renderIcon = (type: 'terminal' | 'cpu' | 'bike' | 'waves' | 'music') => {
    switch (type) {
      case 'terminal':
        return <Terminal className="w-5 h-5" />;
      case 'cpu':
        return <Cpu className="w-5 h-5" />;
      case 'bike':
        return <Bike className="w-5 h-5" />;
      case 'waves':
        return <Waves className="w-5 h-5" />;
      case 'music':
        return <Music className="w-5 h-5" />;
      default:
        return <Palette className="w-5 h-5" />;
    }
  };

  return (
    <SectionCard
      gradient={gradient}
      icon={icon}
      title={title}
      subtitle={subtitle}
      isActive={isActive}
      onNavigateHome={onNavigateHome}
      contentClassName="space-y-4"
    >
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-3">
          <Palette className="w-5 h-5 text-slate-800" />
          <h3 className="text-lg font-bold text-slate-900">My Hobbies</h3>
        </div>

        {hobbies.map((hobby, index) => (
          <div
            key={index}
            className="bg-white/90 backdrop-blur-sm rounded-xl p-4 border border-slate-300/50 hover:border-slate-400/50 transition-all duration-200 hover:shadow-md"
          >
            <div className="mb-3">
              <div className="flex items-center gap-3 mb-2">
                <div className="text-slate-700">{renderIcon(hobby.iconType)}</div>
                <h4 className="text-base font-bold text-slate-900">
                  {hobby.title}
                </h4>
              </div>
              <p className="text-slate-700 text-sm leading-relaxed mb-3">
                {hobby.description}
              </p>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap gap-2">
                  {hobby.tags.map((tag, tagIndex) => (
                    <Badge
                      key={tagIndex}
                      variant="secondary"
                      className="text-xs bg-slate-800 text-white hover:bg-slate-700"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                {hobby.internalTarget && hobby.targetLabel && (
                  <a
                    href={`/${hobby.internalTarget}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigateToSection(hobby.internalTarget!);
                    }}
                    className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 transition-colors underline decoration-dotted underline-offset-2 ml-auto"
                  >
                    {hobby.targetLabel}
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 border border-slate-300/50 hover:border-slate-400/50 transition-all duration-200 hover:shadow-md">
        <div className="flex items-center gap-3 mb-3">
          <Code className="w-5 h-5 text-slate-700" />
          <h3 className="text-lg font-bold text-slate-900">
            Personal Projects
          </h3>
        </div>
        <p className="text-slate-700 text-sm leading-relaxed mb-3">
          Dive deeper into my coding projects and creative endeavors. See what
          I've been building in my spare time.
        </p>
        <a
          href="/projects"
          onClick={(e) => {
            e.preventDefault();
            onNavigateToSection("projects");
          }}
          className="w-full px-4 py-2.5 bg-indigo-500/20 hover:bg-indigo-500/30 text-slate-800 rounded-lg transition-all duration-300 text-sm font-semibold touch-manipulation flex items-center justify-center gap-2 border border-indigo-400/30 block text-center"
        >
          <Code className="w-4 h-4" />
          View Personal Projects
        </a>
      </div>
    </SectionCard>
  );
};

export default HobbiesSection;
