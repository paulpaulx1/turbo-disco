import { notFound } from 'next/navigation'
import { toPlainText } from 'next-sanity'
import { ArtworkImage } from '@/components/ArtworkImage'
import { BackLink } from '@/components/BackLink'
import { PurchasePanel } from '@/components/BuyButton'
import { RichText } from '@/components/RichText'
import { formatDimensions } from '@/lib/format'
import { isConfigured } from '@/sanity/env'
import { client } from '@/sanity/lib/client'
import { fetchContent } from '@/sanity/lib/fetch'
import { urlFor } from '@/sanity/lib/image'
import { ARTWORK_QUERY, ARTWORK_SLUGS_QUERY, SETTINGS_QUERY } from '@/sanity/lib/queries'

export async function generateStaticParams() {
  if (!isConfigured) return []
  return client.fetch(ARTWORK_SLUGS_QUERY)
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const artwork = await fetchContent(ARTWORK_QUERY, { slug })
  if (!artwork) return {}
  const description = artwork.description ? toPlainText(artwork.description).slice(0, 160) : undefined
  const ogImage = artwork.image?.asset ? urlFor(artwork.image).width(1200).height(630).fit('crop').url() : undefined
  return {
    title: artwork.title,
    description,
    openGraph: { title: artwork.title, description, images: ogImage ? [ogImage] : [] },
  }
}

export default async function ArtworkPage({ params }) {
  const { slug } = await params
  const [artwork, settings] = await Promise.all([
    fetchContent(ARTWORK_QUERY, { slug }),
    fetchContent(SETTINGS_QUERY),
  ])
  if (!artwork) notFound()

  const dimensions = formatDimensions(artwork.dimensions)
  const specs = [dimensions, artwork.medium].filter(Boolean)

  return (
    <div className="page artwork-page">
      <BackLink />
      <article className="artwork">
        <div className="artwork-media">
          <ArtworkImage image={artwork.image} sizes="(max-width: 860px) 100vw, 58vw" priority className="artwork-main-image" />
          {artwork.moreImages?.map((img) => (
            <ArtworkImage key={img._key} image={img} sizes="(max-width: 860px) 100vw, 58vw" />
          ))}
        </div>
        <div className="artwork-info">
          <h1 className="artwork-title">{artwork.title}</h1>
          {specs.length > 0 && (
            <p className="artwork-specs">
              {specs.map((s, i) => (
                <span key={i}>{s}{i < specs.length - 1 && <span className="sep" aria-hidden="true"> | </span>}</span>
              ))}
              {artwork.year && <span className="artwork-year">{artwork.year}</span>}
            </p>
          )}
          <RichText value={artwork.description} className="artwork-description prose" />
          <PurchasePanel artwork={artwork} email={settings?.email} />
        </div>
      </article>
    </div>
  )
}
