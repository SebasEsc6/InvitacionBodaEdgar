import React from "react";
import HeroSection from "@/components/sections/HeroSection";
import WelcomeSection from "@/components/sections/WelcomeSection";
import TimelineSection from "@/components/sections/TimelineSection";
import DressCodeSection from "@/components/sections/DressCodeSection";
import LocationSection from "@/components/sections/LocationSection";
import GiftSection from "@/components/sections/GiftSection";
import TableSearchSection from "@/components/sections/TableSearchSection";
import FooterSection from "@/components/sections/FooterSection";
import MusicPlayer from "@/components/audio/MusicPlayer";

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-x-clip bg-verde-bosque-deep text-marfil selection:bg-verde-salvia selection:text-marfil">
      <HeroSection />
      <WelcomeSection />
      <TimelineSection />
      <DressCodeSection />
      <LocationSection />
      <GiftSection />

      {/* Consulta de Mesa y Asignación */}
      <TableSearchSection />

      {/* Reproductor de música */}
      <MusicPlayer trackId="4l5HZ6iRc2oN5NtcT141yq" />

      <FooterSection />
    </main>
  );
}
