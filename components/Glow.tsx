"use client";

import { useRef } from "react";
import { gsap, useGsap } from "@/lib/gsap";

/** Soft accent radial glow that drifts against the scroll, giving sections depth. */
export default function Glow({
  className = "",
  shift = 120,
  strong = false,
}: {
  className?: string;
  shift?: number;
  strong?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGsap(() => {
    const el = ref.current;
    if (!el?.parentElement) return;
    gsap.fromTo(
      el,
      { y: -shift },
      {
        y: shift,
        ease: "none",
        scrollTrigger: {
          trigger: el.parentElement,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      },
    );
  }, ref);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full ${
        strong
          ? "bg-[radial-gradient(closest-side,rgb(var(--accent)/0.42),transparent)]"
          : "bg-[radial-gradient(closest-side,rgb(var(--accent)/0.14),transparent)]"
      } ${className}`}
    />
  );
}
