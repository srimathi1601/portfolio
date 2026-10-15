"use client";

import { useEffect, useRef } from "react";
import type { Project } from "@/lib/data";
import { gsap, FINE_POINTER_MOTION } from "@/lib/gsap";
import Button from "./Button";
import { ArrowUpRight } from "./Icons";
import Magnetic from "./Magnetic";
import { projectIcons } from "./projectIcons";
import SpotlightCard from "./SpotlightCard";

const hostname = (url: string) => new URL(url).hostname.replace(/^www\./, "");

/** Slightly tilted screenshot that leans toward the pointer. */
function TiltPreview({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia(FINE_POINTER_MOTION).matches) return;

    gsap.set(el, { transformPerspective: 1000 });
    const rotateX = gsap.quickTo(el, "rotationX", { duration: 0.6, ease: "power3" });
    const rotateY = gsap.quickTo(el, "rotationY", { duration: 0.6, ease: "power3" });
    const move = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      rotateY(((e.clientX - rect.left) / rect.width - 0.5) * 14);
      rotateX(-((e.clientY - rect.top) / rect.height - 0.5) * 14);
    };
    const leave = () => {
      rotateX(0);
      rotateY(0);
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
      gsap.killTweensOf(el);
    };
  }, []);

  return (
    <div className="relative mb-5 w-full sm:absolute sm:right-8 sm:top-8 sm:z-10 sm:mb-0 sm:w-[52%]">
      <div ref={ref} className="sm:-rotate-3 transition-shadow duration-500 hover:shadow-glow">
        <div className="overflow-hidden rounded-xl border border-accent/40 bg-ink">
          {/* Plain <img> on purpose: screenshots are dropped into /public/projects without size config. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={alt} loading="lazy" className="block h-auto w-full" />
        </div>
      </div>
    </div>
  );
}

export default function ProjectCard({ project, onKnowMore }: { project: Project; onKnowMore: () => void }) {
  const Icon = projectIcons[project.icon];
  const [first, ...rest] = project.links;

  return (
    <SpotlightCard
      as="div"
      className="h-full rounded-3xl bg-[linear-gradient(135deg,rgb(var(--accent)/0.12),rgb(var(--surface))_55%)] p-5 sm:p-8"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[radial-gradient(closest-side,rgb(var(--accent)/0.2),transparent)]"
      />

      <TiltPreview src={project.image} alt={`${project.name} screenshot`} />

      <div data-card-anim className="relative flex h-full flex-col items-start sm:max-w-[40%]">
        <span className="flex h-12 w-12 items-center justify-center rounded-full border border-accent/60 bg-accent/10 text-xl text-accent-light shadow-glow">
          <Icon aria-hidden="true" />
        </span>

        {project.kind && <p className="mt-5 text-xs uppercase tracking-[0.25em] text-accent">{project.kind}</p>}
        <h3 className={`font-heading text-3xl font-bold leading-tight sm:text-4xl ${project.kind ? "mt-2" : "mt-5"}`}>
          {project.name}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-champagne/85 sm:text-base">{project.description}</p>

        <ul className="mt-4 flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <li key={tech} className="chip !border-accent/50 !px-3 !py-1 !text-xs !text-accent-light">
              {tech}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap items-center gap-3 pt-6">
          {first && (
            <Magnetic>
              <Button href={first} external>
                {rest.length ? `View ${hostname(first)}` : "View Live"} <ArrowUpRight />
              </Button>
            </Magnetic>
          )}
          {rest.map((url) => (
            <Magnetic key={url}>
              <Button href={url} external variant="outline">
                View {hostname(url)} <ArrowUpRight />
              </Button>
            </Magnetic>
          ))}
          <button
            type="button"
            onClick={onKnowMore}
            className="rounded-full border border-accent-light/70 bg-ink px-7 py-3 text-sm font-medium text-fg shadow-[0_0_24px_rgb(var(--accent)/0.4)] transition-shadow duration-500 hover:shadow-[0_0_36px_rgb(var(--accent)/0.7)]"
          >
            Know more
          </button>
        </div>
      </div>

    </SpotlightCard>
  );
}
