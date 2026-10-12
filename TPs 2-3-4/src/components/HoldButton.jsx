import React, { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from 'react';

const TAP_MS = 250;
const HIT_PAD = 10;
const LINEAR = (t) => t;
const EASE_OUT = (t) => 1 - Math.pow(1 - t, 3);

const SIZES = {
  sm: 'h-9 px-4 text-xs',
  md: 'h-11 px-6 text-sm',
  lg: 'h-12 px-8 text-base'
};

const STYLE = `
.hb-root { --hb-w: 0px; --hb-h: 0px; --hb-cycles: 2; --hb-p: 0; }
.hb-fill { clip-path: inset(0 calc((1 - var(--hb-p)) * (100% + 0.75 * var(--hb-wave)) - var(--hb-p) * 0.25 * var(--hb-wave)) 0 0); }
.hb-root[data-direction=up] .hb-fill { clip-path: inset(calc((1 - var(--hb-p)) * (100% + 0.75 * var(--hb-wave)) - var(--hb-p) * 0.25 * var(--hb-wave)) 0 0 0); }

.hb-crest {
  -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='200' viewBox='0 0 20 200' preserveAspectRatio='none'%3E%3Cpath d='M0 0H10C18 8 18 25.3 10 33.3S2 58.7 10 66.7S18 92 10 100S2 125.3 10 133.3S18 158.7 10 166.7S2 192 10 200H0Z'/%3E%3C/svg%3E");
  mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='200' viewBox='0 0 20 200' preserveAspectRatio='none'%3E%3Cpath d='M0 0H10C18 8 18 25.3 10 33.3S2 58.7 10 66.7S18 92 10 100S2 125.3 10 133.3S18 158.7 10 166.7S2 192 10 200H0Z'/%3E%3C/svg%3E");
  -webkit-mask-repeat: repeat-y;
  mask-repeat: repeat-y;
  -webkit-mask-size: var(--hb-wave) calc(var(--hb-h) * 2);
  mask-size: var(--hb-wave) calc(var(--hb-h) * 2);
  -webkit-mask-position-x: calc(-1 * var(--hb-wave) + var(--hb-p) * (var(--hb-w) + var(--hb-wave)));
  mask-position-x: calc(-1 * var(--hb-wave) + var(--hb-p) * (var(--hb-w) + var(--hb-wave)));
  -webkit-mask-position-y: calc(-1 * var(--hb-p) * var(--hb-cycles) * var(--hb-h));
  mask-position-y: calc(-1 * var(--hb-p) * var(--hb-cycles) * var(--hb-h));
}

.hb-root[data-direction=up] .hb-crest {
  -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='20' viewBox='0 0 200 20' preserveAspectRatio='none'%3E%3Cpath d='M0 20V10C12 2 38 2 50 10S88 18 100 10S138 2 150 10S188 18 200 10V20Z'/%3E%3C/svg%3E");
  mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='20' viewBox='0 0 200 20' preserveAspectRatio='none'%3E%3Cpath d='M0 20V10C12 2 38 2 50 10S88 18 100 10S138 2 150 10S188 18 200 10V20Z'/%3E%3C/svg%3E");
  -webkit-mask-repeat: repeat-x;
  mask-repeat: repeat-x;
  -webkit-mask-size: calc(var(--hb-w) * 2) var(--hb-wave);
  mask-size: calc(var(--hb-w) * 2) var(--hb-wave);
  -webkit-mask-position-x: calc(-1 * var(--hb-p) * var(--hb-cycles) * var(--hb-w));
  mask-position-x: calc(-1 * var(--hb-p) * var(--hb-cycles) * var(--hb-w));
  -webkit-mask-position-y: calc(var(--hb-h) - var(--hb-p) * (var(--hb-h) + var(--hb-wave)));
  mask-position-y: calc(var(--hb-h) - var(--hb-p) * (var(--hb-h) + var(--hb-wave)));
}

.hb-root[data-phase=holding][data-input=pointer] {
  transform: scale(var(--hb-press));
}

.hb-root[data-glow=true][data-phase=holding],
.hb-root[data-glow=true][data-phase=done] {
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.06), 0 10px 32px -6px color-mix(in srgb, var(--hb-fill) 70%, transparent);
}

.hb-label-idle {
  opacity: 1;
  filter: blur(0px);
  transition: opacity 200ms ease, filter 200ms ease;
}

.hb-root[data-phase=done] .hb-label-idle {
  opacity: 0;
  filter: blur(2px);
}

.hb-label-done {
  opacity: 0;
  filter: blur(2px);
  transition: opacity 200ms ease, filter 200ms ease;
}

.hb-root[data-phase=done] .hb-label-done {
  opacity: 1;
  filter: blur(0px);
}

@keyframes hb-pulse {
  from { opacity: 1; box-shadow: 0 0 0 0 color-mix(in srgb, var(--hb-fill) 55%, transparent); }
  to { opacity: 0; box-shadow: 0 0 0 14px color-mix(in srgb, var(--hb-fill) 0%, transparent); }
}

@media (prefers-reduced-motion: reduce) {
  .hb-root { transform: none !important; transition: background-color 160ms ease, box-shadow var(--hb-release) ease !important; }
  .hb-fill { clip-path: inset(0) !important; opacity: 0; transition: opacity var(--hb-release) ease !important; }
  .hb-crest { display: none; }
  .hb-root[data-phase=holding] .hb-fill, .hb-root[data-phase=done] .hb-fill { opacity: 1; transition: opacity var(--hb-hold) linear !important; }
  .hb-pulse { animation: none !important; }
  .hb-label > span { filter: none !important; transition: opacity 200ms ease !important; }
}
`;

const LABEL_SPAN =
  '[grid-area:1/1] inline-flex items-center justify-center gap-2 whitespace-nowrap';

export default function HoldButton({
  children = 'Mantén para enviar',
  doneLabel = '¡Enviado!',
  icon = null,
  doneIcon = null,
  backgroundColor = '#262a33',
  fillColor = '#adc6ff',
  textColor = '#dfe2ee',
  fillTextColor = '#002e6a',
  size = 'md',
  radius = 12,
  fillDirection = 'right',
  holdTime = 1500,
  releaseTime = 200,
  pressScale = 0.97,
  wave = true,
  waveAmplitude = 6,
  glow = true,
  resetAfter = 2000,
  disabled = false,
  onHold,
  onTap,
  className = ''
}) {
  const [phase, setPhase] = useState('idle');
  const [input, setInput] = useState(null);
  const phaseRef = useRef('idle');
  const inputRef = useRef(null);
  const buttonRef = useRef(null);
  const gesture = useRef({ pointerId: null, start: 0, rect: null });
  const timers = useRef({ complete: 0, reset: 0 });
  const hintId = useId();

  const go = useCallback((next, kind = null) => {
    phaseRef.current = next;
    inputRef.current = kind;
    setPhase(next);
    setInput(kind);
  }, []);

  const clearTimers = useCallback(() => {
    clearTimeout(timers.current.complete);
    clearTimeout(timers.current.reset);
  }, []);

  const motion = useRef({ raf: 0, p: 0, from: 0, to: 0, start: 0 });
  
  const completeRef = useRef(null);

  const drive = useCallback((to, duration, ease) => {
    const m = motion.current;
    cancelAnimationFrame(m.raf);
    m.from = m.p;
    m.to = to;
    m.start = performance.now();
    const step = (now) => {
      const t = duration > 0 ? Math.min(1, (now - m.start) / duration) : 1;
      m.p = m.from + (m.to - m.from) * ease(t);
      buttonRef.current?.style.setProperty('--hb-p', m.p.toFixed(4));
      if (t < 1) {
        m.raf = requestAnimationFrame(step);
        return;
      }
      m.raf = 0;
      if (m.to === 1 && completeRef.current) completeRef.current();
    };
    m.raf = requestAnimationFrame(step);
  }, []);

  const complete = useCallback(async () => {
    if (phaseRef.current !== 'holding') return;
    if (performance.now() - gesture.current.start < holdTime - 50) return;
    clearTimers();
    if (onHold) {
      const result = await onHold();
      if (result === false) {
        go('idle');
        drive(0, releaseTime, EASE_OUT);
        return;
      }
    }
    go('done', inputRef.current);
    if (resetAfter > 0) {
      timers.current.reset = window.setTimeout(() => {
        go('idle');
        drive(0, releaseTime, EASE_OUT);
      }, resetAfter);
    }
  }, [clearTimers, drive, go, holdTime, onHold, releaseTime, resetAfter]);

  useEffect(() => {
    completeRef.current = complete;
  }, [complete]);

  const begin = useCallback((kind) => {
    if (disabled || phaseRef.current !== 'idle') return false;
    const button = buttonRef.current;
    if (!button) return false;
    gesture.current.start = performance.now();
    gesture.current.rect = button.getBoundingClientRect();
    go('holding', kind);
    drive(1, holdTime, LINEAR);
    timers.current.complete = window.setTimeout(() => {
      if (completeRef.current) completeRef.current();
    }, holdTime + 100);
    return true;
  }, [disabled, drive, go, holdTime]);

  const release = useCallback(({ drifted = false } = {}) => {
    if (phaseRef.current !== 'holding') return;
    clearTimers();
    const held = performance.now() - gesture.current.start;
    go('idle');
    drive(0, releaseTime, EASE_OUT);
    if (!drifted && held < TAP_MS && onTap) onTap();
  }, [clearTimers, drive, go, onTap, releaseTime]);

  const releaseRef = useRef(release);
  useEffect(() => {
    releaseRef.current = release;
  }, [release]);

  const handlePointerDown = (e) => {
    if (e.button !== 0 || !e.isPrimary || gesture.current.pointerId !== null) return;
    if (!begin('pointer')) return;
    gesture.current.pointerId = e.pointerId;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}
  };

  const endPointer = (e, options) => {
    if (e.pointerId !== gesture.current.pointerId) return;
    gesture.current.pointerId = null;
    try {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}
    release(options);
  };

  const handlePointerMove = (e) => {
    if (e.pointerId !== gesture.current.pointerId) return;
    const r = gesture.current.rect;
    if (!r) return;
    const out =
      e.clientX < r.left - HIT_PAD ||
      e.clientX > r.right + HIT_PAD ||
      e.clientY < r.top - HIT_PAD ||
      e.clientY > r.bottom + HIT_PAD;
    if (out) endPointer(e, { drifted: true });
  };

  const handlePointerLeave = (e) => {
    if (e.pointerType !== 'touch') endPointer(e, { drifted: true });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      if (inputRef.current === 'key') release({ drifted: true });
      return;
    }
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      if (!e.repeat) begin('key');
    }
  };

  const handleKeyUp = (e) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      if (inputRef.current === 'key') release();
    }
  };

  useLayoutEffect(() => {
    const button = buttonRef.current;
    if (!button) return undefined;
    const measure = () => {
      button.style.setProperty('--hb-w', `${button.offsetWidth}px`);
      button.style.setProperty('--hb-h', `${button.offsetHeight}px`);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(button);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (phase !== 'holding') return undefined;
    const cancel = () => releaseRef.current({ drifted: true });
    const onVisibility = () => {
      if (document.hidden) cancel();
    };
    window.addEventListener('blur', cancel);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      window.removeEventListener('blur', cancel);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [phase]);

  useEffect(() => {
    const t = timers.current;
    const m = motion.current;
    return () => {
      clearTimeout(t.complete);
      clearTimeout(t.reset);
      cancelAnimationFrame(m.raf);
    };
  }, []);

  const direction = fillDirection === 'up' ? 'up' : 'right';
  const labels = (
    <>
      <span
        className={`${LABEL_SPAN} hb-label-idle`}
        aria-hidden={phase === 'done'}
      >
        {icon ? <span className="inline-flex flex-none [&>svg]:block">{icon}</span> : null}
        {children}
      </span>
      <span
        className={`${LABEL_SPAN} hb-label-done`}
        aria-hidden={phase !== 'done'}
      >
        {doneIcon ? <span className="inline-flex flex-none [&>svg]:block">{doneIcon}</span> : null}
        {doneLabel}
      </span>
    </>
  );

  const cssVars = {
    '--hb-radius': typeof radius === 'number' ? `${radius}px` : radius,
    '--hb-bg': backgroundColor,
    '--hb-fill': fillColor,
    '--hb-text': textColor,
    '--hb-fill-text': fillTextColor,
    '--hb-hold': `${holdTime}ms`,
    '--hb-cycles': holdTime / 1100,
    '--hb-release': `${releaseTime}ms`,
    '--hb-press': pressScale,
    '--hb-wave': `${wave ? waveAmplitude : 0}px`,
    '--hb-ease-out': 'cubic-bezier(0.23, 1, 0.32, 1)'
  };

  return (
    <button
      ref={buttonRef}
      type="button"
      disabled={disabled}
      className={`hb-root group relative isolate m-0 inline-grid cursor-pointer touch-manipulation select-none place-items-center border-0 font-medium leading-none tracking-[0.01em] outline-none [-webkit-tap-highlight-color:transparent] [-webkit-touch-callout:none] [background:var(--hb-bg)] [border-radius:var(--hb-radius)] [color:var(--hb-text)] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] [transition:transform_160ms_var(--hb-ease-out),background-color_160ms_ease,box-shadow_var(--hb-release)_var(--hb-ease-out)] [@media(hover:hover)_and_(pointer:fine)]:enabled:hover:[background:color-mix(in_srgb,var(--hb-bg)_92%,#fff)] focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface-container-low disabled:pointer-events-none disabled:cursor-default disabled:opacity-50 contrast-more:[outline:1px_solid_var(--hb-text)] ${SIZES[size] || SIZES.md}${className ? ` ${className}` : ''}`}
      data-phase={phase}
      data-input={input ?? undefined}
      data-direction={direction}
      data-glow={glow ? 'true' : undefined}
      aria-describedby={hintId}
      style={cssVars}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={(e) => endPointer(e)}
      onPointerCancel={(e) => endPointer(e, { drifted: true })}
      onLostPointerCapture={(e) => endPointer(e, { drifted: true })}
      onPointerLeave={handlePointerLeave}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      onContextMenu={(e) => e.preventDefault()}
    >
      <style>{STYLE}</style>
      <span
        className="hb-pulse pointer-events-none absolute inset-0 z-0 opacity-0 [border-radius:var(--hb-radius)] group-data-[glow=true]:group-data-[phase=done]:[animation:hb-pulse_600ms_var(--hb-ease-out)_forwards]"
        aria-hidden="true"
      />
      <span className="hb-label relative z-[2] grid place-items-center">{labels}</span>
      <span
        className="pointer-events-none absolute inset-0 z-[3] [clip-path:inset(0_round_var(--hb-radius))]"
        aria-hidden="true"
      >
        <span className="hb-fill absolute inset-0 grid place-items-center [background:var(--hb-fill)] [color:var(--hb-fill-text)]">
          <span className="hb-label grid place-items-center">{labels}</span>
        </span>
        <span className="hb-crest absolute inset-0 grid place-items-center [background:var(--hb-fill)] [color:var(--hb-fill-text)]">
          <span className="hb-label grid place-items-center">{labels}</span>
        </span>
      </span>
      <span id={hintId} className="absolute h-px w-px overflow-hidden whitespace-nowrap [clip-path:inset(50%)]">
        Mantén presionado {Math.round(holdTime / 100) / 10} segundos para confirmar
      </span>
    </button>
  );
}
