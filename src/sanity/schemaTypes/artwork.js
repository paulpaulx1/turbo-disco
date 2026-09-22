import { defineField, defineType } from 'sanity'
import { ImageIcon } from '@sanity/icons/Image'
import { AVAILABILITY, formatPrice } from '../../lib/format'

export const artwork = defineType({
  name: 'artwork',
  title: 'Artwork',
  type: 'document',
  icon: ImageIcon,
  groups: [
    { name: 'work', title: 'Artwork', default: true },
    { name: 'sales', title: 'Sales' },
  ],
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      group: 'work',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Page address',
      type: 'slug',
      group: 'work',
      description: 'The end of this painting’s URL. Click Generate to build it from the title.',
      options: { source: 'title', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'image',
      title: 'Main image',
      type: 'image',
      group: 'work',
      description: 'Upload the largest file you have. Drag the circle to set the focal point for cropped views.',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Image description',
          type: 'string',
          description: 'Describe the painting for people using screen readers, e.g. “Abstract canvas of coral, aqua and blue brushwork.”',
        }),
      ],
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'moreImages',
      title: 'More views',
      type: 'array',
      group: 'work',
      description: 'Optional: details, side view, the painting on a wall.',
      of: [{ type: 'image', options: { hotspot: true }, fields: [{ name: 'alt', title: 'Image description', type: 'string' }] }],
      options: { layout: 'grid' },
    }),
    defineField({
      name: 'year',
      type: 'number',
      group: 'work',
      validation: (r) => r.integer().min(1900).max(2100),
    }),
    defineField({
      name: 'dimensions',
      type: 'object',
      group: 'work',
      options: { columns: 4 },
      fields: [
        defineField({ name: 'height', type: 'number' }),
        defineField({ name: 'width', type: 'number' }),
        defineField({ name: 'depth', type: 'number' }),
        defineField({
          name: 'unit',
          type: 'string',
          initialValue: 'in',
          options: { list: [{ title: 'inches', value: 'in' }, { title: 'cm', value: 'cm' }] },
        }),
      ],
    }),
    defineField({
      name: 'medium',
      type: 'string',
      group: 'work',
      description: 'e.g. Acrylic, collage mixed media on canvas',
    }),
    defineField({
      name: 'description',
      title: 'About this painting',
      type: 'blockContent',
      group: 'work',
    }),
    defineField({
      name: 'availability',
      type: 'string',
      group: 'sales',
      initialValue: 'available',
      options: { list: AVAILABILITY, layout: 'radio' },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'price',
      title: 'Price (USD)',
      type: 'number',
      group: 'sales',
      description: 'Leave empty to show “Price on request”.',
      validation: (r) => r.min(0),
    }),
    defineField({
      name: 'purchaseLink',
      title: 'Buy button link',
      type: 'url',
      group: 'sales',
      description: 'A Stripe payment link or shop page. Leave empty and Buy opens an email to you with the painting’s name filled in.',
      hidden: ({ document }) => document?.availability !== 'available',
    }),
  ],
  orderings: [
    { title: 'Newest first', name: 'yearDesc', by: [{ field: 'year', direction: 'desc' }, { field: 'title', direction: 'asc' }] },
    { title: 'Title A–Z', name: 'titleAsc', by: [{ field: 'title', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'title', media: 'image', price: 'price', availability: 'availability', year: 'year' },
    prepare({ title, media, price, availability, year }) {
      const status = AVAILABILITY.find((a) => a.value === availability)?.title
      const parts = [year, availability === 'available' ? formatPrice(price) : status].filter(Boolean)
      return { title, media, subtitle: parts.join(' · ') }
    },
  },
})
