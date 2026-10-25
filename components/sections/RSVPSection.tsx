"use client";

import React, { useState, useTransition } from "react";
import confetti from "canvas-confetti";
import { CheckCircle2, XCircle, Send, Heart, AlertCircle, Clock, Users, MessageSquare } from "lucide-react";
import FadeUp from "../animations/FadeUp";
import SectionHeading from "../ui/SectionHeading";
import FlowerDivider from "../ui/FlowerDivider";
import { GuestInvitation, RSVPFormData, GuestStatus } from "@/lib/types";
import { submitRSVP } from "@/app/actions/rsvp";

interface RSVPSectionProps {
  guest: GuestInvitation;
}

export default function RSVPSection({ guest }: RSVPSectionProps) {
  const [isPending, startTransition] = useTransition();
  const [currentGuest, setCurrentGuest] = useState<GuestInvitation>(guest);
  const [estadoSeleccionado, setEstadoSeleccionado] = useState<"Confirmado" | "Cancelado">("Confirmado");
  const [asistentes, setAsistentes] = useState<number>(guest.cupos || 1);
  const [restricciones, setRestricciones] = useState<string>("");
  const [mensaje, setMensaje] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isAlreadyAnswered = currentGuest.estado === "Confirmado" || currentGuest.estado === "Cancelado";

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#B79A53", "#777D62", "#263D30", "#C4A77D", "#F4F0E6"],
      });
    } catch (e) {
      // safe fallback
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const payload: RSVPFormData = {
      id_invitacion: currentGuest.id_invitacion,
      estado: estadoSeleccionado,
      asistentes_confirmados: estadoSeleccionado === "Confirmado" ? asistentes : 0,
      restricciones_alimentarias: restricciones,
      mensaje_novios: mensaje,
    };

    startTransition(async () => {
      const response = await submitRSVP(payload);

      if (response.success) {
        setCurrentGuest((prev) => ({
          ...prev,
          estado: estadoSeleccionado,
          asistentes_confirmados: payload.asistentes_confirmados,
          restricciones_alimentarias: payload.restricciones_alimentarias,
          mensaje_novios: payload.mensaje_novios,
        }));

        if (estadoSeleccionado === "Confirmado") {
          triggerConfetti();
        }
      } else {
        setErrorMessage(response.error || "No pudimos guardar tu respuesta. Intenta nuevamente.");
      }
    });
  };

  return (
    <section id="rsvp" className="section-dark-alt relative px-4 pb-52 pt-44 text-marfil sm:px-6 sm:pb-72 sm:pt-60">
      {/* Flores que separan "Detalles" de la confirmación */}
      <FlowerDivider slot="02-detalles-rsvp" edge="top" />

      <div className="max-w-3xl mx-auto text-center">
        <SectionHeading title="Confirmación" subtitle="Confirma tu asistencia" />

        <FadeUp delay={0.1}>
          <p className="mt-6 font-serif text-3xl sm:text-4xl md:text-5xl font-light tracking-[-0.01em] text-marfil">
            05.12.2026
          </p>
          <p className="mt-1 font-serif text-xl sm:text-2xl font-light text-dorado-antiguo-light">
            4:00 PM
          </p>
          <p className="mx-auto mt-4 max-w-md font-sans text-xs sm:text-sm leading-relaxed text-marfil/75 font-light">
            Por favor, confirma tu presencia completando los siguientes datos.
          </p>
          <p className="mt-2 font-sans text-xs text-dorado-antiguo-light/80 font-light mb-8">
            Confirmar antes del 13 de noviembre de 2026
          </p>
        </FadeUp>

        {/* State 1: Ya Respondido (Confirmado o Cancelado) */}
        {isAlreadyAnswered ? (
          <FadeUp delay={0.3}>
            <div className="bg-marfil-50 text-verde-bosque border-2 border-dorado-antiguo/40 rounded-3xl p-8 sm:p-12 shadow-luxury text-center max-w-2xl mx-auto">
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md ${
                  currentGuest.estado === "Confirmado"
                    ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                    : "bg-stone-200 text-stone-700 border border-stone-300"
                }`}
              >
                {currentGuest.estado === "Confirmado" ? (
                  <CheckCircle2 className="w-9 h-9 text-emerald-700" />
                ) : (
                  <XCircle className="w-9 h-9 text-stone-600" />
                )}
              </div>

              <h3 className="font-serif text-3xl sm:text-4xl text-verde-bosque font-medium mb-3">
                {currentGuest.estado === "Confirmado"
                  ? "¡Gracias por Confirmar tu Asistencia!"
                  : "Agradecemos tu Respuesta"}
              </h3>

              <div className="my-4 px-4 py-2 rounded-xl bg-white/70 border border-yute-natural/30 inline-block text-xs font-sans text-madera-nogal">
                Invitación registrada a nombre de:{" "}
                <strong className="text-verde-bosque">{currentGuest.nombre_grupo}</strong>
              </div>

              <p className="font-sans text-sm sm:text-base text-madera-nogal max-w-lg mx-auto mb-6 leading-relaxed">
                {currentGuest.estado === "Confirmado" ? (
                  <>
                    Nos llena de felicidad saber que nos acompañarás el 5 de diciembre. Hemos reservado{" "}
                    <strong className="text-verde-bosque">
                      {currentGuest.asistentes_confirmados || currentGuest.cupos}{" "}
                      {(currentGuest.asistentes_confirmados || currentGuest.cupos) === 1
                        ? "lugar"
                        : "lugares"}
                    </strong>{" "}
                    para ti y tus acompañantes.
                  </>
                ) : (
                  <>
                    Lamentamos mucho que no puedas acompañarnos físicamente, pero sabemos que tu corazón y buenos deseos estarán con nosotros en este gran día.
                  </>
                )}
              </p>

              {currentGuest.mensaje_novios && (
                <div className="mt-4 p-4 rounded-2xl bg-verde-salvia/10 border border-verde-salvia/25 text-left max-w-md mx-auto">
                  <p className="text-[10px] uppercase tracking-wider text-verde-salvia font-semibold mb-1">
                    Tu Mensaje para los Novios:
                  </p>
                  <p className="font-serif italic text-sm text-verde-bosque">
                    &ldquo;{currentGuest.mensaje_novios}&rdquo;
                  </p>
                </div>
              )}

              <div className="mt-8 pt-6 border-t border-yute-natural/20 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    // Permitir modificar respuesta si fue un error
                    setCurrentGuest((prev) => ({ ...prev, estado: "Pendiente" }));
                  }}
                  className="text-xs font-sans text-verde-salvia hover:text-verde-bosque underline underline-offset-4 transition-colors"
                >
                  ¿Deseas modificar tu respuesta? Haz clic aquí
                </button>
              </div>
            </div>
          </FadeUp>
        ) : (
          /* State 2: Pendiente -> Formulario Interactivo */
          <FadeUp delay={0.3}>
            <div className="bg-marfil-50 text-verde-bosque border border-dorado-antiguo/30 rounded-3xl p-6 sm:p-10 shadow-luxury max-w-2xl mx-auto text-left">
              {/* Guest Banner */}
              <div className="mb-8 p-4 rounded-2xl bg-verde-salvia/10 border border-verde-salvia/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] uppercase font-sans tracking-widest text-verde-salvia font-semibold">
                    Invitación Personalizada
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl text-verde-bosque font-medium">
                    {currentGuest.nombre_grupo}
                  </h3>
                </div>
                <div className="px-3.5 py-1.5 rounded-full bg-marfil border border-dorado-antiguo/40 text-xs font-sans text-verde-bosque font-medium flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-dorado-antiguo" />
                  <span>
                    {currentGuest.cupos} {currentGuest.cupos === 1 ? "cupo disponible" : "cupos disponibles"}
                  </span>
                </div>
              </div>

              {errorMessage && (
                <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs font-sans flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Decision Radio Buttons */}
                <div>
                  <label className="block text-xs font-sans uppercase tracking-wider text-verde-bosque font-semibold mb-3">
                    ¿Asistirás a la boda? *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <label
                      className={`relative flex items-center gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                        estadoSeleccionado === "Confirmado"
                          ? "bg-verde-bosque text-marfil border-verde-bosque shadow-md"
                          : "bg-white/80 text-verde-bosque border-yute-natural/30 hover:border-dorado-antiguo"
                      }`}
                    >
                      <input
                        type="radio"
                        name="asistencia"
                        value="Confirmado"
                        checked={estadoSeleccionado === "Confirmado"}
                        onChange={() => setEstadoSeleccionado("Confirmado")}
                        className="sr-only"
                      />
                      <CheckCircle2
                        className={`w-5 h-5 shrink-0 ${
                          estadoSeleccionado === "Confirmado" ? "text-dorado-antiguo" : "text-verde-salvia"
                        }`}
                      />
                      <div className="flex flex-col">
                        <span className="font-serif text-lg font-medium leading-tight">
                          Sí, asistiré
                        </span>
                        <span
                          className={`text-xs ${
                            estadoSeleccionado === "Confirmado" ? "text-marfil/80" : "text-madera-nogal"
                          }`}
                        >
                          ¡Con alegría y emoción!
                        </span>
                      </div>
                    </label>

                    <label
                      className={`relative flex items-center gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                        estadoSeleccionado === "Cancelado"
                          ? "bg-madera-nogal text-marfil border-madera-nogal shadow-md"
                          : "bg-white/80 text-verde-bosque border-yute-natural/30 hover:border-dorado-antiguo"
                      }`}
                    >
                      <input
                        type="radio"
                        name="asistencia"
                        value="Cancelado"
                        checked={estadoSeleccionado === "Cancelado"}
                        onChange={() => setEstadoSeleccionado("Cancelado")}
                        className="sr-only"
                      />
                      <XCircle
                        className={`w-5 h-5 shrink-0 ${
                          estadoSeleccionado === "Cancelado" ? "text-dorado-antiguo" : "text-madera-nogal/70"
                        }`}
                      />
                      <div className="flex flex-col">
                        <span className="font-serif text-lg font-medium leading-tight">
                          No podré asistir
                        </span>
                        <span
                          className={`text-xs ${
                            estadoSeleccionado === "Cancelado" ? "text-marfil/80" : "text-madera-nogal"
                          }`}
                        >
                          Acompaño de corazón
                        </span>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Cupos selector (only if Confirmado) */}
                {estadoSeleccionado === "Confirmado" && (
                  <div>
                    <label
                      htmlFor="asistentes"
                      className="block text-xs font-sans uppercase tracking-wider text-verde-bosque font-semibold mb-2"
                    >
                      Número de personas que asistirán *
                    </label>
                    <select
                      id="asistentes"
                      value={asistentes}
                      onChange={(e) => setAsistentes(Number(e.target.value))}
                      className="w-full px-4 py-3 rounded-xl border border-yute-natural/40 bg-white/90 text-verde-bosque font-sans text-sm focus:outline-none focus:border-dorado-antiguo transition-colors"
                      required
                    >
                      {Array.from({ length: currentGuest.cupos }, (_, i) => i + 1).map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? "persona" : "personas"}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Dietary restrictions (only if Confirmado) */}
                {estadoSeleccionado === "Confirmado" && (
                  <div>
                    <label
                      htmlFor="restricciones"
                      className="block text-xs font-sans uppercase tracking-wider text-verde-bosque font-semibold mb-2"
                    >
                      Restricciones alimentarias o alergias (Opcional)
                    </label>
                    <input
                      type="text"
                      id="restricciones"
                      value={restricciones}
                      onChange={(e) => setRestricciones(e.target.value)}
                      placeholder="Ej: Vegetariano, intolerante al gluten, mariscos..."
                      className="w-full px-4 py-3 rounded-xl border border-yute-natural/40 bg-white/90 text-verde-bosque font-sans text-sm focus:outline-none focus:border-dorado-antiguo transition-colors placeholder:text-madera-nogal/40"
                    />
                  </div>
                )}

                {/* Message for couple */}
                <div>
                  <label
                    htmlFor="mensaje"
                    className="block text-xs font-sans uppercase tracking-wider text-verde-bosque font-semibold mb-2 flex items-center justify-between"
                  >
                    <span>Dedicatoria o mensaje para los novios</span>
                    <span className="text-[10px] text-madera-nogal font-normal uppercase">Opcional</span>
                  </label>
                  <textarea
                    id="mensaje"
                    rows={3}
                    value={mensaje}
                    onChange={(e) => setMensaje(e.target.value)}
                    placeholder="Escribe tus buenos deseos o algún comentario cariñoso..."
                    className="w-full px-4 py-3 rounded-xl border border-yute-natural/40 bg-white/90 text-verde-bosque font-sans text-sm focus:outline-none focus:border-dorado-antiguo transition-colors placeholder:text-madera-nogal/40 resize-none"
                  />
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isPending}
                    className="w-full py-4 px-6 rounded-full bg-verde-bosque text-marfil font-sans text-xs uppercase tracking-[0.2em] font-semibold hover:bg-verde-bosque-light disabled:opacity-50 transition-all shadow-luxury flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isPending ? (
                      <>
                        <span className="w-4 h-4 border-2 border-dorado-antiguo border-t-transparent rounded-full animate-spin" />
                        <span>Enviando confirmación...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-dorado-antiguo" />
                        <span>Enviar mi Confirmación</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </FadeUp>
        )}
      </div>
    </section>
  );
}
