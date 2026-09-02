import { OWNER, SITE_NAME, SITE_URL } from "@/lib/site";
import { PROJECTS } from "@/lib/projects";

/**
 * JSON-LD builders. Only schema types that accurately describe
 * visible page content are emitted (Person, WebSite, WebPage with
 * CreativeWork hasPart). No fabricated reviews, ratings, FAQs, or
 * locations — see the migration report.
 */

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: OWNER.name,
    givenName: OWNER.givenName,
    jobTitle: OWNER.jobTitle,
    description:
      "Frontend UI Developer with 2 years of experience building React.js web applications.",
    url: SITE_URL,
    email: `mailto:${OWNER.email}`,
    sameAs: [OWNER.socials.linkedin, OWNER.socials.github, OWNER.socials.twitter],
    worksFor: {
      "@type": "Organization",
      name: "Tech Technologies Pvt Ltd",
    },
    knowsAbout: [
      "React",
      "React 19",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Redux Toolkit",
      "RTK Query",
      "Zustand",
      "TanStack Query",
      "GSAP",
      "Jest",
      "React Testing Library",
      "Vitest",
      "HTML5",
      "CSS3",
      "WCAG",
      "ARIA",
      "Core Web Vitals",
      "Razorpay integration",
      "E-commerce frontend development",
    ],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: "en",
    author: {
      "@type": "Person",
      name: OWNER.name,
    },
  };
}

/** The page itself + the three case studies rendered inside the
 *  project dialogs (accurate to visible, on-demand content). */
export function webpageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    url: SITE_URL,
    name: "DELIN B ANISH® — Frontend UI Developer",
    inLanguage: "en",
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
    },
    about: {
      "@type": "Person",
      name: OWNER.name,
      jobTitle: OWNER.jobTitle,
    },
    mainEntity: {
      "@type": "Person",
      name: OWNER.name,
    },
    hasPart: PROJECTS.map((p) => ({
      "@type": "CreativeWork",
      name: p.title,
      description: p.outcome,
      about: p.brief,
      creator: {
        "@type": "Person",
        name: OWNER.name,
      },
    })),
  };
}
