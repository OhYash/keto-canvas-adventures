import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Bike, Camera, Star } from 'lucide-react';
import SectionCard from '@/components/canvas/SectionCard';
import { atacoStories, atacoQuickFacts, atacoPhotoSlots } from '@/data/atacoData';

interface AtacoSectionProps {
  gradient: string;
  icon: string;
  title: string;
  subtitle: string;
  isActive?: boolean;
  onNavigateHome: () => void;
}

const AtacoSection: React.FC<AtacoSectionProps> = ({
  gradient,
  icon,
  title,
  subtitle,
  isActive = false,
  onNavigateHome,
}) => {
  return (
    <SectionCard
      gradient={gradient}
      icon={icon}
      title={title}
      subtitle={subtitle}
      isActive={isActive}
      onNavigateHome={onNavigateHome}
    >
      {/* Photo placeholders — real pictures of Ataco coming, never stock */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {atacoPhotoSlots.map((slot, index) => (
          <div
            key={index}
            className="bg-white/90 backdrop-blur-sm rounded-xl p-3 border border-slate-300/50"
          >
            <div className="w-full h-28 rounded-lg mb-2 bg-gradient-to-br from-lime-100 to-emerald-100 border border-dashed border-slate-400/60 flex flex-col items-center justify-center gap-1">
              <Camera className="w-6 h-6 text-slate-500" />
              <span className="text-xs text-slate-600">Real photo on its way</span>
            </div>
            <h4 className="text-sm font-bold text-slate-900">{slot.caption}</h4>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-3">
          <Bike className="w-5 h-5 text-slate-800" />
          <h3 className="text-lg font-bold text-slate-900">The Ataco File</h3>
        </div>

        {atacoStories.map((story, index) => (
          <div
            key={index}
            className="bg-white/90 backdrop-blur-sm rounded-xl p-4 border border-slate-300/50 hover:border-slate-400/50 transition-all duration-200 hover:shadow-md"
          >
            <div className="flex items-center gap-3 mb-2">
              <Star className="w-4 h-4 text-slate-700" />
              <h4 className="text-base font-bold text-slate-900">{story.title}</h4>
            </div>
            <p className="text-slate-700 text-sm leading-relaxed">
              {story.description}
            </p>
          </div>
        ))}
      </div>

      <div className="text-center pt-3">
        <Badge variant="secondary" className="text-xs bg-slate-800 text-white hover:bg-slate-700 px-4 py-2">
          {atacoQuickFacts.join(' · ')}
        </Badge>
      </div>
    </SectionCard>
  );
};

export default AtacoSection;
