"use client";

import React from "react";
import { motion } from "framer-motion";
import { creativeExpertise } from "@/config/projects";
import {
  Cpu,
  Film,
  Clapperboard,
  Box,
  Code2,
  Sparkles,
  Wand2,
  Bot,
  LucideIcon,
  ArrowRight,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Cpu,
  Film,
  Clapperboard,
  Box,
  Code2,
  Sparkles,
  Wand2,
  Bot,
};

export function CreativeExpertise() {
  return (
    <section className="py-28 bg-brand-surface relative border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-brand-royal uppercase mb-3">
            <Sparkles className="w-4 h-4 text-brand-hyacinth" />
            <span>CORE CAPABILITIES & MASTERY</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl tracking-tight text-brand-jet">
            CREATIVE EXPERTISE.
          </h2>
          <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed">
            Bridging the gap between cutting-edge computational intelligence, generative filmmaking pipelines, and tactile human-centric design.
          </p>
        </div>

        {/* 8 Expertise Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {creativeExpertise.map((item, idx) => {
            const Icon = iconMap[item.iconName] || Sparkles;
            const indexString = `0${idx + 1}`.slice(-2);

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.07 }}
                className="group relative p-7 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-brand-royal/40 transition-all duration-300 flex flex-col justify-between"
                data-cursor-text="SKILL"
              >
                {/* Subtle top accent gradient line on hover */}
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-brand-royal to-brand-hyacinth rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div>
                  {/* Top row: Icon and Index number */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-brand-royal group-hover:bg-brand-royal group-hover:text-white transition-colors duration-300 shadow-sm">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-mono text-xs font-bold text-slate-400 group-hover:text-brand-hyacinth transition-colors">
                      // {indexString}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="font-display font-bold text-xl text-brand-jet group-hover:text-brand-royal transition-colors mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs font-mono text-brand-hyacinth font-medium mb-3">
                    {item.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                {/* Tags */}
                <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-1.5">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded bg-slate-100 text-[10px] font-mono text-slate-600 group-hover:bg-brand-royal/10 group-hover:text-brand-royal transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
