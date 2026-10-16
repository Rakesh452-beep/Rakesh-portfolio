"use client";

import { useEffect, useState } from "react";
import Navbar from "./Navbar";

export default function StickyNav() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShown(window.scrollY > window.innerHeight * 0.85);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="stickyNav-wrap" data-shown={shown ? "true" : "false"}>
      <div className="stickyNav-bar">
        <Navbar variant="dev" />
      </div>
    </div>
  );
}
