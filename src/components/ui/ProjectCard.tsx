"use client";

import type { Project } from "@/data/site";

export default function ProjectCard({
  project,
  detailed = false,
}: {
  project: Project;
  detailed?: boolean;
}) {
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--gx", `${((e.clientX - r.left) / r.width) * 100}%`);
    e.currentTarget.style.setProperty("--gy", `${((e.clientY - r.top) / r.height) * 100}%`);
  };

  return (
    <article
      onPointerMove={onMove}
      className="group relative isolate overflow-hidden border border-line bg-paper-2/60 p-5 transition-colors duration-500 hover:border-line-2 md:p-8"
    >
      {/* cursor-tracked clay wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(520px circle at var(--gx, 50%) var(--gy, 50%), rgba(184,70,28,0.08), transparent 62%)",
        }}
      />

      <div className="flex items-baseline justify-between gap-4 border-b border-line pb-4">
        <span className="font-display text-4xl leading-none italic text-ink-4 transition-colors duration-500 group-hover:text-terra md:text-5xl">
          {project.index}
        </span>
        <span className="micro-sm text-ink-3">{project.year}</span>
      </div>

      <h3 className="mt-6 font-display text-h3">{project.name}</h3>
      <p className="micro-sm mt-2.5 text-terra">{project.role}</p>
      <p className="mt-4 max-w-2xl text-pretty text-[15px] leading-relaxed text-ink-2">
        {project.summary}
      </p>

      <ul className={`mt-6 space-y-2.5 ${detailed ? "" : "sm:max-w-xl"}`}>
        {project.bullets.map((b, i) => (
          <li key={i} className="flex gap-3 text-[14px] leading-relaxed text-ink-3">
            <span className="mt-[0.55em] h-px w-4 shrink-0 bg-line-2" aria-hidden />
            <span>{b}</span>
          </li>
        ))}
      </ul>

      <ul className="mt-7 flex flex-wrap gap-1.5" aria-label="Tech stack">
        {project.stack.map((s) => (
          <li
            key={s}
            className="micro-sm border border-line px-2.5 py-1.5 text-ink-3 transition-colors duration-500 group-hover:border-line-2 group-hover:text-ink-2"
          >
            {s}
          </li>
        ))}
      </ul>
    </article>
  );
}
