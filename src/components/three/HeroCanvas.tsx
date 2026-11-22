"use client";

import React, { Suspense, useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Fallback visual component for non-WebGL devices or while loading
function FallbackSculpture() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
      <div className="relative w-72 h-72 sm:w-96 sm:h-96">
        <div className="absolute inset-0 rounded-full border border-brand-royal/40 animate-[spin_20s_linear_infinite]" />
        <div className="absolute inset-4 rounded-full border border-dashed border-brand-hyacinth/50 animate-[spin_25s_linear_infinite_reverse]" />
        <div className="absolute inset-10 rounded-full bg-gradient-to-tr from-brand-blackberry/80 via-brand-royal/20 to-brand-hyacinth/30 blur-xl animate-pulse" />
        <div className="absolute inset-16 rounded-full border-2 border-brand-royal/60 transform rotate-45 animate-[bounce_6s_ease-in-out_infinite]" />
      </div>
    </div>
  );
}

// Dynamically import Canvas and Scene to ensure zero SSR WebGL errors
const SceneCanvas = dynamic(
  () =>
    import("@react-three/fiber").then((r3f) => {
      const Canvas = r3f.Canvas;
      return function DynamicScene() {
        return (
          <Canvas
            camera={{ position: [0, 0, 7.5], fov: 45 }}
            gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
            dpr={[1, 2]}
            className="w-full h-full"
          >
            <Suspense fallback={null}>
              <SceneInner />
            </Suspense>
          </Canvas>
        );
      };
    }),
  { ssr: false, loading: () => <FallbackSculpture /> }
);

// Inner scene wrapper dynamically loaded
const SceneInner = dynamic(
  () => import("./HeroScene").then((mod) => mod.HeroScene),
  { ssr: false }
);

export function HeroCanvas() {
  const [mounted, setMounted] = useState(false);
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    setMounted(true);
    // Simple WebGL detection
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      setHasWebGL(Boolean(gl));
    } catch {
      setHasWebGL(false);
    }
  }, []);

  if (!mounted) {
    return <FallbackSculpture />;
  }

  if (!hasWebGL) {
    return <FallbackSculpture />;
  }

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-auto">
      <SceneCanvas />
    </div>
  );
}
