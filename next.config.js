/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "ui-avatars.com",
      "firebasestorage.googleapis.com"
    ]
  }
}

module.exports = nextConfig

// /** @type {import('next').NextConfig} */

// const pathPrefix = process.env.NODE_ENV === 'production'
//   ? '/ecovision'
//   : '';

// module.exports = {
//   reactStrictMode: true,
//   assetPrefix: pathPrefix,
//   env: {
//     pathPrefix,
//   },
// }




// module.exports = {
//   assetPrefix: pathPrefix,
//   env: {
//     pathPrefix,
//   },
// };