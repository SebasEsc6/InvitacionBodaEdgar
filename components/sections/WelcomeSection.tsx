import React from "react";
import FadeUp from "../animations/FadeUp";
import FlowerDivider from "../ui/FlowerDivider";

export default function WelcomeSection() {
  return (
    <section
      id="bienvenida"
      className="section-dark relative px-6 pb-28 pt-36 text-center text-marfil sm:pb-36 sm:pt-48 md:pt-56"
    >
      {/* Flores fotorrealistas de Gemini separando portada de bienvenida */}
      <FlowerDivider slot="01-portada-bienvenida" edge="top" />

      <div className="mx-auto max-w-2xl">
        <FadeUp>
          <h2
            style={{ fontFamily: "'Great Vibes', 'Great Vibes Local', var(--font-great-vibes), cursive" }}
            className="font-title text-4xl sm:text-6xl font-normal leading-tight text-marfil"
          >
            ¡Queridos familiares y amigos!
          </h2>
        </FadeUp>

        <FadeUp delay={0.15}>
          <div className="mx-auto mt-6 max-w-lg space-y-4 font-sans text-sm leading-relaxed text-marfil/75 sm:text-base font-light">
            <p>
              Hay momentos en la vida que son verdaderamente inolvidables, y compartirlos con las personas que más
              queremos los hace infinitamente más especiales.
            </p>
            <p>
              Hemos decidido caminar juntos por el resto de nuestros días, construyendo un hogar fundado en el
              respeto, la complicidad y el amor sincero. Tu presencia en este día no solo es un honor, sino el regalo
              más valioso para comenzar este nuevo capítulo.
            </p>
          </div>
        </FadeUp>

        <FadeUp delay={0.25}>
          <p className="mt-10 font-serif text-3xl sm:text-4xl md:text-5xl font-light tracking-[-0.01em] text-marfil">
            05.12.2026
          </p>
          <p className="mt-2 font-sans text-xs sm:text-sm text-yute-natural-light/85 font-light">
            Nos hará muy felices verte en nuestro día
          </p>
        </FadeUp>

        <FadeUp delay={0.35}>
          <blockquote className="mx-auto mt-10 max-w-md font-serif text-lg italic leading-relaxed text-dorado-antiguo-light sm:text-xl">
            &ldquo;El amor no consiste en mirarse el uno al otro, sino en mirar juntos en la misma dirección.&rdquo;
          </blockquote>
          <p
            style={{ fontFamily: "'Great Vibes', 'Great Vibes Local', var(--font-great-vibes), cursive" }}
            className="mt-6 font-title text-3xl sm:text-4xl text-dorado-antiguo-light"
          >
            Edgar y María
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
