"use client";

import { motion, useReducedMotion } from "framer-motion";
import { experience } from "@/data/site";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Internships() {
  const reduced = useReducedMotion();

  return (
    <section className="internships-section" id="internships" aria-label="Internships">
      <div className="internships-inner">
        <div className="internships-head">
          <h2 className="internships-heading">Internships</h2>
          <p className="internships-note">
            Two internships — one in AI/ML research, one in graphic design.
          </p>
        </div>

        <ol className="internships-list">
          {experience.map((role, i) => (
            <motion.li
              key={role.company}
              className="internships-card"
              initial={reduced ? false : { opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.65, ease: EASE, delay: i * 0.1 }}
            >
              <div className="internships-cardTop">
                <span className="internships-index">{String(i + 1).padStart(2, "0")}</span>
                <span className="internships-period">{role.period}</span>
              </div>

              <h3 className="internships-title">{role.title}</h3>
              <p className="internships-company">{role.company}</p>

              <ul className="internships-bullets">
                {role.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
