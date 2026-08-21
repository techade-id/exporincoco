import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CtaBanner } from "@/components/CtaBanner";
import { getPost, posts } from "@/lib/blog";
import { t } from "@/lib/i18n";
import { isLocale, locales, localizedPath, type Locale } from "@/lib/site";

export function generateStaticParams() {
  return locales.flatMap((locale) => posts.map((post) => ({ locale, slug: post.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPost(slug);
  if (!isLocale(locale) || !post) return {};
  return {
    title: post[locale].title,
    description: post[locale].excerpt,
    alternates: { canonical: localizedPath(locale, `/blog/${slug}`) },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const post = getPost(slug);
  if (!post) notFound();
  const locale = raw as Locale;
  const copy = t(locale);

  return (
    <>
      <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <p className="text-xs text-muted">
          {copy.blog.author} {post.author} · {post.date}
        </p>
        <h1 className="mt-3 text-4xl font-bold leading-tight">{post[locale].title}</h1>
        <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl">
          <Image src={post.image} alt={post[locale].title} fill className="object-cover" sizes="768px" priority />
        </div>
        <div className="mt-8 space-y-5 text-[17px] leading-8 text-muted">
          {post[locale].body.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </div>
      </article>
      <CtaBanner locale={locale} />
    </>
  );
}
