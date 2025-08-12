
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Heart, Star } from 'lucide-react';
import { handleCopyUrl } from '@/utils/urlUtils';

interface KetoSectionProps {
  gradient: string;
  icon: string;
  title: string;
  subtitle: string;
  onNavigateHome: () => void;
}

const KetoSection: React.FC<KetoSectionProps> = ({
  gradient,
  icon,
  title,
  subtitle,
  onNavigateHome,
}) => {
  const [showRunningCat, setShowRunningCat] = useState(false);

  const ketoTraits = [
    {
      title: "Personality",
      description: "Keto is a beautiful golden Persian cat who's quite shy and afraid of people. Despite his timid nature, he has the most expressive eyes and a gentle soul."
    },
    {
      title: "Favorite Activities",
      description: "Keto absolutely loves spending time on the terrace - it's his sanctuary. He hates going outside anywhere else but finds peace and joy in his terrace kingdom."
    },
    {
      title: "Daily Mission",
      description: "Every single day, Keto attempts to catch pigeons on the terrace. Despite failing every time, he never gives up and approaches each attempt with the same determination."
    },
    {
      title: "Life Lessons",
      description: "Keto has taught me about perseverance through his daily pigeon-catching attempts. His unwavering dedication despite constant failure is a beautiful reminder to never give up on our dreams."
    }
  ];

  const handleSecondImageClick = () => {
    setShowRunningCat(true);
    setTimeout(() => setShowRunningCat(false), 3000); // Hide after 3 seconds
  };

  return (
    <>
      {/* Running Cat Easter Egg */}
      {showRunningCat && (
        <div className="fixed top-1/2 -left-16 z-50 text-6xl animate-[slide-in-right_3s_ease-out]">
          🐱
        </div>
      )}

      <Card className={`w-[95vw] sm:w-[90vw] md:w-[700px] max-w-[700px] max-h-[85vh] overflow-y-auto ${gradient} backdrop-blur-sm border-slate-600/50`}>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={onNavigateHome}
              className="flex items-center gap-2 text-slate-700 hover:text-slate-900 transition-colors bg-white/80 hover:bg-white/90 px-3 py-2 rounded-lg text-sm font-medium shadow-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Home
            </button>
            <button
              onClick={handleCopyUrl}
              className="text-2xl sm:text-3xl hover:scale-110 transition-transform duration-200 cursor-pointer"
              title="Copy page link"
            >
              {icon}
            </button>
          </div>
          
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
              {title}
            </h1>
            <p className="text-slate-700 text-sm sm:text-base mb-4">
              {subtitle}
            </p>
          </div>
        </CardHeader>

        <CardContent className="space-y-5">
          {/* Cat Images */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-3 border border-slate-300/50 hover:border-slate-400/50 transition-all duration-200 hover:shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=300&h=200&fit=crop" 
                alt="Golden Persian cat like Keto on his terrace" 
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
                className="w-full h-28 object-cover rounded-lg mb-2"
              />
              <h4 className="text-sm font-bold text-slate-900">The Pigeon Hunter 🎯</h4>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-3">
              <Heart className="w-5 h-5 text-slate-800" />
              <h2 className="text-lg font-bold text-slate-900">All About Keto</h2>
            </div>

            {ketoTraits.map((trait, index) => (
              <div
                key={index}
                className="bg-white/90 backdrop-blur-sm rounded-xl p-4 border border-slate-300/50 hover:border-slate-400/50 transition-all duration-200 hover:shadow-md"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Star className="w-4 h-4 text-slate-700" />
                  <h3 className="text-base font-bold text-slate-900">{trait.title}</h3>
                </div>
                <p className="text-slate-700 text-sm leading-relaxed">
                  {trait.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-4 p-4 bg-white/80 rounded-xl border border-slate-300/50">
            <p className="text-slate-700 text-sm italic text-center leading-relaxed">
              "In a world full of chaos, Keto reminds me that persistence and having your own safe space (like his beloved terrace) are the keys to contentment."
            </p>
          </div>

          <div className="text-center pt-3">
            <Badge variant="secondary" className="text-xs bg-slate-800 text-white hover:bg-slate-700 px-4 py-2">
              Golden Persian · Terrace King · Professional Pigeon Stalker
            </Badge>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default KetoSection;
