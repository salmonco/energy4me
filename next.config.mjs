/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      //   {
      //     source: "/api/:path*",
      //     destination: `${process.env.NEXT_PUBLIC_API_URL}/:path*`,
      //   },
      {
        source: "/public-api/:path*",
        destination: "http://apis.data.go.kr/:path*",
      },
    ];
  },
};

export default nextConfig;
