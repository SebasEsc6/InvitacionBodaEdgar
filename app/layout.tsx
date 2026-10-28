import type { Metadata } from "next";
import { Bodoni_Moda, Montserrat } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

// Tipografía local cargada con next/font/local (mejores prácticas de Next.js)
const greatVibes = localFont({
  src: "../public/tipografia/GreatVibes-Regular.ttf",
  variable: "--font-great-vibes",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nuestra Boda | Edgar & Camila",
  description: "Acompáñanos a celebrar nuestra unión matrimonial el 5 de diciembre de 2026. Confirma tu asistencia.",
  openGraph: {
    title: "Nuestra Boda | Edgar & Camila",
    description: "Una celebración de amor, naturaleza y elegancia. 5 de diciembre de 2026.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${bodoni.variable} ${montserrat.variable} ${greatVibes.variable} scroll-smooth`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-verde-bosque-deep text-marfil antialiased selection:bg-verde-salvia selection:text-marfil">
        {children}
      </body>
    </html>
  );
}
