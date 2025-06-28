import { useState, useCallback, useEffect } from 'react';

export interface VisitData {
  visitCount: number;
  totalTimeSpent: number; // in seconds
  firstVisit: number; // timestamp
  lastVisit: number; // timestamp
  averageTimeSpent: number;
}

export interface CardVisitData {
  visitCount: number;
  lastVisit: number;
  sectionId: string;
}

interface VisitTrackingData {
  sections: Record<string, VisitData>;
  cards: Record<string, CardVisitData>;
  currentSessionStart: number;
  lastActiveSection?: string;
}

const STORAGE_KEY = 'canvas-visit-tracking';

const getDefaultVisitData = (): VisitData => ({
  visitCount: 0,
  totalTimeSpent: 0,
  firstVisit: Date.now(),
  lastVisit: Date.now(),
  averageTimeSpent: 0,
});

const loadVisitData = (): VisitTrackingData => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        sections: parsed.sections || {},
        cards: parsed.cards || {},
        currentSessionStart: Date.now(),
        lastActiveSection: parsed.lastActiveSection,
      };
    }
  } catch (error) {
    console.warn('Error loading visit tracking data:', error);
  }
  
  return {
    sections: {},
    cards: {},
    currentSessionStart: Date.now(),
  };
};

const saveVisitData = (data: VisitTrackingData) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.warn('Error saving visit tracking data:', error);
  }
};

export const useVisitTracking = () => {
  const [visitData, setVisitData] = useState<VisitTrackingData>(loadVisitData);

  // Save to localStorage whenever data changes
  useEffect(() => {
    saveVisitData(visitData);
  }, [visitData]);

  const recordSectionVisit = useCallback((sectionId: string) => {
    const now = Date.now();
    
    setVisitData(prev => {
      const currentSection = prev.sections[sectionId] || getDefaultVisitData();
      const isFirstVisit = currentSection.visitCount === 0;
      
      // Calculate session duration if coming from another section
      let sessionDuration = 0;
      if (prev.lastActiveSection && prev.lastActiveSection !== sectionId) {
        sessionDuration = Math.floor((now - prev.currentSessionStart) / 1000);
        
        // Update the previous section's time spent
        const prevSection = prev.sections[prev.lastActiveSection];
        if (prevSection) {
          const newTotalTime = prevSection.totalTimeSpent + sessionDuration;
          const newAverageTime = Math.floor(newTotalTime / prevSection.visitCount);
          
          prev.sections[prev.lastActiveSection] = {
            ...prevSection,
            totalTimeSpent: newTotalTime,
            averageTimeSpent: newAverageTime,
          };
        }
      }

      const updatedSection: VisitData = {
        visitCount: currentSection.visitCount + 1,
        totalTimeSpent: currentSection.totalTimeSpent,
        firstVisit: isFirstVisit ? now : currentSection.firstVisit,
        lastVisit: now,
        averageTimeSpent: currentSection.averageTimeSpent,
      };

      return {
        ...prev,
        sections: {
          ...prev.sections,
          [sectionId]: updatedSection,
        },
        currentSessionStart: now,
        lastActiveSection: sectionId,
      };
    });
  }, []);

  const recordCardVisit = useCallback((cardId: string, sectionId: string) => {
    const now = Date.now();
    
    setVisitData(prev => {
      const currentCard = prev.cards[cardId] || {
        visitCount: 0,
        lastVisit: 0,
        sectionId,
      };

      return {
        ...prev,
        cards: {
          ...prev.cards,
          [cardId]: {
            ...currentCard,
            visitCount: currentCard.visitCount + 1,
            lastVisit: now,
            sectionId,
          },
        },
      };
    });
  }, []);

  const getSectionVisits = useCallback((sectionId: string): VisitData => {
    return visitData.sections[sectionId] || getDefaultVisitData();
  }, [visitData.sections]);

  const getCardVisits = useCallback((cardId: string): CardVisitData | null => {
    return visitData.cards[cardId] || null;
  }, [visitData.cards]);

  const getMostVisitedSections = useCallback((limit: number = 5) => {
    return Object.entries(visitData.sections)
      .sort(([, a], [, b]) => b.visitCount - a.visitCount)
      .slice(0, limit)
      .map(([sectionId, data]) => ({ sectionId, ...data }));
  }, [visitData.sections]);

  const getTotalVisits = useCallback(() => {
    return Object.values(visitData.sections).reduce((total, section) => total + section.visitCount, 0);
  }, [visitData.sections]);

  const clearVisitData = useCallback(() => {
    const emptyData: VisitTrackingData = {
      sections: {},
      cards: {},
      currentSessionStart: Date.now(),
    };
    setVisitData(emptyData);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return {
    recordSectionVisit,
    recordCardVisit,
    getSectionVisits,
    getCardVisits,
    getMostVisitedSections,
    getTotalVisits,
    clearVisitData,
    visitData,
  };
};