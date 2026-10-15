"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { skills } from "@/lib/data";
import { gsap, REDUCED_MOTION, useGsap } from "@/lib/gsap";
import { skillIcons } from "./skillIcons";

const STEP = 360 / skills.length;
const SECONDS_PER_TURN = 50;
const RESUME_DELAY = 2;
const DEG = Math.PI / 180;

/** Angle in [-180, 180). 0 means the top (active) slot. */
const wrap180 = (angle: number) => ((((angle + 180) % 360) + 360) % 360) - 180;

const vars = {
  "--r1": "min(44vw, 520px)",
  "--r2": "calc(var(--r1) * 0.72)",
  "--logo": "clamp(38px, 7.5vw, 104px)",
} as CSSProperties;

export default function SkillWheel() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const goToRef = useRef<(index: number) => void>(() => {});
  const mounted = useRef(false);

  const [active, setActive] = useState(0);
  const [preview, setPreview] = useState<number | null>(null);
  const [announce, setAnnounce] = useState(false);

  const shown = preview ?? active;
  const skill = skills[shown];
  const { Icon, color } = skillIcons[skill.id];

  // Continuous rotation along the arcs. Logos counter-rotate so they stay upright.
  useGsap(() => {
    const wrap = wrapRef.current;
    const ring = ringRef.current;
    if (!wrap || !ring) return;

    const state = { rot: 0, hover: false, focus: false, busy: false, inView: false, active: 0 };
    let resume: gsap.core.Tween | undefined;

    const render = () => {
      gsap.set(ring, { rotation: state.rot });
      let best = 0;
      let bestDiff = 360;
      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        const angle = i * STEP + state.rot;
        const phi = wrap180(angle);
        const diff = Math.abs(phi);
        if (diff < bestDiff) {
          bestDiff = diff;
          best = i;
        }
        const opacity = Math.min(1, Math.max(0, Math.cos(phi * DEG) * 3.5));
        gsap.set(el, {
          rotation: -angle,
          scale: 1 + 0.9 * Math.max(0, 1 - diff / 12),
          opacity,
          pointerEvents: opacity < 0.3 ? "none" : "auto",
        });
      });
      if (best !== state.active) {
        state.active = best;
        setActive(best);
      }
    };

    const tick = (_time: number, delta: number) => {
      if (!state.inView || state.hover || state.focus || state.busy) return;
      state.rot -= (360 / SECONDS_PER_TURN) * (delta / 1000);
      render();
    };

    const goTo = (index: number) => {
      resume?.kill();
      gsap.killTweensOf(state);
      state.busy = true;
      const base = -index * STEP;
      const target = base + 360 * Math.round((state.rot - base) / 360);
      gsap.to(state, {
        rot: target,
        duration: 1,
        ease: "power3.inOut",
        onUpdate: render,
        onComplete: () => {
          resume = gsap.delayedCall(RESUME_DELAY, () => {
            state.busy = false;
          });
        },
      });
    };
    goToRef.current = goTo;

    const onEnter = (e: PointerEvent) => {
      if (e.pointerType === "mouse") state.hover = true;
    };
    const onLeave = () => {
      state.hover = false;
    };
    const onFocusIn = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      if (!target.matches(":focus-visible")) return;
      state.focus = true;
      setAnnounce(true);
      goTo(Number(target.dataset.index));
    };
    const onFocusOut = () => {
      state.focus = false;
    };

    wrap.addEventListener("pointerenter", onEnter);
    wrap.addEventListener("pointerleave", onLeave);
    wrap.addEventListener("focusin", onFocusIn);
    wrap.addEventListener("focusout", onFocusOut);

    const observer = new IntersectionObserver(([entry]) => {
      state.inView = entry.isIntersecting;
    });
    observer.observe(wrap);

    render();
    gsap.ticker.add(tick);

    return () => {
      gsap.ticker.remove(tick);
      observer.disconnect();
      resume?.kill();
      gsap.killTweensOf(state);
      wrap.removeEventListener("pointerenter", onEnter);
      wrap.removeEventListener("pointerleave", onLeave);
      wrap.removeEventListener("focusin", onFocusIn);
      wrap.removeEventListener("focusout", onFocusOut);
      goToRef.current = () => {};
    };
  }, wrapRef);

  // Crossfade + slide the active skill text and pulse the glow.
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    if (window.matchMedia(REDUCED_MOTION).matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo("[data-skill-text]", { opacity: 0, x: 24 }, { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" });
      gsap.fromTo(
        "[data-skill-glow]",
        { scale: 0.7, opacity: 0.3 },
        { scale: 1, opacity: 1, duration: 0.7, ease: "power2.out" },
      );
    }, panelRef);
    return () => ctx.revert();
  }, [shown]);

  const select = (index: number) => {
    setAnnounce(true);
    goToRef.current(index);
    setActive(index);
  };

  return (
    <div ref={wrapRef} style={vars} className="relative mx-auto w-full max-w-5xl">
      {/* Rotating wheel (hidden with reduced motion) */}
      <div
        role="group"
        aria-label="Skills wheel. Select a logo to see details."
        className="relative mx-auto h-[calc(var(--r1)+var(--logo)*1.05)] w-full overflow-hidden motion-reduce:hidden"
      >
        {["--r1", "--r2"].map((radius) => (
          <div
            key={radius}
            aria-hidden="true"
            style={{ width: `calc(var(${radius}) * 2)`, height: `calc(var(${radius}) * 2)` }}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rounded-full border border-fg/50"
          />
        ))}

        <div ref={ringRef} className="absolute bottom-0 left-1/2 h-0 w-0">
          {skills.map((item, i) => {
            const { Icon: ItemIcon, color: itemColor } = skillIcons[item.id];
            const radius = i % 2 === 0 ? "--r1" : "--r2";
            return (
              <div
                key={item.id}
                className="absolute left-0 top-0 h-0 w-0"
                style={{ transform: `rotate(${i * STEP}deg) translateY(calc(var(${radius}) * -1))` }}
              >
                <button
                  ref={(el) => {
                    itemRefs.current[i] = el;
                  }}
                  type="button"
                  data-index={i}
                  aria-label={item.name}
                  aria-pressed={active === i}
                  onClick={() => select(i)}
                  onPointerEnter={(e) => e.pointerType === "mouse" && setPreview(i)}
                  onPointerLeave={() => setPreview(null)}
                  style={{
                    width: "var(--logo)",
                    height: "var(--logo)",
                    margin: "calc(var(--logo) / -2)",
                    color: itemColor,
                  }}
                  className={`absolute left-0 top-0 flex items-center justify-center transition-[filter] duration-300 ${
                    active === i ? "drop-shadow-[0_0_26px_rgb(var(--accent)/0.7)]" : ""
                  }`}
                >
                  <ItemIcon style={{ fontSize: "calc(var(--logo) * 0.9)" }} aria-hidden="true" />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reduced motion: plain logo grid */}
      <ul className="hidden flex-wrap justify-center gap-3 motion-reduce:flex">
        {skills.map((item, i) => {
          const { Icon: ItemIcon, color: itemColor } = skillIcons[item.id];
          return (
            <li key={item.id}>
              <button
                type="button"
                aria-label={item.name}
                aria-pressed={active === i}
                onClick={() => select(i)}
                style={{ color: itemColor }}
                className={`flex h-14 w-14 items-center justify-center rounded-full border bg-surface text-2xl transition-[border-color,box-shadow] duration-300 hover:border-accent-light ${
                  active === i ? "border-accent shadow-glow" : "border-line"
                }`}
              >
                <ItemIcon aria-hidden="true" />
              </button>
            </li>
          );
        })}
      </ul>

      {/* Active skill: centred inside the arcs on large screens, under them otherwise */}
      <div
        ref={panelRef}
        className="mt-8 flex justify-center lg:motion-safe:absolute lg:motion-safe:inset-x-0 lg:motion-safe:bottom-4 lg:motion-safe:mt-0"
      >
        <div className="flex w-full max-w-md items-center gap-5 lg:motion-safe:w-[calc(var(--r2)*1.5)] lg:motion-safe:max-w-none">
          <div className="relative flex-none" style={{ color }}>
            <div
              data-skill-glow
              aria-hidden="true"
              className="absolute -inset-6 rounded-full bg-[radial-gradient(closest-side,rgb(var(--accent)/0.35),transparent)]"
            />
            <Icon className="relative text-6xl sm:text-8xl" aria-hidden="true" />
          </div>
          <div data-skill-text aria-live={announce ? "polite" : "off"} aria-atomic="true" className="min-w-0">
            <h3 className="font-heading text-2xl font-bold sm:text-5xl">{skill.name}</h3>
            <p className="mt-2 text-xs leading-relaxed text-champagne/85 sm:text-sm">{skill.definition}</p>
            {skill.usedIn && (
              <p className="mt-2 text-xs leading-relaxed text-accent-light sm:text-sm">
                Used in: {skill.usedIn.join(", ")}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
