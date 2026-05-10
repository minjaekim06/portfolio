"use client";
import React, { useId } from "react";
import { motion } from "framer-motion";

// Stroke draws on mount (4s), then a pattern of horizontal "coursing" gold
// lines flows continuously through the letter shapes. Lines vary in opacity
// (mirrors the CanvasText API: colors[]/lineGap/animationDuration) and the
// pattern is translated vertically with animateTransform so the highlight
// is always moving across the glyphs.
export const TextHoverEffect = ({
  text,
  duration = 4,
  colors = [
    "rgba(234,164,75,1)",
    "rgba(234,164,75,0.9)",
    "rgba(234,164,75,0.75)",
    "rgba(255,228,176,0.95)",
    "rgba(234,164,75,0.6)",
    "rgba(234,164,75,0.45)",
    "rgba(234,164,75,0.3)",
    "rgba(234,164,75,0.18)",
  ],
  lineGap = 4,
  animationDuration = 6,
}) => {
  const uid = useId().replace(/:/g, "");
  const patternId = `gold-lines-${uid}`;

  const bandHeight = 1.5;
  const tileHeight = colors.length * lineGap;

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
          {colors.map((color, i) => (
            <rect
              key={i}
              x="0"
              y={i * lineGap}
              width="300"
              height={bandHeight}
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

      {/* dim base stroke (always there, gives shape) */}
      <text x="2" y="50%" textAnchor="start" dominantBaseline="middle" strokeWidth="0.4"
        className="fill-transparent stroke-neutral-600 font-[helvetica] text-7xl font-bold">{text}</text>

      {/* stroke draw on page load */}
      <motion.text x="2" y="50%" textAnchor="start" dominantBaseline="middle" strokeWidth="0.4"
        className="fill-transparent stroke-ochre font-[helvetica] text-7xl font-bold"
        initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
        animate={{ strokeDashoffset: 0, strokeDasharray: 1000 }}
        transition={{ duration, ease: "easeInOut" }}>{text}</motion.text>

      {/* coursing gold lines as text fill */}
      <text x="2" y="50%" textAnchor="start" dominantBaseline="middle"
        fill={`url(#${patternId})`} className="font-[helvetica] text-7xl font-bold">{text}</text>
    </svg>
  );
};
