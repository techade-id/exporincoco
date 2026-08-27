export type LocaleCopy = {
  nav: { home: string; about: string; products: string; portfolio: string; blog: string; contact: string };
  language: string;
  theme: { light: string; dark: string };
  hero: { title: string; requestQuote: string; contactUs: string };
  values: { title: string; text: string }[];
  about: { kicker: string; title: string; lead: string; p1: string; p2: string; p3: string };
  products: {
    title: string;
    view: string;
    related: string;
    specs: string;
    downloadTitle: string;
    downloadText: string;
    downloadCta: string;
  };
  portfolio: { kicker: string; title: string; view: string; items: { title: string; text: string }[] };
  markets: { title: string };
  testimonials: { title: string; items: { quote: string; name: string; role: string; country: string }[] };
  blog: { title: string; readMore: string; author: string };
  cta: { kicker: string; title: string; text: string; button: string };
  mission: {
    title: string;
    visionTitle: string;
    vision: string;
    missionTitle: string;
    mission: string;
    valuesTitle: string;
    values: { title: string; text: string }[];
  };
  network: { title: string; text: string; points: string[] };
  contact: {
    title: string;
    lead: string;
    address: string;
    whatsapp: string;
    email: string;
    follow: string;
    formTitle: string;
    name: string;
    company: string;
    country: string;
    countryPlaceholder: string;
    emailField: string;
    product: string;
    productPlaceholder: string;
    phone: string;
    message: string;
    captcha: string;
    submit: string;
    sending: string;
    success: string;
    error: string;
    openWhatsApp: string;
    mapTitle: string;
  };
  footer: { inquiry: string };
  wa: { label: string; choose: string; defaultMessage: string };
  specNote: string;
};

export type SiteInfo = {
  name: string;
  legalName: string;
  brand: string;
  email: string;
  phoneDisplay: string;
  phoneTel: string;
  whatsapp: string;
  whatsappNumbers: { display: string; wa: string }[];
  address: { line1: string; line2: string; line3: string; country: string; mapsQuery: string };
  social: { instagram: string; facebook: string; linkedin: string; tiktok: string };
};

export type ProductItem = {
  slug: string;
  image: string;
  specs: { label: string; value: string }[];
  en: { name: string; short: string; description: string };
  id: { name: string; short: string; description: string };
};

export type PostItem = {
  slug: string;
  image: string;
  date: string;
  author: string;
  en: { title: string; excerpt: string; body: string[] };
  id: { title: string; excerpt: string; body: string[] };
};

export type NavItem = {
  href: string;
  en: string;
  id: string;
};

export type MarketItem = {
  code: string;
  name: string;
  nameId: string;
  flag: string;
};

export type GalleryItem = {
  src: string;
  titleEn: string;
  titleId: string;
};

export type SiteImages = {
  logo: string;
  logoLight: string;
  hero: string;
  homeAbout: string;
  aboutHero: string;
  about: string;
  footerMap: string;
};

export type Content = {
  site: SiteInfo;
  navItems: NavItem[];
  images: SiteImages;
  dictionary: { en: LocaleCopy; id: LocaleCopy };
  products: ProductItem[];
  posts: PostItem[];
  markets: MarketItem[];
  inquiryCountries: string[];
  portfolioPreviewImages: string[];
  portfolioGallery: GalleryItem[];
};

export function slugify(value: string) {
  const slug = value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return slug || `item-${Date.now()}`;
}
