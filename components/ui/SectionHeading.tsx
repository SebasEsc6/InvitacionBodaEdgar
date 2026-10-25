import React from "react";
import FadeUp from "../animations/FadeUp";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  /** "onDark": texto claro sobre fondo verde oscuro. "onLight": texto oscuro sobre papel beige. */
  tone?: "onDark" | "onLight";
  className?: string;
}

/**
 * Encabezado de sección estilo editorial directo de la referencia:
 * Título en serif display de alto contraste + subtítulo centrado, sutil y natural.
 * Sin adornos de IA, sin badges, sin eyebrows con puntitos.
 */
export default function SectionHeading({
  title,
  subtitle,
  tone = "onDark",
  className = "",
}: SectionHeadingProps) {
  const dark = tone === "onDark";
  return (
    <FadeUp className={`text-center ${className}`}>
      <h2
        className={`font-serif text-4xl sm:text-5xl md:text-6xl font-normal tracking-[-0.02em] leading-tight ${
          dark ? "text-marfil" : "text-verde-bosque"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-2 font-sans text-xs sm:text-sm tracking-wide font-light ${
            dark ? "text-yute-natural-light/80" : "text-madera-nogal/85"
          }`}
        >
          {subtitle}
        </p>
      )}
    </FadeUp>
  );
}
