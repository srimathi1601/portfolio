"use client";

import { useEffect, useRef } from "react";
import { FaTimes } from "react-icons/fa";
import type { Project } from "@/lib/data";
import { lockScroll, unlockScroll } from "@/lib/scroll";

/**
 * Native <dialog>: gives a focus trap, ESC to close, inert background and focus return
 * to the "Know more" button for free. We add scroll lock and backdrop click.
 */
export default function ProjectModal({
  project,
  open,
  onClose,
}: {
  project: Project;
  open: boolean;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      lockScroll();
    } else if (!open && dialog.open) {
      dialog.close();
    }
    return () => {
      if (dialog.open) {
        dialog.close();
        unlockScroll();
      }
    };
  }, [open]);

  return (
    <dialog
      ref={ref}
      data-lenis-prevent
      aria-labelledby="project-modal-title"
      onClose={() => {
        unlockScroll();
        onClose();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) e.currentTarget.close();
      }}
      className="m-auto max-h-[85vh] w-[min(92vw,640px)] overflow-y-auto rounded-3xl border border-accent/40 bg-surface p-0 text-champagne shadow-glow backdrop:bg-ink/80 backdrop:backdrop-blur-sm"
    >
      <div className="p-7 sm:p-10">
        <button
          type="button"
          onClick={() => ref.current?.close()}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-line text-accent-light transition-colors hover:border-accent-light"
        >
          <FaTimes aria-hidden="true" />
        </button>

        {project.kind && <p className="text-xs uppercase tracking-[0.25em] text-accent">{project.kind}</p>}
        <h3 id="project-modal-title" className="mt-2 pr-10 font-heading text-2xl font-bold sm:text-3xl">
          {project.name}
        </h3>

        <ul className="mt-6 space-y-4">
          {project.details.map((detail) => (
            <li key={detail} className="flex gap-3 leading-relaxed text-champagne/90">
              <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 flex-none rounded-full bg-accent" />
              {detail}
            </li>
          ))}
        </ul>

        <ul className="mt-8 flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <li key={tech} className="chip !border-accent/50 !px-3 !py-1 !text-xs !text-accent-light">
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </dialog>
  );
}
