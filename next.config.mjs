/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
        pathname: "**",
      },
      {
        protocol: "http",
        hostname: "dummyimage.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "quickchart.io",
        pathname: "**",
      },
    ],
  },
  reactStrictMode: false,
};

export default nextConfig;
