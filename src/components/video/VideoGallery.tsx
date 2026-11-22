"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MediaItem } from "@/types";
import { CinematicPlayer } from "./CinematicPlayer";
import { Film, Play, Sparkles, X, Clapperboard, Calendar, Clock } from "lucide-react";

interface VideoGalleryProps {
  initialVideos: MediaItem[];
  categories: string[];
}

export function VideoGallery({ initialVideos, categories }: VideoGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeVideo, setActiveVideo] = useState<MediaItem | null>(null);

  const allCategories = ["All", ...categories];

  const filteredVideos = selectedCategory === "All"
    ? initialVideos
    : initialVideos.filter((v) => v.category === selectedCategory);

  return (
    <div className="py-20 min-h-screen bg-brand-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Gallery Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 border-b border-slate-200 pb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-100 text-brand-royal text-xs font-mono uppercase tracking-widest mb-3">
              <Clapperboard className="w-3.5 h-3.5" />
              <span>CINEMATIC PRODUCTIONS // SHOWCASE</span>
            </div>
            <h1 className="font-display font-extrabold text-4xl sm:text-6xl tracking-tight text-brand-jet">
              VIDEOS & COMMERCIALS.
            </h1>
            <p className="mt-3 text-slate-600 text-sm sm:text-base max-w-xl">
              AI-generated brand advertisements, cinematic narrative teasers, and visual effects sequences. Loaded dynamically from <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono text-brand-royal">/assets/videos/</code>.
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

        {/* Video Stats Bar */}
        <div className="flex items-center justify-between text-xs font-mono text-slate-500 mb-8 pb-3 border-b border-slate-100">
          <span>SHOWING {filteredVideos.length} OF {initialVideos.length} VIDEO PRODUCTIONS</span>
          <span>CLICK ANY VIDEO CARD FOR CINEMATIC PLAYBACK</span>
        </div>

        {/* Video Grid */}
        {filteredVideos.length === 0 ? (
          <div className="py-24 text-center rounded-3xl bg-slate-50 border border-dashed border-slate-300">
            <Film className="w-12 h-12 text-slate-400 mx-auto mb-3 animate-pulse" />
            <h3 className="font-display font-bold text-lg text-slate-700">No videos found in this category</h3>
            <p className="text-xs font-mono text-slate-500 mt-1">
              Add MP4 files to <code className="bg-slate-200 px-1.5 py-0.5 rounded">assets/videos/</code> and rebuild or refresh.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredVideos.map((video, idx) => (
              <motion.div
                key={video.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="group relative rounded-3xl overflow-hidden bg-brand-blackberry border border-slate-200/80 shadow-md hover:shadow-2xl hover:border-brand-royal/40 transition-all duration-300 cursor-pointer flex flex-col justify-between"
                onClick={() => setActiveVideo(video)}
                data-cursor-text="WATCH"
              >
                {/* Poster / Thumbnail Area */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-brand-jet">
                  {video.thumbnail ? (
                    <Image
                      src={video.thumbnail}
                      alt={video.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-900 text-slate-500">
                      <Film className="w-12 h-12" />
                    </div>
                  )}

                  {/* Cinematic gradient & play button overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-jet/90 via-brand-jet/30 to-transparent flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-brand-royal/90 text-white flex items-center justify-center backdrop-blur-md shadow-2xl group-hover:scale-110 group-hover:bg-brand-royal transition-all duration-300">
                      <Play className="w-7 h-7 fill-white ml-1" />
                    </div>
                  </div>

                  {/* Category & Format Badges */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-brand-jet/80 text-[11px] font-mono tracking-wider text-brand-royal border border-white/20 backdrop-blur-md">
                      {video.category}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-black/60 text-[10px] font-mono text-slate-300 backdrop-blur-md">
                      MP4 // 1080P
                    </span>
                  </div>
                </div>

                {/* Card Content Footer */}
                <div className="p-6 bg-white flex flex-col justify-between gap-4">
                  <div>
                    <h3 className="font-display font-extrabold text-xl text-brand-jet group-hover:text-brand-royal transition-colors">
                      {video.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed line-clamp-2">
                      {video.description || "Cinematic video piece created by Shanmukh Veerepalli."}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-brand-hyacinth" />
                      <span>SHANMUKH AI FILMS</span>
                    </span>

                    <span className="text-brand-royal font-semibold group-hover:underline">
                      WATCH NOW →
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

      </div>

      {/* Cinematic Modal Player */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/90 backdrop-blur-2xl overflow-y-auto"
            onClick={() => setActiveVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="relative w-full max-w-5xl bg-brand-blackberry rounded-3xl overflow-hidden border border-brand-hyacinth/30 shadow-2xl my-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveVideo(null)}
                className="absolute top-5 right-5 z-30 w-10 h-10 rounded-full bg-brand-jet/80 text-white flex items-center justify-center border border-white/20 hover:bg-brand-royal transition-colors"
                data-cursor-text="CLOSE"
                aria-label="Close video player"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Custom Player */}
              <CinematicPlayer
                src={activeVideo.path}
                poster={activeVideo.thumbnail}
                title={activeVideo.title}
                autoPlay={true}
              />

              {/* Video Production Details */}
              <div className="p-6 sm:p-8 text-white flex flex-col gap-4">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-3.5 py-1 rounded-full bg-brand-royal/20 border border-brand-royal/40 text-brand-royal font-mono text-xs tracking-wider">
                    {activeVideo.category}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    SOURCE: {activeVideo.filename}
                  </span>
                </div>

                <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
                  {activeVideo.title}
                </h2>

                <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
                  {activeVideo.description}
                </p>

                {activeVideo.tools && (
                  <div className="pt-2 flex flex-wrap gap-2">
                    {activeVideo.tools.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1 rounded-lg bg-brand-jet border border-slate-800 text-xs font-mono text-slate-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
