import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/site";

export default function CaseTile({
  project,
  priority = false,
}: {
  project: Project;
  priority?: boolean;
}) {
  return (
    <Link href={`/work/${project.id}`} className="caseTile-tile" data-arrow-host>
      <span className="caseTile-thumb">
        <Image
          src={project.image}
          alt={project.name}
          width={380}
          height={440}
          priority={priority}
          className="caseTile-img caseTile-base"
        />
        <Image
          src={project.imageWide}
          alt=""
          aria-hidden
          width={380}
          height={440}
          className="caseTile-img caseTile-hover"
        />
      </span>
      <span className="caseTile-meta">
        <span className="caseTile-discipline">{project.discipline}</span>
        <span className="caseTile-title">{project.name}</span>
        <span className="caseTile-year">{project.year}</span>
      </span>
    </Link>
  );
}
