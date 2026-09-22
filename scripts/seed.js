// Seeds the dataset with site settings, the "Everything You Are" page from
// gabrielceslovgallery.art, and a starter portfolio.
// Run once: npm run seed   (needs SANITY_API_WRITE_TOKEN in .env.local)
import { createReadStream } from 'node:fs'
import { createClient } from '@sanity/client'

const { NEXT_PUBLIC_SANITY_PROJECT_ID: projectId, NEXT_PUBLIC_SANITY_DATASET: dataset = 'production', SANITY_API_WRITE_TOKEN: token } = process.env

if (!projectId || !token) {
  console.error('Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN in .env.local first.')
  process.exit(1)
}

const client = createClient({ projectId, dataset, token, apiVersion: '2026-09-01', useCdn: false })

const block = (key, text) => ({
  _type: 'block',
  _key: key,
  style: 'normal',
  markDefs: [],
  children: [{ _type: 'span', _key: `${key}s`, text, marks: [] }],
})

console.log('Uploading image…')
const asset = await client.assets.upload('image', createReadStream(new URL('../seed/everything-you-are.jpg', import.meta.url)), {
  filename: 'everything-you-are.jpg',
})

const artwork = {
  _id: 'artwork-everything-you-are',
  _type: 'artwork',
  title: 'Everything You Are',
  slug: { _type: 'slug', current: 'everything-you-are' },
  image: {
    _type: 'image',
    asset: { _type: 'reference', _ref: asset._id },
    alt: 'Abstract canvas of sun-washed coral, aqua and deep blue brushwork with textured collage.',
  },
  dimensions: { height: 48, width: 36, depth: 2.25, unit: 'in' },
  medium: 'Acrylic, collage mixed media/canvas',
  description: [
    block(
      'd1',
      'This painting radiates joy. I followed instinct as color led me—sun-washed corals, tranquil blues, and airy aquas unfolding into one another like memory returning as light. There’s a sense of optimism here, a quiet celebration of presence, of movement, of being. It’s not just what I painted—it’s what I felt: clarity, acceptance, and the soft power of letting myself be seen.',
    ),
  ],
  availability: 'available',
  price: 1600,
}

const portfolio = {
  _id: 'portfolio-selected-works',
  _type: 'portfolio',
  title: 'Selected Works',
  slug: { _type: 'slug', current: 'selected-works' },
  artworks: [{ _type: 'reference', _ref: artwork._id, _key: 'a1' }],
}

const settings = {
  _id: 'siteSettings',
  _type: 'siteSettings',
  artistName: 'Gabriel Ceslov',
  bio: 'I am an abstract artist based in New York.\nThe paintings are for sale. Shipping worldwide. Any size and surface prints are also available on demand.',
  email: 'gabriel@gabrielceslovgallery.art',
  navigation: [
    { _key: 'n1', _type: 'navItem', label: 'Home', href: '/' },
    { _key: 'n2', _type: 'navItem', label: 'Gallery', href: '/gallery' },
    { _key: 'n3', _type: 'navItem', label: 'UX Design', href: 'https://gabrielceslov.com/' },
    { _key: 'n4', _type: 'navItem', label: 'Contact', href: 'mailto:gabriel@gabrielceslovgallery.art' },
  ],
}

await client
  .transaction()
  .createOrReplace(artwork)
  .createOrReplace(portfolio)
  .createIfNotExists(settings) // never overwrite settings Gabriel has edited
  .commit()

console.log('Done. Open /studio and /artwork/everything-you-are')
