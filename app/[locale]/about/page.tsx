import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CtaBanner } from "@/components/CtaBanner";
import { IndonesiaMap } from "@/components/IndonesiaMap";
import { IconEye, IconLeaf, IconPin, IconShield, IconTarget, IconTruck } from "@/components/icons";
import { t } from "@/lib/i18n";
import { isLocale, localizedPath, type Locale } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return {
    title: t(locale).nav.about,
    alternates: { canonical: localizedPath(locale, "/about") },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const copy = t(locale);

  return (
    <>
      <section className="relative isolate overflow-hidden bg-band">
        <Image
          src="/images/about-hero.jpg"
          alt="Burning charcoal"
          fill
          className="object-cover opacity-40"
          sizes="100vw"
        />
        <div className="relative mx-auto grid max-w-6xl items-center gap-8 px-4 py-24 sm:px-6 lg:grid-cols-2">
          <div>
            <h1 className="text-4xl font-bold text-white sm:text-5xl">{copy.about.kicker}</h1>
            <p className="mt-4 max-w-xl text-lg text-white/80">{copy.about.lead}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
          <Image
            src="/images/containers.jpg"
            alt="Port operations"
            fill
            className="object-cover"
            sizes="50vw"
          />
        </div>
        <div>
          <h2 className="text-3xl font-semibold">{copy.about.title}</h2>
          <p className="mt-4 text-muted">{copy.about.p1}</p>
          <p className="mt-3 text-muted">{copy.about.p2}</p>
          <p className="mt-3 text-muted">{copy.about.p3}</p>
        </div>
      </section>

      <section className="bg-surface px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-3xl font-semibold">{copy.mission.title}</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <article className="rounded-2xl bg-card p-7">
              <IconEye className="h-8 w-8 text-orange" />
              <h3 className="mt-4 text-xl font-semibold">{copy.mission.visionTitle}</h3>
              <p className="mt-3 text-sm leading-6 text-muted">{copy.mission.vision}</p>
            </article>
            <article className="rounded-2xl bg-card p-7">
              <IconTarget className="h-8 w-8 text-orange" />
              <h3 className="mt-4 text-xl font-semibold">{copy.mission.missionTitle}</h3>
              <p className="mt-3 text-sm leading-6 text-muted">{copy.mission.mission}</p>
            </article>
            <article className="rounded-2xl bg-card p-7">
              <h3 className="text-xl font-semibold">{copy.mission.valuesTitle}</h3>
              <ul className="mt-5 space-y-4">
                {copy.mission.values.map((value, index) => {
                  const Icon = [IconShield, IconTruck, IconTarget][index];
                  return (
                    <li key={value.title} className="flex gap-3">
                      <Icon className="mt-0.5 h-5 w-5 shrink-0 text-orange" />
                      <div>
                        <p className="font-medium">{value.title}</p>
                        <p className="text-sm text-muted">{value.text}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2">
        <div>
          <h2 className="text-3xl font-semibold">{copy.network.title}</h2>
          <p className="mt-4 text-muted">{copy.network.text}</p>
          <ul className="mt-6 space-y-4">
            {copy.network.points.map((point, index) => {
              const Icon = index === 0 ? IconPin : IconLeaf;
              return (
                <li key={point} className="flex items-start gap-3">
                  <Icon className="mt-0.5 h-5 w-5 shrink-0 text-orange" />
                  <span>{point}</span>
                </li>
              );
            })}
          </ul>
        </div>
        <IndonesiaMap />
      </section>

      <CtaBanner locale={locale} />
    </>
  );
}
