//import withPlaiceholder from '@plaiceholder/next'
/** @type {import('next').NextConfig} */

const nextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  transpilePackages: ['react-tweet'],
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: '*.twimg.com', pathname: '/**' },
      { protocol: 'https', hostname: 'i.postimg.cc', pathname: '/**' },
      { protocol: 'https', hostname: 'cdn.sanity.io', pathname: '/**' },
      { protocol: 'https', hostname: 'cdni.pornpics.com', pathname: '/**' },
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io',
        pathname: '/mstqmarfn/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        pathname: '/**',
      },
    ],
    dangerouslyAllowSVG: true,
  },
}
//export default withPlaiceholder(nextConfig)
export default nextConfig
