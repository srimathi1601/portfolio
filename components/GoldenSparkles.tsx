"use client";

import { useEffect, useRef } from "react";
import { REDUCED_MOTION } from "@/lib/gsap";
import { THEME_EVENT } from "@/lib/theme";

type Props = {
  /** Multiplier on the particle cap (80 desktop / 30 mobile). Default 1. */
  density?: number;
  /** Multiplier on drift speed. Default 1. */
  speed?: number;
  /** Which part of the parent the sparkles live in. Default "full". */
  area?: "full" | "top" | "bottom";
  className?: string;
};

type Particle = {
  x: number;
  y: number;
  size: number;
  rise: number;
  sway: number;
  phase: number;
  twinkle: number;
  alpha: number;
  sprite: number;
};

const SPRITE_SIZE = 64;
const MOUSE_RADIUS = 120;

const channels = (name: string) =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim();

/** Pre-renders each colour/shape (with glow) once so the frame loop only calls drawImage. */
function buildSprites() {
  const colours = [channels("--accent"), channels("--accent-light"), "224 255 255"];
  const sprites: HTMLCanvasElement[] = [];
  for (const colour of colours) {
    for (const star of [true, false]) {
      const canvas = document.createElement("canvas");
      canvas.width = canvas.height = SPRITE_SIZE;
      const g = canvas.getContext("2d");
      if (!g) continue;
      const m = SPRITE_SIZE / 2;

      const glow = g.createRadialGradient(m, m, 0, m, m, m);
      glow.addColorStop(0, `rgb(${colour} / 0.5)`);
      glow.addColorStop(0.3, `rgb(${colour} / 0.14)`);
      glow.addColorStop(1, `rgb(${colour} / 0)`);
      g.fillStyle = glow;
      g.fillRect(0, 0, SPRITE_SIZE, SPRITE_SIZE);

      g.fillStyle = `rgb(${colour})`;
      g.beginPath();
      if (star) {
        const outer = SPRITE_SIZE * 0.3;
        const inner = outer * 0.2;
        for (let i = 0; i < 8; i++) {
          const r = i % 2 === 0 ? outer : inner;
          const a = (Math.PI / 4) * i - Math.PI / 2;
          g.lineTo(m + Math.cos(a) * r, m + Math.sin(a) * r);
        }
        g.closePath();
      } else {
        g.arc(m, m, SPRITE_SIZE * 0.09, 0, Math.PI * 2);
      }
      g.fill();
      sprites.push(canvas);
    }
  }
  return sprites;
}

/** Lightweight canvas sparkle overlay. Place inside any `position: relative` section. */
export default function GoldenSparkles({ density = 1, speed = 1, area = "full", className = "" }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia(REDUCED_MOTION).matches;
    const mobile = window.matchMedia("(max-width: 767px)");
    let sprites = buildSprites();
    const mouse = { x: -9999, y: -9999 };

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let frame = 0;
    let last = 0;

    const region = () => {
      if (area === "top") return [0, height / 2];
      if (area === "bottom") return [height / 2, height];
      return [0, height];
    };

    const spawn = (anywhere: boolean): Particle => {
      const [top, bottom] = region();
      const size = 1 + Math.random() * 3;
      return {
        x: Math.random() * width,
        y: anywhere ? top + Math.random() * (bottom - top) : bottom,
        size,
        rise: 0.12 + Math.random() * 0.3,
        sway: 0.4 + Math.random() * 1.2,
        phase: Math.random() * Math.PI * 2,
        twinkle: 0.0008 + Math.random() * 0.0018,
        alpha: 0.35 + Math.random() * 0.45,
        sprite: Math.floor(Math.random() * sprites.length),
      };
    };

    const draw = (p: Particle, alpha: number) => {
      const d = p.size * 5;
      ctx.globalAlpha = alpha;
      ctx.drawImage(sprites[p.sprite], p.x - d / 2, p.y - d / 2, d, d);
    };

    const drawStatic = () => {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) draw(p, p.alpha * 0.6);
    };

    const render = (now: number) => {
      const dt = Math.min((now - last) / 16.67 || 1, 3);
      last = now;
      const [top, bottom] = region();
      const span = bottom - top;

      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        p.y -= p.rise * speed * dt;
        p.x += Math.sin(now * 0.0004 * p.sway + p.phase) * 0.18 * dt;

        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < MOUSE_RADIUS && dist > 0) {
          const push = (1 - dist / MOUSE_RADIUS) * 1.4 * dt;
          p.x += (dx / dist) * push;
          p.y += (dy / dist) * push;
        }

        if (p.y < top - 8) Object.assign(p, spawn(false));

        const t = (p.y - top) / span;
        const edge = Math.min(1, Math.max(0, Math.min(t, 1 - t) * 6));
        const pulse = 0.55 + 0.45 * Math.sin(now * p.twinkle + p.phase);
        draw(p, p.alpha * pulse * edge);
      }
      frame = requestAnimationFrame(render);
    };

    const start = () => {
      if (frame) return;
      last = performance.now();
      frame = requestAnimationFrame(render);
    };
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const [top, bottom] = region();
      const cap = mobile.matches ? 30 : 80;
      const fill = (bottom - top) / height || 1;
      const count = reduced ? 10 : Math.round(cap * density * fill);
      particles = Array.from({ length: count }, () => spawn(true));
      if (reduced) drawStatic();
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    // Gold tokens change with the theme, so redraw the sprites in the new colours.
    const onTheme = () => {
      sprites = buildSprites();
      if (reduced) drawStatic();
    };
    window.addEventListener(THEME_EVENT, onTheme);

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    let intersectionObserver: IntersectionObserver | undefined;
    if (!reduced) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      intersectionObserver = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) start();
        else stop();
      });
      intersectionObserver.observe(canvas);
    }

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver?.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener(THEME_EVENT, onTheme);
    };
  }, [density, speed, area]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}
