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
  viewportPosition: { x: number; y: number };
  onNavigateHome: () => void;
  onNavigateToSection: (sectionId: string) => void;
  onSelectArticle: (slug: string) => void;
  hasInteracted?: boolean;
  proximityThreshold?: number;
}

const SectionRenderer: React.FC<SectionRendererProps> = ({
  sections,
  allSections,
  currentSection,
  viewportPosition,
  onNavigateHome,
  onNavigateToSection,
  onSelectArticle,
  hasInteracted = false,
  proximityThreshold = 1450,
}) => {
  const [isClientMounted, setIsClientMounted] = React.useState(false);
  const [isIdleHydrated, setIsIdleHydrated] = React.useState(false);

  React.useEffect(() => {
    setIsClientMounted(true);

    // Defer background section hydration until after idle timer (1.5s) or user interaction.
    // Search crawlers (Bingbot / Googlebot WRS) extract page DOM within ~1s without triggering idle timers,
    // ensuring static & JS-rendered crawler snapshots remain 100% route-scoped for optimal SEO discoverability.
    const timer = setTimeout(() => {
      setIsIdleHydrated(true);
    }, 1500);

    return () => clearTimeout(timer);
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

  // Determine whether background sections should mount on the 2D spatial canvas.
  // Before client hydration settles / before interaction/idle delay: render ONLY the active route section.
  // After interaction or idle delay: expand proximity rendering to adjacent 2D grid coordinates.
  const shouldExpandProximity = isClientMounted && (hasInteracted || isIdleHydrated);

  const sectionsToRender = React.useMemo(() => {
    if (!shouldExpandProximity) {
      return allSections.filter((section) => section.id === currentSection);
    }

    const baseThreshold = currentSection === 'home' || hasInteracted ? 1450 : 1050;
    const threshold = proximityThreshold ?? baseThreshold;

    return allSections.filter((section) => {
      // Always render active section
      if (section.id === currentSection) return true;

      // Calculate 2D distance from current viewport center to section position
      const dx = section.position.x + viewportPosition.x;
      const dy = section.position.y + viewportPosition.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      return distance <= threshold;
    });
  }, [shouldExpandProximity, allSections, currentSection, hasInteracted, viewportPosition.x, viewportPosition.y, proximityThreshold]);

  // Home section visibility based on route and proximity distance
  const isHomeVisible = React.useMemo(() => {
    if (currentSection === 'home') return true;
    if (!shouldExpandProximity) return false;

    // Home is at (0, 0). Distance from viewport center is sqrt(viewportPosition.x^2 + viewportPosition.y^2)
    const threshold = proximityThreshold ?? 1450;
    const distance = Math.sqrt(viewportPosition.x * viewportPosition.x + viewportPosition.y * viewportPosition.y);
    return distance <= threshold;
  }, [currentSection, shouldExpandProximity, viewportPosition.x, viewportPosition.y, proximityThreshold]);

  return (
    <>
      {/* Home/Landing section */}
      {isHomeVisible && (
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
