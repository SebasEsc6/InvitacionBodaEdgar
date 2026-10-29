"use client";

import React, { useEffect, useState } from "react";
import Script from "next/script";
import { ExternalLink, Sparkles } from "lucide-react";
import FadeUp from "../animations/FadeUp";

interface PinterestBoardProps {
  boardUrl?: string;
  shortUrl?: string;
}

// Pines destacados del tablero "dress-code-ec" para carga instantánea garantizada
const BOARD_PINS = [
  {
    id: "pin-1",
    img: "https://i.pinimg.com/736x/31/e3/9e/31e39ef677bc16419d728637f8bacbb0.jpg",
    link: "https://co.pinterest.com/pin/e1_AfqPShwdpY6glDYSq8FEl3VQwnYrSdCp-l6TfpQ2rPQXcjogX6Jh/",
  },
  {
    id: "pin-2",
    img: "https://i.pinimg.com/736x/11/9a/cc/119acc7085bcdbd717bb2034948bb733.jpg",
    link: "https://co.pinterest.com/pin/e1_AfqPShxx-2DsHig-lOjhNLeKy_yIDN-z53LKSeludeyblFEjh1Ir/",
  },
  {
    id: "pin-3",
    img: "https://i.pinimg.com/736x/6e/90/e2/6e90e29b1dbc93d803c9791edf4a77b4.jpg",
    link: "https://co.pinterest.com/pin/e1_AfqPShwT5d7jRwU8rk8YvpHV-3sUe5Ef8rqr3Qs37PQe0AphnG81/",
  },
  {
    id: "pin-4",
    img: "https://i.pinimg.com/736x/b8/fe/3e/b8fe3e3ee2af48b271a27cd8805c8e67.jpg",
    link: "https://co.pinterest.com/pin/e1_AfqPShysd6ar-zudAnRvA2ZL9l-EZrRVZhagWfMLUunjKgGTyPFY/",
  },
  {
    id: "pin-5",
    img: "https://i.pinimg.com/736x/61/4b/fa/614bfa40d5161bf21cc36f657844f9f8.jpg",
    link: "https://co.pinterest.com/pin/e1_AfqPShx82zZ4Rbh_oMAa3DH9JdiTj8UXr9gy3m6x2YyiyO1Pat1O/",
  },
  {
    id: "pin-6",
    img: "https://i.pinimg.com/736x/ad/09/63/ad096302df4ef53eb1771ec23fd1a0ee.jpg",
    link: "https://co.pinterest.com/pin/e1_AfqPShyDNTXpHi0_T2Km0EFwlG4iTfu6XFzzohEubJSO06fEUL09/",
  },
  {
    id: "pin-7",
    img: "https://i.pinimg.com/736x/10/21/74/10217402ff5525e868654de9bfbf407e.jpg",
    link: "https://co.pinterest.com/pin/e1_AfqPShz0Kh5GCUNZhwLmfnzPrh4bCmvjnYbxdzxCEr5kZ3gRNw8E/",
  },
  {
    id: "pin-8",
    img: "https://i.pinimg.com/736x/17/e6/32/17e63288b21c381f51b99b6f326ac94c.jpg",
    link: "https://co.pinterest.com/pin/e1_AfqPShx4w3i3dTviJh68WczOtrqR80KELUWpuJarf8Fbno8Wp5Bq/",
  },
];

function PinterestIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.291 1.199-.334 1.357-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
    </svg>
  );
}

export default function PinterestBoard({
  boardUrl = "https://www.pinterest.com/camilai1448/dress-code-ec/",
  shortUrl = "https://pin.it/tAEQlpjXc",
}: PinterestBoardProps) {
  const [activeTab, setActiveTab] = useState<"gallery" | "widget">("gallery");

  // Re-escaneo de Pinterest pinit.js al montar o cambiar
  useEffect(() => {
    if (typeof window !== "undefined") {
      const win = window as unknown as { PinUtils?: { build: () => void } };
      if (win.PinUtils) {
        try {
          win.PinUtils.build();
        } catch {
          // ignore
        }
      }
    }
  }, [activeTab]);

  return (
    <div className="mx-auto mt-14 w-full max-w-4xl text-center">
      {/* Script oficial de Pinterest con carga diferida */}
      <Script
        src="//assets.pinterest.com/js/pinit.js"
        strategy="lazyOnload"
        onLoad={() => {
          if (typeof window !== "undefined") {
            const win = window as unknown as { PinUtils?: { build: () => void } };
            if (win.PinUtils) {
              try {
                win.PinUtils.build();
              } catch {
                // ignore
              }
            }
          }
        }}
      />

      <FadeUp delay={0.1}>
        {/* Tarjeta contenedora de lujo */}
        <div className="rounded-3xl border border-dorado-antiguo/30 bg-verde-bosque-deep/80 p-6 sm:p-8 backdrop-blur-md shadow-luxury text-marfil">
          {/* Encabezado del Tablero */}
          <div className="flex flex-col items-center justify-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-dorado-antiguo/40 bg-verde-bosque/60 px-4 py-1.5 font-sans text-xs uppercase tracking-widest text-dorado-antiguo-light shadow-sm">
              <PinterestIcon className="h-3.5 w-3.5 text-[#E60023]" />
              <span>Inspiración de Atuendos</span>
            </div>

            <h4 className="mt-4 font-serif text-2xl sm:text-3xl font-light italic text-marfil">
              Tablero de Ideas en Pinterest
            </h4>

            <p className="mx-auto mt-2 max-w-md font-sans text-xs sm:text-sm leading-relaxed text-marfil/75 font-light">
              Reunimos referencias de trajes, vestidos y combinaciones para que encuentres tu estilo ideal para acompañarnos.
            </p>
          </div>

          {/* Selector de Vista: Galería Integrada vs Tablero Interactivo */}
          <div className="mt-6 flex justify-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab("gallery")}
              className={`rounded-full px-4 py-1.5 font-sans text-xs transition-all cursor-pointer ${
                activeTab === "gallery"
                  ? "bg-dorado-antiguo text-verde-bosque-deep font-medium shadow-gold"
                  : "bg-verde-bosque/40 text-marfil/70 hover:text-marfil border border-dorado-antiguo/20"
              }`}
            >
              Galería de Ideas
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("widget")}
              className={`rounded-full px-4 py-1.5 font-sans text-xs transition-all cursor-pointer ${
                activeTab === "widget"
                  ? "bg-dorado-antiguo text-verde-bosque-deep font-medium shadow-gold"
                  : "bg-verde-bosque/40 text-marfil/70 hover:text-marfil border border-dorado-antiguo/20"
              }`}
            >
              Widget Pinterest
            </button>
          </div>

          {/* Contenido según la pestaña seleccionada */}
          <div className="mt-8">
            {activeTab === "gallery" ? (
              /* Vista 1: Cuadrícula integrada con imágenes del tablero de Camila */
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                {BOARD_PINS.map((pin) => (
                  <a
                    key={pin.id}
                    href={pin.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative block aspect-[3/4] overflow-hidden rounded-2xl border border-dorado-antiguo/25 bg-verde-bosque/40 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-dorado-antiguo hover:shadow-gold"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={pin.img}
                      alt="Referencia de atuendo de boda"
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-verde-bosque-deep/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-end p-2.5 justify-center">
                      <span className="inline-flex items-center gap-1 font-sans text-[10px] text-dorado-antiguo-light">
                        <span>Ver en Pinterest</span>
                        <ExternalLink className="h-3 w-3" />
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            ) : (
              /* Vista 2: Widget oficial embebido de Pinterest */
              <div className="flex justify-center overflow-x-auto py-2">
                <div className="overflow-hidden rounded-2xl bg-white p-2 shadow-inner">
                  <a
                    data-pin-do="embedBoard"
                    data-pin-board-width="700"
                    data-pin-scale-height="320"
                    data-pin-scale-width="115"
                    href={boardUrl}
                  >
                    Tablero de Dress Code
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Botón Principal para Abrir en Pinterest (App móvil o web) */}
          <div className="mt-8 pt-6 border-t border-dorado-antiguo/20 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2.5 rounded-full border border-dorado-antiguo bg-gradient-to-r from-dorado-antiguo-dark via-dorado-antiguo to-dorado-antiguo-light px-7 py-3 font-sans text-xs font-semibold uppercase tracking-[0.15em] text-verde-bosque-deep shadow-gold transition-all duration-300 hover:scale-[1.03] hover:shadow-luxury active:scale-[0.98]"
            >
              <PinterestIcon className="h-4 w-4 text-[#E60023] transition-transform group-hover:scale-110" />
              <span>Abrir Tablero en Pinterest</span>
              <ExternalLink className="h-3.5 w-3.5 text-verde-bosque-deep/70" />
            </a>

            <span className="font-sans text-[11px] text-marfil/60 font-light">
              Se abre directamente en la app o navegador
            </span>
          </div>
        </div>
      </FadeUp>
    </div>
  );
}
