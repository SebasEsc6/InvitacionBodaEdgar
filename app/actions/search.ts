"use server";

import { searchGuests } from "@/lib/sheets";
import { GuestInvitation } from "@/lib/types";

export async function searchGuestsAction(
  query: string
): Promise<{ success: boolean; data: GuestInvitation[]; error?: string }> {
  try {
    const cleanQuery = query.trim();
    if (!cleanQuery || cleanQuery.length < 2) {
      return { success: true, data: [] };
    }

    const results = await searchGuests(cleanQuery);
    return { success: true, data: results };
  } catch (error: any) {
    console.error("[Action Search] Error al buscar invitados:", error);
    return {
      success: false,
      data: [],
      error: "No fue posible realizar la búsqueda en este momento.",
    };
  }
}
