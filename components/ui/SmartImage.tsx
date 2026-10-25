"use client";

import React, { useEffect, useRef, useState } from "react";

interface SmartImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src"> {
  /** Rutas candidatas en orden de prioridad. Se usa la primera que cargue correctamente. */
  sources: string[];
}

/**
 * <img> que prueba varias rutas en orden. Permite que el usuario sobrescriba una imagen
 * subiéndola con el nombre esperado y, si no existe, caer a la imagen por defecto.
 */
export default function SmartImage({ sources, alt, onError, ...rest }: SmartImageProps) {
  const [index, setIndex] = useState(0);
  const imgRef = useRef<HTMLImageElement>(null);
  const last = sources.length - 1;

  // Cubre el caso en que el error ocurre antes de que React hidrate el onError.
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0 && index < last) {
      setIndex((i) => Math.min(i + 1, last));
    }
  }, [index, last]);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={imgRef}
      src={sources[Math.min(index, last)]}
      alt={alt}
      onError={(e) => {
        setIndex((i) => Math.min(i + 1, last));
        onError?.(e);
      }}
      {...rest}
    />
  );
}
