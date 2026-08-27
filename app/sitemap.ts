import type { MetadataRoute } from "next";
import { getContent } from "@/lib/content";
import { locales } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const content = await getContent();
  const base = "https://eksporincoco.com";
  const paths = [
    "",
    "/about",
    "/products",
    "/portfolio",
    "/blog",
    "/contact",
    ...content.products.map((product) => `/products/${product.slug}`),
    ...content.posts.map((post) => `/blog/${post.slug}`),
  ];

  return locales.flatMap((locale) =>
    paths.map((path) => ({
      url: `${base}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency: path === "" ? "weekly" : "monthly",
      priority: path === "" ? 1 : 0.7,
    })),
  );
}
