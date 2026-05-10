"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export const TextHoverEffect = ({ text, duration }) => {
  const svgRef = useRef(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });

  useEffect(() => {
    if (svgRef.current && cursor.x !== null && cursor.y !== null) {
      const r = svgRef.current.getBoundingClientRect();
      setMaskPosition({ cx: `${((cursor.x - r.left) / r.width) * 100}%`, cy: `${((cursor.y - r.top) / r.height) * 100}%` });
    }
  }, [cursor]);

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox="0 0 300 100"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
      className="select-none"
    >
      <defs>
        <linearGradient id="textGradient" gradientUnits="userSpaceOnUse" cx="50%" cy="50%" r="25%">
          {hovered && (
            <>
              <stop offset="0%" stopColor="#1F4FFF" />
              <stop offset="50%" stopColor="#0047AB" />
              <stop offset="100%" stopColor="#1F4FFF" />
            </>
          )}
        </linearGradient>
        <motion.radialGradient
          id="revealMask"
          gradientUnits="userSpaceOnUse"
          r="20%"
          initial={{ cx: "50%", cy: "50%" }}
          animate={maskPosition}
          transition={{ duration: duration ?? 0, ease: "easeOut" }}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>
        <mask id="textMask">
          <rect x="0" y="0" width="100%" height="100%" fill="url(#revealMask)" />
        </mask>
      </defs>
      <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" strokeWidth="0.3"
        className="fill-transparent stroke-neutral-800 font-[helvetica] text-7xl font-bold"
        style={{ opacity: hovered ? 0.7 : 0 }}>{text}</text>
      <motion.text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" strokeWidth="0.3"
        className="fill-transparent stroke-neutral-800 font-[helvetica] text-7xl font-bold"
        initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
        animate={{ strokeDashoffset: 0, strokeDasharray: 1000 }}
        transition={{ duration: 4, ease: "easeInOut" }}>{text}</motion.text>
      <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" stroke="url(#textGradient)" strokeWidth="0.3"
        mask="url(#textMask)" className="fill-transparent font-[helvetica] text-7xl font-bold">{text}</text>
    </svg>
  );
};
