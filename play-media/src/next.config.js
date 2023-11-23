/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {domains: ["mms-delivery.sitecorecloud.io", "mms-delivery-staging.sitecore-staging.cloud"]},
  experimental: {
    // This is experimental but can
    // be enabled to allow parallel threads
    // with nextjs automatic static generation
    workerThreads: false,
    cpus: 1
  }
}

module.exports = nextConfig
