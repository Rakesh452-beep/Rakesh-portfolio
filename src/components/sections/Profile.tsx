import Link from "next/link";
import Marquee from "@/components/ui/Marquee";
import { approach, experience, profile, skills, summary } from "@/data/site";

const ticker = skills.flatMap((g) => g.items);

const stats = [
  { k: "Projects shipped", v: "03" },
  { k: "Internships", v: "02" },
  { k: "CGPA", v: "7.09" },
  { k: "Graduating", v: "2027" },
];

export default function Profile() {
  return (
    <section id="profile" className="pt-24 md:pt-36">
      <div className="shell">
        <div className="rule-double">
          <div className="flex items-baseline justify-between gap-4 pt-3">
            <span className="micro-sm text-terra">§ 02 — Profile</span>
            <span className="micro-sm text-ink-4">{profile.timezone}</span>
          </div>
        </div>
      </div>

      <div className="shell grid gap-10 pt-12 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-4">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-8 md:sticky md:top-28">
            {stats.map((s) => (
              <div key={s.k} className="border-t border-line pt-4">
                <dt className="micro-sm text-ink-4">{s.k}</dt>
                <dd className="mt-2 font-display text-4xl leading-none text-terra tabular-nums">
                  {s.v}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="md:col-span-8">
          <p className="drop-cap text-pretty text-xl leading-relaxed text-ink md:text-2xl">
            {summary}
          </p>

          <Link
            href="/about"
            className="micro mt-8 inline-block border-b border-line pb-1 text-ink-2 transition-colors hover:border-terra hover:text-terra"
          >
            Full profile ↗
          </Link>

          <h2 className="mt-20 font-display text-h3">How I work</h2>
          <ol className="mt-6">
            {approach.map((a) => (
              <li key={a.n} className="row-hover border-t border-line px-4 py-6 last:border-b">
                <div className="flex gap-5">
                  <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-terra font-display text-[13px] font-semibold text-terra">
                    {a.n}
                  </span>
                  <div>
                    <h3 className="font-display text-[16px] font-semibold tracking-tight">
                      {a.title}
                    </h3>
                    <p className="mt-2 max-w-xl text-[14px] leading-relaxed text-ink-3">{a.body}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>

          <h2 className="mt-20 font-display text-h3">Experience</h2>
          <ol className="mt-6">
            {experience.map((r) => (
              <li key={r.company} className="row-hover border-t border-line px-4 py-6 last:border-b">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                  <div>
                    <h3 className="font-display text-[16px] font-semibold tracking-tight">
                      {r.title}
                    </h3>
                    <p className="micro-sm mt-2 text-ink-4">{r.company}</p>
                  </div>
                  <span className="micro-sm shrink-0 text-terra">{r.period}</span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="mt-24 md:mt-32">
        <Marquee items={ticker} speed={54} />
      </div>
    </section>
  );
}
