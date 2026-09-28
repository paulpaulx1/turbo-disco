"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const isExternal = (href) => /^(https?:|mailto:)/.test(href);

// Inline menu on wide screens; hamburger + drop-down panel on phones.
export function NavLinks({ items }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <button
        type="button"
        className="menu-toggle"
        aria-expanded={open}
        aria-controls="site-menu"
        onClick={() => setOpen((o) => !o)}
      >
        <span className="sr-only">{open ? "Close menu" : "Menu"}</span>
        <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
          {open ? (
            <path
              d="M4 4l14 14M18 4L4 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          ) : (
            <path
              d="M3 5h16M3 11h16M3 17h16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          )}
        </svg>
      </button>
      <ul
        id="site-menu"
        className="nav-links"
        data-open={open ? "" : undefined}
      >
        {items.map(({ label, href }) => {
          const active =
            !isExternal(href) &&
            (href === "/" ? pathname === "/" : pathname.startsWith(href));
          return (
            <li key={`${label}-${href}`}>
              {isExternal(href) ? (
                <a
                  href={href}
                  target={href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noreferrer"
                  onClick={close}
                >
                  {label}
                </a>
              ) : (
                <Link
                  href={href}
                  aria-current={active ? "page" : undefined}
                  onClick={close}
                >
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </>
  );
}
