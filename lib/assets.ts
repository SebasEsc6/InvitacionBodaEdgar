/**
 * Manifiesto de imágenes de la invitación.
 *
 * Cada "slot" tiene un nombre de archivo fijo. Para reemplazar una imagen basta con
 * subir tu archivo a la carpeta correspondiente con ESE nombre (sin tocar código).
 * Si el archivo no existe, se usa automáticamente la imagen por defecto de
 * `public/images/defaults/`.
 *
 * Ver guía completa en `public/images/README.md`.
 */

/** Fotos (carpeta `public/images/fotos/`). Extensiones aceptadas: jpg, jpeg, webp, png. */
export type PhotoSlot = "portada" | "dresscode" | "ubicacion";

/** Flores (carpeta `public/images/flores/`). Deben ser PNG/WebP con fondo transparente. */
export type FlowerSlot =
  | "01-portada-bienvenida"
  | "02-detalles-rsvp"
  | "03-final"
  | "lateral-izquierda"
  | "lateral-derecha";

const PHOTO_EXTENSIONS = ["jpg", "jpeg", "webp", "png"] as const;
const FLOWER_EXTENSIONS = ["png", "webp"] as const;

/** Lista ordenada de rutas candidatas: primero lo que sube el usuario, al final el default. */
export function photoSources(slot: PhotoSlot): string[] {
  return [
    ...PHOTO_EXTENSIONS.map((ext) => `/images/fotos/${slot}.${ext}`),
    `/images/defaults/${slot}.jpg`,
  ];
}

export function flowerSources(slot: FlowerSlot): string[] {
  return [
    ...FLOWER_EXTENSIONS.map((ext) => `/images/flores/${slot}.${ext}`),
    `/images/defaults/flores/${slot}.png`,
    `/images/defaults/flores/${slot}.svg`,
  ];
}
