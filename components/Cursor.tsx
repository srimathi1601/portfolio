"use client";

import { useEffect, useRef } from "react";
import { gsap, FINE_POINTER_MOTION } from "@/lib/gsap";

/** Dot + trailing accent ring. Only active on fine pointers with motion allowed. */
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring || !window.matchMedia(FINE_POINTER_MOTION).matches) return;

    const root = document.documentElement;
    root.classList.add("has-cursor");
    gsap.set([dot, ring], { xPercent: -50, yPercent: -50 });

    const dotX = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power3" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power3" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.55, ease: "power3" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.55, ease: "power3" });

    const show = (visible: boolean) => gsap.to([dot, ring], { opacity: visible ? 1 : 0, duration: 0.3 });
    const grow = (big: boolean) =>
      gsap.to(ring, { scale: big ? 1.9 : 1, duration: 0.35, ease: "power3.out", overwrite: "auto" });

    const onMove = (e: PointerEvent) => {
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
      show(true);
    };
    const onOver = (e: PointerEvent) => {
      grow(Boolean((e.target as Element).closest("a, button, [role='button']")));
    };
    const onLeave = () => show(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    root.addEventListener("pointerleave", onLeave);

    return () => {
      root.classList.remove("has-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      root.removeEventListener("pointerleave", onLeave);
      gsap.killTweensOf([dot, ring]);
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[95] h-10 w-10 rounded-full border border-accent/60 bg-accent/10 opacity-0 shadow-glow"
      />
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[95] h-1.5 w-1.5 rounded-full bg-accent-light opacity-0"
      />
    </>
  );
}
