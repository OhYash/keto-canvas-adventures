
import React from 'react';
import { Button } from '@/components/ui/button';
import { ZoomOut, ZoomIn } from 'lucide-react';

interface ZoomOutButtonProps {
  isZoomedOut: boolean;
  onZoomOut: () => void;
  onZoomIn: () => void;
}

const ZoomOutButton: React.FC<ZoomOutButtonProps> = ({
  isZoomedOut,
  onZoomOut,
  onZoomIn,
}) => {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={isZoomedOut ? onZoomIn : onZoomOut}
      className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border-slate-500/30 hover:border-slate-400/50 text-white hover:text-white"
    >
      {isZoomedOut ? (
        <>
          <ZoomIn className="w-4 h-4 mr-2" />
          Zoom In
        </>
      ) : (
        <>
          <ZoomOut className="w-4 h-4 mr-2" />
          Overview
        </>
      )}
    </Button>
  );
};

export default ZoomOutButton;
