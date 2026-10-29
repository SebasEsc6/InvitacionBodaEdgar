"use client";

import React, { useState, useEffect, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import confetti from "canvas-confetti";
import {
  CheckCircle2,
  XCircle,
  Users,
  ArrowLeft,
  Sparkles,
  Loader2,
  Check,
  X,
} from "lucide-react";
import SmartImage from "../ui/SmartImage";
import { photoSources } from "@/lib/assets";
import { GuestInvitation } from "@/lib/types";
import { submitRSVP } from "@/app/actions/rsvp";
import { EVENT_DATE_ISO, EVENT_TIME_LABEL } from "@/lib/event";

interface IsolatedInvitationViewProps {
  guest: GuestInvitation;
}

export default function IsolatedInvitationView({ guest }: IsolatedInvitationViewProps) {
  const router = useRouter();
  const [currentGuest, setCurrentGuest] = useState<GuestInvitation>(guest);
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [redirectCountdown, setRedirectCountdown] = useState<number | null>(null);

  // Inicializar el estado de asistencia individual para cada integrante
  const [memberAttendance, setMemberAttendance] = useState<boolean[]>(() => {
    return currentGuest.integrantes.map((member) => {
      if (member.respuesta === "No asiste") return false;
      if (member.respuesta === "Asiste") return true;
      return true; // Por defecto seleccionado para asistir
    });
  });

  // Cuenta regresiva al inicio de la ceremonia
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
    { value: timeLeft.dias, label: "DÍAS" },
    { value: timeLeft.horas, label: "HORAS" },
    { value: timeLeft.minutos, label: "MIN" },
    { value: timeLeft.segundos, label: "SEG" },
  ];

  const isAnswered =
    (currentGuest.estado === "Confirmado" || currentGuest.estado === "Cancelado") && !isEditing;

  const attendingCount = memberAttendance.filter(Boolean).length;
  const totalCount = memberAttendance.length;

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.55 },
        colors: ["#EBB23F", "#C65A32", "#8E8C47", "#F29C5E", "#FBF3E8"],
      });
    } catch {
      // safe fallback
    }
  };

  // Redirección automática a la página principal en 3 segundos tras confirmar asistencia
  useEffect(() => {
    if (redirectCountdown === null) return;

    if (redirectCountdown <= 0) {
      router.push("/");
      return;
    }

    const timer = setTimeout(() => {
      setRedirectCountdown((prev) => (prev !== null ? prev - 1 : null));
    }, 1000);

    return () => clearTimeout(timer);
  }, [redirectCountdown, router]);

  const handleToggleMember = (index: number, willAttend: boolean) => {
    setRedirectCountdown(null);
    setMemberAttendance((prev) => {
      const next = [...prev];
      next[index] = willAttend;
      return next;
    });
  };

  const handleConfirmSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMessage(null);

    startTransition(async () => {
      const response = await submitRSVP({
        id_invitacion: currentGuest.id_invitacion,
        asistencia: memberAttendance,
      });

      if (response.success && response.guest) {
        setCurrentGuest(response.guest);
        setIsEditing(false);
        // Si confirma al menos un asistente, activar confeti e iniciar redirección de 3 segundos
        if (response.guest.asistentes_confirmados && response.guest.asistentes_confirmados > 0) {
          triggerConfetti();
          setRedirectCountdown(3);
        } else {
          // Si todos rechazaron en la confirmación individual, se queda en la página
          setRedirectCountdown(null);
        }
      } else {
        setErrorMessage(
          response.error || "No pudimos guardar tu respuesta. Por favor intenta nuevamente."
        );
      }
    });
  };

  const handleDeclineAll = () => {
    const allDeclined = currentGuest.integrantes.map(() => false);
    setMemberAttendance(allDeclined);
    setErrorMessage(null);
    // Si rechaza, cancelar cualquier temporizador y permanecer en la página de invitación
    setRedirectCountdown(null);

    startTransition(async () => {
      const response = await submitRSVP({
        id_invitacion: currentGuest.id_invitacion,
        asistencia: allDeclined,
      });

      if (response.success && response.guest) {
        setCurrentGuest(response.guest);
        setIsEditing(false);
        setRedirectCountdown(null);
      } else {
        setErrorMessage(
          response.error || "No pudimos guardar tu respuesta. Por favor intenta nuevamente."
        );
      }
    });
  };

  return (
    <div className="relative isolate min-h-screen flex flex-col justify-between overflow-x-hidden bg-verde-bosque-deep text-marfil selection:bg-apricot selection:text-verde-bosque-deep">
      {/* 1. Fotografía de Portada de fondo con degradados envolventes */}
      <SmartImage
        sources={photoSources("portada")}
        alt="Edgar y Camila"
        fetchPriority="high"
        className="fixed inset-0 -z-30 h-full w-full object-cover object-[50%_22%] sm:object-[50%_28%]"
      />
      {/* Capas de oscurecimiento suave para legibilidad basadas en la gama de verde refinado */}
      <div className="fixed inset-0 -z-20 bg-gradient-to-b from-black/40 via-[#424925]/25 to-[#424925]/85" />
      <div className="fixed inset-0 -z-10 bg-radial-vignette opacity-70 pointer-events-none" />

      {/* 2. Contenido Central: Nombres en Cursiva + Tarjeta Translúcida */}
      <main className="relative z-10 w-full max-w-xl mx-auto px-4 sm:px-6 pt-16 sm:pt-20 pb-6 flex flex-col items-center text-center">
        {/* Nombres en Great Vibes estilo caligráfico */}
        <div className="select-none mb-4 sm:mb-6">
          <span
            style={{ fontFamily: "'Great Vibes', 'Great Vibes Local', var(--font-great-vibes), cursive" }}
            className="block text-[clamp(3.8rem,11vw,6rem)] leading-none text-marfil drop-shadow-[0_4px_25px_rgba(0,0,0,0.85)]"
          >
            Edgar
          </span>
          <span
            style={{ fontFamily: "'Great Vibes', 'Great Vibes Local', var(--font-great-vibes), cursive" }}
            className="block -my-1 text-[clamp(2.2rem,6vw,3.5rem)] text-dorado-antiguo-light/95 drop-shadow-[0_2px_15px_rgba(0,0,0,0.8)]"
          >
            y
          </span>
          <span
            style={{ fontFamily: "'Great Vibes', 'Great Vibes Local', var(--font-great-vibes), cursive" }}
            className="block text-[clamp(3.8rem,11vw,6rem)] leading-none text-marfil drop-shadow-[0_4px_25px_rgba(0,0,0,0.85)]"
          >
            Camila
          </span>
        </div>

        {/* Tarjeta Flotante Translúcida con efecto Glassmorphism en tono verde refinado */}
        <div className="w-full rounded-[28px] sm:rounded-3xl border border-dorado-antiguo/35 bg-[#393E20]/85 sm:bg-[#393E20]/90 backdrop-blur-md p-6 sm:p-8 text-marfil shadow-2xl transition-all">
          <span className="font-sans text-[11px] sm:text-xs uppercase tracking-[0.25em] text-dorado-antiguo-light font-medium">
            Invitación de Honor
          </span>

          <h1 className="mt-2 font-serif text-2xl sm:text-3xl md:text-4xl font-medium text-marfil leading-tight">
            {currentGuest.nombre_grupo}
          </h1>

          {/* Badge de cupos reservados */}
          <div className="mt-2.5 inline-flex items-center gap-1.5 rounded-full border border-dorado-antiguo/40 bg-white/5 px-4 py-1 text-xs text-dorado-antiguo-light font-sans">
            <Users className="h-3.5 w-3.5" />
            <span>
              {currentGuest.cupos} {currentGuest.cupos === 1 ? "cupo reservado" : "cupos reservados"}
            </span>
          </div>

          {errorMessage && (
            <div className="mt-4 rounded-xl border border-red-400/40 bg-red-950/60 p-3 text-xs font-sans text-red-200">
              {errorMessage}
            </div>
          )}

          {/* VISTA 1: INVITACIÓN YA RESPONDIDA */}
          {isAnswered ? (
            <div className="mt-5 space-y-5 text-center">
              <div
                className={`mx-auto flex h-14 w-14 items-center justify-center rounded-full shadow-md ${
                  currentGuest.estado === "Confirmado"
                    ? "border border-emerald-400/50 bg-emerald-950/70 text-emerald-300"
                    : "border border-stone-400/40 bg-stone-900/70 text-stone-300"
                }`}
              >
                {currentGuest.estado === "Confirmado" ? (
                  <CheckCircle2 className="h-8 w-8 text-emerald-400" />
                ) : (
                  <XCircle className="h-8 w-8 text-stone-400" />
                )}
              </div>

              <div>
                <h2 className="font-serif text-xl sm:text-2xl font-medium text-marfil">
                  {currentGuest.estado === "Confirmado"
                    ? "¡Respuesta Registrada con Éxito!"
                    : "Agradecemos tu Respuesta"}
                </h2>
                <p className="mt-1.5 font-sans text-xs sm:text-sm text-marfil/80 leading-relaxed font-light">
                  {currentGuest.estado === "Confirmado" ? (
                    <>
                      Nos alegra enormemente saber que nos acompañarás. Aquí puedes ver el detalle
                      registrado:
                    </>
                  ) : (
                    <>
                      Lamentamos que no puedan estar presentes físicamente. ¡Los llevaremos en
                      nuestro corazón!
                    </>
                  )}
                </p>
              </div>

              {/* Notificación de Redirección Automática en 3s (solo al confirmar asistencia) */}
              {redirectCountdown !== null && (
                <div className="mx-auto my-2 w-full rounded-2xl border border-dorado-antiguo/50 bg-emerald-950/85 p-3.5 text-center text-marfil backdrop-blur-md shadow-lg animate-fade-in">
                  <div className="flex items-center justify-center gap-2">
                    <Sparkles className="h-4 w-4 text-dorado-antiguo-light animate-pulse shrink-0" />
                    <p className="font-sans text-xs sm:text-sm font-medium text-marfil">
                      ¡Qué alegría contar contigo! Te llevamos a la página principal en{" "}
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-dorado-antiguo text-verde-bosque-deep font-bold font-serif text-sm">
                        {redirectCountdown}
                      </span>{" "}
                      {redirectCountdown === 1 ? "segundo..." : "segundos..."}
                    </p>
                  </div>
                  <div className="mt-2 flex items-center justify-center gap-4 text-xs font-sans">
                    <Link
                      href="/"
                      className="font-semibold text-dorado-antiguo-light hover:underline"
                    >
                      Ir ahora mismo →
                    </Link>
                    <button
                      type="button"
                      onClick={() => setRedirectCountdown(null)}
                      className="text-marfil/70 hover:text-white underline cursor-pointer"
                    >
                      Quedarme aquí
                    </button>
                  </div>
                </div>
              )}

              {/* Desglose individual de integrantes y su estado */}
              <div className="space-y-2 text-left">
                <span className="block font-sans text-[11px] uppercase tracking-wider text-dorado-antiguo-light/80 font-medium text-center mb-1">
                  Detalle de Asistencia
                </span>

                {currentGuest.integrantes.map((member, idx) => {
                  const attends = member.respuesta === "Asiste";
                  return (
                    <div
                      key={idx}
                      className={`flex items-center justify-between rounded-xl border p-3 transition-colors ${
                        attends
                          ? "border-emerald-500/40 bg-emerald-950/40 text-emerald-100"
                          : "border-stone-500/30 bg-black/30 text-stone-300"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`flex h-6 w-6 items-center justify-center rounded-full font-serif text-xs font-semibold ${
                            attends
                              ? "bg-emerald-700/80 text-white"
                              : "bg-stone-700/80 text-stone-300"
                          }`}
                        >
                          {idx + 1}
                        </span>
                        <span className="font-serif text-base sm:text-lg font-medium text-marfil">
                          {member.nombre}
                        </span>
                      </div>

                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-3 py-0.5 font-sans text-xs font-semibold ${
                          attends
                            ? "bg-emerald-600 text-white"
                            : "bg-stone-700 text-stone-300"
                        }`}
                      >
                        {attends ? (
                          <>
                            <Check className="h-3 w-3 stroke-[3]" />
                            <span>Asiste</span>
                          </>
                        ) : (
                          <>
                            <X className="h-3 w-3 stroke-[3]" />
                            <span>No asiste</span>
                          </>
                        )}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Botón para modificar la respuesta */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setRedirectCountdown(null);
                    setIsEditing(true);
                    setMemberAttendance(
                      currentGuest.integrantes.map((m) => m.respuesta !== "No asiste")
                    );
                  }}
                  className="font-sans text-xs text-dorado-antiguo-light hover:text-white underline underline-offset-4 transition-colors cursor-pointer"
                >
                  ¿Deseas modificar las confirmaciones individuales? Haz clic aquí
                </button>
              </div>

              <div className="pt-3 border-t border-dorado-antiguo/20">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 text-xs font-sans text-marfil/75 hover:text-dorado-antiguo-light transition-colors"
                >
                  <ArrowLeft className="h-3 w-3" />
                  <span>Ir a la página principal</span>
                </Link>
              </div>
            </div>
          ) : (
            /* VISTA 2: FORMULARIO INTERACTIVO CON SELECCIÓN INDIVIDUAL */
            <form onSubmit={handleConfirmSubmit} className="mt-4 space-y-4 text-center">
              <p className="font-sans text-xs sm:text-sm text-marfil/90 leading-relaxed font-light">
                Por favor confírmanos tu asistencia para recibirte con todo preparado con mucho amor:
              </p>

              {/* Lista de Integrantes con selección individual */}
              <div className="space-y-2.5 text-left mt-3">
                {currentGuest.integrantes.map((member, idx) => {
                  const willAttend = memberAttendance[idx] ?? true;

                  return (
                    <div
                      key={idx}
                      className={`rounded-2xl border p-3 transition-all ${
                        willAttend
                          ? "border-dorado-antiguo/40 bg-white/10 shadow-sm"
                          : "border-stone-700/50 bg-black/25 opacity-75"
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                        <div className="flex items-center gap-2.5">
                          <span
                            className={`flex h-7 w-7 items-center justify-center rounded-full font-serif text-xs font-semibold ${
                              willAttend
                                ? "bg-emerald-600/80 text-white"
                                : "bg-stone-700/80 text-stone-300"
                            }`}
                          >
                            {idx + 1}
                          </span>
                          <div>
                            <p className="font-serif text-base sm:text-lg font-medium text-marfil leading-snug">
                              {member.nombre}
                            </p>
                            <p className="font-sans text-[11px] sm:text-xs text-marfil/60">
                              {willAttend ? "Confirmado para asistir" : "No podrá asistir"}
                            </p>
                          </div>
                        </div>

                        {/* Control Segmentado Toggle: Asiste / No Asiste */}
                        <div
                          role="group"
                          aria-label={`Asistencia para ${member.nombre}`}
                          className="inline-flex self-start sm:self-auto rounded-full bg-black/40 p-0.5 border border-white/15"
                        >
                          <button
                            type="button"
                            onClick={() => handleToggleMember(idx, true)}
                            className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 font-sans text-xs font-semibold transition-all cursor-pointer ${
                              willAttend
                                ? "bg-emerald-700 text-white shadow-xs border border-emerald-500/50"
                                : "text-marfil/60 hover:text-white"
                            }`}
                          >
                            <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                            <span>Asiste</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleToggleMember(idx, false)}
                            className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 font-sans text-xs font-semibold transition-all cursor-pointer ${
                              !willAttend
                                ? "bg-stone-700 text-white shadow-xs border border-stone-500/50"
                                : "text-marfil/60 hover:text-white"
                            }`}
                          >
                            <X className="h-3.5 w-3.5 stroke-[2.5]" />
                            <span>No asiste</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Resumen dinámico del conteo */}
              <div className="rounded-xl border border-dorado-antiguo/25 bg-black/30 py-2 px-3 text-center">
                <p className="font-sans text-xs sm:text-sm text-marfil/90 font-light">
                  {attendingCount === 0 ? (
                    <span className="text-stone-300">
                      Ningún integrante asistirá (se liberarán los {totalCount} cupos).
                    </span>
                  ) : (
                    <span>
                      ✨ Confirmando{" "}
                      <strong className="text-dorado-antiguo-light font-semibold">
                        {attendingCount}
                      </strong>{" "}
                      de <strong>{totalCount}</strong>{" "}
                      {totalCount === 1 ? "persona" : "personas"}.
                    </span>
                  )}
                </p>
              </div>

              {/* Botón Principal Dorado "CONFIRMAR ASISTENCIA" */}
              <div className="pt-2 space-y-2">
                <button
                  type="submit"
                  disabled={isPending}
                  className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-[#b58b4b] via-[#d4af37] to-[#e6ca65] px-6 py-3.5 font-sans text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#12221b] shadow-lg transition-all duration-300 hover:brightness-105 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-75 cursor-pointer"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin text-[#12221b]" />
                      <span>Guardando respuesta...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="h-4 w-4 text-[#12221b]" />
                      <span>
                        {attendingCount > 0
                          ? "CONFIRMAR ASISTENCIA"
                          : "ENVIAR RESPUESTA (NO ASISTIREMOS)"}
                      </span>
                      <Sparkles className="h-4 w-4 text-[#12221b]/80" />
                    </>
                  )}
                </button>

                {/* Opción secundaria: Lamentablemente no podré asistir */}
                <button
                  type="button"
                  disabled={isPending}
                  onClick={handleDeclineAll}
                  className="inline-flex items-center justify-center gap-1.5 font-sans text-xs text-marfil/75 hover:text-white transition-colors py-1 cursor-pointer"
                >
                  <XCircle className="h-3.5 w-3.5 text-marfil/60" />
                  <span>Lamentablemente no podré asistir</span>
                </button>

                {isEditing && (
                  <div className="pt-1">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="font-sans text-xs text-marfil/60 hover:text-white underline underline-offset-4 transition-colors cursor-pointer"
                    >
                      Cancelar edición
                    </button>
                  </div>
                )}
              </div>

              {/* Enlace al pie de la tarjeta para volver a la página principal */}
              <div className="pt-4 border-t border-dorado-antiguo/20 flex justify-center">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 text-xs font-sans text-marfil/75 hover:text-dorado-antiguo-light transition-colors"
                >
                  <ArrowLeft className="h-3 w-3" />
                  <span>Ir a la página principal</span>
                </Link>
              </div>
            </form>
          )}
        </div>
      </main>

      {/* 4. Sección Inferior del Hero: Texto de honor, Fecha y Cuenta Regresiva */}
      <footer className="relative z-10 w-full max-w-2xl mx-auto px-4 sm:px-6 pb-20 pt-2 text-center">
        <p className="max-w-md mx-auto font-sans text-xs sm:text-sm md:text-base leading-relaxed text-marfil font-normal drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
          Tenemos el honor de invitarte a celebrar el inicio de nuestra vida juntos.
        </p>

        <p className="mt-2.5 font-serif text-lg sm:text-xl md:text-2xl font-normal text-dorado-antiguo-light drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
          Sábado, 5 de diciembre de 2026 · {EVENT_TIME_LABEL}
        </p>

        {/* Línea divisoria */}
        <div className="my-4 w-24 mx-auto border-t border-dorado-antiguo/30" />

        {/* Cuenta Regresiva */}
        <div className="flex items-center justify-center gap-6 sm:gap-10">
          {countdown.map((item) => (
            <div key={item.label} className="text-center">
              <span className="block font-serif text-2xl sm:text-3xl md:text-4xl font-light leading-none text-marfil tabular-nums drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                {item.value}
              </span>
              <span className="mt-1 block font-sans text-[10px] sm:text-xs uppercase tracking-wider text-dorado-antiguo-light/90 drop-shadow-[0_1px_5px_rgba(0,0,0,0.8)]">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </footer>
    </div>
  );
}
