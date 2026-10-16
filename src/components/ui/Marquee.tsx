"use client";

export default function Marquee({
  items,
  speed = 38,
  tone = "ink",
}: {
  items: readonly string[];
  speed?: number;
  tone?: "ink" | "terra";
}) {
  const row = [...items, ...items];

  return (
    <div
      className="relative flex overflow-hidden border-y border-line bg-paper-2/60 py-4"
      style={{
        maskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
      }}
    >
      <div
        className="flex shrink-0 items-center gap-8 pr-8"
        style={{ animation: `marquee ${speed}s linear infinite` }}
      >
        {row.map((item, i) => (
          <span key={`${item}-${i}`} className="flex shrink-0 items-center gap-8">
            <span
              className={`micro whitespace-nowrap ${
                tone === "terra" ? "text-terra" : "text-ink-3"
              }`}
            >
              {item}
            </span>
            <span
              className={`h-1.5 w-1.5 shrink-0 rotate-45 ${
                tone === "terra" ? "bg-terra/70" : "bg-line-2"
              }`}
              aria-hidden
            />
          </span>
        ))}
      </div>
    </div>
  );
}
