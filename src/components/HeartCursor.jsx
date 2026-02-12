import React, { useEffect, useMemo, useRef, useState } from "react";

const MAX_BURSTS = 40;

function HeartCursor() {
  const [enabled, setEnabled] = useState(false);
  const [bursts, setBursts] = useState([]);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });

  const pointerRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);
  const idRef = useRef(0);

  const shouldRender = useMemo(() => enabled, [enabled]);

  useEffect(() => {
    try {
      const finePointer = window.matchMedia("(pointer: fine)");
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

      const updatePointer = () => setEnabled(finePointer.matches);
      const updateReduced = () => setReducedMotion(reduced.matches);

      updatePointer();
      updateReduced();

      finePointer.addEventListener("change", updatePointer);
      reduced.addEventListener("change", updateReduced);

      return () => {
        finePointer.removeEventListener("change", updatePointer);
        reduced.removeEventListener("change", updateReduced);
      };
    } catch {
      setEnabled(false);
      return undefined;
    }
  }, []);

  useEffect(() => {
    if (!shouldRender) return undefined;

    const onMove = (event) => {
      try {
        pointerRef.current = { x: event.clientX, y: event.clientY };
      } catch {
        // Ignore malformed pointer events.
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [shouldRender]);

  useEffect(() => {
    if (!shouldRender) return undefined;

    const animate = () => {
      try {
        setCursor((prev) => {
          const dx = pointerRef.current.x - prev.x;
          const dy = pointerRef.current.y - prev.y;
          return {
            x: prev.x + dx * 0.22,
            y: prev.y + dy * 0.22
          };
        });
        rafRef.current = window.requestAnimationFrame(animate);
      } catch {
        rafRef.current = null;
      }
    };

    rafRef.current = window.requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [shouldRender]);

  useEffect(() => {
    if (!shouldRender) return undefined;

    const onClick = (event) => {
      try {
        const now = Date.now();
        const vectors = [
          { tx: 0, ty: -34, delay: 0 },
          { tx: -26, ty: -22, delay: 0.03 },
          { tx: 26, ty: -22, delay: 0.06 },
          { tx: -18, ty: -6, delay: 0.09 },
          { tx: 18, ty: -6, delay: 0.12 }
        ];
        const burst = {
          id: `${now}-${idRef.current++}`,
          x: event.clientX,
          y: event.clientY,
          bornAt: now,
          hearts: vectors.map((vector, idx) => ({
            id: `${now}-${idx}`,
            tx: vector.tx,
            ty: vector.ty,
            delay: vector.delay
          }))
        };
        setBursts((prev) => {
          const next = [...prev, burst];
          return next.length > MAX_BURSTS ? next.slice(next.length - MAX_BURSTS) : next;
        });
      } catch {
        // Ignore click burst failure to keep app stable.
      }
    };

    window.addEventListener("click", onClick, { passive: true });
    return () => window.removeEventListener("click", onClick);
  }, [shouldRender]);

  useEffect(() => {
    if (!shouldRender) return undefined;

    const timer = window.setInterval(() => {
      const threshold = Date.now() - 900;
      setBursts((prev) => prev.filter((item) => item.bornAt > threshold));
    }, 180);

    return () => window.clearInterval(timer);
  }, [shouldRender]);

  if (!shouldRender) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-[70]">
      <div
        className="heart-cursor"
        style={{
          transform: `translate3d(${cursor.x - 17}px, ${cursor.y - 17}px, 0)`
        }}
      >
        <div className={`heart-cursor-inner ${reducedMotion ? "" : "heart-cursor-slide"}`} />
      </div>

      {bursts.map((burst) =>
        burst.hearts.map((heart) => (
          <span
            key={`${burst.id}-${heart.id}`}
            className={`heart-pop ${reducedMotion ? "" : "heart-pop-animate"}`}
            style={{
              left: `${burst.x}px`,
              top: `${burst.y}px`,
              animationDelay: `${heart.delay}s`,
              ["--tx"]: `${heart.tx}px`,
              ["--ty"]: `${heart.ty}px`
            }}
          >
            {"\u2665"}
          </span>
        ))
      )}
    </div>
  );
}

export default HeartCursor;
