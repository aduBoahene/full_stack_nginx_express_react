import path from 'path';

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

const nextConfig = {
  output: 'export', // Enable static HTML export
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');
    return config;
  },
};

export default nextConfig;


// export default nextConfig;

// const path = require('path');

// module.exports = {
//   // Your Next.js configuration options
//   output: 'export', // This enables static HTML export
//   webpack: (config) => {
//     config.resolve.alias['@'] = path.resolve(__dirname, 'src');
//     return config;
//   },
// };


