
import { useCallback, useMemo } from 'react';

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
  parent?: string;
}

interface GridNavigationProps {
  sections: Section[];
  allSections: Section[];
  currentSection: string;
  onNavigateToSection: (sectionId: string) => void;
}

export const useGridNavigation = ({
  sections,
  allSections,
  currentSection,
  onNavigateToSection,
}: GridNavigationProps) => {
  // Create a proper home section object
  const homeSection = useMemo(() => ({
    id: 'home',
    title: 'Home',
    subtitle: 'Welcome',
    position: { x: 0, y: 0 },
    color: 'from-slate-500 to-slate-600',
    gradient: 'bg-gradient-to-br from-slate-500/20 to-slate-600/20',
    icon: '🏠',
    direction: 'right' as const
  }), []);

  // Get all navigable sections based on current context
  const getNavigableSections = useCallback(() => {
    if (currentSection === 'home') {
      return sections; // Only main sections from home
    }
    
    // If we're in a subsection, we can navigate to other subsections or back to parent
    const currentSectionData = allSections.find(s => s.id === currentSection);
    if (currentSectionData?.parent) {
      // Get parent and its subsections
      const parentSection = allSections.find(s => s.id === currentSectionData.parent);
      const siblingSubsections = allSections.filter(s => s.parent === currentSectionData.parent);
      // Always include home in navigation from subsections
      return parentSection ? [homeSection, parentSection, ...siblingSubsections] : [homeSection, ...siblingSubsections];
    }
    
    // If we're in a main section, we can navigate to home, other main sections, and its subsections
    const subsections = allSections.filter(s => s.parent === currentSection);
    const mainSections = sections;
    
    return [homeSection, ...mainSections, ...subsections];
  }, [sections, allSections, currentSection, homeSection]);

  // Find the closest section in a given direction
  const findSectionInDirection = useCallback((direction: 'left' | 'right' | 'up' | 'down') => {
    const navigableSections = getNavigableSections();
    const currentPos = currentSection === 'home' 
      ? { x: 0, y: 0 }
      : allSections.find(s => s.id === currentSection)?.position || { x: 0, y: 0 };

    let candidates: Array<{ section: any; distance: number }> = [];

    navigableSections.forEach(section => {
      if (section.id === currentSection) return;

      const sectionPos = section.position || { x: 0, y: 0 };
      const deltaX = sectionPos.x - currentPos.x;
      const deltaY = sectionPos.y - currentPos.y;

      let isInDirection = false;
      let distance = 0;

      switch (direction) {
        case 'right':
          isInDirection = deltaX > 0 && Math.abs(deltaY) <= Math.abs(deltaX);
          distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
          break;
        case 'left':
          isInDirection = deltaX < 0 && Math.abs(deltaY) <= Math.abs(deltaX);
          distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
          break;
        case 'up':
          isInDirection = deltaY < 0 && Math.abs(deltaX) <= Math.abs(deltaY);
          distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
          break;
        case 'down':
          isInDirection = deltaY > 0 && Math.abs(deltaX) <= Math.abs(deltaY);
          distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
          break;
      }

      if (isInDirection) {
        candidates.push({ section, distance });
      }
    });

    // Sort by distance and return the closest
    candidates.sort((a, b) => a.distance - b.distance);
    return candidates.length > 0 ? candidates[0].section.id : null;
  }, [getNavigableSections, allSections, currentSection]);

  const navigateInDirection = useCallback((direction: 'left' | 'right' | 'up' | 'down') => {
    const targetSectionId = findSectionInDirection(direction);
    if (targetSectionId) {
      console.log(`Navigating ${direction} from ${currentSection} to ${targetSectionId}`);
      onNavigateToSection(targetSectionId);
    } else {
      console.log(`No section found ${direction} of ${currentSection}`);
    }
  }, [findSectionInDirection, currentSection, onNavigateToSection]);

  return {
    navigateInDirection,
  };
};
