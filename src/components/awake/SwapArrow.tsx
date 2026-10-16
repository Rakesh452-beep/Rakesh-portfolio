type Direction = "up-right" | "right" | "up" | "left";

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 18 18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path
        d="M9 6h9v9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function SwapArrow({
  dir = "up-right",
  className,
}: {
  dir?: Direction;
  className?: string;
}) {
  return (
    <span className={`swapArrow-swap${className ? ` ${className}` : ""}`} data-dir={dir} aria-hidden="true">
      <span className="swapArrow-a">
        <Arrow />
      </span>
      <span className="swapArrow-b">
        <Arrow />
      </span>
    </span>
  );
}
