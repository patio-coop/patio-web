"use client";

import createGlobe from "cobe";
import type { Marker } from "cobe";
import { useEffect, useRef } from "react";

import { cooperatives } from "@/data/home";

const countryCoordinates = new Map<string, [number, number]>([
  ["Argentina", [-38.4161, -63.6167]],
  ["Brazil", [-14.235, -51.9253]],
  ["Bulgaria", [42.7339, 25.4858]],
  ["Chile", [-35.6751, -71.543]],
  ["Croatia", [45.1, 15.2]],
  ["France", [46.2276, 2.2137]],
  ["Germany", [51.1657, 10.4515]],
  ["Greece", [39.0742, 21.8243]],
  ["Israel", [31.0461, 34.8516]],
  ["Japan", [36.2048, 138.2529]],
  ["Mexico", [23.6345, -102.5528]],
  ["New Zealand", [-40.9006, 174.886]],
  ["Russia", [61.524, 105.3188]],
  ["Spain", [40.4637, -3.7492]],
  ["Turkey", [38.9637, 35.2433]],
  ["United Kingdom", [55.3781, -3.436]],
  ["United States", [39.8283, -98.5795]],
  ["Uruguay", [-32.5228, -55.7658]],
]);

const enabledCountries = Array.from(
  new Set(
    cooperatives
      .map((cooperative) => cooperative.country)
      .filter((country): country is string => Boolean(country)),
  ),
);

const locations = enabledCountries.flatMap((country) => {
  const location = countryCoordinates.get(country);

  return location
    ? [{
        label: country,
        location,
      }]
    : [];
});

const markers: Marker[] = locations.map(({ location }) => ({
  location,
  size: 0.04,
}));

const theta = 0.18;
const globeScale = 1.08;

function projectLocation(
  [latitude, longitude]: [number, number],
  phi: number,
  size: number,
) {
  const latitudeRadians = (latitude * Math.PI) / 180;
  const longitudeRadians = (longitude * Math.PI) / 180 - Math.PI;
  const latitudeCosine = Math.cos(latitudeRadians);
  const point = [
    -latitudeCosine * Math.cos(longitudeRadians),
    Math.sin(latitudeRadians),
    latitudeCosine * Math.sin(longitudeRadians),
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
    visible: z > 0.08,
  };
}

export function HeroGlobe() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const labelRefs = useRef<(HTMLButtonElement | null)[]>([]);
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
      mapBrightness: 12,
      mapBaseBrightness: 0,
      baseColor: [0, 0.063, 0.231],
      markerColor: [0.969, 0.969, 0.969],
      glowColor: [0, 0.063, 0.231],
      opacity: 0,
      markers,
      onRender: (state) => {
        if (pointerInteracting.current === null) {
          phi += 0.0025;
        }

        const renderedPhi = phi + pointerInteractionMovement.current;
        state.phi = renderedPhi;
        state.width = width * devicePixelRatio;
        state.height = width * devicePixelRatio;

        locations.forEach(({ location }, index) => {
          const label = labelRefs.current[index];
          if (!label) {
            return;
          }

          const projected = projectLocation(location, renderedPhi, width);
          label.style.left = `${projected.x}px`;
          label.style.top = `${projected.y}px`;
          label.style.opacity = projected.visible ? "1" : "0";
          label.style.pointerEvents = projected.visible ? "auto" : "none";
          label.style.visibility = projected.visible ? "visible" : "hidden";
        });
      },
    });

    return () => {
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div
      className="hero-globe"
      aria-label="Animated global network map"
      role="region"
    >
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
        <button
          aria-label={label}
          className="globe-label"
          key={label}
          ref={(node) => {
            labelRefs.current[index] = node;
          }}
          type="button"
        >
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
}
