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
    trailingSlash: true,
    exportPathMap: async function (
        defaultPathMap,
        { dev, dir, outDir, distDir, buildId }
    ) {
        return {
            "/": { page: "/" },
        };
    },
};

export default nextConfig;
