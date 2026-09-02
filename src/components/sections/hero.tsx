import { KernSlider } from "@/components/sections/kern-slider";
import { StarIcon, DipArrowIcon } from "@/components/ui/icons";

/* Hero letters are pre-split server-side (the original did this
   with runtime DOM splitting). The hover "boing" is pure CSS —
   the original re-triggered a JS animation, :hover restarts the
   same keyframes natively with zero JavaScript. */
function SplitLetters({ text }: { text: string }) {
  return (
    <>
      {text.split("").map((ch, i) =>
        ch === " " ? " " : (
          <span className="h-ch" key={i}>
            {ch}
          </span>
        ),
      )}
    </>
  );
}

export function Hero() {
  return (
    <header className="hero min-h-screen flex flex-col justify-end px-[4vw] pt-[110px] pb-[2.2rem] relative bg-paper/30">
      <div
        className="hero-meta flex flex-wrap gap-x-[2.4rem] gap-y-[.7rem] font-mono font-bold text-[10.5px] tracking-[.16em] uppercase"
        data-hero
      >
        <span className="rv" data-hero data-i18n="hero.meta1">
          PORTFOLIO — FRONTEND UI DEVELOPER
        </span>
        <span className="rv" data-hero style={{ "--d": ".06s" } as React.CSSProperties} data-i18n="hero.meta2">
          EST. 2024
        </span>
      </div>

      <h1 className="hero-name mt-[1.6rem] mb-[1.2rem] font-bricolage font-extrabold uppercase">
        <span
          className="h-line h-split block text-[clamp(3.9rem,15.5vw,14.5rem)] leading-[.84] -tracking-[.035em] rv"
          data-hero
          style={{ "--d": ".15s" } as React.CSSProperties}
        >
          <SplitLetters text="DELIN B" />
          <StarIcon
            className="h-star inline-block w-[.42em] h-[.42em] text-accent align-super ml-[.06em] animate-spinSlow"
            strokeWidth={2.4}
          />
        </span>
        <span
          className="h-line h-split block text-[clamp(3.9rem,15.5vw,14.5rem)] leading-[.84] -tracking-[.035em] rv"
          data-hero
          style={{ "--d": ".24s" } as React.CSSProperties}
          id="nameLast"
        >
          <SplitLetters text="ANISH" />
        </span>
      </h1>

      <div className="hero-low grid grid-cols-1 lg:grid-cols-[1.15fr_.85fr] gap-12 lg:gap-12 items-end mb-[2.4rem]">
        <div className="hero-intro">
          <p
            className="big font-bricolage font-medium text-[clamp(1.35rem,2.3vw,2rem)] leading-[1.35] max-w-[34ch] -tracking-[.01em] rv"
            data-hero
            style={{ "--d": ".33s" } as React.CSSProperties}
            data-i18n="hero.intro1"
          >
            Frontend <em className="font-serif italic font-normal text-[1.1em]">UI Developer</em> with
            2 years of experience building React.js web applications. I specialize in core front-end
            technologies and modern React development.
          </p>
          <p
            className="note font-serif italic font-normal text-[1.05rem] leading-[1.5] opacity-80 mt-4 max-w-[44ch] rv"
            data-hero
            style={{ "--d": ".4s" } as React.CSSProperties}
            data-i18n="hero.intro2"
          >
            ( Anish is my real name. So is the kerning obsession. Drag the slider — I insist. )
          </p>
        </div>
        <KernSlider />
      </div>

      <div
        className="hero-foot flex flex-wrap justify-between gap-x-8 gap-y-3 border-t-[1.5px] border-ink pt-[1.2rem] font-mono font-bold text-[10.5px] tracking-[.16em] uppercase rv"
        data-hero
        style={{ "--d": ".56s" } as React.CSSProperties}
      >
        {/* data-i18n sits on the inner text span so the language swap
            never destroys the animated arrow (the original's swap
            accidentally wiped this SVG — fixed). */}
        <span>
          <span data-i18n="hero.scroll">SCROLL — IT GETS BETTER</span>{" "}
          <DipArrowIcon className="icon dip inline-block w-[1em] h-[1em] align-[-.12em] animate-dip" />
        </span>
        <span data-i18n="hero.stats">
          2 YRS · 3+ PROJECTS · 0 REGRETS* <span title="one">(*ZERO)</span>
        </span>
      </div>

      <div
        className="badge absolute top-[19vh] right-[5vw] w-[158px] h-[158px] hidden md:block rv"
        data-hero
        style={{ "--d": ".6s" } as React.CSSProperties}
        aria-hidden="true"
      >
        <svg className="ring w-full h-full animate-spinVerySlow" viewBox="0 0 200 200">
          <defs>
            <path
              id="circ"
              d="M100,100 m-80,0 a80,80 0 1,1 160,0 a80,80 0 1,1 -160,0"
            />
          </defs>
          <text className="font-mono font-bold text-[13.5px] tracking-[3.4px] fill-ink uppercase">
            <textPath href="#circ" data-i18n="hero.badge">
              OPEN TO FRONTEND ROLES · REACT SPECIALIST ·
            </textPath>
          </text>
        </svg>
        <div className="core absolute inset-0 grid place-items-center">
          <StarIcon className="w-[34px] h-[34px] text-accent" strokeWidth={2.4} />
        </div>
      </div>
    </header>
  );
}
