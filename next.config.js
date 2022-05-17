/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    dirs: ['components', 'pages'],
  },
};

module.exports = nextConfig;
