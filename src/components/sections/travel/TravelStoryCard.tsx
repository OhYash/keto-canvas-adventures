
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Calendar, Clock, BookOpen } from 'lucide-react';
import { TravelStory } from '../../../types/travelStory';

interface TravelStoryCardProps {
  story: TravelStory;
  onReadMore: (story: TravelStory) => void;
}

const TravelStoryCard: React.FC<TravelStoryCardProps> = ({ story, onReadMore }) => {
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 border border-slate-300/50 hover:border-slate-400/50 transition-all duration-200 hover:shadow-md">
      <div className="flex items-start gap-4">
        <div className="text-3xl flex-shrink-0">
          {story.image}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-base font-bold text-slate-900">
              {story.title}
            </h3>
          </div>
          
          <div className="flex items-center gap-4 mb-2 text-xs text-slate-600">
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              <span>{story.location}, {story.country}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{story.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{story.duration}</span>
            </div>
          </div>
          
          <p className="text-slate-700 text-sm leading-relaxed mb-3">
            {story.description}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-1">
              {story.highlights.slice(0, 3).map((highlight, index) => (
                <Badge key={index} variant="secondary" className="text-xs bg-slate-800 text-white hover:bg-slate-700">
                  {highlight}
                </Badge>
              ))}
              {story.highlights.length > 3 && (
                <Badge variant="secondary" className="text-xs bg-slate-600 text-white">
                  +{story.highlights.length - 3} more
                </Badge>
              )}
            </div>
            
            <Button
              onClick={() => onReadMore(story)}
              size="sm"
              className="bg-slate-800 hover:bg-slate-700 text-white"
            >
              <BookOpen className="w-3 h-3 mr-1" />
              Read More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelStoryCard;
