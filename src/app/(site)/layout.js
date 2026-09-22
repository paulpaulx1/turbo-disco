import { SiteFooter } from '@/components/SiteFooter'
import { SiteHeader } from '@/components/SiteHeader'
import { isConfigured } from '@/sanity/env'
import { fetchContent } from '@/sanity/lib/fetch'
import { SanityLive } from '@/sanity/lib/live'
import { SETTINGS_QUERY } from '@/sanity/lib/queries'

export default async function SiteLayout({ children }) {
  const settings = await fetchContent(SETTINGS_QUERY)
  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <SiteHeader settings={settings} />
      <main id="main">{children}</main>
      <SiteFooter settings={settings} />
      {isConfigured && <SanityLive />}
    </>
  )
}
