const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest')
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');
const WorkboxPlugin = require("workbox-webpack-plugin");

module.exports = () => {
  return {
    // Set the mode for Webpack (development or production)
    mode: 'development',

    // Entry points for your application
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js',
    },

    // Output configuration for bundled files
    output: {
      filename: '[name].bundle.js', // [name] will be replaced by the entry point name
      path: path.resolve(__dirname, 'dist'), // Output directory
    },

    // Plugins to enhance Webpack functionality
    plugins: [
      // Generates an HTML file with script tags for your bundles
      new HtmlWebpackPlugin({
        template: './index.html', // HTML template file
        title: 'Webpack Plugin', // Title for the generated HTML
      }),

      // Workbox plugin for injecting the service worker
      new InjectManifest({
        swSrc: './src-sw.js', // Source file for the service worker
        swDest: 'service-worker.js', // Destination file for the generated service worker
      }),

      new WebpackPwaManifest({
        name: 'JATE',
        short_name: 'Jate',
        description: 'My awesome Progressive Web App!',
        background_color: '#ffffff',
        theme_color: "#7eb4e2",
        start_url: "/",
        publicPath: "/",
        fingerprints: false,
        inject: true,
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512], // multiple sizes
            destination: path.join('assets', 'icons')
          },
        ],
      }), 
    ],

    // Module configuration for handling different types of files
    module: {
      rules: [
        // Rule for handling CSS files
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },

        // Rule for handling JavaScript files using Babel
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
      ],
    },
  };
};
