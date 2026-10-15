import type Lenis from "lenis";
import { REDUCED_MOTION } from "./gsap";

export const PRELOADER_DONE = "preloader:done";

let lenis: Lenis | null = null;

export const setLenis = (instance: Lenis | null) => {
  lenis = instance;
};

export function lockScroll() {
  document.documentElement.classList.add("is-locked");
  lenis?.stop();
}

export function unlockScroll() {
  document.documentElement.classList.remove("is-locked");
  lenis?.start();
}

export function isScrollLocked() {
  return document.documentElement.classList.contains("is-locked");
}

export function scrollToId(id: string) {
  const target = document.getElementById(id);
  if (!target) return;
  if (lenis) {
    lenis.scrollTo(target);
  } else {
    const smooth = !window.matchMedia(REDUCED_MOTION).matches;
    target.scrollIntoView({ behavior: smooth ? "smooth" : "auto" });
  }
}
