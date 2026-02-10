import React, { useState, useRef, useEffect, useCallback } from 'react';

interface BeforeAfterSliderProps {
  beforeImg: string;
  afterImg: string;
}

const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({ beforeImg, afterImg }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.min(Math.max((x / rect.width) * 100, 0), 100);
    setSliderPosition(percentage);
  }, []);

  const handleMouseDown = () => setIsDragging(true);
  const handleTouchStart = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  useEffect(() => {
    const handleWindowMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        handleMove(e.clientX);
      }
    };
    const handleWindowTouchMove = (e: TouchEvent) => {
      if (isDragging) {
        handleMove(e.touches[0].clientX);
      }
    };
    const handleWindowMouseUp = () => {
      setIsDragging(false);
    };
    const handleWindowTouchEnd = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleWindowMouseMove);
      window.addEventListener('touchmove', handleWindowTouchMove);
      window.addEventListener('mouseup', handleWindowMouseUp);
      window.addEventListener('touchend', handleWindowTouchEnd);
    }

    return () => {
      window.removeEventListener('mousemove', handleWindowMouseMove);
      window.removeEventListener('touchmove', handleWindowTouchMove);
      window.removeEventListener('mouseup', handleWindowMouseUp);
      window.removeEventListener('touchend', handleWindowTouchEnd);
    };
  }, [isDragging, handleMove]);

  // Reset position when images change
  useEffect(() => {
    setSliderPosition(50);
  }, [beforeImg, afterImg]);

  return (
    <div 
      ref={sliderRef}
      className="relative w-full aspect-video shadow-2xl rounded-lg overflow-hidden border border-gray-600 bg-black cursor-ew-resize select-none"
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      {/* After Image (Background) */}
      <img 
        src={afterImg} 
        alt="After Redesign" 
        className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
        draggable={false}
      />
      
      {/* Before Image (Foreground - Clipped) */}
      <div 
        className="absolute inset-0 overflow-hidden select-none pointer-events-none"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img 
          src={beforeImg} 
          alt="Before Redesign" 
          className="absolute inset-0 w-full h-full object-cover max-w-none"
          draggable={false}
        />
      </div>

      {/* Labels */}
      <span className="absolute top-5 left-5 px-3 py-1 bg-black/70 text-white text-xs md:text-sm font-bold rounded pointer-events-none z-10">
        Original (Before)
      </span>
      <span className="absolute top-5 right-5 px-3 py-1 bg-black/70 text-white text-xs md:text-sm font-bold rounded pointer-events-none z-10">
        Redesign (After)
      </span>

      {/* Slider Handle */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-20 shadow-[0_0_10px_rgba(0,0,0,0.5)]"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-900 shadow-md">
          <i className="fa-solid fa-arrows-left-right text-xs"></i>
        </div>
      </div>
    </div>
  );
};

export default BeforeAfterSlider;