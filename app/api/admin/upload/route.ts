import { NextResponse } from "next/server";
import { isLoggedIn } from "@/lib/auth";
import { saveUpload } from "@/lib/media";

export async function POST(request: Request) {
  if (!(await isLoggedIn())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Choose an image to upload." }, { status: 400 });
  }
  try {
    const url = await saveUpload(file);
    return NextResponse.json({ url });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Upload failed.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
