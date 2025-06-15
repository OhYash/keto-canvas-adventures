
import React, { useRef, useEffect, useCallback } from 'react';
import NavigationBreadcrumb from './NavigationBreadcrumb';
import StarBackground from './canvas/StarBackground';
import SectionRenderer from './canvas/SectionRenderer';
import NavigationIndicator from './canvas/NavigationIndicator';
import { useViewport } from '../hooks/useViewport';
import { useSectionManagement } from '../hooks/useSectionManagement';
import { useCanvasEvents } from '../hooks/useCanvasEvents';
import { useGridNavigation } from '../hooks/useGridNavigation';

const InfiniteCanvas = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  
  const {
    viewportPosition,
    setViewportPosition,
    isDragging,
    lastMousePos,
    startDragging,
    stopDragging,
    updateLastMousePos,
  } = useViewport();

  const {
    sections,
    allSections,
    currentSection,
    navigationHistory,
    getBreadcrumbPath,
    getCurrentSectionFromPosition,
    updateCurrentSection,
    navigateToSection,
    navigateHome,
  } = useSectionManagement();

  // Get the proper breadcrumb path for the current section
  const breadcrumbPath = getBreadcrumbPath(currentSection);

  const handlePositionChange = useCallback((deltaX: number, deltaY: number) => {
    setViewportPosition(prev => {
      const newPosition = {
        x: prev.x + deltaX,
        y: prev.y + deltaY
      };
      
      const newSection = getCurrentSectionFromPosition(newPosition);
      updateCurrentSection(newSection);
      
      return newPosition;
    });
  }, [setViewportPosition, getCurrentSectionFromPosition, updateCurrentSection]);

  const {
    isPanning,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  } = useCanvasEvents({
    isDragging,
    lastMousePos,
    startDragging,
    stopDragging,
    updateLastMousePos,
    onPositionChange: handlePositionChange,
  });

  const handleNavigateToSection = useCallback((sectionId: string) => {
    const newPosition = navigateToSection(sectionId);
    if (newPosition) {
      setViewportPosition(newPosition);
    }
  }, [navigateToSection, setViewportPosition]);

  const handleNavigateHome = useCallback(() => {
    const newPosition = navigateHome();
    setViewportPosition(newPosition);
  }, [navigateHome, setViewportPosition]);

  // Grid-based navigation
  const { navigateInDirection } = useGridNavigation({
    sections,
    allSections,
    currentSection,
    onNavigateToSection: handleNavigateToSection,
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowRight':
          e.preventDefault();
          navigateInDirection('right');
          break;
        case 'ArrowLeft':
          e.preventDefault();
          navigateInDirection('left');
          break;
        case 'ArrowUp':
          e.preventDefault();
          navigateInDirection('up');
          break;
        case 'ArrowDown':
          e.preventDefault();
          navigateInDirection('down');
          break;
        case 'Escape':
        case 'Home':
          e.preventDefault();
          handleNavigateHome();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigateInDirection, handleNavigateHome]);

  return (
    <div className="w-full h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col">
      <NavigationBreadcrumb
        currentSection={currentSection}
        navigationHistory={navigationHistory.slice(0, -1)}
        breadcrumbPath={breadcrumbPath}
        onNavigate={handleNavigateToSection}
        onNavigateHome={handleNavigateHome}
      />

      <div 
        ref={canvasRef}
        className="flex-1 cursor-grab active:cursor-grabbing relative touch-pan-x touch-pan-y"
        style={{ 
          touchAction: isPanning ? 'none' : 'pan-y'
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <StarBackground />

        <div
          className="absolute will-change-transform transition-transform duration-200 ease-out"
          style={{
            transform: `translate3d(${viewportPosition.x}px, ${viewportPosition.y}px, 0)`,
            left: '50%',
            top: '50%'
          }}
        >
          <SectionRenderer
            sections={sections}
            allSections={allSections}
            onNavigateHome={handleNavigateHome}
            onNavigateToSection={handleNavigateToSection}
          />
        </div>

        <NavigationIndicator
          currentSection={currentSection}
          sections={sections}
        />
      </div>
    </div>
  );
};

export default InfiniteCanvas;
