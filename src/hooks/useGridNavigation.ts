import { useCallback } from 'react';
import { Section } from '@/data/sections';

interface GridNavigationProps {
  sections?: Section[];
  allSections: Section[];
  currentSection: string;
  onNavigateToSection: (sectionId: string) => void;
}

export const useGridNavigation = ({
  allSections,
  currentSection,
  onNavigateToSection,
}: GridNavigationProps) => {
  // Discrete integer grid navigation
  const findSectionInDirection = useCallback(
    (direction: 'left' | 'right' | 'up' | 'down'): string | null => {
      const current = allSections.find((s) => s.id === currentSection);
      if (!current) return null;

      const { col: curCol, row: curRow } = current.grid;

      // Filter candidates strictly in the target direction along the discrete coordinate axis
      const candidates: Array<{ id: string; colDelta: number; rowDelta: number; score: number }> = [];

      for (const section of allSections) {
        if (section.id === currentSection) continue;

        const colDelta = section.grid.col - curCol;
        const rowDelta = section.grid.row - curRow;

        let isInDirection = false;

        switch (direction) {
          case 'right':
            isInDirection = colDelta > 0;
            break;
          case 'left':
            isInDirection = colDelta < 0;
            break;
          case 'up':
            // Up corresponds to negative row delta (row < curRow)
            isInDirection = rowDelta < 0;
            break;
          case 'down':
            // Down corresponds to positive row delta (row > curRow)
            isInDirection = rowDelta > 0;
            break;
        }

        if (isInDirection) {
          // Scoring heuristic: heavily favor direct axis alignment (same row or same col),
          // then minimize discrete Manhattan distance
          const manhattan = Math.abs(colDelta) + Math.abs(rowDelta);
          const isDirectAxis =
            (direction === 'right' || direction === 'left')
              ? rowDelta === 0
              : colDelta === 0;

          // Priority score: direct axis candidates get top priority (lower score = closer/better)
          const score = (isDirectAxis ? 0 : 100) + manhattan;
          candidates.push({ id: section.id, colDelta, rowDelta, score });
        }
      }

      if (candidates.length === 0) return null;

      candidates.sort((a, b) => a.score - b.score);
      return candidates[0].id;
    },
    [allSections, currentSection]
  );

  const navigateInDirection = useCallback(
    (direction: 'left' | 'right' | 'up' | 'down') => {
      const targetSectionId = findSectionInDirection(direction);
      if (targetSectionId) {
        onNavigateToSection(targetSectionId);
      }
    },
    [findSectionInDirection, onNavigateToSection]
  );

  return {
    navigateInDirection,
  };
};

export default useGridNavigation;
