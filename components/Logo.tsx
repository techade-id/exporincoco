import Image from "next/image";
import Link from "next/link";
import { localizedPath, type Locale } from "@/lib/site";

export function Logo({
  locale,
  light = false,
}: {
  locale: Locale;
  light?: boolean;
}) {
  return (
    <Link href={localizedPath(locale)} className="flex items-center" aria-label="Eksporin Aja">
      <Image
        src="/images/logo.png"
        alt="Eksporin Aja"
        width={519}
        height={710}
        className={light ? "h-14 w-auto" : "h-12 w-auto"}
        priority
      />
    </Link>
  );
}
