import Link from "next/link";
import { projects } from "@/data/site";

export default function ProjectIndex() {
  return (
    <section id="work" className="pt-24 md:pt-36">
      <div className="shell">
        <div className="rule-double">
          <div className="flex items-baseline justify-between gap-4 pt-3">
            <span className="micro-sm text-terra">§ 01 — Selected Work</span>
            <span className="micro-sm text-ink-4">Three builds, 2024 — 2025</span>
          </div>
        </div>
      </div>

      <div className="mt-6">
        {projects.map((p) => (
          <Link key={p.id} href={`/work/${p.id}`} className="index-row group">
            <div className="shell flex items-center gap-4 py-7 md:gap-8 md:py-10">
              <span className="index-num w-8 shrink-0 font-display text-lg italic text-terra">
                {p.index}
              </span>

              <span className="flex-1 text-index font-semibold">{p.name}</span>

              <span className="index-meta micro-sm hidden w-56 shrink-0 text-ink-4 md:block">
                {p.role}
              </span>
              <span className="index-meta micro-sm hidden w-24 shrink-0 text-ink-4 lg:block">
                {p.year}
              </span>
              <span className="index-kind micro-sm hidden w-36 shrink-0 text-ink-4 xl:block">
                {p.kind}
              </span>

              <span className="index-arrow shrink-0 text-lg" aria-hidden>
                →
              </span>
            </div>
          </Link>
        ))}
      </div>
      <div className="border-t border-line" />
    </section>
  );
}
