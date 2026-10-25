"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface StaggerGroupProps {
  children: React.ReactNode;
  stagger?: number;
  duration?: number;
  className?: string;
  itemSelector?: string;
}

export default function StaggerGroup({
  children,
  stagger = 0.18,
  duration = 0.9,
  className = "",
  itemSelector = ".stagger-item",
}: StaggerGroupProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const items = container.querySelectorAll(itemSelector);
      if (items.length === 0) return;

      gsap.fromTo(
        items,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration,
          stagger,
          ease: "power2.out",
          scrollTrigger: {
            trigger: container,
            start: "top 85%",
            once: true,
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, [stagger, duration, itemSelector]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
