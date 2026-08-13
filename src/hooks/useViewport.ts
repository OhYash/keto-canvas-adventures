
import { useState, useCallback } from 'react';

interface Position {
  x: number;
  y: number;
}

export const useViewport = (initialPosition: Position = { x: 0, y: 0 }) => {
  const [viewportPosition, setViewportPosition] = useState<Position>(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePos, setLastMousePos] = useState<Position>({ x: 0, y: 0 });

  const updateViewportPosition = useCallback((newPosition: Position) => {
    setViewportPosition(newPosition);
  }, []);

  const startDragging = useCallback((position: Position) => {
    setIsDragging(true);
    setLastMousePos(position);
  }, []);

  const stopDragging = useCallback(() => {
    setIsDragging(false);
  }, []);

  const updateLastMousePos = useCallback((position: Position) => {
    setLastMousePos(position);
  }, []);

  return {
    viewportPosition,
    setViewportPosition,
    isDragging,
    lastMousePos,
    updateViewportPosition,
    startDragging,
    stopDragging,
    updateLastMousePos,
  };
};
