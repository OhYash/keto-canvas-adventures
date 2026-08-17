import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MapPin, Calendar, Clock, Camera } from 'lucide-react';
import SectionCard from '@/components/canvas/SectionCard';
import { TravelStory } from '@/types/travelStory';
import { defaultTravelGallery } from '@/data/travelStories';

interface DetailedStoryViewProps {
  story: TravelStory;
  onBack: () => void;
  gradient: string;
  isActive?: boolean;
}

const DetailedStoryView: React.FC<DetailedStoryViewProps> = ({
  story,
  onBack,
  gradient,
  isActive = false,
}) => {
  const storyText = story.fullStory || story.description;
  const gallery = story.gallery || defaultTravelGallery;

  const leftAction = (
    <Button
      onClick={onBack}
      variant="outline"
      size="sm"
      className="bg-white/90 hover:bg-white border-slate-300 text-slate-700"
    >
      <ArrowLeft className="w-4 h-4 mr-2" />
      Back to Stories
    </Button>
  );

  return (
    <SectionCard
      gradient={gradient}
      icon={story.image}
      title={story.title}
      isActive={isActive}
      leftAction={leftAction}
      className="animate-slide-in-right"
    >
      {/* Subtitle / Trip Metadata */}
      <div className="flex items-center justify-center gap-4 -mt-2 mb-4 text-sm text-slate-600">
        <div className="flex items-center gap-1">
          <MapPin className="w-4 h-4" />
          <span>{story.location}, {story.country}</span>
        </div>
        <div className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          <span>{story.date}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          <span>{story.duration}</span>
        </div>
      </div>

      {/* Photo Gallery */}
      <div className="bg-white/80 rounded-xl p-4 border border-slate-300/50">
        <div className="flex items-center gap-2 mb-3">
          <Camera className="w-4 h-4 text-slate-600" />
          <h3 className="font-semibold text-slate-800">Photo Gallery</h3>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {gallery.slice(0, 4).map((photo, index) => (
            <div
              key={index}
              className="aspect-video bg-gradient-to-br from-slate-200 to-slate-300 rounded-lg overflow-hidden group cursor-pointer"
            >
              <img
                src={photo}
                alt={`${story.title} photo ${index + 1}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <div className="hidden w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
                <Camera className="w-8 h-8 text-slate-500" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full Story */}
      <div className="bg-white/80 rounded-xl p-4 border border-slate-300/50">
        <h3 className="font-semibold text-slate-800 mb-3">The Full Story</h3>
        <div className="prose prose-sm max-w-none text-slate-700 leading-relaxed">
          {storyText.split('\n\n').map((paragraph, index) => (
            <p key={index} className="mb-4 last:mb-0">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      {/* Highlights */}
      <div className="bg-white/80 rounded-xl p-4 border border-slate-300/50">
        <h3 className="font-semibold text-slate-800 mb-3">Trip Highlights</h3>
        <div className="flex flex-wrap gap-2">
          {story.highlights.map((highlight, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="bg-slate-800 text-white hover:bg-slate-700"
            >
              {highlight}
            </Badge>
          ))}
        </div>
      </div>
    </SectionCard>
  );
};

export default DetailedStoryView;
