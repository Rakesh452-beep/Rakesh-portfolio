import Image from "next/image";
import type { Project } from "@/data/site";

export default function CaseGallery({ project }: { project: Project }) {
  return (
    <section className="caseGallery-section">
      <ul className="caseGallery-track">
        <li className="caseGallery-slide" data-kind="media">
          <div className="caseGallery-mediaRow" data-layout="full">
            <div className="caseGallery-mediaSlot">
              <div className="caseGallery-slot">
                <Image
                  src={project.imageWide}
                  alt={project.name}
                  fill
                  sizes="(max-width: 767px) 100vw, 1000px"
                  className="caseTile-img"
                  priority
                />
              </div>
            </div>
          </div>
        </li>

        <li className="caseGallery-slide" data-kind="text">
          <div className="caseGallery-copy" data-panel="red">
            <div className="caseGallery-copyGrid">
              <h2 className="caseGallery-copyHeading">{project.name}</h2>
              <div className="caseGallery-copyBody">
                <p>{project.summary}</p>
              </div>
            </div>
          </div>
        </li>

        <li className="caseGallery-slide" data-kind="media">
          <div className="caseGallery-mediaRow" data-layout="equal">
            <div className="caseGallery-mediaSlot">
              <div className="caseGallery-slot">
                <Image
                  src={project.image}
                  alt=""
                  fill
                  sizes="(max-width: 767px) 100vw, 500px"
                  className="caseTile-img"
                />
              </div>
            </div>
            <div className="caseGallery-mediaSlot">
              <div className="caseGallery-slot">
                <Image
                  src={project.imageWide}
                  alt=""
                  fill
                  sizes="(max-width: 767px) 100vw, 500px"
                  className="caseTile-img"
                />
              </div>
            </div>
          </div>
        </li>

        <li className="caseGallery-slide" data-kind="list">
          <div className="caseGallery-copy" data-panel="white">
            <h3 className="caseGallery-listHeading">What I built</h3>

            <ul className="caseGallery-list">
              {project.bullets.map((bullet, i) => (
                <li className="caseGallery-listRow" key={bullet}>
                  <span className="caseGallery-listIndex">{String(i + 1).padStart(2, "0")}</span>
                  <span className="caseGallery-listBody">{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        </li>

        <li className="caseGallery-slide" data-kind="list">
          <div className="caseGallery-copy" data-panel="red">
            <h3 className="caseGallery-listHeading">Stack</h3>

            <ul className="caseGallery-list">
              {project.stack.map((item, i) => (
                <li className="caseGallery-listRow" key={item}>
                  <span className="caseGallery-listIndex">{String(i + 1).padStart(2, "0")}</span>
                  <span className="caseGallery-listTitle">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </li>
      </ul>
    </section>
  );
}
