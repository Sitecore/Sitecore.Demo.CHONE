/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {domains: ["mms-delivery.sitecorecloud.io","api.mapbox.com"],
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'api.mapbox.com',
      port: '',
      pathname: '*',
    },
  ],

},
  experimental: {
    // This is experimental but can
    // be enabled to allow parallel threads
    // with nextjs automatic static generation
    workerThreads: false,
    cpus: 1
  }
}

module.exports = nextConfig
