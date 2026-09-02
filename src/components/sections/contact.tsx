import { OWNER } from "@/lib/site";
import { ArrowUpRightIcon } from "@/components/ui/icons";
import { EmailButton } from "@/components/sections/email-button";

const SOCIALS = [
  { href: OWNER.socials.linkedin, label: "LINKEDIN" },
  { href: OWNER.socials.github, label: "GITHUB" },
  { href: OWNER.socials.twitter, label: "TWITTER" },
] as const;

/** Contact section — ported from the original (copy-email CTA + socials). */
export function Contact() {
  return (
    <section id="contact" className="contact-sec py-[7.5rem] px-[4vw] bg-accent text-paper">
      <span
        className="kicker inline-block font-mono font-bold text-[11px] leading-none tracking-[.16em] border-[1.5px] border-current rounded-full px-[1em] py-[.6em] mb-[1.7rem] uppercase rv"
        data-i18n="contact.kicker"
      >
        ( 06 ) — CONTACT
      </span>
      <h2
        className="font-bricolage font-extrabold uppercase text-[clamp(4rem,14vw,13rem)] leading-[.95] -tracking-[.03em] rv"
        style={{ "--d": ".08s" } as React.CSSProperties}
      >
        <span data-i18n="contact.title1">SAY </span>
        <em
          className="font-serif italic font-normal text-[.95em] normal-case tracking-normal text-paper"
          data-i18n="contact.title2"
        >
          hi.
        </em>
      </h2>
      <p
        className="contact-sub font-bricolage font-medium text-[clamp(1.1rem,1.8vw,1.45rem)] leading-[1.5] max-w-[52ch] mt-[1.4rem] text-paper rv"
        style={{ "--d": ".16s" } as React.CSSProperties}
        data-i18n="contact.desc"
      >
        Good briefs welcome. Dancing babies are not. I reply faster than this website loads — which,
        admittedly, is a low bar while the kerning slider is involved.
      </p>

      <EmailButton />

      <div className="socials flex flex-wrap gap-6 mt-12 rv" style={{ "--d": ".3s" } as React.CSSProperties}>
        {SOCIALS.map((social) => (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono font-bold text-[11px] tracking-[.16em] inline-flex items-center gap-[.4rem] text-paper hover:line-through hover:decoration-paper hover:decoration-2"
          >
            {social.label} <ArrowUpRightIcon className="w-3 h-3" />
          </a>
        ))}
        <a
          href={`mailto:${OWNER.email}`}
          className="font-mono font-bold text-[11px] tracking-[.16em] inline-flex items-center gap-[.4rem] text-paper hover:line-through hover:decoration-paper hover:decoration-2"
        >
          EMAIL <ArrowUpRightIcon className="w-3 h-3" />
        </a>
      </div>

      <p
        className="contact-note font-mono font-bold text-[10px] tracking-[.18em] uppercase mt-[3.2rem] opacity-85 text-paper rv"
        style={{ "--d": ".36s" } as React.CSSProperties}
        data-i18n="contact.note"
      >
        CURRENTLY OPEN TO: FRONTEND ROLES · CURRENTLY AVOIDING: &quot;QUICK FIXES&quot;
      </p>
    </section>
  );
}
