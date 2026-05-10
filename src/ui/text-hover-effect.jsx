"use client";
import React, { useId, useMemo } from "react";
import { motion } from "framer-motion";

// Stroke draws first on mount. After it finishes, a "stream" of curvy gold
// sine-wave lines fades in, clipped to the letter glyphs. Lines are non-
// uniform: random amplitudes/periods/phases/widths, clustered toward the
// vertical centre of the text (Gaussian-ish falloff at top/bottom edges)
// and individually translating so the stream is always flowing.

const TEXT_CLASS = "font-[helvetica] text-7xl font-bold";
const TEXT_X = 2;
const TEXT_Y = "50%";

// Build a polyline approximating a sine wave wider than the viewBox so
// horizontal translate animations can loop without showing the edges.
function wavePath(cy, amp, period, phase, samples = 80) {
  const startX = -150;
  const endX = 450;
  const width = endX - startX;
  let d = "";
  for (let i = 0; i <= samples; i++) {
    const x = startX + (i / samples) * width;
    const y = cy + Math.sin((x / period + phase) * Math.PI * 2) * amp;
    d += (i === 0 ? "M" : "L") + x.toFixed(2) + " " + y.toFixed(2) + " ";
  }
  return d;
}

// Concentrate lines near the vertical centre with a soft falloff toward
// the top/bottom of the glyph band. `t` in [-0.5, 0.5].
function clusteredYOffset(t, maxOffset) {
  return Math.sign(t) * Math.pow(Math.abs(t * 2), 1.6) * maxOffset;
}

// Mulberry32 — tiny seeded PRNG so the generated stream is stable across
// renders for the same `text` (otherwise React StrictMode / re-renders
// would visibly reshuffle the lines).
function rng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6D2B79F5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hashString(s) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export const TextHoverEffect = ({
  text,
  duration = 4,
  lineCount = 34,
  centreSpread = 14,   // viewBox-units half-height of the line cluster (centred at 50)
}) => {
  const uid = useId().replace(/:/g, "");
  const clipId = `text-clip-${uid}`;

  const lines = useMemo(() => {
    const rand = rng(hashString(text) || 1);
    const out = [];
    for (let i = 0; i < lineCount; i++) {
      const t = i / (lineCount - 1) - 0.5;            // -0.5 .. 0.5
      const jitter = (rand() - 0.5) * 1.6;            // small noise so rows aren't lined up
      const y = 50 + clusteredYOffset(t, centreSpread) + jitter;
      const amp = 0.6 + rand() * 3.0;                 // wave amplitude
      const period = 28 + rand() * 70;                // wavelength
      const phase = rand();
      const strokeWidth = 0.32 + rand() * 0.85;
      const dur = 5 + rand() * 9;                     // translate duration
      const dir = rand() > 0.5 ? 1 : -1;
      const isHighlight = rand() < 0.18;
      const opacity = 0.45 + rand() * 0.55;
      const color = isHighlight
        ? `rgba(255,228,176,${(0.75 + rand() * 0.25).toFixed(2)})`
        : `rgba(234,164,75,${opacity.toFixed(2)})`;
      out.push({ id: i, y, amp, period, phase, strokeWidth, dur, dir, color });
    }
    return out;
  }, [text, lineCount, centreSpread]);

  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 300 100"
      preserveAspectRatio="xMinYMid meet"
      xmlns="http://www.w3.org/2000/svg"
      className="select-none"
    >
      <defs>
        <clipPath id={clipId}>
          <text x={TEXT_X} y={TEXT_Y} textAnchor="start" dominantBaseline="middle"
            className={TEXT_CLASS}>{text}</text>
        </clipPath>
      </defs>

      {/* dim base stroke (always there — gives shape pre-animation) */}
      <text x={TEXT_X} y={TEXT_Y} textAnchor="start" dominantBaseline="middle" strokeWidth="0.4"
        className={`fill-transparent stroke-neutral-600 ${TEXT_CLASS}`}>{text}</text>

      {/* stroke draws on mount — runs first, brighter ochre tracing the glyphs */}
      <motion.text x={TEXT_X} y={TEXT_Y} textAnchor="start" dominantBaseline="middle" strokeWidth="0.4"
        className={`fill-transparent stroke-ochre ${TEXT_CLASS}`}
        initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
        animate={{ strokeDashoffset: 0, strokeDasharray: 1000 }}
        transition={{ duration, ease: "easeInOut" }}>{text}</motion.text>

      {/* curvy gold stream — clipped to the glyphs, fades in after the stroke */}
      <motion.g
        clipPath={`url(#${clipId})`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: duration, ease: "easeOut" }}
      >
        {lines.map((ln) => (
          <path
            key={ln.id}
            d={wavePath(ln.y, ln.amp, ln.period, ln.phase)}
            stroke={ln.color}
            strokeWidth={ln.strokeWidth}
            fill="none"
            strokeLinecap="round"
          >
            <animateTransform
              attributeName="transform"
              type="translate"
              from={`0 0`}
              to={`${ln.dir * ln.period} 0`}
              dur={`${ln.dur}s`}
              repeatCount="indefinite"
            />
          </path>
        ))}
      </motion.g>
    </svg>
  );
};
