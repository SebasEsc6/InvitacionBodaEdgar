export type GuestStatus = "Pendiente" | "Confirmado" | "Cancelado";

export interface GuestInvitation {
  id_invitacion: string;
  nombre_grupo: string;
  cupos: number;
  estado: GuestStatus;
  fecha_confirmacion?: string;
  asistentes_confirmados?: number;
  restricciones_alimentarias?: string;
  mensaje_novios?: string;
}

export interface RSVPFormData {
  id_invitacion: string;
  estado: "Confirmado" | "Cancelado";
  asistentes_confirmados: number;
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
