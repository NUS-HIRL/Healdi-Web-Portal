import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://fodxn1p0bh.execute-api.ap-southeast-1.amazonaws.com/dev/:path*',
      },
    ];
  },
};

export default nextConfig;
