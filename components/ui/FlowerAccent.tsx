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
 * Como los archivos PNG tienen el ramillete en un tercio del canvas (y el resto transparente),
 * este componente utiliza anchos proporcionales para que las rosas blancas y hojas de eucalipto
 * entren con presencia y belleza visible en los laterales, tal como en la imagen de referencia.
 */
export default function FlowerAccent({
  side,
  src,
  className = "top-20",
  size = "lg",
  offset = "balanced",
  imageClassName = "",
}: FlowerAccentProps) {
  const defaultSrc =
    side === "left"
      ? "/images/flores/LateralIzq.png"
      : "/images/flores/LateralDer.png";

  const resolvedSrc = src || defaultSrc;

  // Anchos generosos: dado que las flores ocupan ~35% del archivo,
  // estos anchos garantizan que se vean entre 80px y 160px de rosas blancas y follaje
  const sizeClasses = {
    sm: "w-44 sm:w-56 md:w-68 lg:w-80",
    md: "w-52 sm:w-68 md:w-80 lg:w-96",
    lg: "w-60 sm:w-80 md:w-96 lg:w-[440px] xl:w-[480px]",
    xl: "w-72 sm:w-96 md:w-[440px] lg:w-[520px] xl:w-[560px]",
  }[size];

  // Alineación al borde: 'balanced' alinea la flor justo al borde de la pantalla (translate-x-0)
  // de modo que no se empuja fuera y las rosas blancas quedan 100% a la vista.
  const offsetClasses = {
    subtle:
      side === "left"
        ? "left-0 -translate-x-10 sm:-translate-x-14"
        : "right-0 translate-x-10 sm:translate-x-14",
    balanced:
      side === "left"
        ? "left-0 translate-x-0"
        : "right-0 translate-x-0",
    prominent:
      side === "left"
        ? "left-0 translate-x-4 sm:translate-x-8"
        : "right-0 -translate-x-4 sm:-translate-x-8",
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
        className={`block h-auto ${sizeClasses} select-none opacity-95 object-contain drop-shadow-[0_12px_28px_rgba(0,0,0,0.3)] filter transition-all duration-300 ${imageClassName}`}
      />
    </div>
  );
}
