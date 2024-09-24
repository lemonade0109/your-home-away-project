/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
      {
        protocol: "https",
        hostname: "ckhwuwygvapqvoalaehb.supabase.co",
      },
    ],
  },
  // output: "export",
};

export default nextConfig;
