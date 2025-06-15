
import React, { useCallback } from 'react';
import WorkSection from '../sections/WorkSection';
import WorkExperienceSection from '../sections/WorkExperienceSection';
import PersonalSection from '../sections/PersonalSection';
import KetoSection from '../sections/KetoSection';
import ProjectsSection from '../sections/ProjectsSection';
import HobbiesSection from '../sections/HobbiesSection';
import HomeSection from '../sections/HomeSection';
import NowSection from '../sections/NowSection';
import TravelStoriesSection from '../sections/TravelStoriesSection';

interface Position {
  x: number;
  y: number;
}

interface Section {
  id: string;
  title: string;
  subtitle: string;
  position: Position;
  color: string;
  gradient: string;
  icon: string;
  direction: 'right' | 'left' | 'up' | 'down';
}

interface SectionRendererProps {
  sections: Section[];
  allSections: Section[];
  onNavigateHome: () => void;
  onNavigateToSection: (sectionId: string) => void;
}

const SectionRenderer: React.FC<SectionRendererProps> = ({
  sections,
  allSections,
  onNavigateHome,
  onNavigateToSection,
}) => {
  const renderSectionContent = useCallback((section: Section) => {
    const commonProps = {
      gradient: section.gradient,
      icon: section.icon,
      title: section.title,
      subtitle: section.subtitle,
      onNavigateHome,
    };

    switch (section.id) {
      case 'work':
        return <WorkSection {...commonProps} onNavigateToSection={onNavigateToSection} />;
      case 'work-experience':
        return <WorkExperienceSection {...commonProps} />;
      case 'personal':
        return <PersonalSection {...commonProps} onNavigateToSection={onNavigateToSection} />;
      case 'keto':
        return <KetoSection {...commonProps} />;
      case 'hobbies':
        return <HobbiesSection {...commonProps} onNavigateToSection={onNavigateToSection} />;
      case 'projects':
        return <ProjectsSection {...commonProps} onNavigateToSection={onNavigateToSection} />;
      case 'now':
        return <NowSection {...commonProps} />;
      case 'travel':
        return <TravelStoriesSection {...commonProps} onNavigateToSection={onNavigateToSection} />;
      default:
        return null;
    }
  }, [onNavigateHome, onNavigateToSection]);

  return (
    <>
      {/* Home/Landing section */}
      <div className="absolute -translate-x-1/2 -translate-y-1/2">
        <HomeSection sections={sections} onNavigateToSection={onNavigateToSection} />
      </div>

      {/* Section pages - render all sections including travel */}
      {allSections.map((section) => (
        <div
          key={section.id}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{
            left: section.position.x,
            top: section.position.y
          }}
        >
          {renderSectionContent(section)}
        </div>
      ))}
    </>
  );
};

export default SectionRenderer;
