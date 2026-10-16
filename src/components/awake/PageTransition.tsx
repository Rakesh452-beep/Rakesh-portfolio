"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { projects } from "@/data/site";

function labelFor(pathname: string) {
  if (pathname === "/") return "Index";
  if (pathname.startsWith("/projects")) return "Work";
  if (pathname.startsWith("/about")) return "About";
  if (pathname.startsWith("/contact")) return "Contact";
  if (pathname.startsWith("/work/")) {
    const slug = pathname.split("/").pop();
    const project = projects.find((p) => p.id === slug);
    return project ? project.name : "Case study";
  }
  return "Not found";
}

export default function PageTransition() {
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const first = useRef(true);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (reduced) return;
    if (first.current) {
      first.current = false;
      return;
    }

    setActive(true);
    const timer = window.setTimeout(() => setActive(false), 900);
    return () => window.clearTimeout(timer);
  }, [pathname, reduced]);

  if (reduced) return null;

  const label = labelFor(pathname);

  return (
    <div
      className="pageTransition-root"
      data-active={active ? "true" : "false"}
      data-mode="wipe"
      aria-hidden="true"
    >
      <motion.div
        className="pageTransition-sheet"
        initial={false}
        animate={{ scaleY: active ? 1 : 0 }}
        transition={{ duration: active ? 0.5 : 0.55, ease: [0.87, 0, 0.13, 1] }}
        style={{ transformOrigin: "50% 0" }}
      />
      <span className="pageTransition-labelMask">
        <motion.span
          className="pageTransition-label"
          style={{ ["--label-chars" as string]: Math.max(label.length, 4) }}
          initial={false}
          animate={{ y: active ? "0%" : "110%" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: active ? 0.08 : 0 }}
        >
          {label}
        </motion.span>
      </span>
    </div>
  );
}
