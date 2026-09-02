"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { PROJECTS } from "@/lib/projects";
import { OWNER } from "@/lib/site";
import { useLang } from "@/hooks/use-lang";
import { t } from "@/lib/i18n";
import { ArrowUpRightIcon } from "@/components/ui/icons";

const previewUrl = (seed: string) => `https://picsum.photos/seed/${seed}/680/460.jpg`;
const modalImgUrl = (seed: string) => `https://picsum.photos/seed/${seed}/1400/1000.jpg`;

/**
 * Selected projects + case-study modal.
 *
 * Accessibility changes vs. the original (visually identical):
 * - Each row is now a real <button> (the original used
 *   <li role="button" tabindex="0"> with manual keydown handling —
 *   Enter/Space now work natively and screen readers announce a
 *   button without ARIA emulation).
 * - The closed modal is `inert` (the original only set aria-hidden,
 *   leaving its links focusable behind the overlay).
 * - Focus moves to the close button on open and is restored on
 *   close; Tab is trapped inside the dialog; Escape closes it.
 *
 * AEO change: the modal's case-study content for ALL projects is
 * server-rendered (hidden per project) instead of being injected by
 * JavaScript on open, so the briefs/outcomes/quotes are part of the
 * crawlable HTML.
 */
export function Work() {
  const lang = useLang();
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const modalOpen = openIdx !== null;

  const previewRef = useRef<HTMLDivElement>(null);
  const previewImgRef = useRef<HTMLImageElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const lastFocusRef = useRef<HTMLElement | null>(null);
  const finePointer = useRef(false);

  /* Floating preview follows the pointer (fine pointers only). */
  useEffect(() => {
    finePointer.current = window.matchMedia("(hover:hover) and (pointer:fine)").matches;
    const prev = previewRef.current;
    if (!prev || !finePointer.current) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let px = mx;
    let py = my;
    let rafId = 0;

    function onMouseMove(e: MouseEvent) {
      mx = e.clientX;
      my = e.clientY;
    }
    const loop = () => {
      px += (mx - px) * 0.11;
      py += (my - py) * 0.11;
      const rot = Math.max(-7, Math.min(7, (mx - px) * 0.045));
      prev.style.transform = `translate(${px}px,${py}px) rotate(${rot}deg)`;
      rafId = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    rafId = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  /* Warm the preview images once the page is loaded. */
  useEffect(() => {
    function preload() {
      PROJECTS.forEach((p) => {
        const i = new window.Image();
        i.src = previewUrl(p.seed);
      });
    }
    if (document.readyState === "complete") {
      preload();
    } else {
      window.addEventListener("load", preload, { once: true });
    }
  }, []);

  /* Modal open/close lifecycle: body lock, focus in, focus restore. */
  useEffect(() => {
    if (!modalOpen) return;
    lastFocusRef.current = document.activeElement as HTMLElement | null;
    document.body.classList.add("lock");
    previewRef.current?.classList.remove("show");
    closeBtnRef.current?.focus();
    return () => {
      document.body.classList.remove("lock");
      lastFocusRef.current?.focus();
    };
  }, [modalOpen]);

  /* Escape closes the modal. */
  useEffect(() => {
    if (!modalOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenIdx(null);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [modalOpen]);

  /* Focus trap while the dialog is open. */
  useEffect(() => {
    if (!modalOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key !== "Tab") return;
      const modal = modalRef.current;
      if (!modal) return;
      /* Only elements that actually render can hold focus: the
         non-active case studies' links live in [hidden] (display:none)
         subtrees — the browser skips them during sequential focus
         navigation, but querySelectorAll still returns them. Without
         this filter `last` points at an unfocusable link, the wrap
         guard never fires, and a Tab from the visible mailto link
         escapes the dialog into the page behind the overlay. */
      const focusable = Array.from(
        modal.querySelectorAll<HTMLElement>(
          'button, a, input, [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((el) => el.getClientRects().length > 0);
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [modalOpen]);

  function showPreview(i: number) {
    if (!finePointer.current) return;
    const img = previewImgRef.current;
    const prev = previewRef.current;
    if (!img || !prev) return;
    img.src = previewUrl(PROJECTS[i].seed);
    img.alt = PROJECTS[i].title + " preview";
    prev.classList.add("show");
  }

  function hidePreview() {
    previewRef.current?.classList.remove("show");
  }

  return (
    <section id="work" className="py-[7.5rem] px-[4vw]">
      <div className="shead mb-[3.5rem] max-w-[1100px]">
        <span className="kicker inline-block font-mono font-bold text-[11px] leading-none tracking-[.16em] border-[1.5px] border-current rounded-full px-[1em] py-[.6em] mb-[1.7rem] uppercase rv">
          {t(lang, "work.kicker")}
        </span>
        <h2
          className="font-bricolage font-extrabold uppercase text-[clamp(2.7rem,7.5vw,7rem)] leading-[.95] -tracking-[.03em] rv"
          style={{ "--d": ".08s" } as React.CSSProperties}
        >
          <span>{t(lang, "work.title1")}</span>
          <em className="font-serif italic font-normal text-[.95em] normal-case tracking-normal text-accent">
            {t(lang, "work.title2")}
          </em>
        </h2>
        <p
          className="aside font-serif italic font-normal text-[clamp(1.05rem,1.6vw,1.3rem)] leading-[1.45] opacity-90 max-w-[52ch] mt-[1.2rem] rv"
          style={{ "--d": ".16s" } as React.CSSProperties}
        >
          {t(lang, "work.desc")}
        </p>
      </div>

      <ol className="work-list border-b-2 border-ink">
        {PROJECTS.map((p, i) => (
          <li
            key={p.seed}
            className="border-t-2 border-ink rv"
            style={{ "--d": `${0.06 * i}s` } as React.CSSProperties}
          >
            <button
              type="button"
              className="work-row group cursor-pointer w-full text-left grid grid-cols-[2.2rem_1fr] md:grid-cols-[3.6rem_1fr_auto] gap-4 md:gap-6 items-start px-[.4rem] md:px-4 py-[1.8rem] md:py-[2.3rem] transition-colors duration-250 relative hover:bg-dark hover:text-paper focus-visible:bg-dark focus-visible:text-paper focus-visible:outline-none"
              aria-haspopup="dialog"
              onMouseEnter={() => showPreview(i)}
              onMouseLeave={hidePreview}
              onFocus={hidePreview}
              onClick={() => setOpenIdx(i)}
            >
              <span className="w-idx font-mono font-bold text-xs text-accent pt-[.5rem]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="w-title font-bricolage font-extrabold text-[clamp(1.7rem,4.6vw,4rem)] leading-none uppercase -tracking-[.02em] transition-transform duration-300 ease-custom group-hover:translate-x-3.5">
                  {t(lang, `work.proj${i + 1}.title`)}
                </h3>
                <p className="w-tag font-serif italic font-normal text-[1.08rem] leading-[1.4] opacity-85 mt-[.55rem] max-w-[52ch]">
                  {p.tag}
                </p>
                <Image
                  className="w-thumb"
                  src={`https://picsum.photos/seed/${p.seed}/900/560.jpg`}
                  alt={p.thumbAlt}
                  width={900}
                  height={560}
                  loading="lazy"
                  sizes="(max-width: 860px) 92vw, 900px"
                />
              </div>
              <div className="w-meta flex flex-col md:flex-row items-start md:items-end gap-2 md:gap-4 font-mono font-bold text-[10.5px] tracking-[.14em] uppercase text-right mt-4 md:mt-0 md:pt-[.5rem] md:text-right">
                <span>{t(lang, `work.proj${i + 1}.meta`)}</span>
                <span>{p.year}</span>
                <ArrowUpRightIcon className="w-arrow hidden md:block w-[26px] h-[26px] opacity-0 -translate-x-2 translate-y-2 transition-all duration-300 ease-custom text-accent group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0" />
              </div>
            </button>
          </li>
        ))}
      </ol>

      {/* Floating hover preview (desktop, decorative) */}
      <div id="wpreview" ref={previewRef} aria-hidden="true">
        <div className="wpreview-card">
          {/* Transient hover preview: a raw picsum URL keeps hovers
              instant (matching the original's preloaded URLs) instead
              of round-tripping through the image optimizer on hover. */}
          <img id="wpreviewImg" ref={previewImgRef} alt="" />
        </div>
      </div>

      {/* Project dialog — content for all case studies is
          server-rendered; only the active one is revealed. */}
      <div
        className={modalOpen ? "modal open" : "modal"}
        id="modal"
        ref={modalRef}
        inert={!modalOpen}
        aria-hidden={!modalOpen}
      >
        <div className="modal-backdrop" onClick={() => setOpenIdx(null)} />
        <div className="modal-panel" role="dialog" aria-modal="true" aria-labelledby="mTitle">
          <button
            type="button"
            className="modal-close font-mono font-bold text-[11px] tracking-[.14em] hover:bg-dark hover:text-paper transition-colors duration-250"
            id="mClose"
            ref={closeBtnRef}
            onClick={() => setOpenIdx(null)}
          >
            {t(lang, "modal.close")}
          </button>
          {PROJECTS.map((p, i) => {
            const active = openIdx === i;
            return (
              <div
                key={p.seed}
                className="modal-inner grid gap-10 lg:gap-[2.6rem] px-5 md:px-12 pb-8 md:pb-12 max-w-[1300px] mx-auto lg:grid-cols-[1.05fr_1fr] lg:items-start"
                hidden={!active}
              >
                <div className="modal-media">
                  <Image
                    src={modalImgUrl(p.seed)}
                    alt={`${p.title} — project visual`}
                    width={1400}
                    height={1000}
                    className="w-full aspect-[4/3] object-cover border-2 border-ink"
                    sizes="(max-width: 1024px) 88vw, 700px"
                  />
                </div>
                <div className="modal-body">
                  <span className="m-meta font-mono font-bold text-[10.5px] tracking-[.16em] text-accent uppercase">
                    {p.meta}
                  </span>
                  <h3
                    className="font-bricolage font-extrabold text-[clamp(1.9rem,4vw,3.4rem)] leading-none uppercase -tracking-[.02em] mt-[.7rem] mb-[1.8rem]"
                    id={active ? "mTitle" : undefined}
                  >
                    {p.title}
                  </h3>
                  <div className="m-grid grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    <div>
                      <h4 className="font-mono font-bold text-[10px] tracking-[.18em] text-accent uppercase mb-[.45rem]">
                        {t(lang, "modal.brief")}
                      </h4>
                      <p className="text-[.98rem] leading-[1.55]">{p.brief}</p>
                    </div>
                    <div>
                      <h4 className="font-mono font-bold text-[10px] tracking-[.18em] text-accent uppercase mb-[.45rem]">
                        {t(lang, "modal.outcome")}
                      </h4>
                      <p className="text-[.98rem] leading-[1.55]">{p.outcome}</p>
                    </div>
                    <div>
                      <h4 className="font-mono font-bold text-[10px] tracking-[.18em] text-accent uppercase mb-[.45rem]">
                        {t(lang, "modal.quote")}
                      </h4>
                      <p className="quote font-serif italic font-normal text-[1.1rem]">{p.quote}</p>
                    </div>
                    <div>
                      <h4 className="font-mono font-bold text-[10px] tracking-[.18em] text-accent uppercase mb-[.45rem]">
                        {t(lang, "modal.lesson")}
                      </h4>
                      <p className="text-[.98rem] leading-[1.55]">{p.lesson}</p>
                    </div>
                  </div>
                  <a
                    href={`mailto:${OWNER.email}?subject=${encodeURIComponent("Tell me about " + p.title)}`}
                    className="inline-flex items-center gap-[.5rem] mt-8 font-mono font-bold text-[12px] tracking-[.14em] border-2 border-ink px-[1.4em] py-[.9em] rounded-full transition-colors duration-250 hover:bg-accent hover:border-accent hover:text-paper"
                  >
                    {t(lang, "modal.ask")}
                    <ArrowUpRightIcon className="w-3 h-3" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
