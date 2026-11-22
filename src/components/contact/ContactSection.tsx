"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";
import { socialLinks } from "@/config/social";
import {
  Mail,
  Copy,
  Check,
  Send,
  Sparkles,
  ArrowUpRight,
  MessageSquare,
} from "lucide-react";

export function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(siteConfig.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Pre-fill mailto link
    const subject = encodeURIComponent(`Portfolio Inquiry from ${formState.name || 'Collaborator'}`);
    const body = encodeURIComponent(`Name: ${formState.name}\nEmail: ${formState.email}\n\nMessage:\n${formState.message}`);
    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section id="contact" className="py-28 bg-brand-blackberry text-white relative overflow-hidden">
      {/* Cinematic ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-brand-royal/15 via-brand-hyacinth/20 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-jet/80 border border-brand-hyacinth/30 text-xs font-mono text-brand-hyacinth uppercase mb-4 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>LET&apos;S COLLABORATE</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl tracking-tight text-white mb-4">
            LET&apos;S CREATE SOMETHING <br />
            <span className="bg-gradient-to-r from-brand-royal via-brand-hyacinth to-white bg-clip-text text-transparent">
              UNFORGETTABLE.
            </span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Have a bold cinematic project, AI commercial vision, or creative technology application in mind? Reach out directly.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Email & Social Presence */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Direct Email Card */}
            <div className="p-8 rounded-3xl bg-brand-jet/80 border border-brand-hyacinth/20 backdrop-blur-xl shadow-2xl flex flex-col gap-5">
              <div className="w-12 h-12 rounded-2xl bg-brand-royal/10 border border-brand-royal/30 flex items-center justify-center text-brand-royal">
                <Mail className="w-6 h-6" />
              </div>

              <div>
                <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">
                  Direct Inquiries
                </span>
                <h3 className="font-display font-bold text-xl sm:text-2xl text-white mt-1 break-all">
                  {siteConfig.email}
                </h3>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={handleCopyEmail}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-brand-royal text-xs font-mono text-white flex items-center gap-2 transition-all hover:bg-slate-800"
                  data-cursor-text="COPY"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-400">COPIED!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-slate-400" />
                      <span>COPY EMAIL</span>
                    </>
                  )}
                </button>

                <a
                  href={`mailto:${siteConfig.email}`}
                  className="px-5 py-2.5 rounded-xl bg-brand-royal hover:bg-blue-600 text-xs font-mono font-semibold text-white flex items-center gap-2 transition-all shadow-lg shadow-brand-royal/30"
                  data-cursor-text="MAIL"
                >
                  <span>COMPOSE MAIL</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Social Grid */}
            <div className="p-8 rounded-3xl bg-brand-jet/80 border border-brand-hyacinth/20 backdrop-blur-xl shadow-2xl flex flex-col gap-4">
              <h4 className="text-xs font-mono tracking-widest text-slate-400 uppercase">
                Social Networks & Channels
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {socialLinks.map((s) => (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-brand-royal/60 hover:bg-slate-900 transition-all text-xs flex items-center justify-between group"
                    data-cursor-text="OPEN"
                  >
                    <div>
                      <div className="font-semibold text-white group-hover:text-brand-royal transition-colors">
                        {s.name}
                      </div>
                      <div className="text-[11px] font-mono text-slate-400 line-clamp-1">
                        {s.handle}
                      </div>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-white transition-colors" />
                  </a>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Quick Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-brand-jet/80 border border-brand-hyacinth/20 backdrop-blur-xl shadow-2xl">
              <div className="flex items-center gap-2.5 text-brand-royal text-xs font-mono tracking-widest uppercase mb-6">
                <MessageSquare className="w-4 h-4" />
                <span>SEND A DIRECT MESSAGE</span>
              </div>

              <form onSubmit={handleFormSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-mono text-slate-300 uppercase tracking-wider">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Elena Vance"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-brand-royal transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-mono text-slate-300 uppercase tracking-wider">
                      Your Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. elena@production.com"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-brand-royal transition-colors"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-mono text-slate-300 uppercase tracking-wider">
                    Project Concept or Inquiry
                  </label>
                  <textarea
                    rows={5}
                    required
                    placeholder="Tell me about your project, timeline, production requirements..."
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-brand-royal transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-2 w-full py-4 rounded-xl bg-gradient-to-r from-brand-royal to-brand-hyacinth text-white font-display font-semibold text-sm tracking-wider uppercase hover:opacity-95 shadow-xl shadow-brand-royal/20 transition-all flex items-center justify-center gap-2 hover:scale-[1.01]"
                  data-cursor-text="SUBMIT"
                >
                  <Send className="w-4 h-4" />
                  <span>TRANSMIT MESSAGE</span>
                </button>

                {submitted && (
                  <p className="text-center font-mono text-xs text-emerald-400 mt-2 animate-pulse">
                    Opening your default email client with your message drafted...
                  </p>
                )}
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
