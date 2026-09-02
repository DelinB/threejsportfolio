/**
 * Central site configuration.
 *
 * NEXT_PUBLIC_SITE_URL is the single source of truth for every
 * absolute URL that Next.js emits (canonical, Open Graph, sitemap,
 * robots, JSON-LD). It defaults to a placeholder production domain
 * and MUST be overridden per environment — see .env.example.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://delinbanish.com"
).replace(/\/+$/, "");

export const SITE_NAME = "DELIN B ANISH";

export const SITE_TITLE = "DELIN B ANISH® — Frontend UI Developer";

export const SITE_DESCRIPTION =
  "Delin B Anish, Frontend UI Developer. Two years of building React applications that are fast, accessible, and a joy to use.";

export const OWNER = {
  name: "Delin B Anish",
  givenName: "Anish",
  jobTitle: "Frontend UI Developer",
  email: "delinbanish@gmail.com",
  socials: {
    linkedin: "https://linkedin.com/in/anish",
    github: "https://github.com",
    twitter: "https://twitter.com",
  },
} as const;
