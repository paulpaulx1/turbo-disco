import { Figtree } from 'next/font/google'
import './globals.css'

const figtree = Figtree({ subsets: ['latin'], variable: '--font-sans', display: 'swap' })

export const metadata = {
  title: { default: 'Gabriel Ceslov', template: '%s | Gabriel Ceslov' },
  description: 'Abstract paintings by Gabriel Ceslov, New York.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={figtree.variable}>
      <body>{children}</body>
    </html>
  )
}
