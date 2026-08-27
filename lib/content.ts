import { cache } from "react";
import { promises as fs } from "fs";
import path from "path";
import { posts as seedPosts } from "@/lib/blog";
import { dictionary as seedDictionary } from "@/lib/i18n";
import { products as seedProducts } from "@/lib/products";
import { inquiryCountries as seedCountries, markets as seedMarkets, site as seedSite } from "@/lib/site";
import type { Content, MarketItem, ProductItem, PostItem, SiteInfo } from "@/lib/content-types";

export type {
  Content,
  GalleryItem,
  LocaleCopy,
  MarketItem,
  NavItem,
  PostItem,
  ProductItem,
  SiteImages,
  SiteInfo,
} from "@/lib/content-types";
export { slugify } from "@/lib/content-types";

const CONTENT_FILE = path.join(process.cwd(), "data", "content.json");
const RUNTIME_FILE = path.join("/tmp", "eksporin-content.json");

export function defaultContent(): Content {
  return {
    site: structuredClone(seedSite) as unknown as SiteInfo,
    navItems: [
      { href: "/", en: seedDictionary.en.nav.home, id: seedDictionary.id.nav.home },
      { href: "/about", en: seedDictionary.en.nav.about, id: seedDictionary.id.nav.about },
      { href: "/products", en: seedDictionary.en.nav.products, id: seedDictionary.id.nav.products },
      { href: "/blog", en: seedDictionary.en.nav.blog, id: seedDictionary.id.nav.blog },
      { href: "/contact", en: seedDictionary.en.nav.contact, id: seedDictionary.id.nav.contact },
    ],
    images: {
      logo: "/images/logo.png",
      logoLight: "/images/logo-light.png",
      hero: "/images/hero.jpg",
      homeAbout: "/images/containers.jpg",
      aboutHero: "/images/about-hero.jpg",
      about: "/images/containers.jpg",
      footerMap: "/images/ship.jpg",
    },
    dictionary: structuredClone(seedDictionary) as unknown as Content["dictionary"],
    products: structuredClone(seedProducts) as unknown as ProductItem[],
    posts: structuredClone(seedPosts) as unknown as PostItem[],
    markets: structuredClone(seedMarkets) as unknown as MarketItem[],
    inquiryCountries: [...seedCountries],
    portfolioPreviewImages: ["/images/production.jpg", "/images/shipment.jpg", "/images/clients.jpg"],
    portfolioGallery: [
      { src: "/images/production.jpg", titleEn: "Production & packing", titleId: "Produksi & packing" },
      { src: "/images/kiln.jpg", titleEn: "Carbonization", titleId: "Karbonisasi" },
      { src: "/images/shipment.jpg", titleEn: "Port & stuffing", titleId: "Pelabuhan & stuffing" },
      { src: "/images/ship.jpg", titleEn: "Sea-route export", titleId: "Ekspor jalur laut" },
      { src: "/images/containers.jpg", titleEn: "Container handling", titleId: "Penanganan kontainer" },
      { src: "/images/clients.jpg", titleEn: "Buyer meetings", titleId: "Pertemuan pembeli" },
    ],
  };
}

function mergeContent(stored: Partial<Content> | null): Content {
  const base = defaultContent();
  if (!stored) return base;
  return {
    ...base,
    ...stored,
    site: { ...base.site, ...stored.site, address: { ...base.site.address, ...stored.site?.address }, social: { ...base.site.social, ...stored.site?.social }, whatsappNumbers: stored.site?.whatsappNumbers ?? base.site.whatsappNumbers },
    images: { ...base.images, ...stored.images },
    dictionary: {
      en: { ...base.dictionary.en, ...stored.dictionary?.en },
      id: { ...base.dictionary.id, ...stored.dictionary?.id },
    },
    navItems: stored.navItems?.length ? stored.navItems : base.navItems,
    products: stored.products?.length ? stored.products : base.products,
    posts: stored.posts ?? base.posts,
    markets: stored.markets?.length ? stored.markets : base.markets,
    inquiryCountries: stored.inquiryCountries?.length ? stored.inquiryCountries : base.inquiryCountries,
    portfolioPreviewImages: stored.portfolioPreviewImages?.length ? stored.portfolioPreviewImages : base.portfolioPreviewImages,
    portfolioGallery: stored.portfolioGallery?.length ? stored.portfolioGallery : base.portfolioGallery,
  };
}

function githubConfig() {
  const token = process.env.GITHUB_TOKEN?.trim();
  if (!token) return null;
  return {
    token,
    repo: process.env.GITHUB_REPO?.trim() || "techade-id/exporincoco",
    branch: process.env.GITHUB_BRANCH?.trim() || "main",
  };
}

async function githubGetFile(filePath: string): Promise<{ text: string; sha: string } | null> {
  const github = githubConfig();
  if (!github) return null;
  const response = await fetch(
    `https://api.github.com/repos/${github.repo}/contents/${filePath}?ref=${github.branch}`,
    {
      headers: {
        Authorization: `Bearer ${github.token}`,
        Accept: "application/vnd.github+json",
        "User-Agent": "eksporin-coco-admin",
      },
      cache: "no-store",
    },
  );
  if (!response.ok) return null;
  const data = (await response.json()) as { content?: string; sha?: string };
  if (!data.content || !data.sha) return null;
  return { text: Buffer.from(data.content, "base64").toString("utf8"), sha: data.sha };
}

export async function githubPutFile(filePath: string, bytes: Buffer, message: string) {
  const github = githubConfig();
  if (!github) return false;
  const current = await githubGetFile(filePath);
  const response = await fetch(`https://api.github.com/repos/${github.repo}/contents/${filePath}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${github.token}`,
      Accept: "application/vnd.github+json",
      "User-Agent": "eksporin-coco-admin",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message,
      content: bytes.toString("base64"),
      branch: github.branch,
      sha: current?.sha,
    }),
  });
  return response.ok;
}

async function readJsonFile(filePath: string): Promise<Partial<Content> | null> {
  try {
    const raw = await fs.readFile(filePath, "utf8");
    return JSON.parse(raw) as Partial<Content>;
  } catch {
    return null;
  }
}

async function writeJsonFile(filePath: string, content: Content) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(content, null, 2), "utf8");
}

export function persistMode() {
  if (githubConfig()) return "github" as const;
  return "file" as const;
}

export const getContent = cache(async function getContent(): Promise<Content> {
  if (githubConfig()) {
    const remote = await githubGetFile("data/content.json");
    if (remote) return mergeContent(JSON.parse(remote.text) as Partial<Content>);
  }
  const runtime = await readJsonFile(RUNTIME_FILE);
  if (runtime) return mergeContent(runtime);
  const stored = await readJsonFile(CONTENT_FILE);
  return mergeContent(stored);
});

export async function saveContent(next: Content) {
  const content = mergeContent(next);
  await writeJsonFile(RUNTIME_FILE, content).catch(() => undefined);
  await writeJsonFile(CONTENT_FILE, content).catch(() => undefined);
  if (githubConfig()) {
    const ok = await githubPutFile(
      "data/content.json",
      Buffer.from(JSON.stringify(content, null, 2), "utf8"),
      "Update site content from editorial",
    );
    if (!ok) throw new Error("Could not save content to GitHub. Check GITHUB_TOKEN.");
  }
  return content;
}
