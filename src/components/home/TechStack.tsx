"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { techStackData } from "@/config/projects";
import { Sparkles, Terminal, Code, Cpu } from "lucide-react";

export function TechStack() {
  const [activeTab, setActiveTab] = useState<string>("All");

  const categories = ["All", "Development", "AI & Generative Tech", "Creative Production", "Tools"];

  const filtered = activeTab === "All"
    ? techStackData
    : techStackData.filter((item) => item.category === activeTab);

  return (
    <section className="py-28 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-brand-royal uppercase mb-3">
              <Terminal className="w-4 h-4 text-brand-hyacinth" />
              <span>STACK // TOOLS // FRAMEWORKS</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl tracking-tight text-brand-jet">
              TECHNOLOGY STACK.
            </h2>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all duration-200 ${
                  activeTab === cat
                    ? "bg-brand-jet text-white shadow-md shadow-brand-jet/20"
                    : "bg-slate-100 text-slate-600 hover:text-brand-jet hover:bg-slate-200"
                }`}
                data-cursor-text="TAB"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Tech Stack Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((item, idx) => (
            <motion.div
              layout
              key={item.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: idx * 0.03 }}
              className="p-5 rounded-2xl bg-brand-surface border border-slate-200 hover:border-brand-royal/40 hover:bg-white hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-display font-bold text-base text-brand-jet group-hover:text-brand-royal transition-colors">
                    {item.name}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-200 text-slate-700">
                    {item.category}
                  </span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">
                  {item.description}
                </p>
              </div>

              {/* Visual meter */}
              <div className="pt-3 border-t border-slate-200/60">
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1.5">
                  <span>Proficiency</span>
                  <span className="text-brand-royal font-semibold">{item.proficiency}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-200 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.proficiency}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="h-full rounded-full bg-gradient-to-r from-brand-royal to-brand-hyacinth"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
