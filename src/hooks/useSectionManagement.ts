import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { useVisitTracking } from './useVisitTracking';
import { useUmamiTracking } from './useUmamiTracking';

export interface GridPosition {
  col: number;
  row: number;
}

export interface Position {
  x: number;
  y: number;
}

export interface Section {
  id: string;
  title: string;
  subtitle: string;
  grid: GridPosition;
  position: Position;
  color: string;
  gradient: string;
  icon: string;
  direction?: 'right' | 'left' | 'up' | 'down';
  parent?: string;
  alwaysExpanded?: boolean;
}

interface SectionMeta {
  id: string;
  title: string;
  subtitle: string;
  grid: GridPosition;
  color: string;
  gradient: string;
  icon: string;
  direction?: 'right' | 'left' | 'up' | 'down';
  parent?: string;
  alwaysExpanded?: boolean;
}

const SECTION_METAS: SectionMeta[] = [
  {
    id: 'home',
    title: 'OhYa.sh Portfolio',
    subtitle: 'Senior Backend Engineer · Founder in progress.',
    grid: { col: 0, row: 0 },
    color: 'from-cyan-500 to-blue-500',
    gradient: 'bg-gradient-to-br from-cyan-500/20 to-blue-500/20',
    icon: '🏠',
    alwaysExpanded: true,
  },
  {
    id: 'work',
    title: 'My Work Life',
    subtitle: 'What I do professionally, and how I think about tech.',
    grid: { col: 1, row: 0 },
    color: 'from-blue-500 to-cyan-500',
    gradient: 'bg-gradient-to-br from-blue-500/20 to-cyan-500/20',
    icon: '💼',
    direction: 'right',
  },
  {
    id: 'writing',
    title: 'Writing & Essays',
    subtitle: 'Thoughts on backend engineering, system design, and building products.',
    grid: { col: 2, row: 0 },
    color: 'from-sky-500 to-blue-600',
    gradient: 'bg-gradient-to-br from-sky-500/20 to-blue-600/20',
    icon: '✍️',
    direction: 'right',
    parent: 'work',
  },
  {
    id: 'personal',
    title: 'Who I Am',
    subtitle: 'A little about me, my journey, and what makes me tick.',
    grid: { col: -1, row: 0 },
    color: 'from-green-500 to-emerald-500',
    gradient: 'bg-gradient-to-br from-green-500/20 to-emerald-500/20',
    icon: '🧍‍♂️',
    direction: 'left',
  },
  {
    id: 'travel',
    title: 'Travel Stories',
    subtitle: 'Adventures & Memories',
    grid: { col: -2, row: 0 },
    color: 'from-green-500 to-teal-500',
    gradient: 'bg-gradient-to-br from-green-500/20 to-teal-500/20',
    icon: '✈️',
    direction: 'left',
    parent: 'personal',
  },
  {
    id: 'keto',
    title: 'My Cat, Keto',
    subtitle: "Yes, he's real. Yes, he runs the show here.",
    grid: { col: 0, row: -1 },
    color: 'from-purple-500 to-pink-500',
    gradient: 'bg-gradient-to-br from-purple-500/20 to-pink-500/20',
    icon: '🐱',
    direction: 'up',
  },
  {
    id: 'ataco',
    title: 'Ataco',
    subtitle: 'My first motorcycle — a khaki green Triumph Scrambler 400X.',
    grid: { col: 0, row: -2 },
    color: 'from-lime-500 to-emerald-600',
    gradient: 'bg-gradient-to-br from-lime-500/20 to-emerald-600/20',
    icon: '🏍️',
    direction: 'up',
    parent: 'keto',
  },
  {
    id: 'hobbies',
    title: 'Just for Fun',
    subtitle: 'Things I build, explore, and obsess over outside work.',
    grid: { col: 0, row: 1 },
    color: 'from-orange-500 to-red-500',
    gradient: 'bg-gradient-to-br from-orange-500/20 to-red-500/20',
    icon: '🎨',
    direction: 'down',
  },
  {
    id: 'projects',
    title: 'Personal Projects',
    subtitle: 'Code & Creativity',
    grid: { col: 0, row: 2 },
    color: 'from-indigo-500 to-purple-500',
    gradient: 'bg-gradient-to-br from-indigo-500/20 to-purple-500/20',
    icon: '🚀',
    direction: 'down',
    parent: 'hobbies',
  },
  {
    id: 'now',
    title: "What I'm Up To",
    subtitle: "Current focus, projects, and what's on my plate lately.",
    grid: { col: 1, row: 1 },
    color: 'from-yellow-500 to-amber-500',
    gradient: 'bg-gradient-to-br from-yellow-500/20 to-amber-500/20',
    icon: '⚡',
    direction: 'down',
  },
  {
    id: 'contact',
    title: "Let's Talk",
    subtitle: 'Reach out about roles, freelance work, or collaboration.',
    grid: { col: -1, row: 1 },
    color: 'from-indigo-500 to-violet-500',
    gradient: 'bg-gradient-to-br from-indigo-500/20 to-violet-500/20',
    icon: '📧',
    direction: 'down',
  },
];

export const useSectionManagement = (initialSection: string = 'home') => {
  const [currentSection, setCurrentSection] = useState<string>(initialSection);
  const [navigationHistory, setNavigationHistory] = useState<string[]>([initialSection]);
  const [screenDimensions, setScreenDimensions] = useState({ 
    width: typeof window !== 'undefined' ? window.innerWidth : 1280, 
    height: typeof window !== 'undefined' ? window.innerHeight : 800 
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

  // Calculate responsive spacing based on screen size (ensuring preview cards peek nicely with zero overlap)
  const getResponsiveSpacing = useCallback(() => {
    const baseSpacing = 1050;
    const minSpacing = 950;
    const maxSpacing = 1500;
    
    // Scale based on viewport width
    const scaleFactor = Math.min(screenDimensions.width / 1920, maxSpacing / baseSpacing);
    const spacing = Math.max(minSpacing, Math.min(maxSpacing, baseSpacing * scaleFactor));
    
    return Math.round(spacing);
  }, [screenDimensions.width]);

  // Derive allSections from discrete grid coordinates
  const allSections: Section[] = useMemo(() => {
    const spacing = getResponsiveSpacing();
    return SECTION_METAS.map((meta) => ({
      ...meta,
      position: {
        x: meta.grid.col * spacing,
        y: meta.grid.row * spacing,
      },
    }));
  }, [getResponsiveSpacing]);

  // Primary top-level sections for navigation indicators / menus (excluding subsections)
  const sections: Section[] = useMemo(() => {
    return allSections.filter((s) => !s.parent && s.id !== 'home');
  }, [allSections]);

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
    return navigateToSection('home', 'direct') || { x: 0, y: 0 };
  }, [navigateToSection]);

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
