"use client";

import Link from "next/link";
import Navbar from "./Navbar";
import SwapArrow from "./SwapArrow";
import { useMenu } from "./menu-context";
import { contact, nav, socials } from "@/data/site";

export default function Menu() {
  const { open, close } = useMenu();

  return (
    <>
      <div
        id="site-menu"
        className="menuOverlay-overlay"
        data-visible={open ? "true" : "false"}
        data-open={open ? "true" : "false"}
        data-bar-aligned="true"
        aria-hidden={!open}
        style={{ transition: "height 0.7s cubic-bezier(0.16, 1, 0.3, 1)" }}
      >
        <div className="menuOverlay-stage">
          <div className="menuOverlay-bar">
            <Navbar variant="hero" />
          </div>

          <nav className="menuOverlay-nav" aria-label="Site">
            <ul>
              {nav.map((item, i) => (
                <li key={item.href}>
                  <Link href={item.href} className="menuOverlay-navLink" onClick={close}>
                    <span className="menuOverlay-index">{String(i + 1).padStart(2, "0")}</span>
                    <span className="menuOverlay-diamond" aria-hidden="true" />
                    <span className="menuOverlay-rule" aria-hidden="true" />
                    <span className="menuOverlay-labelMask">
                      <span className="menuOverlay-label">{item.label}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="menuOverlay-meta">
            <div className="menuOverlay-socials">
              {socials.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="menuOverlay-metaLink"
                  data-arrow-host
                >
                  {social.label}
                  <SwapArrow />
                </a>
              ))}
            </div>

            <span className="menuOverlay-sayHello">
              <span className="menuOverlay-sayHelloLabel">Say hello</span>
              <a href={`mailto:${contact.email}`} className="menuOverlay-metaLink">
                {contact.email}
              </a>
            </span>
          </div>
        </div>
      </div>
      <div className="menuOverlay-gutter" aria-hidden="true" />
    </>
  );
}
