import React from "react";

export interface FlowerAccentProps {
  side: "left" | "right";
  src?: string;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  offset?: "subtle" | "balanced" | "prominent" | "none";
  imageClassName?: string;
}

/**
 * Flores laterales botánicas fotorrealistas.
 * Diseñadas para que las rosas blancas y follaje asomen en los márgenes
 * de la pantalla con presencia y elegancia, SIN invadir ni tapar el texto de lectura.
 */
export default function FlowerAccent({
  side,
  src,
  className = "top-20",
  size = "md",
  offset = "balanced",
  imageClassName = "",
}: FlowerAccentProps) {
  const defaultSrc =
    side === "left"
      ? "/images/flores/LateralIzq.png"
      : "/images/flores/LateralDer.png";

  const resolvedSrc = src || defaultSrc;

  // Anchos calibrados por breakpoint:
  // En móvil (< 640px): se limitan a 110px-144px (~38px-50px visibles) para nunca pisar el texto.
  // En tablet/desktop (sm, md, lg): se expanden libremente hacia afuera donde hay espacio abundante.
  const sizeClasses = {
    sm: "w-24 sm:w-36 md:w-48 lg:w-64 max-h-[380px]",
    md: "w-32 sm:w-48 md:w-64 lg:w-80 max-h-[500px]",
    lg: "w-36 sm:w-56 md:w-72 lg:w-88 max-h-[620px]",
    xl: "w-44 sm:w-68 md:w-88 lg:w-[420px] max-h-[720px]",
  }[size];

  // Alineación al borde de pantalla
  const offsetClasses = {
    subtle:
      side === "left"
        ? "left-0 -translate-x-6 sm:-translate-x-10"
        : "right-0 translate-x-6 sm:translate-x-10",
    balanced:
      side === "left"
        ? "left-0 translate-x-0"
        : "right-0 translate-x-0",
    prominent:
      side === "left"
        ? "left-0 translate-x-3 sm:translate-x-6"
        : "right-0 -translate-x-3 sm:-translate-x-6",
    none: side === "left" ? "left-0" : "right-0",
  }[offset];

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute z-0 select-none overflow-visible ${offsetClasses} ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={resolvedSrc}
        alt=""
        loading="lazy"
        decoding="async"
        className={`block h-auto ${sizeClasses} select-none opacity-95 object-contain drop-shadow-[0_8px_20px_rgba(0,0,0,0.25)] filter transition-all duration-300 ${imageClassName}`}
      />
    </div>
  );
}
