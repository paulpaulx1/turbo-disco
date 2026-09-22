import { artwork } from './artwork'
import { blockContent } from './blockContent'
import { portfolio } from './portfolio'
import { siteSettings } from './siteSettings'

export const schemaTypes = [artwork, portfolio, siteSettings, blockContent]
export const singletonTypes = new Set(['siteSettings'])
