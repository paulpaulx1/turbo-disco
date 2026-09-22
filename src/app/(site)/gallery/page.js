import Link from 'next/link'
import { ArtworkGrid } from '@/components/ArtworkGrid'
import { ArtworkImage } from '@/components/ArtworkImage'
import { fetchContent } from '@/sanity/lib/fetch'
import { ALL_ARTWORKS_QUERY, PORTFOLIOS_QUERY } from '@/sanity/lib/queries'

export const metadata = { title: 'Gallery' }

export default async function GalleryPage() {
  const [portfolios, artworks] = await Promise.all([
    fetchContent(PORTFOLIOS_QUERY),
    fetchContent(ALL_ARTWORKS_QUERY),
  ])
  return (
    <div className="page">
      {portfolios?.length > 0 && (
        <section aria-labelledby="portfolios-heading" className="section">
          <h1 id="portfolios-heading" className="page-title">Portfolios</h1>
          <ul className="portfolio-list">
            {portfolios.map((p) => (
              <li key={p._id}>
                <Link href={`/portfolios/${p.slug}`} className="portfolio-card">
                  <ArtworkImage image={p.cover} sizes="(max-width: 700px) 100vw, 33vw" />
                  <span className="portfolio-card-title">{p.title}</span>
                  <span className="portfolio-card-count">{p.count ?? 0} {p.count === 1 ? 'painting' : 'paintings'}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
      <section aria-labelledby="all-heading" className="section">
        <h2 id="all-heading" className="page-title">All paintings</h2>
        <ArtworkGrid artworks={artworks} />
      </section>
    </div>
  )
}
