import { PortableText } from 'next-sanity'

const components = {
  marks: {
    link: ({ value, children }) => {
      const external = /^https?:\/\//.test(value?.href ?? '')
      return (
        <a href={value?.href} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}>
          {children}
        </a>
      )
    },
  },
}

export function RichText({ value, className }) {
  if (!value?.length) return null
  return (
    <div className={className}>
      <PortableText value={value} components={components} />
    </div>
  )
}
