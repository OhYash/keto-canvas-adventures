import { useCallback } from 'react';

// Extend the Window interface to include umami
declare global {
  interface Window {
    umami?: {
      track: (eventName: string, eventData?: Record<string, unknown>) => void;
    };
  }
}

interface UmamiEventData {
  section?: string;
  card_id?: string;
  visit_count?: number;
  timestamp?: number;
  session_duration?: number;
  navigation_method?: 'keyboard' | 'mouse' | 'direct';
}

export const useUmamiTracking = () => {
  const trackEvent = useCallback((eventName: string, data?: UmamiEventData) => {
    // Check if umami is available and loaded
    if (typeof window !== 'undefined' && window.umami) {
      try {
        const eventData = {
          ...data,
          timestamp: Date.now(),
          user_agent: navigator.userAgent,
          url: window.location.pathname,
        };
        
        window.umami.track(eventName, eventData);
      } catch (error) {
        console.warn('Umami tracking error:', error);
      }
    }
  }, []);

  const trackSectionVisit = useCallback((sectionId: string, visitCount: number, navigationMethod: 'keyboard' | 'mouse' | 'direct' = 'direct') => {
    trackEvent('section-visit', {
      section: sectionId,
      visit_count: visitCount,
      navigation_method: navigationMethod,
    });
  }, [trackEvent]);

  const trackCardView = useCallback((cardId: string, sectionId: string, visitCount: number) => {
    trackEvent('card-view', {
      card_id: cardId,
      section: sectionId,
      visit_count: visitCount,
    });
  }, [trackEvent]);

  const trackSectionExit = useCallback((sectionId: string, sessionDuration: number) => {
    trackEvent('section-exit', {
      section: sectionId,
      session_duration: sessionDuration,
    });
  }, [trackEvent]);

  const trackNavigationFlow = useCallback((fromSection: string, toSection: string, method: 'keyboard' | 'mouse' | 'direct') => {
    trackEvent('navigation-flow', {
      from_section: fromSection,
      to_section: toSection,
      navigation_method: method,
    });
  }, [trackEvent]);

  return {
    trackEvent,
    trackSectionVisit,
    trackCardView,
    trackSectionExit,
    trackNavigationFlow,
  };
};