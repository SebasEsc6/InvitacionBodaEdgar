"use client";

import React, { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Users,
  UtensilsCrossed,
  Sparkles,
  Loader2,
} from "lucide-react";
import confetti from "canvas-confetti";
import FadeUp from "../animations/FadeUp";
import SmartImage from "../ui/SmartImage";
import { photoSources } from "@/lib/assets";
import { GuestInvitation } from "@/lib/types";
import { submitRSVP } from "@/app/actions/rsvp";

interface HeroSectionProps {
  guest?: GuestInvitation;
  guestName?: string;
  cupos?: number;
}

export default function HeroSection({ guest, guestName, cupos }: HeroSectionProps) {
  // Estado local del invitado para confirmación interactiva directa en el Hero
  const [currentGuest, setCurrentGuest] = useState<GuestInvitation | undefined>(guest);
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Sincronizar si cambia el prop guest
  useEffect(() => {
    if (guest) {
      setCurrentGuest(guest);
    }
  }, [guest]);

  const activeGuest =
    currentGuest ||
    (guestName
      ? ({
        id_invitacion: "",
        nombre_grupo: guestName,
        cupos: cupos || 1,
        estado: "Pendiente" as const,
      } as GuestInvitation)
      : undefined);

  const isAnswered = activeGuest?.estado === "Confirmado" || activeGuest?.estado === "Cancelado";

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#B79A53", "#777D62", "#263D30", "#C4A77D", "#F4F0E6"],
      });
    } catch {
      // safe fallback
    }
  };

  const handleConfirm = () => {
    if (!activeGuest?.id_invitacion) return;
    setErrorMessage(null);
    startTransition(async () => {
      const response = await submitRSVP({
        id_invitacion: activeGuest.id_invitacion,
        estado: "Confirmado",
        asistentes_confirmados: activeGuest.cupos,
      });

      if (response.success) {
        setCurrentGuest((prev) =>
          prev
            ? {
              ...prev,
              estado: "Confirmado",
              asistentes_confirmados: prev.cupos,
            }
            : undefined
        );
        triggerConfetti();
      } else {
        setErrorMessage(response.error || "No pudimos guardar tu confirmación. Intenta nuevamente.");
      }
    });
  };

  const handleDecline = () => {
    if (!activeGuest?.id_invitacion) return;
    setErrorMessage(null);
    startTransition(async () => {
      const response = await submitRSVP({
        id_invitacion: activeGuest.id_invitacion,
        estado: "Cancelado",
        asistentes_confirmados: 0,
      });

      if (response.success) {
        setCurrentGuest((prev) =>
          prev
            ? {
              ...prev,
              estado: "Cancelado",
              asistentes_confirmados: 0,
            }
            : undefined
        );
      } else {
        setErrorMessage(response.error || "No fue posible procesar tu respuesta. Intenta nuevamente.");
      }
    });
  };

  // Cuenta regresiva al 05/12/2026 16:00:00
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

        {/* Tarjeta de Confirmación de Asistencia (RSVP) Interactiva en el Hero */}
        {activeGuest && (
          <FadeUp delay={0.3}>
            <div className="mt-8 w-full max-w-xl mx-auto rounded-3xl border border-dorado-antiguo/40 bg-verde-bosque-deep/80 p-6 sm:p-8 backdrop-blur-md shadow-luxury text-center text-marfil">
              {errorMessage && (
                <div className="mb-4 rounded-xl border border-red-300/40 bg-red-950/70 p-3 text-xs text-red-200">
                  {errorMessage}
                </div>
              )}

              {isAnswered ? (
                /* Estado 1: Ya respondido (Confirmado o Cancelado) */
                <div className="space-y-4">
                  <div
                    className={`mx-auto flex h-14 w-14 items-center justify-center rounded-full shadow-md ${activeGuest.estado === "Confirmado"
                      ? "border border-emerald-400/50 bg-emerald-900/60 text-emerald-300"
                      : "border border-stone-400/40 bg-stone-800/60 text-stone-300"
                      }`}
                  >
                    {activeGuest.estado === "Confirmado" ? (
                      <CheckCircle2 className="h-8 w-8 text-emerald-300" />
                    ) : (
                      <XCircle className="h-8 w-8 text-stone-400" />
                    )}
                  </div>

                  <div>
                    <span className="font-sans text-[11px] font-light uppercase tracking-[0.25em] text-yute-natural-light">
                      Invitación de honor
                    </span>
                    <h3 className="mt-1 font-serif text-2xl font-normal text-marfil sm:text-3xl">
                      {activeGuest.nombre_grupo}
                    </h3>
                  </div>

                  <p className="mx-auto max-w-md font-sans text-xs sm:text-sm leading-relaxed text-marfil/80 font-light">
                    {activeGuest.estado === "Confirmado" ? (
                      <>
                        ¡Nos alegra infinitamente saber que nos acompañarás! Hemos reservado{" "}
                        <strong className="text-dorado-antiguo-light font-medium">
                          {activeGuest.asistentes_confirmados || activeGuest.cupos}{" "}
                          {(activeGuest.asistentes_confirmados || activeGuest.cupos) === 1 ? "lugar" : "lugares"}
                        </strong>{" "}
                        para ti con todo nuestro cariño.
                      </>
                    ) : (
                      <>
                        Lamentamos que no puedas acompañarnos físicamente, pero sabemos que tu cariño y bendiciones
                        estarán con nosotros en este día tan especial.
                      </>
                    )}
                  </p>

                  {/* Mesa asignada si ya está confirmada */}
                  {activeGuest.estado === "Confirmado" && activeGuest.mesa && (
                    <div className="mx-auto max-w-sm rounded-2xl border border-dorado-antiguo/30 bg-verde-bosque/50 p-3 text-center">
                      <div className="flex items-center justify-center gap-1.5 text-dorado-antiguo-light">
                        <UtensilsCrossed className="h-3.5 w-3.5" />
                        <span className="font-sans text-[10px] uppercase tracking-widest font-semibold">
                          Ubicación de Mesa
                        </span>
                      </div>
                      <p className="mt-1 font-serif text-base font-normal text-marfil">
                        {activeGuest.mesa}
                      </p>
                    </div>
                  )}

                  <div className="pt-2 flex flex-col items-center gap-2 border-t border-dorado-antiguo/20">
                    <button
                      type="button"
                      disabled={isPending}
                      onClick={() =>
                        setCurrentGuest((prev) => (prev ? { ...prev, estado: "Pendiente" } : undefined))
                      }
                      className="font-sans text-xs text-dorado-antiguo-light underline underline-offset-4 hover:text-marfil transition-colors cursor-pointer"
                    >
                      ¿Deseas modificar tu respuesta? Haz clic aquí
                    </button>

                    <Link
                      href="/"
                      className="inline-flex items-center gap-1.5 font-sans text-xs text-dorado-antiguo-light/80 hover:text-marfil transition-colors pt-1"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Ir a la página principal</span>
                    </Link>
                  </div>
                </div>
              ) : (
                /* Estado 2: Pendiente (Confirmar Asistencia o Declinar) */
                <div className="space-y-4">
                  <div>
                    <span className="font-sans text-[11px] font-light uppercase tracking-[0.25em] text-yute-natural-light">
                      Invitación de honor
                    </span>
                    <h3 className="mt-1 font-serif text-2xl font-normal text-marfil sm:text-3xl">
                      {activeGuest.nombre_grupo}
                    </h3>
                    <div className="mt-2 flex items-center justify-center">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-dorado-antiguo/30 bg-verde-bosque/40 px-3.5 py-1 font-sans text-xs text-dorado-antiguo-light">
                        <Users className="h-3.5 w-3.5 text-dorado-antiguo" />
                        <span>
                          {activeGuest.cupos} {activeGuest.cupos === 1 ? "cupo reservado" : "cupos reservados"}
                        </span>
                      </span>
                    </div>
                  </div>

                  <p className="mx-auto max-w-md font-sans text-xs sm:text-sm leading-relaxed text-marfil/75 font-light">
                    Por favor confírmanos tu asistencia para recibirte con todo preparado con mucho amor:
                  </p>

                  <div className="pt-2 space-y-3">
                    {/* Botón Principal: Confirmar Asistencia */}
                    <button
                      type="button"
                      disabled={isPending}
                      onClick={handleConfirm}
                      className="group relative flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-full border border-dorado-antiguo bg-gradient-to-r from-dorado-antiguo-dark via-dorado-antiguo to-dorado-antiguo-light px-7 py-3 font-sans text-xs font-semibold uppercase tracking-[0.15em] text-verde-bosque-deep shadow-gold transition-all duration-300 hover:scale-[1.02] hover:shadow-luxury active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 cursor-pointer"
                    >
                      {isPending ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin text-verde-bosque-deep" />
                          <span>Guardando respuesta...</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="h-4 w-4 text-verde-bosque-deep transition-transform group-hover:scale-110" />
                          <span>Confirmar Asistencia</span>
                          <Sparkles className="h-3.5 w-3.5 text-verde-bosque-deep/80" />
                        </>
                      )}
                    </button>

                    {/* Botón Secundario: Declinar cortesmente */}
                    <div>
                      <button
                        type="button"
                        disabled={isPending}
                        onClick={handleDecline}
                        className="inline-flex items-center gap-1.5 font-sans text-xs text-marfil/65 transition-colors hover:text-marfil hover:underline underline-offset-4 disabled:opacity-50 cursor-pointer"
                      >
                        <XCircle className="h-3.5 w-3.5 text-marfil/50" />
                        <span>Lamentablemente no podré asistir</span>
                      </button>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-dorado-antiguo/20 flex justify-center">
                    <Link
                      href="/"
                      className="inline-flex items-center gap-1.5 font-sans text-xs text-dorado-antiguo-light/80 hover:text-marfil transition-colors"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Ir a la página principal</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </FadeUp>
        )}

        <FadeUp delay={0.45}>
          <p className="mt-6 max-w-md font-sans text-xs sm:text-sm leading-relaxed text-marfil font-medium">
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
