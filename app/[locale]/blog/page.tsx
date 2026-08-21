import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { posts } from "@/lib/blog";
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
    title: t(locale).nav.blog,
    alternates: { canonical: localizedPath(locale, "/blog") },
  };
}

export default async function BlogPage({
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
          <h1 className="text-4xl font-bold">{copy.blog.title}</h1>
        </div>
      </section>
      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <article key={post.slug} className="overflow-hidden rounded-xl border border-line">
            <div className="relative aspect-[16/10]">
              <Image src={post.image} alt={post[locale].title} fill className="object-cover" sizes="33vw" />
            </div>
            <div className="p-5">
              <h2 className="text-lg font-semibold">{post[locale].title}</h2>
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
      </section>
    </>
  );
}
