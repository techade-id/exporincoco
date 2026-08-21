import type { MetadataRoute } from "next";
import { posts } from "@/lib/blog";
import { products } from "@/lib/products";
import { locales } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://eksporincoco.vercel.app";
  const paths = [
    "",
    "/about",
    "/products",
    "/portfolio",
    "/blog",
    "/contact",
    ...products.map((product) => `/products/${product.slug}`),
    ...posts.map((post) => `/blog/${post.slug}`),
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
