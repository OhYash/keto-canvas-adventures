import React, { useCallback } from 'react';
import WorkSection from '../sections/WorkSection';
import PersonalSection from '../sections/PersonalSection';
import KetoSection from '../sections/KetoSection';
import ProjectsSection from '../sections/ProjectsSection';
import HobbiesSection from '../sections/HobbiesSection';
import HomeSection from '../sections/HomeSection';
import NowSection from '../sections/NowSection';
import TravelStoriesSection from '../sections/TravelStoriesSection';
import AtacoSection from '../sections/AtacoSection';
import ContactSection from '../sections/ContactSection';
import WritingSection from '../sections/WritingSection';

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
  currentSection: string;
  onNavigateHome: () => void;
  onNavigateToSection: (sectionId: string) => void;
  onSelectArticle: (slug: string) => void;
}

const SectionRenderer: React.FC<SectionRendererProps> = ({
  sections,
  allSections,
  currentSection,
  onNavigateHome,
  onNavigateToSection,
  onSelectArticle,
}) => {
  const [isClientMounted, setIsClientMounted] = React.useState(false);

  React.useEffect(() => {
    setIsClientMounted(true);
  }, []);

  const renderSectionContent = useCallback((section: Section) => {
    const isActive = currentSection === section.id;
    const commonProps = {
      gradient: section.gradient,
      icon: section.icon,
      title: section.title,
      subtitle: section.subtitle,
      isActive,
      onNavigateHome,
    };

    switch (section.id) {
      case 'work':
        return <WorkSection {...commonProps} onNavigateToSection={onNavigateToSection} />;
      case 'writing':
        return <WritingSection {...commonProps} onSelectArticle={onSelectArticle} />;
      case 'personal':
        return <PersonalSection {...commonProps} onNavigateToSection={onNavigateToSection} />;
      case 'keto':
        return <KetoSection {...commonProps} onNavigateToSection={onNavigateToSection} />;
      case 'ataco':
        return <AtacoSection {...commonProps} />;
      case 'hobbies':
        return <HobbiesSection {...commonProps} onNavigateToSection={onNavigateToSection} />;
      case 'projects':
        return <ProjectsSection {...commonProps} onNavigateToSection={onNavigateToSection} />;
      case 'now':
        return <NowSection {...commonProps} onNavigateToSection={onNavigateToSection} />;
      case 'travel':
        return <TravelStoriesSection {...commonProps} onNavigateToSection={onNavigateToSection} />;
      case 'contact':
        return <ContactSection {...commonProps} />;
      default:
        return null;
    }
  }, [currentSection, onNavigateHome, onNavigateToSection, onSelectArticle]);

  // During SSR (isClientMounted === false), render ONLY the section matching the current URL/route.
  // After client hydration (isClientMounted === true), mount all sections on the 2D grid for seamless canvas panning.
  const sectionsToRender = isClientMounted
    ? allSections
    : allSections.filter((section) => section.id === currentSection);

  return (
    <>
      {/* Home/Landing section */}
      {(isClientMounted || currentSection === 'home') && (
        <div className="absolute -translate-x-1/2 -translate-y-1/2">
          <HomeSection
            sections={sections}
            isActive={currentSection === 'home'}
            onNavigateToSection={onNavigateToSection}
          />
        </div>
      )}

      {/* Section pages */}
      {sectionsToRender.map((section) => (
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
