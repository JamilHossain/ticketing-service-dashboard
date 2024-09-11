/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: {
            allowedOrigins: [
                'localhost:3008', // localhost
                'feedback.asdbd.com', // Codespaces
            ],
        },
    },
    async rewrites() {
        return [
          {
            source: '/backend/:path*',
            destination: 'http://localhost:3007/:path*',
          },
        ];
      },
      async headers() {
        return [
          {
            source: '/(.*)',
            headers: [
              {
                key: 'X-Forwarded-Proto',
                value: 'https',
              },
            ],
          },
        ];
      },
      output: 'standalone',
      poweredByHeader: false,
      reactStrictMode: true,
};

export default nextConfig;
