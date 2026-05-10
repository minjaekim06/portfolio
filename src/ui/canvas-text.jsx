"use client";
import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

// Lightweight CanvasText: a text element with a softly animated colored backdrop made
// of horizontal lines. Mirrors the API used by components/text_shader.txt.
export const CanvasText = ({
  text,
  colors = ["rgba(234,164,75,1)", "rgba(234,164,75,0.4)"],
  backgroundClassName = "",
  lineGap = 4,
  animationDuration = 20,
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    let raf;
    const resize = () => {
      const r = c.getBoundingClientRect();
      c.width = r.width * devicePixelRatio;
      c.height = r.height * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);
    };
    resize();
    let t0 = performance.now();
    const draw = (t) => {
      const r = c.getBoundingClientRect();
      ctx.clearRect(0, 0, r.width, r.height);
      const elapsed = ((t - t0) / 1000) % animationDuration;
      const phase = elapsed / animationDuration;
      for (let y = 0; y < r.height; y += lineGap) {
        const idx = Math.floor((y / r.height + phase) * colors.length) % colors.length;
        ctx.fillStyle = colors[(idx + colors.length) % colors.length];
        ctx.fillRect(0, y, r.width, 1.5);
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    const onResize = () => resize();
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, [colors, lineGap, animationDuration]);

  return (
    <span className="relative inline-block px-2 align-baseline">
      <span className={cn("absolute inset-0 -z-10 rounded-md", backgroundClassName)}>
        <canvas ref={canvasRef} className="w-full h-full rounded-md opacity-90" />
      </span>
      <span className="relative" style={{ color: "rgba(255,255,255,0.96)" }}>{text}</span>
    </span>
  );
};
