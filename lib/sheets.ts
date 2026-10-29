import { google } from "googleapis";
import { GuestInvitation, GuestMember, GuestStatus, AttendanceResponse, RSVPFormData } from "./types";

/**
 * Estructura de la hoja `Invitados` (fila 1 = encabezados):
 *   A: id_invitacion
 *   B: nombre_grupo
 *   C: cupos
 *   D: estado (Pendiente, Confirmado, Cancelado)          ← escrito por el RSVP
 *   E: fecha_confirmacion                                  ← escrito por el RSVP
 *   F: mesa
 *   G: asistentes_confirmados                              ← escrito por el RSVP
 *   H: restricciones_alimentarias
 *   I: mensaje_novios
 *   J: integrantes  (nombres separados por ";"  ej. "Ana Pérez; Juan Pérez")
 *   K: respuestas_individuales                             ← escrito por el RSVP
 *      (formato legible: "Ana Pérez: Asiste | Juan Pérez: No asiste")
 */
const SHEET_RANGE = "Invitados!A2:K";

/** Datos crudos (sin integrantes resueltos) usados por el modo demo en memoria */
interface MockGuestRow {
  id_invitacion: string;
  nombre_grupo: string;
  cupos: number;
  estado: GuestStatus;
  mesa?: string;
  fecha_confirmacion?: string;
  asistentes_confirmados?: number;
  integrantes_raw?: string;
  respuestas_raw?: string;
}

/**
 * In-memory mock store for local development or demo purposes
 * Active whenever Google Sheets credentials are not configured in .env.local
 */
const mockGuests: Map<string, MockGuestRow> = new Map([
  [
    "demo-familia",
    {
      id_invitacion: "demo-familia",
      nombre_grupo: "Familia Morales González",
      cupos: 4,
      estado: "Pendiente",
      integrantes_raw: "Andrés Morales; Lucía González; Tomás Morales; Valentina Morales",
    },
  ],
  [
    "carlos-mendoza",
    {
      id_invitacion: "carlos-mendoza",
      nombre_grupo: "Sr. Carlos Mendoza & Pareja",
      cupos: 2,
      estado: "Pendiente",
      integrantes_raw: "Carlos Mendoza; Daniela Ríos",
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
      integrantes_raw: "Sofía Valencia",
      respuestas_raw: "Sofía Valencia: Asiste",
    },
  ],
  [
    "andres-castro",
    {
      id_invitacion: "andres-castro",
      nombre_grupo: "Ing. Andrés Castro",
      cupos: 2,
      estado: "Confirmado",
      fecha_confirmacion: "2026-10-18 10:15:00",
      asistentes_confirmados: 1,
      integrantes_raw: "Andrés Castro; Mariana López",
      respuestas_raw: "Andrés Castro: Asiste | Mariana López: No asiste",
    },
  ],
  [
    "familia-ramirez",
    {
      id_invitacion: "familia-ramirez",
      nombre_grupo: "Familia Ramírez Duque",
      cupos: 3,
      estado: "Pendiente",
    },
  ],
]);

function getGoogleAuth() {
  const sheetId = process.env.GOOGLE_SHEET_ID;
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY;

  if (!sheetId || !clientEmail || !privateKey) {
    console.warn("[Sheets Config] Variables de entorno de Google Sheets no configuradas en el servidor:", {
      GOOGLE_SHEET_ID: !!sheetId,
      GOOGLE_SERVICE_ACCOUNT_EMAIL: !!clientEmail,
      GOOGLE_PRIVATE_KEY: !!privateKey,
    });
    return null;
  }

  // Limpiar posibles comillas agregadas al copiar/pegar en paneles como Vercel
  const cleanSheetId = sheetId.trim().replace(/^["']|["']$/g, "");
  const cleanEmail = clientEmail.trim().replace(/^["']|["']$/g, "");

  let cleanKey = privateKey.trim();
  if (
    (cleanKey.startsWith('"') && cleanKey.endsWith('"')) ||
    (cleanKey.startsWith("'") && cleanKey.endsWith("'"))
  ) {
    cleanKey = cleanKey.slice(1, -1);
  }
  // Reemplazar saltos de línea literales '\n' por saltos de línea reales
  cleanKey = cleanKey.replace(/\\n/g, "\n");

  // Tolerancia de 5 minutos ante desfase de reloj local de la máquina
  const now = Math.floor(Date.now() / 1000) - 300;

  const auth = new google.auth.JWT({
    email: cleanEmail,
    key: cleanKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    additionalClaims: {
      iat: now,
      exp: now + 3600,
    },
  });

  return { auth, sheetId: cleanSheetId };
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

/* ------------------------------------------------------------------ */
/* Integrantes y respuestas individuales                               */
/* ------------------------------------------------------------------ */

/** "Ana; Juan" | "Ana\nJuan" | "Ana, Juan" → ["Ana", "Juan"] */
function parseMemberNames(raw?: string): string[] {
  if (!raw) return [];
  const separator = /[;\n]/.test(raw) ? /[;\n]+/ : /,+/;
  return raw
    .split(separator)
    .map((n) => n.trim())
    .filter(Boolean);
}

/** "Ana: Asiste | Juan: No asiste" → Map(normalizado → respuesta) */
function parseResponses(raw?: string): Map<string, AttendanceResponse> {
  const map = new Map<string, AttendanceResponse>();
  if (!raw) return map;
  for (const chunk of raw.split("|")) {
    const idx = chunk.lastIndexOf(":");
    if (idx === -1) continue;
    const name = chunk.slice(0, idx).trim();
    const value = normalizeSearchString(chunk.slice(idx + 1));
    if (!name) continue;
    if (value.startsWith("no")) map.set(normalizeSearchString(name), "No asiste");
    else if (value.startsWith("asiste") || value.startsWith("si")) map.set(normalizeSearchString(name), "Asiste");
  }
  return map;
}

function serializeResponses(members: GuestMember[]): string {
  return members.map((m) => `${m.nombre}: ${m.respuesta ?? "Pendiente"}`).join(" | ");
}

/**
 * Construye la lista de integrantes (uno por cupo) con su respuesta individual.
 * - Si no hay nombres en la columna J, se generan etiquetas genéricas.
 * - Si no hay respuestas individuales (registros antiguos), se infieren del estado global.
 */
function buildMembers(params: {
  nombre_grupo: string;
  cupos: number;
  estado: GuestStatus;
  asistentes_confirmados?: number;
  integrantes_raw?: string;
  respuestas_raw?: string;
}): GuestMember[] {
  const { nombre_grupo, estado, asistentes_confirmados } = params;
  const names = parseMemberNames(params.integrantes_raw);
  const cupos = Math.max(1, params.cupos || names.length || 1);

  const resolvedNames = Array.from({ length: cupos }, (_, i) => {
    if (names[i]) return names[i];
    if (cupos === 1) return nombre_grupo;
    return i === 0 && names.length === 0 ? `Invitado/a principal` : `Acompañante ${i}`;
  });

  const responses = parseResponses(params.respuestas_raw);
  const hasIndividual = responses.size > 0;

  return resolvedNames.map((nombre, i) => {
    let respuesta: AttendanceResponse | undefined;
    if (hasIndividual) {
      respuesta = responses.get(normalizeSearchString(nombre));
    } else if (estado === "Cancelado") {
      respuesta = "No asiste";
    } else if (estado === "Confirmado") {
      const confirmed = asistentes_confirmados ?? cupos;
      respuesta = i < confirmed ? "Asiste" : "No asiste";
    }
    return { nombre, respuesta };
  });
}

/** Convierte una fila de Google Sheets en GuestInvitation */
function rowToGuest(row: unknown[]): GuestInvitation {
  const str = (v: unknown) => (v === undefined || v === null ? "" : String(v).trim());
  const nombre_grupo = str(row[1]) || "Estimado(a) Invitado(a)";
  const cupos = Number(row[2]) || 1;
  const estado = ((str(row[3]) as GuestStatus) || "Pendiente") as GuestStatus;
  const asistentes_confirmados = str(row[6]) ? Number(row[6]) : undefined;

  return {
    id_invitacion: normalizeId(str(row[0])),
    nombre_grupo,
    cupos,
    estado,
    fecha_confirmacion: str(row[4]) || undefined,
    mesa: str(row[5]) || undefined,
    asistentes_confirmados,
    restricciones_alimentarias: str(row[7]) || undefined,
    mensaje_novios: str(row[8]) || undefined,
    integrantes: buildMembers({
      nombre_grupo,
      cupos,
      estado,
      asistentes_confirmados,
      integrantes_raw: str(row[9]),
      respuestas_raw: str(row[10]),
    }),
  };
}

function mockToGuest(m: MockGuestRow): GuestInvitation {
  return {
    id_invitacion: m.id_invitacion,
    nombre_grupo: m.nombre_grupo,
    cupos: m.cupos,
    estado: m.estado,
    mesa: m.mesa,
    fecha_confirmacion: m.fecha_confirmacion,
    asistentes_confirmados: m.asistentes_confirmados,
    integrantes: buildMembers(m),
  };
}

function searchMock(cleanQuery: string): GuestInvitation[] {
  const results: GuestInvitation[] = [];
  for (const guest of mockGuests.values()) {
    const haystack = [guest.nombre_grupo, guest.id_invitacion, guest.integrantes_raw ?? ""].join(" ");
    if (normalizeSearchString(haystack).includes(cleanQuery)) {
      results.push(mockToGuest(guest));
    }
  }
  return results.slice(0, 8);
}

/* ------------------------------------------------------------------ */
/* API pública                                                          */
/* ------------------------------------------------------------------ */

/**
 * Obtiene la información del invitado por su ID de invitación
 */
export async function getGuestById(id: string): Promise<GuestInvitation | null> {
  const normalizedId = normalizeId(id);
  const googleConfig = getGoogleAuth();

  if (!googleConfig) {
    const guest = mockGuests.get(normalizedId);
    return guest ? mockToGuest(guest) : null;
  }

  try {
    const { auth, sheetId } = googleConfig;
    const sheets = google.sheets({ version: "v4", auth });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: SHEET_RANGE,
    });

    const rows = response.data.values;
    if (!rows || rows.length === 0) {
      return null;
    }

    const row = rows.find((r) => r[0] && normalizeId(String(r[0])) === normalizedId);
    return row ? rowToGuest(row) : null;
  } catch (error) {
    console.error("[Sheets] Error al consultar Google Sheets:", error);
    // Fallback a mock data si hay error de red o permisos
    const guest = mockGuests.get(normalizedId);
    return guest ? mockToGuest(guest) : null;
  }
}

/**
 * Busca invitados por nombre del grupo, nombre de un integrante o código de invitación
 */
export async function searchGuests(query: string): Promise<GuestInvitation[]> {
  const trimmed = query.trim();
  if (!trimmed || trimmed.length < 2) {
    return [];
  }

  const cleanQuery = normalizeSearchString(trimmed);
  const googleConfig = getGoogleAuth();

  if (!googleConfig) {
    return searchMock(cleanQuery);
  }

  try {
    const { auth, sheetId } = googleConfig;
    const sheets = google.sheets({ version: "v4", auth });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: SHEET_RANGE,
    });

    const rows = response.data.values;
    if (!rows || rows.length === 0) {
      return [];
    }

    const matchedGuests: GuestInvitation[] = [];

    for (const row of rows) {
      if (!row[0]) continue;
      const haystack = [row[0], row[1], row[9]].map((v) => (v ? String(v) : "")).join(" ");
      if (normalizeSearchString(haystack).includes(cleanQuery)) {
        matchedGuests.push(rowToGuest(row));
      }
      if (matchedGuests.length >= 8) break;
    }

    return matchedGuests;
  } catch (error) {
    console.error("[Sheets] Error al buscar invitados en Google Sheets:", error);
    return searchMock(cleanQuery);
  }
}

/**
 * Guarda la confirmación individual de cada integrante.
 * - estado global = "Confirmado" si al menos uno asiste, "Cancelado" si nadie asiste.
 * - asistentes_confirmados = número de integrantes que asisten.
 * - respuestas_individuales = detalle legible por persona.
 */
export async function updateGuestRSVP(
  data: RSVPFormData
): Promise<{ success: boolean; error?: string; guest?: GuestInvitation }> {
  const normalizedId = normalizeId(data.id_invitacion);
  const now = new Date().toLocaleString("es-CO", { timeZone: "America/Bogota" });

  const current = await getGuestById(normalizedId);
  if (!current) {
    return { success: false, error: "El código de invitación no coincide con ningún invitado." };
  }

  if (data.asistencia.length !== current.integrantes.length) {
    return { success: false, error: "La respuesta no coincide con los cupos de la invitación." };
  }

  const integrantes: GuestMember[] = current.integrantes.map((m, i) => ({
    nombre: m.nombre,
    respuesta: data.asistencia[i] ? "Asiste" : "No asiste",
  }));
  const asistentes = data.asistencia.filter(Boolean).length;
  const estado: GuestStatus = asistentes > 0 ? "Confirmado" : "Cancelado";
  const detalle = serializeResponses(integrantes);

  const updatedGuest: GuestInvitation = {
    ...current,
    estado,
    fecha_confirmacion: now,
    asistentes_confirmados: asistentes,
    integrantes,
  };

  const googleConfig = getGoogleAuth();

  if (!googleConfig) {
    // Actualizar en memoria si estamos en modo demo
    const existing = mockGuests.get(normalizedId);
    if (!existing) {
      return { success: false, error: "Invitación no encontrada en el sistema." };
    }
    mockGuests.set(normalizedId, {
      ...existing,
      estado,
      fecha_confirmacion: now,
      asistentes_confirmados: asistentes,
      integrantes_raw: existing.integrantes_raw ?? integrantes.map((m) => m.nombre).join("; "),
      respuestas_raw: detalle,
    });
    return { success: true, guest: updatedGuest };
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

    // Header es fila 1, A2 es index 0 en nuestro array → fila real = rowIndex + 2
    const targetRow = rowIndex + 2;

    // 2. Escritura atómica de las columnas del RSVP sin tocar F (mesa), H, I ni J
    await sheets.spreadsheets.values.batchUpdate({
      spreadsheetId: sheetId,
      requestBody: {
        valueInputOption: "USER_ENTERED",
        data: [
          { range: `Invitados!D${targetRow}:E${targetRow}`, values: [[estado, now]] },
          { range: `Invitados!G${targetRow}`, values: [[asistentes]] },
          { range: `Invitados!K${targetRow}`, values: [[detalle]] },
        ],
      },
    });

    return { success: true, guest: updatedGuest };
  } catch (error: unknown) {
    console.error("[Sheets] Error al actualizar estado en Google Sheets:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Ocurrió un error al guardar tu confirmación.",
    };
  }
}
