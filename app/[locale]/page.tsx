import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBanner } from "@/components/CtaBanner";
import {
  IconQuote,
  IconShield,
  IconShip,
  IconTag,
  IconTruck,
} from "@/components/icons";
import { posts } from "@/lib/blog";
import { t } from "@/lib/i18n";
import { products } from "@/lib/products";
import { isLocale, localizedPath, markets, site, type Locale } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return {
    title: "Home",
    description: t(locale).hero.title,
    alternates: {
      canonical: localizedPath(locale),
      languages: { en: "/en", id: "/id" },
    },
  };
}

const valueIcons = [IconShip, IconShield, IconTruck, IconTag];
const portfolioImages = [
  "/images/production.jpg",
  "/images/shipment.jpg",
  "/images/clients.jpg",
];

export default async function HomePage({
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
      <section className="relative isolate min-h-[78vh] overflow-hidden">
        <Image
          src="/images/hero.jpg"
          alt="Glowing coconut charcoal briquettes"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="hero-overlay absolute inset-0" />
        <div className="relative mx-auto flex min-h-[78vh] max-w-6xl flex-col justify-center px-4 py-24 sm:px-6">
          <h1 className="max-w-3xl text-4xl font-bold leading-tight text-orange sm:text-5xl lg:text-6xl">
            {copy.hero.title}
          </h1>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href={localizedPath(locale, "/contact")}
              className="rounded-md bg-orange px-6 py-3 text-sm font-semibold text-white hover:bg-orange-dark"
            >
              {copy.hero.requestQuote}
            </Link>
            <Link
              href={localizedPath(locale, "/contact")}
              className="rounded-md border border-white px-6 py-3 text-sm font-semibold text-white hover:bg-white hover:text-charcoal"
            >
              {copy.hero.contactUs}
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-surface">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
          {copy.values.map((value, index) => {
            const Icon = valueIcons[index];
            return (
              <div key={value.title} className="flex gap-3">
                <Icon className="mt-0.5 h-8 w-8 shrink-0 text-orange" />
                <div>
                  <h3 className="font-semibold text-charcoal">{value.title}</h3>
                  <p className="mt-1 text-sm text-muted">{value.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2">
        <div>
          <p className="section-kicker text-xs font-semibold uppercase text-orange">{copy.about.kicker}</p>
          <h2 className="mt-2 text-3xl font-semibold text-charcoal">{copy.about.title}</h2>
          <p className="mt-4 text-muted">{copy.about.p1}</p>
          <p className="mt-3 text-muted">{copy.about.p2}</p>
          <Link
            href={localizedPath(locale, "/about")}
            className="mt-6 inline-block text-sm font-semibold text-orange"
          >
            {copy.nav.about} →
          </Link>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
          <Image
            src="/images/containers.jpg"
            alt="Export containers ready for shipment"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </section>

      <section className="bg-white px-4 py-8 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-semibold text-orange">{copy.products.title}</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <Link
                key={product.slug}
                href={localizedPath(locale, `/products/${product.slug}`)}
                className="group relative block aspect-[4/3] overflow-hidden rounded-xl"
              >
                <Image
                  src={product.image}
                  alt={product[locale].name}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-x-0 bottom-0 bg-white/90 px-4 py-3 text-sm font-semibold text-charcoal">
                  {product[locale].name}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <p className="section-kicker text-center text-xs font-semibold uppercase text-orange">
          {copy.portfolio.kicker}
        </p>
        <h2 className="mt-2 text-center text-3xl font-semibold text-charcoal">{copy.portfolio.title}</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {copy.portfolio.items.map((item, index) => (
            <article key={item.title} className="overflow-hidden rounded-xl bg-surface">
              <div className="relative aspect-[16/10]">
                <Image src={portfolioImages[index]} alt={item.title} fill className="object-cover" sizes="33vw" />
              </div>
              <div className="p-5">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-muted">{item.text}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link
            href={localizedPath(locale, "/portfolio")}
            className="inline-flex rounded-md bg-orange px-6 py-3 text-sm font-semibold text-white hover:bg-orange-dark"
          >
            {copy.portfolio.view} →
          </Link>
        </div>
      </section>

      <section className="bg-surface px-4 py-14 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-3xl font-semibold text-charcoal">{copy.markets.title}</h2>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {markets.map((market) => (
              <div key={market.code} className="rounded-xl bg-white px-3 py-5 text-center shadow-sm">
                <div className="text-3xl">{market.flag}</div>
                <p className="mt-2 text-sm font-medium">{locale === "id" ? market.nameId : market.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="text-3xl font-semibold text-orange">{copy.testimonials.title}</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {copy.testimonials.items.map((item) => (
            <article key={item.name} className="rounded-xl border border-line p-6">
              <IconQuote className="h-7 w-7 text-orange" />
              <p className="mt-4 text-sm leading-6 text-muted">“{item.quote}”</p>
              <div className="mt-5 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-orange text-xs font-bold text-white">
                  {item.name.slice(0, 1)}
                </span>
                <div>
                  <p className="text-sm font-semibold">{item.name}</p>
                  <p className="text-xs text-muted">
                    {item.role} · {item.country}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white px-4 pb-8 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-semibold text-orange">{copy.blog.title}</h2>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            {posts.slice(0, 2).map((post) => (
              <article key={post.slug} className="overflow-hidden rounded-xl border border-line">
                <div className="relative aspect-[16/9]">
                  <Image src={post.image} alt={post[locale].title} fill className="object-cover" sizes="50vw" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold">{post[locale].title}</h3>
                  <p className="mt-2 text-xs text-muted">
                    {copy.blog.author} {post.author} · {post.date}
                  </p>
                  <p className="mt-3 text-sm text-muted">{post[locale].excerpt}</p>
                  <Link
                    href={localizedPath(locale, `/blog/${post.slug}`)}
                    className="mt-4 inline-block text-sm font-semibold text-orange"
                  >
                    {copy.blog.readMore} →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner locale={locale} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: site.name,
            legalName: site.legalName,
            email: site.email,
            telephone: site.phoneTel,
            address: {
              "@type": "PostalAddress",
              streetAddress: `${site.address.line1}, ${site.address.line2}`,
              addressLocality: "Tegal",
              addressRegion: "Jawa Tengah",
              postalCode: "52192",
              addressCountry: "ID",
            },
          }),
        }}
      />
    </>
  );
}
