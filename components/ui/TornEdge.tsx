import React from "react";

interface TornEdgeProps {
  /** Borde de la sección al que se adhiere el papel rasgado. */
  position: "top" | "bottom";
  /** Cambia la forma del rasgado (determinista, evita errores de hidratación). */
  seed?: number;
  /** Color de relleno: debe coincidir con el fondo de la sección (clase text-*). */
  className?: string;
}

function buildPath(seed: number, width = 1200, base = 40, steps = 70) {
  let s = seed >>> 0;
  const rand = () => (s = (Math.imul(s, 1664525) + 1013904223) >>> 0) / 4294967296;

  const pts: string[] = [`M0 ${base}`];
  let wobble = 0;
  for (let i = 0; i <= steps; i++) {
    const x = (i / steps) * width;
    wobble += (rand() - 0.5) * 7;
    wobble *= 0.82;
    const y = 16 + wobble + (rand() - 0.5) * 12 + (i % 7 === 0 ? rand() * 8 : 0);
    pts.push(`L${x.toFixed(1)} ${Math.max(3, Math.min(34, y)).toFixed(1)}`);
  }
  pts.push(`L${width} ${base}`, "Z");
  return pts.join(" ");
}

/**
 * Borde de "papel rasgado" que se coloca sobre el borde superior o inferior de una
 * sección clara para que quede montada sobre la sección oscura vecina.
 * Requiere que la sección padre tenga `relative` y NO `overflow-hidden`.
 */
export default function TornEdge({ position, seed = 7, className = "text-marfil-200" }: TornEdgeProps) {
  const d = buildPath(seed);
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute left-0 right-0 z-10 h-5 sm:h-8 ${
        position === "top" ? "bottom-full -mb-px" : "top-full -mt-px scale-y-[-1]"
      } ${className}`}
    >
      <svg
        viewBox="0 0 1200 40"
        preserveAspectRatio="none"
        className="block h-full w-full drop-shadow-[0_-2px_3px_rgba(0,0,0,0.4)]"
      >
        <path d={d} fill="currentColor" />
      </svg>
    </div>
  );
}
