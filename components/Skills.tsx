"use client";

import { skillsIntro } from "@/lib/data";
import { scrollToId } from "@/lib/scroll";
import Button from "./Button";
import Glow from "./Glow";
import Magnetic from "./Magnetic";
import Reveal from "./Reveal";
import SkillWheel from "./SkillWheel";

export default function Skills() {
  return (
    <section id="skills" className="relative overflow-hidden py-14 sm:py-20">
      <Glow strong className="-right-40 -top-72 h-[800px] w-[800px]" shift={80} />

      <div className="wrap relative z-10">
        <Reveal>
          <p className="eyebrow">Skills</p>
          <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            My <span className="text-accent-gradient">Skills</span>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-champagne/90 sm:text-base">{skillsIntro}</p>
          <div className="mt-6">
            <Magnetic>
              <Button
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToId("contact");
                }}
              >
                Contact me
              </Button>
            </Magnetic>
          </div>
        </Reveal>

        <Reveal className="-mt-2 sm:-mt-6">
          <SkillWheel />
        </Reveal>
      </div>
    </section>
  );
}
