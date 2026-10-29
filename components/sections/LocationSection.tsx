"use client";

import React from "react";
import { MapPin, Navigation } from "lucide-react";
import FadeUp from "../animations/FadeUp";
import SectionHeading from "../ui/SectionHeading";
import SmartImage from "../ui/SmartImage";
import FlowerDivider from "../ui/FlowerDivider";
import { photoSources } from "@/lib/assets";
import { EVENT_VENUE } from "@/lib/event";

export default function LocationSection() {
  return (
    <section id="ubicacion" className="section-dark relative pb-28 pt-32 text-marfil sm:pt-36 overflow-visible">
      {/* Separador floral sobrepuesto en la intersección entre Detalles y Ubicación */}
      <FlowerDivider
        src="/images/flores/Separador.png"
        size="full"
        position="intersection"
      />

      <div className="mx-auto max-w-3xl px-6 text-center">
        <SectionHeading title="Ubicación" subtitle="Lugar de la celebración" />

        <FadeUp delay={0.1}>
          <p className="mx-auto mt-6 max-w-xl font-sans text-sm sm:text-base leading-relaxed text-marfil/90 font-normal">
            Que empiece desde un rincón mágico rodeado…
          </p>
        </FadeUp>
      </div>

      {/*
        Contenedor de fondo del lugar (Hacienda el Pilar).
        Para cambiar la imagen, sube `public/images/fotos/ubicacion.jpg` (o .jpeg/.webp/.png).
        El nombre del lugar queda superpuesto sobre la foto con un degradado para legibilidad.
      */}
      <FadeUp delay={0.2}>
        <div
          id="venue-background"
          className="fade-edges-y relative isolate mx-auto mt-8 w-full max-w-5xl aspect-[4/5] sm:aspect-[16/9] lg:aspect-[21/10] max-h-[560px] overflow-hidden"
        >
          <SmartImage
            sources={photoSources("ubicacion")}
            alt={`${EVENT_VENUE}, lugar de la celebración`}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 -z-10 h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-verde-bosque-deep via-verde-bosque-deep/35 to-transparent" />

          <div className="absolute inset-x-0 bottom-[14%] px-6 text-center">
            <MapPin className="mx-auto h-6 w-6 text-dorado-antiguo-light" strokeWidth={1.5} aria-hidden="true" />
            <h3 className="mt-2 font-serif text-3xl sm:text-4xl md:text-5xl font-light italic text-marfil drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
              {EVENT_VENUE}
            </h3>
          </div>
        </div>
      </FadeUp>

      <div className="mx-auto max-w-2xl px-6 text-center">
        <FadeUp delay={0.1}>
          <p className="mx-auto mt-3 max-w-lg font-sans text-sm sm:text-base leading-relaxed text-marfil/80 font-normal">
            Próximamente compartiremos las coordenadas exactas y enlaces directos de Google Maps y Waze.
          </p>

          <div className="mt-8 flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-dorado-antiguo/40 bg-verde-bosque-deep/80 px-7 py-3 font-sans text-xs sm:text-sm uppercase tracking-wider text-dorado-antiguo-light shadow-sm backdrop-blur-sm font-medium">
              <Navigation className="h-4 w-4 text-dorado-antiguo" />
              <span>Mapa disponible pronto</span>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
