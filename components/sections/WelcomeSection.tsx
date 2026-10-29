import React from "react";
import FadeUp from "../animations/FadeUp";
import FlowerDivider from "../ui/FlowerDivider";

export default function WelcomeSection() {
  return (
    <section
      id="bienvenida"
      className="section-dark relative text-center text-marfil overflow-visible"
    >
      {/*
        Separador floral sobrepuesto en la intersección Hero/Bienvenida:
        - Queda sobrepuesto al 50% entre ambas secciones sin ocupar un div con espacio vertical en el layout.
      */}
      <FlowerDivider
        src="/images/flores/Separador.png"
        size="full"
        position="intersection"
      />

      <div className="mx-auto max-w-2xl px-6 pb-20 pt-32 sm:pb-28 sm:pt-36 md:pt-24 lg:pt-28">
        <FadeUp>
          <h2
            style={{ fontFamily: "'Great Vibes', 'Great Vibes Local', var(--font-great-vibes), cursive" }}
            className="font-title text-5xl sm:text-7xl font-normal leading-tight text-marfil"
          >
            ¡Queridos familiares y amigos!
          </h2>
        </FadeUp>

        <FadeUp delay={0.15}>
          <p className="mx-auto mt-6 max-w-xl font-sans text-base sm:text-lg leading-relaxed text-marfil/90 font-normal">
            Hay momentos en la vida que se convierten en recuerdos eternos, y compartirlos con las personas que amamos
            los hace aún más mágicos y especiales. Hoy hemos decidido unir nuestros caminos para recorrer juntos el
            resto de nuestras vidas, construyendo un hogar donde nunca falten el amor, el respeto, la complicidad y la
            felicidad. Queremos que seas parte de este momento tan especial, porque tu presencia hará aún más
            inolvidable el inicio de esta hermosa historia que hoy comienza. Nos llena de alegría poder compartir
            contigo el día en que nuestro amor se convierte en una promesa para toda la vida.
          </p>
        </FadeUp>

        <FadeUp delay={0.25}>
          <p className="mt-10 font-serif text-4xl sm:text-5xl md:text-6xl font-light tracking-[-0.01em] text-marfil">
            05.12.2026
          </p>
        </FadeUp>

        <FadeUp delay={0.35}>
          <blockquote className="mx-auto mt-10 max-w-lg font-serif text-xl sm:text-2xl italic leading-relaxed text-dorado-antiguo-light">
            &ldquo;El amor no consiste en mirarse el uno al otro, sino en mirar juntos en la misma dirección.&rdquo;
          </blockquote>
          <p
            style={{ fontFamily: "'Great Vibes', 'Great Vibes Local', var(--font-great-vibes), cursive" }}
            className="mt-6 font-title text-4xl sm:text-5xl text-dorado-antiguo-light"
          >
            Edgar y Camila
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
