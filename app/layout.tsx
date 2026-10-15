import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Poppins } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import { site } from "@/lib/data";
import { themeInitScript } from "@/lib/theme";
import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import Cursor from "@/components/Cursor";

const heading = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const body = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const title = `${site.name} | ${site.title}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title,
  description: site.description,
  openGraph: {
    title,
    description: site.description,
    url: "/",
    siteName: site.name,
    type: "website",
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image", title, description: site.description },
};

export const viewport: Viewport = {
  themeColor: "#050a0e",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.title,
  email: site.email,
  url: site.url,
  address: { "@type": "PostalAddress", addressRegion: "Tamil Nadu", addressCountry: "IN" },
  sameAs: [site.linkedin, ...(site.github ? [site.github] : [])],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // "is-locked" keeps the page still behind the preloader; the preloader removes it.
    <html lang="en" suppressHydrationWarning className={`${heading.variable} ${body.variable} is-locked`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <noscript>
          <style>{"html.is-locked{overflow:auto}"}</style>
        </noscript>
        <SmoothScroll />
        <Preloader />
        <a
          href="#main"
          className="fixed left-4 top-4 z-[110] -translate-y-24 rounded-full bg-accent px-5 py-2 text-sm font-medium text-on-accent transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <Cursor />
        {children}
        <div className="grain" aria-hidden="true" />
      </body>
    </html>
  );
}
