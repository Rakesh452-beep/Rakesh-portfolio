"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { projects } from "@/data/site";
import SwapArrow from "./SwapArrow";

export default function Archive() {
  const panelRef = useRef<HTMLDivElement>(null);
  const deckRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const panel = panelRef.current;
    const deck = deckRef.current;
    if (!panel || !deck) return;
    const rect = panel.getBoundingClientRect();
    deck.style.left = `${event.clientX - rect.left}px`;
    deck.style.top = `${event.clientY - rect.top}px`;
  };

  return (
    <section className="archive-section">
      <h2 className="archive-heading"></h2>

      <div className="archive-panel" ref={panelRef} onMouseMove={handleMove}>
        <div className="archive-deck" ref={deckRef} aria-hidden="true">
          {projects.map((project, i) => (
            <span
              key={project.id}
              className="archive-layer"
              style={
                active === i
                  ? { opacity: 1, transform: "scale(1) rotate(0deg)", filter: "none" }
                  : { opacity: 0, transform: `scale(0.9) rotate(${i % 2 ? 6 : -6}deg)`, filter: "blur(4px)" }
              }
            >
              <Image
                src={project.image}
                alt=""
                fill
                sizes="270px"
                className="archive-layerImage"
              />
            </span>
          ))}
        </div>

        <div className="archive-rows">
          {projects.map((project, i) => (
            <div
              key={project.id}
              className="archive-row"
              data-active={active === i ? "true" : "false"}
            >
              <Link
                href={`/work/${project.id}`}
                className="archive-rowInner"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
              >
                <span className="archive-title">{project.name}</span>

                <Image
                  src={project.image}
                  alt=""
                  width={380}
                  height={440}
                  sizes="(max-width: 1279px) 40vw, 0px"
                  className="archive-rowThumb"
                />

                <span className="archive-meta">
                  <span className="archive-discipline">{project.discipline}</span>
                  <span className="archive-dot" aria-hidden="true" />
                  <span className="archive-year">{project.year}</span>
                </span>
              </Link>
            </div>
          ))}
        </div>

        <div className="archive-more">
          <Link href="/projects" className="archive-viewAll" data-arrow-host>
            View all work <SwapArrow />
          </Link>
        </div>
      </div>
    </section>
  );
}
