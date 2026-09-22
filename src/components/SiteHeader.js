import Link from 'next/link'
import { NavLinks } from './NavLinks'

const FALLBACK_NAV = [
  { label: 'Home', href: '/' },
  { label: 'Gallery', href: '/gallery' },
]

export function SiteHeader({ settings }) {
  const items = settings?.navigation?.length ? settings.navigation : FALLBACK_NAV
  return (
    <header className="site-header">
      <Link href="/" className="wordmark">{settings?.artistName ?? 'Gabriel Ceslov'}</Link>
      <nav aria-label="Main">
        <NavLinks items={items} />
      </nav>
    </header>
  )
}
