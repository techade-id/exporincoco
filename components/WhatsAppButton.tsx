"use client";

import { useEffect, useRef, useState } from "react";
import { IconWhatsApp } from "@/components/icons";
import { whatsappLinks } from "@/lib/site";

export function WhatsAppButton({
  label,
  choose,
  message,
  numbers,
}: {
  label: string;
  choose: string;
  message: string;
  numbers: { display: string; wa: string }[];
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const links = whatsappLinks(message, numbers);

  useEffect(() => {
    function onPointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);

  return (
    <div ref={rootRef} className="no-print fixed right-4 bottom-4 z-50 flex flex-col items-end">
      {open ? (
        <div className="mb-3 w-56 overflow-hidden rounded-2xl bg-white text-neutral-900 shadow-xl ring-1 ring-black/10 dark:bg-card dark:text-ink dark:ring-white/10">
          <p className="border-b border-line px-4 py-2 text-xs font-medium text-muted">
            {choose}
          </p>
          <div className="flex flex-col">
            {links.map((link) => (
              <a
                key={link.wa}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-sm font-medium transition hover:bg-surface"
              >
                <IconWhatsApp className="h-5 w-5 shrink-0 text-[#25D366]" />
                {link.display}
              </a>
            ))}
          </div>
        </div>
      ) : null}
      <button
        type="button"
        aria-label={label}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-105"
      >
        <IconWhatsApp className="block h-8 w-8 shrink-0" />
      </button>
    </div>
  );
}
