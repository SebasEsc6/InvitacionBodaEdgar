import React from "react";

interface WaxSealProps {
  initials?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function WaxSeal({
  initials = "E & M",
  size = "md",
  className = "",
}: WaxSealProps) {
  const sizeClasses = {
    sm: "w-12 h-12 text-xs",
    md: "w-20 h-20 text-sm",
    lg: "w-28 h-28 text-base",
  };

  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-full select-none ${sizeClasses[size]} ${className}`}
      style={{
        background: "radial-gradient(circle at 35% 35%, #D4BC7B 0%, #B79A53 50%, #8A6F33 100%)",
        boxShadow:
          "inset 0 2px 4px rgba(255, 255, 255, 0.4), inset 0 -3px 6px rgba(0, 0, 0, 0.35), 0 8px 20px -4px rgba(138, 111, 51, 0.4)",
      }}
    >
      {/* Outer irregular seal ring */}
      <div className="absolute inset-1 rounded-full border border-dorado-antiguo-light/40 opacity-70" />

      {/* Inner embossed stamp */}
      <div className="relative flex flex-col items-center justify-center text-center">
        <span
          className="font-script tracking-wider text-verde-bosque-deep font-bold drop-shadow-[0_1px_1px_rgba(255,255,255,0.4)]"
          style={{ textShadow: "0 1px 1px rgba(255,255,255,0.4), 0 -1px 1px rgba(0,0,0,0.3)" }}
        >
          {initials}
        </span>
      </div>
    </div>
  );
}
