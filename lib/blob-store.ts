import { head, put } from "@vercel/blob";

const CONTENT_PATH = "content.json";

export function blobEnabled() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN?.trim());
}

export async function putPublicBlob(
  pathname: string,
  body: Buffer | string,
  contentType?: string,
) {
  const blob = await put(pathname, body, {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType,
  });
  return blob.url;
}

export async function readBlobJson<T>(pathname = CONTENT_PATH): Promise<T | null> {
  if (!blobEnabled()) return null;
  try {
    const info = await head(pathname);
    const response = await fetch(info.url, { cache: "no-store" });
    if (!response.ok) return null;
    return (await response.json()) as T;
  } catch {
    return null;
  }
}

export async function writeBlobJson(value: unknown, pathname = CONTENT_PATH) {
  return putPublicBlob(pathname, JSON.stringify(value, null, 2), "application/json");
}
