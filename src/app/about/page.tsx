import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/awake/PageHero";
import CtaBand from "@/components/awake/CtaBand";
import { activities, education, experience, profile, skills, summary } from "@/data/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Rakesh Kumar I — final-year B.Tech Computer Science student at GITAM Deemed University, Bengaluru. Experience in AI/ML research and graphic design, building with Next.js, React, Node.js, Supabase and Python.",
};

export default function AboutPage() {
  const total = skills.reduce((n, group) => n + group.items.length, 0);

  return (
    <>
      <PageHero
        title="Final-year CSE student who prefers shipping."
        subtitle={summary}
        meta={
          <>
            <span className="pageHero-metaItem">{profile.location}</span>
            <span className="pageHero-metaItem">{profile.timezone}</span>
          </>
        }
      />

      <section className="prose-section">
        <div className="prose">
          <h2>Experience</h2>
          {experience.map((role) => (
            <div key={role.company}>
              <h3>
                {role.title} · {role.company}
              </h3>
              <p>
                <strong>{role.period}</strong>
              </p>
              <ul>
                {role.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}

          <h2>Education</h2>
          <ul>
            {education.map((item) => (
              <li key={item.school}>
                <strong>{item.school}</strong> — {item.degree} ({item.period}, {item.score})
              </li>
            ))}
          </ul>

          <h2>Toolkit</h2>
          <p>
            {total} tools across {skills.length} groups — the ones I reach for most:
          </p>
          <ul>
            {skills.map((group) => (
              <li key={group.label}>
                <strong>{group.label}</strong> — {group.items.join(", ")}
              </li>
            ))}
          </ul>

          <h2>Beyond the code</h2>
          <ul>
            {activities.map((item) => (
              <li key={item.title}>
                <strong>{item.title}</strong> — {item.detail}
              </li>
            ))}
          </ul>

          <h2>Say hello</h2>
          <p>
            {profile.availableFor}. If any of that sounds like a fit, the fastest route is the{" "}
            <Link href="/contact">contact page</Link>.
          </p>
        </div>
      </section>

      <CtaBand variant="page" />
    </>
  );
}
