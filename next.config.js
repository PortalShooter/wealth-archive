const path = require("path");

module.exports = {
  reactStrictMode: true,
  images: {
    loader: 'imgix',
    path: 'https://frontend.wealth.clayglobaldev.com/',
  },
  env: {
    API_URL: process.env.API_URL,
  },
  swcMinify: false,
  webpack: (config) => {
    const newConfig = {...config};
    newConfig.resolve.alias['@'] = path.resolve(__dirname, 'src/');
    newConfig.resolve.alias['~'] = path.resolve(__dirname);
    return newConfig;
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
}
