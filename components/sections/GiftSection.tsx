"use client";

import React, { useState } from "react";
import { CreditCard, Copy, Check } from "lucide-react";
import FadeUp from "../animations/FadeUp";
import SectionHeading from "../ui/SectionHeading";
import TornEdge from "../ui/TornEdge";
import FlowerAccent from "../ui/FlowerAccent";

export default function GiftSection() {
  const [copied, setCopied] = useState(false);
  const [showBankDetails, setShowBankDetails] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="regalo" className="bg-paper-beige relative z-10 px-4 py-20 sm:px-8 sm:py-28">
      <TornEdge position="top" seed={41} />
      <TornEdge position="bottom" seed={59} />

      {/*
        Flores laterales sutiles que abrazan los márgenes sin competir con la información
      */}
      <FlowerAccent
        side="left"
        src="/images/flores/LateralIzq.png"
        size="md"
        offset="subtle"
        className="top-24 sm:top-28"
      />
      <FlowerAccent
        side="right"
        src="/images/flores/LateralDer.png"
        size="md"
        offset="subtle"
        className="bottom-20 sm:bottom-28"
      />

      <div className="relative z-10 mx-auto max-w-xl px-6 sm:px-10 text-center">
        <SectionHeading title="Detalles" subtitle="Lluvia de sobres" tone="onLight" />

        <FadeUp delay={0.1}>
          <h3 className="mt-8 font-serif text-2xl sm:text-3xl font-normal text-verde-bosque">
            Tu presencia es nuestro mayor regalo
          </h3>
          <p className="mx-auto mt-4 max-w-lg font-sans text-xs sm:text-sm leading-relaxed text-madera-nogal font-light">
            El mejor regalo que podemos recibir es contar con tu compañía, tus sonrisas y tus bendiciones en este día
            tan anhelado.
          </p>
          <p className="mx-auto mt-3 max-w-lg font-sans text-xs sm:text-sm leading-relaxed text-verde-bosque/80 font-light">
            Si deseas hacernos un presente para ayudarnos a comenzar nuestro nuevo hogar y luna de miel, dispondremos
            de un buzón de <strong>Lluvia de Sobres</strong> el día de la boda.
          </p>

          <div className="mt-8 flex items-center justify-center">
            <button
              type="button"
              onClick={() => setShowBankDetails((prev) => !prev)}
              className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-verde-bosque/50 bg-transparent px-7 py-3 font-sans text-xs uppercase tracking-wider text-verde-bosque transition-all hover:bg-verde-bosque hover:text-marfil"
            >
              <CreditCard className="h-3.5 w-3.5 text-dorado-antiguo-dark" />
              <span>{showBankDetails ? "Ocultar datos bancarios" : "Ver datos para sobre digital"}</span>
            </button>
          </div>

          {/* Collapsible Bank / Digital Envelope Details */}
          {showBankDetails && (
            <div className="animate-fade-in mx-auto mt-8 max-w-md rounded-2xl border border-yute-natural/50 bg-marfil-50/80 p-5 text-left shadow-sm">
              <h4 className="mb-3 text-center font-serif text-lg font-normal text-verde-bosque">
                Transferencia o sobre digital
              </h4>
              <div className="space-y-3 font-sans text-xs text-madera-nogal">
                <div className="rounded-xl border border-yute-natural/30 bg-marfil p-3">
                  <p className="text-[10px] font-medium uppercase tracking-wider text-verde-salvia-dark">
                    Titular de la cuenta
                  </p>
                  <p className="text-sm font-medium text-verde-bosque">Edgar &amp; Camila</p>
                </div>

                <div className="flex items-center justify-between gap-3 rounded-xl border border-yute-natural/30 bg-marfil p-3">
                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-wider text-verde-salvia-dark">
                      Cuenta Bancaria / Nequi / Daviplata
                    </p>
                    <p className="font-mono text-sm font-semibold tracking-wider text-verde-bosque">300 123 4567</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyToClipboard("3001234567")}
                    className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg bg-verde-bosque px-3 py-1.5 text-xs text-marfil transition-colors hover:bg-verde-bosque-light"
                    title="Copiar número"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-300" />
                        <span>¡Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copiar</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </FadeUp>
      </div>
    </section>
  );
}
