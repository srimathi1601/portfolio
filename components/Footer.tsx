"use client";

import { FaArrowUp, FaEnvelope } from "react-icons/fa";
import { navLinks, site } from "@/lib/data";
import { scrollToId } from "@/lib/scroll";
import { GitHub, LinkedIn } from "./Icons";

const quickLinks = [{ id: "top", label: "Home" }, ...navLinks];

const label = "text-xs font-semibold uppercase tracking-[0.3em] text-accent";
const iconButton =
  "flex h-14 w-14 items-center justify-center rounded-xl border border-line bg-surface text-fg transition-[border-color,box-shadow] duration-300 hover:border-accent-light hover:shadow-glow";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="wrap py-14">
        <div className="grid gap-12 md:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <p className="font-heading text-2xl font-bold uppercase tracking-[0.2em] text-fg">Srimathi</p>
            <p className="mt-5 max-w-sm text-base leading-relaxed text-champagne/85">
              Frontend developer crafting clean, responsive interfaces for the web, from Shopify themes to
              Next.js apps and AI-assisted workflows.
            </p>
          </div>

          <nav aria-label="Footer">
            <p className={label}>Quick links</p>
            <ul className="mt-6 grid grid-cols-2 gap-x-8 gap-y-4">
              {quickLinks.map(({ id, label: text }) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToId(id);
                    }}
                    className="text-champagne/85 transition-colors hover:text-accent-light"
                  >
                    {text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className={label}>Get in touch</p>
            <a
              href={`mailto:${site.email}`}
              className="link-underline mt-6 inline-block break-all text-lg text-fg"
            >
              {site.email}
            </a>
            <ul className="mt-5 flex gap-3">
              <li>
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className={iconButton}
                >
                  <LinkedIn className="h-6 w-6" />
                </a>
              </li>
              {site.github && (
                <li>
                  <a href={site.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className={iconButton}>
                    <GitHub className="h-6 w-6" />
                  </a>
                </li>
              )}
              <li>
                <a href={`mailto:${site.email}`} aria-label="Email" className={iconButton}>
                  <FaEnvelope aria-hidden="true" className="h-5 w-5" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-5 border-t border-line pt-8 sm:flex-row sm:items-center">
          <p className="text-champagne/85">
            &copy; {new Date().getFullYear()} {site.name}. Built with intention.
          </p>
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              scrollToId("top");
            }}
            className="inline-flex items-center gap-3 rounded-full border border-line bg-surface px-6 py-3 text-sm font-medium text-fg transition-[border-color,box-shadow] duration-300 hover:border-accent-light hover:shadow-glow"
          >
            Back to top <FaArrowUp aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
