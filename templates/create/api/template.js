import * as API from './base.js';

export function fetch() {
  return API.fetch('/')
  .then(res => {
    return res;
  });
};
