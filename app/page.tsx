import React from "react";
import HeroSection from "@/components/sections/HeroSection";
import WelcomeSection from "@/components/sections/WelcomeSection";
import TimelineSection from "@/components/sections/TimelineSection";
import DressCodeSection from "@/components/sections/DressCodeSection";
import LocationSection from "@/components/sections/LocationSection";
import GiftSection from "@/components/sections/GiftSection";
import TableSearchSection from "@/components/sections/TableSearchSection";
import FooterSection from "@/components/sections/FooterSection";

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-x-clip bg-verde-bosque-deep text-marfil selection:bg-verde-salvia selection:text-marfil">
      <HeroSection />
      <WelcomeSection />
      <TimelineSection />
      <DressCodeSection />
      <GiftSection />
      <LocationSection />

      {/* Sección de Búsqueda de Invitación */}
      <TableSearchSection />

      {/* Footer de cierre con CTA 'BUSCAR MI INVITACIÓN' */}
      <FooterSection />
    </main>
  );
}
