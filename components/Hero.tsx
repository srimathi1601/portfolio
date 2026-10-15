"use client";

import { useRef, type ReactNode } from "react";
import { hero } from "@/lib/data";
import { gsap, FINE_POINTER_MOTION, useGsap } from "@/lib/gsap";
import { PRELOADER_DONE, isScrollLocked, scrollToId } from "@/lib/scroll";
import Button from "./Button";
import Magnetic from "./Magnetic";
import SparklesLazy from "./SparklesLazy";
import Typewriter from "./Typewriter";

export default function Hero({ photo }: { photo: ReactNode }) {
  const sectionRef = useRef<HTMLElement>(null);

  useGsap(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Intro: lines slide up out of their masks once the preloader hands over.
    const intro = gsap.timeline({
      paused: true,
      defaults: { ease: "power4.out" },
    });
    intro
      .from("[data-line]", { yPercent: 115, duration: 1.2, stagger: 0.12 })
      .from(
        "[data-fade]",
        { opacity: 0, y: 24, duration: 1, stagger: 0.12 },
        "-=0.8",
      )
      .fromTo(
        "[data-photo-reveal]",
        { clipPath: "inset(100% 0 0 0)" },
        {
          clipPath: "inset(0% 0 0 0)",
          duration: 1.5,
          ease: "power4.inOut",
          clearProps: "clipPath",
        },
        0.2,
      )
      .from("[data-photo-img]", { scale: 1.1, duration: 1.8 }, 0.2)
      .from(
        "[data-photo-glow]",
        { opacity: 0, duration: 1.6 },
        0.5,
      );

    const play = () => intro.play();
    if (isScrollLocked())
      window.addEventListener(PRELOADER_DONE, play, { once: true });
    else play();

    // Parallax fade as the hero scrolls away.
    const scrub = {
      trigger: section,
      start: "top top",
      end: "bottom top",
      scrub: true,
    };
    gsap.to("[data-hero-content]", {
      yPercent: -14,
      opacity: 0,
      ease: "none",
      scrollTrigger: scrub,
    });

    // Slow float, plus pointer parallax: the frame moves less than the glow behind it.
    gsap.to("[data-photo-float]", {
      y: -14,
      duration: 3.6,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });
    let removePointer: (() => void) | undefined;
    if (window.matchMedia(FINE_POINTER_MOTION).matches) {
      const move = (target: string) => ({
        x: gsap.quickTo(target, "x", { duration: 1.2, ease: "power3" }),
        y: gsap.quickTo(target, "y", { duration: 1.2, ease: "power3" }),
      });
      const frame = move("[data-photo-frame]");
      const glow = move("[data-photo-glow]");
      const onMove = (e: PointerEvent) => {
        const dx = e.clientX / window.innerWidth - 0.5;
        const dy = e.clientY / window.innerHeight - 0.5;
        frame.x(dx * 18);
        frame.y(dy * 14);
        glow.x(dx * 50);
        glow.y(dy * 40);
      };
      section.addEventListener("pointermove", onMove);
      removePointer = () => section.removeEventListener("pointermove", onMove);
    }

    return () => {
      window.removeEventListener(PRELOADER_DONE, play);
      removePointer?.();
    };
  }, sectionRef);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative flex min-h-[100svh] items-center overflow-hidden"
    >
      <SparklesLazy />

      <div
        data-hero-content
        className="wrap relative z-10 grid items-center gap-14 pb-24 pt-32 lg:grid-cols-[1.35fr_1fr] lg:gap-8"
      >
        <div>
          <p data-fade className="eyebrow">
            {hero.eyebrow}
          </p>

          <h1 className="font-heading text-[clamp(2.4rem,4.8vw,5.2rem)] lg:text-[clamp(2.4rem,4.4vw,5rem)] font-semibold leading-[1.02] tracking-tight">
            {hero.lines.map((line) => (
              <span
                key={line.text}
                className="block overflow-hidden pb-[0.14em] -mb-[0.14em]"
              >
                <span
                  data-line
                  className={`block ${line.accent ? "text-accent-gradient" : ""}`}
                >
                  {line.text}
                </span>
              </span>
            ))}
          </h1>

          <p
            data-fade
            className="mt-8 font-heading text-xl font-medium text-fg sm:text-3xl"
          >
            <Typewriter words={hero.roles} />
          </p>

          <p
            data-fade
            className="mt-6 max-w-xl text-base leading-relaxed text-champagne/80 sm:text-lg"
          >
            {hero.intro}
          </p>

          <div data-fade className="mt-10 flex flex-wrap gap-4">
            <Magnetic>
              <Button
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToId("projects");
                }}
              >
                View my work
              </Button>
            </Magnetic>
            <Magnetic>
              <Button
                href="#contact"
                variant="outline"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToId("contact");
                }}
              >
                Get in touch
              </Button>
            </Magnetic>
          </div>
        </div>

        <div>{photo}</div>
      </div>

      <div
        aria-hidden="true"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 sm:flex"
      >
        <span className="text-[0.65rem] uppercase tracking-[0.35em] text-champagne/70">
          Scroll
        </span>
        <span className="relative block h-12 w-px overflow-hidden bg-line">
          <span className="absolute inset-0 bg-accent-gradient [animation:scroll-cue_2s_ease-in-out_infinite]" />
        </span>
      </div>
    </section>
  );
}
