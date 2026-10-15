"use client";

import dynamic from "next/dynamic";

// Decorative and canvas-only, so it is loaded after the main bundle and never server-rendered.
const SparklesLazy = dynamic(() => import("./GoldenSparkles"), { ssr: false });

export default SparklesLazy;
