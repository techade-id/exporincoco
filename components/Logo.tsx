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
  const sizeClass = light ? "h-14 w-auto" : "h-12 w-auto";

  return (
    <Link href={localizedPath(locale)} className="flex items-center" aria-label="Eksporin Aja">
      {light ? (
        <Image
          src="/images/logo-light.png"
          alt="Eksporin Aja"
          width={519}
          height={710}
          className={sizeClass}
          priority
        />
      ) : (
        <>
          <Image
            src="/images/logo.png"
            alt="Eksporin Aja"
            width={519}
            height={710}
            className={`${sizeClass} dark:hidden`}
            priority
          />
          <Image
            src="/images/logo-light.png"
            alt="Eksporin Aja"
            width={519}
            height={710}
            className={`${sizeClass} hidden dark:block`}
            priority
          />
        </>
      )}
    </Link>
  );
}
