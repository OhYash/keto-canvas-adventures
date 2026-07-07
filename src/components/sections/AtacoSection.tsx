
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Bike, Camera, Star } from 'lucide-react';
import { handleCopyUrl } from '@/utils/urlUtils';
import { atacoStories, atacoQuickFacts, atacoPhotoSlots } from '@/data/atacoData';

interface AtacoSectionProps {
  gradient: string;
  icon: string;
  title: string;
  subtitle: string;
  onNavigateHome: () => void;
}

const AtacoSection: React.FC<AtacoSectionProps> = ({
  gradient,
  icon,
  title,
  subtitle,
  onNavigateHome,
}) => {
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
            <h2 className="text-lg font-bold text-slate-900">The Ataco File</h2>
          </div>

          {atacoStories.map((story, index) => (
            <div
              key={index}
              className="bg-white/90 backdrop-blur-sm rounded-xl p-4 border border-slate-300/50 hover:border-slate-400/50 transition-all duration-200 hover:shadow-md"
            >
              <div className="flex items-center gap-3 mb-2">
                <Star className="w-4 h-4 text-slate-700" />
                <h3 className="text-base font-bold text-slate-900">{story.title}</h3>
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
      </CardContent>
    </Card>
  );
};

export default AtacoSection;
