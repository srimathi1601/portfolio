"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, REDUCED_MOTION } from "@/lib/gsap";
import { isScrollLocked, setLenis } from "@/lib/scroll";

/** Lenis smooth scroll driven by the GSAP ticker, plus late ScrollTrigger refreshes. */
export default function SmoothScroll() {
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    document.fonts.ready.then(refresh);
    window.addEventListener("load", refresh);

    let lenis: Lenis | null = null;
    let tick: ((time: number) => void) | null = null;

    if (!window.matchMedia(REDUCED_MOTION).matches) {
      lenis = new Lenis({ duration: 1.15, smoothWheel: true });
      setLenis(lenis);
      if (isScrollLocked()) lenis.stop();

      lenis.on("scroll", ScrollTrigger.update);
      const instance = lenis;
      tick = (time) => instance.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
    }

    return () => {
      window.removeEventListener("load", refresh);
      if (tick) gsap.ticker.remove(tick);
      lenis?.destroy();
      setLenis(null);
    };
  }, []);

  return null;
}
