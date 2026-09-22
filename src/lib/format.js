export const AVAILABILITY = [
  { title: 'Available', value: 'available' },
  { title: 'On hold', value: 'reserved' },
  { title: 'Sold', value: 'sold' },
  { title: 'Not for sale', value: 'notForSale' },
]

export function formatPrice(price) {
  if (price == null) return null
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(price)
}

// { height: 48, width: 36, depth: 2.25, unit: 'in' } → 48" × 36" × 2.25"
export function formatDimensions(d) {
  if (!d) return null
  const values = [d.height, d.width, d.depth].filter((v) => v != null)
  if (!values.length) return null
  const mark = d.unit === 'cm' ? ' cm' : '"'
  return values.map((v) => `${v}${d.unit === 'cm' ? '' : mark}`).join(' × ') + (d.unit === 'cm' ? mark : '')
}
