import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Editorial",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-full bg-[#111111] text-neutral-100">
      {children}
    </div>
  );
}
