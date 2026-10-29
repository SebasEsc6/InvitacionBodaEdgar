"use client";

import React, { useState, useTransition } from "react";
import confetti from "canvas-confetti";
import { CheckCircle2, XCircle, Users, Sparkles, Loader2, UtensilsCrossed } from "lucide-react";
import FadeUp from "../animations/FadeUp";
import SectionHeading from "../ui/SectionHeading";
import FlowerDivider from "../ui/FlowerDivider";
import { GuestInvitation } from "@/lib/types";
import { submitRSVP } from "@/app/actions/rsvp";
import { EVENT_DATE_LABEL, EVENT_TIME_LABEL, RSVP_DEADLINE_LABEL } from "@/lib/event";

interface RSVPSectionProps {
  guest: GuestInvitation;
}

export default function RSVPSection({ guest }: RSVPSectionProps) {
  const [isPending, startTransition] = useTransition();
  const [currentGuest, setCurrentGuest] = useState<GuestInvitation>(guest);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isAnswered = currentGuest.estado === "Confirmado" || currentGuest.estado === "Cancelado";

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#EBB23F", "#C65A32", "#8E8C47", "#F29C5E", "#FBF3E8"],
      });
    } catch {
      // safe fallback
    }
  };

  const handleConfirm = () => {
    setErrorMessage(null);
    startTransition(async () => {
      const response = await submitRSVP({
        id_invitacion: currentGuest.id_invitacion,
        asistencia: Array(currentGuest.integrantes.length).fill(true),
      });

      if (response.success && response.guest) {
        setCurrentGuest(response.guest);
        triggerConfetti();
      } else {
        setErrorMessage(response.error || "No pudimos guardar tu confirmación. Intenta nuevamente.");
      }
    });
  };

  const handleDecline = () => {
    setErrorMessage(null);
    startTransition(async () => {
      const response = await submitRSVP({
        id_invitacion: currentGuest.id_invitacion,
        asistencia: Array(currentGuest.integrantes.length).fill(false),
      });

      if (response.success && response.guest) {
        setCurrentGuest(response.guest);
      } else {
        setErrorMessage(response.error || "No fue posible procesar tu solicitud. Intenta nuevamente.");
      }
    });
  };

  return (
    <section id="rsvp" className="section-dark-alt relative text-marfil overflow-visible">
      {/* Separador floral sobrepuesto en la intersección con la sección anterior */}
      <FlowerDivider
        src="/images/flores/Separador.png"
        size="full"
        position="intersection"
      />

      <div className="mx-auto max-w-3xl px-6 pb-24 pt-32 text-center sm:pb-32 sm:pt-36 md:pt-24 lg:pt-28">
        <SectionHeading title="Confirmación" subtitle="Reserva de honor" />

        <FadeUp delay={0.1}>
          <p className="mt-6 font-serif text-3xl sm:text-4xl md:text-5xl font-light tracking-[-0.01em] text-marfil">
            {EVENT_DATE_LABEL}
          </p>
          <p className="mt-1 font-serif text-xl sm:text-2xl font-light text-dorado-antiguo-light">
            {EVENT_TIME_LABEL}
          </p>
          <p className="mx-auto mt-4 max-w-md font-sans text-xs sm:text-sm leading-relaxed text-marfil/75 font-light">
            Nos llena de ilusión compartir este paso trascendental con las personas que más amamos.
          </p>
          <p className="mt-2 font-sans text-xs text-dorado-antiguo-light/85 font-light mb-8">
            Agradecemos confirmar tu asistencia antes del {RSVP_DEADLINE_LABEL}
          </p>
        </FadeUp>

        {errorMessage && (
          <FadeUp>
            <div className="mx-auto mb-6 max-w-md rounded-2xl border border-red-300/40 bg-red-950/60 p-4 text-xs font-sans text-red-200">
              {errorMessage}
            </div>
          </FadeUp>
        )}

        {/* Estado 1: Ya Respondido (Confirmado o Cancelado) */}
        {isAnswered ? (
          <FadeUp delay={0.25}>
            <div className="mx-auto max-w-2xl rounded-3xl border-2 border-dorado-antiguo/40 bg-marfil-50 p-8 text-center text-verde-bosque shadow-luxury sm:p-12">
              <div
                className={`mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full shadow-md ${
                  currentGuest.estado === "Confirmado"
                    ? "border border-emerald-300 bg-emerald-100 text-emerald-800"
                    : "border border-stone-300 bg-stone-200 text-stone-700"
                }`}
              >
                {currentGuest.estado === "Confirmado" ? (
                  <CheckCircle2 className="h-9 w-9 text-emerald-700" />
                ) : (
                  <XCircle className="h-9 w-9 text-stone-600" />
                )}
              </div>

              <h3 className="font-serif text-3xl font-medium text-verde-bosque sm:text-4xl">
                {currentGuest.estado === "Confirmado"
                  ? "¡Gracias por Confirmar tu Asistencia!"
                  : "Agradecemos tu Respuesta"}
              </h3>

              <div className="my-4 inline-block rounded-xl border border-yute-natural/30 bg-white/80 px-5 py-2 font-sans text-xs text-madera-nogal shadow-xs">
                Invitación a nombre de:{" "}
                <strong className="text-verde-bosque font-medium">{currentGuest.nombre_grupo}</strong>
              </div>

              <p className="mx-auto mb-6 max-w-lg font-sans text-sm leading-relaxed text-madera-nogal sm:text-base">
                {currentGuest.estado === "Confirmado" ? (
                  <>
                    Nos alegra infinitamente saber que nos acompañarás el 5 de diciembre. Hemos reservado{" "}
                    <strong className="text-verde-bosque font-semibold">
                      {currentGuest.asistentes_confirmados ?? currentGuest.cupos}{" "}
                      {(currentGuest.asistentes_confirmados ?? currentGuest.cupos) === 1 ? "lugar" : "lugares"}
                    </strong>{" "}
                    con todo nuestro cariño.
                  </>
                ) : (
                  <>
                    Lamentamos que no puedas estar presente físicamente, pero sabemos que tu cariño y bendiciones nos
                    acompañarán en este nuevo comienzo.
                  </>
                )}
              </p>

              {/* Información de mesa si está confirmada y asignada */}
              {currentGuest.estado === "Confirmado" && (
                <div className="mx-auto mt-6 max-w-md rounded-2xl border border-dorado-antiguo/30 bg-marfil p-4 text-center">
                  <div className="flex items-center justify-center gap-2 text-dorado-antiguo-dark">
                    <UtensilsCrossed className="h-4 w-4" />
                    <span className="font-sans text-[11px] uppercase tracking-widest font-semibold">
                      Ubicación de Mesa
                    </span>
                  </div>
                  <p className="mt-1 font-serif text-lg font-medium text-verde-bosque sm:text-xl">
                    {currentGuest.mesa || "En proceso de asignación"}
                  </p>
                  <p className="mt-1 font-sans text-[11px] text-madera-nogal/70">
                    {currentGuest.mesa
                      ? "Tu lugar te estará esperando al inicio de la recepción."
                      : "Te indicaremos tu mesa asignada más cerca de la fecha."}
                  </p>
                </div>
              )}

              {/* Botón para rectificar o modificar */}
              <div className="mt-8 border-t border-yute-natural/20 pt-6">
                <button
                  type="button"
                  disabled={isPending}
                  onClick={() => setCurrentGuest((prev) => ({ ...prev, estado: "Pendiente" }))}
                  className="font-sans text-xs text-verde-salvia underline underline-offset-4 transition-colors hover:text-verde-bosque disabled:opacity-50 cursor-pointer"
                >
                  ¿Deseas modificar tu respuesta? Haz clic aquí
                </button>
              </div>
            </div>
          </FadeUp>
        ) : (
          /* Estado 2: Pendiente -> Botón Directo de Confirmación */
          <FadeUp delay={0.25}>
            <div className="mx-auto max-w-xl rounded-3xl border border-dorado-antiguo/35 bg-marfil-50 p-6 text-center text-verde-bosque shadow-luxury sm:p-10">
              {/* Encabezado del Invitado */}
              <div className="mb-6 rounded-2xl border border-verde-salvia/25 bg-verde-salvia/10 p-5">
                <span className="font-sans text-[11px] uppercase tracking-widest font-semibold text-verde-salvia-dark">
                  Invitación de Honor
                </span>
                <h3 className="mt-1 font-serif text-2xl font-medium text-verde-bosque sm:text-3xl">
                  {currentGuest.nombre_grupo}
                </h3>
                <div className="mt-3 flex items-center justify-center">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-dorado-antiguo/40 bg-marfil px-4 py-1.5 font-sans text-xs font-medium text-verde-bosque shadow-xs">
                    <Users className="h-3.5 w-3.5 text-dorado-antiguo" />
                    <span>
                      {currentGuest.cupos} {currentGuest.cupos === 1 ? "cupo disponible" : "cupos disponibles"}
                    </span>
                  </span>
                </div>
              </div>

              <p className="mx-auto mb-8 max-w-md font-sans text-xs sm:text-sm leading-relaxed text-madera-nogal font-light">
                Para nosotros es muy importante contar con tu presencia. Por favor confírmanos haciendo clic en el
                botón a continuación:
              </p>

              {/* Botón Principal: Confirmar Asistencia Directo */}
              <div className="space-y-4">
                <button
                  type="button"
                  disabled={isPending}
                  onClick={handleConfirm}
                  className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-full border border-dorado-antiguo/60 bg-gradient-to-r from-emerald-800 via-verde-bosque to-emerald-900 px-8 py-4.5 font-sans text-sm font-medium uppercase tracking-wider text-marfil shadow-luxury transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 cursor-pointer"
                >
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                  {isPending ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin text-dorado-antiguo-light" />
                      <span>Guardando tu confirmación...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="h-5 w-5 text-dorado-antiguo-light transition-transform group-hover:scale-110" />
                      <span>Confirmar mi Asistencia</span>
                      <Sparkles className="h-4 w-4 text-dorado-antiguo-light opacity-80" />
                    </>
                  )}
                </button>

                {/* Opción secundaria para declinar cortésmente */}
                <div>
                  <button
                    type="button"
                    disabled={isPending}
                    onClick={handleDecline}
                    className="mt-2 inline-flex items-center gap-1.5 font-sans text-xs text-madera-nogal/80 transition-colors hover:text-verde-bosque hover:underline underline-offset-4 disabled:opacity-50 cursor-pointer"
                  >
                    <XCircle className="h-3.5 w-3.5 text-madera-nogal/60" />
                    <span>Lamentablemente no podré asistir</span>
                  </button>
                </div>
              </div>
            </div>
          </FadeUp>
        )}
      </div>
    </section>
  );
}
