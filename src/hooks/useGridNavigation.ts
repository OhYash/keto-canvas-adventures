import { useCallback } from 'react';

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
  direction?: 'right' | 'left' | 'up' | 'down';
  parent?: string;
  alwaysExpanded?: boolean;
}

interface GridNavigationProps {
  sections: Section[];
  allSections: Section[];
  currentSection: string;
  onNavigateToSection: (sectionId: string) => void;
}

export const useGridNavigation = ({
  allSections,
  currentSection,
  onNavigateToSection,
}: GridNavigationProps) => {
  // Find the closest section in a given direction
  const findSectionInDirection = useCallback((direction: 'left' | 'right' | 'up' | 'down') => {
    const currentSectionData = allSections.find(s => s.id === currentSection);
    const currentPos = currentSectionData?.position || { x: 0, y: 0 };

    const candidates: Array<{ section: Section; distance: number }> = [];

    allSections.forEach(section => {
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
  }, [allSections, currentSection]);

  const navigateInDirection = useCallback((direction: 'left' | 'right' | 'up' | 'down') => {
    const targetSectionId = findSectionInDirection(direction);
    if (targetSectionId) {
      onNavigateToSection(targetSectionId);
    }
  }, [findSectionInDirection, onNavigateToSection]);

  return {
    navigateInDirection,
  };
};
