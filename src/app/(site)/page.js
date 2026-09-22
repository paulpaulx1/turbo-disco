import { ArtworkGrid } from '@/components/ArtworkGrid'
import { fetchContent } from '@/sanity/lib/fetch'
import { ALL_ARTWORKS_QUERY, HOME_QUERY } from '@/sanity/lib/queries'

export default async function HomePage() {
  const featured = await fetchContent(HOME_QUERY)
  const artworks = featured?.artworks ?? (await fetchContent(ALL_ARTWORKS_QUERY))
  return (
    <div className="page">
      <ArtworkGrid artworks={artworks} />
    </div>
  )
}
