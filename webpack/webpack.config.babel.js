import webpack from 'webpack';
import path from 'path';

// ExtractTextPlugin => create a build is a separate file
import ExtractTextPlugin from 'extract-text-webpack-plugin';

// Remove custom functions from your code
import strip from 'strip-loader';

// write stats about compiled files
import { StatsWriterPlugin } from 'webpack-stats-plugin';

/*
  Paths
*/
const ROOT = path.resolve(__dirname, '..');
let appPath = path.resolve(ROOT, 'src');
let nodeModulesPath = path.resolve(ROOT, 'node_modules');
let buildPath = path.resolve(ROOT, 'dist');

/*
  set environment variables for the UI
*/
const CONFIG = require(path.join(ROOT, 'config'));
let CONFIG_UI = CONFIG.UI;
for (var key in CONFIG_UI) {
  CONFIG_UI[key] = JSON.stringify(CONFIG_UI[key]);
}

export let envGlobalVars = new webpack.DefinePlugin(CONFIG_UI);

/*
  Create a vendors.js file with the most used libraries, like webpack module
  loader, react, flux.
  Libraries are supposed to not change as frequently as the app code,
  so we can leverage browser cache by splitting these files
  in a separate build.
*/
let vendorsPlugin = new webpack.optimize.CommonsChunkPlugin('vendors', '[name]-[hash].js');

/*
  Webpack Configurations
*/
const config = {
  // where to look for files
  context: ROOT,

  devtool: 'source-map',

  entry: {
    vendors: ['react'],
    bundle: [path.join(appPath, 'client.js')],
  },
  output: {
    path: buildPath,
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: '/dist/',
  },

  module: {
    loaders: [
      {
        name: 'js', // used in the dev environment to add hot reload and caching
        test: /\.js$/,
        exclude: [nodeModulesPath],
        loaders: [strip.loader('console.log'), 'babel'],
      },
      {
        name: 'css', // used in the dev environment to add hot reload and caching
        test: /\.scss$/,
        exclude: [nodeModulesPath],

        loader: ExtractTextPlugin.extract('style',
        'css?modules&importLoaders=1&localIdentName=[local]---[hash:base64:5]!autoprefixer?browsers=last 2 version!sass'),
      },
      {
        test: /\.(png|jpg|jpeg|svg|ttf|eot|woff|woff2)$/,
        loader: 'url?limit=8192',
      },
      {
        test: /\.json$/,
        exclude: [nodeModulesPath],
        loader: 'json',
      },
    ],
  },

  plugins: [
    vendorsPlugin,
    envGlobalVars,

    // css files from the extract-text-plugin loader
    new ExtractTextPlugin('css', '[name]-[chunkhash].css'),

    // Write out stats.json file to build directory.
    new StatsWriterPlugin({
      transform: function (data) {
        return JSON.stringify({
          js: [
            data.assetsByChunkName.vendors[0],
            data.assetsByChunkName.bundle[0],
          ],
          css: [
            data.assetsByChunkName.bundle[1],
          ],
        }, null, 2);
      },
    }),
  ],
};

export default config;
