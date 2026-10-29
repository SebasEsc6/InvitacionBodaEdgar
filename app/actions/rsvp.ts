"use server";

import { revalidatePath } from "next/cache";
import { updateGuestRSVP } from "@/lib/sheets";
import { GuestInvitation, RSVPFormData } from "@/lib/types";

const MAX_MEMBERS = 30;

export async function submitRSVP(
  formData: RSVPFormData
): Promise<{ success: boolean; error?: string; guest?: GuestInvitation }> {
  try {
    if (!formData?.id_invitacion || typeof formData.id_invitacion !== "string") {
      return { success: false, error: "Identificador de invitación inválido." };
    }

    const { asistencia } = formData;
    if (
      !Array.isArray(asistencia) ||
      asistencia.length === 0 ||
      asistencia.length > MAX_MEMBERS ||
      !asistencia.every((v) => typeof v === "boolean")
    ) {
      return { success: false, error: "Indica la asistencia de cada integrante de la invitación." };
    }

    const result = await updateGuestRSVP({
      id_invitacion: formData.id_invitacion,
      asistencia,
    });

    if (result.success) {
      // Revalida la página dinámica para que el Server Component refleje la nueva respuesta
      revalidatePath(`/invite/${formData.id_invitacion}`);
    }

    return result;
  } catch (error: unknown) {
    console.error("[Action RSVP] Error en submitRSVP:", error);
    return {
      success: false,
      error: "Ocurrió un error inesperado al procesar tu respuesta.",
    };
  }
}
