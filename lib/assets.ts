/**
 * Manifiesto de fotos de la invitación.
 *
 * NOTA: Para las flores (FlowerDivider y FlowerAccent), YA NO ES NECESARIO modificar este archivo.
 * Ahora puedes pasar directamente la ruta mediante el prop 'src' en el componente:
 *   <FlowerDivider src="/images/flores/Separador.png" size="full" />
 *   <FlowerAccent src="/images/flores/LateralIzq.png" size="lg" />
 *
 * Este archivo se conserva principalmente para la carga dinámica de fotos de portada/dresscode/ubicación.
 */

/** Fotos (carpeta `public/images/fotos/`). Extensiones aceptadas: jpg, jpeg, webp, png.
 *  - `inspiracion`: tablero de inspiración del Dress Code (sección "Inspírate").
 *  - `ubicacion`: fondo de la tarjeta de Hacienda el Pilar. */
export type PhotoSlot = "portada" | "dresscode" | "ubicacion" | "inspiracion";

/** Flores (carpeta `public/images/flores/`). Deben ser PNG/WebP con fondo transparente. */
export type FlowerSlot =
  | "01-portada-bienvenida"
  | "02-detalles-rsvp"
  | "03-final"
  | "lateral-izquierda"
  | "lateral-derecha"
  | "separador"
  | "final"
  | "centro-exuberante";

const PHOTO_EXTENSIONS = ["webp", "jpg", "jpeg", "png"] as const;
const FLOWER_EXTENSIONS = ["png", "webp"] as const;

/** Lista ordenada de rutas candidatas: primero lo que sube el usuario, al final el default. */
export function photoSources(slot: PhotoSlot): string[] {
  return [
    ...PHOTO_EXTENSIONS.map((ext) => `/images/fotos/${slot}.${ext}`),
    `/images/defaults/${slot}.jpg`,
  ];
}

export function flowerSources(slot: FlowerSlot): string[] {
  // Mapeo específico según los archivos subidos por el usuario en public/images/flores/
  const customUserFiles: Record<FlowerSlot, string[]> = {
    "01-portada-bienvenida": [
      "/images/flores/Separador.png",
      "/images/flores/01-portada-bienvenida.png",
      "/images/flores/01-portada-bienvenida.webp",
    ],
    "centro-exuberante": [
      "/images/flores/Centro floral blanco y verde exuberante.png",
      "/images/flores/Separador.png",
    ],
    "02-detalles-rsvp": [
      "/images/flores/Separador.png",
      "/images/flores/Centro floral blanco y verde exuberante.png",
      "/images/flores/02-detalles-rsvp.png",
      "/images/flores/02-detalles-rsvp.webp",
    ],
    "03-final": [
      "/images/flores/Final.png",
      "/images/flores/03-final.png",
      "/images/flores/Separador.png",
      "/images/flores/03-final.webp",
    ],
    "lateral-izquierda": [
      "/images/flores/LateralIzq.png",
      "/images/flores/lateral-izquierda.png",
      "/images/flores/lateral-izquierda.webp",
    ],
    "lateral-derecha": [
      "/images/flores/LateralDer.png",
      "/images/flores/lateral-derecha.png",
      "/images/flores/lateral-derecha.webp",
    ],
    "separador": [
      "/images/flores/Separador.png",
      "/images/flores/Centro floral blanco y verde exuberante.png",
      "/images/flores/01-portada-bienvenida.png",
    ],
    "final": [
      "/images/flores/Final.png",
      "/images/flores/03-final.png",
      "/images/flores/Separador.png",
    ],
  };

  const defaultKey =
    slot === "separador"
      ? "01-portada-bienvenida"
      : slot === "final"
      ? "03-final"
      : slot;

  return [
    ...(customUserFiles[slot] || []),
    ...FLOWER_EXTENSIONS.map((ext) => `/images/flores/${slot}.${ext}`),
    `/images/defaults/flores/${defaultKey}.png`,
    `/images/defaults/flores/${defaultKey}.svg`,
  ];
}
