/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'picsum.photos',
      'placeimg.com',
      'klpk-api.lut.web.id',
      'api.komunitaspatrickkellan.com',
      'api-dev.komunitaspatrickkellan.com',
    ],
    minimumCacheTTL: 60,
  },
}

// eslint-disable-next-line @typescript-eslint/no-var-requires
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(nextConfig)
