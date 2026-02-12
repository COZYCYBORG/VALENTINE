import React from "react";

const BASE_HEARTS = [
  { left: "8%", top: "18%", size: "text-2xl", delay: "0s", duration: "12s", tone: "text-white/55" },
  { left: "18%", top: "72%", size: "text-3xl", delay: "1.4s", duration: "16s", tone: "text-[#d9d9d9]/55" },
  { left: "32%", top: "40%", size: "text-xl", delay: "0.8s", duration: "13s", tone: "text-[#a6a6a6]/55" },
  { left: "52%", top: "65%", size: "text-2xl", delay: "2.2s", duration: "17s", tone: "text-white/55" },
  { left: "72%", top: "28%", size: "text-3xl", delay: "1.1s", duration: "14s", tone: "text-[#d9d9d9]/55" },
  { left: "86%", top: "78%", size: "text-xl", delay: "2.6s", duration: "16s", tone: "text-[#a6a6a6]/55" },
  { left: "13%", top: "44%", size: "text-xl", delay: "0.6s", duration: "15s", tone: "text-white/55" },
  { left: "27%", top: "84%", size: "text-2xl", delay: "1.9s", duration: "18s", tone: "text-[#d9d9d9]/55" },
  { left: "41%", top: "23%", size: "text-2xl", delay: "1.2s", duration: "14s", tone: "text-[#a6a6a6]/55" },
  { left: "59%", top: "81%", size: "text-xl", delay: "2.4s", duration: "17s", tone: "text-white/55" },
  { left: "77%", top: "52%", size: "text-2xl", delay: "0.9s", duration: "13s", tone: "text-[#d9d9d9]/55" },
  { left: "91%", top: "35%", size: "text-xl", delay: "2.1s", duration: "16s", tone: "text-[#a6a6a6]/55" }
];

const EXTRA_HEARTS = [
  { left: "42%", top: "14%", size: "text-3xl", delay: "0.5s", duration: "18s", tone: "text-white/50" },
  { left: "64%", top: "84%", size: "text-2xl", delay: "1.7s", duration: "19s", tone: "text-[#d9d9d9]/50" },
  { left: "54%", top: "10%", size: "text-2xl", delay: "1.1s", duration: "20s", tone: "text-[#a6a6a6]/50" },
  { left: "84%", top: "88%", size: "text-2xl", delay: "2s", duration: "21s", tone: "text-white/50" }
];

const NEON_WANDER_HEARTS = Array.from({ length: 20 }, (_, index) => ({
  left: `${(index * 37 + 9) % 96}%`,
  top: `${(index * 53 + 17) % 92}%`,
  delay: `${(index % 7) * 0.4}s`,
  duration: `${14 + (index % 6) * 2}s`,
  size:
    index % 4 === 0
      ? "text-base"
      : index % 4 === 1
        ? "text-lg"
        : index % 4 === 2
          ? "text-xl"
          : "text-sm"
}));

const PARTICLES = [
  { left: "6%", top: "30%", delay: "0.2s", duration: "12s", tone: "bg-white/75" },
  { left: "15%", top: "58%", delay: "1.1s", duration: "11s", tone: "bg-[#d9d9d9]/75" },
  { left: "24%", top: "22%", delay: "0.8s", duration: "13s", tone: "bg-[#a6a6a6]/75" },
  { left: "36%", top: "74%", delay: "1.9s", duration: "12s", tone: "bg-white/75" },
  { left: "48%", top: "45%", delay: "0.5s", duration: "14s", tone: "bg-[#d9d9d9]/75" },
  { left: "58%", top: "18%", delay: "1.4s", duration: "11s", tone: "bg-[#a6a6a6]/75" },
  { left: "68%", top: "68%", delay: "2s", duration: "13s", tone: "bg-white/75" },
  { left: "76%", top: "36%", delay: "1.2s", duration: "12s", tone: "bg-[#d9d9d9]/75" },
  { left: "88%", top: "54%", delay: "0.7s", duration: "15s", tone: "bg-[#a6a6a6]/75" },
  { left: "93%", top: "24%", delay: "1.6s", duration: "10s", tone: "bg-white/75" },
  { left: "9%", top: "10%", delay: "0.9s", duration: "12s", tone: "bg-[#d9d9d9]/75" },
  { left: "14%", top: "85%", delay: "2.1s", duration: "13s", tone: "bg-[#a6a6a6]/75" },
  { left: "22%", top: "48%", delay: "1.3s", duration: "11s", tone: "bg-white/75" },
  { left: "33%", top: "62%", delay: "0.4s", duration: "14s", tone: "bg-[#d9d9d9]/75" },
  { left: "44%", top: "17%", delay: "1.7s", duration: "12s", tone: "bg-[#a6a6a6]/75" },
  { left: "53%", top: "84%", delay: "2.3s", duration: "15s", tone: "bg-white/75" },
  { left: "63%", top: "42%", delay: "1.5s", duration: "10s", tone: "bg-[#d9d9d9]/75" },
  { left: "71%", top: "14%", delay: "0.6s", duration: "13s", tone: "bg-[#a6a6a6]/75" },
  { left: "81%", top: "73%", delay: "1.8s", duration: "12s", tone: "bg-white/75" },
  { left: "96%", top: "61%", delay: "1s", duration: "14s", tone: "bg-[#d9d9d9]/75" }
];

const EXTRA_PARTICLES = [
  { left: "28%", top: "86%", delay: "0.9s", duration: "14s", tone: "bg-white/70" },
  { left: "82%", top: "12%", delay: "1.8s", duration: "13s", tone: "bg-[#d9d9d9]/70" },
  { left: "38%", top: "6%", delay: "1.2s", duration: "16s", tone: "bg-[#a6a6a6]/70" },
  { left: "74%", top: "92%", delay: "2.4s", duration: "15s", tone: "bg-white/70" }
];

function AmbientBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[#ff3131]" />

      <div
        className="absolute inset-0 opacity-100"
        style={{
          background:
            "radial-gradient(1200px 600px at 5% -10%, rgba(255,255,255,0.17), transparent 60%), radial-gradient(1000px 520px at 95% 0%, rgba(217,217,217,0.2), transparent 62%), radial-gradient(900px 480px at 50% 120%, rgba(166,166,166,0.22), transparent 65%)"
        }}
      />

      <div
        className="ambient-liquid ambient-liquid-a motion-reduce:animate-none"
        style={{
          background: "linear-gradient(135deg, rgba(140,82,255,0.65), rgba(81,112,255,0.45))"
        }}
      />
      <div
        className="ambient-liquid ambient-liquid-b motion-reduce:animate-none"
        style={{
          background: "linear-gradient(315deg, rgba(140,82,255,0.6), rgba(81,112,255,0.48))"
        }}
      />

      <div className="absolute inset-0">
        {BASE_HEARTS.map((heart, index) => (
          <span
            key={`heart-${index}`}
            className={`ambient-float-heart absolute ${heart.size} ${heart.tone} motion-reduce:animate-none`}
            style={{
              left: heart.left,
              top: heart.top,
              animationDelay: heart.delay,
              animationDuration: heart.duration,
              textShadow: "0 0 14px rgba(255, 255, 255, 0.28)"
            }}
          >
            {"\u2665"}
          </span>
        ))}

        {EXTRA_HEARTS.map((heart, index) => (
          <span
            key={`heart-extra-${index}`}
            className={`ambient-float-heart absolute hidden ${heart.size} ${heart.tone} motion-reduce:animate-none lg:block`}
            style={{
              left: heart.left,
              top: heart.top,
              animationDelay: heart.delay,
              animationDuration: heart.duration,
              textShadow: "0 0 14px rgba(255, 255, 255, 0.25)"
            }}
          >
            {"\u2665"}
          </span>
        ))}

        {NEON_WANDER_HEARTS.map((heart, index) => (
          <span
            key={`neon-heart-${index}`}
            className={`ambient-heart-wander absolute ${heart.size} text-white/75`}
            style={{
              left: heart.left,
              top: heart.top,
              animationDelay: heart.delay,
              animationDuration: heart.duration,
              textShadow:
                "0 0 6px rgba(255,255,255,0.85), 0 0 14px rgba(255,255,255,0.58), 0 0 24px rgba(217,217,217,0.4)"
            }}
          >
            {"\u2665"}
          </span>
        ))}
      </div>

      <div className="absolute inset-0">
        {PARTICLES.map((dot, index) => (
          <span
            key={`dot-${index}`}
            className={`ambient-particle ambient-particle-neon absolute h-[3px] w-[3px] rounded-full ${dot.tone} motion-reduce:animate-none`}
            style={{
              left: dot.left,
              top: dot.top,
              animationDelay: dot.delay,
              animationDuration: dot.duration
            }}
          />
        ))}
        {EXTRA_PARTICLES.map((dot, index) => (
          <span
            key={`dot-extra-${index}`}
            className={`ambient-particle ambient-particle-neon absolute hidden h-[3px] w-[3px] rounded-full ${dot.tone} motion-reduce:animate-none md:block`}
            style={{
              left: dot.left,
              top: dot.top,
              animationDelay: dot.delay,
              animationDuration: dot.duration
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default AmbientBackground;
