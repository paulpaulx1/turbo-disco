'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const isExternal = (href) => /^(https?:|mailto:)/.test(href)

export function NavLinks({ items }) {
  const pathname = usePathname()
  return (
    <ul className="nav-links">
      {items.map(({ label, href }) => {
        const active = !isExternal(href) && (href === '/' ? pathname === '/' : pathname.startsWith(href))
        return (
          <li key={`${label}-${href}`}>
            {isExternal(href) ? (
              <a href={href} target="_blank" rel="noreferrer">{label}</a>
            ) : (
              <Link href={href} aria-current={active ? 'page' : undefined}>{label}</Link>
            )}
          </li>
        )
      })}
    </ul>
  )
}
