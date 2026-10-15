"use client";

import { useEffect, useRef, useState } from "react";
import { navLinks, site } from "@/lib/data";
import { lockScroll, scrollToId, unlockScroll } from "@/lib/scroll";
import Button from "./Button";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Highlight the section that crosses the middle of the viewport.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const id of ["top", ...navLinks.map((link) => link.id)]) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    lockScroll();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      unlockScroll();
    };
  }, [open]);

  const go = (id: string) => (event: React.MouseEvent) => {
    event.preventDefault();
    if (open) {
      setOpen(false);
      unlockScroll();
    }
    scrollToId(id);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-500 ${
          open ? "border-transparent" : "border-line bg-ink/55 backdrop-blur-xl"
        }`}
      >
        <nav aria-label="Primary" className="wrap flex h-16 items-center justify-between sm:h-20">
          <a
            href="#top"
            onClick={go("top")}
            aria-label={`${site.name}, back to top`}
            className="font-heading text-3xl font-semibold text-accent-gradient"
          >
            S
          </a>

          <ul className="hidden items-center gap-9 md:flex">
            {navLinks.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={go(id)}
                  aria-current={active === id ? "true" : undefined}
                  className="link-underline text-sm text-champagne transition-colors hover:text-fg aria-[current=true]:text-fg"
                >
                  {label}
                </a>
              </li>
            ))}
            <li>
              <ThemeToggle />
            </li>
            <li>
              <Button href={site.resume} variant="outline" external className="!px-5 !py-2">
                Resume
              </Button>
            </li>
          </ul>

          <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            ref={toggleRef}
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="relative flex h-11 w-11 items-center justify-center"
          >
            <span
              className={`absolute h-px w-6 bg-accent-light transition-transform duration-500 ${
                open ? "rotate-45" : "-translate-y-1.5"
              }`}
            />
            <span
              className={`absolute h-px w-6 bg-accent-light transition-transform duration-500 ${
                open ? "-rotate-45" : "translate-y-1.5"
              }`}
            />
          </button>
          </div>
        </nav>
      </header>

      {/* Sibling of the header: backdrop-filter on the header would otherwise trap this fixed layer. */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 flex flex-col justify-center bg-ink/95 px-8 backdrop-blur-2xl transition-[opacity,visibility] duration-500 md:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <ul className="flex flex-col gap-2">
          {navLinks.map(({ id, label }, i) => (
            <li key={id} className="overflow-hidden">
              <a
                href={`#${id}`}
                onClick={go(id)}
                style={{ transitionDelay: open ? `${150 + i * 70}ms` : "0ms" }}
                className={`block py-2 font-heading text-5xl font-semibold text-fg transition-transform duration-700 ease-out ${
                  open ? "translate-y-0" : "translate-y-full"
                }`}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-10">
          <Button href={site.resume} variant="accent" external>
            Resume
          </Button>
        </div>
      </div>
    </>
  );
}
