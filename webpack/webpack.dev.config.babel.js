import webpack from 'webpack';
import WebpackErrorNotificationPlugin from 'webpack-error-notification';

// write stats about compiled files
let StatsWriterPlugin = require('webpack-stats-plugin').StatsWriterPlugin;

const CONFIG = require('../config');
import webpackProd, { envGlobalVars } from './webpack.config.babel.js';

/*
  entry
*/
// add webpack dev server and hot reload to the app entry points
webpackProd.entry = [
  'webpack-dev-server/client?http://' + CONFIG.HOSTNAME + ':' + (CONFIG.PORT + 1),
  'webpack/hot/only-dev-server',
  './src/client.js',
];

/*
  output
*/
webpackProd.output = {
  ...webpackProd.output,
  filename: 'bundle.js',
  publicPath: 'http://' + CONFIG.HOSTNAME + ':' + (CONFIG.PORT + 1) + '/dist/',
};

/*
  module
*/
// add react-hot-loader to loaders
webpackProd.module.loaders = webpackProd.module.loaders.map((loader) => {
  switch (loader.name) {
  case 'js':
    return {
      ...loader,
      loaders: [
        'react-hot',
        'babel?cacheDirectory',
      ],
    };
  case 'css':
    return {
      ...loader,
      loader: 'style!css?modules&localIdentName=[local]---[hash:base64:5]!autoprefixer?browsers=last 2 version!sass',
    };
  default:
    return loader;
  }
});

/*
  plugins
*/
// add hot module replacement and error notification
webpackProd.plugins = [
  new webpack.HotModuleReplacementPlugin(),
  new WebpackErrorNotificationPlugin(),
  envGlobalVars,

  // Write out stats.json file to build directory.
  new StatsWriterPlugin({
    transform: function (data) {
      return JSON.stringify({
        js: [
          data.assetsByChunkName.main[0],
        ],
      });
    },
  }),
];

export default webpackProd;
