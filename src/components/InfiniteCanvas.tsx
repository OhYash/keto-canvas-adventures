import React, { useRef, useEffect, useCallback } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import NavigationBreadcrumb from './NavigationBreadcrumb';
import StarBackground from './canvas/StarBackground';
import SectionRenderer from './canvas/SectionRenderer';
import NavigationIndicator from './canvas/NavigationIndicator';
import SEO from './SEO';
import { useViewport } from '../hooks/useViewport';
import { useSectionManagement } from '../hooks/useSectionManagement';
import { useCanvasEvents } from '../hooks/useCanvasEvents';
import { useGridNavigation } from '../hooks/useGridNavigation';
import ArticleReaderView from './blog/ArticleReaderView';
import { getPostBySlug } from '../data/blogData';

const getSectionFromPath = (pathname: string) => {
  if (pathname === '/') return 'home';
  const pathSegments = pathname.split('/').filter(Boolean);
  const sectionId = pathSegments[0];
  const validSections = ['personal', 'work', 'keto', 'hobbies', 'projects', 'now', 'contact', 'travel', 'ataco', 'writing'];
  if (validSections.includes(sectionId)) {
    return sectionId;
  }
  return 'home';
};

const InfiniteCanvas = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  
  const initialSection = getSectionFromPath(location.pathname);

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
  } = useSectionManagement(initialSection);

  // Derive initial position directly from allSections (matching responsive spacing!)
  const initialTargetSection = allSections.find((s) => s.id === initialSection);
  const initialPosition = initialTargetSection
    ? { x: -initialTargetSection.position.x, y: -initialTargetSection.position.y }
    : { x: 0, y: 0 };

  const {
    viewportPosition,
    setViewportPosition,
    isDragging,
    lastMousePos,
    startDragging,
    stopDragging,
    updateLastMousePos,
  } = useViewport(initialPosition);

  // Get the proper breadcrumb path for the current section
  const breadcrumbPath = getBreadcrumbPath(currentSection);

  // Helper function to get URL path from section ID
  const getPathFromSection = useCallback((sectionId: string) => {
    if (sectionId === 'home') return '/';
    return `/${sectionId}`;
  }, []);

  const handlePositionChange = useCallback((deltaX: number, deltaY: number) => {
    setViewportPosition(prev => {
      const newPosition = {
        x: prev.x + deltaX,
        y: prev.y + deltaY
      };
      
      const newSection = getCurrentSectionFromPosition(newPosition);
      if (newSection !== currentSection) {
        updateCurrentSection(newSection, 'mouse');
        // Update URL for mouse navigation
        const newPath = getPathFromSection(newSection);
        if (location.pathname !== newPath) {
          navigate(newPath, { replace: false });
        }
      }
      
      return newPosition;
    });
  }, [setViewportPosition, getCurrentSectionFromPosition, updateCurrentSection, currentSection, getPathFromSection, location.pathname, navigate]);

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
    const newPosition = navigateToSection(sectionId, 'direct');
    if (newPosition) {
      setViewportPosition(newPosition);
      // Update URL
      const newPath = getPathFromSection(sectionId);
      if (location.pathname !== newPath) {
        navigate(newPath, { replace: false });
      }
      // Reset scroll positions after navigation
      setTimeout(resetScrollPositions, 0);
    }
  }, [navigateToSection, setViewportPosition, resetScrollPositions, getPathFromSection, location.pathname, navigate]);

  const handleKeyboardNavigateToSection = useCallback((sectionId: string) => {
    const newPosition = navigateToSection(sectionId, 'keyboard');
    if (newPosition) {
      setViewportPosition(newPosition);
      // Update URL
      const newPath = getPathFromSection(sectionId);
      if (location.pathname !== newPath) {
        navigate(newPath, { replace: false });
      }
      // Reset scroll positions after navigation
      setTimeout(resetScrollPositions, 0);
    }
  }, [navigateToSection, setViewportPosition, resetScrollPositions, getPathFromSection, location.pathname, navigate]);

  const handleNavigateHome = useCallback(() => {
    const newPosition = navigateHome();
    setViewportPosition(newPosition);
    // Update URL
    if (location.pathname !== '/') {
      navigate('/', { replace: false });
    }
    // Reset scroll positions after navigation
    setTimeout(resetScrollPositions, 0);
  }, [navigateHome, setViewportPosition, resetScrollPositions, location.pathname, navigate]);

  // Grid-based navigation
  const { navigateInDirection } = useGridNavigation({
    sections,
    allSections,
    currentSection,
    onNavigateToSection: handleKeyboardNavigateToSection,
  });

  // Handle URL changes (browser back/forward or direct navigation)
  useEffect(() => {
    const sectionFromUrl = getSectionFromPath(location.pathname);
    const newPosition = navigateToSection(sectionFromUrl, 'direct');
    if (newPosition) {
      setViewportPosition(newPosition);
      setTimeout(resetScrollPositions, 0);
    }
  }, [location.pathname, getSectionFromPath, navigateToSection, setViewportPosition, resetScrollPositions]);

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

  // Determine if an article is currently open via URL path (/writing/:slug)
  const pathSegments = location.pathname.split('/').filter(Boolean);
  const activeArticleSlug = pathSegments[0] === 'writing' && pathSegments[1] ? pathSegments[1] : null;
  const activeArticle = activeArticleSlug ? getPostBySlug(activeArticleSlug) : null;

  const handleSelectArticle = useCallback((slug: string) => {
    navigate(`/writing/${slug}`, { replace: false });
  }, [navigate]);

  const handleCloseArticle = useCallback(() => {
    navigate('/writing', { replace: false });
  }, [navigate]);

  return (
    <div className="w-full h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col">
      <SEO sectionId={currentSection} articleSlug={activeArticleSlug} />

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
            currentSection={currentSection}
            onNavigateHome={handleNavigateHome}
            onNavigateToSection={handleNavigateToSection}
            onSelectArticle={handleSelectArticle}
          />
        </div>

        <NavigationIndicator
          currentSection={currentSection}
          sections={sections}
        />

        {activeArticle && (
          <ArticleReaderView
            post={activeArticle}
            onClose={handleCloseArticle}
            onSelectPost={handleSelectArticle}
          />
        )}
      </div>
    </div>
  );
};

export default InfiniteCanvas;
