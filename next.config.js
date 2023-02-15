/** @type {import('next').NextConfig} */
module.exports = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["links.papareact.com", "image.tmdb.org"],
  },
  optimizeFonts: true,
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/chat",
        permanent: false,
      },
    ];
  },

};
