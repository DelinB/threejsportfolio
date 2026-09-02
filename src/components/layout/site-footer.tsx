import { DontPressButton } from "@/components/layout/dont-press-button";

const FOOTER_LINKS = [
  { href: "#work", key: "nav.work", label: "WORK" },
  { href: "#receipt", key: "nav.receipt", label: "RECEIPT" },
  { href: "#timeline", key: "nav.timeline", label: "TIMELINE" },
  { href: "#contact", key: "nav.contact", label: "CONTACT" },
] as const;

/**
 * Footer — ported from the original. Moved outside <main> (the
 * original nested the footer inside <main>, which is invalid
 * document structure — fixed here with zero visual change).
 */
export function SiteFooter() {
  return (
    <footer className="py-[2.2rem] px-[4vw] border-t-2 border-ink flex flex-wrap gap-y-5 gap-x-12 justify-center md:justify-between items-center font-mono font-bold text-[10px] tracking-[.14em] uppercase">
      <span className="text-center" data-i18n="footer.copyright">
        © 2024–2026 DELIN B ANISH. ALL RIGHTS RESERVED, INCLUDING THE RIGHT TO REMAIN KERNING.
      </span>
      <nav className="fnav flex gap-6 flex-wrap justify-center" aria-label="Footer">
        {FOOTER_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="hover:line-through hover:decoration-accent"
            data-i18n={link.key}
          >
            {link.label}
          </a>
        ))}
      </nav>
      <DontPressButton />
    </footer>
  );
}
