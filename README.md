# Eksporin Coco

Company profile website for **Eksporin Coco** (PT Ekspor Indonesia Aja) — Indonesian exporter of coconut charcoal briquettes, copra, coconut oil, coconut shell charcoal, and wood charcoal.

Built with Next.js for Vercel. English is the primary language; Bahasa Indonesia is available via the language switcher.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The home page redirects to `/en`.

## Deploy to Vercel

1. Push this folder to a GitHub repository.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
3. Framework preset: **Next.js**. Leave the build command as `next build`.
4. Optional environment variables for inquiry email:
   - `RESEND_API_KEY`
   - `INQUIRY_FROM`
   - `INQUIRY_TO` (defaults to `eksporinaja@gmail.com`)
5. Deploy. Vercel will give you a `*.vercel.app` URL.

The inquiry form opens WhatsApp with the buyer’s message (0823-2226-0278 and 0858-7639-9054). It also emails `eksporinaja@gmail.com` via FormSubmit — check that inbox once and confirm the activation email so later inquiries arrive automatically.

## Pages

- `/en` and `/id` — home
- About, Products, product specs, Portfolio, Blog, Contact
- Floating WhatsApp button
- Inquiry form (name, company, country, email, product, message)
- `sitemap.xml` and `robots.txt`

## Replace later

Product photos, client logos, testimonials, and social URLs are placeholders until the company supplies final assets. Typical export-grade specs should be confirmed with production / QC before sending to buyers.
# exporincoco
