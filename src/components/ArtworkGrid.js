import Link from 'next/link'
import { ArtworkImage } from './ArtworkImage'

export function ArtworkGrid({ artworks }) {
  const items = (artworks ?? []).filter(Boolean)
  if (!items.length) {
    return <p className="empty">No paintings here yet. Add one in the Studio at /studio and publish it.</p>
  }
  return (
    <ul className="artwork-grid">
      {items.map((art, i) => (
        <li key={art._id}>
          <Link href={`/artwork/${art.slug}`} className="artwork-card">
            <ArtworkImage image={art.image} sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw" priority={i < 3} />
            <span className="artwork-card-title">{art.title}</span>
            {art.availability === 'sold' && <span className="artwork-card-status">Sold</span>}
          </Link>
        </li>
      ))}
    </ul>
  )
}
