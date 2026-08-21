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
    <Link href={localizedPath(locale)} className="flex items-center gap-2.5">
      <span
        className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold ${
          light ? "bg-orange text-white" : "bg-ink text-background"
        }`}
      >
        EC
      </span>
      <span className={`text-[17px] font-semibold tracking-tight ${light ? "text-white" : "text-ink"}`}>
        Eksporin Coco
      </span>
    </Link>
  );
}
