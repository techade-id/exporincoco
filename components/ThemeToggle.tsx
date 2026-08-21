"use client";

import { IconMoon, IconSun } from "@/components/icons";
import { useTheme } from "@/components/ThemeProvider";
import { t } from "@/lib/i18n";
import type { Locale } from "@/lib/site";

export function ThemeToggle({ locale }: { locale: Locale }) {
  const { theme, toggleTheme } = useTheme();
  const copy = t(locale);
  const label = theme === "dark" ? copy.theme.light : copy.theme.dark;

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink transition hover:border-orange hover:text-orange"
    >
      {theme === "dark" ? <IconSun className="h-4 w-4" /> : <IconMoon className="h-4 w-4" />}
    </button>
  );
}
