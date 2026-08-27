import { redirect } from "next/navigation";
import { isLoggedIn } from "@/lib/auth";
import { getContent, persistMode } from "@/lib/content";
import { Editor } from "@/app/admin/editor";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!(await isLoggedIn())) redirect("/admin/login");
  return <Editor initial={await getContent()} persist={persistMode()} />;
}
