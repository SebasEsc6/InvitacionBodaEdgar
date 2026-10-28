import React from "react";
import { FlowerSlot } from "@/lib/assets";

export interface FlowerDividerProps {
  /**
   * Ruta directa a la imagen de la flor en /public.
   *  - "/images/flores/Separador.png" (por defecto)
   *  - "/images/flores/Centro floral blanco y verde exuberante.png"
   *  - "/images/flores/Final.png"
   */
  src?: string;

  /**
   * Tamaño del separador floral:
   *  - "full" -> 100% ancho de pantalla de borde a borde (sin márgenes ni encogerse)
   *  - "lg"   -> ~1024px max
   *  - "md"   -> ~768px max
   *  - "sm"   -> ~576px max
   * Por defecto: "full".
   */
  size?: "sm" | "md" | "lg" | "full";

  /**
   * Posición en la sección:
   *  - "top"    -> Al inicio superior de la sección
   *  - "inline" -> En el flujo normal del contenido
   *  - "bottom" -> Al final de la sección cerrando el contenido
   *  - "absolute-top" -> Posicionado absoluto arriba
   *  - "absolute-bottom" -> Posicionado absoluto abajo
   * Por defecto: "top".
   */
  position?: "top" | "inline" | "bottom" | "absolute-top" | "absolute-bottom";

  /**
   * Si es true, sobresale 50% hacia la sección adyacente (-translate-y-1/2).
   */
  overlap?: boolean;

  /**
   * Altura máxima opcional.
   */
  maxHeight?: string;

  /**
   * Clases extra de Tailwind para el contenedor exterior.
   */
  className?: string;

  /**
   * Clases extra de Tailwind aplicadas directamente a la etiqueta <img>.
   */
  imageClassName?: string;

  /** Compatibilidad hacia atrás con versiones anteriores */
  slot?: FlowerSlot;
  edge?: "top" | "bottom";
}

const SLOT_DEFAULT_MAP: Record<string, string> = {
  "01-portada-bienvenida": "/images/flores/Separador.png",
  "02-detalles-rsvp": "/images/flores/Separador.png",
  "03-final": "/images/flores/Final.png",
  "centro-exuberante": "/images/flores/Centro floral blanco y verde exuberante.png",
  "separador": "/images/flores/Separador.png",
  "final": "/images/flores/Final.png",
};

/**
 * Separador floral inmersivo de borde a borde.
 * Abarca el 100% del ancho de pantalla sin dejar huecos laterales.
 */
export default function FlowerDivider({
  src,
  slot,
  edge,
  size = "full",
  position = "top",
  overlap = false,
  maxHeight,
  className = "",
  imageClassName = "",
}: FlowerDividerProps) {
  const resolvedSrc =
    src ||
    (slot ? SLOT_DEFAULT_MAP[slot] || "/images/flores/Separador.png" : "/images/flores/Separador.png");

  const isFull = size === "full";

  const sizeContainerClasses = {
    sm: "w-full max-w-xl mx-auto px-4",
    md: "w-full max-w-3xl mx-auto px-4",
    lg: "w-full max-w-5xl mx-auto px-4",
    full: "w-full min-w-full max-w-none px-0",
  }[size];

  // Si es "full", la imagen ocupa el 100% del ancho de borde a borde garantizado:
  // object-cover evita que se encoja a un rectángulo diminuto en el centro
  const imageSizeClasses = isFull
    ? "w-full min-w-full h-auto max-h-[380px] sm:max-h-[460px] md:max-h-[520px] object-cover object-center"
    : "w-full h-auto object-contain object-center";

  let positionClasses = "relative z-10 flex justify-center items-center w-full";

  if (position === "absolute-top" || overlap || (edge === "top" && overlap)) {
    if (overlap || edge === "top") {
      positionClasses = "absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 z-20 flex justify-center items-center pointer-events-none";
    } else {
      positionClasses = "absolute left-1/2 top-0 -translate-x-1/2 z-10 flex justify-center items-center pointer-events-none";
    }
  } else if (position === "absolute-bottom" || (edge === "bottom" && overlap)) {
    positionClasses = "absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 z-20 flex justify-center items-center pointer-events-none";
  }

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none select-none overflow-hidden ${positionClasses} ${sizeContainerClasses} ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={resolvedSrc}
        alt=""
        loading="lazy"
        decoding="async"
        className={`block select-none drop-shadow-[0_15px_35px_rgba(0,0,0,0.5)] transition-all duration-300 ${imageSizeClasses} ${maxHeight || ""} ${imageClassName}`}
      />
    </div>
  );
}
