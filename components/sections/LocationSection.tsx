"use client";

import React from "react";
import { BellRing, Navigation } from "lucide-react";
import FadeUp from "../animations/FadeUp";
import SectionHeading from "../ui/SectionHeading";
import SmartImage from "../ui/SmartImage";
import { photoSources } from "@/lib/assets";

export default function LocationSection() {
  return (
    <section id="ubicacion" className="section-dark relative pb-28 pt-24 text-marfil sm:pt-32">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <SectionHeading title="Location" subtitle="Lugar de la celebración" />

        <FadeUp delay={0.1}>
          <p className="mx-auto mt-6 max-w-md font-sans text-xs sm:text-sm leading-relaxed text-marfil/75 font-light">
            Estamos seleccionando un rincón mágico rodeado de naturaleza y calidez para celebrar juntos este gran día.
          </p>
        </FadeUp>
      </div>

      {/* Foto del lugar: encuadre responsivo natural sin cortes forzados */}
      <FadeUp delay={0.2}>
        <div className="fade-edges-y relative mx-auto mt-8 w-full max-w-5xl aspect-[16/10] sm:aspect-[16/9] lg:aspect-[21/10] max-h-[520px] overflow-hidden">
          <SmartImage
            sources={photoSources("ubicacion")}
            alt="Lugar de la celebración"
            loading="lazy"
            className="h-full w-full object-cover object-center"
          />
        </div>
      </FadeUp>

      <div className="mx-auto max-w-2xl px-6 text-center">
        <FadeUp delay={0.1}>
          <h3 className="font-serif text-2xl sm:text-3xl font-light italic text-marfil">
            Hacienda Campestre
          </h3>
          <p className="mx-auto mt-2 max-w-md font-sans text-xs sm:text-sm leading-relaxed text-marfil/65 font-light">
            Próximamente compartiremos las coordenadas exactas y enlaces directos de Google Maps y Waze.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              type="button"
              className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-dorado-antiguo/50 bg-gradient-to-b from-verde-bosque-light to-verde-bosque px-7 py-3 font-sans text-xs uppercase tracking-wider text-marfil shadow-md transition-all hover:border-dorado-antiguo hover:brightness-110 sm:w-auto"
              onClick={() => alert("Te enviaremos la ubicación exacta en cuanto esté revelada.")}
            >
              <BellRing className="h-3.5 w-3.5 text-dorado-antiguo-light" />
              <span>Notificarme al confirmar</span>
            </button>

            <button
              type="button"
              disabled
              className="inline-flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-full border border-marfil/15 px-7 py-3 font-sans text-xs uppercase tracking-wider text-marfil/45 sm:w-auto"
            >
              <Navigation className="h-3.5 w-3.5" />
              <span>Mapa disponible pronto</span>
            </button>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
