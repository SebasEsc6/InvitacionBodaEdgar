"use client";

import React, { useEffect, useState } from "react";
import FadeUp from "../animations/FadeUp";
import SmartImage from "../ui/SmartImage";
import { photoSources } from "@/lib/assets";

interface HeroSectionProps {
  guestName?: string;
  cupos?: number;
}

export default function HeroSection({ guestName, cupos }: HeroSectionProps) {
  // Countdown to 05/12/2026 16:00:00
  const [timeLeft, setTimeLeft] = useState<{
    dias: number;
    horas: number;
    minutos: number;
    segundos: number;
  }>({ dias: 0, horas: 0, minutos: 0, segundos: 0 });

  useEffect(() => {
    const targetDate = new Date("2026-12-05T16:00:00");

    const calculateTime = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        const dias = Math.floor(difference / (1000 * 60 * 60 * 24));
        const horas = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutos = Math.floor((difference / 1000 / 60) % 60);
        const segundos = Math.floor((difference / 1000) % 60);
        setTimeLeft({ dias, horas, minutos, segundos });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const countdown = [
    { value: timeLeft.dias, label: "Días" },
    { value: timeLeft.horas, label: "Horas" },
    { value: timeLeft.minutos, label: "Min" },
    { value: timeLeft.segundos, label: "Seg" },
  ];

  return (
    <section className="relative isolate flex min-h-svh flex-col justify-end overflow-hidden bg-verde-bosque-deep text-marfil">
      {/* Foto de portada con encuadre responsivo adaptativo */}
      <SmartImage
        sources={photoSources("portada")}
        alt="Edgar y María"
        fetchPriority="high"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-[50%_20%] sm:object-[50%_28%]"
      />
      {/* Degradado envolvente sutil para máxima legibilidad sin opacar la fotografía */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-verde-bosque-deep/30 via-transparent to-verde-bosque-deep/90" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-t from-verde-bosque-deep via-verde-bosque-deep/60 to-transparent" />

      <div className="mx-auto flex w-full max-w-4xl flex-col items-center px-6 pb-20 pt-20 text-center sm:pb-28 sm:pt-28 md:pb-36 lg:pb-44">
        {/* Nombres principales en la tipografía Great Vibes (cursiva clásica de boda) */}
        <FadeUp delay={0.15}>
          <h1
            style={{ fontFamily: "'Great Vibes', 'Great Vibes Local', var(--font-great-vibes), cursive" }}
            className="font-title text-marfil drop-shadow-[0_4px_30px_rgba(0,0,0,0.7)]"
          >
            <span
              style={{ fontFamily: "'Great Vibes', 'Great Vibes Local', var(--font-great-vibes), cursive" }}
              className="block text-[clamp(4.2rem,15vw,8.5rem)] leading-[1.05]"
            >
              Edgar
            </span>
            <span
              style={{ fontFamily: "'Great Vibes', 'Great Vibes Local', var(--font-great-vibes), cursive" }}
              className="block my-0.5 font-title text-[clamp(2.5rem,8vw,4.5rem)] text-dorado-antiguo-light"
            >
              y
            </span>
            <span
              style={{ fontFamily: "'Great Vibes', 'Great Vibes Local', var(--font-great-vibes), cursive" }}
              className="block text-[clamp(4.2rem,15vw,8.5rem)] leading-[1.05]"
            >
              Camila
            </span>
          </h1>
        </FadeUp>

        {guestName && (
          <FadeUp delay={0.3}>
            <div className="mt-8 rounded-2xl border border-dorado-antiguo/30 bg-verde-bosque-deep/60 px-6 py-3.5 backdrop-blur-md">
              <p className="font-sans text-[11px] font-light uppercase tracking-[0.25em] text-yute-natural-light">
                Invitación de honor
              </p>
              <p className="mt-1 font-serif text-2xl font-normal text-marfil sm:text-3xl">
                {guestName}
              </p>
              {cupos && (
                <p className="mt-1 font-sans text-xs text-dorado-antiguo-light/90">
                  {cupos} {cupos === 1 ? "cupo reservado" : "cupos reservados"}
                </p>
              )}
            </div>
          </FadeUp>
        )}

        <FadeUp delay={0.45}>
          <p className="mt-6 max-w-md font-sans text-xs sm:text-sm leading-relaxed text-marfil/80 font-light">
            Tenemos el honor de invitarte a celebrar el inicio de nuestra vida juntos.
          </p>
          <p className="mt-3 font-serif text-lg sm:text-xl font-normal text-dorado-antiguo-light">
            Sábado, 5 de diciembre de 2026 · 4:00 PM
          </p>
        </FadeUp>

        {/* Cuenta regresiva sobria y centrada */}
        <FadeUp delay={0.6}>
          <div className="mt-8 flex items-center justify-center gap-6 sm:gap-10 border-t border-dorado-antiguo/25 pt-5">
            {countdown.map((item) => (
              <div key={item.label} className="text-center">
                <span className="block font-serif text-2xl sm:text-3xl font-light leading-none text-marfil">
                  {item.value}
                </span>
                <span className="mt-1 block font-sans text-[10px] uppercase tracking-wider text-yute-natural-light/80">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
