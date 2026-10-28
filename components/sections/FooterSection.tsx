import React from "react";
import FadeUp from "../animations/FadeUp";
import FlowerDivider from "../ui/FlowerDivider";
import WaxSeal from "../ui/WaxSeal";

/**
 * Cierre de la invitación (compartido por la home y /invite/[id]).
 * Inspirado en la composición de referencia:
 * Mensaje '¡Te esperamos!' -> Sello de cera -> Nombres -> Ramillete floral final de borde a borde.
 */
export default function FooterSection() {
  return (
    <footer className="section-deep relative text-center text-marfil/80 overflow-hidden pt-16 sm:pt-20 pb-10 sm:pb-16">
      <div className="mx-auto max-w-2xl px-6 pb-6">
        <FadeUp>
          <p
            style={{ fontFamily: "'Great Vibes', 'Great Vibes Local', var(--font-great-vibes), cursive" }}
            className="font-title text-5xl sm:text-7xl font-normal leading-tight text-dorado-antiguo-light"
          >
            ¡Te esperamos!
          </p>
        </FadeUp>

        <FadeUp delay={0.15}>
          <div className="mt-8 flex justify-center">
            <WaxSeal initials="E y M" size="md" className="animate-float-gentle" />
          </div>
          <p
            style={{ fontFamily: "'Great Vibes', 'Great Vibes Local', var(--font-great-vibes), cursive" }}
            className="mt-6 font-title text-3xl sm:text-5xl text-dorado-antiguo-light"
          >
            Edgar y María
          </p>
          <p className="mt-2 font-sans text-xs uppercase tracking-widest text-yute-natural font-light">
            05 de Diciembre de 2026
          </p>
          <p className="mt-5 font-serif text-sm italic text-marfil/60">
            Con todo nuestro amor, gracias por ser parte fundamental de nuestra historia.
          </p>
        </FadeUp>
      </div>

      {/*
        Separador floral final en el pie de página de borde a borde:
        Ocupa el 100% del ancho de pantalla cerrando la invitación como en la imagen de referencia.
      */}
      <FlowerDivider
        src="/images/flores/Final.png"
        size="full"
        position="bottom"
        className="w-full"
      />
    </footer>
  );
}
