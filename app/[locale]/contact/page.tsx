import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InquiryForm } from "@/components/InquiryForm";
import { IconMail, IconPin, IconWhatsApp } from "@/components/icons";
import { t } from "@/lib/i18n";
import { isLocale, localizedPath, site, type Locale } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return {
    title: t(locale).nav.contact,
    alternates: { canonical: localizedPath(locale, "/contact") },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const copy = t(locale);
  const mapsSrc = `https://www.google.com/maps?q=${encodeURIComponent(site.address.mapsQuery)}&output=embed`;

  return (
    <>
      <section className="bg-band px-4 py-16 text-white sm:px-6">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-4xl font-bold">{copy.contact.title}</h1>
          <p className="mt-3 max-w-2xl text-white/70">{copy.contact.lead}</p>
        </div>
      </section>
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="flex gap-3">
            <IconPin className="mt-1 h-5 w-5 text-orange" />
            <div>
              <p className="font-semibold">{copy.contact.address}</p>
              <p className="mt-1 text-sm text-muted">
                {site.address.line1}
                <br />
                {site.address.line2}
                <br />
                {site.address.line3}
                <br />
                {site.address.country}
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <IconWhatsApp className="mt-1 h-5 w-5 text-orange" />
            <div>
              <p className="font-semibold">{copy.contact.whatsapp}</p>
              <a className="mt-1 block text-sm text-muted" href={`https://wa.me/${site.whatsapp}`}>
                {site.phoneDisplay}
              </a>
            </div>
          </div>
          <div className="flex gap-3">
            <IconMail className="mt-1 h-5 w-5 text-orange" />
            <div>
              <p className="font-semibold">{copy.contact.email}</p>
              <a className="mt-1 block text-sm text-muted" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </div>
          </div>
          <iframe
            title={copy.contact.mapTitle}
            src={mapsSrc}
            className="h-72 w-full rounded-xl border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div className="rounded-2xl bg-band p-6 sm:p-8">
          <h2 className="mb-5 text-xl font-semibold text-white">{copy.contact.formTitle}</h2>
          <InquiryForm locale={locale} />
        </div>
      </section>
    </>
  );
}
