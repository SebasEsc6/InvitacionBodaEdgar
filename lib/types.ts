export type GuestStatus = "Pendiente" | "Confirmado" | "Cancelado";

/** Respuesta individual de cada integrante de la invitación */
export type AttendanceResponse = "Asiste" | "No asiste";

export interface GuestMember {
  nombre: string;
  /** undefined = aún no ha respondido */
  respuesta?: AttendanceResponse;
}

export interface GuestInvitation {
  id_invitacion: string;
  nombre_grupo: string;
  cupos: number;
  estado: GuestStatus;
  /** Integrantes de la invitación (uno por cupo), con su respuesta individual */
  integrantes: GuestMember[];
  mesa?: string;
  fecha_confirmacion?: string;
  asistentes_confirmados?: number;
  restricciones_alimentarias?: string;
  mensaje_novios?: string;
}

/**
 * Payload del RSVP individual.
 * `asistencia[i]` corresponde a `integrantes[i]` de la invitación (el servidor usa sus
 * propios nombres, el cliente solo envía el sí/no por posición).
 */
export interface RSVPFormData {
  id_invitacion: string;
  asistencia: boolean[];
  restricciones_alimentarias?: string;
  mensaje_novios?: string;
}

export interface EventDetails {
  fecha: string;
  fechaFormateada: string;
  hora: string;
  lugar: string;
  lugarEstado: string;
  dressCode: {
    nombre: string;
    descripcion: string;
    coloresReservados: Array<{ nombre: string; hex: string; desc: string }>;
  };
  regalo: {
    tipo: string;
    descripcion: string;
    icono: string;
  };
  fechaLimiteRSVP: string;
  spotifyTrackUrl: string;
}
