import { promises as fs } from "fs";
import path from "path";
import { blobEnabled, putPublicBlob } from "@/lib/blob-store";
import { githubPutFile, persistMode } from "@/lib/content";

const PUBLIC_DIR = path.join(process.cwd(), "public", "uploads");
const DATA_DIR = path.join(process.cwd(), "data", "uploads");
const TMP_DIR = path.join("/tmp", "eksporin-uploads");

function safeName(name: string) {
  const ext = path.extname(name).toLowerCase().replace(/[^.a-z0-9]/g, "");
  const base = path
    .basename(name, path.extname(name))
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
  return `${Date.now()}-${base || "image"}${ext || ".jpg"}`;
}

async function writeLocal(filePath: string, bytes: Buffer) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, bytes);
}

export async function saveUpload(file: File) {
  if (!file.type.startsWith("image/")) {
    throw new Error("Please upload an image file.");
  }
  if (file.size > 2.5 * 1024 * 1024) {
    throw new Error("Image must be smaller than 2.5 MB.");
  }
  const bytes = Buffer.from(await file.arrayBuffer());
  const filename = safeName(file.name);
  await writeLocal(path.join(PUBLIC_DIR, filename), bytes).catch(() => undefined);
  await writeLocal(path.join(DATA_DIR, filename), bytes).catch(() => undefined);
  await writeLocal(path.join(TMP_DIR, filename), bytes).catch(() => undefined);

  if (blobEnabled()) {
    return putPublicBlob(`uploads/${filename}`, bytes, file.type || "image/jpeg");
  }

  if (persistMode() === "github") {
    const ok = await githubPutFile(
      `public/uploads/${filename}`,
      bytes,
      `Upload ${filename} from editorial`,
    );
    if (!ok) throw new Error("Could not upload the image to GitHub. Check GITHUB_TOKEN.");
    const repo = process.env.GITHUB_REPO?.trim() || "techade-id/exporincoco";
    const branch = process.env.GITHUB_BRANCH?.trim() || "main";
    return `https://raw.githubusercontent.com/${repo}/${branch}/public/uploads/${filename}`;
  }

  return `/uploads/${filename}`;
}

export async function readUpload(filename: string) {
  const safe = path.basename(filename);
  const candidates = [
    path.join(PUBLIC_DIR, safe),
    path.join(DATA_DIR, safe),
    path.join(TMP_DIR, safe),
  ];
  for (const filePath of candidates) {
    try {
      return await fs.readFile(filePath);
    } catch {
      // try next
    }
  }
  return null;
}

export function mimeFor(filename: string) {
  const ext = path.extname(filename).toLowerCase();
  if (ext === ".png") return "image/png";
  if (ext === ".webp") return "image/webp";
  if (ext === ".gif") return "image/gif";
  if (ext === ".svg") return "image/svg+xml";
  return "image/jpeg";
}
