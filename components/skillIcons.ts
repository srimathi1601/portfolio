import type { IconType } from "react-icons";
import { FaCss3Alt } from "react-icons/fa";
import {
  SiAngular,
  SiBootstrap,
  SiFigma,
  SiGit,
  SiGithub,
  SiGreensock,
  SiHtml5,
  SiJavascript,
  SiN8N,
  SiNetlify,
  SiNextdotjs,
  SiReact,
  SiShopify,
  SiTailwindcss,
  SiVercel,
} from "react-icons/si";

/** Brand-coloured logo per skill id (see `skills` in lib/data.ts). */
export const skillIcons: Record<string, { Icon: IconType; color: string }> = {
  javascript: { Icon: SiJavascript, color: "#F7DF1E" },
  react: { Icon: SiReact, color: "#61DAFB" },
  nextjs: { Icon: SiNextdotjs, color: "rgb(var(--fg))" },
  html5: { Icon: SiHtml5, color: "#E34F26" },
  css3: { Icon: FaCss3Alt, color: "#1572B6" },
  tailwind: { Icon: SiTailwindcss, color: "#06B6D4" },
  gsap: { Icon: SiGreensock, color: "#88CE02" },
  shopify: { Icon: SiShopify, color: "#7AB55C" },
  figma: { Icon: SiFigma, color: "#F24E1E" },
  angular: { Icon: SiAngular, color: "#DD0031" },
  bootstrap: { Icon: SiBootstrap, color: "#7952B3" },
  n8n: { Icon: SiN8N, color: "#EA4B71" },
  git: { Icon: SiGit, color: "#F05032" },
  github: { Icon: SiGithub, color: "rgb(var(--fg))" },
  vercel: { Icon: SiVercel, color: "rgb(var(--fg))" },
  netlify: { Icon: SiNetlify, color: "#00C7B7" },
};
