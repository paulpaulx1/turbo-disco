import { notFound } from 'next/navigation'
import { ArtworkGrid } from '@/components/ArtworkGrid'
import { RichText } from '@/components/RichText'
import { isConfigured } from '@/sanity/env'
import { client } from '@/sanity/lib/client'
import { fetchContent } from '@/sanity/lib/fetch'
import { PORTFOLIO_QUERY, PORTFOLIO_SLUGS_QUERY } from '@/sanity/lib/queries'

export async function generateStaticParams() {
  if (!isConfigured) return []
  return client.fetch(PORTFOLIO_SLUGS_QUERY)
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const portfolio = await fetchContent(PORTFOLIO_QUERY, { slug })
  return portfolio ? { title: portfolio.title } : {}
}

export default async function PortfolioPage({ params }) {
  const { slug } = await params
  const portfolio = await fetchContent(PORTFOLIO_QUERY, { slug })
  if (!portfolio) notFound()
  return (
    <div className="page">
      <header className="portfolio-header">
        <h1 className="page-title">{portfolio.title}</h1>
        <RichText value={portfolio.intro} className="prose" />
      </header>
      <ArtworkGrid artworks={portfolio.artworks} />
    </div>
  )
}
