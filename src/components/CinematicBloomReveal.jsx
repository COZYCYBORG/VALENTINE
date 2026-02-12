import React, { useMemo } from "react";
import { motion } from "framer-motion";

function CinematicBloomReveal({ active = true, className = "" }) {
  const bokehDots = useMemo(
    () =>
      Array.from({ length: 14 }, (_, index) => ({
        id: index,
        left: `${6 + ((index * 13) % 88)}%`,
        top: `${8 + ((index * 19) % 80)}%`,
        size: 26 + (index % 5) * 14,
        duration: 5 + (index % 4) * 1.1,
        delay: (index % 6) * 0.2
      })),
    []
  );

  const embers = useMemo(
    () =>
      Array.from({ length: 18 }, (_, index) => ({
        id: index,
        left: `${6 + ((index * 11) % 90)}%`,
        delay: (index % 6) * 0.14,
        duration: 2.6 + (index % 4) * 0.35,
        drift: (index % 2 === 0 ? 1 : -1) * (8 + (index % 5) * 2)
      })),
    []
  );

  if (!active) return null;

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden rounded-[2rem] ${className}`.trim()}
    >
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #ffd8c6 0%, #bc5eff 52%, #1e0638 100%)"
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />

      <motion.div
        className="absolute -bottom-10 -left-16 h-80 w-80 rounded-full"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(255,248,236,0.3), rgba(201,140,104,0.18) 36%, rgba(121,84,62,0.07) 62%, transparent 74%)"
        }}
        initial={{ x: -120, y: 70, opacity: 0 }}
        animate={{ x: 18, y: -20, opacity: 0.85 }}
        transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
      />

      <motion.div
        className="absolute -bottom-12 -right-14 h-80 w-80 rounded-full"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(255,248,236,0.3), rgba(201,140,104,0.18) 36%, rgba(121,84,62,0.07) 62%, transparent 74%)"
        }}
        initial={{ x: 120, y: 70, opacity: 0 }}
        animate={{ x: -18, y: -20, opacity: 0.85 }}
        transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
      />

      <div className="absolute inset-0">
        {bokehDots.map((dot) => (
          <motion.span
            key={dot.id}
            className="absolute rounded-full bg-[#f5d7ba]/30 blur-[2px]"
            style={{
              left: dot.left,
              top: dot.top,
              width: `${dot.size}px`,
              height: `${dot.size}px`
            }}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: [0.08, 0.34, 0.12], scale: [0.9, 1.08, 0.95] }}
            transition={{
              duration: dot.duration,
              delay: dot.delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="absolute inset-x-0 bottom-0">
        {embers.map((ember) => (
          <motion.span
            key={ember.id}
            className="absolute bottom-2 text-[14px] text-[#f6d4b5]/75"
            style={{ left: ember.left, textShadow: "0 0 10px rgba(226,170,129,0.68)" }}
            initial={{ y: 0, x: 0, opacity: 0 }}
            animate={{ y: -170, x: ember.drift, opacity: [0, 0.85, 0] }}
            transition={{
              duration: ember.duration,
              delay: ember.delay,
              repeat: Infinity,
              ease: "easeOut"
            }}
          >
            {"\u2665"}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

export default CinematicBloomReveal;
