import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.nhcs.com.sg",
        port: "",
        pathname: "/sites/shcommonassets/Assets/**"
      },
      {
        protocol: "https",
        hostname: "ch-api.healthhub.sg",
        port: "",
        pathname: "/api/public/content/**"
      },
      {
        protocol: "https",
        hostname: "i3.ytimg.com",
        port: "",
        pathname: "/vi/**"
      }
    ]
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination:
          "https://fodxn1p0bh.execute-api.ap-southeast-1.amazonaws.com/dev/:path*"
      }
    ]
  }
}

export default nextConfig
