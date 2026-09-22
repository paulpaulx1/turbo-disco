/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'cdn.sanity.io' }],
  },
  // Keep the old Figma Sites URLs working (and their SEO) after launch.
  async redirects() {
    return [{ source: '/page/:slug', destination: '/artwork/:slug', permanent: true }]
  },
}

export default nextConfig
