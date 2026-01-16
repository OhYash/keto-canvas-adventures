import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { useVisitTracking } from './useVisitTracking';
import { useUmamiTracking } from './useUmamiTracking';

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

export const useSectionManagement = () => {
  const [currentSection, setCurrentSection] = useState<string>('home');
  const [navigationHistory, setNavigationHistory] = useState<string[]>(['home']);
  const [screenDimensions, setScreenDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });
  
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

  // Calculate responsive spacing based on screen size
  const getResponsiveSpacing = useCallback(() => {
    const baseSpacing = 1000;
    const minSpacing = 800;
    const maxSpacing = 1600;
    
    // Scale based on viewport width, with a reasonable range
    // For 1080p (1920px): ~1000px spacing
    // For 1440p (2560px): ~1333px spacing  
    // For 4K (3840px): ~1600px spacing (capped)
    const scaleFactor = Math.min(screenDimensions.width / 1920, maxSpacing / baseSpacing);
    const spacing = Math.max(minSpacing, Math.min(maxSpacing, baseSpacing * scaleFactor));
    
    return Math.round(spacing);
  }, [screenDimensions.width]);

  const sections: Section[] = useMemo(() => {
    const spacing = getResponsiveSpacing();
    
    return [
      {
        id: 'personal',
        title: 'Who I Am',
        subtitle: 'A little about me, my journey, and what makes me tick.',
        position: { x: -spacing, y: 0 },
        color: 'from-green-500 to-emerald-500',
        gradient: 'bg-gradient-to-br from-green-500/20 to-emerald-500/20',
        icon: '🧍‍♂️',
        direction: 'left'
      },
      {
        id: 'now',
        title: 'What I\'m Up To',
        subtitle: 'Current focus, projects, and what\'s on my plate lately.',
        position: { x: spacing, y: spacing },
        color: 'from-yellow-500 to-amber-500',
        gradient: 'bg-gradient-to-br from-yellow-500/20 to-amber-500/20',
        icon: '⚡',
        direction: 'down'
      },
      {
        id: 'keto',
        title: 'My Cat, Keto',
        subtitle: 'Yes, he\'s real. Yes, he runs the show here.',
        position: { x: 0, y: -spacing },
        color: 'from-purple-500 to-pink-500',
        gradient: 'bg-gradient-to-br from-purple-500/20 to-pink-500/20',
        icon: '🐱',
        direction: 'up'
      },
      {
        id: 'hobbies',
        title: 'Just for Fun',
        subtitle: 'Things I build, explore, and obsess over outside work.',
        position: { x: 0, y: spacing },
        color: 'from-orange-500 to-red-500',
        gradient: 'bg-gradient-to-br from-orange-500/20 to-red-500/20',
        icon: '🎨',
        direction: 'down'
      },
      {
        id: 'work',
        title: 'My Work Life',
        subtitle: 'What I do professionally, and how I think about tech.',
        position: { x: spacing, y: 0 },
        color: 'from-blue-500 to-cyan-500',
        gradient: 'bg-gradient-to-br from-blue-500/20 to-cyan-500/20',
        icon: '💼',
        direction: 'right'
      },
      {
        id: 'contact',
        title: 'Let\'s Talk',
        subtitle: 'Say hi, collaborate, or just share a meme.',
        position: { x: -spacing, y: spacing },
        color: 'from-indigo-500 to-violet-500',
        gradient: 'bg-gradient-to-br from-indigo-500/20 to-violet-500/20',
        icon: '📧',
        direction: 'down'
      }
    ];
  }, [getResponsiveSpacing]);

  // Define all sections including subsections with responsive positioning  
  const allSections: Section[] = useMemo(() => {
    const spacing = getResponsiveSpacing();
    
    return [
      ...sections,
      {
        id: 'projects',
        title: 'Personal Projects',
        subtitle: 'Code & Creativity',
        position: { x: 0, y: spacing * 2 },
        color: 'from-indigo-500 to-purple-500',
        gradient: 'bg-gradient-to-br from-indigo-500/20 to-purple-500/20',
        icon: '🚀',
        direction: 'down',
        parent: 'hobbies'
      },
      {
        id: 'travel',
        title: 'Travel Stories',
        subtitle: 'Adventures & Memories',
        position: { x: -spacing * 2, y: 0 },
        color: 'from-green-500 to-teal-500',
        gradient: 'bg-gradient-to-br from-green-500/20 to-teal-500/20',
        icon: '✈️',
        direction: 'left',
        parent: 'personal'
      }
    ];
  }, [sections, getResponsiveSpacing]);

  // Helper function to get the breadcrumb path for a section
  const getBreadcrumbPath = useCallback((sectionId: string): string[] => {
    if (sectionId === 'home') return ['home'];
    
    const section = allSections.find(s => s.id === sectionId);
    if (!section) return ['home'];
    
    const path = ['home'];
    if (section.parent) {
      path.push(section.parent);
    }
    path.push(sectionId);
    
    return path;
  }, [allSections]);

  const getCurrentSectionFromPosition = useCallback((position: Position) => {
    const threshold = 400;

    if (Math.abs(position.x) < 200 && Math.abs(position.y) < 200) {
      return 'home';
    }

    for (const section of allSections) {
      const targetX = -section.position.x;
      const targetY = -section.position.y;
      
      if (Math.abs(position.x - targetX) < threshold && Math.abs(position.y - targetY) < threshold) {
        return section.id;
      }
    }

    let closestSection = 'home';
    let closestDistance = Infinity;
    
    for (const section of allSections) {
      const targetX = -section.position.x;
      const targetY = -section.position.y;
      const distance = Math.sqrt(Math.pow(position.x - targetX, 2) + Math.pow(position.y - targetY, 2));
      
      if (distance < closestDistance) {
        closestDistance = distance;
        closestSection = section.id;
      }
    }
    
    return closestSection;
  }, [allSections]);

  const updateCurrentSection = useCallback((newSection: string, method: 'keyboard' | 'mouse' | 'direct' = 'direct') => {
    if (newSection !== currentSection) {
      const previousSection = currentSection;
      
      // Only track section visits for non-home sections
      if (newSection !== 'home') {
        // Record visit tracking
        recordSectionVisit(newSection);
        
        // Get visit count for analytics
        const visitData = getSectionVisits(newSection);
        
        // Track with Umami
        trackSectionVisit(newSection, visitData.visitCount, method);
      }
      
      // Track navigation flow if not the first visit
      if (previousSection && previousSection !== 'home' && newSection !== 'home') {
        trackNavigationFlow(previousSection, newSection, method);
      }
      
      setCurrentSection(newSection);
      if (newSection !== 'manual') {
        setNavigationHistory(prev => {
          const newHistory = [...prev];
          const existingIndex = newHistory.indexOf(newSection);
          if (existingIndex !== -1) {
            newHistory.splice(existingIndex, 1);
          }
          return [...newHistory, newSection];
        });
      }
    }
  }, [currentSection, recordSectionVisit, getSectionVisits, trackSectionVisit, trackNavigationFlow]);

  const navigateToSection = useCallback((sectionId: string, method: 'keyboard' | 'mouse' | 'direct' = 'direct') => {
    const section = allSections.find(s => s.id === sectionId);
    if (section) {
      // Update current section with tracking
      updateCurrentSection(sectionId, method);

      return {
        x: -section.position.x,
        y: -section.position.y
      };
    }
    return null;
  }, [allSections, updateCurrentSection]);

  const navigateHome = useCallback(() => {
    updateCurrentSection('home', 'direct');
    return { x: 0, y: 0 };
  }, [updateCurrentSection]);

  // Expose method to set navigation method for external callers
  const setNavigationMethod = useCallback((method: 'keyboard' | 'mouse' | 'direct') => {
    navigationMethodRef.current = method;
  }, []);

  return {
    sections,
    allSections,
    currentSection,
    navigationHistory,
    getBreadcrumbPath,
    getCurrentSectionFromPosition,
    updateCurrentSection,
    navigateToSection,
    navigateHome,
    setNavigationMethod,
    getSectionVisits,
  };
};
