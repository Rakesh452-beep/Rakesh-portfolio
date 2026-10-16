export default function Logo({ className }: { className?: string }) {
  return (
    <svg
      className={`logo${className ? ` ${className}` : ""}`}
      viewBox="0 0 139 33"
      fill="none"
      role="img"
      aria-label="Rakesh Kumar I"
    >
      <text
        x="0"
        y="24"
        style={{ fontFamily: "var(--font-display), sans-serif" }}
        fontSize="24"
        fontWeight="600"
        fill="currentColor"
        textLength="139"
        lengthAdjust="spacingAndGlyphs"
      >
        RAKESH KUMAR I
      </text>
    </svg>
  );
}
