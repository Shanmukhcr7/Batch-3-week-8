"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MediaItem } from "@/types";
import { ImageLightbox } from "./ImageLightbox";
import { Sparkles, Maximize2, Camera, Layers } from "lucide-react";

interface PhotoGalleryProps {
  initialPhotos: MediaItem[];
  categories: string[];
}

export function PhotoGallery({ initialPhotos, categories }: PhotoGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activePhoto, setActivePhoto] = useState<MediaItem | null>(null);

  const allCategories = ["All", ...categories];

  const filteredPhotos = selectedCategory === "All"
    ? initialPhotos
    : initialPhotos.filter((p) => p.category === selectedCategory);

  const handleNext = () => {
    if (!activePhoto) return;
    const currentIdx = filteredPhotos.findIndex((p) => p.id === activePhoto.id);
    const nextIdx = (currentIdx + 1) % filteredPhotos.length;
    setActivePhoto(filteredPhotos[nextIdx]);
  };

  const handlePrev = () => {
    if (!activePhoto) return;
    const currentIdx = filteredPhotos.findIndex((p) => p.id === activePhoto.id);
    const prevIdx = (currentIdx - 1 + filteredPhotos.length) % filteredPhotos.length;
    setActivePhoto(filteredPhotos[prevIdx]);
  };

  return (
    <div className="py-20 min-h-screen bg-brand-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Gallery Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 border-b border-slate-200 pb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-100 text-brand-royal text-xs font-mono uppercase tracking-widest mb-3">
              <Camera className="w-3.5 h-3.5" />
              <span>VISUAL ART & STILL GALLERY</span>
            </div>
            <h1 className="font-display font-extrabold text-4xl sm:text-6xl tracking-tight text-brand-jet">
              PHOTOGRAPHY & ARTWORKS.
            </h1>
            <p className="mt-3 text-slate-600 text-sm sm:text-base max-w-xl">
              Photorealistic character renderings, futuristic commercial stills, and generative surrealist compositions. Automatically discovered from <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono text-brand-royal">/assets/photos/</code>.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {allCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all duration-200 ${
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

        {/* Gallery Stats Bar */}
        <div className="flex items-center justify-between text-xs font-mono text-slate-500 mb-8 pb-3 border-b border-slate-100">
          <span>SHOWING {filteredPhotos.length} OF {initialPhotos.length} ARTWORKS</span>
          <span>CLICK ANY WORK TO EXPAND IN LIGHTBOX</span>
        </div>

        {/* Masonry / Editorial Column Layout */}
        {filteredPhotos.length === 0 ? (
          <div className="py-24 text-center rounded-3xl bg-slate-50 border border-dashed border-slate-300">
            <Camera className="w-12 h-12 text-slate-400 mx-auto mb-3 animate-pulse" />
            <h3 className="font-display font-bold text-lg text-slate-700">No photos found in this category</h3>
            <p className="text-xs font-mono text-slate-500 mt-1">
              Drop images into <code className="bg-slate-200 px-1.5 py-0.5 rounded">assets/photos/</code> and rebuild or refresh.
            </p>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
            {filteredPhotos.map((photo, idx) => (
              <motion.div
                key={photo.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="group relative break-inside-avoid rounded-2xl overflow-hidden bg-brand-blackberry border border-slate-200/80 shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer"
                onClick={() => setActivePhoto(photo)}
                data-cursor-text="EXPAND"
              >
                {/* Image */}
                <div className="relative w-full overflow-hidden">
                  <Image
                    src={photo.path}
                    alt={photo.title}
                    width={800}
                    height={1000}
                    className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />

                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-jet/90 via-brand-jet/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6">
                    {/* Top Tag & Zoom Icon */}
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full bg-brand-jet/80 text-[11px] font-mono tracking-wider text-brand-royal border border-white/20 backdrop-blur-md">
                        {photo.category}
                      </span>
                      <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                        <Maximize2 className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Bottom Metadata */}
                    <div>
                      <h3 className="font-display font-bold text-xl text-white tracking-tight">
                        {photo.title}
                      </h3>
                      {photo.subtitle && (
                        <p className="text-xs font-mono text-slate-300 mt-1 line-clamp-1">
                          {photo.subtitle}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Sub-card metadata strip */}
                <div className="p-4 bg-white flex items-center justify-between border-t border-slate-100">
                  <span className="font-display font-semibold text-sm text-brand-jet truncate">
                    {photo.title}
                  </span>
                  <span className="text-[11px] font-mono text-brand-royal font-medium uppercase">
                    {photo.category}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}

      </div>

      {/* Lightbox Component */}
      <AnimatePresence>
        {activePhoto && (
          <ImageLightbox
            photo={activePhoto}
            photos={filteredPhotos}
            onClose={() => setActivePhoto(null)}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
