"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import {
  Search,
  UtensilsCrossed,
  Users,
  CheckCircle2,
  Clock,
  XCircle,
  ArrowRight,
  Sparkles,
  Loader2,
  Info,
} from "lucide-react";
import FadeUp from "../animations/FadeUp";
import SectionHeading from "../ui/SectionHeading";
import FlowerDivider from "../ui/FlowerDivider";
import { GuestInvitation } from "@/lib/types";
import { searchGuestsAction } from "@/app/actions/search";

export default function TableSearchSection() {
  const [query, setQuery] = useState("");
  const [isPending, startTransition] = useTransition();
  const [hasSearched, setHasSearched] = useState(false);
  const [results, setResults] = useState<GuestInvitation[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanQuery = query.trim();
    if (!cleanQuery) return;

    setErrorMessage(null);
    startTransition(async () => {
      const response = await searchGuestsAction(cleanQuery);
      setHasSearched(true);
      if (response.success) {
        setResults(response.data);
      } else {
        setErrorMessage(response.error || "No se pudo realizar la búsqueda.");
        setResults([]);
      }
    });
  };

  return (
    <section id="mesas" className="section-dark-alt relative text-marfil overflow-visible scroll-mt-10">
      {/* Separador floral sobrepuesto en la intersección con la sección anterior */}
      <FlowerDivider
        src="/images/flores/Separador.png"
        size="full"
        position="intersection"
      />

      <div className="mx-auto max-w-3xl px-6 pb-24 pt-32 text-center sm:pb-32 sm:pt-36 md:pt-28 lg:pt-32">
        <SectionHeading title="Buscar mi Invitación" subtitle="Encuentra tu invitación de honor y lugar de mesa" />

        <FadeUp delay={0.1}>
          <p className="mx-auto mt-6 max-w-xl font-sans text-sm sm:text-base leading-relaxed text-marfil/90 font-normal">
            Queremos que te sientas como en casa. Escribe tu nombre o apellido a continuación para consultar tu
            invitación digital, confirmar la asistencia de tus acompañantes
          </p>
        </FadeUp>

        {/* Buscador interactivo */}
        <FadeUp delay={0.2}>
          <div className="mx-auto mt-10 max-w-xl">
            <form onSubmit={handleSearch} className="relative flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative flex-1">
                <label htmlFor="search-guest" className="sr-only">
                  Buscar por nombre o apellido
                </label>
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-yute-natural-light">
                  <Search className="h-5 w-5" />
                </div>
                <input
                  id="search-guest"
                  name="search-guest"
                  type="search"
                  enterKeyHint="search"
                  autoComplete="off"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Escribe tu nombre o apellido..."
                  className="w-full rounded-full border border-dorado-antiguo/50 bg-verde-bosque/90 py-3.5 pl-12 pr-4 font-sans text-sm sm:text-base text-marfil placeholder:text-marfil/50 focus:border-dorado-antiguo focus:bg-verde-bosque focus:outline-none focus:ring-2 focus:ring-dorado-antiguo/30 transition-all min-h-[52px]"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isPending || !query.trim()}
                className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full border border-dorado-antiguo/70 bg-gradient-to-r from-emerald-800 to-verde-bosque px-8 py-3 font-sans text-xs sm:text-sm font-semibold uppercase tracking-wider text-marfil shadow-md transition-all hover:scale-102 hover:shadow-lg active:scale-98 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
              >
                {isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin text-dorado-antiguo-light" />
                    <span>Buscando...</span>
                  </>
                ) : (
                  <>
                    <span>Consultar</span>
                    <Sparkles className="h-4 w-4 text-dorado-antiguo-light" />
                  </>
                )}
              </button>
            </form>
          </div>
        </FadeUp>

        {/* Mensaje de error si falla la consulta */}
        {errorMessage && (
          <FadeUp>
            <div className="mx-auto mt-6 max-w-md rounded-2xl border border-red-300/40 bg-red-950/60 p-4 text-sm font-sans text-red-200">
              {errorMessage}
            </div>
          </FadeUp>
        )}

        {/* Estado inicial: Sugerencia antes de buscar */}
        {!hasSearched && (
          <FadeUp delay={0.3}>
            <div className="mx-auto mt-10 max-w-md rounded-2xl border border-yute-natural/30 bg-verde-bosque-deep/60 p-5 text-center text-marfil/80 backdrop-blur-sm">
              <div className="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-verde-salvia/25 text-dorado-antiguo-light">
                <Info className="h-4 w-4" />
              </div>
              <p className="font-sans text-xs sm:text-sm leading-relaxed">
                Ingresa el nombre o familia como aparece en tu tarjeta para ver tu invitación personalizada.
              </p>
            </div>
          </FadeUp>
        )}

        {/* Resultados de la búsqueda */}
        {hasSearched && (
          <div className="mt-10 space-y-6">
            {results.length === 0 ? (
              <FadeUp>
                <div className="mx-auto max-w-md rounded-3xl border border-dorado-antiguo/30 bg-marfil-50 p-8 text-center text-verde-bosque shadow-luxury">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-stone-100 text-madera-nogal">
                    <Search className="h-6 w-6 text-madera-nogal/60" />
                  </div>
                  <h4 className="font-serif text-xl sm:text-2xl font-medium text-verde-bosque">
                    No encontramos una invitación con &ldquo;{query}&rdquo;
                  </h4>
                  <p className="mx-auto mt-2 max-w-xs font-sans text-sm text-madera-nogal/90 leading-relaxed">
                    Intenta buscando únicamente por tu primer apellido o escríbenos directamente para brindarte tu invitación.
                  </p>
                </div>
              </FadeUp>
            ) : (
              results.map((guest, idx) => (
                <FadeUp key={guest.id_invitacion} delay={idx * 0.1}>
                  <div className="mx-auto max-w-xl rounded-3xl border-2 border-dorado-antiguo/40 bg-marfil-50 p-7 text-left text-verde-bosque shadow-luxury sm:p-9">
                    {/* Encabezado del invitado y estado */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-yute-natural/20 pb-5">
                      <div>
                        <span className="font-sans text-xs uppercase tracking-widest font-semibold text-verde-salvia-dark">
                          Invitación Registrada
                        </span>
                        <h4 className="font-serif text-2xl font-medium text-verde-bosque sm:text-3xl mt-0.5">
                          {guest.nombre_grupo}
                        </h4>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        {/* Badge de estado */}
                        {guest.estado === "Confirmado" && (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3.5 py-1 font-sans text-xs font-semibold text-emerald-800 border border-emerald-300">
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            <span>Confirmado</span>
                          </span>
                        )}
                        {guest.estado === "Pendiente" && (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3.5 py-1 font-sans text-xs font-semibold text-amber-800 border border-amber-300">
                            <Clock className="h-3.5 w-3.5" />
                            <span>Pendiente</span>
                          </span>
                        )}
                        {guest.estado === "Cancelado" && (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-stone-100 px-3.5 py-1 font-sans text-xs font-semibold text-stone-700 border border-stone-300">
                            <XCircle className="h-3.5 w-3.5" />
                            <span>No asiste</span>
                          </span>
                        )}

                        {/* Cupos */}
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1 font-sans text-xs font-semibold text-verde-bosque border border-yute-natural/40">
                          <Users className="h-3.5 w-3.5 text-copper" />
                          <span>
                            {guest.cupos} {guest.cupos === 1 ? "cupo" : "cupos"}
                          </span>
                        </span>
                      </div>
                    </div>

                    {/* Tarjeta de Mesa Asignada */}
                    <div className="my-6 rounded-2xl border border-dorado-antiguo/50 bg-gradient-to-br from-white via-marfil-50 to-marfil-100 p-5 shadow-xs">
                      <div className="flex items-center gap-2 text-dorado-antiguo-dark">
                        <UtensilsCrossed className="h-4 w-4" />
                        <span className="font-sans text-xs uppercase tracking-widest font-semibold">
                          Mesa Asignada
                        </span>
                      </div>

                      {guest.mesa ? (
                        <div className="mt-2">
                          <p className="font-serif text-2xl font-semibold text-verde-bosque sm:text-3xl">
                            {guest.mesa}
                          </p>
                          <p className="mt-1 font-sans text-sm text-madera-nogal">
                            Tu puesto y el de tus acompañantes estarán dispuestos en esta mesa durante el banquete.
                          </p>
                        </div>
                      ) : (
                        <div className="mt-2">
                          <p className="font-serif text-xl font-medium text-verde-bosque">
                            Mesa en proceso de asignación
                          </p>
                          <p className="mt-1 font-sans text-sm text-madera-nogal/80">
                            Estamos coordinando la distribución de los lugares. Muy pronto verás aquí tu número de mesa.
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Botón de acceso directo a su invitación personalizada */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                      <p className="font-serif italic text-sm text-madera-nogal text-center sm:text-left">
                        {guest.estado === "Pendiente"
                          ? "Recuerda confirmar la asistencia de tus acompañantes."
                          : "¡Será un verdadero honor contar con tu compañía!"}
                      </p>

                      <Link
                        href={`/invite/${guest.id_invitacion}`}
                        className="inline-flex items-center gap-2 rounded-full border border-verde-bosque/40 bg-verde-bosque px-6 py-3 font-sans text-xs sm:text-sm font-semibold uppercase tracking-wider text-marfil shadow-sm transition-all hover:bg-verde-bosque-light hover:shadow-md shrink-0"
                      >
                        <span>Ver mi Invitación</span>
                        <ArrowRight className="h-4 w-4 text-dorado-antiguo-light" />
                      </Link>
                    </div>
                  </div>
                </FadeUp>
              ))
            )}
          </div>
        )}
      </div>
    </section>
  );
}
