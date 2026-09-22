import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="page">
      <h1 className="page-title">This page isn’t here</h1>
      <p className="prose">It may have been renamed or unpublished. <Link href="/gallery">Browse the gallery</Link>.</p>
    </div>
  )
}
