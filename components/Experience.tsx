"use client";

import { useRef, useState } from "react";
import { experience } from "@/lib/data";
import { gsap, ScrollTrigger, useGsap } from "@/lib/gsap";
import SectionHeading from "./SectionHeading";

type Item = (typeof experience)[number];

function ExperienceCard({
  item,
  id,
  open,
  onToggle,
}: {
  item: Item;
  id: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <li
      data-exp
      className={`rounded-2xl border bg-surface transition-[border-color,box-shadow] duration-500 ${
        open
          ? "border-accent/60 shadow-[0_0_40px_-8px_rgb(var(--accent-glow)/0.45)]"
          : "border-accent/25 hover:border-accent/50"
      }`}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={onToggle}
        className="flex w-full items-start justify-between gap-4 p-6 text-left"
      >
        <span>
          <span className="block text-xs uppercase tracking-[0.2em] text-accent">{item.period}</span>
          <span className="mt-3 block font-heading text-xl font-semibold text-fg sm:text-2xl">{item.role}</span>
          <span className="mt-1 block text-sm text-champagne/85">
            {item.company}, {item.location}
          </span>
        </span>
        <span
          aria-hidden="true"
          className={`mt-1 flex h-8 w-8 flex-none items-center justify-center rounded-full border border-accent/40 text-lg leading-none text-accent transition-transform duration-500 ${
            open ? "rotate-45" : ""
          }`}
        >
          +
        </span>
      </button>

      <div
        id={id}
        onTransitionEnd={(e) => {
          if (e.target === e.currentTarget) ScrollTrigger.refresh();
        }}
        className={`grid transition-[grid-template-rows] duration-500 ease-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden" aria-hidden={!open}>
          <ul className="space-y-3 px-6 pb-6 text-sm">
            {item.points.map((point) => (
              <li key={point} className="flex gap-3 leading-relaxed text-champagne/85">
                <span aria-hidden="true" className="mt-2 h-1 w-1 flex-none rounded-full bg-accent" />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </li>
  );
}

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  // Accordion: all closed at first, and opening one closes the others.
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useGsap(() => {
    gsap.from("[data-exp]", {
      opacity: 0,
      y: 50,
      duration: 1,
      stagger: 0.15,
      ease: "power3.out",
      clearProps: "transform",
      scrollTrigger: { trigger: "[data-exp-list]", start: "top 85%", once: true },
    });
  }, sectionRef);

  return (
    <section id="experience" ref={sectionRef} className="section-y relative overflow-hidden">
      {/* Teal glow rising from the bottom edge of the section */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 h-[480px] w-[900px] max-w-[140%] -translate-x-1/2 translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgb(var(--accent-glow))_0%,transparent_70%)] opacity-60 blur-[140px] [:root[data-theme=light]_&]:opacity-30"
      />

      <div className="wrap relative z-10">
        <SectionHeading eyebrow="Experience" center>
          Where I&apos;ve <span className="text-accent-gradient">worked</span>
        </SectionHeading>

        <ol data-exp-list className="grid gap-6 md:grid-cols-3">
          {experience.map((item, i) => (
            <ExperienceCard
              key={item.role}
              item={item}
              id={`experience-${i}`}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}
