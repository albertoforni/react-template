var hook = require('css-modules-require-hook');
var sass = require('node-sass');

hook({
  extensions: ['.scss'],
  generateScopedName: '[local]---[hash:base64:5]',
  preprocessCss: function (css, filename) {
    var output = sass.renderSync({
      file: filename,
    });
    return output.css;
  },
});
