import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="text-4xl font-bold">Page not found</h1>
      <p className="mt-3 text-muted">The page you requested is not available.</p>
      <Link href="/en" className="mt-6 inline-block font-semibold text-orange">
        Back to home
      </Link>
    </div>
  );
}
