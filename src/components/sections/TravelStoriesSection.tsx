import React from 'react';
import SectionCard from '@/components/canvas/SectionCard';
import DetailedStoryView from './DetailedStoryView';
import TravelStoryList from './travel/TravelStoryList';
import { travelStories, getTravelStoryById } from '@/data/travelStories';
import { TravelStory } from '@/types/travelStory';

interface TravelStoriesSectionProps {
  gradient: string;
  icon: string;
  title: string;
  subtitle: string;
  isActive?: boolean;
  activeStoryId?: string | null;
  onNavigateHome: () => void;
  onSelectStory?: (storyId: string) => void;
  onBackToList?: () => void;
  onNavigateToSection?: (sectionId: string) => void;
}

const TravelStoriesSection: React.FC<TravelStoriesSectionProps> = ({
  gradient,
  icon,
  title,
  subtitle,
  isActive = false,
  activeStoryId,
  onNavigateHome,
  onSelectStory,
  onBackToList,
}) => {
  const [localSelectedStory, setLocalSelectedStory] = React.useState<TravelStory | null>(null);

  // If activeStoryId is provided via URL (/travel/:storyId), find that story
  const currentStory = activeStoryId ? getTravelStoryById(activeStoryId) || null : localSelectedStory;

  const handleReadMore = (story: TravelStory) => {
    if (onSelectStory) {
      onSelectStory(story.id);
    } else {
      setLocalSelectedStory(story);
    }
  };

  const handleBack = () => {
    if (onBackToList) {
      onBackToList();
    } else {
      setLocalSelectedStory(null);
    }
  };

  if (currentStory) {
    return (
      <DetailedStoryView
        story={currentStory}
        onBack={handleBack}
        gradient={gradient}
        isActive={isActive}
      />
    );
  }

  return (
    <SectionCard
      gradient={gradient}
      icon={icon}
      title={title}
      subtitle={subtitle}
      isActive={isActive}
      onNavigateHome={onNavigateHome}
    >
      <TravelStoryList
        stories={travelStories}
        onReadMore={handleReadMore}
      />
    </SectionCard>
  );
};

export default TravelStoriesSection;
