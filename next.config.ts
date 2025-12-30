import type { NextConfig } from 'next';

const isGitHubPages =
  process.env.GITHUB_PAGES === 'true' || process.env.GITHUB_ACTIONS === 'true';

const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? '';
const basePath = isGitHubPages && repoName ? `/${repoName}` : '';

const nextConfig: NextConfig = {
  // Strict mode for catching bugs early
  reactStrictMode: true,

  ...(isGitHubPages
    ? {
        output: 'export',
        basePath,
        assetPrefix: basePath,
        trailingSlash: true,
      }
    : {
        // Security headers (not supported for static export / GitHub Pages)
        async headers() {
          return [
            {
              source: '/:path*',
              headers: [
                {
                  key: 'X-Frame-Options',
                  value: 'DENY',
                },
                {
                  key: 'X-Content-Type-Options',
                  value: 'nosniff',
                },
                {
                  key: 'Referrer-Policy',
                  value: 'strict-origin-when-cross-origin',
                },
                {
                  key: 'X-XSS-Protection',
                  value: '1; mode=block',
                },
              ],
            },
          ];
        },
      }),

  // Disable x-powered-by header
  poweredByHeader: false,
};

export default nextConfig;
