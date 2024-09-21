// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/auth/callback',
        destination: '/reset-password',
        permanent: false,
      },
    ];
  },
  // Add this configuration to exclude the chat page from static generation
  experimental: {
    excludePages: ['/dashboard/chat'],
  },
};

module.exports = nextConfig;
