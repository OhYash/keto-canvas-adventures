
import { useState, useCallback, useMemo } from 'react';

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

export const useSectionManagement = () => {
  const [currentSection, setCurrentSection] = useState<string>('home');
  const [navigationHistory, setNavigationHistory] = useState<string[]>(['home']);

  const sections: Section[] = useMemo(() => [
    {
      id: 'work',
      title: 'Work Experience',
      subtitle: 'Professional Journey & Projects',
      position: { x: 1000, y: 0 },
      color: 'from-blue-500 to-cyan-500',
      gradient: 'bg-gradient-to-br from-blue-500/20 to-cyan-500/20',
      icon: '💼',
      direction: 'right'
    },
    {
      id: 'personal',
      title: 'Personal Life',
      subtitle: 'About Me & My Adventures',
      position: { x: -1000, y: 0 },
      color: 'from-green-500 to-emerald-500',
      gradient: 'bg-gradient-to-br from-green-500/20 to-emerald-500/20',
      icon: '🧍‍♂️',
      direction: 'left'
    },
    {
      id: 'keto',
      title: 'Meet Keto',
      subtitle: 'My Beloved Cat',
      position: { x: 0, y: -1000 },
      color: 'from-purple-500 to-pink-500',
      gradient: 'bg-gradient-to-br from-purple-500/20 to-pink-500/20',
      icon: '🐱',
      direction: 'up'
    },
    {
      id: 'projects',
      title: 'Personal Projects',
      subtitle: 'Code & Creativity',
      position: { x: 0, y: 1000 },
      color: 'from-orange-500 to-red-500',
      gradient: 'bg-gradient-to-br from-orange-500/20 to-red-500/20',
      icon: '🚀',
      direction: 'down'
    },
    {
      id: 'now',
      title: 'What I\'m Doing Now',
      subtitle: 'Current Focus & Plans',
      position: { x: 1000, y: 1000 },
      color: 'from-yellow-500 to-amber-500',
      gradient: 'bg-gradient-to-br from-yellow-500/20 to-amber-500/20',
      icon: '⚡',
      direction: 'down'
    }
  ], []);

  const getCurrentSectionFromPosition = useCallback((position: Position) => {
    const threshold = 400;

    if (Math.abs(position.x) < 200 && Math.abs(position.y) < 200) {
      return 'home';
    }

    for (const section of sections) {
      const targetX = -section.position.x;
      const targetY = -section.position.y;
      
      if (Math.abs(position.x - targetX) < threshold && Math.abs(position.y - targetY) < threshold) {
        return section.id;
      }
    }

    let closestSection = 'home';
    let closestDistance = Infinity;
    
    for (const section of sections) {
      const targetX = -section.position.x;
      const targetY = -section.position.y;
      const distance = Math.sqrt(Math.pow(position.x - targetX, 2) + Math.pow(position.y - targetY, 2));
      
      if (distance < closestDistance) {
        closestDistance = distance;
        closestSection = section.id;
      }
    }
    
    return closestSection;
  }, [sections]);

  const updateCurrentSection = useCallback((newSection: string) => {
    if (newSection !== currentSection) {
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
  }, [currentSection]);

  const navigateToSection = useCallback((sectionId: string) => {
    const section = sections.find(s => s.id === sectionId);
    if (section) {
      setCurrentSection(sectionId);
      
      setNavigationHistory(prev => {
        const newHistory = [...prev];
        const existingIndex = newHistory.indexOf(sectionId);
        if (existingIndex !== -1) {
          newHistory.splice(existingIndex, 1);
        }
        return [...newHistory, sectionId];
      });

      return {
        x: -section.position.x,
        y: -section.position.y
      };
    }
    return null;
  }, [sections]);

  const navigateHome = useCallback(() => {
    setCurrentSection('home');
    setNavigationHistory(['home']);
    return { x: 0, y: 0 };
  }, []);

  return {
    sections,
    currentSection,
    navigationHistory,
    getCurrentSectionFromPosition,
    updateCurrentSection,
    navigateToSection,
    navigateHome,
  };
};
