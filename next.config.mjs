/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
  images: {
    unoptimized: true,
  },
  experimental: {
    outputFileTracingIncludes: {
      '/assets/[...path]': ['./assets/**/*'],
      '/api/assets': ['./assets/**/*'],
    },
  },
  webpack: (config) => {
    config.externals = [...(config.externals || [])];
    return config;
  },
};

export default nextConfig;
