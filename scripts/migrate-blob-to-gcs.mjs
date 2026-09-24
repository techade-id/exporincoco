// One-time copy of every object in the Vercel Blob store into the GCS bucket.
// Usage: BLOB_READ_WRITE_TOKEN=... GCS_BUCKET=exporincoco GCS_CREDENTIALS=... node scripts/migrate-blob-to-gcs.mjs
import { get, list } from "@vercel/blob";
import { Storage } from "@google-cloud/storage";

const bucketName = process.env.GCS_BUCKET?.trim();
if (!process.env.BLOB_READ_WRITE_TOKEN?.trim() || !bucketName) {
  console.error("Set BLOB_READ_WRITE_TOKEN and GCS_BUCKET first.");
  process.exit(1);
}

function credentials() {
  const raw = process.env.GCS_CREDENTIALS?.trim();
  if (!raw) return undefined;
  const json = raw.startsWith("{") ? raw : Buffer.from(raw, "base64").toString("utf8");
  const parsed = JSON.parse(json);
  return { client_email: parsed.client_email, private_key: parsed.private_key.replace(/\\n/g, "\n") };
}

const bucket = new Storage({
  projectId: process.env.GCS_PROJECT_ID?.trim() || undefined,
  credentials: credentials(),
}).bucket(bucketName);

let cursor;
let copied = 0;
let failed = 0;
do {
  const page = await list({ cursor, limit: 1000 });
  for (const blob of page.blobs) {
    try {
      const result = await get(blob.pathname, { access: "private", useCache: false });
      if (!result || result.statusCode !== 200 || !result.stream) throw new Error("empty response");
      const bytes = Buffer.from(await new Response(result.stream).arrayBuffer());
      const isJson = blob.pathname.endsWith(".json");
      await bucket.file(blob.pathname).save(bytes, {
        resumable: false,
        contentType: result.blob?.contentType || (isJson ? "application/json" : undefined),
        metadata: { cacheControl: `private, max-age=${isJson ? 60 : 60 * 60 * 24 * 30}` },
      });
      copied += 1;
      console.log(`copied ${blob.pathname} (${bytes.length} bytes)`);
    } catch (error) {
      failed += 1;
      console.error(`failed ${blob.pathname}: ${error instanceof Error ? error.message : error}`);
    }
  }
  cursor = page.hasMore ? page.cursor : undefined;
} while (cursor);

console.log(`Done: ${copied} copied, ${failed} failed.`);
process.exit(failed ? 1 : 0);
