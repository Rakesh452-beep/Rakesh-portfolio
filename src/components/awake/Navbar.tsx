"use client";

import Link from "next/link";
import Logo from "./Logo";
import { useMenu } from "./menu-context";

export default function Navbar({ variant = "dev" }: { variant?: "hero" | "dev" }) {
  const { open, toggle } = useMenu();

  return (
    <header className={`navbar navbar-${variant}`} data-site-nav={variant}>
      <Link href="/" className="navbar-logoLink" aria-label="Rakesh Kumar I — home">
        <Logo />
      </Link>

      <div className="navbar-actions">
        <Link href="/contact" className="navbar-contactPill">
          Get in touch
        </Link>

        <button
          type="button"
          className="navbar-menuPill"
          data-open={open ? "true" : "false"}
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={toggle}
        >
          <span className="navbar-pillLabel">
            <span className="navbar-pillWordOut">Menu</span>
            <span className="navbar-pillWordIn">Close</span>
          </span>
          <span className="navbar-burger" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
        </button>
      </div>
    </header>
  );
}
