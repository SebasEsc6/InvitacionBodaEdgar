"use client";

import React from "react";
import { Navigation } from "lucide-react";
import FadeUp from "../animations/FadeUp";
import SectionHeading from "../ui/SectionHeading";
import SmartImage from "../ui/SmartImage";
import FlowerDivider from "../ui/FlowerDivider";
import { photoSources } from "@/lib/assets";

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

          <div className="mt-8 flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-dorado-antiguo/30 bg-verde-bosque-deep/60 px-6 py-2.5 font-sans text-xs uppercase tracking-wider text-dorado-antiguo-light shadow-sm backdrop-blur-sm">
              <Navigation className="h-3.5 w-3.5 text-dorado-antiguo" />
              <span>Mapa disponible pronto</span>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
