
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, User, MapPin, Camera, Heart, Mail } from 'lucide-react';
import { toast } from 'sonner';

interface PersonalSectionProps {
  gradient: string;
  icon: string;
  title: string;
  subtitle: string;
  onNavigateHome: () => void;
  onNavigateToSection?: (sectionId: string) => void;
}

const PersonalSection: React.FC<PersonalSectionProps> = ({
  gradient,
  icon,
  title,
  subtitle,
  onNavigateHome,
  onNavigateToSection,
}) => {
  const personalCategories = [
    {
      title: "Physical Stats",
      icon: <User className="w-4 h-4" />,
      items: [
        { label: "Height", value: "5'11\" (181 cm)" },
        { label: "Weight", value: "72 KG (159 lbs)" },
        { label: "Build", value: "Tall skinny fat, slight athletic" }
      ]
    },
    {
      title: "Food Preferences",
      icon: <Heart className="w-4 h-4" />,
      items: [
        { label: "🍜", value: "Masala over bland" },
        { label: "☕", value: "Chai over Coffee" },
        { label: "🥗", value: "Health-conscious eater" }
      ]
    },
    {
      title: "Sports & Activities",
      icon: <Heart className="w-4 h-4" />,
      items: [
        { label: "🏋🏽‍♂️", value: "Gym" },
        { label: "🏃‍♂️", value: "Runs on wednesdays" },
      ]
    },
    {
      title: "Lifestyle",
      icon: <Heart className="w-4 h-4" />,
      items: [
        { label: "🌅", value: "Late riser" },
        { label: "🎵", value: "Rock and Metal" },
        { label: "🌍", value: "Travel enthusiast" }
      ]
    }
  ];

  const handleTravelStoriesClick = () => {
    toast.info("Travel Stories are not available at the moment", {
      description: "I'm preparing the stories and photos for you to see.",
      duration: 3000,
    });
  };

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
        {/* Profile Image Section */}
        <div className="flex justify-center">
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 border border-slate-300/50">
            <img 
              src="/personal/yash_loading_dp.jpg" 
              alt="Full body profile" 
              className="w-28 h-40 sm:w-32 sm:h-48 object-cover rounded-lg mx-auto mb-2"
            />
            <p className="text-xs text-slate-600 text-center">Its a me!</p>
          </div>
        </div>
        
        {/* Personal Facts */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-3">
            <User className="w-5 h-5 text-slate-800" />
            <h2 className="text-lg font-bold text-slate-900">About Me</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {personalCategories.map((category, index) => (
              <div
                key={index}
                className="bg-white/90 backdrop-blur-sm rounded-xl p-4 border border-slate-300/50 hover:border-slate-400/50 transition-all duration-200 hover:shadow-md"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-slate-700">{category.icon}</div>
                  <h3 className="text-base font-bold text-slate-900">{category.title}</h3>
                </div>
                <div className="space-y-1.5">
                  {category.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex justify-between items-center">
                      <span className="text-slate-700 text-sm">{item.label}</span>
                      <span className="text-slate-600 text-sm">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Travel Adventures */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 border border-slate-300/50 hover:border-slate-400/50 transition-all duration-200 hover:shadow-md">
          <div className="flex items-center gap-3 mb-3">
            <MapPin className="w-5 h-5 text-slate-700" />
            <h3 className="text-lg font-bold text-slate-900">Travel Adventures</h3>
          </div>
          <p className="text-slate-700 text-sm leading-relaxed mb-3">
            Explore my journey around the world through stories and photos from various destinations.
          </p>
          <button 
            onClick={handleTravelStoriesClick}
            className="w-full px-4 py-2.5 bg-emerald-500/20 hover:bg-emerald-500/30 text-slate-800 rounded-lg transition-all duration-300 text-sm font-semibold touch-manipulation flex items-center justify-center gap-2 border border-emerald-400/30"
          >
            <Camera className="w-4 h-4" />
            View Travel Stories
          </button>
        </div>

        {/* Contact Me */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 border border-slate-300/50 hover:border-slate-400/50 transition-all duration-200 hover:shadow-md">
          <div className="flex items-center gap-3 mb-3">
            <Mail className="w-5 h-5 text-slate-700" />
            <h3 className="text-lg font-bold text-slate-900">Get In Touch</h3>
          </div>
          <p className="text-slate-700 text-sm leading-relaxed mb-3">
            Want to connect? Find all my contact information and social links in one place.
          </p>
          <button 
            onClick={() => onNavigateToSection?.('contact')}
            className="w-full px-4 py-2.5 bg-indigo-500/20 hover:bg-indigo-500/30 text-slate-800 rounded-lg transition-all duration-300 text-sm font-semibold touch-manipulation flex items-center justify-center gap-2 border border-indigo-400/30"
          >
            <Mail className="w-4 h-4" />
            Contact Me
          </button>
        </div>

        <div className="mt-4 p-4 bg-white/80 rounded-xl border border-slate-300/50">
          <p className="text-slate-700 text-sm italic text-center leading-relaxed">
            "Life is about collecting moments, not things. Every experience shapes who we become."
          </p>
        </div>

        <div className="text-center pt-3">
          <Badge variant="secondary" className="text-xs bg-slate-800 text-white hover:bg-slate-700 px-4 py-2">
            Always exploring · Always learning
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalSection;
