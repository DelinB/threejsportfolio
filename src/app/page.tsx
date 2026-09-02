import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { Marquee } from "@/components/sections/marquee";
import { Work } from "@/components/sections/work";
import { Receipt } from "@/components/sections/receipt";
import { Timeline } from "@/components/sections/timeline";
import { Services } from "@/components/sections/services";
import { Testimonials } from "@/components/sections/testimonials";
import { Contact } from "@/components/sections/contact";
import { personJsonLd, websiteJsonLd, webpageJsonLd } from "@/lib/seo";
import { SITE_NAME, SITE_TITLE, SITE_DESCRIPTION, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: SITE_TITLE },
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: "/",
    siteName: SITE_NAME,
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "DELIN B ANISH — Frontend UI Developer portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/og.png"],
  },
};

/**
 * Home — a single page of anchor sections, exactly like the source
 * site. Every section below the interactive islands is a React
 * Server Component: the full content (headings, timeline, receipt,
 * testimonials, contact, case studies) ships in the initial HTML
 * for crawlers and AI answer engines.
 */
export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webpageJsonLd()) }}
      />

      {/* suppressHydrationWarning: the loader overlay imperatively
          sets `inert` on this element while it covers the page
          (see components/effects/loader.tsx); React never re-renders
          this server component, so the attribute is safe to mutate. */}
      <main id="top" tabIndex={-1} suppressHydrationWarning>
        <Hero />
        <Marquee />
        <Work />
        <Receipt />
        <Timeline />
        <Services />
        <Testimonials />
        <Contact />
      </main>
    </>
  );
}
