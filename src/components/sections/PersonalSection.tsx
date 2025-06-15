
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, User, MapPin, Camera, Heart } from 'lucide-react';

interface PersonalSectionProps {
  gradient: string;
  icon: string;
  title: string;
  subtitle: string;
  onNavigateHome: () => void;
}

const PersonalSection: React.FC<PersonalSectionProps> = ({
  gradient,
  icon,
  title,
  subtitle,
  onNavigateHome,
}) => {
  const personalCategories = [
    {
      title: "Physical Stats",
      icon: <User className="w-5 h-5" />,
      items: [
        { label: "Height", value: "5'10\" (178 cm)" },
        { label: "Weight", value: "165 lbs (75 kg)" },
        { label: "Build", value: "Athletic" }
      ]
    },
    {
      title: "Food Preferences",
      icon: <Heart className="w-5 h-5" />,
      items: [
        { label: "🍕", value: "Pizza lover" },
        { label: "🍜", value: "Asian cuisine enthusiast" },
        { label: "☕", value: "Coffee addict" },
        { label: "🥗", value: "Health-conscious eater" }
      ]
    },
    {
      title: "Sports & Activities",
      icon: <Heart className="w-5 h-5" />,
      items: [
        { label: "🏸", value: "Badminton player" },
        { label: "🏃‍♂️", value: "Running enthusiast" },
        { label: "🏊‍♂️", value: "Swimming" },
        { label: "🧘‍♂️", value: "Yoga practitioner" }
      ]
    },
    {
      title: "Lifestyle",
      icon: <Heart className="w-5 h-5" />,
      items: [
        { label: "🌅", value: "Early riser" },
        { label: "📚", value: "Avid reader" },
        { label: "🎵", value: "Music lover" },
        { label: "🌍", value: "Travel enthusiast" }
      ]
    }
  ];

  return (
    <Card className={`w-[95vw] sm:w-[90vw] md:w-[700px] max-w-[700px] max-h-[85vh] overflow-y-auto ${gradient} backdrop-blur-sm border-slate-600/50`}>
      <CardHeader className="pb-6">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onNavigateHome}
            className="flex items-center gap-2 text-slate-700 hover:text-slate-900 transition-colors bg-white/80 hover:bg-white/90 px-4 py-2 rounded-lg font-medium shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Home
          </button>
          <div className="text-3xl sm:text-4xl">{icon}</div>
        </div>
        
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
            {title}
          </h1>
          <p className="text-slate-700 text-base sm:text-lg mb-6 font-medium">
            {subtitle}
          </p>
        </div>
      </CardHeader>

      <CardContent className="space-y-8">
        {/* Profile Image Section */}
        <div className="flex justify-center">
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 border border-slate-300/50">
            <img 
              src="https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=200&h=300&fit=crop" 
              alt="Full body profile" 
              className="w-32 h-48 sm:w-40 sm:h-60 object-cover rounded-lg mx-auto mb-3"
            />
            <p className="text-sm text-slate-600 text-center font-medium">Wii character style standing pose</p>
          </div>
        </div>
        
        {/* Personal Facts */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <User className="w-6 h-6 text-slate-800" />
            <h2 className="text-xl font-bold text-slate-900">About Me</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {personalCategories.map((category, index) => (
              <div
                key={index}
                className="bg-white/90 backdrop-blur-sm rounded-xl p-6 border border-slate-300/50 hover:border-slate-400/50 transition-all duration-200 hover:shadow-md"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-slate-700">{category.icon}</div>
                  <h3 className="text-lg font-bold text-slate-900">{category.title}</h3>
                </div>
                <div className="space-y-2">
                  {category.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex justify-between items-center">
                      <span className="text-slate-700 font-medium">{item.label}</span>
                      <span className="text-slate-600">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Travel Adventures */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 border border-slate-300/50 hover:border-slate-400/50 transition-all duration-200 hover:shadow-md">
          <div className="flex items-center gap-3 mb-4">
            <MapPin className="w-6 h-6 text-slate-700" />
            <h3 className="text-xl font-bold text-slate-900">Travel Adventures</h3>
          </div>
          <p className="text-slate-700 font-medium leading-relaxed mb-4">
            Explore my journey around the world through stories and photos from various destinations.
          </p>
          <button 
            onClick={() => console.log('Navigate to travel stories')}
            className="w-full px-4 py-3 bg-emerald-500/20 hover:bg-emerald-500/30 text-slate-800 rounded-lg transition-all duration-300 font-semibold touch-manipulation flex items-center justify-center gap-2 border border-emerald-400/30"
          >
            <Camera className="w-4 h-4" />
            View Travel Stories
          </button>
        </div>

        <div className="mt-8 p-6 bg-white/80 rounded-xl border border-slate-300/50">
          <p className="text-slate-700 text-base italic text-center font-medium leading-relaxed">
            "Life is about collecting moments, not things. Every experience shapes who we become."
          </p>
        </div>

        <div className="text-center pt-6">
          <Badge variant="secondary" className="text-sm font-semibold bg-slate-800 text-white hover:bg-slate-700 px-4 py-2">
            Always exploring · Always learning
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalSection;
