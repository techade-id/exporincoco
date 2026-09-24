import { Storage, type StorageOptions } from "@google-cloud/storage";

const CONTENT_PATH = "content.json";

let storage: Storage | null = null;

function bucketName() {
  return process.env.GCS_BUCKET?.trim() || "";
}

// GCS_CREDENTIALS holds the service account key, either raw JSON or base64-encoded JSON.
// When it is empty, the client falls back to Application Default Credentials.
function credentials(): StorageOptions["credentials"] | undefined {
  const raw = process.env.GCS_CREDENTIALS?.trim();
  if (!raw) return undefined;
  const json = raw.startsWith("{") ? raw : Buffer.from(raw, "base64").toString("utf8");
  const parsed = JSON.parse(json) as { client_email: string; private_key: string };
  return {
    client_email: parsed.client_email,
    private_key: parsed.private_key.replace(/\\n/g, "\n"),
  };
}

function bucket() {
  if (!storage) {
    storage = new Storage({
      projectId: process.env.GCS_PROJECT_ID?.trim() || undefined,
      credentials: credentials(),
    });
  }
  return storage.bucket(bucketName());
}

export function gcsEnabled() {
  return Boolean(bucketName());
}

export async function putObject(
  pathname: string,
  body: Buffer | string,
  contentType?: string,
  cacheControlMaxAge = 60 * 60 * 24 * 30,
) {
  await bucket()
    .file(pathname)
    .save(body, {
      resumable: false,
      contentType,
      metadata: { cacheControl: `private, max-age=${cacheControlMaxAge}` },
    });
  return `gs://${bucketName()}/${pathname}`;
}

export async function readObjectBytes(pathname: string): Promise<Buffer | null> {
  if (!gcsEnabled()) return null;
  try {
    const [bytes] = await bucket().file(pathname).download();
    return bytes;
  } catch {
    return null;
  }
}

export async function readObjectJson<T>(pathname = CONTENT_PATH): Promise<T | null> {
  const bytes = await readObjectBytes(pathname);
  if (!bytes) return null;
  try {
    return JSON.parse(bytes.toString("utf8")) as T;
  } catch {
    return null;
  }
}

export async function writeObjectJson(value: unknown, pathname = CONTENT_PATH) {
  return putObject(pathname, JSON.stringify(value, null, 2), "application/json", 60);
}
