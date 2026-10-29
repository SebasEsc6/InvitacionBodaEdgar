"use client";

import React, { useEffect, useRef, useState, useTransition } from "react";
import Link from "next/link";
import {
  Search,
  X,
  Users,
  CheckCircle2,
  Clock,
  XCircle,
  ArrowRight,
  Sparkles,
  Loader2,
} from "lucide-react";
import { GuestInvitation } from "@/lib/types";
import { searchGuestsAction } from "@/app/actions/search";

export const OPEN_SEARCH_EVENT = "open-search-modal";

export function triggerOpenSearchModal() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(OPEN_SEARCH_EVENT));
  }
}

export default function SearchInviteModal() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [isPending, startTransition] = useTransition();
  const [hasSearched, setHasSearched] = useState(false);
  const [results, setResults] = useState<GuestInvitation[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Escuchar evento global para abrir el modal desde cualquier botón (SiteNav, FooterSection, etc.)
  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      const dialog = dialogRef.current;
      if (dialog && !dialog.open) {
        dialog.showModal();
        setTimeout(() => inputRef.current?.focus(), 50);
      }
    };

    window.addEventListener(OPEN_SEARCH_EVENT, handleOpen);
    return () => window.removeEventListener(OPEN_SEARCH_EVENT, handleOpen);
  }, []);

  const handleClose = () => {
    const dialog = dialogRef.current;
    if (dialog && dialog.open) {
      dialog.close();
    }
    setIsOpen(false);
  };

  // Implementación de Light Dismiss recomendada por modern-web-guidance
  const handleDialogClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const rect = dialog.getBoundingClientRect();
    const isOutside =
      e.clientX < rect.left ||
      e.clientX > rect.right ||
      e.clientY < rect.top ||
      e.clientY > rect.bottom;
    if (isOutside) {
      handleClose();
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = query.trim();
    if (!clean) return;

    setErrorMessage(null);
    startTransition(async () => {
      const response = await searchGuestsAction(clean);
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
    <dialog
      ref={dialogRef}
      id="search-invite-modal"
      aria-labelledby="search-modal-title"
      onClick={handleDialogClick}
      onClose={() => setIsOpen(false)}
      className="m-auto w-[92%] max-w-xl rounded-3xl border border-dorado-antiguo/40 bg-marfil-50 p-6 sm:p-8 text-verde-bosque shadow-luxury backdrop:bg-verde-bosque-deep/80 backdrop:backdrop-blur-md outline-none"
    >
      <div className="relative">
        {/* Botón de cierre */}
        <button
          type="button"
          onClick={handleClose}
          aria-label="Cerrar buscador"
          className="absolute -top-2 -right-2 flex h-9 w-9 items-center justify-center rounded-full bg-verde-bosque/10 text-verde-bosque hover:bg-verde-bosque hover:text-marfil transition-colors cursor-pointer"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="text-center pr-6 pl-2">
          <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-verde-salvia-dark font-semibold">
            Búsqueda de Invitación
          </span>
          <h3 id="search-modal-title" className="font-serif text-2xl sm:text-3xl font-medium text-verde-bosque mt-1">
            Encuentra tu Invitación
          </h3>
          <p className="mt-1 font-sans text-xs text-madera-nogal/80 font-light">
            Escribe tu nombre o apellido como aparece en la invitación:
          </p>
        </div>

        {/* Formulario de búsqueda */}
        <form onSubmit={handleSearch} className="mt-6 flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-yute-natural-dark" />
            <input
              ref={inputRef}
              type="search"
              enterKeyHint="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ej. Morales, Carlos Mendoza..."
              className="w-full rounded-full border border-dorado-antiguo/50 bg-white py-2.5 pl-10 pr-4 font-sans text-xs sm:text-sm text-verde-bosque placeholder:text-verde-bosque/40 focus:border-dorado-antiguo focus:outline-none focus:ring-2 focus:ring-dorado-antiguo/30 transition-all"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isPending || !query.trim()}
            className="inline-flex items-center justify-center gap-1.5 rounded-full border border-dorado-antiguo/70 bg-gradient-to-r from-verde-bosque to-emerald-800 px-6 py-2.5 font-sans text-xs font-semibold uppercase tracking-wider text-marfil shadow-sm hover:scale-[1.02] active:scale-98 transition-all disabled:opacity-50 cursor-pointer"
          >
            {isPending ? (
              <Loader2 className="h-4 w-4 animate-spin text-dorado-antiguo-light" />
            ) : (
              <>
                <span>Buscar</span>
                <Sparkles className="h-3 w-3 text-dorado-antiguo-light" />
              </>
            )}
          </button>
        </form>

        {errorMessage && (
          <div className="mt-4 rounded-xl border border-red-300 bg-red-50 p-3 text-xs text-red-800 text-center">
            {errorMessage}
          </div>
        )}

        {/* Resultados */}
        <div className="mt-6 max-h-[55vh] overflow-y-auto pr-1 space-y-3">
          {hasSearched && results.length === 0 && (
            <div className="rounded-2xl border border-stone-200 bg-white p-6 text-center">
              <p className="font-serif text-lg font-medium text-verde-bosque">
                No encontramos coincidencias para &ldquo;{query}&rdquo;
              </p>
              <p className="mt-1 font-sans text-xs text-madera-nogal/70 font-light">
                Verifica la ortografía o intenta buscando sólo con tu primer apellido.
              </p>
            </div>
          )}

          {results.map((guest) => {
            const isConfirmed = guest.estado === "Confirmado";
            const isCancelled = guest.estado === "Cancelado";

            return (
              <div
                key={guest.id_invitacion}
                className="rounded-2xl border border-dorado-antiguo/30 bg-white p-4 shadow-xs hover:border-dorado-antiguo/70 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <h4 className="font-serif text-lg font-medium text-verde-bosque">
                    {guest.nombre_grupo}
                  </h4>
                  <div className="mt-1 flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-stone-100 px-2.5 py-0.5 font-sans text-[11px] font-medium text-verde-bosque border border-stone-200">
                      <Users className="h-3 w-3 text-copper" />
                      <span>
                        {guest.cupos} {guest.cupos === 1 ? "cupo" : "cupos"}
                      </span>
                    </span>

                    {isConfirmed && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 font-sans text-[11px] font-medium text-emerald-800 border border-emerald-300">
                        <CheckCircle2 className="h-3 w-3" />
                        <span>Confirmado</span>
                      </span>
                    )}
                    {isCancelled && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-stone-100 px-2.5 py-0.5 font-sans text-[11px] font-medium text-stone-700 border border-stone-300">
                        <XCircle className="h-3 w-3" />
                        <span>No asiste</span>
                      </span>
                    )}
                    {!isConfirmed && !isCancelled && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 font-sans text-[11px] font-medium text-amber-800 border border-amber-300">
                        <Clock className="h-3 w-3" />
                        <span>Pendiente</span>
                      </span>
                    )}
                  </div>
                </div>

                <Link
                  href={`/invite/${guest.id_invitacion}`}
                  onClick={handleClose}
                  className="inline-flex items-center justify-center gap-1.5 rounded-full border border-verde-bosque bg-verde-bosque px-4 py-2 font-sans text-xs uppercase tracking-wider text-marfil hover:bg-verde-bosque-light transition-colors self-end sm:self-auto shrink-0"
                >
                  <span>Abrir Invitación</span>
                  <ArrowRight className="h-3 w-3 text-dorado-antiguo-light" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </dialog>
  );
}
