import { Image } from 'next-sanity/image'
import { urlFor } from '@/sanity/lib/image'

// Paintings are never cropped: the image keeps its own proportions.
export function ArtworkImage({ image, sizes, priority = false, className }) {
  if (!image?.asset) return null
  const width = image.width ?? 1600
  const height = image.height ?? 1600
  return (
    <Image
      className={className}
      src={urlFor(image).url()}
      alt={image.alt ?? ''}
      width={width}
      height={height}
      sizes={sizes}
      priority={priority}
      placeholder={image.lqip ? 'blur' : 'empty'}
      blurDataURL={image.lqip}
    />
  )
}
