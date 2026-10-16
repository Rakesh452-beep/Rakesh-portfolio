"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { nav, profile } from "@/data/site";

function Clock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="micro-sm text-ink-4 tabular-nums" suppressHydrationWarning>
      {time ? `${time} IST` : "--:-- IST"}
    </span>
  );
}

export default function TopBar() {
  const pathname = usePathname();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 240, damping: 40, mass: 0.4 });

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-50">
      <motion.div
        aria-hidden
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-terra"
      />

      <div className="shell">
        <div className="flex items-center justify-between gap-6 border-b border-line bg-paper/85 py-3.5 backdrop-blur-md">
          <Link href="/" className="group flex items-baseline gap-3">
            <span className="grid h-7 w-7 shrink-0 place-items-center self-center bg-ink font-display text-[13px] font-semibold text-paper transition-colors duration-500 group-hover:bg-terra">
              R
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-display text-[15px] font-semibold tracking-tight">
                {profile.name}
              </span>
              <span className="micro-sm mt-1 hidden text-ink-4 sm:block">{profile.role}</span>
            </span>
          </Link>

          <div className="flex items-center gap-5 md:gap-8">
            <span className="hidden md:block">
              <Clock />
            </span>

            <nav className="flex items-center gap-5 md:gap-7" aria-label="Primary">
              {nav.map((item, i) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className="group flex items-baseline gap-1.5"
                >
                  <span className="micro-sm text-ink-4 transition-colors duration-300 group-hover:text-terra">
                    0{i + 1}
                  </span>
                  <span
                    className={`micro transition-colors duration-300 ${
                      isActive(item.href) ? "text-terra" : "text-ink-2 group-hover:text-ink"
                    }`}
                  >
                    {item.label}
                  </span>
                </Link>
              ))}
            </nav>

            <a
              href={profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="micro border border-ink px-3 py-2 text-ink transition-colors duration-300 hover:border-terra hover:bg-terra hover:text-paper"
            >
              Résumé
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
