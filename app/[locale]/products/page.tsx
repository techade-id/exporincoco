import type { Metadata } from "next";
import Link from "next/link";
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
    title: content.dictionary[locale].nav.products,
    description:
      "Coconut charcoal briquettes, copra, coconut oil, coconut shell charcoal, and wood charcoal from Indonesia.",
    alternates: { canonical: localizedPath(locale, "/products") },
  };
}

export default async function ProductsPage({
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
          <h1 className="text-4xl font-bold">{copy.products.title}</h1>
          <p className="mt-3 max-w-2xl text-white/70">{copy.about.p2}</p>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-8">
          {content.products.map((product) => (
            <article
              key={product.slug}
              className="grid overflow-hidden rounded-2xl border border-line md:grid-cols-[280px_1fr]"
            >
              <div className="relative min-h-[220px]">
                <MediaImage
                  src={product.image}
                  alt={product[locale].name}
                  fill
                  className="object-cover"
                  sizes="280px"
                />
              </div>
              <div className="p-6 sm:p-8">
                <h2 className="text-2xl font-semibold">{product[locale].name}</h2>
                <p className="mt-3 text-muted">{product[locale].description}</p>
                <Link
                  href={localizedPath(locale, `/products/${product.slug}`)}
                  className="mt-5 inline-block text-sm font-semibold text-orange"
                >
                  {copy.products.view} →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
      <CtaBanner locale={locale} />
    </>
  );
}
