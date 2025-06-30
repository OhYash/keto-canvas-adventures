
import { useState, useCallback } from 'react';

interface Position {
  x: number;
  y: number;
}

export const useZoom = () => {
  const [isZoomedOut, setIsZoomedOut] = useState(false);
  const [zoomScale, setZoomScale] = useState(1);
  const [zoomOffset, setZoomOffset] = useState<Position>({ x: 0, y: 0 });

  const zoomOut = useCallback(() => {
    setIsZoomedOut(true);
    setZoomScale(0.25); // Zoom out to 25% to see all pages
    setZoomOffset({ x: 0, y: 0 }); // Center the view
  }, []);

  const zoomIn = useCallback(() => {
    setIsZoomedOut(false);
    setZoomScale(1);
    setZoomOffset({ x: 0, y: 0 });
  }, []);

  return {
    isZoomedOut,
    zoomScale,
    zoomOffset,
    zoomOut,
    zoomIn,
  };
};
