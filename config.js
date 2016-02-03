let LOCAL_ENV;
try {
  LOCAL_ENV = require('./.env.json');
} catch(err) {
  console.log(`.env.json is not present, it's fine if you are in production`);
}
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  IS_PROD: isProduction,
  ENV: isProduction ? 'production' : 'development',
  PORT: process.env.PORT || 3000,
  HOSTNAME: process.env.HOSTNAME || 'localhost',
  UI: {
    'process.env.BROWSER': true,
    IS_PROD: isProduction,
    API_PREFIX: '/api',
  },
};
