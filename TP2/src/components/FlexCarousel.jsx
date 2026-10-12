import React, { useState, useEffect, useRef, useCallback } from 'react';

export default function FlexCarousel({
  items = [],
  renderItem,
  autoPlay = false,
  autoPlayInterval = 4000,
  className = '',
  cardWidth = 320,
  gap = 20
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const trackRef = useRef(null);
  const autoPlayTimer = useRef(null);

  const total = items.length;

  const goTo = useCallback(
    (index) => {
      if (total === 0) return;
      const nextIndex = (index + total) % total;
      setCurrentIndex(nextIndex);
    },
    [total]
  );

  const next = useCallback(() => goTo(currentIndex + 1), [goTo, currentIndex]);
  const prev = useCallback(() => goTo(currentIndex - 1), [goTo, currentIndex]);

  useEffect(() => {
    if (!autoPlay || total <= 1 || isDragging || hoveredIndex !== null) return;
    autoPlayTimer.current = setInterval(next, autoPlayInterval);
    return () => clearInterval(autoPlayTimer.current);
  }, [autoPlay, autoPlayInterval, isDragging, hoveredIndex, next, total]);

  const handlePointerDown = (e) => {
    if (total <= 1) return;
    setIsDragging(true);
    setStartX(e.clientX);
    setDragOffset(0);
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    const diff = e.clientX - startX;
    setDragOffset(diff);
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragOffset > 60) {
      prev();
    } else if (dragOffset < -60) {
      next();
    }
    setDragOffset(0);
  };

  if (total === 0) return null;

  const step = cardWidth + gap;
  const translateX = -currentIndex * step + dragOffset;

  return (
    <div className={`relative w-full overflow-hidden select-none py-6 ${className}`}>
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-24 z-20 bg-gradient-to-r from-background to-transparent backdrop-blur-[2px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-24 z-20 bg-gradient-to-l from-background to-transparent backdrop-blur-[2px]"
        aria-hidden="true"
      />

      <div
        ref={trackRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="cursor-grab active:cursor-grabbing px-6 sm:px-12 flex items-stretch py-4"
        style={{
          transform: `translateX(${translateX}px)`,
          transition: isDragging ? 'none' : 'transform 450ms cubic-bezier(0.25, 1, 0.5, 1)',
          gap: `${gap}px`
        }}
      >
        {items.map((item, index) => {
          const isFocused = index === currentIndex;
          const isHovered = index === hoveredIndex;

          return (
            <div
              key={item.id || index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => {
                if (Math.abs(dragOffset) < 10) goTo(index);
              }}
              style={{
                width: `${cardWidth}px`,
                minWidth: `${cardWidth}px`
              }}
              className={`transition-all duration-300 ease-out flex-shrink-0 flex flex-col rounded-2xl ${
                isFocused
                  ? 'scale-[1.02] ring-1 ring-primary/40 shadow-xl shadow-primary/5'
                  : 'opacity-85 hover:opacity-100 hover:scale-[1.01]'
              }`}
            >
              {renderItem ? renderItem(item, index, isFocused || isHovered) : null}
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between px-4 sm:px-10 mt-6 relative z-30">
        <button
          type="button"
          onClick={prev}
          aria-label="Anterior"
          className="p-2.5 rounded-full bg-surface-container-high/80 hover:bg-surface-container-highest border border-outline-variant/60 text-on-surface hover:text-primary transition-all duration-200 shadow-md backdrop-blur-md hover:scale-105 active:scale-95 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-high/60 backdrop-blur-md border border-outline-variant/30">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Ir al elemento ${i + 1}`}
              className={`transition-all duration-300 rounded-full h-1.5 cursor-pointer ${
                i === currentIndex
                  ? 'w-5 bg-primary'
                  : 'w-1.5 bg-outline-variant/60 hover:bg-on-surface-variant'
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={next}
          aria-label="Siguiente"
          className="p-2.5 rounded-full bg-surface-container-high/80 hover:bg-surface-container-highest border border-outline-variant/60 text-on-surface hover:text-primary transition-all duration-200 shadow-md backdrop-blur-md hover:scale-105 active:scale-95 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
