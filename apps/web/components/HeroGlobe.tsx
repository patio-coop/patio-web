"use client";

import createGlobe from "cobe";
import type { Marker } from "cobe";
import { useEffect, useRef } from "react";

const markers: Marker[] = [
  { location: [40.7128, -74.006], size: 0.04 },
  { location: [51.5072, -0.1276], size: 0.04 },
  { location: [48.8566, 2.3522], size: 0.04 },
  { location: [35.6762, 139.6503], size: 0.04 },
  { location: [25.2048, 55.2708], size: 0.04 },
  { location: [-33.9249, 18.4241], size: 0.04 },
  { location: [-33.8688, 151.2093], size: 0.04 }
];

export function HeroGlobe() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);

  useEffect(() => {
    let phi = 0;
    let width = 0;
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const onResize = () => {
      width = canvas.offsetWidth;
    };

    onResize();
    window.addEventListener("resize", onResize);

    const globe = createGlobe(canvas, {
      devicePixelRatio: Math.min(2, window.devicePixelRatio),
      width: width * 2,
      height: width * 2,
      phi: 0.24,
      theta: 0.18,
      dark: 1,
      diffuse: 1.3,
      mapSamples: 16000,
      mapBrightness: 4.4,
      baseColor: [0.35, 0.53, 0.72],
      markerColor: [0.2, 1, 0.22],
      glowColor: [0.74, 0.84, 0.9],
      markers,
      onRender: (state) => {
        if (!prefersReducedMotion && pointerInteracting.current === null) {
          phi += 0.0025;
        }
        state.phi = phi + pointerInteractionMovement.current;
        state.width = width * 2;
        state.height = width * 2;
      }
    });

    return () => {
      globe?.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className="hero-globe" aria-label="Animated global network map">
      <canvas
        ref={canvasRef}
        className="hero-globe__canvas"
        onPointerDown={(event) => {
          pointerInteracting.current = event.clientX;
        }}
        onPointerUp={() => {
          pointerInteracting.current = null;
        }}
        onPointerOut={() => {
          pointerInteracting.current = null;
        }}
        onMouseMove={(event) => {
          if (pointerInteracting.current !== null) {
            const delta = event.clientX - pointerInteracting.current;
            pointerInteractionMovement.current = delta / 180;
          }
        }}
        width="900"
        height="900"
      />
      <span className="globe-label globe-label--nyc">NYC + London</span>
      <span className="globe-label globe-label--paris">Paris</span>
      <span className="globe-label globe-label--dubai">Dubai</span>
      <span className="globe-label globe-label--tokyo">Tokyo</span>
      <span className="globe-label globe-label--sydney">Sydney</span>
      <span className="globe-label globe-label--cape">Cape Town</span>
    </div>
  );
}
