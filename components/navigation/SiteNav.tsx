"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, Search } from "lucide-react";

/**
 * Barra / Pastilla de navegación flotante elegante para alternar entre
 * la página principal (Home) y las invitaciones personalizadas (/invite/[id]).
 */
export default function SiteNav() {
  const pathname = usePathname();
  const isInvitePage = pathname.startsWith("/invite");

  return (
    <aside
      aria-label="Navegación principal de la boda"
      className="fixed top-4 left-4 sm:top-6 sm:left-6 z-40 pointer-events-auto select-none"
    >
      {isInvitePage ? (
        <Link
          href="/"
          className="group inline-flex items-center gap-2 rounded-full border border-dorado-antiguo/50 bg-verde-bosque-dark/85 px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-sans font-medium tracking-wide text-marfil backdrop-blur-md shadow-gold transition-all duration-300 hover:bg-verde-bosque-dark hover:border-dorado-antiguo hover:scale-[1.03] active:scale-95"
          title="Volver a la página principal de la boda"
        >
          <ArrowLeft className="h-4 w-4 text-dorado-antiguo-light transition-transform duration-300 group-hover:-translate-x-1" />
          <span>Página Principal</span>
        </Link>
      ) : (
        <a
          href="#invitaciones"
          className="group inline-flex items-center gap-2 rounded-full border border-dorado-antiguo/50 bg-verde-bosque-dark/85 px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-sans font-medium tracking-wide text-marfil backdrop-blur-md shadow-gold transition-all duration-300 hover:bg-verde-bosque-dark hover:border-dorado-antiguo hover:scale-[1.03] active:scale-95"
          title="Buscar mi invitación personalizada y confirmar asistencia"
        >
          <Search className="h-4 w-4 text-dorado-antiguo-light transition-transform duration-300 group-hover:scale-110" />
          <span>Buscar mi Invitación</span>
        </a>
      )}
    </aside>
  );
}
