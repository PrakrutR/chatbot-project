// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/auth/callback',
        destination: '/reset-password',
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
