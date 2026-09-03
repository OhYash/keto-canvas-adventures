import React, { useRef, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
import { getSectionFromPath, getPathFromSection } from '../data/sections';

export const InfiniteCanvas = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const initialSection = getSectionFromPath(location.pathname);

  const {
    sections,
    allSections,
    currentSection,
    spacing,
    getBreadcrumbPath,
    getCurrentSectionFromPosition,
    updateCurrentSection,
    navigateToSection,
    navigateHome,
  } = useSectionManagement(initialSection);

  // Derive initial position directly from allSections
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

  // Re-center active section if window resize triggers responsive spacing changes while not dragging
  const prevSpacingRef = useRef(spacing);
  useEffect(() => {
    if (prevSpacingRef.current !== spacing) {
      prevSpacingRef.current = spacing;
      if (!isDragging) {
        const activeSec = allSections.find((s) => s.id === currentSection);
        if (activeSec) {
          setViewportPosition({ x: -activeSec.position.x, y: -activeSec.position.y });
        }
      }
    }
  }, [spacing, isDragging, allSections, currentSection, setViewportPosition]);

  // Breadcrumb path for current section
  const breadcrumbPath = getBreadcrumbPath(currentSection);

  const [hasInteracted, setHasInteracted] = React.useState(false);

  const markInteracted = useCallback(() => {
    setHasInteracted(true);
  }, []);

  const resetScrollPositions = useCallback(() => {
    if (typeof document !== 'undefined') {
      document.querySelectorAll('[class*="overflow-y-auto"]').forEach((element) => {
        element.scrollTop = 0;
      });
    }
  }, []);

  // Position change from dragging across the canvas
  const handlePositionChange = useCallback(
    (deltaX: number, deltaY: number) => {
      markInteracted();
      setViewportPosition((prev) => {
        const newPosition = {
          x: prev.x + deltaX,
          y: prev.y + deltaY,
        };

        const newSection = getCurrentSectionFromPosition(newPosition);
        if (newSection !== currentSection) {
          updateCurrentSection(newSection, 'mouse');
          const newPath = getPathFromSection(newSection);
          // Use replace: true during mouse drag to prevent polluting browser history stack
          if (location.pathname !== newPath) {
            navigate(newPath, { replace: true });
          }
        }

        return newPosition;
      });
    },
    [markInteracted, setViewportPosition, getCurrentSectionFromPosition, updateCurrentSection, currentSection, location.pathname, navigate]
  );

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

  const handleNavigateToSection = useCallback(
    (sectionId: string) => {
      markInteracted();
      const newPosition = navigateToSection(sectionId, 'direct');
      if (newPosition) {
        setViewportPosition(newPosition);
        const newPath = getPathFromSection(sectionId);
        if (location.pathname !== newPath) {
          navigate(newPath, { replace: false });
        }
        resetScrollPositions();
      }
    },
    [markInteracted, navigateToSection, setViewportPosition, resetScrollPositions, location.pathname, navigate]
  );

  const handleKeyboardNavigateToSection = useCallback(
    (sectionId: string) => {
      markInteracted();
      const newPosition = navigateToSection(sectionId, 'keyboard');
      if (newPosition) {
        setViewportPosition(newPosition);
        const newPath = getPathFromSection(sectionId);
        if (location.pathname !== newPath) {
          navigate(newPath, { replace: false });
        }
        resetScrollPositions();
      }
    },
    [markInteracted, navigateToSection, setViewportPosition, resetScrollPositions, location.pathname, navigate]
  );

  const handleNavigateHome = useCallback(() => {
    markInteracted();
    const newPosition = navigateHome();
    setViewportPosition(newPosition);
    if (location.pathname !== '/') {
      navigate('/', { replace: false });
    }
    resetScrollPositions();
  }, [markInteracted, navigateHome, setViewportPosition, resetScrollPositions, location.pathname, navigate]);

  // Grid-based keyboard navigation
  const { navigateInDirection } = useGridNavigation({
    sections,
    allSections,
    currentSection,
    onNavigateToSection: handleKeyboardNavigateToSection,
  });

  // Handle URL changes (browser back/forward or direct URL loads)
  useEffect(() => {
    const sectionFromUrl = getSectionFromPath(location.pathname);
    const newPosition = navigateToSection(sectionFromUrl, 'direct');
    if (newPosition) {
      setViewportPosition(newPosition);
      resetScrollPositions();
    }
  }, [location.pathname, navigateToSection, setViewportPosition, resetScrollPositions]);

  // Parse path segments for article (/writing/:slug) and travel story (/travel/:storyId)
  const pathSegments = location.pathname.split('/').filter(Boolean);
  const activeArticleSlug = pathSegments[0] === 'writing' && pathSegments[1] ? pathSegments[1] : null;
  const activeArticle = activeArticleSlug ? getPostBySlug(activeArticleSlug) : null;
  const activeStoryId = pathSegments[0] === 'travel' && pathSegments[1] ? pathSegments[1] : null;

  const handleSelectArticle = useCallback(
    (slug: string) => {
      markInteracted();
      navigate(`/writing/${slug}`, { replace: false });
    },
    [markInteracted, navigate]
  );

  const handleCloseArticle = useCallback(() => {
    markInteracted();
    navigate('/writing', { replace: false });
  }, [markInteracted, navigate]);

  const handleSelectStory = useCallback(
    (storyId: string) => {
      markInteracted();
      navigate(`/travel/${storyId}`, { replace: false });
    },
    [markInteracted, navigate]
  );

  const handleBackFromStory = useCallback(() => {
    markInteracted();
    navigate('/travel', { replace: false });
  }, [markInteracted, navigate]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept arrow keys if an article reader overlay is active or focused on an input/search field
      if (
        activeArticleSlug ||
        (document.activeElement &&
          (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA'))
      ) {
        return;
      }

      switch (e.key) {
        case 'ArrowRight':
          e.preventDefault();
          markInteracted();
          navigateInDirection('right');
          break;
        case 'ArrowLeft':
          e.preventDefault();
          markInteracted();
          navigateInDirection('left');
          break;
        case 'ArrowUp':
          e.preventDefault();
          markInteracted();
          navigateInDirection('up');
          break;
        case 'ArrowDown':
          e.preventDefault();
          markInteracted();
          navigateInDirection('down');
          break;
        case 'Escape':
        case 'Home':
          e.preventDefault();
          markInteracted();
          handleNavigateHome();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [markInteracted, navigateInDirection, handleNavigateHome, activeArticleSlug]);

  return (
    <div className="w-full h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col">
      <SEO sectionId={currentSection} articleSlug={activeArticleSlug} storyId={activeStoryId} />

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
        breadcrumbPath={breadcrumbPath}
        onNavigate={handleNavigateToSection}
        onNavigateHome={handleNavigateHome}
      />

      <div
        ref={canvasRef}
        className="flex-1 cursor-grab active:cursor-grabbing relative touch-pan-x touch-pan-y"
        style={{
          touchAction: isPanning ? 'none' : 'pan-y',
        }}
        onMouseDown={(e) => {
          markInteracted();
          handleMouseDown(e);
        }}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={(e) => {
          markInteracted();
          handleTouchStart(e);
        }}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <StarBackground />

        <div
          className="absolute will-change-transform transition-transform duration-200 ease-out"
          style={{
            transform: `translate3d(${viewportPosition.x}px, ${viewportPosition.y}px, 0)`,
            left: '50%',
            top: '50%',
          }}
        >
          <SectionRenderer
            sections={sections}
            allSections={allSections}
            currentSection={currentSection}
            viewportPosition={viewportPosition}
            activeArticleSlug={activeArticleSlug}
            activeStoryId={activeStoryId}
            onNavigateHome={handleNavigateHome}
            onNavigateToSection={handleNavigateToSection}
            onSelectArticle={handleSelectArticle}
            onSelectStory={handleSelectStory}
            onBackToList={handleBackFromStory}
            hasInteracted={hasInteracted}
          />
        </div>

        <NavigationIndicator
          currentSection={currentSection}
          sections={allSections}
        />
      </div>

      {activeArticle && (
        <ArticleReaderView
          post={activeArticle}
          onClose={handleCloseArticle}
          onSelectPost={handleSelectArticle}
        />
      )}
    </div>
  );
};

export default InfiniteCanvas;
