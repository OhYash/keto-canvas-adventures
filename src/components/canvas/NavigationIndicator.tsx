
import React from 'react';

interface Section {
  id: string;
  title: string;
}

interface NavigationIndicatorProps {
  currentSection: string;
  sections: Section[];
}

const NavigationIndicator: React.FC<NavigationIndicatorProps> = ({
  currentSection,
  sections,
}) => {
  const getSectionTitle = () => {
    if (currentSection === 'home') return 'Home Base';
    if (currentSection === 'manual') return 'Custom Location';
    return sections.find(s => s.id === currentSection)?.title;
  };

  return (
    <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 pointer-events-none">
      <div className="bg-slate-800/80 backdrop-blur-sm px-3 sm:px-4 py-1 sm:py-2 rounded-full text-slate-300 text-xs sm:text-sm transition-opacity duration-200">
        {getSectionTitle()}
      </div>
    </div>
  );
};

export default NavigationIndicator;
