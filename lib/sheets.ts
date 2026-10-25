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
    },
  ],
  [
    "carlos-mendoza",
    {
      id_invitacion: "carlos-mendoza",
      nombre_grupo: "Sr. Carlos Mendoza & Pareja",
      cupos: 2,
      estado: "Pendiente",
    },
  ],
  [
    "sofia-valencia",
    {
      id_invitacion: "sofia-valencia",
      nombre_grupo: "Dra. Sofía Valencia",
      cupos: 1,
      estado: "Confirmado",
      fecha_confirmacion: "2026-10-20 14:30:00",
      asistentes_confirmados: 1,
      restricciones_alimentarias: "Vegetariana",
      mensaje_novios: "¡Qué emoción verlos dar este paso! Nos vemos pronto.",
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
      mensaje_novios: "Estaré fuera del país en esa fecha, pero les mando un abrazo enorme.",
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

  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  return { auth, sheetId };
}

/**
 * Normaliza el identificador para búsquedas tolerantes a mayúsculas/espacios
 */
function normalizeId(id: string): string {
  return id.trim().toLowerCase();
}

/**
 * Obtiene la información del invitado por su ID de invitación
 */
export async function getGuestById(id: string): Promise<GuestInvitation | null> {
  const normalizedId = normalizeId(id);
  const googleConfig = getGoogleAuth();

  if (!googleConfig) {
    console.warn(
      "[Sheets] Variables de entorno de Google Sheets no encontradas. Utilizando almacenamiento demo en memoria."
    );
    const guest = mockGuests.get(normalizedId);
    return guest ? { ...guest } : null;
  }

  try {
    const { auth, sheetId } = googleConfig;
    const sheets = google.sheets({ version: "v4", auth });

    // Asumimos que la hoja se llama "Invitados" o leemos la primera hoja
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: "Invitados!A2:H",
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
    // F: asistentes_confirmados
    // G: restricciones_alimentarias
    // H: mensaje_novios
    const row = rows.find((r) => r[0] && normalizeId(String(r[0])) === normalizedId);

    if (!row) {
      return null;
    }

    return {
      id_invitacion: String(row[0]).trim(),
      nombre_grupo: String(row[1] || "Estimado(a) Invitado(a)").trim(),
      cupos: Number(row[2]) || 1,
      estado: (row[3] as GuestStatus) || "Pendiente",
      fecha_confirmacion: row[4] ? String(row[4]) : undefined,
      asistentes_confirmados: row[5] ? Number(row[5]) : undefined,
      restricciones_alimentarias: row[6] ? String(row[6]) : undefined,
      mensaje_novios: row[7] ? String(row[7]) : undefined,
    };
  } catch (error) {
    console.error("[Sheets] Error al consultar Google Sheets:", error);
    // Fallback a mock data si hay error de red o permisos
    const guest = mockGuests.get(normalizedId);
    return guest ? { ...guest } : null;
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
        asistentes_confirmados: data.asistentes_confirmados,
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

    // Actualizamos columnas D a H: estado, fecha_confirmacion, asistentes_confirmados, restricciones, mensaje
    await sheets.spreadsheets.values.update({
      spreadsheetId: sheetId,
      range: `Invitados!D${targetRow}:H${targetRow}`,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            data.estado,
            now,
            data.asistentes_confirmados,
            data.restricciones_alimentarias || "Ninguna",
            data.mensaje_novios || "",
          ],
        ],
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
