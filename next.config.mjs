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
      {
        protocol: "https",
        hostname: "utfs.io",
        port: "",
      },
    ],
  },
  // Skip font optimization to avoid Google Fonts fetch during build
  optimizeFonts: false,
  // output: "export",
};

export default nextConfig;
