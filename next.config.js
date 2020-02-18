require('dotenv').config();
const autoPrefixer = require('autoprefixer');
const hash = require('string-hash');
const path = require('path');
const postStylus = require('poststylus');
const stylus = require('@zeit/next-stylus');
const transpileModules = require('next-transpile-modules');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const withPlugins = require('next-compose-plugins');

const runtimeConfig = {
    // EXAMPLE_CONFIG: process.env.EXAMPLE_CONFIG
};

const nextConfig = {
    distDir: 'build',
    publicRuntimeConfig: runtimeConfig,
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

const stylusConfig = {
    stylusLoaderOptions: {
        'include css': true,
        define: runtimeConfig,
        import: [
            path.resolve('./app/foundation/global'),
            path.resolve('./app/support/index')
        ],
        use: [
            postStylus([autoPrefixer()])
        ]
    }
};

// node_module packages that contain TypeScript that we want to compile.
const withTm = transpileModules([
    //
]);

module.exports = withPlugins([
    [stylus, stylusConfig],
    withTm
], nextConfig);
