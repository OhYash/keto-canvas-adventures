
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Palette, Music, Camera, Code, Gamepad2, Book } from 'lucide-react';

interface HobbiesSectionProps {
  gradient: string;
  icon: string;
  title: string;
  subtitle: string;
  onNavigateHome: () => void;
  onNavigateToSection: (sectionId: string) => void;
}

const HobbiesSection: React.FC<HobbiesSectionProps> = ({
  gradient,
  icon,
  title,
  subtitle,
  onNavigateHome,
  onNavigateToSection,
}) => {
  const hobbies = [
    {
      title: "Photography",
      description: "Capturing moments and exploring the world through my lens. Street photography and landscapes are my favorites.",
      icon: <Camera className="w-5 h-5" />,
      tags: ["Street Photography", "Landscapes", "Travel"]
    },
    {
      title: "Music Production",
      description: "Creating electronic music and experimenting with different sounds and genres in my home studio.",
      icon: <Music className="w-5 h-5" />,
      tags: ["Electronic", "Ambient", "Beat Making"]
    },
    {
      title: "Digital Art",
      description: "Creating digital illustrations and experimenting with various design tools and techniques.",
      icon: <Palette className="w-5 h-5" />,
      tags: ["Illustration", "UI Design", "Concept Art"]
    },
    {
      title: "Gaming",
      description: "Passionate about indie games, puzzle games, and exploring virtual worlds with unique storytelling.",
      icon: <Gamepad2 className="w-5 h-5" />,
      tags: ["Indie Games", "Puzzle", "Adventure"]
    },
    {
      title: "Reading",
      description: "Always diving into books about technology, philosophy, and science fiction to expand my perspective.",
      icon: <Book className="w-5 h-5" />,
      tags: ["Sci-Fi", "Philosophy", "Tech"]
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

      <CardContent className="space-y-4">
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-3">
            <Palette className="w-5 h-5 text-slate-800" />
            <h2 className="text-lg font-bold text-slate-900">My Hobbies</h2>
          </div>

          {hobbies.map((hobby, index) => (
            <div
              key={index}
              className="bg-white/90 backdrop-blur-sm rounded-xl p-4 border border-slate-300/50 hover:border-slate-400/50 transition-all duration-200 hover:shadow-md"
            >
              <div className="mb-3">
                <div className="flex items-center gap-3 mb-2">
                  <div className="text-slate-700">{hobby.icon}</div>
                  <h3 className="text-base font-bold text-slate-900">{hobby.title}</h3>
                </div>
                <p className="text-slate-700 text-sm leading-relaxed mb-3">
                  {hobby.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {hobby.tags.map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="secondary" className="text-xs bg-slate-800 text-white hover:bg-slate-700">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 border border-slate-300/50 hover:border-slate-400/50 transition-all duration-200 hover:shadow-md">
          <div className="flex items-center gap-3 mb-3">
            <Code className="w-5 h-5 text-slate-700" />
            <h3 className="text-lg font-bold text-slate-900">Personal Projects</h3>
          </div>
          <p className="text-slate-700 text-sm leading-relaxed mb-3">
            Dive deeper into my coding projects and creative endeavors. See what I've been building in my spare time.
          </p>
          <button 
            onClick={() => onNavigateToSection('projects')}
            className="w-full px-4 py-2.5 bg-indigo-500/20 hover:bg-indigo-500/30 text-slate-800 rounded-lg transition-all duration-300 text-sm font-semibold touch-manipulation flex items-center justify-center gap-2 border border-indigo-400/30"
          >
            <Code className="w-4 h-4" />
            View Personal Projects
          </button>
        </div>

        <div className="mt-4 p-4 bg-white/80 rounded-xl border border-slate-300/50">
          <p className="text-slate-700 text-sm italic text-center leading-relaxed">
            "Creativity is intelligence having fun. Every hobby teaches us something new about ourselves."
          </p>
        </div>

        <div className="text-center pt-3">
          <Badge variant="secondary" className="text-xs bg-slate-800 text-white hover:bg-slate-700 px-4 py-2">
            Always creating · Always exploring
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default HobbiesSection;
