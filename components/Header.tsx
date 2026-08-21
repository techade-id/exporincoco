"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Logo } from "@/components/Logo";
import { IconClose, IconGlobe, IconMenu } from "@/components/icons";
import { t } from "@/lib/i18n";
import { localizedPath, type Locale } from "@/lib/site";

const links = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "products", href: "/products" },
  { key: "blog", href: "/blog" },
  { key: "contact", href: "/contact" },
] as const;

function switchLocale(pathname: string, next: Locale) {
  const parts = pathname.split("/");
  if (parts[1] === "en" || parts[1] === "id") {
    parts[1] = next;
    return parts.join("/") || `/${next}`;
  }
  return `/${next}`;
}

export function Header({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const copy = t(locale);
  const nextLocale: Locale = locale === "en" ? "id" : "en";

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-4 sm:px-6">
        <Logo locale={locale} />
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => {
            const href = localizedPath(locale, link.href);
            const active =
              link.href === "/"
                ? pathname === href
                : pathname.startsWith(href);
            return (
              <Link
                key={link.key}
                href={href}
                className={`text-sm font-medium transition-colors ${
                  active ? "text-orange" : "text-charcoal hover:text-orange"
                }`}
              >
                {copy.nav[link.key]}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href={switchLocale(pathname, nextLocale)}
            className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-sm text-charcoal hover:border-orange hover:text-orange"
          >
            <IconGlobe className="h-4 w-4" />
            <span>{copy.language}</span>
          </Link>
          <button
            type="button"
            className="md:hidden"
            aria-label="Menu"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <IconClose className="h-6 w-6" /> : <IconMenu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      {open ? (
        <nav className="border-t border-line bg-white px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {links.map((link) => (
              <Link
                key={link.key}
                href={localizedPath(locale, link.href)}
                className="text-base font-medium text-charcoal"
                onClick={() => setOpen(false)}
              >
                {copy.nav[link.key]}
              </Link>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
