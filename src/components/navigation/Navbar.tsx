"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/config/site";
import { Menu, X, ArrowUpRight, Sparkles } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "py-3" : "py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav
            className={`relative flex items-center justify-between px-5 py-3 rounded-full transition-all duration-500 ${
              scrolled
                ? "bg-white/80 dark:bg-brand-blackberry/80 backdrop-blur-xl border border-slate-200/80 dark:border-brand-hyacinth/20 shadow-lg shadow-black/5"
                : "bg-white/50 backdrop-blur-md border border-slate-200/40"
            }`}
          >
            {/* Left: Brand Identity */}
            <Link
              href="/"
              className="flex items-center gap-3 group"
              data-cursor-text="HOME"
            >
              <div className="relative flex items-center justify-center w-9 h-9 rounded-full bg-brand-jet text-white font-display font-bold text-sm tracking-wider shadow-md group-hover:scale-105 transition-transform duration-300">
                <span className="bg-gradient-to-r from-brand-royal to-brand-hyacinth bg-clip-text text-transparent">
                  SV
                </span>
                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-brand-royal rounded-full animate-ping" />
                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-brand-royal rounded-full" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-sm sm:text-base tracking-tight text-brand-jet">
                  SHANMUKH VEEREPALLI
                </span>
                <span className="text-[10px] font-mono tracking-widest text-brand-subtle uppercase">
                  AI CREATOR & DEV
                </span>
              </div>
            </Link>

            {/* Center/Right: Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1 bg-slate-100/70 p-1.5 rounded-full border border-slate-200/60">
              {siteConfig.navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative px-4 py-1.5 rounded-full text-xs font-medium tracking-wide transition-colors duration-200 ${
                      isActive
                        ? "text-white"
                        : "text-slate-600 hover:text-brand-jet hover:bg-white/50"
                    }`}
                    data-cursor-text={item.name.toUpperCase()}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 bg-brand-jet rounded-full shadow-sm"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{item.name}</span>
                  </Link>
                );
              })}
            </div>

            {/* Right: Contact CTA */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                href="/about#contact"
                className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium tracking-wider text-white bg-gradient-to-r from-brand-royal to-brand-hyacinth hover:opacity-95 shadow-md shadow-brand-royal/20 transition-all duration-300 hover:shadow-brand-hyacinth/30 hover:scale-[1.02]"
                data-cursor-text="LET'S TALK"
              >
                <span>GET IN TOUCH</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 text-brand-jet focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile Slide-in Fullscreen Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-brand-jet/95 backdrop-blur-2xl flex flex-col justify-between p-8 pt-28 md:hidden"
          >
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-2 text-brand-royal text-xs font-mono tracking-widest uppercase mb-2">
                <Sparkles className="w-4 h-4 text-brand-hyacinth" />
                <span>Navigation</span>
              </div>
              {siteConfig.navigation.map((item, idx) => {
                const isActive = pathname === item.href;
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 * idx }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block font-display text-3xl font-bold tracking-tight transition-colors ${
                        isActive
                          ? "text-transparent bg-clip-text bg-gradient-to-r from-brand-royal to-brand-hyacinth"
                          : "text-slate-300 hover:text-white"
                      }`}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom details in mobile drawer */}
            <div className="border-t border-slate-800 pt-6 flex flex-col gap-4">
              <div className="text-xs font-mono text-slate-400">
                {siteConfig.role}
              </div>
              <Link
                href="/about#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-royal to-brand-hyacinth text-white text-center font-display font-semibold text-sm tracking-wide shadow-lg shadow-brand-royal/20"
              >
                START A CONVERSATION
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
