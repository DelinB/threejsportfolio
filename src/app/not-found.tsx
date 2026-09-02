import Link from "next/link";
import { StarIcon } from "@/components/ui/icons";

/**
 * 404 — styled to match the site. Note: not-found.tsx cannot export
 * metadata in Next.js; the root layout's default title applies.
 */
export default function NotFound() {
  return (
    <main
      id="top"
      tabIndex={-1}
      className="min-h-screen flex flex-col items-center justify-center gap-6 px-[6vw] text-center bg-paper"
    >
      <StarIcon className="w-10 h-10 text-accent animate-spin" />
      <p className="font-mono font-bold text-[11px] tracking-[.16em] uppercase">
        ( ERROR 404 ) — PAGE NOT FOUND
      </p>
      <h1 className="font-bricolage font-extrabold uppercase text-[clamp(3rem,10vw,7rem)] leading-[.95] -tracking-[.03em]">
        404<span className="font-serif italic font-normal normal-case tracking-normal text-accent">.</span>
      </h1>
      <p className="font-serif italic font-normal text-[1.15rem] leading-[1.5] max-w-[46ch] opacity-90">
        This page went looking for better kerning and never came back. The rest of the site is still
        exactly where you left it.
      </p>
      <div className="flex flex-wrap gap-4 justify-center mt-2">
        <Link
          href="/"
          className="font-mono font-bold text-[11px] tracking-[.14em] uppercase border-2 border-ink rounded-full px-[1.4em] py-[.8em] transition-colors duration-250 hover:bg-accent hover:border-accent hover:text-paper"
        >
          Back to the portfolio
        </Link>
        <Link
          href="/#contact"
          className="font-mono font-bold text-[11px] tracking-[.14em] uppercase underline decoration-accent decoration-2 underline-offset-4"
        >
          Contact
        </Link>
      </div>
    </main>
  );
}
