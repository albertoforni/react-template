/* eslint no-console: 0 */

import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';

import CONFIG from '../config';
import WEBPACK_CONFIG from './webpack.dev.config.babel';

module.exports = function() {
  const host = CONFIG.HOSTNAME;
  const port = CONFIG.PORT + 1;

  const options = {
    contentBase: `http://${host}:${port}`,
    hot: true,
    inline: true,
    lazy: false,
    publicPath: WEBPACK_CONFIG.output.publicPath,
    noInfo: true,
  };

  const compiler = webpack(WEBPACK_CONFIG);
  const webpackDevServer = new WebpackDevServer(compiler, options);

  return webpackDevServer.listen(port, host, function() {
    console.log(`==> 💁  Webpack development server listening on "${host}:${port}"`);
  });
};
