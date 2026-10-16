import Link from "next/link";
import { contact, nav, profile } from "@/data/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="shell mt-28 pb-10 md:mt-40">
      <div className="rule-double">
        <div className="grid gap-10 pt-8 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <p className="micro flex items-center gap-2 text-terra">
              <span className="inline-block h-1.5 w-1.5 animate-blink rounded-full bg-terra" aria-hidden />
              Open to work
            </p>
            <a
              href={`mailto:${contact.email}`}
              className="mt-5 block break-all font-display text-h3 font-semibold tracking-tight underline-terra"
            >
              {contact.email}
            </a>
            <p className="mt-6 max-w-xs text-[14px] leading-relaxed text-ink-3">
              Internships and junior full-stack roles, and the occasional freelance build.
              Usually replies within a day.
            </p>
          </div>

          <nav className="md:col-span-3" aria-label="Footer">
            <p className="micro-sm text-ink-4">Index</p>
            <ul className="mt-5 space-y-2.5">
              {nav.map((item, i) => (
                <li key={item.href}>
                  <Link href={item.href} className="link-arrow text-sm text-ink-2 hover:text-terra">
                    <span className="micro-sm mr-2 text-ink-4">0{i + 1}</span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <p className="micro-sm text-ink-4">Elsewhere</p>
            <ul className="mt-5 space-y-2.5">
              {contact.links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-arrow text-sm text-ink-2 hover:text-terra"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={profile.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-arrow text-sm text-ink-2 hover:text-terra"
                >
                  Résumé
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Colophon — the printer's note at the foot of the page. */}
      <div className="mt-12 flex flex-col items-start gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="micro-sm text-ink-4">
          © {year} {profile.name} — Set in Fraunces &amp; Inter, printed on Next.js
        </p>
        <p className="ornament" aria-hidden>
          ❦
        </p>
        <p className="micro-sm text-ink-4">{profile.location}</p>
      </div>
    </footer>
  );
}
