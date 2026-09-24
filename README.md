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

## Content & image storage (Google Cloud Storage)

Editorial content (`content.json`) and admin image uploads (`uploads/*`) are stored in a private GCS bucket and served through `/api/media/:name`, so the bucket never needs public access.

1. In Google Cloud, keep the bucket `exporincoco` (uniform access, public access prevention is fine).
2. Create a service account, and on the bucket's **Permissions** tab grant it **Storage Object User** (`roles/storage.objectUser`).
3. Create a JSON key for the service account.
4. In Vercel → Project → Settings → Environment Variables, add:
   - `GCS_BUCKET` = `exporincoco`
   - `GCS_PROJECT_ID` = your project ID
   - `GCS_CREDENTIALS` = the key JSON (paste as-is, or base64-encode it)
5. Remove `BLOB_READ_WRITE_TOKEN` and redeploy.

To copy the existing files from Vercel Blob once:

```bash
BLOB_READ_WRITE_TOKEN=... GCS_BUCKET=exporincoco GCS_CREDENTIALS="$(base64 -w0 key.json)" npm run migrate:blob-to-gcs
```

## Pages

- `/en` and `/id` — home
- About, Products, product specs, Portfolio, Blog, Contact
- Floating WhatsApp button
- Inquiry form (name, company, country, email, product, message)
- `sitemap.xml` and `robots.txt`

## Replace later

Product photos, client logos, testimonials, and social URLs are placeholders until the company supplies final assets. Typical export-grade specs should be confirmed with production / QC before sending to buyers.
# exporincoco
