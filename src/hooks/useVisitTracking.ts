import { useCallback, useRef } from 'react';

export const useVisitTracking = () => {
  const visitCountsRef = useRef<Record<string, number>>({});

  const recordSectionVisit = useCallback((sectionId: string) => {
    visitCountsRef.current[sectionId] = (visitCountsRef.current[sectionId] || 0) + 1;
  }, []);

  const getSectionVisits = useCallback((sectionId: string) => {
    return {
      visitCount: visitCountsRef.current[sectionId] || 1,
    };
  }, []);

  return {
    recordSectionVisit,
    getSectionVisits,
  };
};

export default useVisitTracking;