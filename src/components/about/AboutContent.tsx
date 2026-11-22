"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { aboutData } from "@/config/about";
import {
  Sparkles,
  Film,
  Code2,
  Box,
  Cpu,
  GraduationCap,
  Clapperboard,
  Bot,
  Lightbulb,
  Compass,
  ArrowUpRight,
  MapPin,
  CheckCircle2,
} from "lucide-react";

export function AboutContent() {
  const disciplineIcons = [Film, Box, Code2, Bot];
  const initiativeIcons = [Clapperboard, GraduationCap, Cpu, Film];

  return (
    <div className="py-20 min-h-screen bg-brand-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Profile Intro Hero */}
        <section className="mb-24 pt-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-10 p-8 sm:p-12 rounded-3xl bg-brand-surface border border-slate-200/90 shadow-sm">
            {/* Profile Avatar / Photo */}
            <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-3xl overflow-hidden bg-brand-blackberry border-2 border-brand-royal/40 shadow-xl flex-shrink-0">
              <Image
                src={aboutData.profileImage}
                alt={aboutData.name}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-jet/60 to-transparent pointer-events-none" />
            </div>

            {/* Info */}
            <div className="flex flex-col text-center md:text-left">
              <div className="inline-flex items-center justify-center md:justify-start gap-2 text-xs font-mono text-brand-royal uppercase tracking-widest mb-3">
                <Sparkles className="w-3.5 h-3.5 text-brand-hyacinth" />
                <span>ABOUT THE CREATOR</span>
              </div>

              <h1 className="font-display font-extrabold text-3xl sm:text-5xl tracking-tight text-brand-jet mb-2">
                {aboutData.name.toUpperCase()}
              </h1>

              <p className="font-mono text-xs sm:text-sm text-brand-hyacinth font-semibold mb-4">
                {aboutData.title}
              </p>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-xs font-mono text-slate-500 mb-6">
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-200/70 text-slate-700">
                  <MapPin className="w-3 h-3 text-brand-royal" />
                  <span>{aboutData.location}</span>
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-medium flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Open for Collaborations</span>
                </span>
              </div>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                <Link
                  href="/about#contact"
                  className="px-6 py-2.5 rounded-full bg-brand-jet text-white text-xs font-mono font-semibold tracking-wider hover:bg-black transition-all shadow-md"
                  data-cursor-text="CONNECT"
                >
                  START A PROJECT
                </Link>
                <Link
                  href="/videos"
                  className="px-6 py-2.5 rounded-full bg-white border border-slate-300 text-brand-jet text-xs font-mono font-semibold tracking-wider hover:bg-slate-50 transition-all flex items-center gap-1.5"
                  data-cursor-text="WATCH"
                >
                  <span>VIEW SHOWREEL</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-brand-royal" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 1. Introduction Section */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-0.5 bg-brand-royal" />
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-brand-jet tracking-tight">
              {aboutData.introduction.heading.toUpperCase()}
            </h2>
          </div>

          <div className="space-y-4 text-slate-700 text-base sm:text-lg leading-relaxed">
            {aboutData.introduction.paragraphs.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </section>

        {/* 2. My Creative Journey */}
        <section className="mb-20 p-8 sm:p-10 rounded-3xl bg-slate-50 border border-slate-200/80">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-0.5 bg-brand-hyacinth" />
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-brand-jet tracking-tight">
              {aboutData.creativeJourney.heading.toUpperCase()}
            </h2>
          </div>

          <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
            {aboutData.creativeJourney.paragraphs.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </section>

        {/* 3. What I Do */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <span className="w-8 h-0.5 bg-brand-royal" />
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-brand-jet tracking-tight">
              {aboutData.whatIDo.heading.toUpperCase()}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {aboutData.whatIDo.disciplines.map((d, idx) => {
              const Icon = disciplineIcons[idx] || Sparkles;
              return (
                <div
                  key={d.title}
                  className="p-7 rounded-2xl bg-white border border-slate-200 hover:border-brand-royal/40 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-brand-royal/10 text-brand-royal flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5" />
                    </div>

                    <h3 className="font-display font-bold text-lg text-brand-jet mb-4">
                      {d.title}
                    </h3>

                    <ul className="space-y-2.5">
                      {d.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600">
                          <CheckCircle2 className="w-4 h-4 text-brand-royal flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 4. My Projects & Initiatives */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-0.5 bg-brand-hyacinth" />
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-brand-jet tracking-tight">
              {aboutData.initiatives.heading.toUpperCase()}
            </h2>
          </div>
          <p className="text-slate-600 text-sm mb-8">
            {aboutData.initiatives.intro}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {aboutData.initiatives.items.map((item, idx) => {
              const Icon = initiativeIcons[idx] || Sparkles;
              return (
                <div
                  key={item.title}
                  className="p-8 rounded-2xl bg-brand-blackberry text-white border border-brand-hyacinth/30 shadow-xl flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono text-brand-royal tracking-widest uppercase">
                        {item.tagline}
                      </span>
                      <Icon className="w-5 h-5 text-brand-hyacinth" />
                    </div>

                    <h3 className="font-display font-extrabold text-xl text-white mb-2">
                      {item.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-800 flex flex-wrap gap-2">
                    {item.highlights.map((h) => (
                      <span
                        key={h}
                        className="px-2.5 py-1 rounded bg-slate-900 text-[11px] font-mono text-slate-300 border border-slate-800"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 5. Tools & Technologies */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <span className="w-8 h-0.5 bg-brand-royal" />
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-brand-jet tracking-tight">
              {aboutData.toolsAndTechnologies.heading.toUpperCase()}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {aboutData.toolsAndTechnologies.categories.map((cat) => (
              <div
                key={cat.name}
                className="p-6 rounded-2xl bg-brand-surface border border-slate-200"
              >
                <h3 className="font-display font-bold text-base text-brand-jet mb-4 flex items-center justify-between">
                  <span>{cat.name}</span>
                  <span className="text-[10px] font-mono text-slate-400 uppercase">
                    {cat.skills.length} TOOLS
                  </span>
                </h3>

                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-mono text-slate-700 shadow-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Philosophy */}
        <section className="mb-20 p-8 sm:p-12 rounded-3xl bg-brand-jet text-white border border-brand-blackberry shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-royal/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-mono text-brand-hyacinth uppercase tracking-widest mb-4">
              <Lightbulb className="w-4 h-4 text-brand-royal" />
              <span>{aboutData.philosophy.heading}</span>
            </div>

            <blockquote className="font-display font-extrabold text-2xl sm:text-4xl text-white tracking-tight leading-tight mb-6">
              &ldquo;{aboutData.philosophy.quote}&rdquo;
            </blockquote>

            <div className="space-y-3 text-slate-300 text-sm sm:text-base leading-relaxed">
              {aboutData.philosophy.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </section>

        {/* 7. Vision & Motto */}
        <section className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-brand-blackberry to-brand-jet text-white border border-brand-hyacinth/30 shadow-2xl text-center">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-brand-royal uppercase tracking-widest mb-4">
            <Compass className="w-4 h-4 text-brand-hyacinth" />
            <span>{aboutData.vision.heading}</span>
          </div>

          <div className="max-w-2xl mx-auto space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
            {aboutData.vision.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div className="pt-6 border-t border-slate-800/80">
            <span className="font-display font-extrabold text-lg sm:text-2xl tracking-wider uppercase bg-gradient-to-r from-brand-royal via-brand-hyacinth to-white bg-clip-text text-transparent">
              {aboutData.vision.motto}
            </span>
          </div>
        </section>

      </div>
    </div>
  );
}
