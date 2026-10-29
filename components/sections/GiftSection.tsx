"use client";

import React from "react";
import { Mail } from "lucide-react";
import FadeUp from "../animations/FadeUp";
import SectionHeading from "../ui/SectionHeading";
import TornEdge from "../ui/TornEdge";
import FlowerAccent from "../ui/FlowerAccent";

export default function GiftSection() {
  return (
    <section id="regalo" className="bg-paper-beige relative z-10 px-4 pt-20 sm:pt-28 pb-40 sm:pb-48 md:pb-28 lg:pb-32">
      <TornEdge position="top" seed={41} />
      <TornEdge position="bottom" seed={59} />

      {/*
        Flores laterales sutiles que abrazan los márgenes sin competir con la información
      */}
      <FlowerAccent
        side="left"
        src="/images/flores/LateralIzq.png"
        size="md"
        offset="subtle"
        className="top-24 sm:top-28"
      />
      <FlowerAccent
        side="right"
        src="/images/flores/LateralDer.png"
        size="md"
        offset="subtle"
        className="bottom-20 sm:bottom-28"
      />

      <div className="relative z-10 mx-auto max-w-xl px-6 sm:px-10 text-center">
        <SectionHeading title="Detalles" tone="onLight" />

        <FadeUp delay={0.1}>
          {/* Título destacado: Lluvia de sobres (jerarquía principal de la sección) */}
          <div className="mt-6 flex items-center justify-center gap-3" aria-hidden="true">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-copper/60" />
            <Mail className="h-5 w-5 text-copper" strokeWidth={1.5} />
            <span className="h-px w-10 bg-gradient-to-l from-transparent to-copper/60" />
          </div>
          <h3
            style={{ fontFamily: "'Great Vibes', 'Great Vibes Local', var(--font-great-vibes), cursive" }}
            className="font-title mt-2 text-6xl sm:text-7xl md:text-8xl leading-tight text-copper"
          >
            Lluvia de sobres
          </h3>

          <p className="mt-3 font-serif text-lg sm:text-xl italic font-normal text-verde-bosque/90">
            Tu presencia es nuestro mayor regalo
          </p>

          <p className="mx-auto mt-6 max-w-xl font-sans text-base sm:text-lg leading-relaxed text-madera-nogal font-normal">
            Más que un regalo, nuestro mayor anhelo es compartir la felicidad de este día tan especial con quienes han
            sido parte de nuestra historia y han dejado huella en nuestros corazones. Su presencia será el regalo más
            valioso, pues no hay mayor alegría que celebrar el inicio de esta nueva etapa rodeados del cariño de las
            personas que hacen parte de nuestras vidas.
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
