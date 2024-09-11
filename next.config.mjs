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
                source: '/index.php',
                destination: '/',
            },
        ]
    },

};

export default nextConfig;
