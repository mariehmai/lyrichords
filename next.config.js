/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    dirs: ['components', 'pages', 'lib', 'hooks'],
  },
};

module.exports = nextConfig;
