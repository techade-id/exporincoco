import { IconWhatsApp } from "@/components/icons";
import { t } from "@/lib/i18n";
import { type Locale, whatsappUrl } from "@/lib/site";

export function WhatsAppButton({ locale }: { locale: Locale }) {
  const copy = t(locale);
  return (
    <a
      href={whatsappUrl(copy.wa.defaultMessage)}
      target="_blank"
      rel="noreferrer"
      aria-label={copy.wa.label}
      className="no-print fixed right-4 bottom-4 z-50 flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-105"
    >
      <IconWhatsApp className="block h-8 w-8 shrink-0" />
    </a>
  );
}
