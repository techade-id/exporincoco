import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBanner } from "@/components/CtaBanner";
import { IconPdf } from "@/components/icons";
import { t } from "@/lib/i18n";
import { getProduct, products, relatedProducts } from "@/lib/products";
import { isLocale, locales, localizedPath, type Locale } from "@/lib/site";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    products.map((product) => ({ locale, slug: product.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = getProduct(slug);
  if (!isLocale(locale) || !product) return {};
  return {
    title: product[locale].name,
    description: product[locale].short,
    alternates: { canonical: localizedPath(locale, `/products/${slug}`) },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const product = getProduct(slug);
  if (!product) notFound();
  const locale = raw as Locale;
  const copy = t(locale);
  const related = relatedProducts(product.slug);

  return (
    <>
      <section className="bg-charcoal px-4 py-20 text-center text-white sm:px-6">
        <h1 className="text-4xl font-bold sm:text-5xl">{product[locale].name}</h1>
        <p className="mx-auto mt-4 max-w-2xl text-white/70">{product[locale].short}</p>
      </section>

      <section className="mx-auto grid max-w-6xl items-start gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2">
        <div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image
              src={product.image}
              alt={product[locale].name}
              fill
              className="object-cover"
              sizes="50vw"
              priority
            />
          </div>
          <p className="mt-3 rounded-md bg-charcoal px-4 py-2 text-center text-sm font-medium text-white">
            {product[locale].name}
          </p>
        </div>
        <div>
          <p className="text-muted leading-7">{product[locale].description}</p>
          <h2 className="mt-10 text-2xl font-semibold">{copy.products.specs}</h2>
          <ul className="mt-4 divide-y divide-line border-y border-line">
            {product.specs.map((spec) => (
              <li key={spec.label} className="grid grid-cols-[160px_1fr] gap-4 py-3 text-sm">
                <span className="font-medium">{spec.label}</span>
                <span className="text-muted">{spec.value}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-muted">{copy.specNote}</p>
        </div>
      </section>

      <section className="bg-surface">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex items-center gap-3">
            <IconPdf className="h-8 w-8 text-orange" />
            <div>
              <p className="font-semibold">{copy.products.downloadTitle}</p>
              <p className="text-sm text-muted">{copy.products.downloadText}</p>
            </div>
          </div>
          <Link
            href={localizedPath(locale, `/products/${product.slug}/spec`)}
            className="rounded-md bg-orange px-5 py-3 text-sm font-semibold text-white hover:bg-orange-dark"
          >
            {copy.products.downloadCta}
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="text-2xl font-semibold">{copy.products.related}</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {related.map((item) => (
            <article key={item.slug} className="overflow-hidden rounded-xl border border-line">
              <div className="relative aspect-[16/10]">
                <Image src={item.image} alt={item[locale].name} fill className="object-cover" sizes="33vw" />
              </div>
              <div className="p-5">
                <h3 className="font-semibold">{item[locale].name}</h3>
                <p className="mt-2 text-sm text-muted">{item[locale].short}</p>
                <Link
                  href={localizedPath(locale, `/products/${item.slug}`)}
                  className="mt-4 inline-block text-sm font-semibold text-orange"
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
