"use client";

export function PrintButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="no-print mt-8 rounded-md bg-orange px-5 py-2.5 text-sm font-semibold text-white"
    >
      {label}
    </button>
  );
}
