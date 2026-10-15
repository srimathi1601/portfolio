# Srimathi S | Frontend Developer Portfolio

Single-page, scroll-driven portfolio in dark teal. Built with Next.js 14 (App Router, TypeScript), Tailwind CSS, GSAP + ScrollTrigger and Lenis.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

Requires Node 18.17+.

## Project layout

```
app/            layout (fonts, metadata, JSON-LD), page, sitemap, robots, icons, OG image
components/     one file per section/feature (Hero, SkillWheel, Projects, GoldenSparkles, ...)
lib/data.ts     ALL site content: copy, skills, experience, projects, links
lib/gsap.ts     GSAP + ScrollTrigger registered once, plus the useGsap hook
lib/scroll.ts   Lenis instance, scroll lock, anchor scrolling
public/         profile.jpg, resume PDF and project screenshots
```

All copy lives in [lib/data.ts](lib/data.ts). Edit it there; the components never hard-code content. The "years" and "live websites" stats are derived from that file (live websites = distinct project URLs).

## Resume

The Resume buttons point to `/Srimathi_S_Resume.pdf`. **Add the file at `public/Srimathi_S_Resume.pdf`**, otherwise those links 404.

## Replace the profile photo

Save your photo as `public/profile.jpg` (portrait, roughly 4:5, for example 1000x1250, face in the upper half). The hero shows it in a plain 4:5 box (no border, no radius) with `object-position: top`, so a transparent PNG cut-out also works if you change the extension in `components/HeroPhoto.tsx`. The hero always renders this file, so the image is broken until you add it.

## Add project screenshots

Every project has its own file in `public/projects/` and its own `image` path in `lib/data.ts`, shown as a plain `<img>` in the top-right of its card.

- Projects without a screenshot yet (Shopify Developer Bot, Instagram Comment Automation, SPORTSTECH.io) use a generated placeholder `.jpg` named after the project. Overwrite that file with your screenshot (same name, roughly 1600x1000) and nothing else needs to change.
- To use a different filename, edit that project's `image` value:

  ```ts
  { name: "SPORTSTECH.io", /* ... */ image: "/projects/sportstech-io.png" }
  ```

## Edit skills and projects

Both live in [lib/data.ts](lib/data.ts):

- **Skills** (`skills`): `id`, `name`, `definition`, and optional `usedIn` (omit it to hide the "Used in" line). Each `id` needs a logo in [components/skillIcons.ts](components/skillIcons.ts), which maps it to a `react-icons` component and brand colour. The wheel adapts to however many skills there are.
- **Projects** (`projects`, shown in this order): `name` (pill and card title), optional `kind` (small label), `icon` (one of the `ProjectIconKey` values, mapped in [components/projectIcons.ts](components/projectIcons.ts)), `tech`, `links` (live URLs; leave empty for none), `description` (card), `details` (bullets in the "Know more" modal) and optional `image`.

The project count under the heading and the "Live websites" stat in About are computed from `projects`.

## Add the GitHub link

Set `github` in the `site` object in `lib/data.ts`:

```ts
github: "https://github.com/your-username",
```

The GitHub icon button in the Contact section (and the JSON-LD `sameAs`) only render when it is non-empty.

## Light and dark theme

The navbar button toggles `data-theme="light"` on `<html>`. The choice is saved in `localStorage` (key `theme`) and applied by a tiny inline script before first paint, so there is no flash. First-time visitors get the dark theme.

Both palettes are the RGB tokens in `app/globals.css`: `:root` is dark and `:root[data-theme="light"]` overrides it (pale background, deeper teals for contrast). Use `text-fg` for headings and `text-on-accent` for text on accent fills so they flip correctly; avoid hard-coded white or black.

## Change the accent colour

The palette is dark teal (`#26d7da`). Colours are defined once as RGB channels in `:root` in [app/globals.css](app/globals.css), with light-theme overrides in `:root[data-theme="light"]`:

```css
--accent: 38 215 218;       /* #26d7da */
--accent-light: 120 235 238;
--accent-deep: 20 160 168;
--ink: 5 10 14;             /* background */
--surface: 12 20 26;        /* raised surfaces */
--champagne: 200 220 224;   /* body text */
```

[tailwind.config.ts](tailwind.config.ts) exposes them as `accent`, `accent-light`, `accent-deep`, `ink`, `surface`, `champagne`, `fg`, `on-accent` and `line` (the border colour), and defines the `bg-accent-gradient` utility. The sparkles canvas reads the same variables, so changing them updates everything. The favicon, Apple icon and Open Graph image are static PNGs in `app/` and need regenerating if you change the colour.

## Move GoldenSparkles to another section

`GoldenSparkles` is a self-contained canvas overlay. Drop it inside any `relative` section and keep your content above it with `relative z-10`:

```tsx
import SparklesLazy from "@/components/SparklesLazy";

<section className="relative overflow-hidden">
  <SparklesLazy density={0.8} speed={1} area="top" />
  <div className="relative z-10">...</div>
</section>
```

| Prop      | Default  | Meaning                                                    |
| --------- | -------- | ---------------------------------------------------------- |
| `density` | `1`      | Multiplier on the particle cap (80 desktop / 30 mobile)    |
| `speed`   | `1`      | Multiplier on drift speed                                  |
| `area`    | `"full"` | `"full"`, `"top"` or `"bottom"` half of the parent         |

It is used in `components/Hero.tsx` and `components/Contact.tsx`. `SparklesLazy` loads it with `next/dynamic` (client only); import `GoldenSparkles` directly if you prefer.

## Motion and accessibility notes

- With `prefers-reduced-motion: reduce`: no smooth scroll, no pinning, no parallax, no custom cursor, no preloader, and sparkles are drawn as a few static stars. All content is visible immediately.
- The skill wheel stops rotating with reduced motion and becomes a logo grid. The Projects pill list becomes a horizontal chip row under 1024px, and auto-advance is off with reduced motion.
- The custom cursor only runs on fine pointers (mouse/trackpad).
- The favicon, Apple icon and Open Graph image are static PNGs in `app/` (`icon.png`, `apple-icon.png`, `opengraph-image.png`).

## Deploy on Vercel

1. Push the project to a Git repository and import it on [vercel.com/new](https://vercel.com/new). Framework preset: Next.js (no extra settings).
2. Add an environment variable `NEXT_PUBLIC_SITE_URL` set to your production URL (for example `https://your-domain.com`). It is used for canonical metadata, Open Graph URLs, the sitemap and robots.txt.
3. Deploy. Make sure `public/Srimathi_S_Resume.pdf` is committed.
