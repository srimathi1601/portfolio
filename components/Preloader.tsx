"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, REDUCED_MOTION } from "@/lib/gsap";
import { PRELOADER_DONE, unlockScroll } from "@/lib/scroll";

/** Monogram + progress, then a curtain wipe into the page. Fires PRELOADER_DONE when finished. */
export default function Preloader() {
  const [done, setDone] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const markRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const finish = () => {
      unlockScroll();
      window.dispatchEvent(new Event(PRELOADER_DONE));
      setDone(true);
    };

    if (window.matchMedia(REDUCED_MOTION).matches) {
      finish();
      return;
    }

    let cancelled = false;
    const progress = { value: 0 };
    const render = () => {
      if (barRef.current) barRef.current.style.transform = `scaleX(${progress.value / 100})`;
      if (countRef.current) countRef.current.textContent = String(Math.round(progress.value));
    };

    const pageLoaded = new Promise<void>((resolve) => {
      if (document.readyState === "complete") resolve();
      else window.addEventListener("load", () => resolve(), { once: true });
    });

    const tl = gsap.timeline();
    tl.from(markRef.current, { opacity: 0, y: 20, duration: 0.8, ease: "power3.out" }, 0);
    tl.to(progress, { value: 85, duration: 1.2, ease: "power2.out", onUpdate: render }, 0);

    // Hold at 85% until fonts and the page have really loaded, then finish and lift the curtain.
    Promise.all([document.fonts.ready, pageLoaded]).then(() => {
      if (cancelled) return;
      tl.to(progress, { value: 100, duration: 0.4, ease: "power1.inOut", onUpdate: render })
        .to(markRef.current, { opacity: 0, y: -20, duration: 0.4, ease: "power2.in" }, ">0.15")
        .to(rootRef.current, { clipPath: "inset(0 0 100% 0)", duration: 0.9, ease: "power4.inOut" }, ">-0.1")
        .add(finish)
        .play();
    });

    return () => {
      cancelled = true;
      tl.kill();
    };
  }, []);

  if (done) return null;

  return (
    <div
      ref={rootRef}
      role="status"
      aria-label="Loading"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink [clip-path:inset(0)]"
    >
      <div ref={markRef} className="flex flex-col items-center gap-8">
        <span className="font-heading text-8xl font-semibold leading-none text-accent-gradient sm:text-9xl">S</span>
        <div className="flex w-44 flex-col items-center gap-3">
          <div className="h-px w-full bg-line">
            <div ref={barRef} className="h-full origin-left scale-x-0 bg-accent-gradient" />
          </div>
          <span className="font-body text-xs tabular-nums tracking-[0.3em] text-champagne/70">
            <span ref={countRef}>0</span>%
          </span>
        </div>
      </div>
    </div>
  );
}
