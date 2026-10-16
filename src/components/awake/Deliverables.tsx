"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { approach } from "@/data/site";

export default function Deliverables() {
  const reduced = useReducedMotion();
  const items = approach;
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => {
      setActive((value) => (value + 1) % items.length);
    }, 4200);
    return () => window.clearInterval(id);
  }, [reduced, items.length]);

  return (
    <section className="deliverables-section" aria-label="How I work">
      <div className="deliverables-strip">
        {items.map((item, i) => (
          <button
            type="button"
            key={item.n}
            className="deliverables-item"
            data-active={active === i ? "" : undefined}
            aria-pressed={active === i}
            onClick={() => setActive(i)}
          >
            <span className="deliverables-collapsed">
              <span className="deliverables-index">{item.n}</span>
              <span className="deliverables-mark" aria-hidden="true" />
              <span className="deliverables-stepLabel">{item.title}</span>
            </span>

            <span className="deliverables-expanded">
              <span className="deliverables-cardTitle">{item.title}</span>
            </span>
          </button>
        ))}
      </div>

      <div className="deliverables-reading">
        <h2 className="deliverables-readTitle">
          <motion.span
            key={`title-${active}`}
            style={{ display: "block" }}
            initial={reduced ? false : { y: "105%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {items[active].title}
          </motion.span>
        </h2>

        <motion.p
          key={`body-${active}`}
          className="deliverables-readBody"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          {items[active].body}
        </motion.p>
      </div>
    </section>
  );
}
