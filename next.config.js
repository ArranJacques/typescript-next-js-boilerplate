require('dotenv').config();
const autoPrefixer = require('autoprefixer');
const hash = require('string-hash');
const path = require('path');
const postStylus = require('poststylus');
const stylus = require('@zeit/next-stylus');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const withPlugins = require('next-compose-plugins');
const withTM = require('next-transpile-modules');

const nextConfig = {
    distDir: 'build',
    publicRuntimeConfig: {
        // EXAMPLE_CONFIG: process.env.EXAMPLE_CONFIG
    },
    webpack: (config) => {

        // Next.js currently ignores "baseUrl" in tsconfig.json. This fixes it.
        if (config.resolve.plugins) {
            config.resolve.plugins.push(new TsconfigPathsPlugin);
        } else {
            config.resolve.plugins = [new TsconfigPathsPlugin];
        }

        // For inline SVGs.
        config.module.rules.push({
            test: /\.svg$/,
            use: ({ issuer, resource }) => ({
                loader: '@svgr/webpack',
                options: {
                    dimensions: false,
                    svgo: true,
                    svgoConfig: {
                        plugins: [
                            { cleanupListOfValues: true },
                            { cleanupNumericValues: true },
                            { removeDesc: true },
                            { removeEmptyAttrs: true },
                            { removeEmptyContainers: true },
                            { removeEmptyText: true },
                            { removeRasterImages: true },
                            { removeTitle: true },
                            { removeUselessDefs: true },
                            { removeUnusedNS: true },
                            { cleanupIDs: { prefix: `${hash(issuer + resource)}` } }
                        ]
                    }
                }
            })
        });

        return config;
    }
};

const stylysConfig = {
    stylusLoaderOptions: {
        'include css': true,
        import: [
            path.resolve('./app/foundation/index'),
            path.resolve('./app/support/index')
        ],
        use: [
            postStylus([autoPrefixer()])
        ]
    }
};

// node_module packages that contain TypeScript that we want to compile.
const compileModules = {
    transpileModules: []
};

module.exports = withPlugins([
    [stylus, stylysConfig],
    [withTM, compileModules]
], nextConfig);
