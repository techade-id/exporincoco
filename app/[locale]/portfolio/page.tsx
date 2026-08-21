import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CtaBanner } from "@/components/CtaBanner";
import { t } from "@/lib/i18n";
import { isLocale, localizedPath, type Locale } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return {
    title: t(locale).nav.portfolio,
    alternates: { canonical: localizedPath(locale, "/portfolio") },
  };
}

const gallery = [
  { src: "/images/production.jpg", titleEn: "Production & packing", titleId: "Produksi & packing" },
  { src: "/images/kiln.jpg", titleEn: "Carbonization", titleId: "Karbonisasi" },
  { src: "/images/shipment.jpg", titleEn: "Port & stuffing", titleId: "Pelabuhan & stuffing" },
  { src: "/images/ship.jpg", titleEn: "Sea-route export", titleId: "Ekspor jalur laut" },
  { src: "/images/containers.jpg", titleEn: "Container handling", titleId: "Penanganan kontainer" },
  { src: "/images/clients.jpg", titleEn: "Buyer meetings", titleId: "Pertemuan pembeli" },
];

export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const copy = t(locale);

  return (
    <>
      <section className="bg-charcoal px-4 py-16 text-white sm:px-6">
        <div className="mx-auto max-w-6xl">
          <p className="section-kicker text-xs font-semibold uppercase text-orange">{copy.portfolio.kicker}</p>
          <h1 className="mt-2 text-4xl font-bold">{copy.portfolio.title}</h1>
        </div>
      </section>
      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-3">
        {gallery.map((item) => (
          <figure key={item.src} className="overflow-hidden rounded-xl bg-surface">
            <div className="relative aspect-[4/3]">
              <Image src={item.src} alt={locale === "id" ? item.titleId : item.titleEn} fill className="object-cover" sizes="33vw" />
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
