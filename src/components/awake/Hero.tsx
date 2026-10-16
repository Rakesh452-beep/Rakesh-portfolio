"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Navbar from "./Navbar";
import SwapArrow from "./SwapArrow";
import HeroCoins from "./HeroCoins";
import { contact, heroHeadline, heroKicker, profile } from "@/data/site";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const reduced = useReducedMotion();
  const [intro, setIntro] = useState<"pending" | "done">(reduced ? "done" : "pending");
  const [count, setCount] = useState(0);
  const [loaderGone, setLoaderGone] = useState(!!reduced);

  useEffect(() => {
    if (reduced) {
      setIntro("done");
      setLoaderGone(true);
      return;
    }

    let raf = 0;
    const start = performance.now();
    const duration = 1500;

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      setCount(Math.round(progress * 100));
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setIntro("done");
        window.setTimeout(() => setLoaderGone(true), 950);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  const revealed = intro === "done";

  return (
    <>
      <AnimatePresence>
        {!loaderGone && (
          <motion.div
            className="hero-loader"
            aria-hidden="true"
            initial={{ opacity: 1 }}
            exit={{ y: "-101%" }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <span className="hero-loaderCounter">{String(count).padStart(3, "0")}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="hero-frame">
        <section className="hero" data-intro={intro}>
          <HeroCoins ready={revealed} />
          <div className="hero-inner">
            <div className="hero-navSlot">
              <Navbar variant="hero" />
            </div>

            <h1 className="hero-headline" aria-label={`${heroHeadline.line1} — ${heroHeadline.line2}`} data-split-heading="true" data-coins-above="">
              {[heroHeadline.line1, heroHeadline.line2].map((line, i) => (
                <span key={i} data-split-line={i === 1 ? "start" : "justify"} style={{ display: "block", overflow: "hidden" }}>
                  <motion.span
                    style={{ display: "block", textAlign: i === 1 ? "left" : "justify", textAlignLast: i === 1 ? "auto" : "justify" }}
                    initial={reduced ? false : { y: "115%" }}
                    animate={{ y: revealed ? 0 : "115%" }}
                    transition={{ duration: 0.95, ease: EASE, delay: 0.05 + i * 0.09 }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              className="hero-kicker"
              data-coins-above=""
              initial={reduced ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: revealed ? undefined : 0, y: revealed ? 0 : 12 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.5 }}
            >
              {heroKicker}
            </motion.p>

            <div className="hero-meta" data-coins-floor="">
              <span className="hero-metaRule" />
              <span className="hero-portrait">
                <Image
                  src={profile.photo}
                  alt={profile.name}
                  width={96}
                  height={96}
                  className="hero-portraitImg"
                />
              </span>
              <span className="hero-metaItem">
                <span className="hero-metaLabel">Based in: </span>
                {profile.location}
              </span>
              <span className="hero-metaItem hero-metaCgpa">
                <span className="hero-metaLabel">CGPA: </span>
                7.09 / 10
              </span>
              <span className="hero-metaItem hero-metaSay">
                <span className="hero-metaLabel">Say hello: </span>
                <a href={`mailto:${contact.email}`} className="hero-metaMail">
                  {contact.email}
                </a>
              </span>
              <a
                href={profile.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-resumeBtn"
                data-arrow-host
              >
                Résumé <SwapArrow />
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
