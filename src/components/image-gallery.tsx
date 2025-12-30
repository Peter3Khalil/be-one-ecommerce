import { Button } from '@ui/button';
import { Dialog, DialogContent } from '@ui/dialog';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Package,
  ZoomIn,
  ZoomOut,
  RotateCcw,
} from 'lucide-react';
import { useState, useRef, MouseEvent, TouchEvent } from 'react';

const ImageGallery = ({ images }: { images: Array<string> }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const imageContainerRef = useRef<HTMLDivElement>(null);

  // Hover zoom state for main image (desktop only)
  const [isHovering, setIsHovering] = useState(false);
  const [hoverPosition, setHoverPosition] = useState({ x: 50, y: 50 });

  // Touch/pinch zoom state
  const [lastTouchDistance, setLastTouchDistance] = useState<number | null>(
    null
  );

  // Double tap ref
  const lastTapRef = useRef<number>(0);

  // Detect if device supports touch
  const isTouchDevice =
    typeof window !== 'undefined' && 'ontouchstart' in window;

  if (!images || images.length === 0) {
    return (
      <div className="flex aspect-square items-center justify-center rounded-lg bg-muted">
        <Package className="h-12 w-12 text-muted-foreground" />
      </div>
    );
  }

  const currentImage = images[currentIndex];

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setHoverPosition({ x, y });
  };

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.5, 4));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => {
      const newZoom = Math.max(prev - 0.5, 1);
      if (newZoom === 1) setPosition({ x: 0, y: 0 });
      return newZoom;
    });
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleDragStart = (e: MouseEvent) => {
    if (zoomLevel > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  };

  const handleDragMove = (e: MouseEvent) => {
    if (isDragging && zoomLevel > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleImageChange = (newIndex: number) => {
    setCurrentIndex(newIndex);
    setZoomLevel(1);
    setPosition({ x: 0, y: 0 });
  };

  // Touch event handlers for mobile pinch-to-zoom
  const getTouchDistance = (touches: React.TouchList) => {
    if (touches.length < 2) return null;
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const handleTouchStart = (e: TouchEvent) => {
    if (e.touches.length === 2) {
      // Pinch zoom start
      e.preventDefault();
      setLastTouchDistance(getTouchDistance(e.touches));
    } else if (e.touches.length === 1 && zoomLevel > 1) {
      // Pan start
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y,
      });
    }
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (e.touches.length === 2 && lastTouchDistance !== null) {
      // Pinch zoom
      e.preventDefault();
      const newDistance = getTouchDistance(e.touches);
      if (newDistance) {
        const scale = newDistance / lastTouchDistance;
        setZoomLevel((prev) => {
          const newZoom = Math.min(Math.max(prev * scale, 1), 4);
          if (newZoom === 1) setPosition({ x: 0, y: 0 });
          return newZoom;
        });
        setLastTouchDistance(newDistance);
      }
    } else if (e.touches.length === 1 && isDragging && zoomLevel > 1) {
      // Pan
      setPosition({
        x: e.touches[0].clientX - dragStart.x,
        y: e.touches[0].clientY - dragStart.y,
      });
    }
  };

  const handleTouchEnd = () => {
    setLastTouchDistance(null);
    setIsDragging(false);
  };

  // Double tap to zoom on mobile
  const handleDoubleTap = () => {
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300;
    if (now - lastTapRef.current < DOUBLE_TAP_DELAY) {
      // Double tap detected
      if (zoomLevel === 1) {
        setZoomLevel(2);
      } else {
        handleResetZoom();
      }
    }
    lastTapRef.current = now;
  };

  return (
    <div className="space-y-3">
      <div
        className="group relative aspect-square overflow-hidden rounded-lg bg-muted"
        onMouseEnter={() => !isTouchDevice && setIsHovering(true)}
        onMouseLeave={() => !isTouchDevice && setIsHovering(false)}
        onMouseMove={!isTouchDevice ? handleMouseMove : undefined}
      >
        <img
          src={currentImage}
          alt="Product"
          className="h-full w-full cursor-zoom-in object-cover transition-transform duration-300"
          style={{
            transformOrigin: `${hoverPosition.x}% ${hoverPosition.y}%`,
            transform: isHovering && !isTouchDevice ? 'scale(1.8)' : 'scale(1)',
          }}
          onClick={() => setIsFullscreen(true)}
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute end-2 top-2 bg-background/80 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 hover:bg-background/90"
          onClick={() => setIsFullscreen(true)}
        >
          <Maximize2 className="h-4 w-4" />
        </Button>
        {images.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute start-2 top-1/2 -translate-y-1/2 bg-background/80 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 hover:bg-background/90"
              onClick={() =>
                handleImageChange(
                  currentIndex === 0 ? images.length - 1 : currentIndex - 1
                )
              }
            >
              <ChevronLeft className="rtl:rotate-180" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute end-2 top-1/2 -translate-y-1/2 bg-background/80 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 hover:bg-background/90"
              onClick={() =>
                handleImageChange(
                  currentIndex === images.length - 1 ? 0 : currentIndex + 1
                )
              }
            >
              <ChevronRight className="rtl:rotate-180" />
            </Button>
          </>
        )}
      </div>
      {images.length > 1 && (
        <div className="flex justify-center gap-2">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => handleImageChange(index)}
              className={`h-16 w-16 overflow-hidden rounded-md border-2 transition-colors ${
                index === currentIndex
                  ? 'border-primary'
                  : 'border-transparent hover:border-muted-foreground/50'
              }`}
            >
              <img
                src={img}
                alt={`Thumbnail ${index + 1}`}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      <Dialog
        open={isFullscreen}
        onOpenChange={(open) => {
          setIsFullscreen(open);
          if (!open) handleResetZoom();
        }}
      >
        <DialogContent className="max-w-5xl p-0 max-md:h-dvh max-md:max-h-dvh max-md:w-screen max-md:max-w-full max-md:rounded-none">
          {/* Zoom Controls */}
          <div className="absolute end-12 top-2 z-10 flex gap-1 rounded-md bg-background/80 p-1 backdrop-blur-sm max-md:end-2 max-md:top-12">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 max-md:h-10 max-md:w-10"
              onClick={handleZoomOut}
              disabled={zoomLevel <= 1}
            >
              <ZoomOut className="h-4 w-4 max-md:h-5 max-md:w-5" />
            </Button>
            <span className="flex w-12 items-center justify-center text-sm font-medium">
              {Math.round(zoomLevel * 100)}%
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 max-md:h-10 max-md:w-10"
              onClick={handleZoomIn}
              disabled={zoomLevel >= 4}
            >
              <ZoomIn className="h-4 w-4 max-md:h-5 max-md:w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 max-md:h-10 max-md:w-10"
              onClick={handleResetZoom}
              disabled={zoomLevel === 1}
            >
              <RotateCcw className="h-4 w-4 max-md:h-5 max-md:w-5" />
            </Button>
          </div>
          <div
            ref={imageContainerRef}
            className="relative flex h-full items-center justify-center overflow-hidden max-md:min-h-[80dvh]"
            onMouseDown={handleDragStart}
            onMouseMove={handleDragMove}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onClick={() => {
              if (!isTouchDevice && zoomLevel === 1) handleZoomIn();
              if (isTouchDevice) handleDoubleTap();
            }}
            style={{
              cursor:
                zoomLevel > 1 ? (isDragging ? 'grabbing' : 'grab') : 'zoom-in',
              touchAction: zoomLevel > 1 ? 'none' : 'pan-y',
            }}
          >
            <img
              src={currentImage}
              alt="Product Full Size"
              className="h-auto max-h-[90vh] w-full object-contain transition-transform duration-200"
              style={{
                transform: `scale(${zoomLevel}) translate(${position.x / zoomLevel}px, ${position.y / zoomLevel}px)`,
              }}
              draggable={false}
            />
            {images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute start-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background/90"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleImageChange(
                      currentIndex === 0 ? images.length - 1 : currentIndex - 1
                    );
                  }}
                >
                  <ChevronLeft className="rtl:rotate-180" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute end-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background/90"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleImageChange(
                      currentIndex === images.length - 1 ? 0 : currentIndex + 1
                    );
                  }}
                >
                  <ChevronRight className="rtl:rotate-180" />
                </Button>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ImageGallery;
