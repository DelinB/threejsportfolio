/**
 * "The Damage Report" — receipt section, ported from the original.
 *
 * Accessibility adjustments (visually near-identical):
 * - The italic headline accent uses the light teal tint
 *   (`--accent-2`) because the original teal measured 2.0:1 against
 *   the dark section background.
 * - The stamp renders on solid paper (was paper/60) so its text
 *   passes 4.5:1; fine-print opacities nudged from .55 to .70.
 */
export function Receipt() {
  return (
    <section id="receipt" className="receipt-sec py-[7.5rem] px-[4vw] bg-dark text-paper overflow-x-clip">
      <div className="receipt-grid grid grid-cols-1 lg:grid-cols-[1fr_460px] gap-12 lg:gap-16 items-start">
        <div>
          <div className="shead mb-0">
            <span
              className="kicker inline-block font-mono font-bold text-[11px] leading-none tracking-[.16em] border-[1.5px] border-current rounded-full px-[1em] py-[.6em] mb-[1.7rem] uppercase rv"
              data-i18n="receipt.kicker"
            >
              ( 02 ) — THE DAMAGE REPORT
            </span>
            <h2
              className="font-bricolage font-extrabold uppercase text-[clamp(2.7rem,7.5vw,7rem)] leading-[.95] -tracking-[.03em] rv"
              style={{ "--d": ".08s" } as React.CSSProperties}
            >
              <span data-i18n="receipt.title1">TWO YEARS, </span>
              <em
                className="font-serif italic font-normal text-[.95em] normal-case tracking-normal text-accent-2"
                data-i18n="receipt.title2"
              >
                itemized.
              </em>
            </h2>
            <p
              className="aside font-serif italic font-normal text-[clamp(1.05rem,1.6vw,1.3rem)] leading-[1.45] opacity-90 max-w-[52ch] mt-[1.2rem] rv"
              style={{ "--d": ".16s" } as React.CSSProperties}
              data-i18n="receipt.desc"
            >
              Every pull request tells a story. Mine screams. All figures verified by my team lead, who
              laughed, then asked for more features.
            </p>
          </div>
          <p
            className="fine font-mono font-bold text-[10px] tracking-[.18em] mt-[2.4rem] opacity-70 uppercase rv"
            style={{ "--d": ".24s" } as React.CSSProperties}
            data-i18n="receipt.fine"
          >
            * NO REFUNDS · ALL SALES FINAL · COME AGAIN
          </p>
        </div>

        <div
          className="receipt bg-paper text-ink font-mono font-normal text-[12.5px] leading-[1.7] px-[1.7rem] pt-[2.2rem] pb-[1.4rem] rotate-[1.8deg] relative shadow-[12px_12px_0_var(--accent)] max-w-[460px] mx-auto w-full rv"
          style={{ "--d": ".2s" } as React.CSSProperties}
          role="img"
          aria-label="A humorous receipt itemizing two years of frontend work"
        >
          <div className="r-head text-center tracking-[.08em]">
            <strong
              className="block font-bricolage font-extrabold text-[1.35rem] tracking-[.02em]"
              data-i18n="receipt.head"
            >
              CAREER RECEIPT
            </strong>
            Nº 001
            <br />
            DELIN B ANISH · FRONTEND UI DEVELOPER
            <br />
            ISSUED: 2024 — STILL PRINTING
          </div>
          <hr className="r-sep border-2 border-dashed border-ink my-[.9rem]" />

          <div className="ritem flex items-baseline gap-[.5rem] uppercase">
            <span data-i18n="receipt.item1">Projects delivered</span>
            <span className="dots flex-1 border-b-2 border-dotted border-ink -translate-y-1" />
            <b className="font-bold whitespace-nowrap">3+</b>
          </div>
          <div className="ritem flex items-baseline gap-[.5rem] uppercase">
            <span data-i18n="receipt.item2">React components built</span>
            <span className="dots flex-1 border-b-2 border-dotted border-ink -translate-y-1" />
            <b className="font-bold whitespace-nowrap" data-i18n="receipt.item2val">
              hundreds
            </b>
          </div>
          <div className="ritem flex items-baseline gap-[.5rem] uppercase">
            <span data-i18n="receipt.item3">Bugs fixed</span>
            <span className="dots flex-1 border-b-2 border-dotted border-ink -translate-y-1" />
            <b className="font-bold whitespace-nowrap" data-i18n="receipt.item3val">
              many
            </b>
          </div>
          <div className="ritem flex items-baseline gap-[.5rem] uppercase">
            <span data-i18n="receipt.item4">Console errors shipped</span>
            <span className="dots flex-1 border-b-2 border-dotted border-ink -translate-y-1" />
            <b className="font-bold whitespace-nowrap">0</b>
          </div>
          <div className="ritem flex items-baseline gap-[.5rem] uppercase">
            <span data-i18n="receipt.item5">npm packages installed</span>
            <span className="dots flex-1 border-b-2 border-dotted border-ink -translate-y-1" />
            <b className="font-bold whitespace-nowrap" data-i18n="receipt.item5val">
              thousands
            </b>
          </div>
          <div className="ritem flex items-baseline gap-[.5rem] uppercase">
            <span data-i18n="receipt.item6">Redux slices created</span>
            <span className="dots flex-1 border-b-2 border-dotted border-ink -translate-y-1" />
            <b className="font-bold whitespace-nowrap">12</b>
          </div>
          <div className="ritem flex items-baseline gap-[.5rem] uppercase">
            <span data-i18n="receipt.item7">Coffee (litres)</span>
            <span className="dots flex-1 border-b-2 border-dotted border-ink -translate-y-1" />
            <b className="font-bold whitespace-nowrap">~500</b>
          </div>
          <div className="ritem flex items-baseline gap-[.5rem] uppercase">
            <span data-i18n="receipt.item8">Meetings survived</span>
            <span className="dots flex-1 border-b-2 border-dotted border-ink -translate-y-1" />
            <b className="font-bold whitespace-nowrap" data-i18n="receipt.item8val">
              countless
            </b>
          </div>

          <hr className="r-sep border-2 border-dashed border-ink my-[.9rem]" />
          <div className="r-total font-bricolage font-extrabold text-[1rem] uppercase flex justify-between tracking-[.02em]">
            <span data-i18n="receipt.subtotal">SUBTOTAL</span>
            <span data-i18n="receipt.subtotalVal">EXPERIENCE</span>
          </div>
          <div className="r-total font-bricolage font-extrabold text-[1rem] uppercase flex justify-between tracking-[.02em]">
            <span data-i18n="receipt.vat">VAT (TRAUMA, IE11)</span>
            <span data-i18n="receipt.vatVal">INCLUDED</span>
          </div>
          <hr className="r-sep border-2 border-dashed border-ink my-[.9rem]" />
          <div className="r-total font-bricolage font-extrabold text-[1rem] uppercase flex justify-between tracking-[.02em]">
            <span data-i18n="receipt.total">TOTAL</span>
            <span className="text-accent" data-i18n="receipt.totalVal">
              2 YEARS
            </span>
          </div>

          <div
            className="stamp absolute top-[46%] -right-[14px] -rotate-[13deg] border-[3.5px] border-accent text-accent font-bricolage font-extrabold text-[1.05rem] tracking-[.06em] uppercase px-[.7em] py-[.35em] opacity-92 bg-paper"
            data-i18n="receipt.stamp"
          >
            2 yrs service
          </div>

          <div className="barcode" aria-hidden="true" />
          <div className="r-code text-center text-[10px] tracking-[.3em] mt-[.35rem]" data-i18n="receipt.code">
            ANISH-2024-∞ · VALID IN THIS DIMENSION
          </div>
          <div
            className="r-legal text-center text-[10px] tracking-[.12em] mt-[.7rem] uppercase opacity-75"
            data-i18n="receipt.legal"
          >
            * NO REFUNDS · THANK YOU · COME AGAIN *
          </div>
        </div>
      </div>
    </section>
  );
}
