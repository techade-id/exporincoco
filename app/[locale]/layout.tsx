import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { getContent } from "@/lib/content";
import { isLocale, locales, type Locale } from "@/lib/site";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const dynamic = "force-dynamic";
export const dynamicParams = false;

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const content = await getContent();
  const copy = content.dictionary[locale as Locale];

  return (
    <>
      <Header
        locale={locale as Locale}
        copy={copy}
        navItems={content.navItems}
        images={content.images}
      />
      <main className="flex-1">{children}</main>
      <Footer
        locale={locale as Locale}
        copy={copy}
        site={content.site}
        products={content.products}
        countries={content.inquiryCountries}
        images={content.images}
      />
      <WhatsAppButton
        label={copy.wa.label}
        choose={copy.wa.choose}
        message={copy.wa.defaultMessage}
        numbers={content.site.whatsappNumbers}
      />
    </>
  );
}
