"use client";

export default function BackToTop() {
  return (
    <button
      type="button"
      className="footer-backToTop"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      data-arrow-host
    >
      Back to top
      <span aria-hidden="true">&uarr;</span>
    </button>
  );
}
