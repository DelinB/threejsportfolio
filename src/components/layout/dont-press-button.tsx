"use client";

import { useLang } from "@/hooks/use-lang";
import { t } from "@/lib/i18n";
import { showToast } from "@/components/effects/toast";

/**
 * "DO NOT PRESS" — Comic Sans easter egg, ported from the original
 * (body class toggle + toast commentary).
 */
export function DontPressButton() {
  const lang = useLang();

  function onPress() {
    const on = document.body.classList.toggle("comicsans");
    showToast(
      on
        ? "…you actually pressed it. this is on you now."
        : "balance restored. we never speak of this again.",
    );
  }

  return (
    <button
      type="button"
      id="dontPress"
      className="font-mono font-bold text-[10px] tracking-[.16em] text-accent border-2 border-accent px-[1.1em] py-[.6em] rounded-full transition-colors duration-250 hover:bg-accent hover:text-paper active:scale-95"
      onClick={onPress}
    >
      {t(lang, "footer.dontPress")}
    </button>
  );
}
