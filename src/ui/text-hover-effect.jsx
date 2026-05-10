"use client";
import React, { useId } from "react";
import { motion } from "framer-motion";

// Stroke draws on mount (4s). Letters are filled with a solid ochre base
// and overlaid with horizontal "coursing" stripes (varying opacities of a
// brighter gold), translated vertically with animateTransform so the
// highlight is always moving across the glyphs.
export const TextHoverEffect = ({
  text,
  duration = 4,
  baseColor = "#EAA44B",
  stripeColors = [
    "rgba(255,228,176,1)",
    "rgba(255,228,176,0.9)",
    "rgba(255,228,176,0.8)",
    "rgba(255,228,176,0.7)",
    "rgba(255,228,176,0.6)",
    "rgba(255,228,176,0.5)",
    "rgba(255,228,176,0.4)",
    "rgba(255,228,176,0.3)",
    "rgba(255,228,176,0.2)",
    "rgba(255,228,176,0.1)",
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

      {/* dim base stroke (always there, gives shape) */}
      <text x="2" y="50%" textAnchor="start" dominantBaseline="middle" strokeWidth="0.4"
        className="fill-transparent stroke-neutral-600 font-[helvetica] text-7xl font-bold">{text}</text>

      {/* solid ochre fill — the "blue-600" base in the canvas-text demo */}
      <text x="2" y="50%" textAnchor="start" dominantBaseline="middle"
        fill={baseColor} className="font-[helvetica] text-7xl font-bold">{text}</text>

      {/* coursing brighter-gold stripes on top of the solid base */}
      <text x="2" y="50%" textAnchor="start" dominantBaseline="middle"
        fill={`url(#${patternId})`} className="font-[helvetica] text-7xl font-bold">{text}</text>

      {/* stroke draw on page load — sits on top so the outline reads clearly */}
      <motion.text x="2" y="50%" textAnchor="start" dominantBaseline="middle" strokeWidth="0.4"
        className="fill-transparent stroke-ochre font-[helvetica] text-7xl font-bold"
        initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
        animate={{ strokeDashoffset: 0, strokeDasharray: 1000 }}
        transition={{ duration, ease: "easeInOut" }}>{text}</motion.text>
    </svg>
  );
};
