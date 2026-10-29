"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, Search } from "lucide-react";
import FadeUp from "../animations/FadeUp";
import FlowerDivider from "../ui/FlowerDivider";
import WaxSeal from "../ui/WaxSeal";

/**
 * Cierre de la invitación (compartido por la home y /invite/[id]).
 * - Mensaje '¡Te esperamos!' -> Sello de cera -> Nombres -> Navegación contextual.
 * - Ramillete floral final pegado al ras inferior de la página con offset sutil hacia abajo.
 */
export default function FooterSection() {
  const pathname = usePathname();
  const isInvitePage = pathname.startsWith("/invite");

  return (
    <footer className="section-deep relative text-center text-marfil/90 overflow-hidden pt-16 sm:pt-24 pb-48 sm:pb-60 md:pb-72">
      <div className="relative z-20 mx-auto max-w-2xl px-6 pb-6">
        <FadeUp>
          <p
            style={{ fontFamily: "'Great Vibes', 'Great Vibes Local', var(--font-great-vibes), cursive" }}
            className="font-title text-6xl sm:text-8xl font-normal leading-tight text-dorado-antiguo-light"
          >
            ¡Te esperamos!
          </p>
        </FadeUp>

        <FadeUp delay={0.15}>
          <div className="mt-8 flex justify-center">
            <WaxSeal initials="E y C" size="md" className="animate-float-gentle" />
          </div>
          <p
            style={{ fontFamily: "'Great Vibes', 'Great Vibes Local', var(--font-great-vibes), cursive" }}
            className="mt-6 font-title text-4xl sm:text-6xl text-dorado-antiguo-light"
          >
            Edgar y Camila
          </p>
          <p className="mt-3 font-sans text-xs sm:text-sm uppercase tracking-widest text-yute-natural font-medium">
            05 de Diciembre de 2026
          </p>
          <p className="mt-5 font-serif text-base sm:text-lg italic text-marfil/75 leading-relaxed">
            Con todo nuestro amor, gracias por ser parte fundamental de nuestra historia.
          </p>

          {/* Navegación contextual para regresar a la home o buscar invitación */}
          <div className="mt-8 flex justify-center">
            {isInvitePage ? (
              <Link
                href="/"
                className="group inline-flex items-center gap-2 rounded-full border border-dorado-antiguo/40 bg-verde-bosque/60 px-6 py-3 font-sans text-xs sm:text-sm font-semibold uppercase tracking-wider text-marfil backdrop-blur-md shadow-gold transition-all duration-300 hover:bg-verde-bosque hover:border-dorado-antiguo hover:scale-105 active:scale-95"
              >
                <ArrowLeft className="h-4 w-4 text-dorado-antiguo-light transition-transform duration-300 group-hover:-translate-x-1" />
                <span>Volver a la Página Principal</span>
              </Link>
            ) : (
              <a
                href="#mesas"
                className="group inline-flex items-center gap-2 rounded-full border border-dorado-antiguo/50 bg-verde-bosque/80 px-7 py-3.5 font-sans text-xs sm:text-sm font-semibold uppercase tracking-wider text-marfil backdrop-blur-md shadow-gold transition-all duration-300 hover:bg-verde-bosque hover:border-dorado-antiguo hover:scale-105 active:scale-95"
              >
                <Search className="h-4 w-4 text-dorado-antiguo-light transition-transform duration-300 group-hover:scale-110" />
                <span>BUSCAR MI INVITACIÓN</span>
              </a>
            )}
          </div>
        </FadeUp>
      </div>

      {/*
        Ramillete floral final pegado al fondo absoluto de la página:
        - Pegado al límite inferior (0 espacio en el fondo).
        - Ligero offset hacia abajo (translate-y-*) para que la base se funda naturalmente con el borde de la pantalla.
      */}
      <FlowerDivider
        src="/images/flores/Final.png"
        size="full"
        position="bottom-flush"
      />
    </footer>
  );
}
