/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {domains: ["mms-delivery.sitecorecloud.io"]},
}

module.exports = nextConfig
