
import { useState, useCallback } from 'react';

interface Position {
  x: number;
  y: number;
}

interface CanvasEventsProps {
  isDragging: boolean;
  lastMousePos: Position;
  startDragging: (position: Position) => void;
  stopDragging: () => void;
  updateLastMousePos: (position: Position) => void;
  onPositionChange: (deltaX: number, deltaY: number) => void;
}

export const useCanvasEvents = ({
  isDragging,
  lastMousePos,
  startDragging,
  stopDragging,
  updateLastMousePos,
  onPositionChange,
}: CanvasEventsProps) => {
  const [touchStartPos, setTouchStartPos] = useState<Position>({ x: 0, y: 0 });
  const [touchDirection, setTouchDirection] = useState<'horizontal' | 'vertical' | 'none'>('none');
  const [isPanning, setIsPanning] = useState(false);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    // Only drag with primary (left) mouse button
    if (e.button !== 0) return;

    const target = e.target as HTMLElement | null;
    if (target) {
      // Don't initiate canvas dragging when clicking interactive, text, or overlay elements
      const isInteractiveOrText = target.closest(
        'p, span, h1, h2, h3, h4, h5, h6, code, pre, li, a, button, input, textarea, select, blockquote, article, aside, [role="dialog"], [data-selectable="true"]'
      );
      if (isInteractiveOrText) {
        return;
      }
    }

    // Clear any previous selection and prevent browser from glitch-selecting text during canvas drag
    window.getSelection()?.removeAllRanges();
    e.preventDefault();

    startDragging({ x: e.clientX, y: e.clientY });
  }, [startDragging]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;

    e.preventDefault();

    const deltaX = e.clientX - lastMousePos.x;
    const deltaY = e.clientY - lastMousePos.y;

    onPositionChange(deltaX, deltaY);
    updateLastMousePos({ x: e.clientX, y: e.clientY });
  }, [isDragging, lastMousePos, onPositionChange, updateLastMousePos]);

  const handleMouseUp = useCallback(() => {
    stopDragging();
  }, [stopDragging]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      setTouchStartPos({ x: touch.clientX, y: touch.clientY });
      updateLastMousePos({ x: touch.clientX, y: touch.clientY });
      setTouchDirection('none');
      setIsPanning(false);
    }
  }, [updateLastMousePos]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (e.touches.length !== 1) return;

    const touch = e.touches[0];
    const deltaX = touch.clientX - touchStartPos.x;
    const deltaY = touch.clientY - touchStartPos.y;

    if (touchDirection === 'none' && (Math.abs(deltaX) > 10 || Math.abs(deltaY) > 10)) {
      const isMoreHorizontal = Math.abs(deltaX) > Math.abs(deltaY);
      setTouchDirection(isMoreHorizontal ? 'horizontal' : 'vertical');
    }

    if (touchDirection === 'horizontal') {
      if (!isPanning) {
        setIsPanning(true);
        startDragging({ x: touch.clientX, y: touch.clientY });
      }

      const moveDeltaX = touch.clientX - lastMousePos.x;
      const moveDeltaY = touch.clientY - lastMousePos.y;

      onPositionChange(moveDeltaX, moveDeltaY);
      updateLastMousePos({ x: touch.clientX, y: touch.clientY });

      e.preventDefault();
    }
  }, [touchStartPos, touchDirection, isPanning, lastMousePos, onPositionChange, updateLastMousePos, startDragging]);

  const handleTouchEnd = useCallback(() => {
    stopDragging();
    setIsPanning(false);
    setTouchDirection('none');
  }, [stopDragging]);

  return {
    isPanning,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  };
};
