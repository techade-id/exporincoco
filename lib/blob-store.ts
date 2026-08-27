import { get, put } from "@vercel/blob";

const CONTENT_PATH = "content.json";

export function blobEnabled() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN?.trim());
}

export async function putPublicBlob(
  pathname: string,
  body: Buffer | string,
  contentType?: string,
  cacheControlMaxAge = 60 * 60 * 24 * 30,
) {
  const blob = await put(pathname, body, {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType,
    cacheControlMaxAge,
  });
  return blob.url;
}

export async function readBlobJson<T>(pathname = CONTENT_PATH): Promise<T | null> {
  if (!blobEnabled()) return null;
  try {
    const result = await get(pathname, { access: "public", useCache: false });
    if (!result || result.statusCode !== 200 || !result.stream) return null;
    return (await new Response(result.stream).json()) as T;
  } catch {
    return null;
  }
}

export async function writeBlobJson(value: unknown, pathname = CONTENT_PATH) {
  return putPublicBlob(pathname, JSON.stringify(value, null, 2), "application/json", 60);
}
