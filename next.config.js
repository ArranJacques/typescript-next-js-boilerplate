const autoprefixer = require('autoprefixer');
const path = require('path');
const poststylus = require('poststylus');
const stylus = require('@zeit/next-stylus');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const withPlugins = require('next-compose-plugins');

const nextConfig = {
    distDir: 'build',
    generateBuildId: async () => {
        return null;
    },
    webpack: (config) => {

        // Next.js currently ignores "baseUrl" in tsconfig.json. This fixes it.
        if (config.resolve.plugins) {
            config.resolve.plugins.push(new TsconfigPathsPlugin);
        } else {
            config.resolve.plugins = [new TsconfigPathsPlugin];
        }

        return config;
    }
};

const stylysConfig = {
    stylusLoaderOptions: {
        'include css': true,
        import: [
            path.resolve('./app/foundation/config')
        ],
        use: [
            poststylus([autoprefixer()])
        ]
    }
};


module.exports = withPlugins([[stylus, stylysConfig]], nextConfig);