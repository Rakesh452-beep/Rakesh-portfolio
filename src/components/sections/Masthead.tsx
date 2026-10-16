"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { heroRotating, profile } from "@/data/site";
import FluxField from "@/components/gl/FluxField";

const HeroScene = dynamic(() => import("@/components/gl/HeroScene"), { ssr: false });

function Rotating() {
  const [i, setI] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setI((v) => (v + 1) % heroRotating.length), 2600);
    return () => clearInterval(id);
  }, [reduced]);

  if (reduced) return <span className="font-display italic text-terra">{heroRotating[0]}</span>;

  return (
    <span className="relative inline-grid h-[1.3em] overflow-hidden align-bottom">
      <AnimatePresence mode="wait">
        <motion.span
          key={i}
          initial={{ y: "105%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-105%", opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="col-start-1 row-start-1 whitespace-nowrap font-display text-[1.05em] italic text-terra"
        >
          {heroRotating[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

const stats = [
  { k: "Projects shipped", v: "03" },
  { k: "Internships", v: "02" },
  { k: "CGPA", v: "7.09" },
];

export default function Masthead() {
  const reduced = useReducedMotion();

  return (
    <section className="relative flex min-h-[calc(100dvh-4.25rem)] flex-col justify-between overflow-hidden pt-6 pb-8">
      <div aria-hidden className="absolute inset-0">
        <FluxField />
      </div>
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_22%_42%,rgba(246,239,225,0.94)_16%,transparent_62%)]"
      />

      {/* Folio line — the running head of a magazine cover. */}
      <div className="shell relative">
        <div className="rule-double">
          <div className="flex items-baseline justify-between gap-4 pt-3">
            <span className="micro-sm text-ink-3">Vol. I — Portfolio</span>
            <span className="micro-sm hidden text-ink-4 md:block">Full-Stack &amp; AI Tooling</span>
            <span className="micro-sm text-ink-3">Bengaluru, IN</span>
          </div>
        </div>
      </div>

      <div className="shell relative grid flex-1 items-center gap-12 py-10 md:grid-cols-12 md:gap-8 md:py-14">
        <div className="md:col-span-7">
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-x-4 gap-y-2"
          >
            <span className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 animate-blink rounded-full bg-terra" aria-hidden />
              <span className="micro text-terra">{profile.status}</span>
            </span>
            <span className="micro-sm text-ink-4">{profile.timezone}</span>
          </motion.p>

          <h1 className="mt-7 md:mt-9">
            <motion.span
              initial={reduced ? false : { y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
              className="block overflow-hidden"
            >
              <span className="block text-masthead font-semibold">RAKESH</span>
            </motion.span>
            <motion.span
              initial={reduced ? false : { y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1], delay: 0.14 }}
              className="-mt-[0.08em] block overflow-hidden"
            >
              <span className="block bg-gradient-to-r from-terra via-terra to-gold bg-clip-text font-display text-masthead font-normal italic text-transparent">
                Kumar I
              </span>
            </motion.span>
          </h1>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="mt-8 max-w-lg font-display text-xl leading-snug text-ink-2 md:text-2xl">
              I build web apps, AI tooling, and the automation that keeps them running —
              <span className="italic text-ink"> the interface and the machinery behind it.</span>
            </p>

            <div className="mt-6 flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <span className="micro text-ink-3">Currently building with</span>
              <span className="text-lg">
                <Rotating />
              </span>
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link
                href="/projects"
                className="micro border border-ink bg-ink px-6 py-3.5 text-paper transition-colors duration-300 hover:border-terra hover:bg-terra"
              >
                View selected work
              </Link>
              <a
                href="/Rakesh_Kumar_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="micro border border-line-2 px-6 py-3.5 text-ink-2 transition-colors duration-300 hover:border-terra hover:text-terra"
              >
                Résumé ↗
              </a>
            </div>

            <dl className="mt-10 grid max-w-md grid-cols-3 border-t-2 border-ink">
              {stats.map((s) => (
                <div key={s.k} className="border-r border-line pt-4 pr-4 last:border-r-0">
                  <dt className="micro-sm text-ink-4">{s.k}</dt>
                  <dd className="mt-2 font-display text-3xl leading-none text-terra tabular-nums">
                    {s.v}
                  </dd>
                </div>
              ))}
            </dl>
          </motion.div>
        </div>

        <motion.figure
          initial={reduced ? false : { opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.26, ease: [0.16, 1, 0.3, 1] }}
          className="relative hidden md:col-span-5 md:block"
        >
          <div className="brackets relative aspect-[4/5] w-full overflow-hidden border border-line-2 bg-paper-2/50">
            <div aria-hidden className="grid-field absolute inset-0 opacity-60" />
            <div className="absolute inset-0">
              <HeroScene still={!!reduced} />
            </div>

            <span className="micro-sm absolute left-3 top-3 text-ink-4">Fig. 01 — Cast Bronze</span>
            <span className="micro-sm absolute right-3 top-3 text-ink-4">Wax &amp; Clay</span>
            <span className="micro-sm absolute bottom-3 left-3 text-ink-4">
              Move cursor to shape
            </span>
            <span className="micro-sm absolute bottom-3 right-3 text-terra">● Live</span>
          </div>
          <figcaption className="micro-sm mt-3 flex justify-between text-ink-4">
            <span>Plate I</span>
            <span>Generative study, ink on cream</span>
          </figcaption>
        </motion.figure>
      </div>

      {/* Bottom running foot. */}
      <div className="shell relative">
        <div className="rule flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 pt-4">
          <span className="micro-sm text-ink-3">{profile.role}</span>
          <span className="micro-sm hidden text-ink-4 lg:block">
            B.Tech CSE · GITAM Deemed University · Class of 2027
          </span>
          <span className="micro-sm text-terra">Index ↓</span>
        </div>
      </div>
    </section>
  );
}
