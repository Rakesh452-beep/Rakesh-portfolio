"use client";

import Link from "next/link";
import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { services, type Service } from "@/data/site";

const CARD_LIFT = 560;

function ServiceCard({
  service,
  index,
  total,
  progress,
  reduced,
}: {
  service: Service;
  index: number;
  total: number;
  progress: MotionValue<number>;
  reduced: boolean;
}) {
  const start = (index / total) * 0.72;
  const end = Math.min(1, start + 0.42);

  const y = useTransform(progress, [start, end], reduced ? [0, 0] : [CARD_LIFT, 0]);
  const opacity = useTransform(progress, [start, Math.min(end, start + 0.2)], reduced ? [1, 1] : [0, 1]);

  return (
    <li className="servicesStack-item" style={{ ["--card-i" as string]: index + 1 } as React.CSSProperties}>
      <motion.div className="servicesStack-card" style={{ y, opacity }}>
        <span className="servicesStack-number">{service.n}</span>
        <h3 className="servicesStack-cardTitle">{service.title}</h3>
        <p className="servicesStack-cardBody">{service.body}</p>
        <Link href={service.cta.href} className="servicesStack-cardButton" data-arrow-host>
          {service.cta.label}
        </Link>
      </motion.div>
    </li>
  );
}

export default function ServicesStack() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "end 0.6"] });

  return (
    <section id="services" className="servicesStack-section" ref={ref}>
      <h2 className="servicesStack-word">Services</h2>
      <ul className="servicesStack-list">
        {services.map((service, i) => (
          <ServiceCard
            key={service.n}
            service={service}
            index={i}
            total={services.length}
            progress={scrollYProgress}
            reduced={reduced}
          />
        ))}
      </ul>
    </section>
  );
}
