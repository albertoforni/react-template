import React, { Component, PropTypes } from 'react';

export default class HTML extends Component {
  static propTypes = {
    css: PropTypes.array.isRequired,
    js: PropTypes.array.isRequired,
  };

  render() {
    const { css, js } = this.props;

    let counter = 0;
    const cssHtml = css.length > 0 ?
      css.map(cssLink => <link key={counter++} rel='stylesheet' href={cssLink} />) :
      null;
    const jsHtml = js.length > 0 ? js.map(jsLink => <script key={counter++} src={jsLink} />) : '';

    return (
      <html lang="en-us">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="shortcut icon" href="/favicon.ico" />
          {cssHtml}
        </head>
        <body>
          <div id="root"></div>
          {jsHtml}
        </body>
      </html>
    );
  }
}
