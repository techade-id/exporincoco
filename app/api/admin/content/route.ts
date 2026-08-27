import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { isLoggedIn } from "@/lib/auth";
import { getContent, persistMode, saveContent, type Content } from "@/lib/content";

export async function GET() {
  if (!(await isLoggedIn())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json({ content: await getContent(), persist: persistMode() });
}

export async function PUT(request: Request) {
  if (!(await isLoggedIn())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = (await request.json()) as { content?: Content };
  if (!body.content) {
    return NextResponse.json({ error: "Missing content" }, { status: 400 });
  }
  try {
    const content = await saveContent(body.content);
    revalidatePath("/", "layout");
    revalidatePath("/[locale]", "layout");
    revalidatePath("/en", "layout");
    revalidatePath("/id", "layout");
    return NextResponse.json({ content, persist: persistMode() });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not save content.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
