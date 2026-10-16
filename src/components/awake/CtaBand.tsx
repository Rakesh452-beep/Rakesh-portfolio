"use client";

import { useEffect, useRef, useState } from "react";
import SwapArrow from "./SwapArrow";
import { contact, ctaPills } from "@/data/site";

const PILLS = [...ctaPills];

export default function CtaBand({ variant = "page" }: { variant?: "home" | "page" }) {
  const [step, setStep] = useState<1 | 2>(1);
  const [selected, setSelected] = useState(2);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [invalid, setInvalid] = useState(false);

  const reelRef = useRef<HTMLDivElement>(null);
  const [pitch, setPitch] = useState(0);
  const [desktop, setDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1280px)");
    const apply = () => setDesktop(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const measure = () => {
      const reel = reelRef.current;
      if (!reel) return;
      const slots = reel.querySelectorAll<HTMLElement>(".ctaBand-pillSlot");
      if (slots.length > 1) {
        const a = slots[0].getBoundingClientRect();
        const b = slots[1].getBoundingClientRect();
        setPitch(Math.abs(b.top - a.top) || Math.abs(b.left - a.left));
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [desktop]);

  useEffect(() => {
    const reel = reelRef.current;
    if (!reel || !desktop) return;
    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      setSelected((value) => {
        const next = value + (event.deltaY > 0 ? 1 : -1);
        return Math.max(0, Math.min(PILLS.length - 1, next));
      });
    };
    reel.addEventListener("wheel", onWheel, { passive: false });
    return () => reel.removeEventListener("wheel", onWheel);
  }, [desktop]);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setInvalid(true);
      window.setTimeout(() => setInvalid(false), 450);
      return;
    }
    const subject = encodeURIComponent(`New project — ${PILLS[selected]}`);
    const body = encodeURIComponent(
      `Name: ${name || "—"}\nEmail: ${email}\nInterested in: ${PILLS[selected]}\n\n`,
    );
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
  };

  const loop = [...PILLS.slice(-3), ...PILLS, ...PILLS.slice(0, 3)];
  const offsetY = desktop ? -selected * pitch : 0;

  const pillClass = (position: number) =>
    ((position - 3) % PILLS.length + PILLS.length) % PILLS.length === selected ? "" : undefined;

  const pillSelect = (position: number) =>
    setSelected(((position - 3) % PILLS.length + PILLS.length) % PILLS.length);

  return (
    <section className={`ctaBand-band${variant === "home" ? " ctaBand-home" : " ctaBand-page"}`} data-step={step}>
      <div className="ctaBand-stepOne">
        <span className="ctaBand-label">I&rsquo;d like to build a</span>

        <div className="ctaBand-reelWindow">
          <div
            className="ctaBand-reel"
            ref={reelRef}
            style={
              desktop
                ? { transform: `translate(-50%, ${offsetY}px)`, transition: "transform 0.5s var(--e-land-soft)" }
                : undefined
            }
          >
            {loop.map((pill, i) => (
              <span className="ctaBand-pillSlot" key={`${pill}-${i}`}>
                <button
                  type="button"
                  className="ctaBand-pill"
                  data-selected={pillClass(i)}
                  onClick={() => pillSelect(i)}
                  tabIndex={i >= 3 && i < 3 + PILLS.length ? 0 : -1}
                >
                  {pill}
                </button>
              </span>
            ))}
          </div>

          {!desktop && (
            <div className="ctaBand-reelGhost" aria-hidden="true">
              {PILLS.map((pill) => (
                <span className="ctaBand-pillSlot" key={`ghost-${pill}`}>
                  <span className="ctaBand-pill">{pill}</span>
                </span>
              ))}
            </div>
          )}
        </div>

        <button type="button" className="ctaBand-next ctaBand-nextOne" onClick={() => setStep(2)} data-arrow-host>
          next
          <SwapArrow dir="right" className="ctaBand-nextArrow" />
        </button>
      </div>

      <div className="ctaBand-stepTwo">
        <div className="ctaBand-recap">
          <span className="ctaBand-recapLabel">I&rsquo;d like to build a</span>
          <button type="button" className="ctaBand-recapPill" onClick={() => setStep(1)}>
            {PILLS[selected]}
          </button>
        </div>

        <form className="ctaBand-fields" onSubmit={submit}>
          <input
            className="ctaBand-field"
            placeholder="your name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            aria-label="Your name"
          />
          <input
            className="ctaBand-field"
            type="email"
            placeholder="your email"
            value={email}
            data-invalid={invalid ? "" : undefined}
            onChange={(event) => setEmail(event.target.value)}
            aria-label="Your email"
          />
          <button type="submit" className="ctaBand-next" data-arrow-host>
            send it
            <SwapArrow className="ctaBand-nextArrow" />
          </button>
        </form>
      </div>
    </section>
  );
}
