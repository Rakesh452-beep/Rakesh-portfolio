"use client";

import { motion, useReducedMotion } from "framer-motion";
import { skills } from "@/data/site";
import { skillIcons } from "./skillIcons";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Skills() {
  const reduced = useReducedMotion();

  return (
    <section className="skills-section" id="skills" aria-label="Skills">
      <div className="skills-inner">
        <div className="skills-head">
          <h2 className="skills-heading">Skills</h2>
          <p className="skills-note">
            The stack I reach for daily — front to back, plus the automation around it.
          </p>
        </div>

        <div className="skills-grid">
          {skills.map((group, i) => (
            <motion.div
              key={group.label}
              className="skills-group"
              initial={reduced ? false : { opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, ease: EASE, delay: Math.min(i * 0.05, 0.3) }}
            >
              <h3 className="skills-groupLabel">{group.label}</h3>
              <ul className="skills-chips">
                {group.items.map((item) => {
                  const Icon = skillIcons[item];
                  return (
                    <li key={item} className="skills-chip">
                      {Icon ? <Icon className="skills-chipIcon" aria-hidden /> : null}
                      <span className="skills-chipLabel">{item}</span>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
