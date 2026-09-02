import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Instrument_Serif, Space_Mono } from "next/font/google";
import "./globals.css";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from "@/lib/site";
import { StarIcon } from "@/components/ui/icons";
import { ParticleSphere } from "@/components/effects/particle-sphere";
import { Loader } from "@/components/effects/loader";
import { CustomCursor } from "@/components/effects/custom-cursor";
import { ScrollReveal } from "@/components/effects/scroll-reveal";
import { ToastHost } from "@/components/effects/toast";
import { TitleEasterEgg } from "@/components/effects/title-easter-egg";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

/* Self-hosted via next/font — zero render-blocking font CSS,
   no third-party font requests, automatic size-adjusted fallbacks. */
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-bricolage",
  display: "swap",
});
const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});
const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-space-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: "Delin B Anish", url: SITE_URL }],
  creator: "Delin B Anish",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F1ECDF",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      dir="ltr"
      suppressHydrationWarning
      className={`scroll-smooth ${bricolage.variable} ${instrument.variable} ${spaceMono.variable}`}
    >
      <body className="bg-transparent text-ink font-bricolage font-normal text-base leading-relaxed overflow-x-clip antialiased">
        {/*
          Progressive-enhancement gate (identical to the original site):
          a raw inline script executed synchronously during HTML parse,
          BEFORE first paint — so the loader/reveal styles gated on the
          `js` class apply immediately with no content flash. Crawlers
          and no-JS visitors get the fully rendered content with no
          overlay and no hidden elements. suppressHydrationWarning on
          <html> covers this class plus the runtime lang/dir switches.
        */}
        <script
          dangerouslySetInnerHTML={{ __html: `document.documentElement.classList.add("js");` }}
        />

        <a href="#top" className="skip-link">
          Skip to content
        </a>

        {/* Particle sphere canvas (background, interactive) */}
        <ParticleSphere />

        {/* Texture + frame (decorative) */}
        <svg className="grain" aria-hidden="true">
          <filter id="grainF">
            <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="2" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#grainF)" />
        </svg>
        <div className="frame" aria-hidden="true" />

        {/* Loader overlay */}
        <Loader />

        <SiteHeader />

        {children}

        <SiteFooter />

        {/* Global client effects */}
        <CustomCursor />
        <ToastHost />
        <ScrollReveal />
        <TitleEasterEgg />
      </body>
    </html>
  );
}
