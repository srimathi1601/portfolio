"use client";

import { useEffect, useState } from "react";
import { REDUCED_MOTION } from "@/lib/gsap";

/** Types and deletes each word in turn. Shows the first word statically with reduced motion. */
export default function Typewriter({ words }: { words: string[] }) {
  const [text, setText] = useState(words[0]);

  useEffect(() => {
    if (window.matchMedia(REDUCED_MOTION).matches) return;

    let word = 0;
    let length = words[0].length;
    let deleting = true;
    let timer: number;

    const tick = () => {
      let delay: number;
      if (deleting) {
        length -= 1;
        if (length === 0) {
          deleting = false;
          word = (word + 1) % words.length;
        }
        delay = 40;
      } else {
        length += 1;
        const done = length === words[word].length;
        if (done) deleting = true;
        delay = done ? 1800 : 80;
      }
      setText(words[word].slice(0, length));
      timer = window.setTimeout(tick, delay);
    };

    timer = window.setTimeout(tick, 2200);
    return () => window.clearTimeout(timer);
  }, [words]);

  return (
    <span className="inline-flex min-h-[1.4em] items-center">
      <span className="text-accent-gradient">{text}</span>
      <span
        aria-hidden="true"
        className="ml-1 inline-block h-[1.1em] w-0.5 bg-accent-light [animation:caret_1s_steps(1)_infinite]"
      />
    </span>
  );
}
