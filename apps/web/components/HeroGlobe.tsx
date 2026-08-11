"use client";

import createGlobe from "cobe";
import type { Marker } from "cobe";
import { useEffect, useRef } from "react";

const locations = [
  {
    label: "NYC ↔ London",
    location: [51.5072, -0.1276],
    offset: [-18, -18]
  },
  { label: "Paris", location: [48.8566, 2.3522], offset: [16, 18] },
  { label: "Dubai", location: [25.2048, 55.2708] },
  { label: "Tokyo", location: [35.6762, 139.6503] },
  { label: "Sydney", location: [-33.8688, 151.2093] },
  { label: "Cape Town", location: [-33.9249, 18.4241] }
] satisfies {
  label: string;
  location: [number, number];
  offset?: [number, number];
}[];

const markers: Marker[] = locations.map(({ location }) => ({
  location,
  size: 0.04
}));

const theta = 0.18;
const globeScale = 1.08;

function projectLocation(
  [latitude, longitude]: [number, number],
  phi: number,
  size: number
) {
  const latitudeRadians = (latitude * Math.PI) / 180;
  const longitudeRadians = (longitude * Math.PI) / 180 - Math.PI;
  const latitudeCosine = Math.cos(latitudeRadians);
  const point = [
    -latitudeCosine * Math.cos(longitudeRadians),
    Math.sin(latitudeRadians),
    latitudeCosine * Math.sin(longitudeRadians)
  ];
  const thetaCosine = Math.cos(theta);
  const thetaSine = Math.sin(theta);
  const phiCosine = Math.cos(phi);
  const phiSine = Math.sin(phi);
  const x = phiCosine * point[0] + phiSine * point[2];
  const y =
    phiSine * thetaSine * point[0] +
    thetaCosine * point[1] -
    phiCosine * thetaSine * point[2];
  const z =
    -phiSine * thetaCosine * point[0] +
    thetaSine * point[1] +
    phiCosine * thetaCosine * point[2];

  return {
    x: size * (0.5 + 0.4 * globeScale * x),
    y: size * (0.5 - 0.4 * globeScale * y),
    visible: z > 0.08
  };
}

export function HeroGlobe() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const labelRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);

  useEffect(() => {
    let phi = Math.PI;
    let width = 0;
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const devicePixelRatio = Math.min(2, window.devicePixelRatio);
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const onResize = () => {
      width = canvas.offsetWidth;
    };

    onResize();
    window.addEventListener("resize", onResize);

    const globe = createGlobe(canvas, {
      devicePixelRatio,
      width: width * devicePixelRatio,
      height: width * devicePixelRatio,
      scale: globeScale,
      phi: 0.24,
      theta,
      dark: 1,
      diffuse: 1.3,
      mapSamples: 16000,
      mapBrightness: 4.4,
      baseColor: [0.35, 0.53, 0.72],
      markerColor: [0.58, 0.72, 0.9],
      glowColor: [0.08, 0.15, 0.28],
      markers,
      onRender: (state) => {
        if (!prefersReducedMotion && pointerInteracting.current === null) {
          phi += 0.0025;
        }
        const renderedPhi = phi + pointerInteractionMovement.current;
        state.phi = renderedPhi;
        state.width = width * devicePixelRatio;
        state.height = width * devicePixelRatio;
        locations.forEach(({ location, offset = [0, 0] }, index) => {
          const label = labelRefs.current[index];
          if (!label) {
            return;
          }
          const projected = projectLocation(location, renderedPhi, width);
          label.style.left = `${projected.x + offset[0]}px`;
          label.style.top = `${projected.y + offset[1]}px`;
          label.style.opacity = projected.visible ? "1" : "0";
          label.style.visibility = projected.visible ? "visible" : "hidden";
        });
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
      {locations.map(({ label }, index) => (
        <span
          className="globe-label"
          key={label}
          ref={(node) => {
            labelRefs.current[index] = node;
          }}
        >
          {label}
        </span>
      ))}
    </div>
  );
}
