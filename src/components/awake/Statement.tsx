"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { statements } from "@/data/site";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Statement() {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => {
      setIndex((value) => (value + 1) % statements.length);
    }, 4600);
    return () => window.clearInterval(id);
  }, [reduced]);

  if (reduced) {
    return (
      <section id="about" className="statement">
        <div className="statement-stack">
          <p className="statement-text">{statements[0]}</p>
        </div>
      </section>
    );
  }

  return (
    <section id="about" className="statement">
      <div className="statement-stack">
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            className="statement-text"
            initial={{ opacity: 0, rotateX: -78, y: "45%" }}
            animate={{ opacity: 1, rotateX: 0, y: 0 }}
            exit={{ opacity: 0, rotateX: 78, y: "-45%" }}
            transition={{ duration: 0.7, ease: EASE }}
            style={{ transformOrigin: "50% 50%" }}
          >
            {statements[index]}
          </motion.p>
        </AnimatePresence>
      </div>
    </section>
  );
}
