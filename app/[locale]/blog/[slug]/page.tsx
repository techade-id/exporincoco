import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CtaBanner } from "@/components/CtaBanner";
import { MediaImage } from "@/components/MediaImage";
import { getContent } from "@/lib/content";
import { isLocale, localizedPath, type Locale } from "@/lib/site";

export const dynamicParams = true;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const content = await getContent();
  const post = content.posts.find((item) => item.slug === slug);
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
  const content = await getContent();
  const post = content.posts.find((item) => item.slug === slug);
  if (!post) notFound();
  const locale = raw as Locale;
  const copy = content.dictionary[locale];

  return (
    <>
      <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <p className="text-xs text-muted">
          {copy.blog.author} {post.author} · {post.date}
        </p>
        <h1 className="mt-3 text-4xl font-bold leading-tight">{post[locale].title}</h1>
        <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl">
          <MediaImage src={post.image} alt={post[locale].title} fill className="object-cover" sizes="768px" priority />
        </div>
        <div className="mt-8 space-y-5 text-[17px] leading-8 text-muted">
          {post[locale].body.map((paragraph, index) => (
            <p key={`${index}-${paragraph.slice(0, 24)}`}>{paragraph}</p>
          ))}
        </div>
      </article>
      <CtaBanner locale={locale} />
    </>
  );
}
