import React from "react";
import { notFound } from "next/navigation";
import { getGuestById } from "@/lib/sheets";
import HeroSection from "@/components/sections/HeroSection";
import WelcomeSection from "@/components/sections/WelcomeSection";
import TimelineSection from "@/components/sections/TimelineSection";
import DressCodeSection from "@/components/sections/DressCodeSection";
import GiftSection from "@/components/sections/GiftSection";
import LocationSection from "@/components/sections/LocationSection";
import MusicPlayer from "@/components/audio/MusicPlayer";
import FooterSection from "@/components/sections/FooterSection";

export const instant = false;

import { connection } from "next/server";

interface InvitePageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: InvitePageProps) {
  await connection();
  const { id } = await params;
  const guest = await getGuestById(id);

  if (!guest) {
    return {
      title: "Invitación de Boda | Edgar & Camila",
      description: "Invitación digital interactiva para nuestra boda el 5 de diciembre de 2026.",
    };
  }

  return {
    title: `Invitación para ${guest.nombre_grupo} | Boda Edgar & Camila`,
    description: `Acompáñanos a celebrar nuestra unión matrimonial el 5 de diciembre de 2026. ${guest.cupos} cupo(s) reservado(s).`,
  };
}

export default async function InvitePage({ params }: InvitePageProps) {
  await connection();
  const { id } = await params;
  const guest = await getGuestById(id);

  if (!guest) {
    notFound();
  }

  return (
    <main className="relative min-h-screen overflow-x-clip bg-verde-bosque-deep text-marfil selection:bg-verde-salvia selection:text-marfil">
      {/* 1. Hero / Portada con confirmación RSVP interactiva directa */}
      <HeroSection guest={guest} />

      {/* 2. Mensaje de Bienvenida */}
      <WelcomeSection />

      {/* 3. Cronograma (Timing) */}
      <TimelineSection />

      {/* 4. Dress Code */}
      <DressCodeSection />

      {/* 5. Detalles (Lluvia de Sobres) */}
      <GiftSection />

      {/* 6. Ubicación (con flores separadoras entre Detalles y Ubicación) */}
      <LocationSection />

      {/* Floating Ambient Spotify / Music Player */}
      <MusicPlayer trackId="4l5HZ6iRc2oN5NtcT141yq" />

      {/* 7. Footer de Cierre */}
      <FooterSection />
    </main>
  );
}
