"use client";

import React from "react";
import FadeUp from "../animations/FadeUp";
import SectionHeading from "../ui/SectionHeading";
import TornEdge from "../ui/TornEdge";
import FlowerAccent from "../ui/FlowerAccent";

interface TimelineEvent {
  time: string;
  title: string;
  description?: string;
}

const events: TimelineEvent[] = [
  { time: "3:00 PM", title: "Ceremonia" },
  { time: "5:00 PM", title: "Tentempié" },
  { time: "6:00 PM", title: "Recepción de fiesta" },
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

      <div className="relative z-10 mx-auto max-w-[300px] sm:max-w-xl px-2 sm:px-10">
        <SectionHeading
          title="Cronograma"
          subtitle="Programa del gran día"
          tone="onLight"
          className="mb-12 sm:mb-14"
        />

        <ol className="space-y-7 sm:space-y-9 text-center">
          {events.map((item, index) => (
            <li key={item.time}>
              <FadeUp delay={index * 0.05}>
                <p className="font-serif text-4xl sm:text-5xl md:text-6xl font-light leading-none tracking-[-0.02em] text-verde-bosque">
                  {item.time}
                </p>
                <h3 className="mt-2.5 font-serif text-2xl sm:text-3xl font-medium text-madera-nogal">
                  {item.title}
                </h3>
                {item.description && (
                  <p className="mx-auto mt-2 max-w-sm font-sans text-sm sm:text-base leading-relaxed text-madera-nogal font-normal">
                    {item.description}
                  </p>
                )}
                {index < events.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="mx-auto mt-7 sm:mt-9 block h-10 w-px bg-gradient-to-b from-apricot-dark/70 to-transparent"
                  />
                )}
              </FadeUp>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
