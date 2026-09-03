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
import ErrorBoundary from '../ErrorBoundary';
import { Section } from '@/data/sections';

interface SectionRendererProps {
  sections: Section[];
  allSections: Section[];
  currentSection: string;
  viewportPosition: { x: number; y: number };
  activeArticleSlug?: string | null;
  activeStoryId?: string | null;
  onNavigateHome: () => void;
  onNavigateToSection: (sectionId: string) => void;
  onSelectArticle: (slug: string) => void;
  onSelectStory?: (storyId: string) => void;
  onBackToList?: () => void;
  hasInteracted?: boolean;
  proximityThreshold?: number;
}

const EXPAND_THRESHOLD = 850;
const RENDER_DISTANCE = 2400;

export const SectionRenderer: React.FC<SectionRendererProps> = ({
  sections,
  allSections,
  currentSection,
  viewportPosition,
  activeArticleSlug,
  activeStoryId,
  onNavigateHome,
  onNavigateToSection,
  onSelectArticle,
  onSelectStory,
  onBackToList,
}) => {
  const [isClientMounted, setIsClientMounted] = React.useState(false);

  React.useEffect(() => {
    setIsClientMounted(true);
  }, []);

  const renderSectionContent = useCallback((section: Section) => {
    // When an article is actively open, ArticleReaderView renders the single canonical <h1>.
    // Underlying canvas section cards downgrade to <h2> to maintain a single <h1> per page.
    const isActive = currentSection === section.id && !activeArticleSlug;
    const commonProps = {
      gradient: section.gradient,
      icon: section.icon,
      title: section.title,
      subtitle: section.subtitle,
      isActive,
      onNavigateHome,
    };

    let content: React.ReactNode = null;

    switch (section.id) {
      case 'home':
        content = (
          <HomeSection
            sections={sections}
            isActive={isActive}
            onNavigateToSection={onNavigateToSection}
          />
        );
        break;
      case 'work':
        content = <WorkSection {...commonProps} onNavigateToSection={onNavigateToSection} />;
        break;
      case 'writing':
        content = <WritingSection {...commonProps} onSelectArticle={onSelectArticle} />;
        break;
      case 'personal':
        content = <PersonalSection {...commonProps} onNavigateToSection={onNavigateToSection} />;
        break;
      case 'keto':
        content = <KetoSection {...commonProps} onNavigateToSection={onNavigateToSection} />;
        break;
      case 'ataco':
        content = <AtacoSection {...commonProps} />;
        break;
      case 'hobbies':
        content = <HobbiesSection {...commonProps} onNavigateToSection={onNavigateToSection} />;
        break;
      case 'projects':
        content = <ProjectsSection {...commonProps} onNavigateToSection={onNavigateToSection} />;
        break;
      case 'now':
        content = <NowSection {...commonProps} onNavigateToSection={onNavigateToSection} />;
        break;
      case 'travel':
        content = (
          <TravelStoriesSection
            {...commonProps}
            activeStoryId={activeStoryId}
            onSelectStory={onSelectStory}
            onBackToList={onBackToList}
            onNavigateToSection={onNavigateToSection}
          />
        );
        break;
      case 'contact':
        content = <ContactSection {...commonProps} />;
        break;
      default:
        content = null;
    }

    return (
      <ErrorBoundary sectionName={section.title} onNavigateHome={onNavigateHome}>
        {content}
      </ErrorBoundary>
    );
  }, [currentSection, sections, activeArticleSlug, activeStoryId, onNavigateHome, onNavigateToSection, onSelectArticle, onSelectStory, onBackToList]);

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
