"use client";

import React from "react";
import FadeUp from "../animations/FadeUp";
import SectionHeading from "../ui/SectionHeading";
import PinterestBoard from "../ui/PinterestBoard";
import SmartImage from "../ui/SmartImage";
import { photoSources } from "@/lib/assets";

interface ColorSwatch {
  name: string;
  hex: string;
}

interface DressRule {
  audience: string;
  label: string;
  colors: ColorSwatch[];
}

const GREEN: ColorSwatch = { name: "Verde", hex: "#6E6C33" };
const WHITE: ColorSwatch = { name: "Blanco", hex: "#FEF9F2" };

/** Paleta de color sobrepuesta en la fotografía */
const paletteColors = [
  { name: "Peach", hex: "#F2B39A" },
  { name: "Apricot", hex: "#F29C5E" },
  { name: "Golden Hour", hex: "#EBB23F" },
  { name: "Moss", hex: "#8E8C47" },
  { name: "Misty Blue", hex: "#9FB6D3" },
  { name: "Copper", hex: "#C65A32" },
];

/** Reglas de vestimenta / colores reservados */
const dressRules: DressRule[] = [
  { audience: "Hombres", label: "Verde", colors: [GREEN] },
  { audience: "Mujeres", label: "Verde y Blanco", colors: [GREEN, WHITE] },
  { audience: "Novios / Cortejo", label: "Verde y Blanco", colors: [GREEN, WHITE] },
];

export default function DressCodeSection() {
  return (
    <section id="dress-code" className="section-dark-alt relative px-6 pb-24 pt-28 text-marfil sm:pt-36">
      <div className="mx-auto max-w-4xl text-center">
        <SectionHeading title="Dress code" />

        {/* Subtítulo de estilo directamente debajo del título */}
        <FadeUp delay={0.05}>
          <p
            style={{ fontFamily: "'Great Vibes', 'Great Vibes Local', var(--font-great-vibes), cursive" }}
            className="font-title -mt-1 text-5xl sm:text-6xl text-dorado-antiguo-light"
          >
            Soft Elegance
          </p>
        </FadeUp>

        <FadeUp delay={0.1}>
          <p className="mx-auto mt-6 max-w-xl font-sans text-sm sm:text-base leading-relaxed text-marfil/90 font-normal">
            Queremos que te sientas cómodo, elegante y radiante en esta ocasión tan especial. Con mucho cariño,
            te compartimos los colores reservados para cada invitado:
          </p>
        </FadeUp>

        {/* Foto de ambiente con paleta de colores sobrepuesta */}
        <FadeUp delay={0.15}>
          <div className="relative mx-auto mt-8 w-full max-w-3xl aspect-[16/10] sm:aspect-[16/9] max-h-[440px] overflow-hidden rounded-2xl sm:rounded-3xl border border-dorado-antiguo/30 shadow-luxury">
            <SmartImage
              sources={photoSources("dresscode")}
              alt="Ambiente y paleta de la boda"
              loading="lazy"
              className="h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-verde-bosque-deep/40 via-verde-bosque-deep/20 to-verde-bosque-deep/70" />

            <div className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 flex-wrap items-center justify-center gap-2.5 sm:gap-4 md:gap-5 px-4">
              {paletteColors.map((color) => (
                <span
                  key={color.name}
                  title={color.name}
                  className="h-10 w-10 sm:h-14 sm:w-14 md:h-16 md:w-16 rounded-full border-2 border-marfil/90 shadow-[0_8px_24px_rgba(0,0,0,0.6)] transition-transform duration-300 hover:scale-110"
                  style={{ backgroundColor: color.hex }}
                />
              ))}
            </div>
          </div>
        </FadeUp>

        {/* Colores reservados por tipo de invitado */}
        <FadeUp delay={0.2}>
          <h3 className="mt-10 font-serif text-lg sm:text-xl italic text-yute-natural-light">Colores reservados</h3>
          <ul className="mx-auto mt-5 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
            {dressRules.map((rule) => (
              <li
                key={rule.audience}
                className="group rounded-2xl border border-dorado-antiguo/30 bg-verde-bosque-deep/50 px-5 py-6 backdrop-blur-sm transition-colors duration-300 hover:border-dorado-antiguo/60 shadow-sm"
              >
                <div className="flex items-center justify-center gap-2.5" aria-hidden="true">
                  {rule.colors.map((color) => (
                    <span
                      key={color.name}
                      title={color.name}
                      className="h-10 w-10 rounded-full border-2 border-marfil/60 shadow-[0_6px_16px_rgba(0,0,0,0.45)] transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundColor: color.hex }}
                    />
                  ))}
                </div>
                <p className="mt-4 font-sans text-xs sm:text-sm uppercase tracking-[0.2em] text-marfil/75 font-medium">
                  {rule.audience}
                </p>
                <p className="mt-1 font-serif text-2xl text-marfil font-normal">{rule.label}</p>
              </li>
            ))}
          </ul>
        </FadeUp>

        {/* Inspírate: Tablero de Inspiración de Pinterest */}
        <FadeUp delay={0.3}>
          <div className="mx-auto mt-14 max-w-3xl border-t border-dorado-antiguo/20 pt-10">
            <h3
              style={{ fontFamily: "'Great Vibes', 'Great Vibes Local', var(--font-great-vibes), cursive" }}
              className="font-title text-5xl sm:text-6xl text-marfil mb-2"
            >
              Inspírate
            </h3>
            <p className="font-sans text-sm sm:text-base text-marfil/80 font-normal mb-8">
              Ideas y combinaciones en tonos verde y blanco para que luzcas espectacular:
            </p>

            <PinterestBoard shortUrl="https://pin.it/tAEQlpjXc" />
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
