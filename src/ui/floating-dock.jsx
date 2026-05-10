"use client";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import React, { useRef, useState } from "react";

export const FloatingDock = ({ items, className }) => {
  return <FloatingDockDesktop items={items} className={className} />;
};

const FloatingDockDesktop = ({ items, className }) => {
  const mouseX = useMotionValue(Infinity);
  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "fixed bottom-6 left-1/2 -translate-x-1/2 z-[1000] mx-auto flex h-16 items-end gap-3 rounded-full px-4 pb-3 pt-2",
        "bg-white/5 dark:bg-black/40 border border-white/10 backdrop-blur-xl",
        "shadow-[0_10px_40px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.08)]",
        className
      )}
    >
      {items.map((item, i) => (
        <IconContainer mouseX={mouseX} key={item.title + i} {...item} />
      ))}
    </motion.div>
  );
};

function IconContainer({ mouseX, title, icon, href, to, accentActive }) {
  const ref = useRef(null);
  const location = useLocation();
  const active = to && location.pathname === to;

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const heightSync = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const widthIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20]);
  const heightIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20]);

  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });
  const height = useSpring(heightSync, { mass: 0.1, stiffness: 150, damping: 12 });
  const wi = useSpring(widthIcon, { mass: 0.1, stiffness: 150, damping: 12 });
  const hi = useSpring(heightIcon, { mass: 0.1, stiffness: 150, damping: 12 });

  const [hovered, setHovered] = useState(false);

  const inner = (
    <motion.div
      ref={ref}
      style={{ width, height }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "aspect-square rounded-full flex items-center justify-center relative",
        "bg-white/5 hover:bg-white/10 transition-colors",
        active && "bg-cobalt/20 ring-1 ring-cobalt-bright/60 shadow-[0_0_18px_rgba(31,79,255,0.45)]"
      )}
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 2, x: "-50%" }}
            className="px-2 py-0.5 whitespace-pre rounded-md bg-black/85 text-white text-xs absolute left-1/2 -top-8 font-mono tracking-wide pointer-events-none"
          >
            {title}
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        style={{ width: wi, height: hi }}
        className={cn(
          "flex items-center justify-center text-neutral-300",
          active && "text-cobalt-bright"
        )}
      >
        {icon}
      </motion.div>
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noreferrer" aria-label={title}>{inner}</a>
    );
  }
  if (to) return <Link to={to} aria-label={title}>{inner}</Link>;
  return <button aria-label={title} onClick={accentActive}>{inner}</button>;
}
