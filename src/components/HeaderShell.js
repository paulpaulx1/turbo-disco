"use client";

import { useEffect, useState } from "react";

// Sticky, opaque header. Adds a hairline under it once the page scrolls,
// so it reads as a separate layer over the paintings.
export function HeaderShell({ children }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="site-header" data-scrolled={scrolled ? "" : undefined}>
      {children}
    </header>
  );
}
