"use client";

import { useRef } from "react";
import { FaEnvelope } from "react-icons/fa";
import { contact, site } from "@/lib/data";
import { gsap, useGsap } from "@/lib/gsap";
import Button from "./Button";
import Glow from "./Glow";
import { ArrowUpRight, Download, GitHub, LinkedIn } from "./Icons";
import Magnetic from "./Magnetic";
import Reveal from "./Reveal";
import SparklesLazy from "./SparklesLazy";
import SplitWords from "./SplitWords";

const rowClass =
  "group flex items-center justify-between gap-4 rounded-2xl border border-line bg-surface px-6 py-5 text-fg transition-[border-color,box-shadow] duration-500 hover:border-accent/60 hover:shadow-glow";
const arrowClass = "flex-none text-accent-light transition-transform duration-300 group-hover:translate-x-1";

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  // Heading words slide up out of their masks.
  useGsap(() => {
    gsap.from(".word", {
      yPercent: 115,
      duration: 1.2,
      stagger: 0.1,
      ease: "power4.out",
      scrollTrigger: { trigger: "[data-contact-heading]", start: "top 80%", once: true },
    });
  }, sectionRef);

  return (
    <section id="contact" ref={sectionRef} className="section-y relative overflow-hidden">
      <Glow className="left-1/2 top-1/4 h-[900px] w-[900px] -translate-x-1/2" shift={140} />
      <SparklesLazy area="full" density={0.8} />

      <div className="wrap relative z-10 grid items-center gap-14 lg:grid-cols-[1.2fr_1fr] lg:gap-10">
        <div>
          <p className="eyebrow">Contact</p>
          <h2
            data-contact-heading
            className="font-heading text-[clamp(2.6rem,7vw,6.5rem)] font-semibold leading-[1.02] tracking-tight"
          >
            {contact.heading.map((line, i) => (
              <span key={line} className="block">
                <SplitWords
                  text={line}
                  mask
                  wordClass={i === contact.heading.length - 1 ? "text-accent-gradient" : ""}
                />
              </span>
            ))}
          </h2>
        </div>

        <Reveal stagger className="flex flex-col gap-4">
          <a href={`mailto:${site.email}`} className={rowClass}>
            <span className="flex min-w-0 items-center gap-4">
              <FaEnvelope aria-hidden="true" className="flex-none text-xl text-accent-light" />
              <span className="truncate font-heading text-base font-medium sm:text-lg">{site.email}</span>
            </span>
            <ArrowUpRight className={arrowClass} />
          </a>

          <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className={rowClass}>
            <span className="flex items-center gap-4">
              <LinkedIn className="h-5 w-5 flex-none text-accent-light" />
              <span className="font-heading text-base font-medium sm:text-lg">LinkedIn</span>
            </span>
            <ArrowUpRight className={arrowClass} />
          </a>

          {site.github && (
            <a href={site.github} target="_blank" rel="noopener noreferrer" className={rowClass}>
              <span className="flex items-center gap-4">
                <GitHub className="h-5 w-5 flex-none text-accent-light" />
                <span className="font-heading text-base font-medium sm:text-lg">GitHub</span>
              </span>
              <ArrowUpRight className={arrowClass} />
            </a>
          )}

          <div className="pt-2">
            <Magnetic>
              <Button href={site.resume} download>
                <Download /> Download resume
              </Button>
            </Magnetic>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
