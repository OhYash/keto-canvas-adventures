import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Bike, Star } from 'lucide-react';
import SectionCard from '@/components/canvas/SectionCard';
import { atacoStories, atacoQuickFacts, atacoPhotos } from '@/data/atacoData';

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
      {/* Real Ataco Photos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {atacoPhotos.map((photo, index) => (
          <div
            key={index}
            className="bg-white/90 backdrop-blur-sm rounded-xl p-3 border border-slate-300/50 hover:border-slate-400/50 transition-all duration-200 hover:shadow-md flex flex-col"
          >
            <div className="w-full aspect-square overflow-hidden rounded-lg mb-2 bg-slate-100/50">
              <img 
                src={photo.src} 
                alt={photo.alt} 
                width={400}
                height={400}
                loading="lazy"
                className={`w-full h-full object-cover ${photo.objectPosition || 'object-center'} transition-transform duration-300 hover:scale-105`}
              />
            </div>
            <h4 className="text-sm font-bold text-slate-900">{photo.caption}</h4>
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
