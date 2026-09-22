import { isConfigured } from '../env'
import { sanityFetch } from './live'

// Lets the site build and render (empty) before the Sanity env vars exist,
// e.g. on the very first Vercel deploy.
export async function fetchContent(query, params = {}) {
  if (!isConfigured) return null
  const { data } = await sanityFetch({ query, params })
  return data
}
