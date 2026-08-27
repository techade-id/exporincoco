import { get, put } from "@vercel/blob";

const CONTENT_PATH = "content.json";

export function blobEnabled() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN?.trim());
}

export async function putBlob(
  pathname: string,
  body: Buffer | string,
  contentType?: string,
  cacheControlMaxAge = 60 * 60 * 24 * 30,
) {
  const blob = await put(pathname, body, {
    access: "private",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType,
    cacheControlMaxAge,
  });
  return blob.url;
}

export async function readBlobBytes(pathname: string): Promise<Buffer | null> {
  if (!blobEnabled()) return null;
  try {
    const result = await get(pathname, { access: "private", useCache: false });
    if (!result || result.statusCode !== 200 || !result.stream) return null;
    return Buffer.from(await new Response(result.stream).arrayBuffer());
  } catch {
    return null;
  }
}

export async function readBlobJson<T>(pathname = CONTENT_PATH): Promise<T | null> {
  const bytes = await readBlobBytes(pathname);
  if (!bytes) return null;
  try {
    return JSON.parse(bytes.toString("utf8")) as T;
  } catch {
    return null;
  }
}

export async function writeBlobJson(value: unknown, pathname = CONTENT_PATH) {
  return putBlob(pathname, JSON.stringify(value, null, 2), "application/json", 60);
}
