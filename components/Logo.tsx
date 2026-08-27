import Link from "next/link";
import { MediaImage } from "@/components/MediaImage";
import { localizedPath, type Locale } from "@/lib/site";

export function Logo({
  locale,
  light = false,
  logo = "/images/logo.png",
  logoLight = "/images/logo-light.png",
}: {
  locale: Locale;
  light?: boolean;
  logo?: string;
  logoLight?: string;
}) {
  const sizeClass = light ? "h-14 w-auto" : "h-12 w-auto";

  return (
    <Link href={localizedPath(locale)} className="flex items-center" aria-label="Eksporin Aja">
      {light ? (
        <MediaImage src={logoLight} alt="Eksporin Aja" width={519} height={710} className={sizeClass} priority />
      ) : (
        <>
          <MediaImage src={logo} alt="Eksporin Aja" width={519} height={710} className={`${sizeClass} dark:hidden`} priority />
          <MediaImage src={logoLight} alt="Eksporin Aja" width={519} height={710} className={`${sizeClass} hidden dark:block`} priority />
        </>
      )}
    </Link>
  );
}
