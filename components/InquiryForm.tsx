"use client";

import { useMemo, useState, type FormEvent } from "react";
import { inquiryCountries, localizedPath, type Locale, whatsappUrl } from "@/lib/site";
import { t } from "@/lib/i18n";
import { products } from "@/lib/products";

type InquiryFormProps = {
  locale: Locale;
  compact?: boolean;
  defaultProduct?: string;
};

export function InquiryForm({ locale, compact = false, defaultProduct = "" }: InquiryFormProps) {
  const copy = t(locale);
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [waLink, setWaLink] = useState("");

  const productOptions = useMemo(
    () =>
      products.map((product) => ({
        slug: product.slug,
        name: product[locale].name,
      })),
    [locale],
  );

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    if (String(data.get("website") || "").trim()) {
      setStatus("ok");
      return;
    }
    if (!data.get("captcha")) {
      setStatus("error");
      return;
    }

    const payload = {
      name: String(data.get("name") || "").trim(),
      company: String(data.get("company") || "").trim(),
      country: String(data.get("country") || "").trim(),
      email: String(data.get("email") || "").trim(),
      phone: String(data.get("phone") || "").trim(),
      product: String(data.get("product") || "").trim(),
      message: String(data.get("message") || "").trim(),
      locale,
    };

    if (!payload.name || !payload.email || !payload.message) {
      setStatus("error");
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await response.json()) as { whatsappUrl?: string };
      setWaLink(json.whatsappUrl || whatsappUrl(payload.message));
      setStatus("ok");
      form.reset();
    } catch {
      setWaLink(
        whatsappUrl(
          `${copy.wa.defaultMessage}\n\nName: ${payload.name}\nCompany: ${payload.company}\nCountry: ${payload.country}\nEmail: ${payload.email}\nProduct: ${payload.product}\n${payload.message}`,
        ),
      );
      setStatus("ok");
    }
  }

  const fieldClass =
    "w-full rounded-md border border-white/15 bg-white px-3 py-2.5 text-sm text-charcoal outline-none placeholder:text-muted focus:border-orange";

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" />
      <input name="name" required placeholder={copy.contact.name} className={fieldClass} />
      {!compact ? (
        <input name="company" placeholder={copy.contact.company} className={fieldClass} />
      ) : null}
      <div className={compact ? "grid gap-3 sm:grid-cols-2" : "space-y-3"}>
        {!compact ? (
          <select name="country" defaultValue="" className={fieldClass}>
            <option value="" disabled>
              {copy.contact.countryPlaceholder}
            </option>
            {inquiryCountries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        ) : null}
        <input name="email" type="email" required placeholder={copy.contact.emailField} className={fieldClass} />
        {compact ? (
          <input name="phone" placeholder={copy.contact.phone} className={fieldClass} />
        ) : (
          <select name="product" defaultValue={defaultProduct} className={fieldClass}>
            <option value="">{copy.contact.productPlaceholder}</option>
            {productOptions.map((product) => (
              <option key={product.slug} value={product.name}>
                {product.name}
              </option>
            ))}
          </select>
        )}
      </div>
      <textarea
        name="message"
        required
        rows={compact ? 4 : 5}
        placeholder={copy.contact.message}
        className={`${fieldClass} resize-y`}
      />
      <label className="flex items-center gap-2 text-xs text-white/80">
        <input type="checkbox" name="captcha" required className="accent-orange" />
        {copy.contact.captcha}
      </label>
      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex w-full items-center justify-center rounded-md bg-orange px-4 py-3 text-sm font-semibold text-white transition hover:bg-orange-dark disabled:opacity-70"
      >
        {status === "sending" ? copy.contact.sending : copy.contact.submit}
      </button>
      {status === "error" ? <p className="text-xs text-red-300">{copy.contact.error}</p> : null}
      {status === "ok" ? (
        <div className="space-y-2 text-xs text-white/85">
          <p>{copy.contact.success}</p>
          {waLink ? (
            <a href={waLink} target="_blank" rel="noreferrer" className="font-semibold text-orange">
              {copy.contact.openWhatsApp}
            </a>
          ) : (
            <a href={localizedPath(locale, "/contact")} className="font-semibold text-orange">
              {copy.nav.contact}
            </a>
          )}
        </div>
      ) : null}
    </form>
  );
}
