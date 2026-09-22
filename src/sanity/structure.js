import { CheckmarkCircleIcon } from '@sanity/icons/CheckmarkCircle'
import { CogIcon } from '@sanity/icons/Cog'
import { ImageIcon } from '@sanity/icons/Image'
import { StackIcon } from '@sanity/icons/Stack'
import { TagIcon } from '@sanity/icons/Tag'

export const structure = (S) =>
  S.list()
    .title('Gallery')
    .items([
      S.documentTypeListItem('artwork').title('All paintings').icon(ImageIcon),
      S.listItem()
        .title('Available')
        .icon(TagIcon)
        .child(S.documentList().title('Available').filter('_type == "artwork" && availability == "available"')),
      S.listItem()
        .title('Sold')
        .icon(CheckmarkCircleIcon)
        .child(S.documentList().title('Sold').filter('_type == "artwork" && availability == "sold"')),
      S.divider(),
      S.documentTypeListItem('portfolio').title('Portfolios').icon(StackIcon),
      S.divider(),
      S.listItem()
        .title('Site settings')
        .id('siteSettings')
        .icon(CogIcon)
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
    ])
