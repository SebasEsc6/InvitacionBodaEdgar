"use server";

import { revalidatePath } from "next/cache";
import { updateGuestRSVP } from "@/lib/sheets";
import { RSVPFormData } from "@/lib/types";

export async function submitRSVP(formData: RSVPFormData) {
  try {
    if (!formData.id_invitacion) {
      return { success: false, error: "Identificador de invitación inválido." };
    }

    if (!formData.estado || (formData.estado !== "Confirmado" && formData.estado !== "Cancelado")) {
      return { success: false, error: "Debes seleccionar si confirmas o cancelas tu asistencia." };
    }

    const result = await updateGuestRSVP(formData);

    if (result.success) {
      // Revalida la página dinámica para que el Server Component se actualice al nuevo estado
      revalidatePath(`/invite/${formData.id_invitacion}`);
      revalidatePath(`/`);
    }

    return result;
  } catch (error: any) {
    console.error("[Action RSVP] Error en submitRSVP:", error);
    return {
      success: false,
      error: "Ocurrió un error inesperado al procesar tu respuesta.",
    };
  }
}
