import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://eksporincoco.vercel.app"),
  title: {
    default: `${site.name} | Indonesian Coconut Charcoal Exporter`,
    template: `%s | ${site.name}`,
  },
  description:
    "Eksporin Coco, powered by PT Ekspor Indonesia Aja, is an Indonesian supplier and exporter of coconut charcoal briquettes, copra, coconut oil, coconut shell charcoal, and wood charcoal.",
  keywords: [
    "Indonesia charcoal briquette exporter",
    "coconut charcoal briquettes",
    "coconut shell charcoal",
    "copra exporter Indonesia",
    "Eksporin Coco",
    "PT Ekspor Indonesia Aja",
  ],
  openGraph: {
    title: `${site.name} | Indonesian Coconut Charcoal Exporter`,
    description:
      "Trusted Indonesian exporter of coconut charcoal briquettes and coconut-based products.",
    siteName: site.name,
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${plusJakarta.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-white font-sans text-foreground">{children}</body>
    </html>
  );
}
