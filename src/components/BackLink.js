'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

// Returns to wherever the visitor came from on this site (a portfolio, the
// gallery, home). Arriving from outside, it falls back to the gallery.
export function BackLink({ fallback = '/gallery' }) {
  const router = useRouter()

  function handleClick(event) {
    const cameFromSite = document.referrer && new URL(document.referrer).origin === window.location.origin
    if (cameFromSite && window.history.length > 1) {
      event.preventDefault()
      router.back()
    }
  }

  return (
    <Link href={fallback} onClick={handleClick} className="back-link">
      <svg width="10" height="18" viewBox="0 0 10 18" aria-hidden="true">
        <path d="M9 1 1 9l8 8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span>Back</span>
    </Link>
  )
}
