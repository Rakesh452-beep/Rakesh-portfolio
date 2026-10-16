"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionStyle } from "framer-motion";
import { projects } from "@/data/site";

const POSITIONS = [
  { x: "8.8889vw", y: "0vw" },
  { x: "66.1806vw", y: "23.9583vw" },
  { x: "15.3472vw", y: "56.3194vw" },
];

const runs = [
  [70, -70],
  [150, -150],
  [30, -30],
];

export default function CaseGrid({ bare = false }: { bare?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const y0 = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : runs[0]);
  const y1 = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : runs[1]);
  const y2 = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : runs[2]);
  const ys = [y0, y1, y2];

  return (
    <section id="projects" className={`caseGrid-section${bare ? " caseGrid-sectionBare" : ""}`}>
      <h2 className="caseGrid-heading">My projects</h2>

      <div className="caseGrid-stage">
        <svg
          className="caseGrid-thread"
          viewBox="0 0 1440 1750"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <path
            d="M 128 0 C 320 280, 60 420, 540 560 C 920 680, 1120 520, 1180 840 C 1240 1180, 880 1320, 520 1480 C 200 1600, 80 1680, 0 1750"
            fill="none"
            stroke="#fcd3dd"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        <div
          className="caseGrid-grid"
          ref={ref}
          style={{ ["--stage-h" as string]: "121.4583vw" } as React.CSSProperties}
        >
          {projects.slice(0, 3).map((project, i) => (
            <motion.article
              key={project.id}
              className="caseGrid-item"
              style={
                {
                  ["--x" as string]: POSITIONS[i].x,
                  ["--y" as string]: POSITIONS[i].y,
                  y: ys[i],
                } as MotionStyle
              }
            >
              <Link href={`/work/${project.id}`} className="caseCard-card" data-arrow-host>
                <span className="caseCard-thumb" style={{ position: "relative" }}>
                  <Image
                    src={project.image}
                    alt={project.name}
                    width={380}
                    height={440}
                    className="caseTile-img"
                  />
                </span>
                <span className="caseCard-meta">
                  <span className="caseCard-discipline">{project.discipline}</span>
                  <span className="caseCard-title">{project.name}</span>
                </span>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
