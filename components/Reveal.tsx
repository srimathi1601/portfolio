"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, useGsap } from "@/lib/gsap";

type Props = {
  as?: ElementType;
  className?: string;
  /** Animate direct children one after another instead of the element itself. */
  stagger?: boolean;
  delay?: number;
  children: ReactNode;
};

/** Fade + translate + slight blur on scroll. Content stays visible without motion. */
export default function Reveal({ as: Tag = "div", className, stagger, delay = 0, children }: Props) {
  const ref = useRef<HTMLElement>(null);

  useGsap(() => {
    const el = ref.current;
    if (!el) return;
    gsap.from(stagger ? Array.from(el.children) : el, {
      opacity: 0,
      y: 40,
      filter: "blur(6px)",
      duration: 1,
      delay,
      stagger: stagger ? 0.12 : 0,
      ease: "power3.out",
      clearProps: "filter,transform",
      scrollTrigger: { trigger: el, start: "top 88%", once: true },
    });
  }, ref);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
