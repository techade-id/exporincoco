import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CtaBanner } from "@/components/CtaBanner";
import { MediaImage } from "@/components/MediaImage";
import { getContent } from "@/lib/content";
import { isLocale, localizedPath, type Locale } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const content = await getContent();
  return {
    title: content.dictionary[locale].nav.portfolio,
    alternates: { canonical: localizedPath(locale, "/portfolio") },
  };
}

export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const content = await getContent();
  const copy = content.dictionary[locale];

  return (
    <>
      <section className="bg-band px-4 py-16 text-white sm:px-6">
        <div className="mx-auto max-w-6xl">
          <p className="section-kicker text-xs font-semibold uppercase text-orange">{copy.portfolio.kicker}</p>
          <h1 className="mt-2 text-4xl font-bold">{copy.portfolio.title}</h1>
        </div>
      </section>
      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-3">
        {content.portfolioGallery.map((item) => (
          <figure key={`${item.src}-${item.titleEn}`} className="overflow-hidden rounded-xl bg-surface">
            <div className="relative aspect-[4/3]">
              <MediaImage src={item.src} alt={locale === "id" ? item.titleId : item.titleEn} fill className="object-cover" sizes="33vw" />
            </div>
            <figcaption className="px-4 py-3 text-sm font-medium">
              {locale === "id" ? item.titleId : item.titleEn}
            </figcaption>
          </figure>
        ))}
      </section>
      <CtaBanner locale={locale} />
    </>
  );
}
