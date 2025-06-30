import React, { useRef, useEffect, useCallback } from 'react';
import NavigationBreadcrumb from './NavigationBreadcrumb';
import StarBackground from './canvas/StarBackground';
import SectionRenderer from './canvas/SectionRenderer';
import NavigationIndicator from './canvas/NavigationIndicator';
import ZoomOutButton from './ZoomOutButton';
import { useViewport } from '../hooks/useViewport';
import { useSectionManagement } from '../hooks/useSectionManagement';
import { useCanvasEvents } from '../hooks/useCanvasEvents';
import { useGridNavigation } from '../hooks/useGridNavigation';
import { useZoom } from '../hooks/useZoom';

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

  // Add zoom functionality
  const { isZoomedOut, zoomScale, zoomOffset, zoomOut, zoomIn } = useZoom();

  // Get the proper breadcrumb path for the current section
  const breadcrumbPath = getBreadcrumbPath(currentSection);

  const handlePositionChange = useCallback((deltaX: number, deltaY: number) => {
    // Don't allow panning when zoomed out
    if (isZoomedOut) return;
    
    setViewportPosition(prev => {
      const newPosition = {
        x: prev.x + deltaX,
        y: prev.y + deltaY
      };
      
      const newSection = getCurrentSectionFromPosition(newPosition);
      updateCurrentSection(newSection, 'mouse');
      
      return newPosition;
    });
  }, [setViewportPosition, getCurrentSectionFromPosition, updateCurrentSection, isZoomedOut]);

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

  const resetScrollPositions = useCallback(() => {
    // Reset scroll position for all scrollable section containers
    document.querySelectorAll('[class*="overflow-y-auto"]').forEach(element => {
      element.scrollTop = 0;
    });
  }, []);

  const handleNavigateToSection = useCallback((sectionId: string) => {
    // If zoomed out, zoom back in first
    if (isZoomedOut) {
      zoomIn();
    }
    
    const newPosition = navigateToSection(sectionId, 'direct');
    if (newPosition) {
      setViewportPosition(newPosition);
      // Reset scroll positions after navigation
      setTimeout(resetScrollPositions, 0);
    }
  }, [navigateToSection, setViewportPosition, resetScrollPositions, isZoomedOut, zoomIn]);

  const handleKeyboardNavigateToSection = useCallback((sectionId: string) => {
    // If zoomed out, zoom back in first
    if (isZoomedOut) {
      zoomIn();
    }
    
    const newPosition = navigateToSection(sectionId, 'keyboard');
    if (newPosition) {
      setViewportPosition(newPosition);
      // Reset scroll positions after navigation
      setTimeout(resetScrollPositions, 0);
    }
  }, [navigateToSection, setViewportPosition, resetScrollPositions, isZoomedOut, zoomIn]);

  const handleNavigateHome = useCallback(() => {
    // If zoomed out, zoom back in first
    if (isZoomedOut) {
      zoomIn();
    }
    
    const newPosition = navigateHome();
    setViewportPosition(newPosition);
    // Reset scroll positions after navigation
    setTimeout(resetScrollPositions, 0);
  }, [navigateHome, setViewportPosition, resetScrollPositions, isZoomedOut, zoomIn]);

  // Grid-based navigation
  const { navigateInDirection } = useGridNavigation({
    sections,
    allSections,
    currentSection,
    onNavigateToSection: handleKeyboardNavigateToSection,
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't allow keyboard navigation when zoomed out
      if (isZoomedOut) return;
      
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
  }, [navigateInDirection, handleNavigateHome, isZoomedOut]);

  return (
    <div className="w-full h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col">
      <style>{`
        @keyframes slide-in-right {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        .animate-slide-in-right {
          animation: slide-in-right 0.3s ease-out;
        }
      `}</style>

      <div className="flex items-center justify-between px-4 py-2">
        <NavigationBreadcrumb
          currentSection={currentSection}
          navigationHistory={navigationHistory.slice(0, -1)}
          breadcrumbPath={breadcrumbPath}
          onNavigate={handleNavigateToSection}
          onNavigateHome={handleNavigateHome}
        />
        
        <ZoomOutButton
          isZoomedOut={isZoomedOut}
          onZoomOut={zoomOut}
          onZoomIn={zoomIn}
        />
      </div>

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
          className="absolute will-change-transform transition-all duration-500 ease-out"
          style={{
            transform: `translate3d(${viewportPosition.x + zoomOffset.x}px, ${viewportPosition.y + zoomOffset.y}px, 0) scale(${zoomScale})`,
            left: '50%',
            top: '50%',
            transformOrigin: 'center center'
          }}
        >
          <SectionRenderer
            sections={sections}
            allSections={allSections}
            onNavigateHome={handleNavigateHome}
            onNavigateToSection={handleNavigateToSection}
            isZoomedOut={isZoomedOut}
          />
        </div>

        {!isZoomedOut && (
          <NavigationIndicator
            currentSection={currentSection}
            sections={sections}
          />
        )}
      </div>
    </div>
  );
};

export default InfiniteCanvas;
