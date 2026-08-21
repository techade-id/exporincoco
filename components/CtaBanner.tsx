import Link from "next/link";
import { IconHeadset } from "@/components/icons";
import { t } from "@/lib/i18n";
import { localizedPath, type Locale } from "@/lib/site";

export function CtaBanner({ locale }: { locale: Locale }) {
  const copy = t(locale);
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="flex flex-col items-start gap-6 rounded-2xl bg-surface px-6 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-10">
        <div className="flex items-start gap-4">
          <span className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-orange sm:flex">
            <IconHeadset className="h-6 w-6" />
          </span>
          <div>
            <p className="section-kicker text-xs font-semibold uppercase text-muted">{copy.cta.kicker}</p>
            <h2 className="mt-1 text-2xl font-semibold text-charcoal sm:text-3xl">{copy.cta.title}</h2>
            <p className="mt-2 max-w-xl text-sm text-muted">{copy.cta.text}</p>
          </div>
        </div>
        <Link
          href={localizedPath(locale, "/contact")}
          className="rounded-md bg-white px-6 py-3 text-sm font-semibold text-charcoal shadow-sm ring-1 ring-line transition hover:bg-orange hover:text-white hover:ring-orange"
        >
          {copy.cta.button}
        </Link>
      </div>
    </section>
  );
}
