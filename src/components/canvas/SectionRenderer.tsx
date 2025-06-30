
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
import ContactSection from '../sections/ContactSection';

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
  isZoomedOut?: boolean;
}

const SectionRenderer: React.FC<SectionRendererProps> = ({
  sections,
  allSections,
  onNavigateHome,
  onNavigateToSection,
  isZoomedOut = false,
}) => {
  const renderSectionContent = useCallback((section: Section) => {
    const commonProps = {
      gradient: section.gradient,
      icon: section.icon,
      title: section.title,
      subtitle: section.subtitle,
      onNavigateHome,
    };

    // When zoomed out, render simplified preview cards
    if (isZoomedOut) {
      return (
        <div 
          className={`w-[300px] h-[200px] rounded-xl ${section.gradient} backdrop-blur-sm border border-slate-500/30 p-6 cursor-pointer hover:scale-105 transition-transform duration-200 flex flex-col items-center justify-center text-center`}
          onClick={() => onNavigateToSection(section.id)}
        >
          <span className="text-4xl mb-3">{section.icon}</span>
          <h3 className="font-bold text-white text-lg mb-2">{section.title}</h3>
          <p className="text-slate-300 text-sm">{section.subtitle}</p>
        </div>
      );
    }

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
      case 'contact':
        return <ContactSection {...commonProps} />;
      default:
        return null;
    }
  }, [onNavigateHome, onNavigateToSection, isZoomedOut]);

  return (
    <>
      {/* Home/Landing section */}
      <div className="absolute -translate-x-1/2 -translate-y-1/2">
        {isZoomedOut ? (
          <div 
            className="w-[300px] h-[200px] rounded-xl bg-gradient-to-br from-slate-800/90 to-slate-700/90 backdrop-blur-sm border border-slate-600/50 p-6 cursor-pointer hover:scale-105 transition-transform duration-200 flex flex-col items-center justify-center text-center"
            onClick={() => onNavigateToSection('home')}
          >
            <span className="text-4xl mb-3">🏠</span>
            <h3 className="font-bold text-white text-lg mb-2">Home</h3>
            <p className="text-slate-300 text-sm">Welcome to My Universe</p>
          </div>
        ) : (
          <HomeSection sections={sections} onNavigateToSection={onNavigateToSection} />
        )}
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
