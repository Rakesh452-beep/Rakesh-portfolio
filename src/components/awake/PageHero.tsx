import type { ReactNode } from "react";
import Navbar from "./Navbar";

export default function PageHero({
  variant = "light",
  title,
  subtitle,
  meta,
  navRow = true,
}: {
  variant?: "light" | "red";
  title: string;
  subtitle?: string;
  meta?: ReactNode;
  navRow?: boolean;
}) {
  return (
    <div className="pageHero-wrap">
      {navRow ? (
        <div className="pageHero-navRow">
          <Navbar variant="dev" />
        </div>
      ) : null}

      <section className={`pageHero-hero pageHero-${variant}`}>
        <h1 className="pageHero-title">{title}</h1>

        {subtitle ? <p className="pageHero-subtitle">{subtitle}</p> : null}

        {meta ? <div className="pageHero-meta">{meta}</div> : null}
      </section>
    </div>
  );
}
