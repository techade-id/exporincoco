"use client";

import { createContext, useContext, useId, useState, type ReactNode } from "react";
import { slugify, type Content, type GalleryItem, type PostItem, type ProductItem } from "@/lib/content-types";

type EditorLang = "en" | "id";

const LangContext = createContext<{ lang: EditorLang; setLang: (lang: EditorLang) => void }>({
  lang: "en",
  setLang: () => undefined,
});

function useLang() {
  return useContext(LangContext);
}

type Section =
  | "site"
  | "menu"
  | "home"
  | "about"
  | "products"
  | "portfolio"
  | "blog"
  | "contact"
  | "images";

const sections: { id: Section; label: string }[] = [
  { id: "site", label: "Site & contact" },
  { id: "menu", label: "Menu" },
  { id: "home", label: "Home words" },
  { id: "about", label: "About words" },
  { id: "products", label: "Products" },
  { id: "portfolio", label: "Portfolio" },
  { id: "blog", label: "Articles" },
  { id: "contact", label: "Contact & forms" },
  { id: "images", label: "Images" },
];

const inputClass =
  "w-full rounded-md border border-white/15 bg-[#1c1c1c] px-3 py-2 text-sm text-white outline-none focus:border-orange";

export function Editor({ initial, persist }: { initial: Content; persist: "file" | "github" | "blob" }) {
  const [content, setContent] = useState(initial);
  const [section, setSection] = useState<Section>("site");
  const [lang, setLang] = useState<EditorLang>("en");
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);

  async function save() {
    setSaving(true);
    setStatus("");
    const response = await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });
    setSaving(false);
    let json: { error?: string; content?: Content } = {};
    try {
      json = (await response.json()) as { error?: string; content?: Content };
    } catch {
      setStatus("Could not save. The server did not return a valid response.");
      return;
    }
    if (!response.ok || !json.content) {
      setStatus(json.error || "Could not save.");
      return;
    }
    setContent(json.content);
    setStatus(`Saved. English hero is now: “${json.content.dictionary.en.hero.title}”`);
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      <div className="mx-auto flex min-h-full max-w-6xl flex-col md:flex-row">
        <aside className="border-b border-white/10 p-4 md:w-56 md:shrink-0 md:border-r md:border-b-0">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-orange">Editorial</p>
          <nav className="mt-4 grid grid-cols-2 gap-1 md:grid-cols-1">
            {sections.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setSection(item.id)}
                className={`rounded-lg px-3 py-2 text-left text-sm ${
                  section === item.id ? "bg-orange text-white" : "text-white/75 hover:bg-white/5"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
          <div className="mt-6 space-y-2 text-xs text-white/50">
            <p>
              Storage:{" "}
              {persist === "blob"
                ? "Vercel Blob (private store)"
                : persist === "github"
                  ? "GitHub (keeps edits live)"
                  : "this server only"}
            </p>
            {persist === "file" ? (
              <p>Add a Vercel Blob store so image uploads survive deploys.</p>
            ) : null}
          </div>
        </aside>
        <div className="flex-1 p-4 sm:p-6">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-xl font-semibold">{sections.find((item) => item.id === section)?.label}</h1>
            <div className="flex flex-wrap items-center gap-2">
              <label className="flex items-center gap-2 rounded-lg border border-white/15 bg-[#1c1c1c] px-3 py-2 text-sm">
                <span className="text-white/50">Language</span>
                <select
                  value={lang}
                  onChange={(event) => setLang(event.target.value as EditorLang)}
                  className="bg-transparent text-white outline-none"
                >
                  <option value="en">English (US)</option>
                  <option value="id">Indonesia (ID)</option>
                </select>
              </label>
              <a
                href={`${lang === "id" ? "/id" : "/en"}?v=${Date.now()}`}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border border-white/15 px-3 py-2 text-sm"
              >
                View site
              </a>
              <button type="button" onClick={logout} className="rounded-lg border border-white/15 px-3 py-2 text-sm">
                Log out
              </button>
              <button
                type="button"
                onClick={save}
                disabled={saving}
                className="rounded-lg bg-orange px-4 py-2 text-sm font-semibold text-white disabled:opacity-70"
              >
                {saving ? "Saving…" : "Save changes"}
              </button>
            </div>
          </div>
          {status ? (
            <p className={`mb-4 text-sm ${status.startsWith("Saved") ? "text-orange" : "text-red-400"}`}>{status}</p>
          ) : null}
          {section === "site" ? <SiteFields content={content} setContent={setContent} /> : null}
          {section === "menu" ? <MenuFields content={content} setContent={setContent} /> : null}
          {section === "home" ? <HomeFields content={content} setContent={setContent} /> : null}
          {section === "about" ? <AboutFields content={content} setContent={setContent} /> : null}
          {section === "products" ? <ProductFields content={content} setContent={setContent} /> : null}
          {section === "portfolio" ? <PortfolioFields content={content} setContent={setContent} /> : null}
          {section === "blog" ? <BlogFields content={content} setContent={setContent} /> : null}
          {section === "contact" ? <ContactFields content={content} setContent={setContent} /> : null}
          {section === "images" ? <ImageFields content={content} setContent={setContent} /> : null}
        </div>
      </div>
    </LangContext.Provider>
  );
}

function CollapseButton({
  open,
  label,
  onClick,
}: {
  open: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={open}
      className="flex w-full items-center justify-between gap-3 text-left"
    >
      <span className="font-medium">{label}</span>
      <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-white">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`h-4 w-4 transition ${open ? "rotate-180" : ""}`}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </span>
    </button>
  );
}

function CollapseItem({
  id,
  label,
  openId,
  onToggle,
  children,
}: {
  id: string;
  label: string;
  openId: string;
  onToggle: (id: string) => void;
  children: ReactNode;
}) {
  const open = openId === id;
  return (
    <div className="rounded-xl border border-white/10 p-4">
      <CollapseButton open={open} label={label} onClick={() => onToggle(open ? "" : id)} />
      {open ? <div className="mt-4 space-y-3">{children}</div> : null}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  multiline,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
}) {
  return (
    <label className="block space-y-1">
      <span className="text-xs font-medium text-white/60">{label}</span>
      {multiline ? (
        <textarea value={value} onChange={(event) => onChange(event.target.value)} rows={4} className={inputClass} />
      ) : (
        <input value={value} onChange={(event) => onChange(event.target.value)} className={inputClass} />
      )}
    </label>
  );
}

function Pair({
  label,
  en,
  id,
  onEn,
  onId,
  multiline,
}: {
  label: string;
  en: string;
  id: string;
  onEn: (value: string) => void;
  onId: (value: string) => void;
  multiline?: boolean;
}) {
  const { lang } = useLang();
  return (
    <Field
      label={label}
      value={lang === "id" ? id : en}
      onChange={lang === "id" ? onId : onEn}
      multiline={multiline}
    />
  );
}

function ImagePicker({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const [busy, setBusy] = useState(false);
  const [fileName, setFileName] = useState("");
  const inputId = useId();

  async function onFile(file?: File) {
    if (!file) return;
    setBusy(true);
    setFileName(file.name);
    const body = new FormData();
    body.append("file", file);
    const response = await fetch("/api/admin/upload", { method: "POST", body });
    const json = (await response.json()) as { url?: string; error?: string };
    setBusy(false);
    if (json.url) onChange(json.url);
    else alert(json.error || "Upload failed.");
  }

  return (
    <div className="space-y-2">
      <span className="text-xs font-medium text-white/60">{label}</span>
      <div className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]">
        <div className="relative h-40 bg-black/30">
          {value ? (
            <img src={value} alt="" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-white/40">No image yet</div>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-3 p-3">
          <label
            htmlFor={inputId}
            className={`inline-flex cursor-pointer items-center gap-2 rounded-lg bg-orange px-4 py-2.5 text-sm font-semibold text-white ${
              busy ? "opacity-70" : "hover:bg-orange-dark"
            }`}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
              <path d="M12 16V4" />
              <path d="M8 8l4-4 4 4" />
              <path d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2" />
            </svg>
            {busy ? "Uploading…" : "Upload image"}
          </label>
          <input
            id={inputId}
            type="file"
            accept="image/*"
            disabled={busy}
            className="sr-only"
            onChange={(event) => onFile(event.target.files?.[0])}
          />
          <span className="text-xs text-white/50">{fileName || "JPG, PNG, or WebP · under 2.5 MB"}</span>
        </div>
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="w-full border-t border-white/10 bg-transparent px-3 py-2 text-xs text-white/70 outline-none"
        />
      </div>
    </div>
  );
}

function updateCopy(content: Content, locale: "en" | "id", patch: Partial<Content["dictionary"]["en"]>): Content {
  return {
    ...content,
    dictionary: {
      ...content.dictionary,
      [locale]: { ...content.dictionary[locale], ...patch },
    },
  };
}

function SiteFields({
  content,
  setContent,
}: {
  content: Content;
  setContent: (content: Content) => void;
}) {
  const site = content.site;
  const [open, setOpen] = useState("");
  return (
    <div className="space-y-4">
      <Field label="Brand name" value={site.brand} onChange={(brand) => setContent({ ...content, site: { ...site, brand, name: brand } })} />
      <Field label="Legal name" value={site.legalName} onChange={(legalName) => setContent({ ...content, site: { ...site, legalName } })} />
      <Field label="Email" value={site.email} onChange={(email) => setContent({ ...content, site: { ...site, email } })} />
      <div className="space-y-3">
        {site.whatsappNumbers.map((number, index) => (
          <CollapseItem
            key={index}
            id={`wa-${index}`}
            label={number.display || `WhatsApp ${index + 1}`}
            openId={open}
            onToggle={setOpen}
          >
            <Field
              label="WhatsApp display"
              value={number.display}
              onChange={(display) => {
                const whatsappNumbers = site.whatsappNumbers.map((item, i) => (i === index ? { ...item, display } : item));
                setContent({ ...content, site: { ...site, whatsappNumbers, phoneDisplay: whatsappNumbers[0]?.display || site.phoneDisplay } });
              }}
            />
            <Field
              label="WhatsApp number (62…)"
              value={number.wa}
              onChange={(wa) => {
                const whatsappNumbers = site.whatsappNumbers.map((item, i) => (i === index ? { ...item, wa } : item));
                setContent({
                  ...content,
                  site: {
                    ...site,
                    whatsappNumbers,
                    whatsapp: whatsappNumbers[0]?.wa || site.whatsapp,
                    phoneTel: `+${whatsappNumbers[0]?.wa || site.whatsapp}`,
                  },
                });
              }}
            />
          </CollapseItem>
        ))}
      </div>
      <Field label="Address line 1" value={site.address.line1} onChange={(line1) => setContent({ ...content, site: { ...site, address: { ...site.address, line1 } } })} />
      <Field label="Address line 2" value={site.address.line2} onChange={(line2) => setContent({ ...content, site: { ...site, address: { ...site.address, line2 } } })} />
      <Field label="Address line 3" value={site.address.line3} onChange={(line3) => setContent({ ...content, site: { ...site, address: { ...site.address, line3 } } })} />
      <Field label="Country" value={site.address.country} onChange={(country) => setContent({ ...content, site: { ...site, address: { ...site.address, country } } })} />
      <Field label="Google Maps search" value={site.address.mapsQuery} onChange={(mapsQuery) => setContent({ ...content, site: { ...site, address: { ...site.address, mapsQuery } } })} />
      <Field label="Instagram" value={site.social.instagram} onChange={(instagram) => setContent({ ...content, site: { ...site, social: { ...site.social, instagram } } })} />
      <Field label="Facebook" value={site.social.facebook} onChange={(facebook) => setContent({ ...content, site: { ...site, social: { ...site.social, facebook } } })} />
      <Field label="LinkedIn" value={site.social.linkedin} onChange={(linkedin) => setContent({ ...content, site: { ...site, social: { ...site.social, linkedin } } })} />
      <Field label="TikTok" value={site.social.tiktok} onChange={(tiktok) => setContent({ ...content, site: { ...site, social: { ...site.social, tiktok } } })} />
    </div>
  );
}

function MenuFields({
  content,
  setContent,
}: {
  content: Content;
  setContent: (content: Content) => void;
}) {
  const { lang } = useLang();
  const [open, setOpen] = useState("");
  return (
    <div className="space-y-4">
      {content.navItems.map((item, index) => (
        <CollapseItem
          key={index}
          id={`nav-${index}`}
          label={lang === "id" ? item.id : item.en}
          openId={open}
          onToggle={setOpen}
        >
          <Field
            label="Link"
            value={item.href}
            onChange={(href) =>
              setContent({
                ...content,
                navItems: content.navItems.map((nav, i) => (i === index ? { ...nav, href } : nav)),
              })
            }
          />
          <Field
            label="Menu label"
            value={lang === "id" ? item.id : item.en}
            onChange={(value) =>
              setContent({
                ...content,
                navItems: content.navItems.map((nav, i) =>
                  i === index ? { ...nav, [lang]: value } : nav,
                ),
              })
            }
          />
          <button
            type="button"
            className="rounded-lg border border-white/15 px-3 py-2 text-sm"
            onClick={() => setContent({ ...content, navItems: content.navItems.filter((_, i) => i !== index) })}
          >
            Remove
          </button>
        </CollapseItem>
      ))}
      <button
        type="button"
        className="rounded-md border border-white/15 px-3 py-2 text-sm"
        onClick={() =>
          setContent({
            ...content,
            navItems: [...content.navItems, { href: "/portfolio", en: "Portfolio", id: "Portofolio" }],
          })
        }
      >
        Add menu item
      </button>
    </div>
  );
}

function HomeFields({
  content,
  setContent,
}: {
  content: Content;
  setContent: (content: Content) => void;
}) {
  const en = content.dictionary.en;
  const id = content.dictionary.id;
  const { lang } = useLang();
  const [openValue, setOpenValue] = useState("");
  const [openQuote, setOpenQuote] = useState("");
  return (
    <div className="space-y-6">
      <Pair label="Hero title" en={en.hero.title} id={id.hero.title} multiline onEn={(title) => setContent(updateCopy(content, "en", { hero: { ...en.hero, title } }))} onId={(title) => setContent(updateCopy(content, "id", { hero: { ...id.hero, title } }))} />
      <Pair label="Quote button" en={en.hero.requestQuote} id={id.hero.requestQuote} onEn={(requestQuote) => setContent(updateCopy(content, "en", { hero: { ...en.hero, requestQuote } }))} onId={(requestQuote) => setContent(updateCopy(content, "id", { hero: { ...id.hero, requestQuote } }))} />
      <Pair label="Contact button" en={en.hero.contactUs} id={id.hero.contactUs} onEn={(contactUs) => setContent(updateCopy(content, "en", { hero: { ...en.hero, contactUs } }))} onId={(contactUs) => setContent(updateCopy(content, "id", { hero: { ...id.hero, contactUs } }))} />
      <ImagePicker label="Hero image" value={content.images.hero} onChange={(hero) => setContent({ ...content, images: { ...content.images, hero } })} />
      <ImagePicker label="Home about image" value={content.images.homeAbout} onChange={(homeAbout) => setContent({ ...content, images: { ...content.images, homeAbout } })} />
      <h2 className="text-sm font-semibold">Value cards</h2>
      {en.values.map((value, index) => (
        <CollapseItem
          key={index}
          id={`value-${index}`}
          label={lang === "id" ? id.values[index]?.title || value.title : value.title}
          openId={openValue}
          onToggle={setOpenValue}
        >
          <Pair
            label="Title"
            en={value.title}
            id={id.values[index]?.title || ""}
            onEn={(title) =>
              setContent(updateCopy(content, "en", { values: en.values.map((item, i) => (i === index ? { ...item, title } : item)) }))
            }
            onId={(title) =>
              setContent(updateCopy(content, "id", { values: id.values.map((item, i) => (i === index ? { ...item, title } : item)) }))
            }
          />
          <Pair
            label="Text"
            en={value.text}
            id={id.values[index]?.text || ""}
            multiline
            onEn={(text) =>
              setContent(updateCopy(content, "en", { values: en.values.map((item, i) => (i === index ? { ...item, text } : item)) }))
            }
            onId={(text) =>
              setContent(updateCopy(content, "id", { values: id.values.map((item, i) => (i === index ? { ...item, text } : item)) }))
            }
          />
        </CollapseItem>
      ))}
      <Pair label="About teaser" en={en.about.p1} id={id.about.p1} multiline onEn={(p1) => setContent(updateCopy(content, "en", { about: { ...en.about, p1 } }))} onId={(p1) => setContent(updateCopy(content, "id", { about: { ...id.about, p1 } }))} />
      <Pair label="Products heading" en={en.products.title} id={id.products.title} onEn={(title) => setContent(updateCopy(content, "en", { products: { ...en.products, title } }))} onId={(title) => setContent(updateCopy(content, "id", { products: { ...id.products, title } }))} />
      <Pair label="Testimonials heading" en={en.testimonials.title} id={id.testimonials.title} onEn={(title) => setContent(updateCopy(content, "en", { testimonials: { ...en.testimonials, title } }))} onId={(title) => setContent(updateCopy(content, "id", { testimonials: { ...id.testimonials, title } }))} />
      {en.testimonials.items.map((item, index) => (
        <CollapseItem
          key={index}
          id={`quote-${index}`}
          label={item.name}
          openId={openQuote}
          onToggle={setOpenQuote}
        >
          <Pair
            label="Quote"
            en={item.quote}
            id={id.testimonials.items[index]?.quote || ""}
            multiline
            onEn={(quote) =>
              setContent(
                updateCopy(content, "en", {
                  testimonials: { ...en.testimonials, items: en.testimonials.items.map((row, i) => (i === index ? { ...row, quote } : row)) },
                }),
              )
            }
            onId={(quote) =>
              setContent(
                updateCopy(content, "id", {
                  testimonials: { ...id.testimonials, items: id.testimonials.items.map((row, i) => (i === index ? { ...row, quote } : row)) },
                }),
              )
            }
          />
          <Field
            label="Name"
            value={item.name}
            onChange={(name) => {
              const enItems = en.testimonials.items.map((row, i) => (i === index ? { ...row, name } : row));
              const idItems = id.testimonials.items.map((row, i) => (i === index ? { ...row, name } : row));
              setContent({
                ...content,
                dictionary: {
                  en: { ...en, testimonials: { ...en.testimonials, items: enItems } },
                  id: { ...id, testimonials: { ...id.testimonials, items: idItems } },
                },
              });
            }}
          />
        </CollapseItem>
      ))}
      <Pair label="CTA title" en={en.cta.title} id={id.cta.title} onEn={(title) => setContent(updateCopy(content, "en", { cta: { ...en.cta, title } }))} onId={(title) => setContent(updateCopy(content, "id", { cta: { ...id.cta, title } }))} />
      <Pair label="CTA text" en={en.cta.text} id={id.cta.text} multiline onEn={(text) => setContent(updateCopy(content, "en", { cta: { ...en.cta, text } }))} onId={(text) => setContent(updateCopy(content, "id", { cta: { ...id.cta, text } }))} />
    </div>
  );
}

function AboutFields({
  content,
  setContent,
}: {
  content: Content;
  setContent: (content: Content) => void;
}) {
  const en = content.dictionary.en;
  const id = content.dictionary.id;
  const { lang } = useLang();
  const [openValue, setOpenValue] = useState("");
  return (
    <div className="space-y-4">
      <Pair label="Kicker" en={en.about.kicker} id={id.about.kicker} onEn={(kicker) => setContent(updateCopy(content, "en", { about: { ...en.about, kicker } }))} onId={(kicker) => setContent(updateCopy(content, "id", { about: { ...id.about, kicker } }))} />
      <Pair label="Title" en={en.about.title} id={id.about.title} onEn={(title) => setContent(updateCopy(content, "en", { about: { ...en.about, title } }))} onId={(title) => setContent(updateCopy(content, "id", { about: { ...id.about, title } }))} />
      <Pair label="Lead" en={en.about.lead} id={id.about.lead} multiline onEn={(lead) => setContent(updateCopy(content, "en", { about: { ...en.about, lead } }))} onId={(lead) => setContent(updateCopy(content, "id", { about: { ...id.about, lead } }))} />
      <Pair label="Paragraph 1" en={en.about.p1} id={id.about.p1} multiline onEn={(p1) => setContent(updateCopy(content, "en", { about: { ...en.about, p1 } }))} onId={(p1) => setContent(updateCopy(content, "id", { about: { ...id.about, p1 } }))} />
      <Pair label="Paragraph 2" en={en.about.p2} id={id.about.p2} multiline onEn={(p2) => setContent(updateCopy(content, "en", { about: { ...en.about, p2 } }))} onId={(p2) => setContent(updateCopy(content, "id", { about: { ...id.about, p2 } }))} />
      <Pair label="Paragraph 3" en={en.about.p3} id={id.about.p3} multiline onEn={(p3) => setContent(updateCopy(content, "en", { about: { ...en.about, p3 } }))} onId={(p3) => setContent(updateCopy(content, "id", { about: { ...id.about, p3 } }))} />
      <Pair label="Vision" en={en.mission.vision} id={id.mission.vision} multiline onEn={(vision) => setContent(updateCopy(content, "en", { mission: { ...en.mission, vision } }))} onId={(vision) => setContent(updateCopy(content, "id", { mission: { ...id.mission, vision } }))} />
      <Pair label="Mission" en={en.mission.mission} id={id.mission.mission} multiline onEn={(mission) => setContent(updateCopy(content, "en", { mission: { ...en.mission, mission } }))} onId={(mission) => setContent(updateCopy(content, "id", { mission: { ...id.mission, mission } }))} />
      <h2 className="text-sm font-semibold">Core values</h2>
      {en.mission.values.map((value, index) => (
        <CollapseItem
          key={index}
          id={`mission-${index}`}
          label={lang === "id" ? id.mission.values[index]?.title || value.title : value.title}
          openId={openValue}
          onToggle={setOpenValue}
        >
          <Pair
            label="Title"
            en={value.title}
            id={id.mission.values[index]?.title || ""}
            onEn={(title) =>
              setContent(updateCopy(content, "en", { mission: { ...en.mission, values: en.mission.values.map((item, i) => (i === index ? { ...item, title } : item)) } }))
            }
            onId={(title) =>
              setContent(updateCopy(content, "id", { mission: { ...id.mission, values: id.mission.values.map((item, i) => (i === index ? { ...item, title } : item)) } }))
            }
          />
          <Pair
            label="Text"
            en={value.text}
            id={id.mission.values[index]?.text || ""}
            multiline
            onEn={(text) =>
              setContent(updateCopy(content, "en", { mission: { ...en.mission, values: en.mission.values.map((item, i) => (i === index ? { ...item, text } : item)) } }))
            }
            onId={(text) =>
              setContent(updateCopy(content, "id", { mission: { ...id.mission, values: id.mission.values.map((item, i) => (i === index ? { ...item, text } : item)) } }))
            }
          />
        </CollapseItem>
      ))}
      <Pair label="Network text" en={en.network.text} id={id.network.text} multiline onEn={(text) => setContent(updateCopy(content, "en", { network: { ...en.network, text } }))} onId={(text) => setContent(updateCopy(content, "id", { network: { ...id.network, text } }))} />
      <ImagePicker label="About hero image" value={content.images.aboutHero} onChange={(aboutHero) => setContent({ ...content, images: { ...content.images, aboutHero } })} />
      <ImagePicker label="About photo" value={content.images.about} onChange={(about) => setContent({ ...content, images: { ...content.images, about } })} />
    </div>
  );
}

function emptyProduct(): ProductItem {
  return {
    slug: `product-${Date.now()}`,
    image: "/images/briquettes.jpg",
    specs: [{ label: "Origin", value: "Indonesia" }],
    en: { name: "New product", short: "", description: "" },
    id: { name: "Produk baru", short: "", description: "" },
  };
}

function ProductFields({
  content,
  setContent,
}: {
  content: Content;
  setContent: (content: Content) => void;
}) {
  const [open, setOpen] = useState("");
  const { lang } = useLang();
  return (
    <div className="space-y-4">
      {content.products.map((product, index) => (
        <CollapseItem
          key={product.slug}
          id={product.slug}
          label={product[lang].name}
          openId={open}
          onToggle={setOpen}
        >
              <Field
                label="URL slug"
                value={product.slug}
                onChange={(slug) =>
                  setContent({
                    ...content,
                    products: content.products.map((item, i) => (i === index ? { ...item, slug: slugify(slug) } : item)),
                  })
                }
              />
              <Pair
                label="Name"
                en={product.en.name}
                id={product.id.name}
                onEn={(name) => setContent({ ...content, products: content.products.map((item, i) => (i === index ? { ...item, en: { ...item.en, name } } : item)) })}
                onId={(name) => setContent({ ...content, products: content.products.map((item, i) => (i === index ? { ...item, id: { ...item.id, name } } : item)) })}
              />
              <Pair
                label="Short text"
                en={product.en.short}
                id={product.id.short}
                multiline
                onEn={(short) => setContent({ ...content, products: content.products.map((item, i) => (i === index ? { ...item, en: { ...item.en, short } } : item)) })}
                onId={(short) => setContent({ ...content, products: content.products.map((item, i) => (i === index ? { ...item, id: { ...item.id, short } } : item)) })}
              />
              <Pair
                label="Description"
                en={product.en.description}
                id={product.id.description}
                multiline
                onEn={(description) => setContent({ ...content, products: content.products.map((item, i) => (i === index ? { ...item, en: { ...item.en, description } } : item)) })}
                onId={(description) => setContent({ ...content, products: content.products.map((item, i) => (i === index ? { ...item, id: { ...item.id, description } } : item)) })}
              />
              <ImagePicker
                label="Product image"
                value={product.image}
                onChange={(image) => setContent({ ...content, products: content.products.map((item, i) => (i === index ? { ...item, image } : item)) })}
              />
              {product.specs.map((spec, specIndex) => (
                <div key={specIndex} className="grid gap-3 md:grid-cols-2">
                  <Field
                    label="Spec label"
                    value={spec.label}
                    onChange={(label) =>
                      setContent({
                        ...content,
                        products: content.products.map((item, i) =>
                          i === index
                            ? { ...item, specs: item.specs.map((row, r) => (r === specIndex ? { ...row, label } : row)) }
                            : item,
                        ),
                      })
                    }
                  />
                  <Field
                    label="Spec value"
                    value={spec.value}
                    onChange={(value) =>
                      setContent({
                        ...content,
                        products: content.products.map((item, i) =>
                          i === index
                            ? { ...item, specs: item.specs.map((row, r) => (r === specIndex ? { ...row, value } : row)) }
                            : item,
                        ),
                      })
                    }
                  />
                </div>
              ))}
              <div className="flex gap-2">
                <button
                  type="button"
                  className="rounded-md border border-white/15 px-3 py-2 text-sm"
                  onClick={() =>
                    setContent({
                      ...content,
                      products: content.products.map((item, i) =>
                        i === index ? { ...item, specs: [...item.specs, { label: "New spec", value: "" }] } : item,
                      ),
                    })
                  }
                >
                  Add spec
                </button>
                <button
                  type="button"
                  className="rounded-md border border-white/15 px-3 py-2 text-sm"
                  onClick={() => setContent({ ...content, products: content.products.filter((_, i) => i !== index) })}
                >
                  Delete product
                </button>
              </div>
        </CollapseItem>
      ))}
      <button
        type="button"
        className="rounded-md bg-white/10 px-3 py-2 text-sm"
        onClick={() => {
          const product = emptyProduct();
          setContent({ ...content, products: [...content.products, product] });
          setOpen(product.slug);
        }}
      >
        Add product
      </button>
    </div>
  );
}

function PortfolioFields({
  content,
  setContent,
}: {
  content: Content;
  setContent: (content: Content) => void;
}) {
  const en = content.dictionary.en;
  const id = content.dictionary.id;
  const { lang } = useLang();
  const [openCard, setOpenCard] = useState("");
  const [openPhoto, setOpenPhoto] = useState("");
  return (
    <div className="space-y-4">
      <Pair label="Kicker" en={en.portfolio.kicker} id={id.portfolio.kicker} onEn={(kicker) => setContent(updateCopy(content, "en", { portfolio: { ...en.portfolio, kicker } }))} onId={(kicker) => setContent(updateCopy(content, "id", { portfolio: { ...id.portfolio, kicker } }))} />
      <Pair label="Title" en={en.portfolio.title} id={id.portfolio.title} onEn={(title) => setContent(updateCopy(content, "en", { portfolio: { ...en.portfolio, title } }))} onId={(title) => setContent(updateCopy(content, "id", { portfolio: { ...id.portfolio, title } }))} />
      {en.portfolio.items.map((item, index) => (
        <CollapseItem
          key={index}
          id={`card-${index}`}
          label={lang === "id" ? id.portfolio.items[index]?.title || item.title : item.title}
          openId={openCard}
          onToggle={setOpenCard}
        >
          <Pair
            label="Card title"
            en={item.title}
            id={id.portfolio.items[index]?.title || ""}
            onEn={(title) =>
              setContent(updateCopy(content, "en", { portfolio: { ...en.portfolio, items: en.portfolio.items.map((row, i) => (i === index ? { ...row, title } : row)) } }))
            }
            onId={(title) =>
              setContent(updateCopy(content, "id", { portfolio: { ...id.portfolio, items: id.portfolio.items.map((row, i) => (i === index ? { ...row, title } : row)) } }))
            }
          />
          <Pair
            label="Card text"
            en={item.text}
            id={id.portfolio.items[index]?.text || ""}
            multiline
            onEn={(text) =>
              setContent(updateCopy(content, "en", { portfolio: { ...en.portfolio, items: en.portfolio.items.map((row, i) => (i === index ? { ...row, text } : row)) } }))
            }
            onId={(text) =>
              setContent(updateCopy(content, "id", { portfolio: { ...id.portfolio, items: id.portfolio.items.map((row, i) => (i === index ? { ...row, text } : row)) } }))
            }
          />
          <ImagePicker
            label="Home card image"
            value={content.portfolioPreviewImages[index] || ""}
            onChange={(src) => {
              const next = [...content.portfolioPreviewImages];
              next[index] = src;
              setContent({ ...content, portfolioPreviewImages: next });
            }}
          />
        </CollapseItem>
      ))}
      <h2 className="text-sm font-semibold">Portfolio gallery</h2>
      {content.portfolioGallery.map((item, index) => (
        <CollapseItem
          key={index}
          id={`photo-${index}`}
          label={lang === "id" ? item.titleId : item.titleEn}
          openId={openPhoto}
          onToggle={setOpenPhoto}
        >
          <Pair
            label="Caption"
            en={item.titleEn}
            id={item.titleId}
            onEn={(titleEn) =>
              setContent({
                ...content,
                portfolioGallery: content.portfolioGallery.map((row, i) => (i === index ? { ...row, titleEn } : row)),
              })
            }
            onId={(titleId) =>
              setContent({
                ...content,
                portfolioGallery: content.portfolioGallery.map((row, i) => (i === index ? { ...row, titleId } : row)),
              })
            }
          />
          <ImagePicker
            label="Photo"
            value={item.src}
            onChange={(src) =>
              setContent({
                ...content,
                portfolioGallery: content.portfolioGallery.map((row, i) => (i === index ? { ...row, src } : row)),
              })
            }
          />
          <button
            type="button"
            className="rounded-md border border-white/15 px-3 py-2 text-sm"
            onClick={() => setContent({ ...content, portfolioGallery: content.portfolioGallery.filter((_, i) => i !== index) })}
          >
            Remove photo
          </button>
        </CollapseItem>
      ))}
      <button
        type="button"
        className="rounded-md bg-white/10 px-3 py-2 text-sm"
        onClick={() =>
          setContent({
            ...content,
            portfolioGallery: [
              ...content.portfolioGallery,
              { src: "/images/production.jpg", titleEn: "New photo", titleId: "Foto baru" } satisfies GalleryItem,
            ],
          })
        }
      >
        Add gallery photo
      </button>
    </div>
  );
}

function emptyPost(author: string): PostItem {
  return {
    slug: `article-${Date.now()}`,
    image: "/images/blog-partner.jpg",
    date: new Date().toISOString().slice(0, 10),
    author,
    en: { title: "New article", excerpt: "", body: [""] },
    id: { title: "Artikel baru", excerpt: "", body: [""] },
  };
}

function BlogFields({
  content,
  setContent,
}: {
  content: Content;
  setContent: (content: Content) => void;
}) {
  const [open, setOpen] = useState("");
  const { lang } = useLang();
  return (
    <div className="space-y-4">
      <Pair
        label="Blog heading"
        en={content.dictionary.en.blog.title}
        id={content.dictionary.id.blog.title}
        onEn={(title) => setContent(updateCopy(content, "en", { blog: { ...content.dictionary.en.blog, title } }))}
        onId={(title) => setContent(updateCopy(content, "id", { blog: { ...content.dictionary.id.blog, title } }))}
      />
      {content.posts.map((post, index) => (
        <CollapseItem
          key={post.slug}
          id={post.slug}
          label={post[lang].title}
          openId={open}
          onToggle={setOpen}
        >
              <Field
                label="URL slug"
                value={post.slug}
                onChange={(slug) =>
                  setContent({
                    ...content,
                    posts: content.posts.map((item, i) => (i === index ? { ...item, slug: slugify(slug) } : item)),
                  })
                }
              />
              <Field
                label="Date"
                value={post.date}
                onChange={(date) => setContent({ ...content, posts: content.posts.map((item, i) => (i === index ? { ...item, date } : item)) })}
              />
              <Field
                label="Author"
                value={post.author}
                onChange={(author) => setContent({ ...content, posts: content.posts.map((item, i) => (i === index ? { ...item, author } : item)) })}
              />
              <Pair
                label="Title"
                en={post.en.title}
                id={post.id.title}
                onEn={(title) => setContent({ ...content, posts: content.posts.map((item, i) => (i === index ? { ...item, en: { ...item.en, title } } : item)) })}
                onId={(title) => setContent({ ...content, posts: content.posts.map((item, i) => (i === index ? { ...item, id: { ...item.id, title } } : item)) })}
              />
              <Pair
                label="Excerpt"
                en={post.en.excerpt}
                id={post.id.excerpt}
                multiline
                onEn={(excerpt) => setContent({ ...content, posts: content.posts.map((item, i) => (i === index ? { ...item, en: { ...item.en, excerpt } } : item)) })}
                onId={(excerpt) => setContent({ ...content, posts: content.posts.map((item, i) => (i === index ? { ...item, id: { ...item.id, excerpt } } : item)) })}
              />
              <Pair
                label="Article body (blank line = new paragraph)"
                en={post.en.body.join("\n\n")}
                id={post.id.body.join("\n\n")}
                multiline
                onEn={(body) =>
                  setContent({
                    ...content,
                    posts: content.posts.map((item, i) =>
                      i === index ? { ...item, en: { ...item.en, body: body.split(/\n\s*\n/).map((part) => part.trim()).filter(Boolean) } } : item,
                    ),
                  })
                }
                onId={(body) =>
                  setContent({
                    ...content,
                    posts: content.posts.map((item, i) =>
                      i === index ? { ...item, id: { ...item.id, body: body.split(/\n\s*\n/).map((part) => part.trim()).filter(Boolean) } } : item,
                    ),
                  })
                }
              />
              <ImagePicker
                label="Article image"
                value={post.image}
                onChange={(image) => setContent({ ...content, posts: content.posts.map((item, i) => (i === index ? { ...item, image } : item)) })}
              />
              <button
                type="button"
                className="rounded-md border border-white/15 px-3 py-2 text-sm"
                onClick={() => setContent({ ...content, posts: content.posts.filter((_, i) => i !== index) })}
              >
                Delete article
              </button>
        </CollapseItem>
      ))}
      <button
        type="button"
        className="rounded-md bg-white/10 px-3 py-2 text-sm"
        onClick={() => {
          const post = emptyPost(content.site.brand);
          setContent({ ...content, posts: [post, ...content.posts] });
          setOpen(post.slug);
        }}
      >
        Add article
      </button>
    </div>
  );
}

function ContactFields({
  content,
  setContent,
}: {
  content: Content;
  setContent: (content: Content) => void;
}) {
  const en = content.dictionary.en;
  const id = content.dictionary.id;
  return (
    <div className="space-y-4">
      <Pair label="Page title" en={en.contact.title} id={id.contact.title} onEn={(title) => setContent(updateCopy(content, "en", { contact: { ...en.contact, title } }))} onId={(title) => setContent(updateCopy(content, "id", { contact: { ...id.contact, title } }))} />
      <Pair label="Lead" en={en.contact.lead} id={id.contact.lead} multiline onEn={(lead) => setContent(updateCopy(content, "en", { contact: { ...en.contact, lead } }))} onId={(lead) => setContent(updateCopy(content, "id", { contact: { ...id.contact, lead } }))} />
      <Pair label="Form title" en={en.contact.formTitle} id={id.contact.formTitle} onEn={(formTitle) => setContent(updateCopy(content, "en", { contact: { ...en.contact, formTitle } }))} onId={(formTitle) => setContent(updateCopy(content, "id", { contact: { ...id.contact, formTitle } }))} />
      <Pair label="Submit button" en={en.contact.submit} id={id.contact.submit} onEn={(submit) => setContent(updateCopy(content, "en", { contact: { ...en.contact, submit } }))} onId={(submit) => setContent(updateCopy(content, "id", { contact: { ...id.contact, submit } }))} />
      <Pair label="WhatsApp default message" en={en.wa.defaultMessage} id={id.wa.defaultMessage} multiline onEn={(defaultMessage) => setContent(updateCopy(content, "en", { wa: { ...en.wa, defaultMessage } }))} onId={(defaultMessage) => setContent(updateCopy(content, "id", { wa: { ...id.wa, defaultMessage } }))} />
      <Field
        label="Inquiry countries (one per line)"
        value={content.inquiryCountries.join("\n")}
        multiline
        onChange={(value) =>
          setContent({
            ...content,
            inquiryCountries: value.split("\n").map((item) => item.trim()).filter(Boolean),
          })
        }
      />
    </div>
  );
}

function ImageFields({
  content,
  setContent,
}: {
  content: Content;
  setContent: (content: Content) => void;
}) {
  const images = content.images;
  const [open, setOpen] = useState("");
  const items: { id: keyof typeof images; label: string }[] = [
    { id: "logo", label: "Logo (light background)" },
    { id: "logoLight", label: "Logo (dark background)" },
    { id: "hero", label: "Home hero" },
    { id: "homeAbout", label: "Home about photo" },
    { id: "aboutHero", label: "About hero" },
    { id: "about", label: "About photo" },
    { id: "footerMap", label: "Footer map background" },
  ];
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <CollapseItem key={item.id} id={item.id} label={item.label} openId={open} onToggle={setOpen}>
          <ImagePicker
            label={item.label}
            value={images[item.id]}
            onChange={(value) => setContent({ ...content, images: { ...images, [item.id]: value } })}
          />
        </CollapseItem>
      ))}
    </div>
  );
}
