import { redirect } from "next/navigation";
import { adminCredentials, isLoggedIn } from "@/lib/auth";
import { LoginForm } from "@/app/admin/login-form";

export default async function AdminLoginPage() {
  if (await isLoggedIn()) redirect("/admin");
  return <LoginForm configured={Boolean(adminCredentials().password)} />;
}
