"use client";

import React, { useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MediaItem } from "@/types";
import { X, ChevronLeft, ChevronRight, Maximize2, Sparkles, Tag, Calendar } from "lucide-react";

interface ImageLightboxProps {
  photo: MediaItem | null;
  photos: MediaItem[];
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export function ImageLightbox({ photo, photos, onClose, onNext, onPrev }: ImageLightboxProps) {
  const currentIndex = photo ? photos.findIndex((p) => p.id === photo.id) : -1;

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    },
    [onClose, onNext, onPrev]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [handleKeyDown]);

  if (!photo) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4 sm:p-8"
      onClick={onClose}
    >
      {/* Top Bar Navigation */}
      <div className="absolute top-6 inset-x-6 z-20 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-3 pointer-events-auto">
          <span className="px-3 py-1 rounded-full bg-brand-jet/80 border border-slate-700 text-xs font-mono text-brand-royal">
            {photo.category}
          </span>
          <span className="text-xs font-mono text-slate-400">
            {currentIndex + 1} / {photos.length}
          </span>
        </div>

        <div className="flex items-center gap-3 pointer-events-auto">
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-brand-jet/80 text-white flex items-center justify-center border border-white/20 hover:bg-brand-royal transition-colors"
            data-cursor-text="CLOSE"
            aria-label="Close lightbox"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Previous Button */}
      {photos.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-brand-jet/70 text-white flex items-center justify-center border border-white/20 hover:bg-brand-royal hover:scale-110 transition-all"
          data-cursor-text="PREV"
          aria-label="Previous photo"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {/* Next Button */}
      {photos.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-brand-jet/70 text-white flex items-center justify-center border border-white/20 hover:bg-brand-royal hover:scale-110 transition-all"
          data-cursor-text="NEXT"
          aria-label="Next photo"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* Center Main Stage */}
      <div
        className="relative max-w-6xl max-h-[85vh] w-full flex flex-col lg:flex-row items-center justify-center gap-8 pointer-events-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image Display */}
        <div className="relative max-h-[70vh] sm:max-h-[80vh] w-full lg:w-2/3 aspect-[4/5] sm:aspect-auto flex items-center justify-center overflow-hidden rounded-2xl bg-brand-jet/40 border border-white/10 shadow-2xl">
          <Image
            src={photo.path}
            alt={photo.title}
            width={1200}
            height={1500}
            className="max-h-[75vh] w-auto object-contain rounded-xl select-none"
            priority
          />
        </div>

        {/* Metadata Sidebar */}
        <div className="w-full lg:w-1/3 flex flex-col justify-between p-6 rounded-2xl bg-brand-blackberry/80 border border-brand-hyacinth/20 text-white backdrop-blur-md">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-brand-royal uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5 text-brand-hyacinth" />
              <span>VISUAL ARTWORK</span>
            </div>

            <h2 className="font-display font-bold text-2xl sm:text-3xl tracking-tight text-white mb-2">
              {photo.title}
            </h2>

            {photo.subtitle && (
              <p className="text-xs font-mono text-brand-hyacinth mb-4">
                {photo.subtitle}
              </p>
            )}

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
              {photo.description || "Created with advanced generative pipelines and cinematic lighting."}
            </p>

            {/* Tools if any */}
            {photo.tools && photo.tools.length > 0 && (
              <div className="mb-6">
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-widest block mb-2">
                  TOOLS USED
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {photo.tools.map((tool) => (
                    <span
                      key={tool}
                      className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-200"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
            <span>FILE: {photo.filename}</span>
            <span>SHANMUKH AI</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
