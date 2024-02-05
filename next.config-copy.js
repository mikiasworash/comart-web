/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:5000/api/:path*",
      },
    ];
  },

  images: {
    domains: ["res.cloudinary.com", "placehold.co"],
  },

  env: {
    NEXT_PUBLIC_CLOUDINARY_URL:
      "https://api.cloudinary.com/v1_1/<insert_cloudinary_key>/image/upload",
  },
};

module.exports = nextConfig;
