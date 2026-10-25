import React from "react";
import FadeUp from "../animations/FadeUp";
import FlowerDivider from "../ui/FlowerDivider";
import WaxSeal from "../ui/WaxSeal";

/**
 * Cierre de la invitación (compartido por la home y /invite/[id]).
 * Las flores fotorrealistas "03-final" quedan centradas sobre el borde superior.
 */
export default function FooterSection() {
  return (
    <footer className="section-deep relative px-6 pb-20 pt-44 text-center text-marfil/80 sm:pt-60">
      <FlowerDivider slot="03-final" edge="top" />

      <div className="mx-auto max-w-2xl">
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
          <p className="mt-6 font-serif text-sm italic text-marfil/60">
            Con todo nuestro amor, gracias por ser parte fundamental de nuestra historia.
          </p>
        </FadeUp>
      </div>
    </footer>
  );
}
