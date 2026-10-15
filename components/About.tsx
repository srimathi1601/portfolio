"use client";

import { useRef } from "react";
import { FaCalendarCheck, FaGlobe, FaGraduationCap } from "react-icons/fa";
import { education, stats, summary } from "@/lib/data";
import { gsap, useGsap } from "@/lib/gsap";
import CountUp from "./CountUp";
import Glow from "./Glow";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import SpotlightCard from "./SpotlightCard";
import SplitWords from "./SplitWords";

const statIcons = [FaCalendarCheck, FaGlobe];

const badge =
  "flex h-12 w-12 flex-none items-center justify-center rounded-full border border-accent/60 bg-accent/10 text-lg text-accent-light";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  // Words brighten one by one as the paragraph travels up the screen.
  useGsap(() => {
    gsap.fromTo(
      ".word",
      { opacity: 0.55 },
      {
        opacity: 1,
        ease: "none",
        stagger: 0.1,
        scrollTrigger: {
          trigger: "[data-about-text]",
          start: "top 80%",
          end: "bottom 55%",
          scrub: true,
        },
      },
    );
  }, sectionRef);

  return (
    <section id="about" ref={sectionRef} className="section-y relative overflow-hidden">
      <Glow className="-left-40 top-10 h-[640px] w-[640px]" />
      <div className="wrap relative z-10">
        <SectionHeading eyebrow="About">
          A little <span className="text-accent-gradient">about me</span>
        </SectionHeading>

        <Reveal className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <SpotlightCard className="rounded-3xl bg-[linear-gradient(135deg,rgb(var(--accent)/0.12),rgb(var(--surface))_55%)] p-8 sm:p-12">
            <p
              data-about-text
              className="font-heading text-xl font-medium leading-relaxed text-fg sm:text-2xl sm:leading-[1.55]"
            >
              <SplitWords text={summary} />
            </p>
          </SpotlightCard>

          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, i) => {
                const Icon = statIcons[i];
                return (
                  <SpotlightCard key={stat.label} className="flex flex-col items-start gap-5 p-6">
                    <span className={badge}>
                      <Icon aria-hidden="true" />
                    </span>
                    <div>
                      <p className="font-heading text-5xl font-semibold tabular-nums text-accent-gradient">
                        <CountUp value={stat.value} suffix={stat.suffix} />
                      </p>
                      <p className="mt-2 text-xs uppercase tracking-[0.2em] text-champagne/85">{stat.label}</p>
                    </div>
                  </SpotlightCard>
                );
              })}
            </div>

            <SpotlightCard className="flex flex-1 items-start gap-5 p-6 sm:p-8">
              <span className={badge}>
                <FaGraduationCap aria-hidden="true" />
              </span>
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-accent">Education</p>
                <p className="mt-3 font-heading text-xl font-medium text-fg">{education.degree}</p>
                <p className="mt-1 text-sm text-champagne/85">{education.school}</p>
                <p className="mt-1 text-sm text-champagne/85">{education.period}</p>
              </div>
            </SpotlightCard>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
