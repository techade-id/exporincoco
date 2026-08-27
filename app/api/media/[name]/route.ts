import { NextResponse } from "next/server";
import { mimeFor, readUpload } from "@/lib/media";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ name: string }> },
) {
  const { name } = await params;
  const bytes = await readUpload(name);
  if (!bytes) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return new NextResponse(new Uint8Array(bytes), {
    headers: {
      "Content-Type": mimeFor(name),
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
