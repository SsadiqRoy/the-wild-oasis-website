/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'yswzkkjhmugpttpyeoqw.supabase.co',
        port: '',
        protocol: 'https',
        pathname: '/storage/v1/object/public/cabins/**',
      },
    ],
    unoptimized: true,
  },
  distDir: '_next',
};

export default nextConfig;
