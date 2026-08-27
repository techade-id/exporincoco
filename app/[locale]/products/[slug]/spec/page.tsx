import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PrintButton } from "@/components/PrintButton";
import { t } from "@/lib/i18n";
import { getProduct, products } from "@/lib/products";
import { isLocale, locales, site, type Locale } from "@/lib/site";

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
  return { title: `${product[locale].name} spec sheet` };
}

export default async function SpecSheetPage({
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

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <p className="text-sm font-semibold text-orange">{site.name}</p>
      <h1 className="mt-2 text-3xl font-bold">{product[locale].name}</h1>
      <p className="mt-3 text-muted">{product[locale].description}</p>
      <h2 className="mt-10 text-xl font-semibold">{copy.products.specs}</h2>
      <table className="mt-4 w-full border-collapse text-sm">
        <tbody>
          {product.specs.map((spec) => (
            <tr key={spec.label} className="border-b border-line">
              <th className="py-3 pr-6 text-left font-medium">{spec.label}</th>
              <td className="py-3 text-muted">{spec.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-6 text-xs text-muted">{copy.specNote}</p>
      <p className="mt-8 text-sm">
        {site.email} · {site.whatsappNumbers.map((number) => number.display).join(" · ")}
      </p>
      <PrintButton label={copy.products.downloadCta} />
    </article>
  );
}
