// All site content lives here. Components never hard-code copy.

export const site = {
  name: "Srimathi S",
  title: "Frontend Developer",
  location: "Tamil Nadu, India",
  email: "ssrimathi1601@gmail.com",
  linkedin: "https://www.linkedin.com/in/srimathi-s-a26644331",
  // Leave empty until provided: the GitHub icon only renders when this is set.
  github: "",
  resume: "/projects/Srimathi_S_Resume.pdf",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  description:
    "Srimathi S is a Frontend Developer with 2+ years of experience building responsive websites, landing pages and interactive web applications with React.js, Next.js and Tailwind CSS.",
};

export const navLinks = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export const hero = {
  eyebrow: `${site.title} · ${site.location}`,
  lines: [
    { text: "I'm Srimathi S." },
    { text: "I build responsive," },
    { text: "interactive websites.", accent: true },
  ],
  roles: [
    "Frontend Developer",
    "React.js Developer",
    "Next.js Developer",
    "Shopify Developer",
  ],
  intro:
    "2+ years of experience building responsive websites, landing pages and interactive web applications.",
};

export const summary =
  "Frontend Developer with 2+ years of experience building responsive websites, landing pages and interactive web applications using React.js, Next.js, JavaScript (ES6+), HTML5, CSS3 and Tailwind CSS. Experienced in Figma-to-code development, GSAP animations, hover effects and scroll-based interactions, cross-browser and responsive layouts, REST and third-party API integration, and Shopify theme development with Liquid. Uses n8n workflow automation and AI-assisted tools to speed up prototyping and delivery.";

export const education = {
  degree: "B.Sc. Mathematics",
  school: "Madurai Sivakasi Nadar's Pioneer Meenakshi Women's College",
  period: "2019 - 2022",
};

export const skillsIntro =
  "Technologies I use to build responsive, animated websites. Hover or click a logo to see what it is and where I have used it.";

export type Skill = {
  id: string;
  name: string;
  definition: string;
  usedIn?: string[];
};

export const skills: Skill[] = [
  {
    id: "javascript",
    name: "JavaScript",
    definition: "The programming language of the web that makes pages interactive.",
    usedIn: ["SPORTSTECH.io", "Beelockchain", "SPORTSTECH.de", "Help Center", "SPORTSTECH NEO"],
  },
  {
    id: "react",
    name: "React.js",
    definition: "A JavaScript library for building user interfaces from reusable components.",
    usedIn: ["SPORTSTECH.io"],
  },
  {
    id: "nextjs",
    name: "Next.js",
    definition: "A React framework for fast, SEO-friendly websites with routing and rendering built in.",
    usedIn: ["SPORTSTECH.io", "Beelockchain", "WalkingPad Vergleich", "Beeyoond Gaming"],
  },
  {
    id: "html5",
    name: "HTML5",
    definition: "The standard markup language that gives a web page structure and meaning.",
    usedIn: ["SPORTSTECH.de", "Help Center", "SPORTSTECH NEO"],
  },
  {
    id: "css3",
    name: "CSS3",
    definition: "The styling language for layout, color, typography and responsive design.",
    usedIn: ["SPORTSTECH.de", "Help Center", "SPORTSTECH NEO"],
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    definition: "A utility-first CSS framework for building custom designs quickly.",
    usedIn: ["SPORTSTECH.io", "Beelockchain", "WalkingPad Vergleich", "Beeyoond Gaming"],
  },
  {
    id: "gsap",
    name: "GSAP",
    definition: "A JavaScript animation library for smooth, high-performance animation and scroll effects.",
    usedIn: ["SPORTSTECH.io"],
  },
  {
    id: "shopify",
    name: "Shopify (Liquid)",
    definition:
      "An e-commerce platform; Liquid is its templating language for theme sections and snippets.",
    usedIn: ["SPORTSTECH.de"],
  },
  {
    id: "figma",
    name: "Figma",
    definition: "A collaborative design tool for UI design and prototyping.",
    usedIn: ["SPORTSTECH.io (Figma-to-code)"],
  },
  {
    id: "angular",
    name: "Angular",
    definition: "A framework for building single-page web applications.",
    usedIn: ["Pearl Dentistree", "Presidential Holidays"],
  },
  {
    id: "bootstrap",
    name: "Bootstrap",
    definition: "A CSS framework with a responsive grid and ready-made components.",
  },
  {
    id: "n8n",
    name: "n8n",
    definition: "A workflow automation tool that connects apps and APIs.",
    usedIn: ["Instagram Comment Automation"],
  },
  {
    id: "git",
    name: "Git",
    definition: "A version control system that tracks code changes.",
    usedIn: ["Shopify Developer Bot workflow"],
  },
  {
    id: "github",
    name: "GitHub",
    definition: "A platform to host and collaborate on Git repositories.",
  },
  {
    id: "vercel",
    name: "Vercel",
    definition: "A hosting platform well suited to Next.js deployments.",
  },
  {
    id: "netlify",
    name: "Netlify",
    definition: "A platform for deploying static and frontend websites.",
    usedIn: ["SPORTSTECH Help Center", "SPORTSTECH NEO (demos)"],
  },
];

export const experience = [
  {
    role: "Frontend Developer",
    company: "Sportstech / Beeyoond Gaming",
    location: "Madurai",
    period: "May 2025 - Present",
    points: [
      "Develop and maintain the Shopify storefront for sportstech.de, delivering maintainable, responsive frontend changes on a live e-commerce platform while preserving existing functionality and design consistency.",
      "Built AI and automation tools alongside frontend work: a Shopify Developer Bot, an Instagram comment automation workflow, and an AI agent platform evaluation.",
    ],
  },
  {
    role: "Service Delivery Executive",
    company: "Neeyamo Enterprise Solutions Pvt. Ltd.",
    location: "Madurai",
    period: "February 2024 - March 2025",
    points: [
      "Conducted background verification of candidates' employment history, education and professional records.",
      "Collaborated with HR and hiring teams to support accurate, compliant verification and improved verification workflows.",
      "Handled sensitive candidate information with confidentiality.",
      "Recognized as a Top Performer for consistent team performance and zero escalations and errors during the review period.",
    ],
  },
  {
    role: "Junior Application Developer",
    company: "Chrono Infotech",
    location: "Madurai",
    period: "July 2022 - July 2023",
    points: [
      "Developed Angular web applications, including Pearl Dentistree and Presidential Holidays.",
    ],
  },
];

export type ProjectIconKey =
  | "store"
  | "bot"
  | "instagram"
  | "agents"
  | "fitness"
  | "gaming"
  | "chain"
  | "affiliate"
  | "help"
  | "landing"
  | "dental"
  | "travel";

export type Project = {
  /** Shown on the pill and as the card title. */
  name: string;
  /** Small label above the title. */
  kind?: string;
  icon: ProjectIconKey;
  tech: string[];
  /** Live URLs. The first one is the main "View Live" target. */
  links: string[];
  description: string;
  /** Bullet points shown in the "Know more" modal. */
  details: string[];
  /** This project's own screenshot under /public/projects, e.g. "/projects/sportstech-de.jpg". */
  image: string;
};

export const projects: Project[] = [
  {
    name: "SPORTSTECH.de",
    kind: "Shopify E-commerce",
    icon: "store",
    tech: ["Liquid", "HTML", "CSS", "JavaScript"],
    links: ["https://www.sportstech.de"],
    description:
      "Frontend work on a live Shopify storefront: section redesigns, new pages and responsive UI improvements.",
    details: [
      "Worked on Shopify theme development, delivering section redesigns, new page creation, layout enhancements and responsive UI improvements.",
      "Implemented bug fixes, UI/UX improvements and theme customizations across Shopify templates, sections, snippets, assets and configuration files.",
      "Delivered maintainable, responsive frontend changes on a live e-commerce platform while preserving existing theme functionality and design consistency.",
    ],
    image: "/projects/sportstech.de.png",
  },
  {
    name: "Shopify Developer Bot",
    kind: "AI Automation",
    icon: "bot",
    tech: ["Claude Skills", "Git", "Theme Check"],
    links: [],
    description: "An AI-powered bot that analyzes and classifies Wrike development tasks for Shopify work.",
    details: [
      "Developed an AI-powered Shopify Developer Bot using Claude Skills to analyze and classify Wrike development tasks into CODE-LEVEL, ADMIN-SIDE, HUMAN-ONLY and DIAGNOSIS work.",
      "Integrated Git branching, Theme Check validation and human approval steps into the development workflow.",
    ],
    image: "/projects/sportstech.de.png",
  },
  {
    name: "AI-Powered Instagram Comment Automation",
    icon: "instagram",
    tech: ["n8n", "Groq AI", "Google Sheets"],
    links: [],
    description:
      "A scheduled workflow that classifies Instagram comments by sentiment and topic and routes replies.",
    details: [
      "Developed an automation workflow using n8n and Groq AI to fetch Instagram comments at scheduled intervals and classify them by sentiment and topic.",
      "Implemented automated routing where Positive/Neutral comments receive multilingual auto-replies, while Negative/Critical comments generate draft responses for human review without automatic posting.",
      "Integrated Google Sheets for structured logging and dashboard integration, capturing comment details, sentiment, topic, translations, reply content, post links and processing status.",
    ],
    image: "/projects/instagram-comment-automation.png",
  },
  {
    name: "AI Agent Platform Evaluation and POC",
    icon: "agents",
    tech: ["OpenMausBot", "Grok Bot", "Qwen", "Slack", "Microsoft Teams"],
    links: [],
    description: "Evaluation of self-hosted AI agent platforms and a QA automation bot for sportstech.de.",
    details: [
      "Evaluated OpenMausBot and Grok Bot as self-hosted AI agent solutions, testing installation, memory, permissions, security, model connectivity and integrations across VPS and desktop environments.",
      "Integrated and evaluated a self-hosted Qwen model, performing side-by-side capability testing across Slack, Microsoft Teams, computer access, image handling, formatting and multi-user workflows.",
      "Built and validated a QA automation bot for sportstech.de, documented platform limitations and capability gaps, and provided technical recommendations for further testing and potential team-wide adoption.",
    ],
    image: "/projects/ai-agent-poc.png",
  },
  {
    name: "SPORTSTECH.io",
    kind: "Web3 Fitness Platform",
    icon: "fitness",
    tech: ["React.js", "Next.js", "Tailwind CSS", "GSAP"],
    links: ["https://web3-website-final.vercel.app/", "https://presale-rho-rosy.vercel.app/"],
    description: "Responsive Web3 fitness platform interface with GSAP animations.",
    details: [
      "Developed three UI versions based on evolving Figma designs and changing business requirements.",
      "Built responsive interfaces and implemented GSAP animations to enhance user engagement.",
      "Integrated a newsletter subscription API with form validation and verification logic.",
    ],
    image: "/projects/sportstech.io.png",
  },
  {
    name: "Beeyoond Gaming Website",
    kind: "Madurai Branch",
    icon: "gaming",
    tech: ["Next.js", "Tailwind CSS"],
    links: ["https://www.beeyoondgaming.com"],
    description: "A complete responsive website built from scratch without design references.",
    details: ["Designed and developed the complete responsive website from scratch without design references."],
    image: "/projects/beeyoond-gaming.png",
  },
  {
    name: "Beelockchain.io and Beelockchain.com",
    icon: "chain",
    tech: ["Next.js", "Tailwind CSS"],
    links: ["https://beelockchain.io", "https://beelockchain.com"],
    description: "Responsive frontends with reusable components, animations and scroll-based interactions.",
    details: [
      "Designed and developed responsive frontends with reusable components and structured page layouts.",
      "Implemented animations, transitions, hover effects and scroll-based interactions across desktop, tablet and mobile.",
      "Used AI tools for animation ideation, UI implementation and rapid design iteration.",
      "Improved component consistency, cross-browser compatibility and overall user experience.",
    ],
    image: "/projects/beelockchain.io.png",
  },
  {
    name: "WalkingPad Vergleich",
    kind: "AI-Assisted Affiliate Website",
    icon: "affiliate",
    tech: ["Next.js", "Tailwind CSS"],
    links: ["https://www.walkingpad-vergleich.com"],
    description: "A multi-page affiliate website built with AI-assisted development and translated into German.",
    details: [
      "Built a multi-page affiliate website using Minimax AI and ChatGPT for AI-assisted development and rapid prototyping.",
      "Structured site navigation, page hierarchy and content flow, and generated and refined frontend components.",
      "Translated the site into German using AI tools, maintaining language consistency across pages.",
    ],
    image: "/projects/walking-pad.png",
  },
  {
    name: "SPORTSTECH Help Center",
    icon: "help",
    tech: ["HTML", "CSS", "JavaScript"],
    links: ["https://help-center-sportstech-demo.netlify.app"],
    description: "A responsive help center with structured support content and mobile-friendly navigation.",
    details: [
      "Designed and developed a responsive Help Center website from scratch with structured support content and mobile-friendly navigation.",
    ],
    image: "/projects/help-center.png",
  },
  {
    name: "SPORTSTECH NEO",
    kind: "Product Landing Page",
    icon: "landing",
    tech: ["HTML", "CSS", "JavaScript"],
    links: ["https://magenta-custard-546013.netlify.app"],
    description: "A responsive product landing page showcasing crypto integration within the fitness domain.",
    details: [
      "Designed and developed a responsive product landing page showcasing crypto integration within the fitness domain.",
    ],
    image: "/projects/sportstech-funnel.png",
  },
  {
    name: "Pearl Dentistree",
    kind: "Dental Hospital Patient Management System",
    icon: "dental",
    tech: ["Angular"],
    links: ["https://www.pearldentistree.com"],
    description: "A dental hospital patient management system with appointment, records and billing interfaces.",
    details: [
      "Developed and maintained a patient management system using the Angular framework.",
      "Implemented responsive web interfaces for dental appointment scheduling, patient records management and billing functionalities.",
      "Integrated backend APIs to fetch and display patient data, appointment schedules and treatment histories.",
      "Designed and developed reusable components and services to ensure modularity and scalability of the application.",
    ],
    image: "/projects/pearldentistree1.png",
  },
  {
    name: "Presidential Holidays",
    icon: "travel",
    tech: ["Angular"],
    links: ["https://www.presidentialholidays.in"],
    description: "Responsive web interfaces with backend API integration for services, schedules and reviews.",
    details: [
      "Designed and developed responsive web interfaces and functionality using the Angular framework.",
      "Integrated backend APIs to display treatment/service information, appointment schedules and service reviews, keeping the website efficient and user-friendly.",
      "Developed reusable components and services to ensure modularity and scalability of the application.",
    ],
    image: "/projects/presidential-holidays.png",
  },
];

// Counted from the data above so the numbers can never drift from the content.
const liveSites = new Set(projects.flatMap((project) => project.links));

export const stats = [
  { label: "Years of experience", value: 2, suffix: "+" },
  { label: "Live websites", value: liveSites.size, suffix: "" },
];

export const contact = {
  heading: ["Let's build", "something", "together."],
};
