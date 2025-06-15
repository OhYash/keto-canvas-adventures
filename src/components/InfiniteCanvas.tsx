
import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import NavigationBreadcrumb from './NavigationBreadcrumb';
import WorkSection from './sections/WorkSection';
import PersonalSection from './sections/PersonalSection';
import KetoSection from './sections/KetoSection';
import ProjectsSection from './sections/ProjectsSection';
import HomeSection from './sections/HomeSection';

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

const InfiniteCanvas = () => {
  const [viewportPosition, setViewportPosition] = useState<Position>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePos, setLastMousePos] = useState<Position>({ x: 0, y: 0 });
  const [currentSection, setCurrentSection] = useState<string>('home');
  const [navigationHistory, setNavigationHistory] = useState<string[]>(['home']);
  const canvasRef = useRef<HTMLDivElement>(null);

  const sections: Section[] = useMemo(() => [
    {
      id: 'work',
      title: 'Work Experience',
      subtitle: 'Professional Journey & Projects',
      position: { x: 800, y: 0 },
      color: 'from-blue-500 to-cyan-500',
      gradient: 'bg-gradient-to-br from-blue-500/20 to-cyan-500/20',
      icon: '💼',
      direction: 'right'
    },
    {
      id: 'personal',
      title: 'Personal Life',
      subtitle: 'About Me & My Adventures',
      position: { x: -800, y: 0 },
      color: 'from-green-500 to-emerald-500',
      gradient: 'bg-gradient-to-br from-green-500/20 to-emerald-500/20',
      icon: '🧍‍♂️',
      direction: 'left'
    },
    {
      id: 'keto',
      title: 'Meet Keto',
      subtitle: 'My Beloved Cat',
      position: { x: 0, y: -800 },
      color: 'from-purple-500 to-pink-500',
      gradient: 'bg-gradient-to-br from-purple-500/20 to-pink-500/20',
      icon: '🐱',
      direction: 'up'
    },
    {
      id: 'projects',
      title: 'Personal Projects',
      subtitle: 'Code & Creativity',
      position: { x: 0, y: 800 },
      color: 'from-orange-500 to-red-500',
      gradient: 'bg-gradient-to-br from-orange-500/20 to-red-500/20',
      icon: '🚀',
      direction: 'down'
    }
  ], []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    setLastMousePos({ x: e.clientX, y: e.clientY });
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;

    const deltaX = e.clientX - lastMousePos.x;
    const deltaY = e.clientY - lastMousePos.y;

    setViewportPosition(prev => ({
      x: prev.x + deltaX,
      y: prev.y + deltaY
    }));

    setLastMousePos({ x: e.clientX, y: e.clientY });
  }, [isDragging, lastMousePos]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setLastMousePos({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    }
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;

    const deltaX = e.touches[0].clientX - lastMousePos.x;
    const deltaY = e.touches[0].clientY - lastMousePos.y;

    setViewportPosition(prev => ({
      x: prev.x + deltaX,
      y: prev.y + deltaY
    }));

    setLastMousePos({ x: e.touches[0].clientX, y: e.touches[0].clientY });
  }, [isDragging, lastMousePos]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  const navigateToSection = useCallback((sectionId: string) => {
    const section = sections.find(s => s.id === sectionId);
    if (section) {
      setViewportPosition({
        x: -section.position.x,
        y: -section.position.y
      });
      setCurrentSection(sectionId);
      
      setNavigationHistory(prev => {
        const newHistory = [...prev];
        const existingIndex = newHistory.indexOf(sectionId);
        if (existingIndex !== -1) {
          newHistory.splice(existingIndex, 1);
        }
        return [...newHistory, sectionId];
      });
    }
  }, [sections]);

  const navigateHome = useCallback(() => {
    setViewportPosition({ x: 0, y: 0 });
    setCurrentSection('home');
    setNavigationHistory(['home']);
  }, []);

  const renderSectionContent = useCallback((section: Section) => {
    const commonProps = {
      gradient: section.gradient,
      icon: section.icon,
      title: section.title,
      subtitle: section.subtitle,
      onNavigateHome: navigateHome,
    };

    switch (section.id) {
      case 'work':
        return <WorkSection {...commonProps} />;
      case 'personal':
        return <PersonalSection {...commonProps} />;
      case 'keto':
        return <KetoSection {...commonProps} />;
      case 'projects':
        return <ProjectsSection {...commonProps} onNavigateToSection={navigateToSection} />;
      default:
        return null;
    }
  }, [navigateHome, navigateToSection]);

  // Enhanced star background with subtle animation
  const starBackground = useMemo(() => (
    [...Array(30)].map((_, i) => (
      <div
        key={i}
        className="absolute w-0.5 h-0.5 sm:w-1 sm:h-1 bg-white rounded-full opacity-40 animate-pulse"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 3}s`,
          animationDuration: `${2 + Math.random() * 2}s`,
        }}
      />
    ))
  ), []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowRight':
          navigateToSection('work');
          break;
        case 'ArrowLeft':
          navigateToSection('personal');
          break;
        case 'ArrowUp':
          navigateToSection('keto');
          break;
        case 'ArrowDown':
          navigateToSection('projects');
          break;
        case 'Escape':
        case 'Home':
          navigateHome();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigateToSection, navigateHome]);

  return (
    <div className="w-full h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col">
      <NavigationBreadcrumb
        currentSection={currentSection}
        navigationHistory={navigationHistory.slice(0, -1)}
        onNavigate={navigateToSection}
        onNavigateHome={navigateHome}
      />

      <div 
        ref={canvasRef}
        className="flex-1 cursor-grab active:cursor-grabbing relative touch-pan-x touch-pan-y"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Enhanced stars background with subtle animation */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {starBackground}
        </div>

        {/* Canvas content with smooth transitions */}
        <div
          className="absolute will-change-transform transition-transform duration-200 ease-out"
          style={{
            transform: `translate3d(${viewportPosition.x}px, ${viewportPosition.y}px, 0)`,
            left: '50%',
            top: '50%'
          }}
        >
          {/* Home/Landing section */}
          <div className="absolute -translate-x-1/2 -translate-y-1/2">
            <HomeSection sections={sections} onNavigateToSection={navigateToSection} />
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
        </div>

        {/* Navigation indicator with fade animation */}
        <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 pointer-events-none">
          <div className="bg-slate-800/80 backdrop-blur-sm px-3 sm:px-4 py-1 sm:py-2 rounded-full text-slate-300 text-xs sm:text-sm transition-opacity duration-200">
            {currentSection === 'home' ? 'Home Base' : sections.find(s => s.id === currentSection)?.title}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfiniteCanvas;
