/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  redirects: [
    {
      source: "/((?!manutencao).*)",
      destination: "/manutencao.html",
      permanent: false
    }
  ]
}

module.exports = nextConfig
