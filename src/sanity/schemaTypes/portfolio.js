import { defineArrayMember, defineField, defineType } from 'sanity'
import { StackIcon } from '@sanity/icons/Stack'

export const portfolio = defineType({
  name: 'portfolio',
  title: 'Portfolio',
  type: 'document',
  icon: StackIcon,
  fields: [
    defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'slug',
      title: 'Page address',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'intro',
      type: 'blockContent',
      description: 'Optional: a few sentences about this group of work.',
    }),
    defineField({
      name: 'artworks',
      title: 'Paintings',
      type: 'array',
      description: 'Drag to reorder. The same painting can appear in more than one portfolio.',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'artwork' }] })],
      validation: (r) => r.unique(),
    }),
  ],
  preview: {
    select: { title: 'title', media: 'artworks.0.image', artworks: 'artworks' },
    prepare({ title, media, artworks = [] }) {
      const n = artworks.length
      return { title, media, subtitle: `${n} painting${n === 1 ? '' : 's'}` }
    },
  },
})
