import { formatPrice } from '@/lib/format'

function inquiryHref(email, title, subject) {
  if (!email) return null
  const params = new URLSearchParams({ subject: `${subject}: ${title}` })
  return `mailto:${email}?${params.toString().replace(/\+/g, '%20')}`
}

export function PurchasePanel({ artwork, email }) {
  const { availability, price, purchaseLink, title } = artwork

  if (availability === 'sold') {
    return (
      <div className="purchase">
        <p className="price">Sold</p>
        {email && <a className="button button-quiet" href={inquiryHref(email, title, 'Print request')}>Ask about prints</a>}
      </div>
    )
  }

  if (availability === 'reserved' || availability === 'notForSale') {
    return (
      <div className="purchase">
        <p className="price">{availability === 'reserved' ? 'On hold' : 'Not for sale'}</p>
        {email && <a className="button" href={inquiryHref(email, title, 'Inquiry')}>Inquire</a>}
      </div>
    )
  }

  const href = purchaseLink || inquiryHref(email, title, 'Purchase')
  return (
    <div className="purchase">
      <p className="price">{formatPrice(price) ?? 'Price on request'}</p>
      {href && (
        <a className="button" href={href} {...(purchaseLink ? { target: '_blank', rel: 'noreferrer' } : {})}>
          Buy
        </a>
      )}
    </div>
  )
}
