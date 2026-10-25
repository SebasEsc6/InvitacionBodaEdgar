"use client";

import React from "react";
import FadeUp from "../animations/FadeUp";
import SectionHeading from "../ui/SectionHeading";
import SmartImage from "../ui/SmartImage";
import { photoSources } from "@/lib/assets";

const reservedColors = [
  { name: "Marfil", hex: "#F4F0E6", description: "Reservado para la novia" },
  { name: "Beige", hex: "#C4A77D", description: "Reservado para la novia" },
  { name: "Verde Salvia", hex: "#777D62", description: "Reservado para el cortejo" },
  { name: "Verde Bosque", hex: "#263D30", description: "Reservado para el novio y cortejo" },
];

const suggestedPalettes = [
  { name: "Terracota & Canela", hex: "#C86D51" },
  { name: "Dorado & Champaña", hex: "#D4BC7B" },
  { name: "Azul Petróleo", hex: "#1F384C" },
  { name: "Rosa Palo & Malva", hex: "#C79C9E" },
  { name: "Ocre Cálido", hex: "#D49B44" },
];

export default function DressCodeSection() {
  return (
    <section id="dress-code" className="section-dark-alt relative px-6 pb-24 pt-28 text-marfil sm:pt-36">
      <div className="mx-auto max-w-4xl text-center">
        <SectionHeading title="Dress code" subtitle="Elegante / Formal" />

        <FadeUp delay={0.1}>
          <p className="mx-auto mt-6 max-w-xl font-sans text-xs sm:text-sm leading-relaxed text-marfil/75 font-light">
            Queremos que te sientas cómodo, elegante y radiante en esta ocasión tan especial. Con mucho cariño, te
            pedimos reservar los tonos <strong className="font-normal text-marfil">verdes</strong> y{" "}
            <strong className="font-normal text-marfil">blancos / beige / marfil</strong> para los novios y el cortejo
            nupcial.
          </p>
        </FadeUp>

        {/* Foto de ambiente con encuadre responsivo impecable (sin cortes bruscos) */}
        <FadeUp delay={0.2}>
          <div className="relative mx-auto mt-10 w-full max-w-3xl aspect-[16/10] sm:aspect-[16/9] max-h-[480px] overflow-hidden rounded-md shadow-2xl">
            <SmartImage
              sources={photoSources("dresscode")}
              alt="Ambiente y mesa del banquete"
              loading="lazy"
              className="h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-verde-bosque-deep/40 via-verde-bosque-deep/20 to-verde-bosque-deep/75" />

            <div className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 flex-wrap items-center justify-center gap-3 sm:gap-6 px-4">
              {reservedColors.map((color) => (
                <span
                  key={color.name}
                  title={color.name}
                  className="h-12 w-12 sm:h-20 sm:w-20 rounded-full border-2 border-marfil/60 shadow-[0_8px_24px_rgba(0,0,0,0.5)] transition-transform duration-300 hover:scale-110"
                  style={{ backgroundColor: color.hex }}
                />
              ))}
            </div>
          </div>
        </FadeUp>

        {/* Leyenda sobria */}
        <FadeUp delay={0.3}>
          <p className="mt-8 font-serif text-base sm:text-lg italic text-dorado-antiguo-light">
            Colores reservados para los novios y el cortejo
          </p>
          <div className="mx-auto mt-4 grid max-w-2xl grid-cols-2 gap-4 sm:grid-cols-4">
            {reservedColors.map((color) => (
              <div key={color.name} className="text-center">
                <p className="font-serif text-lg text-marfil font-light">{color.name}</p>
                <p className="mt-0.5 font-sans text-[11px] leading-snug text-marfil/60 font-light">{color.description}</p>
              </div>
            ))}
          </div>
        </FadeUp>

        {/* Tonos sugeridos */}
        <FadeUp delay={0.4}>
          <div className="mx-auto mt-12 max-w-xl border-t border-dorado-antiguo/20 pt-8">
            <p className="font-serif text-xl sm:text-2xl font-light italic text-marfil">
              Inspiración de tonos sugeridos
            </p>
            <p className="mt-1.5 font-sans text-xs text-marfil/60 font-light">
              Tonalidades cálidas, tierras, joyas o neutros oscuros lucirán hermosas.
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5">
              {suggestedPalettes.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center gap-2 rounded-full border border-marfil/15 bg-marfil/5 px-3 py-1.5 font-sans text-xs text-marfil/85 font-light"
                >
                  <span
                    className="h-3 w-3 rounded-full border border-white/20"
                    style={{ backgroundColor: item.hex }}
                  />
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
