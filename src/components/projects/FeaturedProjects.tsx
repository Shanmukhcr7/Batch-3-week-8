"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { featuredProjects } from "@/config/projects";
import { ProjectItem } from "@/types";
import { Play, Sparkles, ArrowUpRight, X, Layers, Cpu } from "lucide-react";

export function FeaturedProjects() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);

  const categories = ["All", "AI Filmmaking", "AI Commercial", "Software Development", "3D & Creative Tech"];

  const filtered = selectedCategory === "All"
    ? featuredProjects
    : featuredProjects.filter((p) => p.category === selectedCategory);

  return (
    <section id="featured-projects" className="py-28 bg-brand-white relative overflow-hidden">
      {/* Subtle background ambient line art */}
      <div className="absolute inset-0 bg-[radial-gradient(#3B82F6_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.12] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-slate-200 pb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-brand-royal uppercase mb-3">
              <Sparkles className="w-4 h-4 text-brand-hyacinth" />
              <span>SELECTED PRODUCTIONS // 2024–2025</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl tracking-tight text-brand-jet">
              FEATURED PROJECTS.
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all duration-200 ${
                  selectedCategory === cat
                    ? "bg-brand-jet text-white shadow-md shadow-brand-jet/20"
                    : "bg-slate-100 text-slate-600 hover:text-brand-jet hover:bg-slate-200"
                }`}
                data-cursor-text="FILTER"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Editorial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {filtered.map((project, idx) => {
            // Asymmetrical grid spans: alternate wide and standard
            const isWide = idx === 0 || idx === 3;
            const colSpan = isWide ? "md:col-span-12 lg:col-span-7" : "md:col-span-12 lg:col-span-5";

            return (
              <ProjectCard
                key={project.id}
                project={project}
                colSpan={colSpan}
                onSelect={() => setActiveProject(project)}
              />
            );
          })}
        </div>

        {/* Direct Link to Galleries */}
        <div className="mt-16 text-center flex flex-wrap items-center justify-center gap-6">
          <Link
            href="/photos"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-brand-royal hover:text-brand-hyacinth transition-colors group"
            data-cursor-text="PHOTOS"
          >
            <span>EXPLORE PHOTO & VISUAL ART GALLERY</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          <span className="text-slate-300 hidden sm:inline">•</span>
          <Link
            href="/videos"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-brand-royal hover:text-brand-hyacinth transition-colors group"
            data-cursor-text="VIDEOS"
          >
            <span>WATCH ALL CINEMATIC COMMERCIALS & SHORTS</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>

      {/* Interactive Project Modal */}
      <AnimatePresence>
        {activeProject && (
          <ProjectModal
            project={activeProject}
            onClose={() => setActiveProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

// 3D Tilt Interactive Project Card
interface ProjectCardProps {
  project: ProjectItem;
  colSpan: string;
  onSelect: () => void;
}

function ProjectCard({ project, colSpan, onSelect }: ProjectCardProps) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -6; // max 6 deg
    const rotY = ((x - centerX) / centerX) * 6;

    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`${colSpan} group cursor-pointer`}
      onClick={onSelect}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-cursor-text="VIEW"
    >
      <div
        className="relative bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm transition-all duration-300 group-hover:shadow-2xl group-hover:border-brand-royal/40"
        style={{
          transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transition: "transform 0.15s ease-out, box-shadow 0.3s ease, border-color 0.3s ease",
        }}
      >
        {/* Media Container */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-brand-blackberry">
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 700px"
          />

          {/* Cinematic vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-jet/90 via-brand-jet/30 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300" />

          {/* Category & Year Badges */}
          <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
            <span className="px-3 py-1 rounded-full bg-brand-jet/80 backdrop-blur-md text-[11px] font-mono tracking-wider text-brand-royal border border-white/10">
              {project.category}
            </span>
            <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-mono text-slate-300">
              {project.year}
            </span>
          </div>

          {/* Quick Play indicator if video preview available */}
          {project.videoPreview && (
            <div className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-brand-royal group-hover:scale-110 transition-all duration-300">
              <Play className="w-3.5 h-3.5 fill-white" />
            </div>
          )}

          {/* Bottom Card Title Overlay */}
          <div className="absolute bottom-4 left-4 right-4 z-10">
            <h3 className="font-display font-extrabold text-xl sm:text-2xl text-white tracking-tight group-hover:text-brand-royal transition-colors duration-300">
              {project.title}
            </h3>
            <p className="text-xs font-mono text-slate-300 tracking-wide mt-1 line-clamp-1">
              {project.subtitle}
            </p>
          </div>
        </div>

        {/* Card Body & Metadata */}
        <div className="p-6 bg-white flex flex-col justify-between gap-4">
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-2">
            {project.description}
          </p>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
            {/* Tool tags */}
            <div className="flex flex-wrap gap-1.5">
              {project.tools.slice(0, 3).map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-0.5 rounded-md bg-slate-100 text-[11px] font-mono text-slate-600"
                >
                  {t}
                </span>
              ))}
              {project.tools.length > 3 && (
                <span className="text-[10px] font-mono text-slate-400 self-center">
                  +{project.tools.length - 3} more
                </span>
              )}
            </div>

            {/* Interaction Button */}
            <span className="inline-flex items-center gap-1 text-xs font-mono font-bold tracking-wider text-brand-jet group-hover:text-brand-royal transition-colors">
              <span>EXPLORE</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Project Detail Modal with Live Video / High-Res Image
function ProjectModal({ project, onClose }: { project: ProjectItem; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/85 backdrop-blur-xl overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        className="relative w-full max-w-4xl bg-brand-blackberry text-white rounded-3xl overflow-hidden border border-brand-hyacinth/30 shadow-2xl my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-brand-jet/80 text-white flex items-center justify-center hover:bg-brand-royal transition-colors border border-white/20"
          data-cursor-text="CLOSE"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Video or Image Feature Area */}
        <div className="relative aspect-[16/9] w-full bg-brand-jet">
          {project.videoPreview ? (
            <video
              src={project.videoPreview}
              controls
              autoPlay
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              className="object-cover"
            />
          )}
        </div>

        {/* Modal Info Content */}
        <div className="p-6 sm:p-8 md:p-10 flex flex-col gap-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3.5 py-1 rounded-full bg-brand-royal/20 border border-brand-royal/40 text-brand-royal font-mono text-xs tracking-wider">
              {project.category}
            </span>
            <span className="text-xs font-mono text-slate-400">
              YEAR: {project.year}
            </span>
          </div>

          <div>
            <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-white tracking-tight">
              {project.title}
            </h2>
            <p className="text-sm sm:text-base font-mono text-brand-hyacinth mt-1">
              {project.subtitle}
            </p>
          </div>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            {project.description}
          </p>

          {/* Key Metrics / Attributes */}
          {project.metrics && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-brand-jet/70 border border-slate-800">
              {project.metrics.map((m) => (
                <div key={m.label} className="flex flex-col">
                  <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">
                    {m.label}
                  </span>
                  <span className="font-display font-bold text-sm sm:text-base text-white">
                    {m.value}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Tools Used */}
          <div>
            <h4 className="text-xs font-mono tracking-widest text-slate-400 uppercase mb-3">
              TECHNOLOGIES & PIPELINES USED
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tools.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-200"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
