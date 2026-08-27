import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { getContent } from "@/lib/content";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const { site } = await getContent();
  return {
    metadataBase: new URL("https://eksporincoco.com"),
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
    icons: {
      icon: [
        { url: "/icon.png?v=3", type: "image/png", sizes: "512x512" },
        { url: "/favicon.ico?v=3", type: "image/x-icon" },
      ],
      apple: [{ url: "/apple-icon.png?v=3" }],
    },
    openGraph: {
      title: `${site.name} | Indonesian Coconut Charcoal Exporter`,
      description:
        "Trusted Indonesian exporter of coconut charcoal briquettes and coconut-based products.",
      siteName: site.name,
      locale: "en_US",
      type: "website",
    },
  };
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${plusJakarta.variable} dark h-full antialiased`} suppressHydrationWarning>
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        <Script id="theme-init" strategy="beforeInteractive">
          {`(function(){try{var t=localStorage.getItem("theme");if(t==="light")document.documentElement.classList.remove("dark");else document.documentElement.classList.add("dark");}catch(e){document.documentElement.classList.add("dark");}})();`}
        </Script>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
