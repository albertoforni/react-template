require('babel-polyfill');
require('babel-register');

var CONFIG = require('./config');
console.log(`==> 💁  Environment is: "${CONFIG.ENV}"`);

var webpack = require('webpack');
var webpackConfig = require(CONFIG.IS_PROD ?
  './webpack/webpack.config.babel' : './webpack/webpack.dev.config.babel').default;

webpack(webpackConfig, (err) => {
  if (err) {
    return console.error(err.stack);
  }

  if (!CONFIG.IS_PROD) {
    require('./webpack/devServer')();
  }

  require('./src/server')(function() {});
});
