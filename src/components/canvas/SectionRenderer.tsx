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
import SectionPlaceholder from './SectionPlaceholder';

interface Position {
  x: number;
  y: number;
}

interface GridPosition {
  col: number;
  row: number;
}

interface Section {
  id: string;
  title: string;
  subtitle: string;
  grid?: GridPosition;
  position: Position;
  color: string;
  gradient: string;
  icon: string;
  direction?: 'right' | 'left' | 'up' | 'down';
  parent?: string;
  alwaysExpanded?: boolean;
}

interface SectionRendererProps {
  sections: Section[];
  allSections: Section[];
  currentSection: string;
  viewportPosition: { x: number; y: number };
  onNavigateHome: () => void;
  onNavigateToSection: (sectionId: string) => void;
  onSelectArticle: (slug: string) => void;
  hasInteracted?: boolean;
  proximityThreshold?: number;
}

const EXPAND_THRESHOLD = 850;
const RENDER_DISTANCE = 2400;

const SectionRenderer: React.FC<SectionRendererProps> = ({
  sections,
  allSections,
  currentSection,
  viewportPosition,
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
      case 'home':
        return (
          <HomeSection
            sections={sections}
            isActive={isActive}
            onNavigateToSection={onNavigateToSection}
          />
        );
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
  }, [currentSection, sections, onNavigateHome, onNavigateToSection, onSelectArticle]);

  return (
    <>
      {allSections.map((section) => {
        const dx = section.position.x + viewportPosition.x;
        const dy = section.position.y + viewportPosition.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // SSR scoping: on the server, ONLY render the active route section
        if (!isClientMounted) {
          if (section.id === currentSection) {
            return (
              <div
                key={section.id}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: section.position.x,
                  top: section.position.y,
                }}
              >
                {renderSectionContent(section)}
              </div>
            );
          }
          return null;
        }

        // Home card is ALWAYS full-size (never a mini placeholder)
        if (section.alwaysExpanded || section.id === 'home') {
          const isHomeVisible = distance <= RENDER_DISTANCE || currentSection === 'home';
          if (!isHomeVisible) return null;

          return (
            <div
              key={section.id}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{
                left: section.position.x,
                top: section.position.y,
              }}
            >
              <div className="animate-expand-card">
                {renderSectionContent(section)}
              </div>
            </div>
          );
        }

        // Other grid section cards: expanded if active or close by
        const isExpanded = section.id === currentSection || distance <= EXPAND_THRESHOLD;
        const showPlaceholder = !isExpanded && distance <= RENDER_DISTANCE;

        if (isExpanded) {
          return (
            <div
              key={section.id}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{
                left: section.position.x,
                top: section.position.y,
              }}
            >
              <div className="animate-expand-card">
                {renderSectionContent(section)}
              </div>
            </div>
          );
        }

        if (showPlaceholder) {
          return (
            <div
              key={`${section.id}-placeholder`}
              className="absolute -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300"
              style={{
                left: section.position.x,
                top: section.position.y,
              }}
            >
              <SectionPlaceholder
                section={section}
                onNavigateToSection={onNavigateToSection}
              />
            </div>
          );
        }

        return null;
      })}
    </>
  );
};

export default SectionRenderer;
