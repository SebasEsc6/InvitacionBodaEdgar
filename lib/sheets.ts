import { google } from "googleapis";
import { GuestInvitation, RSVPFormData, GuestStatus } from "./types";

/**
 * In-memory mock store for local development or demo purposes
 * Active whenever Google Sheets credentials are not configured in .env.local
 */
const mockGuests: Map<string, GuestInvitation> = new Map([
  [
    "demo-familia",
    {
      id_invitacion: "demo-familia",
      nombre_grupo: "Familia Morales González",
      cupos: 4,
      estado: "Pendiente",
      mesa: "Mesa 3 — Jardín Central",
    },
  ],
  [
    "carlos-mendoza",
    {
      id_invitacion: "carlos-mendoza",
      nombre_grupo: "Sr. Carlos Mendoza & Pareja",
      cupos: 2,
      estado: "Pendiente",
      mesa: "Mesa 1 — Salón Principal",
    },
  ],
  [
    "sofia-valencia",
    {
      id_invitacion: "sofia-valencia",
      nombre_grupo: "Dra. Sofía Valencia",
      cupos: 1,
      estado: "Confirmado",
      mesa: "Mesa 2 — Terraza",
      fecha_confirmacion: "2026-10-20 14:30:00",
      asistentes_confirmados: 1,
    },
  ],
  [
    "andres-castro",
    {
      id_invitacion: "andres-castro",
      nombre_grupo: "Ing. Andrés Castro",
      cupos: 2,
      estado: "Cancelado",
      fecha_confirmacion: "2026-10-18 10:15:00",
      asistentes_confirmados: 0,
    },
  ],
  [
    "familia-ramirez",
    {
      id_invitacion: "familia-ramirez",
      nombre_grupo: "Familia Ramírez Duque",
      cupos: 3,
      estado: "Pendiente",
      mesa: "Mesa 4 — Salón Imperial",
    },
  ],
]);

function getGoogleAuth() {
  const sheetId = process.env.GOOGLE_SHEET_ID;
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  let privateKey = process.env.GOOGLE_PRIVATE_KEY;

  if (!sheetId || !clientEmail || !privateKey) {
    return null;
  }

  // Handle newlines in private key string whether passed in double quotes or escaped
  privateKey = privateKey.replace(/\\n/g, "\n");

  // Tolerancia de 5 minutos ante desfase de reloj local de la máquina
  const now = Math.floor(Date.now() / 1000) - 300;

  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    additionalClaims: {
      iat: now,
      exp: now + 3600,
    },
  });

  return { auth, sheetId };
}

/**
 * Normaliza una cadena removiendo tildes y caracteres especiales para búsquedas tolerantes
 */
export function normalizeSearchString(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

/**
 * Normaliza el identificador para búsquedas tolerantes a mayúsculas/espacios
 */
function normalizeId(id: string): string {
  return id
    .trim()
    .toLowerCase()
    .replace(/^[`'"]+|[`'"]+$/g, "");
}

/**
 * Obtiene la información del invitado por su ID de invitación
 */
export async function getGuestById(id: string): Promise<GuestInvitation | null> {
  const normalizedId = normalizeId(id);
  const googleConfig = getGoogleAuth();

  if (!googleConfig) {
    const guest = mockGuests.get(normalizedId);
    return guest ? { ...guest } : null;
  }

  try {
    const { auth, sheetId } = googleConfig;
    const sheets = google.sheets({ version: "v4", auth });

    // Rango A2:J para cubrir todas las columnas de la hoja Invitados
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: "Invitados!A2:J",
    });

    const rows = response.data.values;
    if (!rows || rows.length === 0) {
      return null;
    }

    // Columnas esperadas en Google Sheets:
    // A: id_invitacion
    // B: nombre_grupo
    // C: cupos
    // D: estado (Pendiente, Confirmado, Cancelado)
    // E: fecha_confirmacion
    // F: mesa
    // G: asistentes_confirmados
    // H: restricciones_alimentarias
    // I: mensaje_novios
    const row = rows.find((r) => r[0] && normalizeId(String(r[0])) === normalizedId);

    if (!row) {
      return null;
    }

    return {
      id_invitacion: normalizeId(String(row[0])),
      nombre_grupo: String(row[1] || "Estimado(a) Invitado(a)").trim(),
      cupos: Number(row[2]) || 1,
      estado: (row[3] as GuestStatus) || "Pendiente",
      fecha_confirmacion: row[4] ? String(row[4]) : undefined,
      mesa: row[5] ? String(row[5]).trim() : undefined,
      asistentes_confirmados: row[6] ? Number(row[6]) : undefined,
      restricciones_alimentarias: row[7] ? String(row[7]) : undefined,
      mensaje_novios: row[8] ? String(row[8]) : undefined,
    };
  } catch (error) {
    console.error("[Sheets] Error al consultar Google Sheets:", error);
    // Fallback a mock data si hay error de red o permisos
    const guest = mockGuests.get(normalizedId);
    return guest ? { ...guest } : null;
  }
}

/**
 * Busca invitados por nombre, apellido o código de invitación (para el buscador de la landing)
 */
export async function searchGuests(query: string): Promise<GuestInvitation[]> {
  const trimmed = query.trim();
  if (!trimmed || trimmed.length < 2) {
    return [];
  }

  const cleanQuery = normalizeSearchString(trimmed);
  const googleConfig = getGoogleAuth();

  if (!googleConfig) {
    const results: GuestInvitation[] = [];
    for (const guest of mockGuests.values()) {
      const matchName = normalizeSearchString(guest.nombre_grupo).includes(cleanQuery);
      const matchId = normalizeSearchString(guest.id_invitacion).includes(cleanQuery);
      if (matchName || matchId) {
        results.push({ ...guest });
      }
    }
    return results.slice(0, 8);
  }

  try {
    const { auth, sheetId } = googleConfig;
    const sheets = google.sheets({ version: "v4", auth });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: "Invitados!A2:J",
    });

    const rows = response.data.values;
    if (!rows || rows.length === 0) {
      return [];
    }

    const matchedGuests: GuestInvitation[] = [];

    for (const row of rows) {
      if (!row[0]) continue;
      const id = normalizeId(String(row[0]));
      const name = String(row[1] || "").trim();

      const matchName = normalizeSearchString(name).includes(cleanQuery);
      const matchId = normalizeSearchString(id).includes(cleanQuery);

      if (matchName || matchId) {
        matchedGuests.push({
          id_invitacion: id,
          nombre_grupo: name || "Invitado",
          cupos: Number(row[2]) || 1,
          estado: (row[3] as GuestStatus) || "Pendiente",
          fecha_confirmacion: row[4] ? String(row[4]) : undefined,
          mesa: row[5] ? String(row[5]).trim() : undefined,
          asistentes_confirmados: row[6] ? Number(row[6]) : undefined,
          restricciones_alimentarias: row[7] ? String(row[7]) : undefined,
          mensaje_novios: row[8] ? String(row[8]) : undefined,
        });
      }

      if (matchedGuests.length >= 8) break;
    }

    return matchedGuests;
  } catch (error) {
    console.error("[Sheets] Error al buscar invitados en Google Sheets:", error);
    // Fallback con mock data
    const results: GuestInvitation[] = [];
    for (const guest of mockGuests.values()) {
      const matchName = normalizeSearchString(guest.nombre_grupo).includes(cleanQuery);
      const matchId = normalizeSearchString(guest.id_invitacion).includes(cleanQuery);
      if (matchName || matchId) {
        results.push({ ...guest });
      }
    }
    return results.slice(0, 8);
  }
}

/**
 * Actualiza el estado de confirmación RSVP del invitado en Google Sheets
 */
export async function updateGuestRSVP(
  data: RSVPFormData
): Promise<{ success: boolean; error?: string }> {
  const normalizedId = normalizeId(data.id_invitacion);
  const now = new Date().toLocaleString("es-CO", { timeZone: "America/Bogota" });

  const googleConfig = getGoogleAuth();

  if (!googleConfig) {
    // Actualizar en memoria si estamos en modo demo
    const existing = mockGuests.get(normalizedId);
    if (existing) {
      mockGuests.set(normalizedId, {
        ...existing,
        estado: data.estado,
        fecha_confirmacion: now,
        asistentes_confirmados: data.asistentes_confirmados ?? (data.estado === "Confirmado" ? existing.cupos : 0),
        restricciones_alimentarias: data.restricciones_alimentarias || "",
        mensaje_novios: data.mensaje_novios || "",
      });
      return { success: true };
    }
    return { success: false, error: "Invitación no encontrada en el sistema." };
  }

  try {
    const { auth, sheetId } = googleConfig;
    const sheets = google.sheets({ version: "v4", auth });

    // 1. Encontrar la fila correspondiente
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: "Invitados!A2:A",
    });

    const rows = response.data.values;
    if (!rows) {
      return { success: false, error: "No se encontraron registros en la hoja de cálculo." };
    }

    const rowIndex = rows.findIndex((r) => r[0] && normalizeId(String(r[0])) === normalizedId);

    if (rowIndex === -1) {
      return { success: false, error: "El código de invitación no coincide con ningún invitado." };
    }

    // Google Sheets index: Header es fila 1, A2 es index 0 en nuestro array, por ende fila real = rowIndex + 2
    const targetRow = rowIndex + 2;

    // Actualizamos columnas D y E (estado, fecha_confirmacion) sin alterar la columna F (mesa)
    await sheets.spreadsheets.values.update({
      spreadsheetId: sheetId,
      range: `Invitados!D${targetRow}:E${targetRow}`,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[data.estado, now]],
      },
    });

    return { success: true };
  } catch (error: any) {
    console.error("[Sheets] Error al actualizar estado en Google Sheets:", error);
    return {
      success: false,
      error: error?.message || "Ocurrió un error al guardar tu confirmación.",
    };
  }
}
