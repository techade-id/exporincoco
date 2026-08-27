"use client";

import { IconMoon, IconSun } from "@/components/icons";
import { useTheme } from "@/components/ThemeProvider";

export function ThemeToggle({
  lightLabel,
  darkLabel,
}: {
  lightLabel: string;
  darkLabel: string;
}) {
  const { theme, toggleTheme } = useTheme();
  const label = theme === "dark" ? lightLabel : darkLabel;

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
