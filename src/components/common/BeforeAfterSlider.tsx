import { useState, useRef, useCallback, useEffect } from 'react';
import { ArrowLeftRight } from 'lucide-react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  aspectRatio?: string;
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = 'Initial 3D Scan',
  afterLabel = 'Completed Smile (10 Months)',
  aspectRatio = 'aspect-[16/10] sm:aspect-[16/9]',
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const clampedX = Math.max(0, Math.min(x, rect.width));
    const percentage = (clampedX / rect.width) * 100;
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  }, [isDragging, handleMove]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  }, [isDragging, handleMove]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove]);

  return (
    <div 
      ref={containerRef}
      className={`relative w-full ${aspectRatio} rounded-2xl overflow-hidden select-none shadow-luxury border border-[#E5DFD3] cursor-ew-resize group bg-[#0B231E]`}
      onMouseDown={() => setIsDragging(true)}
      onTouchStart={() => setIsDragging(true)}
    >
      <img
        src={afterImage}
        alt={afterLabel}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        loading="lazy"
      />
      <div className="absolute bottom-4 right-4 bg-[#0B231E]/90 backdrop-blur-md text-[#C5A880] text-xs font-mono font-semibold px-3 py-1.5 rounded border border-[#163B33] shadow-sm pointer-events-none">
        {afterLabel}
      </div>

      <div 
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ width: `${sliderPosition}%` }}
      >
        <img
          src={beforeImage}
          alt={beforeLabel}
          className="absolute inset-0 w-full h-full object-cover max-w-none"
          style={{ width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%' }}
          loading="lazy"
        />
        <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md text-[#0B231E] text-xs font-mono font-semibold px-3 py-1.5 rounded shadow-sm border border-[#E5DFD3] pointer-events-none">
          {beforeLabel}
        </div>
      </div>

      <div 
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_12px_rgba(0,0,0,0.6)] pointer-events-none z-10"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#0B231E] text-[#C5A880] shadow-2xl border-2 border-[#C5A880] flex items-center justify-center transition-transform group-hover:scale-110">
          <ArrowLeftRight size={15} className="text-[#C5A880]" />
        </div>
      </div>

      <div className="absolute top-3 inset-x-0 mx-auto w-fit bg-[#0B231E]/80 backdrop-blur-md text-[#C5A880] text-[10px] font-mono tracking-wider uppercase px-3 py-1 rounded border border-[#163B33] pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity">
        Drag divider to inspect alignment
      </div>
    </div>
  );
}
