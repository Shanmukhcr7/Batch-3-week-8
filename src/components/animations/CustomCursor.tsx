"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hoverText, setHoverText] = useState<string | null>(null);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for trailing outer ring
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleInteractiveOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest("a, button, [role='button'], input, textarea, .interactive-card, [data-cursor]");
      if (interactive) {
        setIsHovered(true);
        const customText = interactive.getAttribute("data-cursor-text");
        setHoverText(customText || null);
      } else {
        setIsHovered(false);
        setHoverText(null);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleInteractiveOver, { passive: true });
    document.body.addEventListener("mouseleave", handleMouseLeave);
    document.body.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleInteractiveOver);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden transition-opacity duration-300">
      {/* Outer Ring / Aura */}
      <motion.div
        className="absolute top-0 left-0 flex items-center justify-center rounded-full border border-brand-royal/60 bg-brand-royal/10 backdrop-blur-[1px]"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isHovered ? (hoverText ? 80 : 54) : 32,
          height: isHovered ? (hoverText ? 80 : 54) : 32,
          borderColor: isHovered ? "rgba(139, 92, 246, 0.9)" : "rgba(59, 130, 246, 0.6)",
          backgroundColor: isHovered ? "rgba(139, 92, 246, 0.15)" : "rgba(59, 130, 246, 0.08)",
        }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
      >
        {hoverText && (
          <span className="text-[10px] font-mono tracking-wider font-semibold text-white uppercase text-center px-1">
            {hoverText}
          </span>
        )}
      </motion.div>

      {/* Center Precision Dot */}
      <motion.div
        className="absolute top-0 left-0 h-1.5 w-1.5 rounded-full bg-brand-royal"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovered ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
      />
    </div>
  );
}
