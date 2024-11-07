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
      {
        source: '/api/redis/exist',
        destination: 'http://localhost:3003/redis/exist',
        permanent: true,
      },
      {
        source: '/api/logout',
        destination: 'http://localhost:3003/logout',
        permanent: true,
      },
      {
        source: '/api/delete/account',
        destination: 'http://localhost:3003/delete/account',
        permanent: true,
      },
    ]
  }
};

export default nextConfig;
