import { defineLive } from 'next-sanity/live'
import { client } from './client'

// Published content streams to open pages in real time: hit Publish in the
// Studio and any browser tab showing that artwork updates without a refresh.
export const { sanityFetch, SanityLive } = defineLive({ client })
