import { defineQuery } from 'next-sanity'

const IMAGE = /* groq */ `{
  ...,
  alt,
  "lqip": asset->metadata.lqip,
  "width": asset->metadata.dimensions.width,
  "height": asset->metadata.dimensions.height
}`

const ARTWORK_CARD = /* groq */ `{
  _id,
  title,
  "slug": slug.current,
  year,
  availability,
  image ${IMAGE}
}`

export const SETTINGS_QUERY = defineQuery(`*[_id == "siteSettings"][0]{
  artistName, bio, email, navigation
}`)

export const ARTWORK_QUERY = defineQuery(`*[_type == "artwork" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  year,
  dimensions,
  medium,
  description,
  availability,
  price,
  purchaseLink,
  image ${IMAGE},
  moreImages[] ${IMAGE}
}`)

export const ARTWORK_SLUGS_QUERY = defineQuery(`*[_type == "artwork" && defined(slug.current)]{ "slug": slug.current }`)

export const ALL_ARTWORKS_QUERY = defineQuery(`*[_type == "artwork" && defined(slug.current)]
  | order(year desc, _createdAt desc) ${ARTWORK_CARD}`)

export const HOME_QUERY = defineQuery(`*[_id == "siteSettings"][0].homePortfolio->{
  title,
  "artworks": artworks[]-> ${ARTWORK_CARD}
}`)

export const PORTFOLIOS_QUERY = defineQuery(`*[_type == "portfolio" && defined(slug.current)] | order(title asc){
  _id,
  title,
  "slug": slug.current,
  "count": count(artworks),
  "cover": artworks[0]->image ${IMAGE}
}`)

export const PORTFOLIO_QUERY = defineQuery(`*[_type == "portfolio" && slug.current == $slug][0]{
  title,
  intro,
  "artworks": artworks[]-> ${ARTWORK_CARD}
}`)

export const PORTFOLIO_SLUGS_QUERY = defineQuery(`*[_type == "portfolio" && defined(slug.current)]{ "slug": slug.current }`)
