import React from "react";

interface BotanicalDividerProps {
  className?: string;
  variant?: "leaf" | "flourish" | "simple";
}

export default function BotanicalDivider({
  className = "",
  variant = "leaf",
}: BotanicalDividerProps) {
  if (variant === "simple") {
    return (
      <div className={`flex items-center justify-center gap-3 my-8 ${className}`}>
        <span className="h-px w-16 bg-gradient-to-r from-transparent via-dorado-antiguo/50 to-dorado-antiguo" />
        <span className="w-1.5 h-1.5 rotate-45 bg-dorado-antiguo rounded-xs" />
        <span className="h-px w-16 bg-gradient-to-l from-transparent via-dorado-antiguo/50 to-dorado-antiguo" />
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-center gap-4 my-8 ${className}`}>
      <span className="h-px w-12 sm:w-24 bg-gradient-to-r from-transparent to-dorado-antiguo/60" />
      <svg
        width="32"
        height="20"
        viewBox="0 0 48 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-dorado-antiguo"
      >
        <path
          d="M24 15C20 9 10 7 2 10C8 17 18 17 24 15Z"
          fill="currentColor"
          fillOpacity="0.75"
        />
        <path
          d="M24 15C28 9 38 7 46 10C40 17 30 17 24 15Z"
          fill="currentColor"
          fillOpacity="0.75"
        />
        <circle cx="24" cy="15" r="2.5" fill="currentColor" />
      </svg>
      <span className="h-px w-12 sm:w-24 bg-gradient-to-l from-transparent to-dorado-antiguo/60" />
    </div>
  );
}
