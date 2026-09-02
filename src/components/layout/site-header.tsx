"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "@/hooks/use-lang";
import { applyServerTranslations, t, type Lang } from "@/lib/i18n";
import { StarIcon } from "@/components/ui/icons";

const NAV_ITEMS = [
  { href: "#work", key: "nav.work", tagKey: "menu.workTag", num: "01" },
  { href: "#receipt", key: "nav.receipt", tagKey: "menu.receiptTag", num: "02" },
  { href: "#timeline", key: "nav.timeline", tagKey: "menu.timelineTag", num: "03" },
  { href: "#proof", key: "nav.proof", tagKey: "menu.proofTag", num: "04" },
  { href: "#contact", key: "nav.contact", tagKey: "menu.contactTag", num: "05" },
] as const;

/**
 * Fixed header + full-screen mobile menu + EN/AR language switch.
 *
 * Language architecture: the header owns the switcher. On toggle it
 * (1) swaps text on server-rendered `[data-i18n]` nodes imperatively,
 * (2) flips <html dir/lang> for RTL, and (3) broadcasts `langchange`
 * so other client islands (kern slider, services, work modal,
 * footer button) re-render themselves in React. The header's own
 * labels are React-state driven — they never carry `data-i18n`, so
 * React and the DOM swap never fight over the same nodes.
 */
export function SiteHeader() {
  const lang = useLang();
  const [menuOpen, setMenuOpen] = useState(false);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const firstMenuLinkRef = useRef<HTMLAnchorElement>(null);
  const navRef = useRef<HTMLElement>(null);

  /* Nav scrolled state — one passive listener toggles a body class (CSS-driven). */
  useEffect(() => {
    const onScroll = () => {
      document.body.classList.toggle("scrolled", window.scrollY > 40);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Anchor-landing offset: keep <html>'s scroll-padding-top (via the
   * --nav-h custom property) equal to the REAL header height so
   * in-page anchors land flush below the fixed nav instead of leaving
   * a strip of the previous section visible (the original's hardcoded
   * 90px was ~30px taller than the rendered nav). Every anchor below
   * the fold lands while the nav is in its scrolled (compact, opaque)
   * state, so that is the height we measure: the compact class is
   * forced for one synchronous measurement with the nav's height
   * transition disabled — no paint happens in between, so there is no
   * flicker. Re-measured on resize and once the webfonts settle (the
   * font swap can change the nav's line boxes). */
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const syncNavHeight = () => {
      const wasScrolled = document.body.classList.contains("scrolled");
      const prevTransition = nav.style.transition;
      nav.style.transition = "none";
      document.body.classList.add("scrolled");
      const h = nav.getBoundingClientRect().height; // includes border
      document.body.classList.toggle("scrolled", wasScrolled);
      nav.style.transition = prevTransition;
      document.documentElement.style.setProperty("--nav-h", `${Math.ceil(h)}px`);
    };

    syncNavHeight();

    let raf = 0;
    const onResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(syncNavHeight);
    };
    window.addEventListener("resize", onResize, { passive: true });
    document.fonts?.ready.then(syncNavHeight).catch(() => undefined);

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
    };
  }, []);

  /* Body lock + focus management while the menu overlay is open. */
  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    if (menuOpen) {
      firstMenuLinkRef.current?.focus();
    }
    return () => {
      document.body.classList.remove("menu-open");
    };
  }, [menuOpen]);

  /* Escape closes the menu and restores focus to the burger. */
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key !== "Escape" || !menuOpen) return;
      setMenuOpen(false);
      burgerRef.current?.focus();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  function cycleLanguage() {
    const next: Lang = lang === "en" ? "ar" : "en";
    applyServerTranslations(next);
    window.dispatchEvent(new CustomEvent<Lang>("langchange", { detail: next }));
  }

  return (
    <>
      <nav
        ref={navRef}
        className="nav fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-[4vw] py-[1.1rem] transition-all duration-300 border-b-[1.5px] border-transparent bg-transparent"
        id="mainNav"
        aria-label="Primary"
      >
        <a
          className="logo flex items-center gap-[.4rem] font-bricolage font-extrabold text-xl -tracking-[.03em]"
          href="#top"
          aria-label="Delin B Anish — back to top"
        >
          AB
          <StarIcon className="w-[15px] h-[15px] text-accent transition-transform duration-600 ease-custom hover:rotate-180" />
        </a>

        <div className="nav-links hidden md:flex gap-7 items-center">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-mono font-bold text-[11px] tracking-[.14em] uppercase hover:line-through hover:decoration-accent hover:decoration-2"
            >
              {t(lang, item.key)}
            </a>
          ))}
          <a
            className="hire font-mono font-bold text-[11px] tracking-[.12em] border-2 border-ink rounded-full px-[1.2em] py-[.6em] transition-colors duration-250 hover:bg-accent hover:border-accent hover:text-paper hover:no-underline"
            href="#contact"
          >
            {t(lang, "nav.hire")}
          </a>
          <button
            type="button"
            className="lang-switch"
            aria-label="Switch language between English and Arabic"
            onClick={cycleLanguage}
          >
            {lang.toUpperCase()}
          </button>
        </div>

        <button
          type="button"
          className="burger"
          id="burger"
          ref={burgerRef}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="menu"
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span />
          <span />
        </button>
      </nav>

      {/* Mobile menu overlay — `inert` when closed so its links are
          never focusable while hidden (the original only set
          aria-hidden, which leaves focusable elements behind the
          overlay — a real WCAG violation, fixed here). */}
      <div className="menu" id="menu" inert={!menuOpen} aria-hidden={!menuOpen}>
        {NAV_ITEMS.map((item, i) => (
          <a
            key={item.href}
            ref={i === 0 ? firstMenuLinkRef : undefined}
            className="menu-link flex items-baseline gap-4 py-[.6rem] border-b border-paper/20 font-bricolage font-extrabold text-[clamp(2.2rem,9vw,4.5rem)] leading-[1.05] uppercase -tracking-[.02em] transition-all duration-250 hover:text-accent-2 hover:translate-x-2.5"
            href={item.href}
            onClick={() => setMenuOpen(false)}
          >
            <span className="num font-mono font-bold text-sm text-accent-2">{item.num}</span>
            <span>{t(lang, item.key)}</span>
            <em className="font-serif italic font-normal text-[.38em] tracking-normal opacity-75">
              {t(lang, item.tagKey)}
            </em>
          </a>
        ))}
        <div className="menu-foot absolute bottom-[26px] left-[6vw] font-mono font-bold text-[10px] tracking-[.2em] opacity-70">
          {t(lang, "menu.foot")}
        </div>
      </div>
    </>
  );
}
