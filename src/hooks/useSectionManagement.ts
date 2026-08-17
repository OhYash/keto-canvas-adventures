import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { SECTIONS, Section, Position } from '@/data/sections';
import { useVisitTracking } from './useVisitTracking';
import { useUmamiTracking } from './useUmamiTracking';

export { type GridPosition, type Position, type Section } from '@/data/sections';

export const useSectionManagement = (initialSection: string = 'home') => {
  const [currentSection, setCurrentSection] = useState<string>(initialSection);
  const [screenDimensions, setScreenDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1280,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  });

  // Visit tracking hooks
  const { recordSectionVisit, getSectionVisits } = useVisitTracking();
  const { trackSectionVisit, trackNavigationFlow } = useUmamiTracking();

  // Track navigation method for analytics
  const navigationMethodRef = useRef<'keyboard' | 'mouse' | 'direct'>('direct');

  // Update screen dimensions on resize
  useEffect(() => {
    const handleResize = () => {
      setScreenDimensions({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate responsive spacing based on screen size (zero card overlap + nice edge preview peek)
  const getResponsiveSpacing = useCallback(() => {
    const baseSpacing = 1050;
    const minSpacing = 950;
    const maxSpacing = 1500;

    const scaleFactor = Math.min(screenDimensions.width / 1920, maxSpacing / baseSpacing);
    const spacing = Math.max(minSpacing, Math.min(maxSpacing, baseSpacing * scaleFactor));

    return Math.round(spacing);
  }, [screenDimensions.width]);

  const spacing = useMemo(() => getResponsiveSpacing(), [getResponsiveSpacing]);

  // Derive allSections from canonical registry + responsive spacing
  const allSections: Section[] = useMemo(() => {
    return SECTIONS.map((meta) => ({
      ...meta,
      position: {
        x: meta.grid.col * spacing,
        y: meta.grid.row * spacing,
      },
    }));
  }, [spacing]);

  // Top-level sections for navigation indicators / menus (excluding subsections & home)
  const sections: Section[] = useMemo(() => {
    return allSections.filter((s) => !s.parent && s.id !== 'home');
  }, [allSections]);

  // Helper function to get the breadcrumb path for a section
  const getBreadcrumbPath = useCallback(
    (sectionId: string): string[] => {
      if (sectionId === 'home') return ['home'];

      const section = allSections.find((s) => s.id === sectionId);
      if (!section) return ['home'];

      const path = ['home'];
      if (section.parent) {
        path.push(section.parent);
      }
      path.push(sectionId);

      return path;
    },
    [allSections]
  );

  const getCurrentSectionFromPosition = useCallback(
    (position: Position) => {
      let closestSection = 'home';
      let closestDistance = Infinity;

      for (const section of allSections) {
        const dx = position.x + section.position.x;
        const dy = position.y + section.position.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestSection = section.id;
        }
      }

      return closestSection;
    },
    [allSections]
  );

  const updateCurrentSection = useCallback(
    (newSection: string, method: 'keyboard' | 'mouse' | 'direct' = 'direct') => {
      if (newSection !== currentSection) {
        const previousSection = currentSection;

        // Only track section visits for non-home sections
        if (newSection !== 'home') {
          recordSectionVisit(newSection);
          const visitData = getSectionVisits(newSection);
          trackSectionVisit(newSection, visitData.visitCount, method);
        }

        // Track navigation flow if not the first visit
        if (previousSection && previousSection !== 'home' && newSection !== 'home') {
          trackNavigationFlow(previousSection, newSection, method);
        }

        setCurrentSection(newSection);
      }
    },
    [currentSection, recordSectionVisit, getSectionVisits, trackSectionVisit, trackNavigationFlow]
  );

  const navigateToSection = useCallback(
    (sectionId: string, method: 'keyboard' | 'mouse' | 'direct' = 'direct') => {
      const section = allSections.find((s) => s.id === sectionId);
      if (section) {
        updateCurrentSection(sectionId, method);
        return {
          x: -section.position.x,
          y: -section.position.y,
        };
      }
      return null;
    },
    [allSections, updateCurrentSection]
  );

  const navigateHome = useCallback(() => {
    return navigateToSection('home', 'direct') || { x: 0, y: 0 };
  }, [navigateToSection]);

  const setNavigationMethod = useCallback((method: 'keyboard' | 'mouse' | 'direct') => {
    navigationMethodRef.current = method;
  }, []);

  return {
    sections,
    allSections,
    currentSection,
    spacing,
    getBreadcrumbPath,
    getCurrentSectionFromPosition,
    updateCurrentSection,
    navigateToSection,
    navigateHome,
    setNavigationMethod,
    getSectionVisits,
  };
};

export default useSectionManagement;
