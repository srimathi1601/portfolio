"use client";

import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { THEME_EVENT, THEME_KEY } from "@/lib/theme";

type Theme = "dark" | "light";

/** Switches the `data-theme` attribute on <html>; the colour tokens in globals.css do the rest. */
export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");

  // The inline head script has already applied any saved theme; just mirror it.
  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === "light" ? "light" : "dark");
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      // Private mode: the theme still applies for this visit.
    }
    setTheme(next);
    window.dispatchEvent(new Event(THEME_EVENT));
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-accent-light transition-[border-color,box-shadow] duration-300 hover:border-accent-light hover:shadow-glow"
    >
      {theme === "dark" ? <FaSun aria-hidden="true" /> : <FaMoon aria-hidden="true" />}
    </button>
  );
}
