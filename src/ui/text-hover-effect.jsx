"use client";
import React, { useId } from "react";
import { motion } from "framer-motion";

// Stroke draws first on mount (over `duration` seconds). After the stroke
// finishes, the letters fade in filled with a pattern of gold horizontal
// "coursing" lines on a transparent background — the gaps between lines
// stay see-through. Pattern is translated vertically with animateTransform
// so the highlight is always moving across the glyphs.
export const TextHoverEffect = ({
  text,
  duration = 4,
  stripeColors = [
    "rgba(255,228,176,1)",
    "rgba(234,164,75,1)",
    "rgba(234,164,75,0.9)",
    "rgba(234,164,75,0.85)",
    "rgba(234,164,75,0.8)",
    "rgba(234,164,75,0.75)",
    "rgba(234,164,75,0.7)",
    "rgba(234,164,75,0.65)",
    "rgba(234,164,75,0.6)",
    "rgba(234,164,75,0.5)",
  ],
  lineGap = 4,
  animationDuration = 20,
}) => {
  const uid = useId().replace(/:/g, "");
  const patternId = `gold-lines-${uid}`;

  const stripeHeight = 1.5;
  const tileHeight = stripeColors.length * lineGap;

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
        <pattern
          id={patternId}
          patternUnits="userSpaceOnUse"
          width="300"
          height={tileHeight}
        >
          {stripeColors.map((color, i) => (
            <rect
              key={i}
              x="0"
              y={i * lineGap}
              width="300"
              height={stripeHeight}
              fill={color}
            />
          ))}
          <animateTransform
            attributeName="patternTransform"
            type="translate"
            from={`0 0`}
            to={`0 ${tileHeight}`}
            dur={`${animationDuration}s`}
            repeatCount="indefinite"
          />
        </pattern>
      </defs>

      {/* dim base stroke (always visible — gives the letters their shape pre-animation) */}
      <text x="2" y="50%" textAnchor="start" dominantBaseline="middle" strokeWidth="0.4"
        className="fill-transparent stroke-neutral-600 font-[helvetica] text-7xl font-bold">{text}</text>

      {/* stroke draws on mount — runs first, brighter ochre tracing the glyphs */}
      <motion.text x="2" y="50%" textAnchor="start" dominantBaseline="middle" strokeWidth="0.4"
        className="fill-transparent stroke-ochre font-[helvetica] text-7xl font-bold"
        initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
        animate={{ strokeDashoffset: 0, strokeDasharray: 1000 }}
        transition={{ duration, ease: "easeInOut" }}>{text}</motion.text>

      {/* coursing gold lines clipped to the glyphs — fades in only after the stroke draw completes */}
      <motion.text x="2" y="50%" textAnchor="start" dominantBaseline="middle"
        fill={`url(#${patternId})`} className="font-[helvetica] text-7xl font-bold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: duration, ease: "easeOut" }}>{text}</motion.text>
    </svg>
  );
};
