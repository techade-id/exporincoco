import { list, put } from "@vercel/blob";

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
  const { blobs } = await list({ prefix: pathname, limit: 10 });
  const match = blobs.find((item) => item.pathname === pathname) ?? blobs[0];
  if (!match) return null;
  const response = await fetch(match.url, { cache: "no-store" });
  if (!response.ok) return null;
  return (await response.json()) as T;
}

export async function writeBlobJson(value: unknown, pathname = CONTENT_PATH) {
  return putPublicBlob(pathname, JSON.stringify(value, null, 2), "application/json");
}
