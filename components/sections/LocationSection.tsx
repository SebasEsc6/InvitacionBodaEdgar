"use client";

import React from "react";
import { MapPin, Navigation, ExternalLink } from "lucide-react";
import FadeUp from "../animations/FadeUp";
import SectionHeading from "../ui/SectionHeading";
import SmartImage from "../ui/SmartImage";
import FlowerDivider from "../ui/FlowerDivider";
import { photoSources } from "@/lib/assets";
import {
  EVENT_VENUE,
  GOOGLE_MAPS_URL,
  WAZE_URL,
  VENUE_EMBED_MAP_URL,
} from "@/lib/event";

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
          <p className="mx-auto mt-6 max-w-xl font-sans text-sm sm:text-base leading-relaxed text-marfil font-normal drop-shadow-[0_1px_3px_rgba(0,0,0,0.25)]">
            Un rincón mágico rodeado de naturaleza y calidez para celebrar juntos este gran día.
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
            <MapPin className="mx-auto h-5 w-5 text-dorado-antiguo-light" strokeWidth={1.5} aria-hidden="true" />
            <h3 className="mt-2 font-serif text-3xl sm:text-4xl md:text-5xl font-light italic text-marfil drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
              {EVENT_VENUE}
            </h3>
          </div>
        </div>
      </FadeUp>

      <div className="mx-auto max-w-3xl px-6 text-center">
        <FadeUp delay={0.1}>
          <p className="mx-auto mt-4 max-w-lg font-sans text-xs sm:text-sm leading-relaxed text-marfil font-normal drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)]">
            Elige tu aplicación de navegación favorita para trazar tu ruta y llegar con total tranquilidad:
          </p>

          {/* Botones de navegación directa a Google Maps y Waze */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-5">
            <a
              href={GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-full border border-dorado-antiguo/50 bg-verde-bosque-dark/85 px-6 py-3.5 font-sans text-xs sm:text-sm font-semibold uppercase tracking-wider text-marfil backdrop-blur-md shadow-gold transition-all duration-300 hover:bg-verde-bosque-dark hover:border-dorado-antiguo hover:scale-105 active:scale-95 cursor-pointer"
            >
              <MapPin className="h-4 w-4 text-dorado-antiguo-light transition-transform duration-300 group-hover:scale-110" />
              <span>Abrir en Google Maps</span>
              <ExternalLink className="h-3.5 w-3.5 text-dorado-antiguo-light/80" />
            </a>

            <a
              href={WAZE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-full border border-dorado-antiguo/50 bg-verde-bosque-dark/85 px-6 py-3.5 font-sans text-xs sm:text-sm font-semibold uppercase tracking-wider text-marfil backdrop-blur-md shadow-gold transition-all duration-300 hover:bg-verde-bosque-dark hover:border-dorado-antiguo hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Navigation className="h-4 w-4 text-dorado-antiguo-light transition-transform duration-300 group-hover:scale-110" />
              <span>Abrir en Waze</span>
              <ExternalLink className="h-3.5 w-3.5 text-dorado-antiguo-light/80" />
            </a>
          </div>

          {/* Mapa interactivo embebido */}
          <div className="relative mx-auto mt-8 w-full max-w-3xl overflow-hidden rounded-2xl sm:rounded-3xl border border-dorado-antiguo/35 shadow-luxury bg-verde-bosque-dark/40 backdrop-blur-md">
            <iframe
              src={VENUE_EMBED_MAP_URL}
              title="Mapa de ubicación - Hacienda el Pilar"
              width="100%"
              height="340"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-[260px] sm:h-[320px] md:h-[360px]"
            />
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
