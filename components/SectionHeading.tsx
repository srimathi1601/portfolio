import type { ReactNode } from "react";
import Reveal from "./Reveal";

export default function SectionHeading({
  eyebrow,
  center,
  children,
}: {
  eyebrow: string;
  center?: boolean;
  children: ReactNode;
}) {
  return (
    <Reveal className={`mb-14 sm:mb-20 ${center ? "text-center" : ""}`}>
      <p className={`eyebrow ${center ? "justify-center" : ""}`}>{eyebrow}</p>
      <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">{children}</h2>
    </Reveal>
  );
}
