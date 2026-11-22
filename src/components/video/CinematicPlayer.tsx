"use client";

import React, { useRef, useState, useEffect } from "react";
import { formatDuration } from "@/lib/utils";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  RotateCcw,
  Sparkles,
} from "lucide-react";

interface CinematicPlayerProps {
  src: string;
  poster?: string;
  title: string;
  autoPlay?: boolean;
}

export function CinematicPlayer({ src, poster, title, autoPlay = true }: CinematicPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      setDuration(video.duration || 0);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime || 0);
    };

    const handleEnded = () => {
      setIsPlaying(false);
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("ended", handleEnded);

    if (autoPlay) {
      video.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("ended", handleEnded);
    };
  }, [src, autoPlay]);

  // Keyboard navigation for playback
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        togglePlay();
      } else if (e.key === "f" || e.key === "F") {
        e.preventDefault();
        toggleFullscreen();
      } else if (e.key === "m" || e.key === "M") {
        e.preventDefault();
        toggleMute();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPlaying, isFullscreen, isMuted]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;
    const target = parseFloat(e.target.value);
    video.currentTime = target;
    setCurrentTime(target);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;
    const val = parseFloat(e.target.value);
    video.volume = val;
    setVolume(val);
    if (val === 0) setIsMuted(true);
    else setIsMuted(false);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    if (isMuted) {
      video.muted = false;
      setIsMuted(false);
    } else {
      video.muted = true;
      setIsMuted(true);
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    hideTimeoutRef.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 2800);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full aspect-[16/9] bg-brand-jet rounded-2xl overflow-hidden group select-none flex items-center justify-center border border-white/10 shadow-2xl"
    >
      {/* HTML5 Video Element */}
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        playsInline
        onClick={togglePlay}
        className="w-full h-full object-cover cursor-pointer"
      />

      {/* Big Center Play Button when paused */}
      {!isPlaying && (
        <button
          onClick={togglePlay}
          className="absolute inset-0 m-auto w-20 h-20 rounded-full bg-brand-royal/90 text-white flex items-center justify-center backdrop-blur-md shadow-2xl hover:scale-110 hover:bg-brand-royal transition-all duration-300 z-20 group/btn"
          data-cursor-text="PLAY"
          aria-label="Play video"
        >
          <Play className="w-8 h-8 fill-white ml-1 group-hover/btn:scale-105 transition-transform" />
        </button>
      )}

      {/* Top Title Overlay */}
      <div
        className={`absolute top-0 inset-x-0 p-6 bg-gradient-to-b from-brand-jet/80 to-transparent transition-opacity duration-300 z-10 pointer-events-none ${
          showControls ? "opacity-100" : "opacity-0"
        }`}
      >
        <span className="text-xs font-mono text-brand-royal tracking-widest uppercase">
          CINEMATIC PLAYBACK
        </span>
        <h4 className="font-display font-bold text-lg text-white tracking-tight mt-0.5">
          {title}
        </h4>
      </div>

      {/* Bottom Custom Controls Bar */}
      <div
        className={`absolute bottom-0 inset-x-0 p-4 sm:p-6 bg-gradient-to-t from-brand-jet/95 via-brand-jet/80 to-transparent transition-opacity duration-300 z-20 flex flex-col gap-3 ${
          showControls ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Timeline Scrubber */}
        <div className="relative w-full flex items-center group/scrub">
          <input
            type="range"
            min={0}
            max={duration || 100}
            step={0.1}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-brand-royal hover:h-2 transition-all"
            data-cursor-text="SEEK"
            aria-label="Seek timeline"
          />
        </div>

        {/* Action Controls Row */}
        <div className="flex items-center justify-between text-white text-xs font-mono">
          
          {/* Left: Play/Pause, Rewind, Time */}
          <div className="flex items-center gap-4">
            <button
              onClick={togglePlay}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
            </button>

            <button
              onClick={() => {
                if (videoRef.current) {
                  videoRef.current.currentTime = 0;
                  videoRef.current.play();
                  setIsPlaying(true);
                }
              }}
              className="text-slate-400 hover:text-white transition-colors"
              title="Restart"
              aria-label="Restart video"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <span className="text-slate-300">
              {formatDuration(currentTime)} / {formatDuration(duration)}
            </span>
          </div>

          {/* Right: Volume, Fullscreen */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={toggleMute}
                className="text-slate-300 hover:text-white transition-colors"
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-16 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-brand-royal"
                aria-label="Volume slider"
              />
            </div>

            <button
              onClick={toggleFullscreen}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              aria-label={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            >
              {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
