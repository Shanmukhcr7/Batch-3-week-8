"use client";

import React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { socialLinks } from "@/config/social";
import { ArrowUp, Sparkles, MapPin, Globe } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-brand-jet text-white border-t border-brand-blackberry overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-royal/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-hyacinth/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-slate-800/80">
          {/* Col 1: Brand & Philosophy */}
          <div className="md:col-span-5 flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-brand-blackberry border border-brand-hyacinth/30 font-display font-bold text-base text-white">
                <span className="bg-gradient-to-r from-brand-royal to-brand-hyacinth bg-clip-text text-transparent">
                  SV
                </span>
              </div>
              <div>
                <h3 className="font-display font-bold text-lg tracking-tight">
                  {siteConfig.name.toUpperCase()}
                </h3>
                <p className="text-xs font-mono text-slate-400">
                  CREATIVE DEVELOPER // AI FILMMAKER
                </p>
              </div>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Exploring the convergence of generative intelligence, cinematic visual storytelling, 3D interactive design, and modern software craft.
            </p>

            <div className="flex items-center gap-2 text-xs font-mono text-brand-hyacinth">
              <Sparkles className="w-4 h-4" />
              <span>Think creatively. Build intelligently. Create beyond imagination.</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-3 flex flex-col gap-4">
            <h4 className="text-xs font-mono tracking-widest text-slate-400 uppercase">
              Explore Portfolio
            </h4>
            <ul className="flex flex-col gap-3">
              {siteConfig.navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-300 hover:text-white transition-colors duration-200 flex items-center gap-1.5 group"
                    data-cursor-text={item.name.toUpperCase()}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-brand-royal transition-colors" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Social & Presence */}
          <div className="md:col-span-4 flex flex-col gap-4">
            <h4 className="text-xs font-mono tracking-widest text-slate-400 uppercase">
              Connect & Follow
            </h4>
            <div className="grid grid-cols-2 gap-2.5">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2.5 rounded-lg bg-brand-blackberry/50 border border-slate-800 hover:border-brand-royal/50 hover:bg-brand-blackberry transition-all duration-200 text-xs text-slate-300 hover:text-white flex items-center justify-between group"
                  data-cursor-text="VISIT"
                >
                  <span className="font-medium">{social.name}</span>
                  <span className="text-slate-500 group-hover:text-brand-royal group-hover:translate-x-0.5 transition-all">
                    ↗
                  </span>
                </a>
              ))}
            </div>

            <div className="mt-2 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-brand-royal" />
                <span>{siteConfig.location}</span>
              </div>
              <div className="flex items-center gap-1.5 font-mono text-[11px] text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Available</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <p>© {new Date().getFullYear()} {siteConfig.name}. Handcrafted with Next.js, Three.js & Tailwind.</p>
          
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors duration-200 group px-3 py-1.5 rounded-full hover:bg-slate-900"
            data-cursor-text="TOP"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-y-1" />
          </button>
        </div>
      </div>
    </footer>
  );
}
