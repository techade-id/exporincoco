"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { IconClose, IconGlobe, IconMenu } from "@/components/icons";
import type { LocaleCopy, NavItem, SiteImages } from "@/lib/content-types";
import { localizedPath, type Locale } from "@/lib/site";

function switchLocale(pathname: string, next: Locale) {
  const parts = pathname.split("/");
  if (parts[1] === "en" || parts[1] === "id") {
    parts[1] = next;
    return parts.join("/") || `/${next}`;
  }
  return `/${next}`;
}

export function Header({
  locale,
  copy,
  navItems,
  images,
}: {
  locale: Locale;
  copy: LocaleCopy;
  navItems: NavItem[];
  images: SiteImages;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const nextLocale: Locale = locale === "en" ? "id" : "en";

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-4 sm:px-6">
        <Logo locale={locale} logo={images.logo} logoLight={images.logoLight} />
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((link) => {
            const href = localizedPath(locale, link.href);
            const active =
              link.href === "/"
                ? pathname === href
                : pathname.startsWith(href);
            return (
              <Link
                key={`${link.href}-${link.en}`}
                href={href}
                className={`text-sm font-medium transition-colors ${
                  active ? "text-orange" : "text-ink hover:text-orange"
                }`}
              >
                {locale === "id" ? link.id : link.en}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href={switchLocale(pathname, nextLocale)}
            className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-sm text-ink hover:border-orange hover:text-orange"
          >
            <IconGlobe className="h-4 w-4" />
            <span>{copy.language}</span>
          </Link>
          <ThemeToggle lightLabel={copy.theme.light} darkLabel={copy.theme.dark} />
          <button
            type="button"
            className="text-ink md:hidden"
            aria-label="Menu"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <IconClose className="h-6 w-6" /> : <IconMenu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      {open ? (
        <nav className="border-t border-line bg-background px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {navItems.map((link) => (
              <Link
                key={`${link.href}-${link.en}`}
                href={localizedPath(locale, link.href)}
                className="text-base font-medium text-ink"
                onClick={() => setOpen(false)}
              >
                {locale === "id" ? link.id : link.en}
              </Link>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
