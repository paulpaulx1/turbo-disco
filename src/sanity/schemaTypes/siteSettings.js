import { defineArrayMember, defineField, defineType } from 'sanity'
import { CogIcon } from '@sanity/icons/Cog'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({ name: 'artistName', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'bio',
      title: 'Footer bio',
      type: 'text',
      rows: 3,
    }),
    defineField({ name: 'email', type: 'email' }),
    defineField({
      name: 'homePortfolio',
      title: 'Portfolio on the home page',
      type: 'reference',
      to: [{ type: 'portfolio' }],
      description: 'Leave empty to show every painting, newest first.',
    }),
    defineField({
      name: 'navigation',
      title: 'Menu',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'navItem',
          fields: [
            defineField({ name: 'label', type: 'string', validation: (r) => r.required() }),
            defineField({
              name: 'href',
              title: 'Link',
              type: 'string',
              description: 'A page on this site (/gallery) or a full web address (https://…).',
              validation: (r) => r.required(),
            }),
          ],
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: 'Site settings' }) },
})
