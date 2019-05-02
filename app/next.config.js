const path = require('path');
const glob = require('glob');
const NextWorkboxPlugin = require('next-workbox-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');

module.exports = {
    webpack: (config, { isServer, buildId, dev }) => {
        config.node = {
          fs: 'empty',
        };

        config.module.rules.push(
            {
                test: /\.(css|scss)/,
                loader: 'emit-file-loader',
                options: {
                    name: 'dist/[path][name].[ext]'
                }
            }
            ,
            {
                test: /\.css$/,
                use: ['babel-loader', 'raw-loader', 'postcss-loader']
            }
            ,
            {
                test: /\.s(a|c)ss$/,
                use: ['babel-loader', 'raw-loader', 'postcss-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            includePaths: ['styles', 'node_modules']
                                .map((d) => path.join(__dirname, d))
                                .map((g) => glob.sync(g))
                                .reduce((a, c) => a.concat(c), [])
                        }
                    }
                ]
            },
            {
              test: /.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
              use: [
                  {
                      loader: "url-loader?limit=10000&mimetype=application/font-woff",
                      options: {
                          includePaths: ['styles', 'node_modules']
                              .map((d) => path.join(__dirname, d))
                              .map((g) => glob.sync(g))
                              .reduce((a, c) => a.concat(c), [])
                      }
                  }
              ]
            },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
        );

        const workboxOptions = {
          clientsClaim: true,
          skipWaiting: true,
          globPatterns: ['.next/static/*', '.next/static/chunks/*', '.next/static/css/*', '.next/static/runtime/*'],
          modifyUrlPrefix: {
            '.next': '/_next',
          },
          runtimeCaching: [
            {
              urlPattern: '/',
              handler: 'networkFirst',
              options: {
                cacheName: 'html-cache',
              },
            },
            {
              urlPattern: /[^3]\/app\//,
              handler: 'networkFirst',
              options: {
                cacheName: 'html-cache',
              },
            },
            {
              urlPattern: new RegExp('^https://jsonplaceholder.typicode.com/todos'),
              handler: 'staleWhileRevalidate',
              options: {
                cacheName: 'api-cache',
                cacheableResponse: {
                  statuses: [200],
                },
              },
            },
            {
              urlPattern: /.*\.(?:png|jpg|jpeg|svg|gif)/,
              handler: 'cacheFirst',
              options: {
                cacheName: 'image-cache',
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
          ],
        };

        if (!isServer && !dev) {
          config.plugins.push(
            new NextWorkboxPlugin({
              buildId,
              ...workboxOptions,
            }),
            new WebpackPwaManifest({
              filename: 'static/manifest.json',
              name: 'Next PWA',
              short_name: 'Next-PWA',
              description: 'A Movie browsing PWA using Next.js and Google Workbox',
              background_color: '#ffffff',
              theme_color: '#5755d9',
              display: 'standalone',
              orientation: 'portrait',
              fingerprints: false,
              start_url: '/',
              inject: true,
              ios: true,
              prefer_related_applications: false,
              icons: [
                {
                  src: path.resolve('static/favicon.png'),
                  destination: '/static',
                  sizes: [96, 128, 192, 256, 384, 512],
                  ios: true
                },
                {
                  src: path.resolve('static/favicon.png'),
                  size: 512,
                  destination: '/static',
                  ios: 'startup'
                },
                {
                  src: path.resolve('static/apple-touch-icon.png'),
                  size: 512,
                  destination: '/static',
                  ios: true
                }
              ],
              includeDirectory: true,
              publicPath: '..',
            })
          );
        }

        return config;
    },
    exportPathMap() {
        return {
            '/': { page: '/' }
        };
    }
};
