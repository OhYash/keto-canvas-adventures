
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import DetailedStoryView from './DetailedStoryView';
import TravelSectionHeader from './travel/TravelSectionHeader';
import TravelStoryList from './travel/TravelStoryList';
import { travelStories } from '../../data/travelStories';
import { TravelStory } from '../../types/travelStory';

interface TravelStoriesSectionProps {
  gradient: string;
  icon: string;
  title: string;
  subtitle: string;
  onNavigateHome: () => void;
  onNavigateToSection?: (sectionId: string) => void;
}

const TravelStoriesSection: React.FC<TravelStoriesSectionProps> = ({
  gradient,
  icon,
  title,
  subtitle,
  onNavigateHome,
}) => {
  const [selectedStory, setSelectedStory] = useState<TravelStory | null>(null);

  const handleReadMore = (story: TravelStory) => {
    setSelectedStory(story);
  };

  const handleBackToList = () => {
    setSelectedStory(null);
  };

  if (selectedStory) {
    return (
      <Card className={`w-[95vw] sm:w-[90vw] md:w-[700px] max-w-[700px] max-h-[85vh] overflow-y-auto ${gradient} backdrop-blur-sm border-slate-600/50`}>
        <CardContent className="p-6">
          <DetailedStoryView
            story={selectedStory}
            onBack={handleBackToList}
            gradient={gradient}
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`w-[95vw] sm:w-[90vw] md:w-[700px] max-w-[700px] max-h-[85vh] overflow-y-auto ${gradient} backdrop-blur-sm border-slate-600/50`}>
      <CardHeader className="pb-4">
        <TravelSectionHeader
          icon={icon}
          title={title}
          subtitle={subtitle}
          onNavigateHome={onNavigateHome}
        />
      </CardHeader>

      <CardContent>
        <TravelStoryList
          stories={travelStories}
          onReadMore={handleReadMore}
        />
      </CardContent>
    </Card>
  );
};

export default TravelStoriesSection;
