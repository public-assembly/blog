/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(md|mdx)?$/,
      use: [
        {
          loader: '@mdx-js/loader',
          /** @type {import('@mdx-js/loader').Options} */
          options: {},
        },
      ],
    })
    return config
  },
  images: {
    domains: ['res.cloudinary.com', 'ipfs.io', 'nft-cdn.alchemy.com']
  }
}

module.exports = nextConfig
