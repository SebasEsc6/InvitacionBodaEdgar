# Guía de imágenes de la invitación

Todas las imágenes tienen **un nombre fijo**. Solo sube tu archivo a la carpeta correcta con ese
nombre y la web lo usa automáticamente (no hay que tocar código). Si el archivo no existe, se muestra
la imagen por defecto de `defaults/`.

> Después de subir un archivo nuevo, recarga con **Ctrl + F5** (el navegador guarda la anterior en caché).

```
public/images/
├── fotos/                ← TUS FOTOS (con estos nombres)
│   ├── portada.jpg
│   ├── dresscode.jpg
│   └── ubicacion.jpg
├── flores/               ← TUS FLORES (PNG con fondo transparente)
│   ├── 01-portada-bienvenida.png
│   ├── 02-detalles-rsvp.png
│   ├── 03-final.png
│   ├── lateral-izquierda.png
│   └── lateral-derecha.png
└── defaults/             ← NO TOCAR: imágenes de respaldo
```

## 1. Fotos → `public/images/fotos/`

| Nombre | Dónde aparece | Medidas recomendadas | Notas |
|---|---|---|---|
| `portada.jpg` | Fondo de la portada (hero) | **1600 × 2000 px** (vertical 4:5) | Que los novios queden en la mitad superior: abajo se oscurece para leer los nombres. |
| `dresscode.jpg` | Foto bajo el texto de Dress code (los círculos de color van encima) | **1800 × 1200 px** (horizontal 3:2) | Mejor una foto de ambiente/mesa, sin texto. |
| `ubicacion.jpg` | Foto del lugar en la sección Ubicación | **1800 × 1200 px** (horizontal 3:2) | Se desvanece arriba y abajo hacia el fondo verde. |

- Formatos aceptados: `.jpg` (recomendado), `.jpeg`, `.webp`, `.png` (con el mismo nombre base).
- Peso recomendado: **menos de 400 KB** cada una (comprime en squoosh.app). Pesan mucho en celulares.

## 2. Flores → `public/images/flores/`

Deben ser **PNG (o WebP) con fondo transparente**.

| Nombre | Dónde aparece | Medidas recomendadas | Cómo diseñarla |
|---|---|---|---|
| `01-portada-bienvenida.png` | Separa la **portada** de la **bienvenida** | **2000 × 1000 px** (2:1) | Ramo horizontal centrado. Queda a la mitad sobre la foto y a la mitad sobre el fondo verde. |
| `02-detalles-rsvp.png` | Separa **Detalles** (beige) de **Confirmación** (verde) | **2000 × 1000 px** (2:1) | Igual que la anterior. |
| `03-final.png` | Cierra la invitación, sobre el **footer** | **2000 × 1000 px** (2:1) | Igual que la anterior. |
| `lateral-izquierda.png` | Asoma por el borde **izquierdo** en Cronograma y Detalles | **800 × 1200 px** (vertical) | Flores pegadas al borde **izquierdo** de la imagen (se cortan en el borde de la pantalla). |
| `lateral-derecha.png` | Asoma por el borde **derecho** en Cronograma y Detalles | **800 × 1200 px** (vertical) | Flores pegadas al borde **derecho** de la imagen. |

- Exporta con el ramo ocupando casi todo el ancho de la imagen, para que no se vea pequeño.
- Si solo tienes un ramo, puedes **copiar el mismo archivo** con los 3 nombres de separador.
- Si solo tienes una lateral, duplícala con los dos nombres (para la derecha, voltéala horizontalmente).

## 3. Agregar más separadores (opcional)

1. Agrega el nombre nuevo en `lib/assets.ts` (tipo `FlowerSlot`).
2. Pon `<FlowerDivider slot="mi-nombre" edge="top" />` dentro de la sección (que sea `relative`).
3. Dale más padding superior a esa sección (`pt-44` en móvil) para que las flores no tapen el texto.
