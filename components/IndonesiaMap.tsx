export function IndonesiaMap() {
  const pins = [
    { cx: 52, cy: 78, label: "Sumatera" },
    { cx: 118, cy: 118, label: "Jawa" },
    { cx: 168, cy: 72, label: "Kalimantan" },
    { cx: 228, cy: 108, label: "Sulawesi" },
    { cx: 292, cy: 128, label: "Maluku" },
    { cx: 248, cy: 168, label: "Nusa Tenggara" },
    { cx: 348, cy: 118, label: "Papua" },
  ];

  return (
    <svg viewBox="0 0 400 220" className="h-auto w-full" role="img" aria-label="Indonesia supplier network">
      <rect width="400" height="220" fill="var(--surface)" rx="16" />
      <path
        d="M30 70c28-18 62-8 86 8 18 12 22 28 8 36-18 10-48 4-70-8-20-10-32-22-24-36zm88 42c36-6 78 8 96 28 8 8-2 18-18 16-28-4-62-18-84-28-10-4-8-14 6-16zm96-48c34-10 70 6 86 24 10 12-4 22-22 18-26-6-54-16-70-26-8-6-6-14 6-16zm86 56c22-8 48 4 62 18 8 8-2 16-16 14-20-4-40-12-52-20-8-4-4-10 6-12zm-52 52c28-2 54 14 62 28 4 8-10 12-22 8-20-6-42-16-50-24-6-6 0-12 10-12z"
        fill="var(--line)"
      />
      {pins.map((pin) => (
        <g key={pin.label}>
          <circle cx={pin.cx} cy={pin.cy} r="7" fill="#F26522" />
          <circle cx={pin.cx} cy={pin.cy} r="11" fill="#F26522" opacity="0.2" />
        </g>
      ))}
    </svg>
  );
}
