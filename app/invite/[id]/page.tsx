import React from "react";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { getGuestById } from "@/lib/sheets";
import IsolatedInvitationView from "@/components/rsvp/IsolatedInvitationView";

export const instant = false;

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

  // Vista aislada: renderiza únicamente la invitación y su confirmación personalizada,
  // ocultando el resto de la landing page de fondo.
  return <IsolatedInvitationView guest={guest} />;
}
