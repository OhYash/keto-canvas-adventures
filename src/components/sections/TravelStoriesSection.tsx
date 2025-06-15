import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MapPin, Calendar, Clock, BookOpen } from 'lucide-react';
import DetailedStoryView from './DetailedStoryView';

interface TravelStory {
  id: string;
  title: string;
  location: string;
  country: string;
  date: string;
  duration: string;
  description: string;
  highlights: string[];
  image: string;
}

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

  const travelStories: TravelStory[] = [
    {
      id: 'japan-2023',
      title: 'Cherry Blossoms & Technology',
      location: 'Tokyo & Kyoto',
      country: 'Japan',
      date: 'March 2023',
      duration: '2 weeks',
      description: 'An incredible journey through Japan during cherry blossom season, exploring the perfect blend of ancient traditions and cutting-edge technology.',
      highlights: ['Shibuya Crossing', 'Fushimi Inari Shrine', 'TeamLab Borderless', 'Traditional Ryokan'],
      image: '🌸'
    },
    {
      id: 'iceland-2022',
      title: 'Land of Fire & Ice',
      location: 'Reykjavik & Ring Road',
      country: 'Iceland',
      date: 'September 2022',
      duration: '10 days',
      description: 'Chasing the Northern Lights and exploring dramatic landscapes, from powerful waterfalls to geothermal hot springs.',
      highlights: ['Northern Lights', 'Blue Lagoon', 'Gullfoss Waterfall', 'Black Sand Beaches'],
      image: '🌋'
    },
    {
      id: 'peru-2021',
      title: 'Ancient Wonders',
      location: 'Cusco & Machu Picchu',
      country: 'Peru',
      date: 'July 2021',
      duration: '1 week',
      description: 'Trekking the Inca Trail to reach the mystical citadel of Machu Picchu, experiencing rich Andean culture along the way.',
      highlights: ['Machu Picchu', 'Inca Trail', 'Sacred Valley', 'Local Markets'],
      image: '🏔️'
    },
    {
      id: 'thailand-2020',
      title: 'Tropical Paradise',
      location: 'Bangkok & Islands',
      country: 'Thailand',
      date: 'February 2020',
      duration: '3 weeks',
      description: 'Exploring vibrant street life, ancient temples, and pristine beaches while experiencing the warmth of Thai hospitality.',
      highlights: ['Floating Markets', 'Phi Phi Islands', 'Grand Palace', 'Street Food Tours'],
      image: '🏝️'
    },
    {
      id: 'morocco-2019',
      title: 'Desert Dreams',
      location: 'Marrakech & Sahara',
      country: 'Morocco',
      date: 'November 2019',
      duration: '12 days',
      description: 'A sensory adventure through imperial cities, bustling souks, and endless sand dunes under starlit skies.',
      highlights: ['Sahara Desert', 'Jemaa el-Fnaa', 'Atlas Mountains', 'Berber Villages'],
      image: '🐪'
    },
    {
      id: 'norway-2019',
      title: 'Fjords & Midnight Sun',
      location: 'Bergen & Lofoten',
      country: 'Norway',
      date: 'June 2019',
      duration: '2 weeks',
      description: 'Discovering dramatic fjords, charming fishing villages, and experiencing the phenomenon of the midnight sun.',
      highlights: ['Geirangerfjord', 'Lofoten Islands', 'Bergen Fish Market', 'Midnight Sun'],
      image: '⛰️'
    }
  ];

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
        <div className="grid gap-4">
          {travelStories.map((story) => (
            <div
              key={story.id}
              className="bg-white/90 backdrop-blur-sm rounded-xl p-4 border border-slate-300/50 hover:border-slate-400/50 transition-all duration-200 hover:shadow-md"
            >
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
                      onClick={() => handleReadMore(story)}
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
          ))}
        </div>

        <div className="mt-4 p-4 bg-white/80 rounded-xl border border-slate-300/50">
          <p className="text-slate-700 text-sm italic text-center leading-relaxed">
            "Every journey teaches us something new about the world and ourselves. Click 'Read More' to dive deeper into each adventure."
          </p>
        </div>

        <div className="text-center pt-3">
          <Badge variant="secondary" className="text-xs bg-slate-800 text-white hover:bg-slate-700 px-4 py-2">
            {travelStories.length} Adventures & Counting
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default TravelStoriesSection;
