"use client";

import { useRef } from "react";
import { gsap, useGsap } from "@/lib/gsap";

/** Counts from 0 to `value` the first time it scrolls into view. Renders the final number without motion. */
export default function CountUp({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useGsap(() => {
    const el = ref.current;
    if (!el) return;
    const counter = { n: 0 };
    el.textContent = `0${suffix}`;
    gsap.to(counter, {
      n: value,
      duration: 1.8,
      ease: "power2.out",
      onUpdate: () => {
        el.textContent = `${Math.round(counter.n)}${suffix}`;
      },
      scrollTrigger: { trigger: el, start: "top 90%", once: true },
    });
  }, ref);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}
