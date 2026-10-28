"use client";

import React from "react";
import FadeUp from "../animations/FadeUp";
import SectionHeading from "../ui/SectionHeading";
import TornEdge from "../ui/TornEdge";
import FlowerAccent from "../ui/FlowerAccent";

interface TimelineEvent {
  time: string;
  title: string;
  description: string;
}

const events: TimelineEvent[] = [
  {
    time: "4:00 PM",
    title: "Recepción de Invitados",
    description: "Bienvenida y cóctel ligero mientras nos preparamos para el inicio.",
  },
  {
    time: "4:30 PM",
    title: "Ceremonia Nupcial",
    description: "El momento más sagrado: nuestros votos y el inicio de nuestro matrimonio.",
  },
  {
    time: "6:00 PM",
    title: "Cóctel & Fotos",
    description: "Brindis al atardecer, aperitivos y fotografías con los recién casados.",
  },
  {
    time: "7:30 PM",
    title: "Cena & Brindis de Honor",
    description: "Una exquisita experiencia gastronómica compartida en familia.",
  },
  {
    time: "9:00 PM",
    title: "Apertura de Baile & Fiesta",
    description: "Música en vivo, celebración y momentos inolvidables en la pista.",
  },
];

export default function TimelineSection() {
  return (
    <section id="cronograma" className="bg-paper-beige relative z-10 px-4 py-20 sm:px-8 sm:py-28">
      <TornEdge position="top" seed={7} />
      <TornEdge position="bottom" seed={23} />

      {/*
        Flores laterales calibradas para móvil:
        - Asoman en los márgenes exteriores sin pisar el texto en pantallas pequeñas
      */}
      <FlowerAccent
        side="left"
        src="/images/flores/LateralIzq.png"
        size="md"
        offset="balanced"
        className="top-36 sm:top-44 md:top-52"
      />
      <FlowerAccent
        side="right"
        src="/images/flores/LateralDer.png"
        size="md"
        offset="balanced"
        className="top-[54%] sm:top-[56%]"
      />

      <div className="relative z-10 mx-auto max-w-[270px] sm:max-w-lg px-2 sm:px-10">
        <SectionHeading
          title="Cronograma"
          subtitle="Programa del gran día"
          tone="onLight"
          className="mb-12 sm:mb-14"
        />

        <ol className="space-y-10 sm:space-y-12 text-center">
          {events.map((item, index) => (
            <li key={item.time}>
              <FadeUp delay={index * 0.05}>
                <p className="font-serif text-3xl sm:text-4xl md:text-5xl font-light leading-none tracking-[-0.02em] text-verde-bosque">
                  {item.time}
                </p>
                <h3 className="mt-2 font-serif text-xl sm:text-2xl font-normal text-verde-bosque">
                  {item.title}
                </h3>
                <p className="mx-auto mt-1.5 max-w-xs font-sans text-xs leading-relaxed text-madera-nogal sm:max-w-sm sm:text-sm font-light">
                  {item.description}
                </p>
              </FadeUp>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
