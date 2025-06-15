
import React from 'react';
import { Badge } from '@/components/ui/badge';
import TravelStoryCard from './TravelStoryCard';
import { TravelStory } from '../../../types/travelStory';

interface TravelStoryListProps {
  stories: TravelStory[];
  onReadMore: (story: TravelStory) => void;
}

const TravelStoryList: React.FC<TravelStoryListProps> = ({ stories, onReadMore }) => {
  return (
    <div className="space-y-4">
      <div className="grid gap-4">
        {stories.map((story) => (
          <TravelStoryCard
            key={story.id}
            story={story}
            onReadMore={onReadMore}
          />
        ))}
      </div>

      <div className="mt-4 p-4 bg-white/80 rounded-xl border border-slate-300/50">
        <p className="text-slate-700 text-sm italic text-center leading-relaxed">
          "Every journey teaches us something new about the world and ourselves. Click 'Read More' to dive deeper into each adventure."
        </p>
      </div>

      <div className="text-center pt-3">
        <Badge variant="secondary" className="text-xs bg-slate-800 text-white hover:bg-slate-700 px-4 py-2">
          {stories.length} Adventures & Counting
        </Badge>
      </div>
    </div>
  );
};

export default TravelStoryList;
