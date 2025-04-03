/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost'], // 添加允许的图片域名
  },
  i18n: {
    locales: ['zh'],
    defaultLocale: 'zh',
  },
}

module.exports = nextConfig 