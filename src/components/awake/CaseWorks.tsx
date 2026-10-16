import Link from "next/link";
import SwapArrow from "./SwapArrow";
import { nextProject } from "@/data/site";

export default function CaseWorks({ current }: { current: string }) {
  const project = nextProject(current);

  return (
    <section className="caseWorks-section">
      <p className="caseWorks-kicker">Next project</p>

      <Link href={`/work/${project.id}`} className="caseWorks-next" data-arrow-host>
        <h2 className="caseWorks-nextTitle">
          {project.name}
          <span className="caseWorks-dot">.</span>
        </h2>
        <p className="caseWorks-nextMeta">
          {project.role} · {project.year}
        </p>
        <span className="caseWorks-badge">
          <SwapArrow />
        </span>
      </Link>
    </section>
  );
}
