import { useLayoutEffect, useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Plugins are registered once, here, and everything imports gsap from this file.
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };

export const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
export const FINE_POINTER_MOTION =
  "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

export const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Runs `setup` inside a scoped gsap.matchMedia context so every tween and
 * ScrollTrigger is reverted on unmount / HMR. `setup` only runs when the user
 * has not asked for reduced motion; `wide` is true on 1024px+ screens.
 * Whatever `setup` returns is called as cleanup.
 */
export function useGsap(
  setup: (env: { wide: boolean }) => void | (() => void),
  scope: RefObject<HTMLElement>,
) {
  useIsoLayoutEffect(() => {
    const mm = gsap.matchMedia(scope.current ?? undefined);
    mm.add(
      {
        motion: "(prefers-reduced-motion: no-preference)",
        wide: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      },
      (context) => setup({ wide: Boolean(context.conditions?.wide) }),
    );
    return () => mm.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
