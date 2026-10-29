"use client";

import React, { useEffect, useState } from "react";
import FadeUp from "../animations/FadeUp";
import SmartImage from "../ui/SmartImage";
import { photoSources } from "@/lib/assets";
import { EVENT_DATE_ISO, EVENT_TIME_LABEL } from "@/lib/event";

/**
 * Portada de la landing.
 * La confirmación de asistencia (RSVP) ya no vive aquí: se abre en una vista aislada
 * en `/invite/[id]` (ver `components/rsvp/InvitationView.tsx`).
 */
export default function HeroSection() {
  // Cuenta regresiva al inicio de la ceremonia (05/12/2026 3:00 PM)
  const [timeLeft, setTimeLeft] = useState<{
    dias: number;
    horas: number;
    minutos: number;
    segundos: number;
  }>({ dias: 0, horas: 0, minutos: 0, segundos: 0 });

  useEffect(() => {
    const targetDate = new Date(EVENT_DATE_ISO);

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
        alt="Edgar y Camila"
        fetchPriority="high"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-[50%_20%] sm:object-[50%_28%]"
      />
      {/* Degradado envolvente sutil para máxima legibilidad sin opacar la fotografía */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-verde-bosque-deep/30 via-transparent to-verde-bosque-deep/90" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-t from-verde-bosque-deep via-verde-bosque-deep/60 to-transparent" />

      <div className="mx-auto flex w-full max-w-4xl flex-col items-center px-6 pt-20 pb-32 text-center sm:pt-28 sm:pb-36 md:pt-36 md:pb-32 lg:pt-40 lg:pb-36">
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

        <FadeUp delay={0.45}>
          <p className="mt-6 max-w-lg font-sans text-sm sm:text-base md:text-lg leading-relaxed text-marfil font-normal">
            Tenemos el honor de invitarte a celebrar el inicio de nuestra vida juntos.
          </p>
          <p className="mt-3 font-serif text-xl sm:text-2xl font-normal text-dorado-antiguo-light">
            Sábado, 5 de diciembre de 2026 · {EVENT_TIME_LABEL}
          </p>
        </FadeUp>

        {/* Cuenta regresiva sobria y centrada */}
        <FadeUp delay={0.6}>
          <div className="mt-8 flex items-center justify-center gap-6 sm:gap-10 border-t border-dorado-antiguo/25 pt-5">
            {countdown.map((item) => (
              <div key={item.label} className="text-center">
                <span className="block font-serif text-3xl sm:text-4xl font-light leading-none text-marfil tabular-nums">
                  {item.value}
                </span>
                <span className="mt-1.5 block font-sans text-xs uppercase tracking-wider text-yute-natural-light">
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
