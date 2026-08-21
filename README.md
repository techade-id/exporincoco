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
4. Add optional environment variables if you want inquiry emails:
   - `RESEND_API_KEY`
   - `INQUIRY_FROM`
   - `INQUIRY_TO` (defaults to `eksporinaja@gmail.com`)
5. Deploy. Vercel will give you a `*.vercel.app` URL.

Without Resend, the inquiry form still works: it validates the fields and prepares a WhatsApp message to **0823-2226-0278**.

## Pages

- `/en` and `/id` — home
- About, Products, product specs, Portfolio, Blog, Contact
- Floating WhatsApp button
- Inquiry form (name, company, country, email, product, message)
- `sitemap.xml` and `robots.txt`

## Replace later

Product photos, client logos, testimonials, and social URLs are placeholders until the company supplies final assets. Typical export-grade specs should be confirmed with production / QC before sending to buyers.
# exporincoco
