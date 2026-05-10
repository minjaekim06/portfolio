"use client";
import React, { useId } from "react";
import { motion } from "framer-motion";

// Stroke draws on mount (4s); letters are then filled with a continuously
// flowing gold gradient (animateTransform on a tiled gradient, so the
// highlight is always somewhere on screen).
export const TextHoverEffect = ({ text, duration = 4 }) => {
  const gradId = useId().replace(/:/g, "");
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
        <linearGradient
          id={`gold-${gradId}`}
          gradientUnits="userSpaceOnUse"
          x1="0" y1="0" x2="160" y2="0"
          spreadMethod="repeat"
        >
          <stop offset="0" stopColor="rgba(234,164,75,0.55)" />
          <stop offset="0.45" stopColor="#EAA44B" />
          <stop offset="0.5" stopColor="#FFE4B0" />
          <stop offset="0.55" stopColor="#EAA44B" />
          <stop offset="1" stopColor="rgba(234,164,75,0.55)" />
          <animateTransform
            attributeName="gradientTransform"
            type="translate"
            from="0 0"
            to="160 0"
            dur="3.5s"
            repeatCount="indefinite"
          />
        </linearGradient>
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

      {/* always-flowing gold fill */}
      <text x="2" y="50%" textAnchor="start" dominantBaseline="middle"
        fill={`url(#gold-${gradId})`} className="font-[helvetica] text-7xl font-bold">{text}</text>
    </svg>
  );
};
