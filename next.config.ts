import { NextConfig } from 'next';

const nextConfig = {
  images: {
    remotePatterns: [{ hostname: 'i.postimg.cc' }, { hostname: 'i.ibb.co' }]
  },
  experimental: { reactCompiler: true }
} satisfies NextConfig;

export default nextConfig;
