
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Heart, Star } from 'lucide-react';

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
  const ketoTraits = [
    {
      title: "Personality",
      description: "Keto is the most curious and playful cat you'll ever meet. Always getting into mischief and making us laugh."
    },
    {
      title: "Favorite Activities",
      description: "Chasing laser dots, napping in sunbeams, and somehow always knowing when it's treat time."
    },
    {
      title: "Special Talents",
      description: "Master of opening doors, professional lap warmer, and expert at judging my coding skills from across the room."
    },
    {
      title: "Life Lessons",
      description: "Keto has taught me the importance of curiosity, rest, and finding joy in simple moments."
    }
  ];

  return (
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
          <div className="text-2xl sm:text-3xl">{icon}</div>
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
              alt="Orange tabby cat like Keto" 
              className="w-full h-28 object-cover rounded-lg mb-2"
            />
            <h4 className="text-sm font-bold text-slate-900">Keto's Relaxation Time</h4>
          </div>
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-3 border border-slate-300/50 hover:border-slate-400/50 transition-all duration-200 hover:shadow-md">
            <img 
              src="https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=300&h=200&fit=crop&sat=-100" 
              alt="Another adorable photo of Keto" 
              className="w-full h-28 object-cover rounded-lg mb-2 grayscale"
            />
            <h4 className="text-sm font-bold text-slate-900">Portrait Mode</h4>
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
            "In a world full of chaos, Keto reminds me that sometimes the best thing to do is find a sunny spot and take a nap."
          </p>
        </div>

        <div className="text-center pt-3">
          <Badge variant="secondary" className="text-xs bg-slate-800 text-white hover:bg-slate-700 px-4 py-2">
            The goodest cat · Professional napper
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default KetoSection;
