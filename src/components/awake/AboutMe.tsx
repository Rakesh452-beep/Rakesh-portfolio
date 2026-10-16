"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { education, profile, summary } from "@/data/site";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function AboutMe() {
  const reduced = useReducedMotion();

  return (
    <section className="aboutMe-section" id="about" aria-label="About me">
      <div className="aboutMe-inner">
        <motion.figure
          className="aboutMe-figure"
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <div className="aboutMe-photoFrame">
            <Image
              src={profile.photo}
              alt={profile.name}
              width={640}
              height={800}
              sizes="(max-width: 767px) 90vw, 30vw"
              className="aboutMe-photo"
              priority={false}
            />
          </div>
          <figcaption className="aboutMe-caption">
            <span className="aboutMe-captionName">{profile.name}</span>
            <span className="aboutMe-captionRole">{profile.role}</span>
          </figcaption>
        </motion.figure>

        <div className="aboutMe-body">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.08 }}
          >
            <h2 className="aboutMe-heading">
              Final-year CSE student
              <br />
              who prefers shipping.
            </h2>
            <p className="aboutMe-summary">{summary}</p>
          </motion.div>

          <motion.dl
            className="aboutMe-stats"
            initial={reduced ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.16 }}
          >
            <div className="aboutMe-stat">
              <dt className="aboutMe-statLabel">CGPA</dt>
              <dd className="aboutMe-statValue">7.09</dd>
              <dd className="aboutMe-statNote">out of 10 · B.Tech CSE</dd>
            </div>
            <div className="aboutMe-stat">
              <dt className="aboutMe-statLabel">Graduating</dt>
              <dd className="aboutMe-statValue">2027</dd>
              <dd className="aboutMe-statNote">GITAM Deemed University</dd>
            </div>
            <div className="aboutMe-stat">
              <dt className="aboutMe-statLabel">Internships</dt>
              <dd className="aboutMe-statValue">02</dd>
              <dd className="aboutMe-statNote">AI/ML research &amp; design</dd>
            </div>
          </motion.dl>

          <motion.ul
            className="aboutMe-education"
            initial={reduced ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.24 }}
          >
            {education.map((item) => (
              <li key={item.school} className="aboutMe-eduRow">
                <span className="aboutMe-eduDegree">{item.degree}</span>
                <span className="aboutMe-eduSchool">{item.school}</span>
                <span className="aboutMe-eduMeta">
                  <span className="aboutMe-eduPeriod">{item.period}</span>
                  <span className="aboutMe-eduScore">{item.score}</span>
                </span>
              </li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
