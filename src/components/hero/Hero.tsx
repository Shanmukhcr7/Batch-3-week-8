"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";
import { socialLinks } from "@/config/social";
import { HeroCanvas } from "@/components/three/HeroCanvas";
import { ArrowDown, ArrowUpRight, Sparkles, Film, Code, Eye } from "lucide-react";

export function Hero() {
  const scrollToProjects = () => {
    const el = document.getElementById("featured-projects");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28 pb-16">
      {/* 3D WebGL Canvas Layer */}
      <HeroCanvas />

      {/* Subtle Gradient Overlays for contrast and readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/20 to-white pointer-events-none z-1" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none z-1" />

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center flex flex-col items-center">
        
        {/* Availability Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/90 border border-slate-200 shadow-sm backdrop-blur-md mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-royal opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-royal"></span>
          </span>
          <span className="font-mono text-[11px] font-semibold tracking-widest uppercase text-brand-jet">
            {siteConfig.status}
          </span>
        </motion.div>

        {/* Creator Name Editorial Heading */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-4"
        >
          <h2 className="font-mono text-xs sm:text-sm tracking-[0.3em] uppercase text-brand-subtle mb-3">
            PORTFOLIO OF SHANMUKH VEEREPALLI
          </h2>
          <h1 className="font-display font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-brand-jet leading-[1.05] max-w-5xl">
            CREATING BEYOND <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-brand-royal via-brand-hyacinth to-brand-blackberry bg-clip-text text-transparent">
              IMAGINATION.
            </span>
          </h1>
        </motion.div>

        {/* Subtitle & Role Badges */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-mono text-xs sm:text-sm md:text-base text-slate-700 max-w-2xl mx-auto mb-6 tracking-wide"
        >
          {siteConfig.subheadline}
        </motion.p>

        {/* Short Bio */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto mb-10 leading-relaxed font-normal"
        >
          {siteConfig.shortBio}
        </motion.p>

        {/* Interactive CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-4 mb-14"
        >
          <button
            onClick={scrollToProjects}
            className="group relative inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-brand-jet text-white font-display font-semibold text-sm tracking-wider hover:bg-black transition-all duration-300 shadow-xl shadow-brand-jet/20 hover:scale-105 active:scale-95"
            data-cursor-text="EXPLORE"
          >
            <span>EXPLORE MY WORK</span>
            <ArrowDown className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5" />
          </button>

          <Link
            href="/about"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white/80 border border-slate-300 text-brand-jet font-display font-semibold text-sm tracking-wider hover:bg-white hover:border-brand-royal transition-all duration-300 shadow-sm hover:scale-105"
            data-cursor-text="ABOUT"
          >
            <span>ABOUT ME</span>
            <ArrowUpRight className="w-4 h-4 text-brand-royal" />
          </Link>
        </motion.div>

        {/* Social Links Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex items-center gap-6 text-xs font-mono text-slate-500"
        >
          <span className="hidden sm:inline uppercase tracking-widest text-[11px] text-slate-400">
            CONNECT:
          </span>
          {socialLinks.slice(0, 4).map((s) => (
            <a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand-royal transition-colors font-medium flex items-center gap-1"
              data-cursor-text="OPEN"
            >
              <span>{s.name}</span>
              <span className="text-[10px] text-slate-400">↗</span>
            </a>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="mt-16 flex flex-col items-center gap-2 cursor-pointer"
          onClick={scrollToProjects}
          data-cursor-text="SCROLL"
        >
          <span className="text-[10px] font-mono tracking-[0.25em] text-slate-400 uppercase">
            SCROLL TO DISCOVER
          </span>
          <div className="w-5 h-8 rounded-full border-2 border-slate-300 flex items-start justify-center p-1">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              className="w-1.5 h-1.5 rounded-full bg-brand-royal"
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
