import React from "react";
import Image from "next/image";

interface WaxSealProps {
  initials?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

/**
 * Medallón de sello de cera (lacre) 3D realista con monograma caligráfico de Edgar y Camila.
 * Basado en la referencia fotográfica del cliente (cera color taupe/champagne oliva orgánico).
 */
export default function WaxSeal({
  size = "md",
  className = "",
}: WaxSealProps) {
  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-28 h-28 sm:w-32 sm:h-32",
    lg: "w-36 h-36 sm:w-44 sm:h-44",
  };

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none filter drop-shadow-[0_10px_22px_rgba(0,0,0,0.42)] transition-transform duration-300 hover:scale-105 ${sizeClasses[size]} ${className}`}
    >
      <picture className="block h-full w-full">
        <source srcSet="/images/sello-cera-ec.webp" type="image/webp" />
        <Image
          src="/images/sello-cera-ec.png"
          alt="Sello de cera Edgar y Camila"
          width={180}
          height={180}
          priority={false}
          className="h-full w-full object-contain pointer-events-none select-none"
        />
      </picture>
    </div>
  );
}
