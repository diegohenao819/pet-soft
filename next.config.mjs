/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'bytegrad.com',
        
      },
      {
        protocol: 'https',
        hostname: 'thumbs.dreamstime.com',
        
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        
      },
      {
        protocol: 'https',
        hostname: 'th.bing.com',
      }
    ],
  },
};

export default nextConfig;
