"use client";

import { useEffect, useRef, useState } from "react";
import { projects } from "@/lib/data";
import { gsap, REDUCED_MOTION, ScrollTrigger, useIsoLayoutEffect } from "@/lib/gsap";
import Glow from "./Glow";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import Reveal from "./Reveal";

const AUTO_ADVANCE_MS = 7000;
const HOVER_DELAY_MS = 120;
const FADE_PX = 28;
const DESKTOP = "(min-width: 1024px)";
const MOUSE = "(hover: hover) and (pointer: fine)";

export default function Projects() {
  const [active, setActive] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const interacted = useRef(false);
  const inView = useRef(false);
  const hoverTimer = useRef<number>();
  const firstRender = useRef(true);

  const project = projects[active];

  const choose = (index: number) => {
    interacted.current = true;
    setActive(index);
  };

  // Fade masks only on the sides where the list actually continues.
  const updateFade = () => {
    const el = scrollerRef.current;
    if (!el) return;
    const vertical = window.matchMedia(DESKTOP).matches;
    const pos = vertical ? el.scrollTop : el.scrollLeft;
    const size = vertical ? el.clientHeight : el.clientWidth;
    const total = vertical ? el.scrollHeight : el.scrollWidth;
    el.style.setProperty("--fade-start", pos > 4 ? `${FADE_PX}px` : "0px");
    el.style.setProperty("--fade-end", pos + size < total - 4 ? `${FADE_PX}px` : "0px");
  };

  // Slide the accent indicator, keep the active tab in view, and animate the card content.
  // Layout effect so the new card never paints un-animated for a frame.
  useIsoLayoutEffect(() => {
    const tab = tabRefs.current[active];
    const scroller = scrollerRef.current;
    const indicator = indicatorRef.current;
    if (!tab || !scroller) return;

    const reduced = window.matchMedia(REDUCED_MOTION).matches;
    const behavior = reduced ? "auto" : "smooth";

    const place = (instant: boolean) => {
      if (window.matchMedia(DESKTOP).matches) {
        gsap.to(indicator, { y: tab.offsetTop, duration: instant || reduced ? 0 : 0.5, ease: "power3.out", overwrite: true });
        scroller.scrollTo({ top: tab.offsetTop - (scroller.clientHeight - tab.offsetHeight) / 2, behavior });
      } else {
        scroller.scrollTo({ left: tab.offsetLeft - (scroller.clientWidth - tab.offsetWidth) / 2, behavior });
      }
      updateFade();
    };
    place(firstRender.current);

    const mq = window.matchMedia(DESKTOP);
    const onBreakpoint = () => place(true);
    mq.addEventListener("change", onBreakpoint);

    let ctx: gsap.Context | undefined;
    if (!firstRender.current && !reduced) {
      ctx = gsap.context(() => {
        gsap.fromTo(
          "[data-card-anim]",
          { opacity: 0, y: 24, filter: "blur(6px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.45, ease: "power2.out", clearProps: "filter" },
        );
      }, panelRef);
    }
    firstRender.current = false;
    // The card height can change between projects on small screens.
    const refresh = requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      mq.removeEventListener("change", onBreakpoint);
      cancelAnimationFrame(refresh);
      ctx?.revert();
    };
  }, [active]);

  // Auto-advance until the first interaction; pauses off-screen and while the modal is open.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => {
      inView.current = entry.isIntersecting;
    });
    observer.observe(section);

    const timer = window.setInterval(() => {
      if (interacted.current || !inView.current || modalOpen) return;
      if (window.matchMedia(REDUCED_MOTION).matches) return;
      setActive((i) => (i + 1) % projects.length);
    }, AUTO_ADVANCE_MS);

    return () => {
      observer.disconnect();
      window.clearInterval(timer);
    };
  }, [modalOpen]);

  useEffect(() => () => window.clearTimeout(hoverTimer.current), []);

  const onKeyDown = (e: React.KeyboardEvent) => {
    const last = projects.length - 1;
    const next =
      e.key === "ArrowDown" || e.key === "ArrowRight"
        ? (active + 1) % projects.length
        : e.key === "ArrowUp" || e.key === "ArrowLeft"
          ? (active - 1 + projects.length) % projects.length
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? last
              : null;
    if (next === null) return;
    e.preventDefault();
    choose(next);
    tabRefs.current[next]?.focus();
  };

  const onPointerEnter = (index: number, e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !window.matchMedia(MOUSE).matches || !window.matchMedia(DESKTOP).matches) return;
    window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => choose(index), HOVER_DELAY_MS);
  };

  return (
    <section id="projects" ref={sectionRef} className="section-y relative overflow-hidden">
      <Glow className="-left-48 top-10 h-[760px] w-[760px]" shift={140} />

      <div className="wrap relative z-10">
        <Reveal className="mb-12 sm:mb-16">
          <p className="eyebrow">Projects</p>
          <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            My <span className="text-accent-gradient">Projects</span>
          </h2>
          <p className="mt-5 text-base text-champagne/85 sm:text-lg">
            {projects.length} projects in total. Pick one to see the details.
          </p>
        </Reveal>

        <Reveal className="grid gap-6 lg:h-[430px] lg:grid-cols-[1fr_340px]">
          <div
            ref={panelRef}
            role="tabpanel"
            id="project-panel"
            aria-labelledby={`project-tab-${active}`}
            className="order-2 lg:order-1"
          >
            <ProjectCard project={project} onKnowMore={() => setModalOpen(true)} />
          </div>

          <div className="relative order-1 min-w-0 lg:order-2">
            <div
              ref={scrollerRef}
              onScroll={updateFade}
              className="fade-edges overflow-x-auto [scrollbar-width:none] lg:absolute lg:inset-0 lg:overflow-y-auto lg:overflow-x-hidden [&::-webkit-scrollbar]:hidden"
            >
              <div
                role="tablist"
                aria-label="Projects"
                aria-orientation="vertical"
                onKeyDown={onKeyDown}
                className="relative flex gap-3 py-1 lg:flex-col lg:py-0"
              >
                <div
                  ref={indicatorRef}
                  aria-hidden="true"
                  className="absolute left-0 top-0 hidden h-12 w-full rounded-full bg-accent-gradient shadow-glow lg:block"
                />
                {projects.map((item, i) => (
                  <button
                    key={item.name}
                    ref={(el) => {
                      tabRefs.current[i] = el;
                    }}
                    type="button"
                    role="tab"
                    id={`project-tab-${i}`}
                    aria-selected={active === i}
                    aria-controls="project-panel"
                    tabIndex={active === i ? 0 : -1}
                    title={item.name}
                    onClick={() => choose(i)}
                    onPointerEnter={(e) => onPointerEnter(i, e)}
                    onPointerLeave={() => window.clearTimeout(hoverTimer.current)}
                    className={`relative z-10 h-12 flex-none truncate whitespace-nowrap rounded-full border px-6 text-sm font-medium transition-[border-color,box-shadow,color] duration-300 lg:w-full ${
                      active === i
                        ? "border-transparent bg-accent-gradient text-on-accent shadow-glow lg:bg-none lg:shadow-none"
                        : "border-line bg-surface text-fg hover:border-accent/60 hover:shadow-glow"
                    }`}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      <ProjectModal project={project} open={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}
