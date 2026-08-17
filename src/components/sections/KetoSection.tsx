import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Heart, Star } from 'lucide-react';
import SectionCard from '@/components/canvas/SectionCard';
import { ketoTraits, ketoQuote, ketoBadge } from '@/data/ketoData';

interface KetoSectionProps {
  gradient: string;
  icon: string;
  title: string;
  subtitle: string;
  isActive?: boolean;
  onNavigateHome: () => void;
  onNavigateToSection?: (sectionId: string) => void;
}

const KetoSection: React.FC<KetoSectionProps> = ({
  gradient,
  icon,
  title,
  subtitle,
  isActive = false,
  onNavigateHome,
  onNavigateToSection,
}) => {
  const [showRunningCat, setShowRunningCat] = useState(false);

  const handleSecondImageClick = () => {
    setShowRunningCat(true);
    setTimeout(() => setShowRunningCat(false), 3000);
  };

  return (
    <>
      {/* Running Cat Easter Egg */}
      {showRunningCat && (
        <div className="fixed top-1/2 -left-16 z-50 text-6xl animate-[slide-in-right_3s_ease-out]">
          🐱
        </div>
      )}

      <SectionCard
        gradient={gradient}
        icon={icon}
        title={title}
        subtitle={subtitle}
        isActive={isActive}
        onNavigateHome={onNavigateHome}
      >
        {/* Cat Images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-3 border border-slate-300/50 hover:border-slate-400/50 transition-all duration-200 hover:shadow-md">
            <img 
              src="https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=300&h=200&fit=crop" 
              alt="Golden Persian cat like Keto on his terrace" 
              width={300}
              height={200}
              loading="lazy"
              className="w-full h-28 object-cover rounded-lg mb-2"
            />
            <h4 className="text-sm font-bold text-slate-900">Keto's Terrace Kingdom</h4>
          </div>
          <div 
            className="bg-white/90 backdrop-blur-sm rounded-xl p-3 border border-slate-300/50 hover:border-slate-400/50 transition-all duration-200 hover:shadow-md cursor-pointer"
            onClick={handleSecondImageClick}
          >
            <img 
              src="https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=300&h=200&fit=crop" 
              alt="Golden Persian cat in hunting mode" 
              width={300}
              height={200}
              loading="lazy"
              className="w-full h-28 object-cover rounded-lg mb-2"
            />
            <h4 className="text-sm font-bold text-slate-900">The Pigeon Hunter 🎯</h4>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-3">
            <Heart className="w-5 h-5 text-slate-800" />
            <h3 className="text-lg font-bold text-slate-900">All About Keto</h3>
          </div>

          {ketoTraits.map((trait, index) => (
            <div
              key={index}
              className="bg-white/90 backdrop-blur-sm rounded-xl p-4 border border-slate-300/50 hover:border-slate-400/50 transition-all duration-200 hover:shadow-md"
            >
              <div className="flex items-center gap-3 mb-2">
                <Star className="w-4 h-4 text-slate-700" />
                <h4 className="text-base font-bold text-slate-900">{trait.title}</h4>
              </div>
              <p className="text-slate-700 text-sm leading-relaxed">
                {trait.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-4 p-4 bg-white/80 rounded-xl border border-slate-300/50">
          <p className="text-slate-700 text-sm italic text-center leading-relaxed">
            "{ketoQuote}"
          </p>
        </div>

        <div className="text-center pt-3">
          <Badge variant="secondary" className="text-xs bg-slate-800 text-white hover:bg-slate-700 px-4 py-2">
            {ketoBadge}
          </Badge>
        </div>

        <a
          href="/ataco"
          onClick={(e) => {
            e.preventDefault();
            onNavigateToSection?.('ataco');
          }}
          className="w-full bg-white/80 hover:bg-white/95 rounded-xl p-3 border border-slate-300/50 hover:border-slate-400/60 transition-all duration-200 hover:shadow-md text-sm text-slate-700 block text-center"
        >
          Keto isn't the only one around here with a name — meet Ataco ↑
        </a>
      </SectionCard>
    </>
  );
};

export default KetoSection;
