/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    forceSwcTransforms: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      {
        source: '/api/login',
        destination: 'http://localhost:3003/login',
        permanent: true,
      },
      {
        source: '/api/checkID',
        destination: 'http://localhost:3003/checkID',
        permanent: true,
      },
      {
        source: '/api/signUp',
        destination: 'http://localhost:3003/signUp',
        permanent: true,
      },
    ]
  }
};

export default nextConfig;
