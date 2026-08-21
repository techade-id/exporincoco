export const locales = ["en", "id"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const site = {
  name: "Eksporin Coco",
  legalName: "PT Ekspor Indonesia Aja",
  brand: "Eksporin Coco",
  email: "eksporinaja@gmail.com",
  phoneDisplay: "0823-2226-0278",
  phoneTel: "+6282322260278",
  whatsapp: "6282322260278",
  address: {
    line1: "RT.03/RW.03, Jl. Jajar Sari, Desa Dukuhturi",
    line2: "Kelurahan Kepandean, Kec. Dukuhturi",
    line3: "Kabupaten Tegal, Jawa Tengah 52192",
    country: "Indonesia",
    mapsQuery:
      "Jl. Jajar Sari, Dukuhturi, Kabupaten Tegal, Jawa Tengah 52192",
  },
  social: {
    instagram: "https://www.instagram.com/",
    facebook: "https://www.facebook.com/",
    linkedin: "https://www.linkedin.com/",
    tiktok: "https://www.tiktok.com/",
  },
} as const;

export const markets = [
  { code: "IN", name: "India", nameId: "India", flag: "🇮🇳" },
  { code: "VN", name: "Vietnam", nameId: "Vietnam", flag: "🇻🇳" },
  { code: "KR", name: "South Korea", nameId: "Korea Selatan", flag: "🇰🇷" },
  { code: "TH", name: "Thailand", nameId: "Thailand", flag: "🇹🇭" },
  { code: "CA", name: "Canada", nameId: "Kanada", flag: "🇨🇦" },
  { code: "SG", name: "Singapore", nameId: "Singapura", flag: "🇸🇬" },
] as const;

export const inquiryCountries = [
  "India",
  "Vietnam",
  "South Korea",
  "Thailand",
  "Canada",
  "Singapore",
  "United Arab Emirates",
  "Saudi Arabia",
  "United States",
  "Japan",
  "Malaysia",
  "Germany",
  "China",
  "Other",
] as const;

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function localizedPath(locale: Locale, path = "/") {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${clean === "/" ? "" : clean}`;
}

export function whatsappUrl(message?: string) {
  const base = `https://wa.me/${site.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
