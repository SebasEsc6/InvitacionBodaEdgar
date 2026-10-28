# Prompt Maestro: Sistema de Invitación Digital para Boda

**Rol:** Eres un Senior Full-Stack Developer y UI/UX Designer experto en Next.js (App Router), Tailwind CSS, GSAP y arquitecturas Serverless.

## 1. Contexto del Proyecto
Desarrollo de una invitación digital de boda interactiva con un enfoque "Long-Scroll". La estética visual se define como natural, elegante, romántica y atemporal. No usaremos una base de datos tradicional, sino **Google Sheets** como "backend" para gestionar la lista de invitados y sus confirmaciones, facilitando el acceso a los clientes (los novios).

## 2. Información del Evento (Datos Fijos)
* **Fecha:** 05/12/2026
* **Hora:** 4:00 PM
* **Lugar:** Por confirmar
* **Dress Code / Colores reservados:** Verde y Beige
* **Regalo:** Lluvia de sobres
* **Fecha Límite RSVP:** 13 de noviembre
* **Música:** [Canción de Spotify](https://open.spotify.com/track/4l5HZ6iRc2oN5NtcT141yq?si=agH-0jHjTDOaqu4j5BsB7w&utm_source=whatsapp)
* **Inspiración Visual:** [Tablero de Pinterest](https://pin.it/tAEQlpjXc)

## 3. Sistema de Diseño (UI/UX)
El diseño debe basarse en un contraste elegante, utilizando tipografías Serif clásicas para títulos y Sans-Serif limpias para textos descriptivos. 

### Paleta de Colores (Requerida en Tailwind):
* **Marfil:** `#F4F0E6` (Ideal para fondos claros, manteles y telas)
* **Verde Salvia:** `#777D62` (Servilletas, detalles suaves)
* **Verde Bosque:** `#263D30` (Fondos oscuros, follaje, textos principales de alto contraste)
* **Yute Natural:** `#C4A77D` (Fibras, individuales, acentos)
* **Dorado Antiguo:** `#B79A53` (Cubiertos, detalles lujosos, bordes)
* **Madera Nogal:** `#805D40` (Mobiliario, textos secundarios oscuros)

### Estructura de Secciones (Long-Scroll):
1. **Hero / Portada:** Foto a pantalla completa (`portada`), nombres grandes centrados y legibles ("Edgar y Camila" con 'y' elegante), fecha y cuenta regresiva sobria (sin botón de deslizar ni badges tipo eyebrow).
2. **Mensaje de Bienvenida:** Texto cálido y romántico sobre verde oscuro, con la fecha grande.
3. **Cronograma (Timing):** Horas grandes en serif centradas, título y descripción (sin tarjetas).
4. **Dress Code:** Texto + foto de ambiente (`dresscode`) con círculos de la paleta reservada encima.
5. **Ubicación / Location:** Foto del lugar (`ubicacion`) fundida con el fondo, detalles y botones de mapa (cuando se confirme).
6. **Detalles (Detalis):** Explicación de la "Lluvia de sobres" sobre papel beige.
7. **RSVP (Formulario):** Condicional basado en el estado del invitado.
8. **Footer:** "¡Te esperamos!", sello y flores finales.

### Diseño Visual de Referencia (layout editorial, "copiar la estructura, NO los colores")
Se tomó como referencia una invitación larga en columna con secciones que **alternan fondo oscuro y papel beige**. Se replica la *estructura y estilo*, pero **siempre con la paleta de este proyecto** (Verde Bosque / Marfil / Yute / Dorado), nunca con los colores de la referencia.
* **Alternancia de fondos:**
  * Secciones oscuras (`.section-dark`, `.section-dark-alt`, `.section-deep` en `globals.css`): Bienvenida, Dress code, Ubicación, RSVP, Footer.
  * Secciones claras "papel" (`.bg-paper-beige`, #E8E0CD): Cronograma y Detalles.
* **Papel rasgado:** las secciones claras llevan `<TornEdge position="top|bottom" />` en ambos bordes (requieren `relative` y **sin** `overflow-hidden`). El color del borde debe coincidir con el fondo (`text-marfil-200`).
* **Flores como separadores:** Ramilletes hiperrealistas generados con IA (PNG con transparencia). `<FlowerDivider slot="..." edge="top|bottom" />` centra un ramo sobre el borde de la sección (mitad dentro, mitad fuera). Las secciones que lo usan llevan `pt-44 sm:pt-60` (o `pb-*` equivalente) para que las flores no tapen texto. `<FlowerAccent side="left|right" />` pone flores laterales en las secciones claras.
* **Tipografía:**
  * Títulos caligráficos románticos: **Great Vibes Regular** (cargada localmente con `next/font/local` desde `public/tipografia/GreatVibes-Regular.ttf`).
  * Títulos y acentos serif: **Bodoni Moda** (alta costura editorial, contraste refinado, kerning cerrado/elegante).
  * Textos descriptivos: **Montserrat** limpia y legible.
* **Cero elementos tipo 'IA':** Prohibidos los eyebrows con puntitos/tracking robótico (`WEDDING · ...`), prohibidos los botones de 'deslizar hacia abajo' con flechas rebotando, y prohibidos los badges/pills con iconos genéricos. Títulos y subtítulos limpios, centrados y con respiración natural.
* **Nombres:** "Edgar y Camila" destacados con máxima legibilidad en Great Vibes y conector "y".
* **Fotos responsivas:** sin cortes agresivos en móvil o PC (`aspect-[16/10] sm:aspect-[16/9]` y `object-cover object-center`).
* **Música integrada:** soporte nativo para `public/audio/musica.mp3` con reproducción fluida continua y fallback a Spotify.
* **Botones:** pill con degradado verde y borde dorado fino (sobre oscuro) o contorno verde (sobre papel beige).
* **Animación:** `FadeUp` (GSAP ScrollTrigger) en cada bloque de contenido.

### Sistema de Imágenes y Multimedia (`public/`)
* **Fotos** en `public/images/fotos/`: `portada`, `dresscode`, `ubicacion` (`.jpg` recomendado).
* **Flores editables (Chroma)** en `public/images/flores_para_photoshop/`: archivos con fondo verde uniforme (`#00FF00` / `#70E000`) para recorte rápido en Photoshop (`01-portada-bienvenida-chroma`, `02-detalles-rsvp-chroma`, `03-final-chroma`, `lateral-izquierda-chroma`, `lateral-derecha-chroma`).
* **Flores transparentes en uso** en `public/images/flores/` (PNG con transparencia limpia guardados tras recortar el chroma): `01-portada-bienvenida.png`, `02-detalles-rsvp.png`, `03-final.png`, `lateral-izquierda.png`, `lateral-derecha.png`.
* **Tipografía local** en `public/tipografia/`: `GreatVibes-Regular.ttf` (respaldada además por `@font-face` y Google Fonts).
* **Audio local** en `public/audio/`: `musica.mp3` (5.3 MB verificado y conectado al reproductor flotante).
* **Defaults** en `public/images/defaults/` (no editar): se usan automáticamente si el archivo del usuario no existe.
* El manifiesto único es `lib/assets.ts` (`photoSources`, `flowerSources`); el componente `SmartImage` prueba las rutas en orden. **No hardcodear rutas de imágenes en las secciones.**
* Guías completas: `public/images/README.md`, `public/images/flores_para_photoshop/README.md` y `public/audio/README.md`.

## 4. Arquitectura y Lógica de Datos (Next.js + Google Sheets)
* **Base de Datos (Google Sheets):** Tendrá las columnas: `id_invitacion`, `nombre_grupo`, `cupos`, `estado` (Pendiente, Confirmado, Cancelado).
* **Rutas Dinámicas:** La aplicación usará `/invite/[id]`. 
* **Lógica Server-Side:**
  * Al ingresar a la URL, Next.js lee la hoja de cálculo.
  * Si el `estado` es **"Pendiente"**, se renderiza el long-scroll completo incluyendo la sección interactiva del formulario RSVP al final.
  * Si el `estado` es **"Confirmado"** o **"Cancelado"**, la sección del formulario RSVP se bloquea u oculta, mostrando en su lugar un mensaje de agradecimiento y manteniendo visible la información del evento (timing, ubicación, etc.).
* **Mutación:** Un *Server Action* que reciba la confirmación del cliente y actualice la celda `estado` en Google Sheets.

### Implementación actual (referencia de archivos)
* `app/page.tsx` → home de demostración (sin RSVP) con panel plegable para abrir invitaciones de prueba.
* `app/invite/[id]/page.tsx` → Server Component: `getGuestById(id)`; si no existe → `notFound()`; renderiza todas las secciones y pasa `guest` a `RSVPSection`.
* `lib/sheets.ts` → lee/escribe la hoja `Invitados` (columnas A–H: `id_invitacion, nombre_grupo, cupos, estado, fecha_confirmacion, asistentes_confirmados, restricciones_alimentarias, mensaje_novios`). Sin variables de entorno usa un modo demo en memoria.
* `app/actions/rsvp.ts` → Server Action `submitRSVP`, valida y llama `updateGuestRSVP`, luego `revalidatePath`.
* `components/sections/*` → una sección por archivo; `FooterSection` es compartido por la home y `/invite/[id]`.
* Variables de entorno: ver `.env.example` (`GOOGLE_SHEET_ID`, `GOOGLE_SERVICE_ACCOUNT_EMAIL`, `GOOGLE_PRIVATE_KEY`).

## 5. Tareas Específicas para la IA
Por favor, genera el código paso a paso para:
1. **Estructura base:** Organización de carpetas recomendada en el `App Router`.
2. **Configuración de Tailwind:** El archivo `tailwind.config.js` extendido con la paleta de colores proporcionada.
3. **Conexión a Google Sheets:** El código de utilidad (ej. `lib/sheets.ts`) para leer y actualizar la hoja usando las credenciales de servicio de Google.
4. **Página Dinámica (`app/invite/[id]/page.tsx`):** El Server Component que maneja la lógica de estado (Pendiente vs Confirmado).
5. **Animaciones Base:** Un componente envoltorio o hook usando **GSAP** (`ScrollTrigger`) para que las secciones aparezcan con un efecto de "fade-up" suave a medida que el usuario hace scroll.
6. **Reproductor de Música:** Un componente minimalista (flotante o fijo) que maneje el enlace de Spotify y cumpla con las políticas de autoplay de los navegadores.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
