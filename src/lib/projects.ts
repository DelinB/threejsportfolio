/**
 * Project data — ported verbatim from the original site's
 * PROJECTS array (English only, exactly like the source site).
 */
export interface Project {
  seed: string;
  title: string;
  meta: string;
  year: string;
  tag: string;
  thumbAlt: string;
  brief: string;
  outcome: string;
  quote: string;
  lesson: string;
}

export const PROJECTS: Project[] = [
  {
    seed: "ecommerce",
    title: "E-COMMERCE PLATFORM",
    meta: "FRONTEND / E-COMMERCE — 2025",
    year: "2025",
    tag: "Qatar Retail — React.js · Redux Toolkit · Tailwind CSS",
    thumbAlt: "E-commerce platform for Qatar Retail",
    brief: "Update a legacy e-commerce platform to improve UI scalability and component reuse across catalog, checkout, and order workflows.",
    outcome:
      "Built responsive catalog and product pages with Tailwind CSS. Moved state management to RTK Query for caching and normalized state, improving performance.",
    quote: '"It looks modern and loads fast." — the client, immediately asking for more features',
    lesson: "Component reuse is not just about code; it's about not repeating yourself when the client changes their mind.",
  },
  {
    seed: "adminpanel",
    title: "ADMIN PANEL & DASHBOARD",
    meta: "DASHBOARD / UI — 2024–2025",
    year: "2024–2025",
    tag: "React.js · TypeScript · RTK Query — modular, real-time inventory and analytics.",
    thumbAlt: "E-commerce admin panel dashboard",
    brief: "Build a modular React.js interface for an e-commerce admin dashboard to track orders and visualize analytics.",
    outcome: "Created UI components for inventory, forms, and tables. Set up RTK Query with cache tags for automatic data refresh.",
    quote: '"He made the dashboard actually usable." — the product manager',
    lesson: "Forms and tables may not be glamorous, but they are where the business lives.",
  },
  {
    seed: "eduportal",
    title: "EDUCATIONAL PORTAL",
    meta: "PORTAL / PAYMENTS — 2024",
    year: "2024",
    tag: "React.js · TypeScript · Tailwind CSS · REST APIs — search, filter, and subscription with Razorpay.",
    thumbAlt: "Educational portal with course browsing",
    brief: "Create a responsive educational portal for searching colleges and courses, with a subscription model and Razorpay integration.",
    outcome: "Implemented JWT authentication and protected routes. Optimized large lists with lazy loading and pagination.",
    quote: '"Students actually found the colleges they wanted." — the client',
    lesson: "Performance matters: nobody waits for a slow search, especially a student.",
  },
];
