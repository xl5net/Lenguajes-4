import React, { useState, useEffect, useRef, useCallback } from 'react';

export default function DepthCarousel({
  items = [],
  renderItem,
  autoAdvance = false,
  autoAdvanceInterval = 5000,
  className = '',
  itemWidth = '420px',
  onChange
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const containerRef = useRef(null);
  const autoAdvanceTimer = useRef(null);

  const total = items.length;

  const goTo = useCallback(
    (index) => {
      if (total === 0) return;
      const nextIndex = (index + total) % total;
      setActiveIndex(nextIndex);
      if (onChange) onChange(nextIndex);
    },
    [total, onChange]
  );

  const next = useCallback(() => goTo(activeIndex + 1), [goTo, activeIndex]);
  const prev = useCallback(() => goTo(activeIndex - 1), [goTo, activeIndex]);

  useEffect(() => {
    if (!autoAdvance || total <= 1 || isDragging) return;
    autoAdvanceTimer.current = setInterval(next, autoAdvanceInterval);
    return () => clearInterval(autoAdvanceTimer.current);
  }, [autoAdvance, autoAdvanceInterval, isDragging, next, total]);

  const handlePointerDown = (e) => {
    if (total <= 1) return;
    setIsDragging(true);
    setDragStartX(e.clientX);
    setDragOffset(0);
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    const diff = e.clientX - dragStartX;
    setDragOffset(diff);
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragOffset > 50) {
      prev();
    } else if (dragOffset < -50) {
      next();
    }
    setDragOffset(0);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      next();
    }
  };

  if (total === 0) return null;

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className={`relative w-full overflow-hidden select-none py-10 outline-none focus-visible:ring-1 focus-visible:ring-primary/40 rounded-2xl ${className}`}
      style={{ perspective: '1100px' }}
    >
      <div
        className="relative mx-auto flex items-center justify-center transition-transform duration-300 ease-out"
        style={{
          height: '460px',
          transformStyle: 'preserve-3d',
          transform: `translateX(${dragOffset * 0.2}px)`
        }}
      >
        {items.map((item, index) => {
          let offset = index - activeIndex;
          if (offset < -Math.floor(total / 2)) offset += total;
          if (offset > Math.floor(total / 2)) offset -= total;

          const absOffset = Math.abs(offset);
          const isCenter = offset === 0;

          if (absOffset > 2 && total > 4) return null;

          const rotateY = offset * -22;
          const translateX = offset * 62;
          const translateZ = -absOffset * 150;
          const scale = 1 - absOffset * 0.12;
          const opacity = Math.max(0.2, 1 - absOffset * 0.35);
          const zIndex = 20 - absOffset;

          return (
            <div
              key={item.id || index}
              onClick={() => {
                if (!isCenter && Math.abs(dragOffset) < 10) goTo(index);
              }}
              className="absolute transition-all duration-500 ease-out cursor-pointer"
              style={{
                width: `min(${itemWidth}, 88vw)`,
                transform: `translateX(${translateX}%) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                zIndex,
                opacity,
                pointerEvents: isCenter ? 'auto' : 'auto'
              }}
            >
              <div
                className={`w-full rounded-2xl transition-shadow duration-300 ${
                  isCenter
                    ? 'shadow-2xl shadow-primary/10 ring-1 ring-primary/40'
                    : 'hover:opacity-90 shadow-lg'
                }`}
              >
                {renderItem ? renderItem(item, index, isCenter) : null}
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex items-center justify-between px-4 sm:px-8 -mt-6 relative z-30 pointer-events-none">
        <button
          type="button"
          onClick={prev}
          aria-label="Anterior"
          className="pointer-events-auto p-3 rounded-full bg-surface-container-high/80 hover:bg-surface-container-highest border border-outline-variant/60 text-on-surface hover:text-primary transition-all duration-200 shadow-lg backdrop-blur-md hover:scale-105 active:scale-95 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="pointer-events-auto flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container-high/60 backdrop-blur-md border border-outline-variant/30">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Ir al elemento ${i + 1}`}
              className={`transition-all duration-300 rounded-full h-2 cursor-pointer ${
                i === activeIndex
                  ? 'w-6 bg-primary'
                  : 'w-2 bg-outline-variant/60 hover:bg-on-surface-variant'
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={next}
          aria-label="Siguiente"
          className="pointer-events-auto p-3 rounded-full bg-surface-container-high/80 hover:bg-surface-container-highest border border-outline-variant/60 text-on-surface hover:text-primary transition-all duration-200 shadow-lg backdrop-blur-md hover:scale-105 active:scale-95 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
