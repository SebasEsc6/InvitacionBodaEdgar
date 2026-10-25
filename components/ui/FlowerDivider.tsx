import React from "react";
import SmartImage from "./SmartImage";
import { flowerSources, FlowerSlot } from "@/lib/assets";

interface FlowerDividerProps {
  slot: FlowerSlot;
  /** Borde de la sección padre sobre el que se centra el ramo (mitad dentro, mitad fuera). */
  edge: "top" | "bottom";
  className?: string;
}

/**
 * Ramo de flores fotorrealista de Gemini que separa dos secciones.
 * Totalmente responsivo para que no se corte en móviles ni en escritorio.
 */
export default function FlowerDivider({ slot, edge, className = "" }: FlowerDividerProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute left-1/2 z-20 w-full max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-3xl -translate-x-1/2 px-4 ${
        edge === "top" ? "top-0 -translate-y-1/2" : "bottom-0 translate-y-1/2"
      } ${className}`}
    >
      <SmartImage
        sources={flowerSources(slot)}
        alt=""
        loading="lazy"
        decoding="async"
        className="mx-auto block h-auto max-h-24 sm:max-h-32 md:max-h-40 w-full select-none object-contain drop-shadow-[0_8px_25px_rgba(0,0,0,0.55)]"
      />
    </div>
  );
}
