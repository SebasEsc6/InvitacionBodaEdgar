import React from "react";
import { FlowerSlot } from "@/lib/assets";

export interface FlowerDividerProps {
  /**
   * Ruta directa a la imagen de la flor en /public.
   *  - "/images/flores/Separador.png" (por defecto para separadores)
   *  - "/images/flores/Final.png" (por defecto para cierre inferior)
   */
  src?: string;

  /**
   * Tamaño del separador floral:
   *  - "full" -> 100% ancho de pantalla de borde a borde
   *  - "lg"   -> ~1024px max
   *  - "md"   -> ~768px max
   *  - "sm"   -> ~576px max
   * Por defecto: "full".
   */
  size?: "sm" | "md" | "lg" | "full";

  /**
   * Posición en la sección:
   *  - "intersection"   -> Sobrepuesto en la costura entre secciones (50% arriba, 50% abajo, 0 espacio en flujo DOM)
   *  - "top"            -> Equivalente a "intersection" para colocar en el inicio de la sección sin contenedor de espacio
   *  - "bottom-flush"   -> Pegado al fondo absoluto de la página/sección, sin ningún espacio abajo y con leve offset hacia abajo
   *  - "bottom"         -> Al final de la sección (por defecto al fondo al ras si es full)
   *  - "inline"         -> En el flujo normal del contenido
   *  - "absolute-top"   -> Posicionado absoluto arriba
   *  - "absolute-bottom"-> Posicionado absoluto abajo
   */
  position?: "intersection" | "top" | "bottom-flush" | "bottom" | "inline" | "absolute-top" | "absolute-bottom";

  /**
   * Si es true, sobresale 50% hacia la sección adyacente (-translate-y-1/2).
   */
  overlap?: boolean;

  /**
   * Desplazamiento vertical extra opcional (ej: "translate-y-4", "-translate-y-2").
   */
  offsetY?: string;

  /**
   * Altura máxima opcional (ej: "max-h-[300px]").
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
 * Separador floral inmersivo sobrepuesto.
 * - En "intersection" / "top": Se sobrepone en la costura entre secciones sin dedicar un div con espacio vertical en el layout.
 * - En "bottom-flush" / "bottom": Queda pegado al fondo absoluto de la página sin dejar espacio abajo.
 */
export default function FlowerDivider({
  src,
  slot,
  edge,
  size = "full",
  position = "intersection",
  overlap = false,
  offsetY = "",
  maxHeight,
  className = "",
  imageClassName = "",
}: FlowerDividerProps) {
  const isBottomMode = position === "bottom-flush" || (position === "bottom" && !overlap);

  const resolvedSrc =
    src ||
    (slot
      ? SLOT_DEFAULT_MAP[slot] || (isBottomMode ? "/images/flores/Final.png" : "/images/flores/Separador.png")
      : isBottomMode
        ? "/images/flores/Final.png"
        : "/images/flores/Separador.png");

  const isFull = size === "full";

  const sizeContainerClasses = {
    sm: "w-full max-w-xl mx-auto px-4",
    md: "w-full max-w-3xl mx-auto px-4",
    lg: "w-full max-w-5xl mx-auto px-4",
    full: "w-full min-w-full max-w-none px-0",
  }[size];

  // Si está en el fondo absoluto (Footer):
  if (isBottomMode) {
    return (
      <div
        aria-hidden="true"
        className={`pointer-events-none select-none absolute inset-x-0 bottom-0 z-10 flex justify-center items-end overflow-hidden w-full ${className}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={resolvedSrc}
          alt=""
          loading="lazy"
          decoding="async"
          className={`block select-none w-full min-w-full h-auto max-h-[260px] sm:max-h-[340px] md:max-h-[400px] lg:max-h-[440px] object-cover object-top translate-y-6 sm:translate-y-10 md:translate-y-14 lg:translate-y-16 drop-shadow-[0_-12px_28px_rgba(0,0,0,0.55)] transition-all duration-300 ${offsetY} ${maxHeight || ""} ${imageClassName}`}
        />
      </div>
    );
  }

  // Si está en el flujo normal (inline):
  if (position === "inline") {
    return (
      <div
        aria-hidden="true"
        className={`pointer-events-none select-none relative z-10 flex justify-center items-center w-full ${sizeContainerClasses} ${className}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={resolvedSrc}
          alt=""
          loading="lazy"
          decoding="async"
          className={`block select-none drop-shadow-[0_15px_35px_rgba(0,0,0,0.5)] transition-all duration-300 ${isFull
            ? "w-full min-w-full h-auto max-h-[160px] sm:max-h-[220px] md:max-h-[260px] object-cover object-center"
            : "w-full h-auto object-contain object-center"
            } ${maxHeight || ""} ${imageClassName}`}
        />
      </div>
    );
  }

  // Por defecto: "intersection" / "top" sobrepuesto en la costura entre secciones (0 espacio en el layout)
  // Preserva al 100% la silueta orgánica natural de las flores y hojas con fondo transparente (sin cortes ni recortes con object-cover)
  const imageSizeClasses = isFull
    ? "w-full max-w-[1500px] 2xl:max-w-[1700px] h-auto object-contain object-center"
    : "w-full h-auto object-contain object-center";

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none select-none absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 z-20 flex justify-center items-center ${sizeContainerClasses} ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={resolvedSrc}
        alt=""
        loading="lazy"
        decoding="async"
        className={`block select-none drop-shadow-[0_12px_30px_rgba(0,0,0,0.45)] transition-all duration-300 ${imageSizeClasses} ${offsetY} ${maxHeight || ""} ${imageClassName}`}
      />
    </div>
  )
};
