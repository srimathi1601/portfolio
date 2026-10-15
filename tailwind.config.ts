import type { Config } from "tailwindcss";

// Colour values live in app/globals.css (:root) as space-separated RGB
// channels so Tailwind opacity modifiers (e.g. bg-accent/20) keep working.
const token = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: token("accent"),
          light: token("accent-light"),
          deep: token("accent-deep"),
        },
        ink: token("ink"),
        surface: token("surface"),
        champagne: token("champagne"),
        fg: token("fg"),
        "on-accent": token("on-accent"),
        line: "rgb(var(--accent) / 0.18)",
      },
      fontFamily: {
        heading: ["var(--font-heading)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "accent-gradient":
          "linear-gradient(110deg, rgb(var(--accent-deep)), rgb(var(--accent-light)) 50%, rgb(var(--accent)))",
      },
      boxShadow: {
        glow: "0 0 40px -8px rgb(var(--accent) / 0.35)",
      },
    },
  },
  plugins: [],
};

export default config;
