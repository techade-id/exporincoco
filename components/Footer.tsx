import Image from "next/image";
import { InquiryForm } from "@/components/InquiryForm";
import { Logo } from "@/components/Logo";
import { IconMail, IconPin, IconWhatsApp } from "@/components/icons";
import { t } from "@/lib/i18n";
import { site, type Locale } from "@/lib/site";

export function Footer({ locale }: { locale: Locale }) {
  const copy = t(locale);
  const mapsSrc = `https://www.google.com/maps?q=${encodeURIComponent(site.address.mapsQuery)}&output=embed`;

  return (
    <footer className="bg-charcoal text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_1.1fr_1fr]">
        <div className="space-y-5">
          <Logo locale={locale} light />
          <div className="space-y-3 text-sm text-white/75">
            <p className="flex gap-3">
              <IconPin className="mt-0.5 h-5 w-5 shrink-0 text-orange" />
              <span>
                {site.address.line1}, {site.address.line2}, {site.address.line3}, {site.address.country}
              </span>
            </p>
            <p className="flex items-center gap-3">
              <IconWhatsApp className="h-5 w-5 text-orange" />
              <a href={`https://wa.me/${site.whatsapp}`}>{site.phoneDisplay}</a>
            </p>
            <p className="flex items-center gap-3">
              <IconMail className="h-5 w-5 text-orange" />
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </p>
          </div>
          <div>
            <p className="mb-3 text-sm font-medium">{copy.contact.follow}</p>
            <div className="flex gap-3 text-xs text-white/70">
              <a href={site.social.instagram} target="_blank" rel="noreferrer">Instagram</a>
              <a href={site.social.facebook} target="_blank" rel="noreferrer">Facebook</a>
              <a href={site.social.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
              <a href={site.social.tiktok} target="_blank" rel="noreferrer">TikTok</a>
            </div>
          </div>
        </div>
        <div className="relative hidden min-h-[240px] overflow-hidden rounded-xl bg-white/5 lg:block">
          <Image
            src="/images/ship.jpg"
            alt="Global export routes"
            fill
            className="object-cover opacity-40"
            sizes="400px"
          />
          <iframe
            title={copy.contact.mapTitle}
            src={mapsSrc}
            className="absolute inset-0 h-full w-full opacity-90"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div>
          <h3 className="mb-4 text-lg font-semibold">{copy.footer.inquiry}</h3>
          <InquiryForm locale={locale} compact />
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-white/45">
        © {new Date().getFullYear()} {site.brand} · {site.legalName}
      </div>
    </footer>
  );
}
