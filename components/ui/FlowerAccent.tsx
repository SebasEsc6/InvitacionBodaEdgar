import React from "react";
import SmartImage from "./SmartImage";
import { flowerSources } from "@/lib/assets";

interface FlowerAccentProps {
  side: "left" | "right";
  /** Posición vertical dentro de la sección, ej. "top-[12%]" o "bottom-10". */
  className?: string;
}

/**
 * Flores laterales que asoman por el borde izquierdo/derecho de una sección clara.
 * Imagen recomendada: PNG transparente vertical (ej. 800×1200 px) con las flores pegadas
 * al borde correspondiente de la imagen.
 */
export default function FlowerAccent({ side, className = "top-24" }: FlowerAccentProps) {
  const slot = side === "left" ? "lateral-izquierda" : "lateral-derecha";
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute z-0 ${
        side === "left" ? "left-0 -translate-x-2 sm:-translate-x-4" : "right-0 translate-x-2 sm:translate-x-4"
      } ${className}`}
    >
      <SmartImage
        sources={flowerSources(slot)}
        alt=""
        loading="lazy"
        decoding="async"
        className="block h-auto w-16 select-none opacity-85 sm:w-24 md:w-32 lg:w-40 max-h-[360px] object-contain drop-shadow-[0_4px_16px_rgba(0,0,0,0.15)]"
      />
    </div>
  );
}
