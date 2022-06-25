/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    dirs: ['components', 'pages', 'lib'],
  },
};

module.exports = nextConfig;
