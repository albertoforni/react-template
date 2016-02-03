import express from 'express';
import serveFavicon from 'serve-favicon';
import path from 'path';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import Html from './components/Html';

import CONFIG from '../config';
import ASSETS from '../dist/stats.json';
const RESOURCES_SERVER_PATH = CONFIG.IS_PROD ? '/dist/' : `http://${CONFIG.HOSTNAME}:${CONFIG.PORT + 1}/dist/`;
let cssHtml = ASSETS.css ? ASSETS.css.map((style) => {
  return `${RESOURCES_SERVER_PATH}${style}`;
}) : [];
let scriptsHtml = ASSETS.js.map((script) => {
  return `${RESOURCES_SERVER_PATH}${script}`;
});

const PUBLIC_PATH = path.resolve(__dirname, '../public');
const DIST_PATH = path.resolve(__dirname, '../dist');

let handleServerRendering = (req, res) => {
  let html = renderToStaticMarkup(<Html css={cssHtml} js={scriptsHtml} />);
  res.send(html);
};

// Initialize express server
module.exports = (callback) => {
  let app = express();

  app.set('env', CONFIG.ENV);
  app.set('host', CONFIG.HOST);
  app.set('port', CONFIG.PORT);

  app.use('/public', express.static(PUBLIC_PATH));
  app.use('/dist', express.static(DIST_PATH));
  app.use(serveFavicon(`${PUBLIC_PATH}/favicon.ico`));

  app.all('/api/*', (req, res) => {
    res.json({});
  });

  // Render the app app-side and send it as response
  app.use(handleServerRendering);

  // Generic app errors (e.g. not caught by components)
  app.use((err, req, res, next) => {  // eslint-disable-line no-unused-vars
    console.log('Error on request %s %s', req.method, req.url);
    console.log(err);
    console.log(err.stack);
    res.status(500).send('Something bad happend');
  });

  // Finally, start the express app
  return app.listen(CONFIG.PORT, () => {
    console.info(`==> ✅  Server is listening`);
    console.info(`==> 🌎  Go to http://${CONFIG.HOSTNAME}:${CONFIG.PORT}`);

    callback(app);
  });
};
