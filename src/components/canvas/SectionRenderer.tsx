import React, { useCallback } from 'react';
import WorkSection from '../sections/WorkSection';
import PersonalSection from '../sections/PersonalSection';
import KetoSection from '../sections/KetoSection';
import ProjectsSection from '../sections/ProjectsSection';
import HomeSection from '../sections/HomeSection';
import NowSection from '../sections/NowSection';

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
  onNavigateHome: () => void;
  onNavigateToSection: (sectionId: string) => void;
}

const SectionRenderer: React.FC<SectionRendererProps> = ({
  sections,
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
        return <WorkSection {...commonProps} />;
      case 'personal':
        return <PersonalSection {...commonProps} />;
      case 'keto':
        return <KetoSection {...commonProps} />;
      case 'projects':
        return <ProjectsSection {...commonProps} onNavigateToSection={onNavigateToSection} />;
      case 'now':
        return <NowSection {...commonProps} />;
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

      {/* Section pages */}
      {sections.map((section) => (
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
